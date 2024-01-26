---
title: 标签 Tag
---

<script setup>
import Basic from './demo/Tag/Basic.vue'
import Colors from './demo/Tag/Colors.vue'
import Checked from './demo/Tag/Checked.vue'
import Closed from './demo/Tag/Closed.vue'
import Dots from './demo/Tag/Dots.vue'
import Dynamic from './demo/Tag/Dynamic.vue'
import Custom from './demo/Tag/Custom.vue'
</script>

# 标签 Tag

<card>

## 基础用法

直接使用默认插槽即可

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-tag>default</f-tag>
    <f-tag type="primary">primary</f-tag>
    <f-tag type="success">success</f-tag>
    <f-tag type="info">info</f-tag>
    <f-tag type="warning">warning</f-tag>
    <f-tag type="danger">danger</f-tag>
  </div>
</template>
```

</template>

</card>

<card>

## 多种颜色

由 `dark` 属性来设置深色模式,并可以设置更多颜色类型的标签

<template #example>

  <Colors/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-tag>default</f-tag>
    <f-tag type="primary" dark>primary</f-tag>
    <f-tag type="success" dark>success</f-tag>
    <f-tag type="info" dark>info</f-tag>
    <f-tag type="warning" dark>warning</f-tag>
    <f-tag type="danger" dark>danger</f-tag>
    <f-tag type="magenta">magenta</f-tag>
    <f-tag type="red">red</f-tag>
    <f-tag type="volcano">volcano</f-tag>
    <f-tag type="orange">orange</f-tag>
    <f-tag type="gold">gold</f-tag>
    <f-tag type="cyan">cyan</f-tag>
    <f-tag type="blue">blue</f-tag>
    <f-tag type="geekblue">geekblue</f-tag>
    <f-tag type="purple">purple</f-tag>
  </div>
</template>
```

</template>

</card>

<card>

## 可选择标签

设置 `checkable` 属性可以定义一个标签是否可可选择。

<template #example>

  <Checked/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div class="mb-10">
      <f-tag type="primary" dark checkable><span>primary</span></f-tag>
      <f-tag type="success" dark checkable>success</f-tag>
      <f-tag type="info" dark checkable>info</f-tag>
      <f-tag type="warning" dark checkable>warning</f-tag>
      <f-tag type="danger" dark checkable>danger</f-tag>
      <f-tag type="magenta" dark checkable>magenta</f-tag>
      <f-tag type="red" dark checkable>red</f-tag>
      <f-tag type="volcano" dark checkable>volcano</f-tag>
      <f-tag type="orange" dark checkable>orange</f-tag>
      <f-tag type="gold" dark checkable>gold</f-tag>
      <f-tag type="cyan" dark checkable>cyan</f-tag>
      <f-tag type="blue" dark checkable>blue</f-tag>
      <f-tag type="geekblue" dark checkable>geekblue</f-tag>
      <f-tag type="purple" dark checkable>purple</f-tag>
    </div>
    <div>
      <f-tag type="primary" checkable><span>primary</span></f-tag>
      <f-tag type="success" checkable>success</f-tag>
      <f-tag type="info" checkable>info</f-tag>
      <f-tag type="warning" checkable>warning</f-tag>
      <f-tag type="danger" checkable>danger</f-tag>
      <f-tag type="magenta" checkable>magenta</f-tag>
      <f-tag type="red" checkable>red</f-tag>
      <f-tag type="volcano" checkable>volcano</f-tag>
      <f-tag type="orange" checkable>orange</f-tag>
      <f-tag type="gold" checkable>gold</f-tag>
      <f-tag type="cyan" checkable>cyan</f-tag>
      <f-tag type="blue" checkable>blue</f-tag>
      <f-tag type="geekblue" checkable>geekblue</f-tag>
      <f-tag type="purple" checkable>purple</f-tag>
    </div>
  </div>
</template>
```

</template>

</card>

<card>

## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。

<template #example>

  <Closed/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-tag type="primary" closable>标签一</f-tag>
    <f-tag type="success" closable>标签二</f-tag>
    <f-tag type="info" closable>标签三</f-tag>
    <f-tag type="warning" closable>标签四</f-tag>
    <f-tag type="danger" closable>标签五</f-tag>
  </div>
</template>
```

</template>

</card>

<card>

## 小圆点模式

设置 `dot` 模式可以简单显示带有提示小圆点等内容

<template #example>

  <Dots/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-tag type="default" dot><span>default</span></f-tag>
    <f-tag type="primary" dot><span>primary</span></f-tag>
    <f-tag type="success" dot>success</f-tag>
    <f-tag type="info" dot>info</f-tag>
    <f-tag type="warning" dot>warning</f-tag>
    <f-tag type="danger" dot>danger</f-tag>
    <f-tag type="magenta" dot>magenta</f-tag>
    <f-tag type="red" dot>red</f-tag>
    <f-tag type="volcano" dot>volcano</f-tag>
    <f-tag type="orange" dot>orange</f-tag>
    <f-tag type="gold" dot>gold</f-tag>
    <f-tag type="cyan" dot>cyan</f-tag>
    <f-tag type="blue" dot>blue</f-tag>
    <f-tag type="geekblue" dot>geekblue</f-tag>
    <f-tag type="purple" dot>purple</f-tag>
  </div>
</template>
```

</template>

</card>

<card>

## 动态编辑标签

<template #example>

  <Dynamic/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button class="button-new-tag" size="small" icon="plus" @click="addOne">New Tag</f-button>
    <p>
      <f-tag
        v-for="tag in data.dynamicTags"
        :key="tag"
        type="primary"
        closable
        @close="handleCloseTag(tag)"
      >
        {{ tag }}
      </f-tag>
    </p>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { reactive, toRefs } from 'vue'
const data = reactive({
  dynamicTags: ['标签一', '标签二', '标签三'],
  count: 0
})
const handleCloseTag = (tag: string) => {
  data.dynamicTags.splice(data.dynamicTags.indexOf(tag), 1)
}
const addOne = () => {
  data.count++
  data.dynamicTags.push('new tag' + data.count)
}
</script>
```

</template>

</card>

<card>

## 自定义样式

具有多种自定义样式的方式可供选择

<template #example>

  <Custom/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-tag color="#ffa2d3">Custom Color</f-tag>
    <f-tag type="primary" no-border font-size="14px">No Border</f-tag>
    <f-tag :tag-style="{ backgroundColor: '#5AFAFC', color: '#606266' }">Style</f-tag>
    <f-tag closable>Default</f-tag>
  </div>
</template>
```

</template>

</card>

## Props

| 参数       | 说明                             | 类型    | 可选值                      | 默认值 |
| ---------- | -------------------------------- | ------- | --------------------------- | ------ |
| closable   | 是否可关闭                       | Boolean | —                           | false  |
| type       | 主题                             | String  | success/info/warning/danger | —      |
| dot        | 是否显示是小圆点                 | Boolean | —                           | false  |
| no-border  | 是否关闭边框                     | Boolean | —                           | false  |
| color      | 背景颜色(可自定义)               | String  | —                           | —      |
| fontSize   | 字体大小                         | String  | —                           | —      |
| tag-style  | 标签样式(完全控制，尽量不要设置) | String  | —                           | —      |
| checkable  | 是否可选中                       | Boolean | —                           | false  |
| modelValue | 选中状态可以使用v-model双向绑定  | Boolean | —                           | true   |

## Events

| 事件名 | 说明                              | 返回值       |
| ------ | --------------------------------- | ------------ |
| close  | 关闭事件回调                      | event        |
| click  | 点击事件回调                      | event        |
| change | 选中事件回调,第二项需要设置name值 | checked,name |
