/* eslint-env node */
/**
 * ESLint 配置
 *
 * 修复说明：
 * - 原配置使用 `@babel/eslint-parser`，但该依赖从未安装，导致 lint 实际失效；
 * - 现改为 `vue-eslint-parser`（由 eslint-plugin-vue 提供）+ `@typescript-eslint/parser`，
 *   可正确解析 .vue / .ts / .tsx 文件；
 * - 引入 `plugin:@typescript-eslint/recommended` 提供 TS 基础规则。
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly',
    defineExpose: 'readonly',
    defineOptions: 'readonly',
    withDefaults: 'readonly'
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue']
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
    // 多词规则面向业务组件，对本库不适用
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
    }
  ]
}
