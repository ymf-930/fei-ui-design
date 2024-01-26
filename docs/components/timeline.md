---
title: 时间线 Timeline
---

<script setup>
import Basic from './demo/Timeline/Basic.vue'
import Color from './demo/Timeline/Color.vue'
import Pending from './demo/Timeline/Pending.vue'
import CustomIcon from './demo/Timeline/CustomIcon.vue'
</script>

##### 时间线组件

<card>

## 基础用法

简单定义一个时间轴的方法

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-timeline>
    <f-timeline-item>
      <p class="time">2023年4月12日</p>
      <p class="content">初始化fei-ui-design</p>
    </f-timeline-item>
    <f-timeline-item>
      <p class="time">2023年4月21日</p>
      <p class="content">发布1.1.0版本，新增几个基础组件</p>
    </f-timeline-item>
    <f-timeline-item>
      <p class="time">2023年7月24日</p>
      <p class="content">发布1.5.0版本，增加大量表单组件和常用组件</p>
    </f-timeline-item>
    <f-timeline-item>
      <p class="time">2023年8月23日</p>
      <p class="content">发布2.0.0版本，正式实现表格菜单等组件</p>
    </f-timeline-item>
  </f-timeline>
</template>
```

</template>

<template #style>

```html
<style scoped>
.time {
  margin: 0 !important;
  font-size: 14px;
  font-weight: bold;
}
.content {
  margin: 0;
  padding: 0 0 0 5px !important;
}
</style>
```

</template>

</card>

<card>

## 设置颜色

用各种颜色来标识不同状态，可以使用success、info、warning, danger或自定义的颜色，默认是 primary 。

<template #example>

  <Color/>
  
</template>

<template #template>

```html
<template>
  <f-timeline-item color="primary">发布1.0版本</f-timeline-item>
  <f-timeline-item color="info">发布1.5版本</f-timeline-item>
  <f-timeline-item color="warning">错误修复</f-timeline-item>
  <f-timeline-item color="danger">严重故障</f-timeline-item>
  <f-timeline-item color="success">发布2.0版本</f-timeline-item>
  <f-timeline-item color="#ff30b5">里程碑发布</f-timeline-item>
</template>
```

</template>

</card>

<card>

## 最后一个节点设置

通过添加`pending`属性来标记最后一个为节点

<template #example>

  <Pending/>
  
</template>

<template #template>

```html
<template>
  <f-timeline pending>
    <f-timeline-item>发布1.0版本</f-timeline-item>
    <f-timeline-item>发布1.5版本</f-timeline-item>
    <f-timeline-item>发布2.0版本</f-timeline-item>
    <f-timeline-item>持续更新...</f-timeline-item>
  </f-timeline>
</template>
```

</template>

</card>

<card>

## 自定义节点图标

默认是空心远点，可以自定义轴点图标

<template #example>

  <CustomIcon/>
  
</template>

<template #template>

```html
<template>
  <f-timeline>
    <f-timeline-item color="success" dot-top="10px">
      <template #dot>
        <f-icon name="heart-fill" size="20"></f-icon>
      </template>
      <span>正式版上线</span>
    </f-timeline-item>
    <f-timeline-item>发布2.0版本</f-timeline-item>
    <f-timeline-item>发布1.5版本</f-timeline-item>
    <f-timeline-item>发布1.0版本</f-timeline-item>
  </f-timeline>
</template>
```

</template>

</card>

## Timeline Props

| 参数    | 说明                 | 类型    | 可选值 | 默认值 |
| ------- | -------------------- | ------- | ------ | ------ |
| pending | 指定是否最后一个节点 | Boolean | —      | false  |

## TimelineItem Props

| 参数    | 说明        | 类型   | 可选值                                               | 默认值  |
| ------- | ----------- | ------ | ---------------------------------------------------- | ------- |
| color   | 圆圈颜色    | String | primary,success,info,warning,danger,或者自定义颜色值 | primary |
| dot-top | dot顶部偏移 | String | 自定义dot距离顶部的偏移量                            | —       |

## TimelineItem Slot

| 名称    | 说明               |
| ------- | ------------------ |
| default | 基本内容           |
| dot     | 自定义时间轴点内容 |
