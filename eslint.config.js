import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

/**
 * ESLint 平铺配置（Flat Config）。
 *
 * ESLint 9 起不再读取 `.eslintrc.*` 与 `.eslintignore`，两者已迁移到本文件：
 *   eslint:recommended                        → js.configs.recommended
 *   plugin:vue/vue3-essential                 → pluginVue.configs['flat/essential']
 *   plugin:@typescript-eslint/recommended     → tseslint.configs.recommended
 *   .eslintrc.cjs 的 env: { browser, node }   → languageOptions.globals
 *   .eslintignore                             → 首项的 ignores
 *
 * 原 `@typescript-eslint/eslint-plugin` + `@typescript-eslint/parser` 两个包
 * 在 v8 起合并为统一的 `typescript-eslint`，此处一并切换。
 */
const isProduction = process.env.NODE_ENV === 'production'

/** 需要参与 lint 的文件类型 */
const SOURCE_FILES = ['**/*.{js,mjs,cjs,ts,mts,cts,tsx,vue}']

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'es/**',
      'lib/**',
      'site/**',
      'coverage/**',
      // 构建脚本（组件库 lint 不覆盖；需要时请单独执行 eslint build/）
      'build/**',
      // 文档站：站点配置、自定义主题与构建产物
      'docs/.vitepress/**',
      '**/*.tsbuildinfo',
      // vite / vitest 运行时临时文件（每次运行都会重新生成）
      '**/*.timestamp-*.mjs',
      // 本地工作区数据（记忆与临时校验脚本），不入版本控制
      '.workbuddy/**',
      // 编辑器目录
      '.idea/**',
      '.vscode/**'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: SOURCE_FILES,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        defineEmits: 'readonly',
        defineProps: 'readonly',
        defineExpose: 'readonly',
        defineOptions: 'readonly',
        defineSlots: 'readonly',
        withDefaults: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      // 存量代码中仍有大量 @ts-ignore，先关闭该规则，随类型治理逐步开启
      // 详见 docs/.internal/refactor-plan.md「阶段五：类型安全」
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      // typescript-eslint v8 起把该规则纳入 recommended，存量代码大量使用
      // `cond && fn()` / `opt?.()` 这类简写表达式语句，保留原 lint 契约：
      // 放行短路、三元与标签模板，仅对真正无副作用的表达式语句报错。
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true
        }
      ],
      // 组件库的组件名刻意使用单词（Button / Table / Card），
      // 多词规则面向业务组件，对本库不适用；内部子组件（Bar / Pane / Resizer / Picker 等）同理
      'vue/multi-word-component-names': 'off',
      'no-var': 'error',
      'no-console': isProduction ? 'warn' : 'off',
      'no-debugger': isProduction ? 'warn' : 'off',
      // `x == null` 是判断 null/undefined 的惯用写法，予以放行
      eqeqeq: ['error', 'always', { null: 'ignore' }]
    }
  },
  {
    // <script lang="ts"> 与 .vue 内的 TS 代码交给 TS 解析器
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaFeatures: { jsx: true }
      }
    }
  },
  {
    // .tsx / .jsx 需要开启 JSX 语法
    files: ['**/*.{tsx,jsx}'],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } }
    }
  },
  {
    // Node 侧 CommonJS 脚本：require 是唯一模块语法
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  },
  {
    // 树组件的节点数据是共享状态，沿用既有实现对 props.data 直接赋值，此处放宽规则。
    files: ['src/tree/src/node.vue'],
    rules: {
      'vue/no-mutating-props': 'off'
    }
  }
)
