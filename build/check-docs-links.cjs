/* 扫描 docs 下全部 markdown 内部链接，解析是否能命中真实页面或静态资源 */
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const docs = path.join(root, 'docs')

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === '.vitepress' || e.name === 'node_modules') continue
      walk(p, acc)
    } else acc.push(p)
  }
  return acc
}

const mdFiles = walk(docs).filter(f => f.endsWith('.md'))

// 收集所有"可作为链接目标"的路径（相对 docs）
const pages = new Set()
const assets = new Set()
for (const f of walk(docs)) {
  const rel = path.relative(docs, f).replace(/\\/g, '/')
  if (rel.endsWith('.md')) {
    pages.add('/' + rel.replace(/\.md$/, ''))
    if (rel.endsWith('/index.md')) pages.add('/' + rel.replace(/\/index\.md$/, '/'))
  } else {
    assets.add('/' + rel)
  }
  // public 目录
}
const publicDir = path.join(docs, 'public')
if (fs.existsSync(publicDir)) {
  for (const f of walk(publicDir)) {
    assets.add('/' + path.relative(publicDir, f).replace(/\\/g, '/'))
  }
}

const problems = []
let totalInternal = 0

for (const file of mdFiles) {
  const rel = path.relative(root, file).replace(/\\/g, '/')
  const raw = fs.readFileSync(file, 'utf8')
  const lines = raw.split(/\r?\n/)
  let inFence = false
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^\s*```/.test(line)) { inFence = !inFence; continue }
    if (inFence) continue
    // 行内代码里的链接语法是「示例」，VitePress 会原样当文字渲染，不是真链接。
    // 用等长空白遮蔽后匹配，保持列号不变。
    const scanLine = line.replace(/`[^`]*`/g, (s) => ' '.repeat(s.length))
    const re = /\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g
    let m
    while ((m = re.exec(scanLine))) {
      const href = m[2]
      if (/^(https?:|mailto:|tel:|#)/.test(href)) continue
      totalInternal++
      // 纯锚点
      const clean = href.split('#')[0]
      if (!clean) continue
      let resolved
      if (clean.startsWith('/')) {
        resolved = clean
      } else {
        resolved = '/' + path.posix.normalize(path.posix.join(path.posix.dirname(rel.replace(/^docs\//, '')), clean))
      }
      // 去掉末尾斜杠再比
      const candidates = [resolved]
      if (resolved.endsWith('/')) candidates.push(resolved.slice(0, -1))
      else candidates.push(resolved + '/')
      // index
      candidates.push(resolved.replace(/\/$/, '') + '/index')

      const hit = candidates.some(c => pages.has(c) || pages.has(c + '/') || assets.has(c))
      // .html 后缀：去掉后试
      let hit2 = false
      if (!hit && /\.html$/.test(resolved)) {
        const noExt = resolved.replace(/\.html$/, '')
        hit2 = pages.has(noExt) || pages.has(noExt + '/') || pages.has(noExt + '/index') || assets.has(noExt)
      }
      if (!hit && !hit2) {
        problems.push({ file: rel, line: i + 1, href, resolved })
      }
    }
  }
}

console.log('内部链接总数:', totalInternal)
console.log('疑似死链:', problems.length)
for (const p of problems) console.log(`  ${p.file}:${p.line}  ->  ${p.href}   (解析为 ${p.resolved})`)
// 供 CI 使用：存在死链时以非零码退出
process.exitCode = problems.length > 0 ? 1 : 0;
