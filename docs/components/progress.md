---
title: 进度条 Progress
---

<script setup>
import Basic from './demo/Progress/Basic.vue'
import Inside from './demo/Progress/Inside.vue'
import Style from './demo/Progress/Style.vue'
import Progress from './demo/Progress/Progress.vue'
</script>

##### 展示操作或任务的当前进度，比如上传文件。

<card>

## 基础用法

Progress 组件设置 `percent` 属性即可，表示进度条对应的百分比，必填，必须在 0-100。

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 350px">
    <div class="mb-16">
      <f-progress :percent="0"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress :percent="70" status="text" active><span>进度70</span></f-progress>
    </div>
    <div class="mb-16">
      <f-progress :percent="100" status="success"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress :percent="50" status="exception"></f-progress>
    </div>
  </div>
</template>
```

</template>

</card>

<card>

## 文字内显示

可以设置 `text-inside` 来配置文字内显示模式

<template #example>

  <Inside/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 350px">
    <div class="mb-16">
      <f-progress text-inside :stroke-width="20" :percent="0"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress text-inside :stroke-width="20" :percent="70"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress
        text-inside
        :stroke-width="20"
        :percent="80"
        color="rgba(142, 113, 199, 0.7)"
      ></f-progress>
    </div>
    <div class="mb-16">
      <f-progress text-inside :stroke-width="20" :percent="100" status="success"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress text-inside :stroke-width="20" :percent="50" status="exception"></f-progress>
    </div>
  </div>
</template>
```

</template>

</card>

<card>

## 设置样式

可以设置 `color` 和 `radius`等 来配置属性样式、通过开启active可以开启动画样式

<template #example>

  <Style/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 350px">
    <div class="mb-16">
      <f-progress :percent="70" :show-text="false"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress :percent="40" color="#76eeff"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress text-inside :stroke-width="20" :percent="60" color="#df52ff"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress :stroke-width="20" :percent="30" color="#ffcf2f"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress :percent="60" status="text" active><span>进度60</span></f-progress>
    </div>
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
  <div style="width: 350px">
    <f-progress :stroke-width="20" :percent="percent" active color="#ff86d8"></f-progress>

    <div class="mt-16">
      <f-button-group>
        <f-button icon="minus" size="mini" @click="minus"></f-button>
        <f-button icon="plus" size="mini" @click="add"></f-button>
      </f-button-group>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const percent = ref(10)

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

## Props

| 参数         | 说明                         | 类型    | 可选值                 | 默认值  |
| ------------ | ---------------------------- | ------- | ---------------------- | ------- |
| percent      | 百分比                       | Number  | —                      | 0       |
| status       | 进度条状态                   | String  | text/success/exception | —       |
| stroke-width | 进度条的线宽，单位 px        | Number  | —                      | 8       |
| text-inside  | 进度条显示文字内置在进度条内 | Boolean | —                      | false   |
| show-text    | 是否显示进度文字             | Boolean | —                      | true    |
| bg-color     | 进度条背景颜色               | String  | —                      | #f3f3f3 |
| color        | 进度条的颜色                 | String  | —                      | #2d8cf0 |
| radius       | 进度条的圆角                 | String  | —                      | 100px   |
| active       | 进度条背景动画               | Boolean | —                      | false   |
