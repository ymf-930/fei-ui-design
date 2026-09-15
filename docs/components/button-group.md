---
title: 按钮组 ButtonGroup
---

<script setup>
import Basic from './demo/ButtonGroup/Basic.vue'
import Vertical from './demo/ButtonGroup/Vertical.vue'
</script>

以按钮组的方式排列多个按钮，常用于上一页/下一页、工具栏等场景。相邻按钮的圆角会自动合并。

<card>

## 基础用法

使用 `<f-button-group>` 包裹多个 `<f-button>`，按钮会自动拼接为一行，仅首尾保留圆角。

<template #example>

  <Basic/>

</template>

<template #template>

```html
<template>
  <f-button-group>
    <f-button type="primary" icon="left">上一页</f-button>
    <f-button type="primary">
      下一页
      <i class="f-iconfont f-icon-right"></i>
    </f-button>
  </f-button-group>

  <f-button-group>
    <f-button>上一页</f-button>
    <f-button>下一页</f-button>
  </f-button-group>

  <f-button-group>
    <f-button type="success" icon="star"></f-button>
    <f-button type="info" icon="heatmap"></f-button>
    <f-button type="danger" icon="edit"></f-button>
  </f-button-group>
</template>
```

</template>

</card>

<card>

## 垂直排列

设置 `vertical` 属性可以让按钮组垂直排列，同样会自动合并上下圆角。

<template #example>

  <Vertical/>

</template>

<template #template>

```html
<template>
  <f-button-group vertical>
    <f-button type="primary">Primary</f-button>
    <f-button type="success">Success</f-button>
    <f-button type="danger">Danger</f-button>
  </f-button-group>
</template>
```

</template>

</card>

## 与 FButton 配合

`FButtonGroup` 只负责布局与圆角合并，按钮的 `type` / `size` / `plain` / `round` / `disabled` 等属性均由 `FButton` 提供，用法与单独使用按钮一致。

## Props

| 参数     | 说明             | 类型    | 可选值      | 默认值 |
| -------- | ---------------- | ------- | ----------- | ------ |
| vertical | 是否垂直方向排列 | Boolean | false/true  | false  |

## Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 按钮组内容区域 |
