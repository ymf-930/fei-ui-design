---
title: 标记 Badge
---

<script setup>
import Basic from './demo/Badge/Basic.vue'
import Custom from './demo/Badge/Custom.vue'
</script>

##### 空显示状态，用于给内部无数据情况的展示。十分简单

<card>

## 基础用法

基础的徽标用法

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-space :size="24">
    <f-badge :value="12">
      <f-button>普通按钮</f-button>
    </f-badge>
    <f-badge :value="3">
      <f-button>回复</f-button>
    </f-badge>
    <f-badge :value="1" type="primary">
      <f-button>primary徽标</f-button>
    </f-badge>
    <f-badge :value="2" type="warning">
      <f-button>warning徽标</f-button>
    </f-badge>
    <f-badge value="ok" type="success">
      <f-button>success徽标</f-button>
    </f-badge>
    <f-badge :value="200" :max="99">
      <f-button>最大数值</f-button>
    </f-badge>
  </f-space>
</template>
```

</template>

</card>

<card>

## 自定义提示内容

可以提示非数字的徽标

<template #example>

  <Custom/>
  
</template>

<template #template>

```html
<template>
  <f-space :size="24">
    <f-badge value="hot">
      <f-button>热点</f-button>
    </f-badge>
    <f-badge value="new">
      <f-button>回复</f-button>
    </f-badge>
    <f-badge is-dot>红点模式</f-badge>
  </f-space>
</template>
```

</template>

</card>

## Props

| 参数   | 说明                              | 类型           | 可选值                                      | 默认值 |
| ------ | --------------------------------- | -------------- | ------------------------------------------- | ------ |
| value  | 显示值                            | string, number | —                                           | —      |
| max    | 最大值，超过最大值会显示 '{max}+' | number         | —                                           | —      |
| is-dot | 小圆点                            | boolean        | —                                           | false  |
| hidden | 隐藏 badge                        | boolean        | —                                           | false  |
| type   | 类型                              | string         | primary / success / warning / danger / info | —      |
