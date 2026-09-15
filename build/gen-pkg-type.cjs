/**
 * 为双格式产物写入各自的模块类型标记。
 *
 * 背景：根 package.json 声明了 `"type": "module"`，因此 `lib/*.js`
 * （CJS 产物）会被 Node 误判为 ESM，`require('fei-ui-design')` 直接报错。
 * 反之 `es/*.js` 也需要明确标记为 ESM，避免使用方根目录未声明 type 时
 * 被当作 CJS 解析。
 *
 * 解决方式与 antd / element-plus 等主流库一致：在产物目录内放置
 * 受 `files` 白名单覆盖的 package.json，就近生效、优先级高于根声明。
 *
 * 该脚本必须在 `vite build` 之后执行。
 */
const fs = require('fs-extra')
const { resolve } = require('path')

const root = resolve(__dirname, '..')

const targets = [
  { dir: 'es', type: 'module', desc: 'ESM 产物' },
  { dir: 'lib', type: 'commonjs', desc: 'CommonJS 产物' }
]

for (const { dir, type, desc } of targets) {
  const dirPath = resolve(root, dir)
  if (!fs.existsSync(dirPath)) {
    console.warn(`[gen-pkg-type] 跳过 ${dir}/：目录不存在，请先执行 vite build`)
    continue
  }
  fs.writeFileSync(
    resolve(dirPath, 'package.json'),
    JSON.stringify({ type, sideEffects: ['**/*.css'] }, null, 2) + '\n'
  )
  console.log(`[gen-pkg-type] 已写入 ${dir}/package.json（${desc} → type: ${type}）`)
}
