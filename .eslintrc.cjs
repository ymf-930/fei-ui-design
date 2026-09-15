// package.json 中声明了 "type": "module"，因此该配置文件必须使用 .cjs 扩展名，
// 否则 ESLint 会以 ES Module 方式加载并抛出 "module is not defined"。
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
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential'],
  // 源码中存在大量 `// eslint-disable-next-line @typescript-eslint/xxx` 注释，
  // 需要注册该插件，否则 ESLint 会报 "Definition for rule ... was not found"。
  plugins: ['@typescript-eslint'],
  // plugin:vue/vue3-essential 已将 parser 设为 vue-eslint-parser，
  // 这里只需为 <script lang="ts"> 与 .ts 文件指定 TypeScript 解析器。
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-var': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    'template-curly-spacing': 'off',
    'comma-dangle': 'off',
    eqeqeq: ['error', 'always'],
    indent: 'off',
    // 组件统一以 F 前缀通过 name/defineOptions 暴露，内部子组件（Bar/Pane/Resizer/Picker 等）
    // 使用单词名，这里关闭该规则。
    'vue/multi-word-component-names': 'off'
  },
  overrides: [
    {
      // 树组件的节点数据是共享状态，沿用既有实现对 props.data 直接赋值，此处放宽规则。
      files: ['src/tree/src/node.vue'],
      rules: {
        'vue/no-mutating-props': 'off'
      }
    }
  ]
}
