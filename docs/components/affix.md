---
title: 图钉 Affix
---

<script setup>
import Basic from './demo/Affix/Basic.vue'
import Position from './demo/Affix/Position.vue'
</script>

固钉用于把元素固定在窗口或指定容器的可视区域内，滚动时保持可见，常用于侧边导航、操作工具栏与返回顶部入口。

<card>

## 基础用法

原生滚动相对于 window 窗口固定，也可以结合 scrollbar 进行配置。向下滚动本页，蓝色按钮会吸附在距窗口顶部 100px 的位置。

::: tip
固钉进入固定状态后是相对视口定位的。若宿主页面存在层级更高的元素（例如固定顶栏），需要显式调大 `z-index`，否则按钮虽然已固定但会被遮挡、看起来像没生效。本页示例统一设为 `1000`。
:::

<template #example>

  <Basic/>

</template>

<template #template>

```vue
<template>
  <f-affix :offset="100" :z-index="1000">
    <f-button type="primary">固定在顶部100的位置</f-button>
  </f-affix>
</template>
```

</template>

</card>

<card>

## 固定位置

可以设置固定距离底部的位置。滚动本页时观察按钮吸附在距窗口底部 20px 的位置。

<template #example>

  <Position/>

</template>

<template #template>

```vue
<template>
  <f-affix :offset="20" position="bottom" :z-index="1000">
    <f-button type="primary">固定在底部20的位置</f-button>
  </f-affix>
</template>
```

</template>

</card>

## Props

| 参数     | 说明                 | 类型   | 可选值      | 默认值 |
| -------- | -------------------- | ------ | ----------- | ------ |
| target   | 目标容器选择器，指定滚动监听的元素，默认监听 window | String | — | ''     |
| offset   | 距离窗口位置触发     | Number | —           | 0      |
| position | 可设置距离顶部或底部 | String | top、bottom | top    |
| z-index  | 层级；宿主页面有高层级固定元素时需调大 | Number | — | 10 |

## Events

| 事件名 | 说明                                       | 返回值     |
| ------ | ------------------------------------------ | ---------- |
| change | 在固定状态发生改变时触发                   | true/false |
| scroll | 滚动响应事件 ,返回对象包含scrollTop, fixed | Object     |

## Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 警告提示内容 |
