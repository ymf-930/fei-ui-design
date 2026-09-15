/*
 * 校验文档站构建产物（site/）能否在「纯静态托管」上正常工作。
 *
 * 背景：docs:check-links 只扫描 markdown 正文里的 [文本](链接)，
 * 完全不覆盖 themeConfig.nav / sidebar 以及主题组件里手写的 <a href>。
 * 而线上（Gitee / GitHub Pages）是按路径原样取文件的静态托管：
 *   - 不会把 `/guide/introduction` 重写成 `/guide/introduction.html`
 *   - 不会把 `/` 当成站点 base
 * 于是「导航/侧边栏/页脚/翻页」这类链接一旦漏拼 base 或漏补 `.html`，
 * 构建期不报错、docs:check 也全绿，上线后点击即 404。
 *
 * 本脚本做两件事：
 *   1) 源/产物对照：每个 markdown 页面都应生成对应 .html（防产物缺失/陈旧）
 *   2) 链接体检：产物里所有站内 href / src 都必须能命中真实文件，
 *      且逐段做大小写敏感比对（与 Linux 上的静态托管一致）
 *
 * 依赖 site/ 产物，请在 build:site 之后运行。
 */
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const docsDir = path.join(root, 'docs')
const siteDir = path.join(root, 'site')

/** 组件示例里的占位链接：指向「假设的站点根」，不属于站点导航，无需修正 */
const ALLOWLIST = new Set(['/'])

if (!fs.existsSync(siteDir)) {
  console.log('[site-links] 未找到 site/ 产物，已跳过（请先执行 build:site）')
  process.exit(0)
}

/** base 直接读产物内联的 siteData，避免与 config.js 手动保持同步 */
function readBase () {
  const probe = ['index.html', '404.html']
    .map((f) => path.join(siteDir, f))
    .find((f) => fs.existsSync(f))
  if (!probe) return '/'
  const html = fs.readFileSync(probe, 'utf8')
  const m = html.match(/window\.__VP_SITE_DATA__\s*=\s*JSON\.parse\("([\s\S]*?)"\)/)
  if (!m) return '/'
  try {
    return JSON.parse(JSON.parse('"' + m[1] + '"')).base || '/'
  } catch (e) {
    return '/'
  }
}

const BASE = readBase()
const BASE_NO_SLASH = BASE.replace(/\/$/, '')

function walk (dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, acc)
    else acc.push(p)
  }
  return acc
}

// ---------- 检查 1：源 markdown 与产物 html 是否一一对应 ----------
const sourcePages = walk(docsDir)
  .filter((f) => f.endsWith('.md'))
  .filter((f) => !f.includes(`${path.sep}.vitepress${path.sep}`))
  .filter((f) => !f.includes(`${path.sep}.internal${path.sep}`))
  .map((f) => '/' + path.relative(docsDir, f).replace(/\\/g, '/').replace(/\.md$/, '.html'))

const outputPages = new Set(
  walk(siteDir)
    .filter((f) => f.endsWith('.html'))
    .map((f) => '/' + path.relative(siteDir, f).replace(/\\/g, '/'))
)

const missingPages = sourcePages.filter((p) => !outputPages.has(p))

// ---------- 检查 2：产物内所有站内链接能否命中真实文件 ----------
/**
 * 逐段解析并做「大小写敏感」比对。
 * Windows / macOS 文件系统默认不区分大小写，而 Gitee Pages / GitHub Pages
 * 跑在 Linux 上、严格区分大小写 —— 本地看着没问题、线上 404 的链接
 * 有一类就是这么来的，所以这里不能用 fs.existsSync 一把梭。
 */
function resolves (urlPath) {
  let rel = urlPath.slice(BASE_NO_SLASH.length)
  if (rel === '' || rel === '/') rel = '/index.html'
  if (rel.endsWith('/')) rel += 'index.html'

  let segments
  try {
    segments = decodeURIComponent(rel).split('/').filter(Boolean)
  } catch (e) {
    return false
  }

  let cur = siteDir
  for (const seg of segments) {
    if (seg === '..') return false
    let entries
    try {
      entries = fs.readdirSync(cur)
    } catch (e) {
      return false
    }
    if (!entries.includes(seg)) return false
    cur = path.join(cur, seg)
  }
  try {
    return fs.statSync(cur).isFile()
  } catch (e) {
    return false
  }
}

const attrRe = /\s(href|src)="([^"]*)"/g
const badLinks = new Map()

for (const file of walk(siteDir).filter((f) => f.endsWith('.html'))) {
  const rel = path.relative(siteDir, file).replace(/\\/g, '/')
  const html = fs.readFileSync(file, 'utf8')
  let m
  attrRe.lastIndex = 0
  while ((m = attrRe.exec(html))) {
    const url = m[2]
    if (!url) continue
    if (/^(https?:|mailto:|tel:|#|data:|javascript:|\/\/)/.test(url)) continue
    if (!url.startsWith('/')) continue // 相对链接由 VitePress 处理，不在本检查范围
    const clean = url.split('#')[0].split('?')[0]
    if (!clean || ALLOWLIST.has(clean)) continue
    if (resolves(clean)) continue
    if (!badLinks.has(url)) badLinks.set(url, new Set())
    badLinks.get(url).add(rel)
  }
}

// ---------- 输出 ----------
const lines = []
lines.push(`[site-links] base = ${BASE}`)
lines.push(`[site-links] 源 markdown 页面 ${sourcePages.length} 个，产物 html ${outputPages.size} 个`)

if (missingPages.length) {
  lines.push('')
  lines.push(`✗ 有 ${missingPages.length} 个源页面没有生成产物：`)
  for (const p of missingPages) lines.push(`    ${p}`)
}

if (badLinks.size) {
  lines.push('')
  lines.push(`✗ 有 ${badLinks.size} 个站内链接在静态托管上命不中文件：`)
  for (const [url, pages] of [...badLinks].sort()) {
    const sample = [...pages].slice(0, 3)
    lines.push(`    ${url}`)
    lines.push(`      （${pages.size} 个页面）${sample.join(', ')}${pages.size > sample.length ? ', ...' : ''}`)
  }
}

if (!missingPages.length && !badLinks.size) {
  lines.push('✓ 产物页面完整，所有站内链接均可命中')
}

console.log(lines.join('\n'))
process.exitCode = missingPages.length || badLinks.size ? 1 : 0
