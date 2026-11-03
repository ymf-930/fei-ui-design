import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

// ESM 环境下没有 __dirname，统一使用 fileURLToPath 解析
const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

/**
 * 运行期依赖必须 external，避免被打进产物造成重复打包与体积膨胀。
 * 兼容 `dayjs/plugin/xxx`、`lodash/union` 这类子路径引用。
 * 同时把 .css 声明为 external：组件内的样式引用保持原样，
 * 交由使用方的打包器处理，从而支持按需引入样式。
 */
const externalPackages = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
]
const isExternal = (id: string) =>
  externalPackages.some(name => id === name || id.startsWith(`${name}/`)) || /\.css$/.test(id)

/**
 * 收集全部构建入口。
 *
 * - `index`        → `es/index.js`      （全量引入）
 * - `<comp>/index` → `es/<comp>/index.js`（按需引入）
 *
 * 必须显式列出组件入口：仅声明 `src/index.ts` 一个入口时，
 * rollup 会把「纯 re-export」的组件入口模块合并进 `components.js`，
 * 导致按需引入路径 `fei-ui-design/es/button` 根本不存在文件
 * （而 .d.ts 又是按目录产出的，会出现「有类型没实现」的错位）。
 */
function collectEntries(): Record<string, string> {
  const srcDir = r('./src')
  const entries: Record<string, string> = { index: r('./src/index.ts') }
  for (const item of readdirSync(srcDir, { withFileTypes: true })) {
    if (!item.isDirectory()) continue
    const entry = resolve(srcDir, item.name, 'index.ts')
    if (existsSync(entry)) entries[`${item.name}/index`] = entry
  }
  return entries
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(), // https://github.com/vitejs/vite/issues/2049
    /**
     * 声明文件与 JS 产物同目录输出（es/、lib/ 各自携带 .d.ts），
     * 使按需引入 `fei-ui-design/es/button` 时同样能解析到类型。
     */
    dts({
      // vite-plugin-dts 5 底层换成 unplugin-dts，选项随之改名：
      //   outDir → outDirs，tsConfigFilePath → tsconfigPath
      outDirs: ['es', 'lib'],
      tsconfigPath: r('./tsconfig.json')
    })
  ],
  resolve: {
    alias: {
      '@': r('./src'),
      'fei-ui-design': r('./src')
    }
  },
  build: {
    // 组件库产物不做压缩：
    // 1) 压缩应交由图库使用方的打包器统一处理；
    // 2) 保留可读性更利于排查问题；
    // 3) 避免压缩在 lib + preserveModules 模式下造成构建内存溢出。
    minify: false,
    sourcemap: false,
    // 产物目录由下方 output[].dir 指定，清理由 `pnpm run clean` 负责
    emptyOutDir: false,
    rollupOptions: {
      external: isExternal,
      input: collectEntries(),
      // 必须显式声明：vite 在库构建下默认将其置为 false，
      // 而 `false` 与 output.preserveModules 组合会被 rollup 直接拒绝。
      // 组件入口需要保留具名导出（FButton 等），因此用 strict。
      preserveEntrySignatures: 'strict',
      output: [
        {
          format: 'es',
          // es/ 与 lib/ 统一使用 .js 后缀，但分别由各自目录下的
          // package.json 标注 type，兼顾「类型解析」与「双格式共存」：
          // 若 es 使用 .mjs，TS 会去找 .d.mts，而 dts 插件产出的是 .d.ts。
          entryFileNames: '[name].js',
          // 让打包目录和源码目录保持一一对应，便于按需引入
          preserveModules: true,
          exports: 'named',
          dir: 'es'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          exports: 'named',
          dir: 'lib'
        }
      ]
    }
  }
})
