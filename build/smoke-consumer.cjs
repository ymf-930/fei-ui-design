/**
 * 消费方冒烟测试（bundle-level smoke test）。
 *
 * 静态校验只能证明「文件在、语法对」，无法证明「装到项目里真的能用」。
 * 组件库最典型的翻车场景恰恰在这一层：
 *   - exports map 写错 → `import 'fei-ui-design'` 解析失败
 *   - 目录/扩展名不匹配 → 按需引入 `fei-ui-design/es/button` 解析失败
 *   - CSS 未被 external → 样式丢失或打包报错
 *   - SSR 环境下 CSS import 直接抛异常
 *
 * 因此本脚本模拟一个真实消费者项目：把仓库自身挂到 `node_modules` 下，
 * 再用真实的 vite 走一遍「客户端构建 + SSR 渲染」。
 *
 * 用法：node build/smoke-consumer.cjs （需先执行 pnpm run build:package）
 */
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const workDir = path.join(root, '.workbuddy', 'tmp', 'consumer')

let failed = 0
const ok = msg => console.log(`  \u2713 ${msg}`)
const bad = msg => {
  failed++
  console.error(`  \u2717 ${msg}`)
}

/** 准备一个仿真的消费方项目 */
function prepareProject() {
  fs.rmSync(workDir, { recursive: true, force: true })

  const pkgDir = path.join(workDir, 'node_modules', 'fei-ui-design')
  fs.mkdirSync(path.join(workDir, 'node_modules'), { recursive: true })

  /**
   * 按 package.json 的 `files` 白名单真实拷贝出「安装后的包」。
   *
   * 不用软链指向仓库根目录：消费方目录位于仓库内部，
   * 软链会形成 node_modules/fei-ui-design → 仓库根 → ... 的递归结构，
   * 干扰 vite 的文件扫描。拷贝方式同时顺带验证了发布白名单是否正确
   * （漏声明 `dist` 之类会立刻在下方断言中暴露）。
   */
  const pkg = require(path.join(root, 'package.json'))
  fs.mkdirSync(pkgDir, { recursive: true })
  for (const item of pkg.files) {
    const from = path.join(root, item)
    if (!fs.existsSync(from)) continue
    fs.cpSync(from, path.join(pkgDir, item), { recursive: true })
  }
  fs.copyFileSync(path.join(root, 'package.json'), path.join(pkgDir, 'package.json'))
  console.log(`  已按 files 白名单安装: ${pkg.files.join(', ')}`)

  fs.writeFileSync(
    path.join(workDir, 'package.json'),
    JSON.stringify({ name: 'consumer-smoke', private: true, version: '0.0.0' }, null, 2)
  )

  fs.writeFileSync(
    path.join(workDir, 'index.html'),
    '<!DOCTYPE html><html><body><div id="app"></div><script type="module" src="/main.js"></script></body></html>'
  )

  // 覆盖两种官方支持的引入姿势 + 全量样式
  fs.writeFileSync(
    path.join(workDir, 'main.js'),
    `import { createApp, h } from 'vue'
import { FButton, FInput, FTag } from 'fei-ui-design'
import { FButton as FButtonOnDemand } from 'fei-ui-design/es/button'
import 'fei-ui-design/styles/index.css'

const app = createApp({
  render: () =>
    h('div', { class: 'smoke' }, [
      h(FButton, { type: 'primary' }, () => '全量引入按钮'),
      h(FButtonOnDemand, { type: 'success' }, () => '按需引入按钮'),
      h(FInput, { modelValue: 'hello' }),
      h(FTag, null, () => '标签')
    ])
})
app.mount('#app')
export { app }
`
  )

  // SSR 用例：验证样式 import 不会让服务端渲染崩掉。
  // 从 `vue/server-renderer` 子路径导入而非直接 `@vue/server-renderer`：
  // 后者是 vue 的传递依赖，在 pnpm 的隔离式 node_modules 下不会提升到顶层，
  // 消费者只安装 vue 时无法解析（npm 的扁平化安装恰好看不出这个问题）。
  fs.writeFileSync(
    path.join(workDir, 'ssr.js'),
    `import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { FButton } from 'fei-ui-design'

export async function render() {
  const app = createSSRApp({
    render: () => h(FButton, { type: 'primary' }, () => 'SSR 按钮')
  })
  return renderToString(app)
}
`
  )
}

async function main() {
  console.log('\n消费方冒烟测试（真实 vite 构建 + SSR）')

  if (!fs.existsSync(path.join(root, 'es', 'index.js'))) {
    console.error('  未找到构建产物，请先执行 pnpm run build:package')
    process.exit(1)
  }

  prepareProject()
  console.log(`  仿真项目: ${path.relative(root, workDir)}`)

  const { build, createServer } = await import('vite')

  // ---------------------------------------------------- 客户端构建
  console.log('\n[A] 客户端构建（vite build）')
  // vite build 的返回值不含产物目录，这里用固定值
  const outDir = path.join(workDir, 'dist')
  try {
    await build({
      root: workDir,
      logLevel: 'error',
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: { input: path.join(workDir, 'index.html') }
      }
    })
    ok('vite build 执行成功')
  } catch (e) {
    bad(`vite build 失败：${e.message}`)
  }

  // ------------------------------------------------------ 产物断言
  {
    const distDir = outDir
    const assetsDir = path.join(distDir, 'assets')
    const files = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : []
    const cssFiles = files.filter(f => f.endsWith('.css'))
    const jsFiles = files.filter(f => f.endsWith('.js'))

    if (jsFiles.length) ok(`产出 JS bundle: ${jsFiles.join(', ')}`)
    else bad('未产出 JS bundle')

    if (cssFiles.length) {
      ok(`产出 CSS: ${cssFiles.join(', ')}`)
      const css = cssFiles.map(f => fs.readFileSync(path.join(assetsDir, f), 'utf8')).join('\n')
      if (css.includes('.fei-button')) ok('CSS 中包含 .fei-button（全量样式已生效）')
      else bad('CSS 中缺少 .fei-button，样式未正确打入')
      if (css.includes('.fei-input') || css.includes('.fei-tag')) ok('CSS 中包含组件样式')
      else bad('CSS 中缺少组件样式')
    } else {
      bad('未产出 CSS：样式未被引入或被误当作 external 丢弃')
    }

    // 按需引入的组件也应进入产物
    const js = jsFiles.map(f => fs.readFileSync(path.join(assetsDir, f), 'utf8')).join('\n')
    if (js.includes('按需引入按钮')) ok('按需引入组件已进入 bundle')
    else bad('按需引入组件未进入 bundle')
    if (js.includes('全量引入按钮')) ok('全量引入组件已进入 bundle')
    else bad('全量引入组件未进入 bundle')
  }

  // ----------------------------------------------------------- SSR
  console.log('\n[B] SSR 渲染（vite ssrLoadModule + renderToString）')
  let server
  try {
    server = await createServer({
      root: workDir,
      logLevel: 'error',
      server: { middlewareMode: true },
      appType: 'custom',
      // 关闭依赖预构建扫描：本脚本只做一次性渲染，
      // 后台预构建会被 server.close() 打断并打出 "build was canceled" 噪声
      optimizeDeps: { noDiscovery: true, include: [] },
      /**
       * 组件样式以 `import '../styles/index.css'` 的形式保留在 JS 产物中
       * （.css 为 external），这样 SPA 使用方无需手动引样式。
       * 代价是 Node 原生 ESM 无法解析 .css。
       *
       * 因此 SSR 场景需要让 vite 处理该依赖而非外部化：
       * 消费方在 vite.config 中配置 `ssr.noExternal: ['fei-ui-design']` 即可。
       * 这里复现同样的配置，既验证方案有效，也作为文档示例。
       */
      ssr: { noExternal: ['fei-ui-design'] }
    })
    const mod = await server.ssrLoadModule('/ssr.js')
    const html = await mod.render()
    if (html.includes('fei-button')) ok('SSR 渲染成功，输出包含 fei-button')
    else bad(`SSR 渲染输出异常：${html.slice(0, 120)}`)
    if (html.includes('SSR 按钮')) ok('SSR 渲染包含插槽文本')
    else bad('SSR 渲染缺少插槽文本')
  } catch (e) {
    bad(`SSR 渲染失败：${e.message}`)
  } finally {
    if (server) await server.close()
  }

  // --------------------------------------------------------- 汇总
  console.log('')
  if (failed) {
    console.error(`消费方冒烟测试未通过：${failed} 项异常`)
    process.exit(1)
  }
  console.log('消费方冒烟测试全部通过：包可被真实项目消费（含按需引入与 SSR）。')
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
