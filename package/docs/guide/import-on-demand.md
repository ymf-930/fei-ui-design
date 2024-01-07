---
title: 按需引入
---



# 按需引入（Tree Shaking）

F-UI-Design 支持 tree shaking，组件、语言、主题均可 tree-shaking。

了解更多关于主题设定的信息，参见 [调整主题](/docs/custom-theme.html)。

## 手动引入

```vue
<script setup lang="ts">
import { FButton } from 'fei-ui-design'
</script>

<template>
  <div class="card">
    <f-button type="primary">Primary Button</f-button>
    <FButton type="primary">Primary Button</FButton>
  </div>
</template>
```

## 自动引入

可以借助插件 `unplugin-vue-components` 来自动的进行组件的引入。

```ts
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        // 自动引入组件
        componentName => ({ name: componentName, from: 'fei-ui-design' })
      ]
    })
  ]
})
```

## 按需全局安装组件（手动）

组件库暴露了全部组件，指令，公共函数等。可以在配合自动引入，将公共的指令和帮助函数引入。便于管理

```ts
// main.js
import { createApp } from 'vue'
import {
  // create UI 全局组件和指令安装器
  create,
  // 部分指令
  ClickOutside,
  // 组件
  FButton,
  // 工具包
  Utils
} from 'fei-ui-design'

const UI = create({
  components: [FButton],
  directives: [ClickOutside]
})

const app = createApp()
app.use(UI)
app.mount('#app')
```

这时候你就可以愉快的进行组件使用啦。

```vue
<template>
  <div class="card">
    <f-button type="primary">Primary Button</f-button>
    <FButton type="primary">Primary Button</FButton>
  </div>
</template>
```
