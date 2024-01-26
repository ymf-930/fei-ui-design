---
title: 滚动组件 Scrollbar
---

<script setup>
import Basic from './demo/Scrollbar/Basic.vue'
import Always from './demo/Scrollbar/Always.vue'
import Custom from './demo/Scrollbar/Custom.vue'
</script>

##### 由于默认浏览器滚动条极为丑陋切不同浏览器之间样式不统一，故封装一个滚动组件用于实现滚动

<card>

## 基础用法

使用`f-scrollbar`进行包裹，默认`slot`为内容显示区域,如当前示例所包含的滚动结构如下:

<template #example>

  <Basic/>
  
</template>

<template #template>

注意：如果内容区域不超过容器高度则不会生成滚动条

```html
<template>
  <div style="height: 300px">
    <f-scrollbar ref="componentScrollBar" style="height: 100%">
      <p v-for="i in 40" :key="i">我是填充内容....</p>
    </f-scrollbar>
  </div>
</template>
```

</template>

</card>

<card>

## 始终显示

使用`always`可以让滚动条始终显示出来

<template #example>

  <Always/>
  
</template>

<template #template>

```html
<template>
  <div style="height: 300px">
    <f-scrollbar ref="componentScrollBar" always noresize>
      <p v-for="i in 40" :key="i">我是填充内容....</p>
    </f-scrollbar>
  </div>
</template>
```

</template>

</card>

<card>

## 定制滚动条的样式

可以借助不同的props来定制滚动条的样式，也可以使用css来实现样式修改。

<template #example>

  <Custom/>
  
</template>

<template #template>

```html
<template>
  <div style="height: 300px">
    <f-scrollbar
      ref="componentScrollBar"
      always
      noresize
      :bar-style="{ background: 'rgba(110, 23, 122, 0.3)' }"
      :bar-wrap-style="{ background: 'rgba(0, 0, 0, 0.03)' }"
    >
      <p v-for="i in 40" :key="i">我是填充内容....</p>
    </f-scrollbar>
  </div>
</template>
```

</template>

</card>

## 注意事项

- f-scrollbar的父层要有固定高度
- f-scrollbar的高度要设成100%
- 如果出现横滚动条，请添加css（.fei-scrollbar\_\_wrap{overflow-x:hidden;}）

## Props

| 参数         | 说明                                                    | 类型    | 可选值 | 默认值 |
| ------------ | ------------------------------------------------------- | ------- | ------ | ------ |
| native       | 是否采用原生滚动 (隐藏原生滚动条)                       | Boolean | true   | false  |
| always       | 是否一直显示，而非悬停显示                              | Boolean | true   | false  |
| wrapStyle    | 内联方式 自定义wrap容器的样式                           | Object  | -      | {}     |
| wrapClass    | 类名方式 自定义wrap容器的样式                           | Object  | -      | {}     |
| viewClass    | 类名方式 自定义view容器的样式                           | Object  | -      | {}     |
| viewStyle    | 内联方式 自定义view容器的样式                           | Object  | -      | {}     |
| barStyle     | 滚动条thumb样式                                         | Object  | -      | {}     |
| barWrapStyle | 滚动条bar样式                                           | Object  | -      | {}     |
| noresize     | 如果 container 尺寸不会发生变化，最好设置它可以优化性能 | Boolean | true   | false  |
