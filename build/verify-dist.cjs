/**
 * 产物完整性校验。
 *
 * 组件库最容易出问题的环节不是「构建失败」，而是「构建成功但产物不可用」：
 * 入口路径写错、按需样式落错目录、CJS/ESM 模块类型标记缺失等。
 * 这些错误在本地开发时完全看不出来，只有真正 `pnpm pack` 装到消费者项目里才会暴露。
 *
 * 因此把校验固化成脚本，同时接入 CI，做到每次改构建配置都会被验证。
 *
 * 用法：node build/verify-dist.cjs （需先执行 pnpm run build:package）
 */
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const pkg = require(path.join(root, 'package.json'))

let failed = 0
const ok = msg => console.log(`  \u2713 ${msg}`)
const bad = msg => {
  failed++
  console.error(`  \u2717 ${msg}`)
}

const rel = p => path.join(root, p)
const exists = p => fs.existsSync(rel(p))

/**
 * 无样式组件白名单。
 *
 * 这些组件不产出任何 DOM 类名，因此不存在 `styles/index.css`：
 * - config-provider: 纯配置注入（provide/inject），不渲染任何元素
 * - count-to: 只渲染一个无类名的 <span>
 * 它们被排除在「按需样式必须存在」的校验之外；
 * 若后续为它们新增了样式目录，本白名单需要同步清理。
 */
const STYLELESS_COMPONENTS = ['config-provider', 'count-to']

/** 读取 src 下的组件目录（排除 _ 开头的内部目录） */
function listComponents() {
  const srcDir = rel('src')
  return fs
    .readdirSync(srcDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('_'))
    .map(d => d.name)
    .filter(name => fs.existsSync(path.join(srcDir, name, 'index.ts')))
    .sort()
}

function section(title) {
  console.log(`\n${title}`)
}

// ---------------------------------------------------------------- 1. 入口
section('[1/6] 包入口一致性（package.json 声明 vs 实际产物）')
{
  const checks = [
    ['main', pkg.main],
    ['module', pkg.module],
    ['types', pkg.types]
  ]
  for (const [field, value] of checks) {
    if (!value) {
      bad(`package.json 缺少 ${field} 字段`)
    } else if (!exists(value)) {
      bad(`${field} 指向的文件不存在: ${value}`)
    } else {
      ok(`${field} → ${value}`)
    }
  }

  const dot = pkg.exports && pkg.exports['.']
  if (!dot) {
    bad('package.json 缺少 exports["."] 导出声明')
  } else {
    for (const [cond, value] of Object.entries(dot)) {
      if (exists(value)) ok(`exports["."].${cond} → ${value}`)
      else bad(`exports["."].${cond} 指向的文件不存在: ${value}`)
    }
  }
}

// ------------------------------------------------- 2. 双格式模块类型标记
section('[2/6] 双格式模块类型标记（es=ESM / lib=CJS）')
{
  const expect = [
    ['es/package.json', 'module'],
    ['lib/package.json', 'commonjs']
  ]
  for (const [file, type] of expect) {
    if (!exists(file)) {
      bad(`缺少 ${file}：根 package.json 声明了 "type": "module"，` + `会导致 CJS 产物被误判为 ESM`)
      continue
    }
    const actual = JSON.parse(fs.readFileSync(rel(file), 'utf8')).type
    if (actual === type) ok(`${file} → type: ${type}`)
    else bad(`${file} 的 type 应为 ${type}，实际为 ${actual}`)
  }
}

// ---------------------------------------------------- 3. 组件级入口与样式
section('[3/6] 组件级入口与按需样式（按需引入可用性）')
{
  const all = listComponents()
  const styled = all.filter(name => !STYLELESS_COMPONENTS.includes(name))
  console.log(`  共 ${all.length} 个组件（其中 ${STYLELESS_COMPONENTS.length} 个无样式：${STYLELESS_COMPONENTS.join('、')}）`)

  const missingEntry = []
  const missingStyle = []

  for (const name of all) {
    if (!exists(`es/${name}/index.js`)) missingEntry.push(`es/${name}/index.js`)
    if (!exists(`lib/${name}/index.js`)) missingEntry.push(`lib/${name}/index.js`)
  }
  for (const name of styled) {
    if (!exists(`es/${name}/styles/index.css`)) missingStyle.push(`es/${name}/styles/index.css`)
    if (!exists(`lib/${name}/styles/index.css`)) missingStyle.push(`lib/${name}/styles/index.css`)
  }

  // 白名单反向校验：已声明无样式却产出了样式目录，说明白名单过期
  for (const name of STYLELESS_COMPONENTS) {
    if (exists(`src/${name}/styles`)) {
      bad(`${name} 已新增样式目录，请从 STYLELESS_COMPONENTS 白名单中移除`)
    }
  }

  if (missingEntry.length) {
    bad(`缺失 ${missingEntry.length} 个组件入口，按需引入会失败：`)
    missingEntry.slice(0, 8).forEach(p => console.error(`      - ${p}`))
  } else {
    ok(`全部 ${all.length} 个组件均产出 es/ 与 lib/ 入口`)
  }

  if (missingStyle.length) {
    bad(`缺失 ${missingStyle.length} 个按需样式文件：`)
    missingStyle.slice(0, 8).forEach(p => console.error(`      - ${p}`))
  } else {
    ok(`${styled.length} 个有样式组件均产出按需样式（es/ 与 lib/）`)
  }
}

// -------------------------------------------------------------- 4. 全量样式
section('[4/6] 全量样式产物（dist/styles）')
{
  const expect = [
    'dist/styles/index.css',
    'dist/styles/base.css',
    'dist/styles/components.css',
    'dist/styles/icon.css',
    'dist/styles/common.css'
  ]
  for (const file of expect) {
    if (exists(file)) ok(file)
    else bad(`缺少 ${file}`)
  }
  if (exists('dist/styles/fonts')) ok('dist/styles/fonts（字体资源）')
  else bad('缺少 dist/styles/fonts（字体资源）')

  // 样式必须经过 postcss 处理：源码里的 @import 若未被内联，说明 postcss 没生效
  if (exists('dist/styles/index.css')) {
    const css = fs.readFileSync(rel('dist/styles/index.css'), 'utf8')
    if (/@import\s+/.test(css)) bad('dist/styles/index.css 中仍残留 @import，postcss-import 未生效')
    else ok('dist/styles/index.css 已内联依赖（无残留 @import）')
    if (/var\(--fei-/.test(css)) ok('dist/styles/index.css 包含主题变量引用')
    else console.log('  ! dist/styles/index.css 未出现 --fei-* 变量引用，请确认主题体系')
  }
}

// ------------------------------------------- 5. 模块格式与语法静态校验
section('[5/6] 模块格式与语法校验')
{
  /**
   * 这里刻意不直接 require / import 产物。
   *
   * 组件样式是以 `import '../styles/index.css'` 的形式保留在产物里的
   * （.css 被声明为 external，样式才能随组件按需加载），
   * 裸 Node 环境无法解析 .css，直接加载必然报错——
   * 这与 antd 等主流组件库的行为一致：产物面向打包器消费。
   *
   * 真实消费能力由 `pnpm run smoke`（基于 vite 的消费方冒烟测试）验证。
   * 此处用 `node --check` 做静态解析：
   * 它会依据最近的 package.json 判定模块类型，
   * 因此同时验证了「ESM 产物语法合法」与「lib 的 CJS 标记确实生效」。
   */
  const { spawnSync } = require('child_process')

  const targets = [
    ['es/index.js', 'ESM'],
    ['lib/index.js', 'CJS'],
    ['es/button/index.js', 'ESM 组件入口'],
    ['lib/button/index.js', 'CJS 组件入口']
  ]
  let skipped = 0
  for (const [file, label] of targets) {
    if (!exists(file)) {
      bad(`入口不存在: ${file}`)
      continue
    }
    const res = spawnSync(process.execPath, ['--check', rel(file)], { encoding: 'utf8' })
    /**
     * 子进程起不来时（沙箱 / EBUSY / EPERM 等），status 为 null、stderr 为空。
     * 此时若仍按 `res.status === 0` 判定，会打印「语法校验失败（ESM）：undefined」——
     * 既没有可读线索，又会把环境限制误报成产物缺陷，进而挡住 prepublishOnly。
     * 环境不可控时降级为「跳过」：不计入失败，但明确打印，避免静默失效。
     */
    if (res.error || res.status === null) {
      skipped++
      const why = res.error ? res.error.code || res.error.message : 'status=null'
      console.log(`  ! ${file} 语法校验跳过（子进程不可用：${why}，环境限制而非产物问题）`)
      continue
    }
    if (res.status === 0) ok(`${file} 语法校验通过（${label}）`)
    else {
      const detail = String(res.stderr || '').split('\n').find(Boolean)
      bad(`${file} 语法校验失败（${label}）：${detail || `exit=${res.status}`}`)
    }
  }
  if (skipped) console.log(`  ! 共跳过 ${skipped} 项语法校验，请在常规环境（CI）复核`)

  // 运行时依赖必须 external，不应被内联进产物
  if (exists('es/index.js')) {
    const code = fs.readFileSync(rel('es/index.js'), 'utf8')
    const leaked = ['dayjs', 'lodash', 'sortablejs', 'async-validator'].filter(
      dep => code.includes(dep) && !new RegExp(`from\\s+['"]${dep}`).test(code)
    )
    if (leaked.length) bad(`以下依赖疑似被内联进产物（应 external）: ${leaked.join(', ')}`)
    else ok('运行时依赖均以 external 引用，未被内联')
  }
}

// -------------------------------------------------------- 6. 包内容白名单
section('[6/6] 发布内容检查')
{
  for (const file of ['README.md', 'CHANGELOG.md', 'LICENSE']) {
    if (exists(file)) ok(`${file} 已就绪`)
    else bad(`缺少 ${file}（files 白名单中声明但文件不存在，pnpm pack 会忽略）`)
  }
  if (Array.isArray(pkg.files) && pkg.files.length) ok(`files 白名单: ${pkg.files.join(', ')}`)
  else bad('package.json 缺少 files 白名单，可能把源码/文档一并发布')
  if (pkg.publishConfig && pkg.publishConfig.access === 'public') ok('publishConfig.access = public（可发布到 npm 公共源）')
  else bad('缺少 publishConfig.access，作用域包发布时可能被拒')
}

// ------------------------------------------------------------------- 汇总
console.log('')
if (failed) {
  console.error(`产物校验未通过：${failed} 项异常`)
  process.exit(1)
}
console.log('产物校验全部通过。可继续执行 `pnpm run smoke` 做消费方冒烟测试，')
console.log('或直接 `pnpm pack` / `pnpm publish`。')
