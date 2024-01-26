---
title: 警告提示 Alert
---

<script setup>
import Basic from './demo/Alert/Basic.vue'
import Desc from './demo/Alert/Desc.vue'
import Icon from './demo/Alert/Icon.vue'
import Close from './demo/Alert/Close.vue'
import Banner from './demo/Alert/Banner.vue'
</script>

##### 静态的展示一些区块，提示或者警告，可以动态的去删除

<card>

## 基础用法

直接用组件默认插槽插入即可

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-alert>info alert</f-alert>
    <f-alert type="success">success alert</f-alert>
    <f-alert type="warning">warning alert</f-alert>
    <f-alert type="error">error alert</f-alert>
  </div>
</template>
```

</template>

</card>

<card>

## 包含描述信息

自定义`#desc`插入描述内容。

<template #example>

  <Desc/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-alert>
      info alert
      <template #desc>我是描述信息...</template>
    </f-alert>
    <f-alert type="success">
      success alert
      <template #desc>我是描述信息...</template>
    </f-alert>
    <f-alert type="warning">
      warning alert
      <template #desc>我是描述信息...</template>
    </f-alert>
    <f-alert type="error">
      error alert
      <template #desc>我是描述信息...</template>
    </f-alert>
  </div>
</template>
```

</template>

</card>

<card>

## 图标

根据 `type` 属性自动添加不同图标，或者自定义图标 `slot` 。

<template #example>

  <Icon/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-alert show-icon>info alert</f-alert>
    <f-alert type="success" show-icon>success alert</f-alert>
    <f-alert type="warning" show-icon>warning alert</f-alert>
    <f-alert type="error" show-icon>
      error alert
      <template #desc>Custom error description copywriting.</template>
    </f-alert>
    <f-alert show-icon>
      自定义icon
      <template #icon>
        <f-icon name="smile"></f-icon>
      </template>
      <template #desc>自定义icon描述</template>
    </f-alert>
  </div>
</template>
```

</template>

</card>

<card>

## 可以关闭

设置属性 `closable` 可以设置提示可关闭

<template #example>

  <Close/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-alert closable>An info prompt</f-alert>
    <f-alert type="success" show-icon closable>
      A success prompt
      <template #desc>
        Content of prompt. Content of prompt. Content of prompt. Content of prompt.
      </template>
    </f-alert>
    <f-alert type="warning" closable>
      Custom closing content
      <template #close>No longer prompt</template>
    </f-alert>
  </div>
</template>
```

</template>

</card>

<card>

## 顶部公告样式

设置属性 `banner` 可以应用顶部公告的样式。

<template #example>

  <Banner/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-alert banner>公告样式...</f-alert>
    <f-alert banner closable type="warning">公告样式...</f-alert>
  </div>
</template>
```

</template>

</card>

## Props

| 参数      | 说明         | 类型    | 可选值                        | 默认值 |
| --------- | ------------ | ------- | ----------------------------- | ------ |
| type      | 警告提示样式 | String  | info、success、warning、error | info   |
| closable  | 是否可关闭   | Boolean | —                             | false  |
| show-icon | 是否显示图标 | Boolean | —                             | false  |

## Events

| 事件名 | 说明       | 返回值 |
| ------ | ---------- | ------ |
| close  | 关闭时触发 | event  |

## Slot

| 名称    | 说明                   |
| ------- | ---------------------- |
| default | 警告提示内容           |
| desc    | 警告提示辅助性文字介绍 |
| icon    | 自定义图标内容         |
| close   | 自定义关闭内容         |
