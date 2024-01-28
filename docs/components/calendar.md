---
title: 日历组件 Calendar
---

<script setup>
import Basic from './demo/Calendar/Basic.vue'
import Mini from './demo/Calendar/Mini.vue'
</script>

##### 日历组件 Calendar

<card>

## 基础用法

简单的日历组件用于装饰页面

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-calendar></f-calendar>
</template>
```

</template>

</card>

<card>

## mini显示

简单的日历组件用于装饰页面

<template #example>

  <Mini/>
  
</template>

<template #template>

```html
<template>
  <div flex>
    <div style="width: 300px">
      <f-calendar mini></f-calendar>
    </div>
    <div style="width: 300px">
      <f-calendar
        mini
        :body-style="{ border: 'none' }"
        :day-style="{ border: 'none', borderRadius: '4px' }"
      ></f-calendar>
    </div>
  </div>
</template>
```

</template>

</card>

## Props

| 参数        | 说明                  | 类型    | 可选值            | 默认值 |
| ----------- | --------------------- | ------- | ----------------- | ------ |
| grid-height | 日期高度，不填默认 80 | String  | —                 | 80px   |
| text-align  | 日期对其方式          | String  | left center right | left   |
| mini        | 迷你模式              | Boolean | l—                | —      |
| body-style  | 日期表body样式        | Object  | —                 | —      |
| day-style   | 每天样式              | Object  | —                 | —      |

## Events

| 事件名   | 说明           | 返回值 |
| -------- | -------------- | ------ |
| prev     | 上个月按钮事件 | —      |
| next     | 下个月按钮事件 | —      |
| today    | 今天按钮事件   | —      |
| selected | 选中某一天事件 | day    |
