/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': r('./src'),
      'fei-ui-design': r('./src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // 只收集组件测试，避免把构建产物与文档示例计入。
    // 文档站主题的测试单独放在 docs/**/__tests__/ 下，也必须在这里显式收进来
    // （否则 docs/ 既不在 include 里、又被 exclude 排除，测试会静默不跑）。
    include: [
      'src/**/*.{test,spec}.{ts,tsx,js,jsx}',
      'docs/**/__tests__/*.{test,spec}.{ts,tsx,js,jsx}'
    ],
    exclude: ['node_modules', 'dist', 'es', 'lib', 'site'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx,vue}'],
      exclude: [
        'src/**/test/**',
        'src/**/*.d.ts',
        'src/version.ts',
        'src/index.ts',
        'src/components.ts'
      ]
    }
  }
})
