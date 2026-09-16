/*
 * 校验文档站代码块的「语法着色 vs 代码块底色」对比度是否可读。
 *
 * 背景（这是一个真实踩过的坑）：
 *   代码块的底色与语法着色主题是**两处独立配置**，分别落在
 *     - 底色：docs/.vitepress/theme/custom.styl 的 --vs-theme-code2
 *     - 配色：docs/.vitepress/config.js 的 markdown.theme
 *   二者一旦不配套（例如底色是深色、而 light 侧却给按白底设计的 github-light），
 *   代码会变成「深字压深底」：正文 token 对比度低到 1.22:1，肉眼几乎不可读。
 *   这类问题**构建期不报错、页面也不缺内容**，四件套 docs:check 全都发现不了
 *   （API 表 / 死链 / demo 存在性 / 格式都不看颜色），只能靠产物度量。
 *
 * 本脚本做三件事：
 *   1) 失效检测：产物里有 shiki 代码块，却一个 --shiki-* 变量都没有
 *      （通常意味着 markdown.theme 退化成了单字符串主题，语法着色整体丢失）
 *   2) 对比度体检：把每个 token 颜色与代码块底色做 WCAG 对比度计算
 *   3) 阈值断言：全部 token ≥ 3.0（非文本底线）；出现频次最高的 token ≥ 4.5
 *      （频次最高的通常就是正文 token，按正文标准要求）
 *
 * 依赖 site/ 产物，请在 build:site 之后运行。
 */
const fs = require('fs')
const path = require('path')

const root = process.cwd()
// 产物目录可用 FEI_SITE_DIR 覆盖（相对仓库根），原因同 check-site-links.cjs：
// 受限沙箱无法让 vite 清空 site/assets，需构建到隔离目录后再校验。
const siteDir = process.env.FEI_SITE_DIR
  ? path.resolve(root, process.env.FEI_SITE_DIR)
  : path.join(root, 'site')
const stylFile = path.join(root, 'docs/.vitepress/theme/custom.styl')

/** 全部 token 的对比度下限（WCAG AA 大字号 / 非文本内容） */
const MIN_ANY = 3.0
/** 出现频次最高 token（正文）的对比度下限（WCAG AA 正文） */
const MIN_BODY = 4.5

if (!fs.existsSync(siteDir)) {
  console.log('[docs-contrast] 未找到 site/ 产物，已跳过（请先执行 build:site）')
  process.exit(0)
}

// ---------- 代码块底色：直接读变量定义，避免与样式表手动保持同步 ----------
/**
 * 真正可见的底色是 index.css 里
 *   [class*='language-'] pre { background: var(--vs-theme-code2) }
 * 所以取 --vs-theme-code2，而不是名字更像「代码色」的 --vs-theme-code
 * （后者被表格文字、胶囊单选当【文字色】用）。
 */
function readCodeBg () {
  if (!fs.existsSync(stylFile)) return null
  const styl = fs.readFileSync(stylFile, 'utf8')
  const m = styl.match(/--vs-theme-code2:\s*(#[0-9a-fA-F]{3,8})/)
  return m ? m[1] : null
}

const CODE_BG = readCodeBg()

// ---------- 颜色计算 ----------
function parseHex (hex) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((x) => x + x).join('') : h
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16))
}

function luminance (hex) {
  const [r, g, b] = parseHex(hex).map((v) => v / 255)
  const f = (v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

function contrast (a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

// ---------- 遍历产物 ----------
function walk (dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, acc)
    else acc.push(p)
  }
  return acc
}

const htmlFiles = walk(siteDir).filter((f) => f.endsWith('.html'))

/** 颜色 → { 次数, 示例页面 } */
const colors = new Map()
const brokenBlocks = []
let codeBlocks = 0
let tokenSpans = 0

for (const file of htmlFiles) {
  const rel = path.relative(siteDir, file).replace(/\\/g, '/')
  const html = fs.readFileSync(file, 'utf8')

  const preCount = (html.match(/<pre class="shiki/g) || []).length
  if (!preCount) continue
  codeBlocks += preCount

  const vars = html.match(/--shiki-(?:light|dark):\s*(#[0-9a-fA-F]{3,8})/g) || []
  tokenSpans += (html.match(/--shiki-light:/g) || []).length

  // 检查 1：有代码块却完全没有 --shiki-* 变量 → 语法着色失效
  if (vars.length === 0) {
    brokenBlocks.push(rel)
    continue
  }

  /**
   * 站点**有**暗色开关，但它走自研的 `body[vs-theme="dark"]` + `body.darken`
   * （theme/components/Config.vue），不是 VitePress 的 `html.dark`，所以 `.dark`
   * 永不生效，实际生效的只有 --shiki-light 一侧
   * （VitePress 自带 `html:not(.dark) .vp-code span { color: var(--shiki-light) }`）。
   * 两侧现在配置成同一个主题，所以取 light 侧即为所见。
   */
  for (const m of html.matchAll(/--shiki-light:\s*(#[0-9a-fA-F]{3,8})/g)) {
    const c = m[1].toUpperCase()
    if (!colors.has(c)) colors.set(c, { count: 0, pages: new Set() })
    const rec = colors.get(c)
    rec.count += 1
    if (rec.pages.size < 3) rec.pages.add(rel)
  }
}

// ---------- 输出 ----------
const lines = []
lines.push(`[docs-contrast] 代码块底色 = ${CODE_BG || '(未取到)'}  来源 docs/.vitepress/theme/custom.styl --vs-theme-code2`)
lines.push(`[docs-contrast] 扫描 ${htmlFiles.length} 个 html，命中 ${codeBlocks} 个 shiki 代码块 / ${tokenSpans} 个着色 span`)

const problems = []

if (!CODE_BG) {
  problems.push('无法从 custom.styl 解析 --vs-theme-code2，护栏失效，请检查样式变量是否被改名')
}

if (brokenBlocks.length) {
  lines.push('')
  lines.push(`✗ 有 ${brokenBlocks.length} 个页面的代码块完全没有 --shiki-* 变量（语法着色丢失）：`)
  for (const p of brokenBlocks.slice(0, 5)) lines.push(`    ${p}`)
  lines.push('    常见原因：markdown.theme 退化成了单个字符串主题，')
  lines.push('    产物就只剩 style="color:…"，会被主题 CSS 的 color:#fff 兜底')
  problems.push('语法着色丢失')
}

if (CODE_BG && colors.size) {
  const ranked = [...colors.entries()]
    .map(([c, r]) => ({ color: c, count: r.count, pages: [...r.pages], ratio: contrast(c, CODE_BG) }))
    .sort((a, b) => a.ratio - b.ratio)

  lines.push('')
  lines.push('对比度明细（升序，★ = 出现频次最高，即正文 token）：')
  const top = [...ranked].sort((a, b) => b.count - a.count)[0]
  for (const r of ranked) {
    const mark = r.color === top.color ? '★' : ' '
    lines.push(
      `  ${mark} ${r.color}  ${r.ratio.toFixed(2).padStart(5)}:1  ×${String(r.count).padStart(5)}  ${r.pages[0] || ''}`
    )
  }

  const belowAny = ranked.filter((r) => r.ratio < MIN_ANY)
  const belowBody = top.ratio < MIN_BODY

  if (belowAny.length) {
    lines.push('')
    lines.push(`✗ 有 ${belowAny.length} 个 token 颜色低于 ${MIN_ANY}:1 下限：`)
    for (const r of belowAny) lines.push(`    ${r.color}  ${r.ratio.toFixed(2)}:1`)
    problems.push('存在不可读 token')
  }
  if (belowBody) {
    lines.push('')
    lines.push(`✗ 正文 token ${top.color} 对比度 ${top.ratio.toFixed(2)}:1 < ${MIN_BODY}:1`)
    problems.push('正文对比度不足')
  }
}

if (!problems.length) {
  lines.push('')
  lines.push('✓ 代码块底色与语法着色主题配套，全部 token 对比度达标')
}

console.log(lines.join('\n'))
process.exitCode = problems.length ? 1 : 0
