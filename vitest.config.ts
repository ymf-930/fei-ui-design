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
    // 只收集组件测试，避免把构建产物与文档示例计入
    include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}'],
    exclude: ['node_modules', 'dist', 'es', 'lib', 'site', 'docs'],
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
