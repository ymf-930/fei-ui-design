/* 文档格式规范检查，规则见 docs/.internal/docs-style-guide.md §2 / §3 / §5 */
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const docs = path.join(root, 'docs')

// .internal 是维护者文档，不进站点（srcExclude），不参与规范检查
const SKIP_DIRS = new Set(['.vitepress', 'node_modules', '.internal'])

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      walk(p, acc)
    } else if (e.name.endsWith('.md')) acc.push(p)
  }
  return acc
}

const CJK = '\u4e00-\u9fa5'

/** 代码语法层面禁止的全角标点（字符串/注释的文本内容不算） */
const CODE_PUNCT = /[（），；：？！＝＋－＊／［］｛｝＜＞]/

/** 按代码围栏与行内代码切分，返回 [{text, code}]，code 段不做文字类检查 */
function toSegments(line) {
  const parts = line.split('`')
  return parts.map((text, i) => ({ text, code: i % 2 === 1 }))
}

/** 去掉字符串字面量、行注释、块注释，只留下真正的语法部分 */
function stripLiterals(line) {
  return line
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/`(?:[^`\\]|\\.)*`/g, '``')
    .replace(/\/\/.*$/, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
}

const problems = []
const add = (file, line, rule, msg) => problems.push({ file, line, rule, msg })

for (const abs of walk(docs).sort()) {
  const rel = path.relative(root, abs).replace(/\\/g, '/')
  const raw = fs.readFileSync(abs, 'utf8')
  const lines = raw.split(/\r?\n/)

  // frontmatter 区间
  let fmEnd = -1
  if (lines[0] === '---') {
    const e = lines.indexOf('---', 1)
    fmEnd = e >= 0 ? e : -1
  }

  let inFence = false
  let inScript = false
  const parenStack = [] // {line, col, ch}

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li]

    if (/^\s*```/.test(line)) {
      // 围栏语言标记：开围栏必须有语言
      if (!inFence) {
        const lang = line.trim().replace(/^```/, '').trim()
        if (!lang) add(rel, li + 1, 'FENCE_LANG', '代码围栏缺少语言标记（如 ```vue / ```ts / ```bash）')
        else if (!/^(vue|ts|js|html|css|bash|json|md|diff|text|scss|stylus)$/.test(lang)) {
          add(rel, li + 1, 'FENCE_LANG', `非规范语言标记 \`${lang}\`（统一用 vue/ts/js/html/css/bash）`)
        }
      }
      inFence = !inFence
      continue
    }
    if (inFence) continue

    // --- <script> 块内的代码必须是半角，且不能当作正文参与其它规则 ---
    if (/<script\b/.test(line)) { inScript = true; continue }
    if (/<\/script>/.test(line)) { inScript = false; continue }
    if (inScript) {
      const m = stripLiterals(line).match(CODE_PUNCT)
      if (m) add(rel, li + 1, 'CODE_PUNCT', `代码语法里出现全角「${m[0]}」，应改为半角：${line.trim().slice(0, 80)}`)
      continue
    }

    // --- HTML 标签骨架（去掉属性值里的展示文案与注释）必须是半角 ---
    for (const tag of line.replace(/<!--[\s\S]*?-->/g, '').match(/<[^>]*>/g) || []) {
      const skeleton = tag.replace(/"[^"]*"/g, '""').replace(/'[^']*'/g, "''")
      if (CODE_PUNCT.test(skeleton)) {
        add(rel, li + 1, 'CODE_PUNCT', `标签语法里出现全角标点：${tag.slice(0, 80)}`)
      }
    }

    // 手写 H1：主题已按 frontmatter title 渲染 <h1 id="header-title">
    if (li > fmEnd && /^#\s+\S/.test(line)) {
      add(rel, li + 1, 'DUP_H1', `手写 H1「${line.trim()}」，与主题自动渲染的页面主标题重复，应删除`)
    }

    // 导语不得用标题包裹（会产生 H1 → H5 → H2 的跳级大纲）
    if (li > fmEnd && /^#{4,6}\s+\S/.test(line)) {
      add(rel, li + 1, 'LEAD_HEADING', `导语/正文使用 ${/^(#+)/.exec(line)[1]} 级标题，应改为普通段落`)
    }

    // 中文后紧跟半角标点
    for (const seg of toSegments(line)) {
      if (seg.code) continue
      const re = new RegExp(`([${CJK}][\\u3000-\\u303f${CJK}]*)([,;:!?])`, 'g')
      let m
      while ((m = re.exec(seg.text))) {
        const map = { ',': '，', ';': '；', ':': '：', '!': '！', '?': '？' }
        add(rel, li + 1, 'HALF_PUNCT', `中文后用了半角「${m[2]}」，应改为「${map[m[2]]}」：…${seg.text.slice(Math.max(0, m.index - 12), m.index + 8)}…`)
      }
      // 中文后用半角句点当句号（排除了「文档.md」这类中英混合名）
      const dotRe = new RegExp(`[${CJK}]\\.(?![a-zA-Z0-9/\\\\_-])`, 'g')
      while ((m = dotRe.exec(seg.text))) {
        add(rel, li + 1, 'HALF_PUNCT', `中文后用了半角「.」，应改为「。」：…${seg.text.slice(Math.max(0, m.index - 12), m.index + 8)}…`)
      }
      // 括号配对：只在非代码段跟踪
      for (let ci = 0; ci < seg.text.length; ci++) {
        const ch = seg.text[ci]
        if (ch === '(' || ch === '（') parenStack.push({ line: li + 1, ch, text: seg.text })
        else if (ch === ')' || ch === '）') {
          if (!parenStack.length) { add(rel, li + 1, 'PAREN_PAIR', `多余的闭括号「${ch}」`); continue }
          const open = parenStack.pop()
          const openHalf = open.ch === '('
          const closeHalf = ch === ')'
          if (openHalf !== closeHalf) {
            add(rel, open.line, 'PAREN_PAIR', `括号半角/全角混搭：第 ${open.line} 行开「${open.ch}」、第 ${li + 1} 行闭「${ch}」，成对统一`)
          }
        }
      }
    }
  }

  for (const o of parenStack) {
    add(rel, o.line, 'PAREN_PAIR', `未闭合的开括号「${o.ch}」`)
  }
}

const byRule = {}
for (const p of problems) byRule[p.rule] = (byRule[p.rule] || 0) + 1

console.log('格式规范待修复项:', problems.length)
for (const [k, v] of Object.entries(byRule).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`)
}
if (problems.length) {
  console.log('\n明细（最多 60 条）:')
  for (const p of problems.slice(0, 60)) console.log(`  ${p.file}:${p.line}  [${p.rule}] ${p.msg}`)
}
// 供 CI 使用：存在待修复项时以非零码退出
process.exitCode = problems.length > 0 ? 1 : 0
