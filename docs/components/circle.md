---
title: 进度环 Circle
---

<script setup>
import Basic from './demo/Circle/Basic.vue'
import Progress from './demo/Circle/Progress.vue'
import Style from './demo/Circle/Style.vue'
import Dashboard from './demo/Circle/Dashboard.vue'
</script>

##### 显示环形图，可以显示任务百分比或者是统计某些数据的占比情况

<card>

## 基础用法

直接用组件默认插槽插入即可

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div flex="main:justify" style="width: 400px">
    <f-circle :percent="80">
      <span class="demo-circle-inner" style="font-size: 24px">80%</span>
    </f-circle>
    <f-circle :percent="100" stroke-color="#5cb85c">
      <f-icon name="check" size="30" style="color: #5cb85c"></f-icon>
    </f-circle>
    <f-circle :percent="35" stroke-color="#ff5500">
      <span class="demo-circle-inner">
        <f-icon name="close" size="30" style="color: #ff5500"></f-icon>
      </span>
    </f-circle>
  </div>
</template>
```

</template>

</card>

<card>

## 动态进度

可以配合外部操作进度

<template #example>

  <Progress/>
  
</template>

<template #template>

```html
<template>
  <div flex="main:justify" style="width: 300px">
    <f-circle :percent="percent" :stroke-color="color">
      <f-icon v-if="percent === 100" name="check" size="50" style="color: #5cb85c"></f-icon>
      <span v-else style="font-size: 24px">{{ percent }}%</span>
    </f-circle>

    <f-button-group>
      <f-button icon="minus" @click="minus"></f-button>
      <f-button icon="plus" @click="add"></f-button>
    </f-button-group>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref, computed } from 'vue'
  const percent = ref(10)

  const color = computed(() => {
    let color = '#2db7f5'
    if (percent.value === 100) {
      color = '#5cb85c'
    }
    return color
  })

  function add() {
    percent.value += 10
    if (percent.value >= 100) percent.value = 100
  }

  function minus() {
    percent.value -= 10
    if (percent.value < 0) percent.value = 0
  }
</script>
```

</template>

</card>

<card>

## 设置样式

可以配置更多的自定义样式

<template #example>

  <Style/>
  
</template>

<template #template>

```html
<template>
  <f-circle
    :size="250"
    :trail-width="4"
    :stroke-width="5"
    :percent="75"
    stroke-linecap="square"
    stroke-color="#43a3fb"
  >
    <div class="demo-Circle-custom">
      <h1>42,001,776</h1>
      <p>消费人群规模</p>
      <span>
        总占人数
        <i>75%</i>
      </span>
    </div>
  </f-circle>
</template>
```

</template>

</card>

<card>

## 仪表盘模式

通过设置属性 `dashboard`，可以很方便地实现仪表盘样式。

<template #example>

  <Dashboard/>
  
</template>

<template #template>

```html
<template>
  <f-circle :percent="80" dashboard>
    <span class="demo-circle-inner" style="font-size: 24px">80%</span>
  </f-circle>
</template>
```

</template>

</card>

## Props

| 参数           | 说明                      | 类型    | 可选值                   | 默认值  |
| -------------- | ------------------------- | ------- | ------------------------ | ------- |
| percent        | 百分比                    | Number  | —                        | 0       |
| size           | 图表的宽度和高度，单位 px | Number  | —                        | 120     |
| stroke-linecap | 进度环顶端的形状          | String  | square（方）/round（圆） | round   |
| stroke-width   | 进度环的线宽，单位 px     | Number  | —                        | 6       |
| stroke-color   | 进度环的颜色              | String  | —                        | #2db7f5 |
| trail-width    | 进度环背景的线宽，单位 px | Number  | —                        | 5       |
| trail-color    | 进度环背景的颜色          | String  | —                        | #eaeef2 |
| dashboard      | 是否显示为仪表盘          | Boolean | —                        | false   |
