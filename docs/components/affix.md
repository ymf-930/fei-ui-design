---
title: 图钉 Affix
---

<script setup>
import Basic from './demo/Affix/Basic.vue'
import Position from './demo/Affix/Position.vue'
</script>

<card>

## 基础用法

原生滚动相对于window窗口固定，也可以结合scrollbar进行配置

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-affix :offset="80">
    <f-button type="primary">固定在顶部80的位置</f-button>
  </f-affix>
</template>
```

</template>

</card>

<card>

## 固定位置

可以设置固定距离底部的位置

<template #example>

  <Position/>
  
</template>

<template #template>

```html
<template>
  <f-affix :offset="20" position="bottom">
    <f-button type="primary">固定在底部20的位置</f-button>
  </f-affix>
</template>
```

</template>

</card>

## Props

| 参数     | 说明                 | 类型   | 可选值      | 默认值 |
| -------- | -------------------- | ------ | ----------- | ------ |
| offset   | 距离窗口位置触发     | Number | —           | 0      |
| position | 可设置距离顶部或底部 | String | top、bottom | top    |
| z-index  | 层级                 | Number | —           | 10     |

## Events

| 事件名 | 说明                                       | 返回值     |
| ------ | ------------------------------------------ | ---------- |
| change | 在固定状态发生改变时触发                   | true/false |
| scroll | 滚动响应事件 ,返回对象包含scrollTop, fixed | Object     |

## Slot

| 名称    | 说明         |
| ------- | ------------ |
| default | 警告提示内容 |
