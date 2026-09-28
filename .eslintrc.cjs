/* eslint-env node */
/**
 * ESLint 配置
 *
 * 说明：
 * - 本文件必须使用 .cjs 扩展名：package.json 声明了 "type": "module"，
 *   否则 ESLint 会以 ES Module 方式加载并抛出 "module is not defined"。
 * - 修复说明：原配置使用 `@babel/eslint-parser`，但该依赖从未安装，导致 lint 实际失效；
 *   现改为 `vue-eslint-parser`（由 eslint-plugin-vue 提供）+ `@typescript-eslint/parser`，
 *   可正确解析 .vue / .ts / .tsx 文件；
 * - 引入 `plugin:@typescript-eslint/recommended` 提供 TS 基础规则。
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly',
    defineExpose: 'readonly',
    defineOptions: 'readonly',
    defineSlots: 'readonly',
    withDefaults: 'readonly'
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended'],
  parser: 'vue-eslint-parser',
  // 源码中存在大量 `// eslint-disable-next-line @typescript-eslint/xxx` 注释，
  // 需要注册该插件，否则 ESLint 会报 "Definition for rule ... was not found"。
  plugins: ['@typescript-eslint'],
  // `parser` 已由 plugin:vue/vue3-essential 设为 vue-eslint-parser，
  // 这里再为 <script lang="ts"> 与 .ts / .tsx 文件指定 TypeScript 解析器。
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true
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
    // 组件库的组件名刻意使用单词（Button / Table / Card），
    // 多词规则面向业务组件，对本库不适用；内部子组件（Bar / Pane / Resizer / Picker 等）同理
    'vue/multi-word-component-names': 'off',
    'no-var': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    'template-curly-spacing': 'off',
    'comma-dangle': 'off',
    // `x == null` 是判断 null/undefined 的惯用写法，予以放行
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    indent: 'off'
  },
  overrides: [
    {
      files: ['*.cjs', '*.config.js', 'build/**/*'],
      env: { node: true },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
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
  ]
}
