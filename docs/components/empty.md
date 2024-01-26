---
title: 空状态 Empty
---

<script setup>
import Basic from './demo/Empty/Basic.vue'
import Directive from './demo/Empty/Directive.vue'
</script>

##### 空显示状态，用于给内部无数据情况的展示。十分简单

<card>

## 基础用法

最简单的使用方法，通过控制属性value来显示 / 隐藏对话框。

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div flex>
    <div style="width: 224px; border: 1px solid #eee; height: 150px; margin-right: 20px">
      <f-empty title="no data"></f-empty>
    </div>
    <div style="width: 224px; border: 1px solid #eee; height: 150px; margin-right: 20px">
      <f-empty>当前无数据</f-empty>
    </div>
    <div style="width: 224px; border: 1px solid #eee; height: 150px">
      <f-empty></f-empty>
    </div>
  </div>
</template>
```

</template>

</card>

<card>

## 指令方式

可以使用v-no-data指令动态指定，并可以绑定显示文字

<template #example>

  <Directive/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 224px">
    <div v-no-data:[dataText]="true" style="border: 1px solid #eee; height: 150px"></div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const dataText = ref('抱歉，暂时没有数据')
</script>
```

</template>

</card>

## Props

| 参数  | 说明     | 类型   | 可选值 | 默认值   |
| ----- | -------- | ------ | ------ | -------- |
| title | 显示文字 | String | —      | 暂无数据 |

## Slot

| 名称    | 说明                         |
| ------- | ---------------------------- |
| icon    | 可插入图标                   |
| default | 默认插槽，可替换文字显示位置 |
