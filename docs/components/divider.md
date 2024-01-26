---
title: 分割线 Divider
---

<script setup>
import Basic from './demo/Divider/Basic.vue'
import Vertical from './demo/Divider/Vertical.vue'
import Align from './demo/Divider/Align.vue'
</script>


# 分割线 Divider

区隔内容的分割线。可以对对不同文本段落进行分割。可以对行内文字/链接进行分割。

<card>

## 水平分割线

默认为水平分割线，可在中间加入文字。 可以是虚线

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <p>这是一段文字...这是一段文字...这是一段文字...这是一段文字...这是一段文字...</p>
  <f-divider></f-divider>
  <p>这是一段文字...这是一段文字...这是一段文字...这是一段文字...这是一段文字...</p>
  <f-divider>With Text</f-divider>
  <p>这是一段文字...这是一段文字...这是一段文字...这是一段文字...这是一段文字...</p>
  <f-divider dashed></f-divider>
  <p>这是一段文字...这是一段文字...这是一段文字...这是一段文字...这是一段文字...</p>
</template>
```

</template>

</card>

<card>

## 垂直分割线

使用 type="vertical" 设置为行内的垂直分割线。

<template #example>

  <Vertical/>
  
</template>

<template #template>

```html
<template>
  <div>
    Text
    <f-divider type="vertical"></f-divider>
    <a href="#">Link1</a>
    <f-divider type="vertical"></f-divider>
    <a href="#">Link2</a>
  </div>
</template>
```

</template>

</card>

<card>

## 标题位置

align属性可以设置标题位置 使用 align="left" 设置为行内的垂直分割线。

<template #example>

  <Align/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div style="height: 25px">
      <f-divider align="left">左对齐</f-divider>
    </div>
    <div style="height: 25px">
      <f-divider align="center">居中对齐</f-divider>
    </div>
    <div style="height: 25px">
      <f-divider align="right">右对齐</f-divider>
    </div>
  </div>
</template>
```

</template>

</card>

## Props

| 参数   | 说明             | 类型    | 可选值                | 默认值     |
| ------ | ---------------- | ------- | --------------------- | ---------- |
| type   | 水平还是垂直类型 | String  | horizontal / vertical | horizontal |
| align  | 分割线标题的位置 | String  | left / right / center | center     |
| dashed | 是否虚线         | Boolean | false / true          | false      |
