/*
 * 校验文档站主题里「占位文案」的数量不越基线。
 *
 * 背景（真实踩过的坑，见 docs/.internal/refactor-plan.md §8.10）：
 *   文档站主题里有若干「先摆 UI、后接实现」的入口 —— 图标和文案先放上去，
 *   实现留待后续，点击后用一条 `Message.info('暂未开发')` 占位。
 *   这类占位**全部落在 docs/.vitepress/theme 里**（不在 Markdown 正文），
 *   于是 docs:check 五件套（API / 死链 / 示例 / 格式 / 标签）全都看不见，
 *   它们可以在门禁全绿的情况下长期存在、被人忘记。
 *
 *   真正的问题不是「留了占位」，而是**占位没有跟踪机制**。本脚本把
 *   「占位文案」从看不见的角落变成必须显式登记的决策：
 *   新增一条即失败，删掉一条则提示可以下调基线。
 *
 * 扫描对象：产物 site/assets/chunks/theme.*.js（而非源码）。
 *   理由：源码里 Markdown 正文也存在「开发中」（如「开发中也推荐…」）这类叙述性
 *   误报，只有产物主题 chunk 才是「用户实际会点到的入口」的准确集合。
 *   如需登记新的占位，请先确认它确实渲染在主题里，再加进 BASELINE 并写明理由。
 *
 * 依赖 site/ 产物，请在 build:site 之后运行。
 */
const fs = require('fs')
const path = require('path')

const root = process.cwd()
// 与 check-site-links.cjs / check-docs-contrast.cjs 保持一致：
// 受限沙箱无法让 vite 清空 site/，需构建到隔离目录后再校验。
const siteDir = process.env.FEI_SITE_DIR
  ? path.resolve(root, process.env.FEI_SITE_DIR)
  : path.join(root, 'site')

/** 占位文案命中模式（子串匹配，逐次出现都计数） */
const PATTERNS = ['暂未开发', '开发中', 'Coming soon', '敬请期待']

/**
 * 基线：允许出现的次数。**只减不增。**
 * 低于基线不会被判失败（那是在变好），但会提示下调，避免基线虚高、
 * 让新出现的占位被旧基线的余量掩盖。
 *
 * 2026-09-16：入口 1 / 2 / 4 已补齐实现（见 refactor-plan.md §8.11），
 * `暂未开发` 由 1 → 0、`开发中` 由 3 → 1，基线随之下调。
 */
const BASELINE = {
  暂未开发: {
    count: 0,
    reason: '已归零 —— 入口 1「展开/收起侧边栏子栏目」已补齐实现（原为占位提示）'
  },
  开发中: {
    count: 1,
    reason:
      '仅剩顶部导航 logo 右侧的站点状态标记（§8.10 入口 5）。它是**状态标记而非入口**：' +
      '位于首页链接 `<a :href="homeLink">` 内部（点击即回首页），并非独立功能。' +
      '文案已据实保留 —— package.json version=0.0.3、changelog 载重构后版本线自 0.0.2 起算，' +
      '未发布 1.0，「开发中」准确（见 refactor-plan §8.11.9）。' +
      '入口 2「打开/关闭所有代码」与入口 4「返回上一页」已补齐实现；' +
      '入口 6 伪入口 `v3.x` 已移除'
  },
  'Coming soon': { count: 0, reason: '预留：暂无' },
  敬请期待: { count: 0, reason: '预留：暂无' }
}

if (!fs.existsSync(siteDir)) {
  console.log('[docs-placeholders] 未找到 site/ 产物，已跳过（请先执行 build:site）')
  process.exit(0)
}

// ---------- 定位主题 chunk（文件名带内容哈希，需通配） ----------
const chunksDir = path.join(siteDir, 'assets/chunks')
if (!fs.existsSync(chunksDir)) {
  console.error(`✗ [docs-placeholders] 未找到产物分块目录：${chunksDir}`)
  process.exit(1)
}
const themeChunks = fs
  .readdirSync(chunksDir)
  .filter((f) => /^theme\.[\w-]+\.js$/.test(f))
  .map((f) => path.join(chunksDir, f))

if (themeChunks.length === 0) {
  console.error('✗ [docs-placeholders] 产物中未找到 theme.*.js —— 主题构建产物布局可能已变更，护栏失去作用，请检查')
  process.exit(1)
}

// ---------- 计数 ----------
function countOccurrences (haystack, needle) {
  let n = 0
  let i = haystack.indexOf(needle)
  while (i !== -1) {
    n += 1
    i = haystack.indexOf(needle, i + needle.length)
  }
  return n
}

const actual = {}
for (const p of PATTERNS) actual[p] = 0
for (const file of themeChunks) {
  const code = fs.readFileSync(file, 'utf8')
  for (const p of PATTERNS) actual[p] += countOccurrences(code, p)
}

// ---------- 断言 ----------
console.log(`[docs-placeholders] 扫描 ${themeChunks.length} 个主题 chunk：${themeChunks.map((f) => path.basename(f)).join(', ')}`)
console.log('')
console.log('文案            基线  实际  结论')
for (const p of PATTERNS) {
  const base = BASELINE[p].count
  const cur = actual[p]
  let verdict = '✓ 未超基线'
  if (cur > base) verdict = '✗ 超出基线'
  else if (cur < base) verdict = `↓ 低于基线（可下调至 ${cur}）`
  console.log(`${p.padEnd(14)}${String(base).padStart(4)}${String(cur).padStart(6)}  ${verdict}`)
}
console.log('')

const over = PATTERNS.filter((p) => actual[p] > BASELINE[p].count)
if (over.length > 0) {
  console.error('✗ 检测到新增占位文案 —— 文档站出现了「点击后无实现」的入口：')
  for (const p of over) {
    console.error(`  · 「${p}」基线 ${BASELINE[p].count} → 实际 ${actual[p]}`)
  }
  console.error('')
  console.error('请二选一处理：')
  console.error('  A. 补齐实现或直接移除该入口（推荐 —— 删掉没人要的入口比开发它更划算）')
  console.error('  B. 若确需保留（如状态标记），把新基线写进 build/check-docs-placeholders.cjs 的')
  console.error('     BASELINE 并写明理由，同时在 docs/.internal/refactor-plan.md §8.10 登记一行')
  process.exit(1)
}

const under = PATTERNS.filter((p) => actual[p] < BASELINE[p].count)
if (under.length > 0) {
  console.log('ℹ️ 以下占位已减少（好事），请顺手把基线下调，避免基线虚高掩盖将来新增的占位：')
  for (const p of under) {
    console.log(`  · 「${p}」基线 ${BASELINE[p].count} → 实际 ${actual[p]}`)
  }
  console.log('')
}

console.log('✓ 主题占位文案未超基线')
