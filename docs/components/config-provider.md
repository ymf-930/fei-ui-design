---
title: 全局配置 ConfigProvider
---

<script setup>
import Basic from './demo/ConfigProvider/Basic.vue'
import Abstract from './demo/ConfigProvider/Abstract.vue'
</script>

用于为子树提供全局配置，支持注入主题变量、切换明暗主题与设置语言包

<card>

## 基础用法

通过 `theme` 传入主题变量对象即可覆盖子树内的样式。

`theme` 的键名使用**小驼峰**写法，会被转换为对应的 CSS 变量：`feiColorPrimary` → `--fei-color-primary`。
当覆盖的是主色(`feiColorPrimary` / `feiColorSuccess` / `feiColorWarning` / `feiColorDanger` / `feiColorInfo`)时，
组件库还会基于该颜色自动派生 `light1` ~ `light6` 与 `active` 色板。

<template #example>

  <Basic/>

</template>

<template #template>

```vue
<template>
  <f-config-provider
    :theme="{
      feiColorPrimary: '#722ed1',
      feiColorSuccess: '#13c2c2',
      feiColorWarning: '#e14c19',
      feiColorDanger: '#d42a87'
    }"
  >
    <div>
      <div>[default]默认按钮</div>
      <div class="demo-button">
        <f-button type="primary">Primary</f-button>
        <f-button type="success">Success</f-button>
        <f-button type="warning">Warning</f-button>
        <f-button type="danger">Danger</f-button>
      </div>
      <div>[plain]简约按钮</div>
      <div class="demo-button">
        <f-button type="primary" plain>Primary</f-button>
        <f-button type="success" plain>Success</f-button>
        <f-button type="warning" plain>Warning</f-button>
        <f-button type="danger" plain>Danger</f-button>
      </div>
      <div>[round]圆角按钮</div>
      <div class="demo-button">
        <f-button type="primary" round>Primary</f-button>
        <f-button type="success" round>Success</f-button>
        <f-button type="warning" round>Warning</f-button>
        <f-button type="danger" round>Danger</f-button>
      </div>
      <div>[dashed]虚线按钮</div>
      <div class="demo-button">
        <f-button type="primary" dashed>Primary</f-button>
        <f-button type="success" dashed>Success</f-button>
        <f-button type="warning" dashed>Warning</f-button>
        <f-button type="danger" dashed>Danger</f-button>
      </div>
    </div>
  </f-config-provider>
</template>
```

</template>

<template #style>

```vue
<style scoped>
.demo-button {
  margin: 8px 0;
}
</style>
```

</template>

</card>

<card>

## 抽象容器

设置 `abstract` 后组件不渲染任何包裹元素，而是把主题变量直接写入 `html` 根节点，从而实现**全局覆盖**。
谨慎使用，避免与外部样式冲突，一般只用于全局主题配置。

<template #example>

  <Abstract/>

</template>

<template #template>

```vue
<template>
  <f-config-provider abstract :theme="config">
    <f-button type="primary" @click="setGlobal">
      点击应用（应用后主颜色会变更，会影响全局）
    </f-button>
  </f-config-provider>
</template>
```

</template>

<template #script>

```vue
<script setup>
import { ref } from 'vue'

const config = ref({})

function setGlobal() {
  config.value = { feiColorPrimary: '#00c181' }
}
</script>
```

</template>

</card>

<card>

## 暗色模式

通过 `theme-name` 切换明暗主题，组件库的样式会读取 `html` 上的 `theme-name` 属性。
`theme-name` 支持 `light` 与 `dark` 两个取值；设置在 `abstract` 模式下会直接写到 `html` 节点上。

```vue
<template>
  <f-config-provider theme-name="dark">
    <f-button type="primary">暗色模式下的按钮</f-button>
  </f-config-provider>
</template>
```

> 暗色主题的样式变量由组件库内置提供，无需额外引入 CSS。

</card>

<card>

## 国际化

`locale` 用于为子树指定语言包，默认为 `zh-CN`。未设置时继承上层 `FConfigProvider` 的配置。

```vue
<template>
  <f-config-provider locale="en-US">
    <f-pagination :total="100" />
  </f-config-provider>
</template>
```

</card>

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| abstract | 抽象模式，不渲染包裹元素，主题变量直接写入 `html` | `boolean` | — | `false` |
| tag | 非抽象模式下包裹元素的标签名 | `string` | — | `'div'` |
| theme | 主题变量对象，键名为小驼峰（如 `feiColorPrimary`） | `object` | — | — |
| theme-name | 主题名称 | `'light' \| 'dark'` | `light` / `dark` | — |
| locale | 语言包标识 | `string` | — | `'zh-CN'` |
| inline-theme-disabled | 禁用行内 CSS 变量注入（改为写入 `html`） | `boolean` | — | `false` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 需要被配置的子树内容 |
