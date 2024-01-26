---
title: 分割面板 Split
---

<script setup>
import Basic from './demo/Split/Basic.vue'
import Horizontal from './demo/Split/Horizontal.vue'
import Mixed from './demo/Split/Mixed.vue'
import Normal from './demo/Split/Normal.vue'
import HideLine from './demo/Split/HideLine.vue'
</script>

##### 分割面板可自行拖放宽度/高度

<card>

## 基础用法

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 100%; height: 300px; border: 1px solid #ddd">
    <f-split>
      <template #left>
        <div class="left-container">左侧容器</div>
      </template>
      <template #right>
        <div class="right-container">右侧容器</div>
      </template>
    </f-split>
  </div>
</template>

```

</template>

</card>

<card>

## 水平分割

<template #example>

  <Horizontal/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 100%; height: 300px; border: 1px solid #ddd">
    <f-split split="horizontal" :default="100">
      <template #left>
        <div class="left-container">上边容器</div>
      </template>
      <template #right>
        <div class="right-container">下面容器</div>
      </template>
    </f-split>
  </div>
</template>
```

</template>

</card>

<card>

## 嵌套使用

<template #example>

  <Mixed/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 100%; height: 300px; border: 1px solid #ddd">
    <f-split>
      <template #left>
        <div class="left-container">左侧容器</div>
      </template>
      <template #right>
        <f-split split="horizontal" :default="100">
          <template #left>
            <div class="top-container">上部容器</div>
          </template>
          <template #right>
            <div class="bottom-container">下部容器</div>
          </template>
        </f-split>
      </template>
    </f-split>
  </div>
</template>
```

</template>

</card>

<card>

## 设置默认样式

如设置了默认样式，双击分割线可重置默认设置的大小。

<template #example>

  <Normal/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 100%; height: 300px; border: 1px solid #ddd">
    <f-split :default-wrap-style="['20%', '80%']">
      <template #left>
        <div class="left-container">左侧容器</div>
      </template>
      <template #right>
        <f-split split="horizontal" :default="100" :default-wrap-style="['50%', '50%']">
          <template #left>
            <div class="left-container">上边容器</div>
          </template>
          <template #right>
            <div class="right-container">下面容器</div>
          </template>
        </f-split>
      </template>
    </f-split>
  </div>
</template>
```

</template>

</card>

<card>

## 隐藏分割线

<template #example>

  <HideLine/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 100%; height: 300px; border: 1px solid #ddd">
    <f-split :default="240" hide-line>
      <template #left>
        <div class="left-container">左侧容器</div>
      </template>
      <template #right>
        <div class="right-container">下面容器</div>
      </template>
    </f-split>
  </div>
</template>
```

</template>

</card>

## Props

| 参数               | 说明                                                                         | 类型    | 可选值                   | 默认值   |
| ------------------ | ---------------------------------------------------------------------------- | ------- | ------------------------ | -------- |
| split              | 分割类型                                                                     | String  | 'vertical', 'horizontal' | vertical |
| min                | 最小像素                                                                     | Number  | —                        | 60       |
| default            | 默认百分比                                                                   | Number  | —                        | 200      |
| default-wrap-style | 默认容器样式 ,一个数组，可分别指定两个容器大小，可为像素或百分比，开始时生效 | Array[] | —                        | —        |
| hide-line          | 是否隐藏分割线                                                               | Boolean | —                        | false    |
| resizer-color      | 自定义分割线颜色（自定义颜色后hide-line不生效）                              | String  | —                        | —        |
| class-name         | 自定义resizer样式名称                                                        | String  | —                        | —        |

## Events

| 事件名 | 说明     | 返回值  |
| ------ | -------- | ------- |
| resize | 重置大小 | percent |

## Slot

| 名称  | 说明                                                 |
| ----- | ---------------------------------------------------- |
| left  | split 为 vertical 时左边面板 horizontal 时为上边面板 |
| right | split 为 vertical 时右边面板 horizontal 时为下边面板 |
