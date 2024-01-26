---
title: 数字动画 CountTo
---

<script setup>
import Basic from './demo/CountTo/Basic.vue'
import Options from './demo/CountTo/Options.vue'
</script>

##### 数字动画为常用组件，因此收录至组件库便于使用，整体源码参考vue-count-to实现，props参数也一样，由于纯数字显示，因此所有样式都可以自定义

<card>

## 基础用法

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button type="primary" @click="restart">restart</f-button>
    <div class="mt-15" flex="cross:center">
      <f-tag type="primary" dot font-size="14px">
        <f-count-to ref="countToRef" :start-val="startVal" :end-val="endVal"></f-count-to>
      </f-tag>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const startVal = ref(0)
  const endVal = ref(2023)
  const countToRef = ref(null)

  function restart() {
    countToRef.value?.restart()
  }
</script>
```

</template>

</card>

<card>

## 自定义参数

可以设置不同参数来定义时长、前缀、后缀、连接符等来定义显示

<template #example>

  <Options/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button type="primary" @click="restart">restart</f-button>
    <div class="mt-15" flex="cross:center">
      <div style="font-size: 18px; color: #1a5cff; width: 120px; margin-right: 16px">
        <f-count-to
          ref="countTo1"
          :start-val="startVal"
          :end-val="endVal"
          :duration="3000"
        ></f-count-to>
      </div>
      <div style="font-size: 18px; color: #1a5cff; width: 120px; margin-right: 16px">
        <f-count-to
          ref="countTo2"
          :start-val="startVal"
          :end-val="endVal"
          :duration="3000"
          :decimals="2"
        ></f-count-to>
      </div>
      <div style="font-size: 18px; color: #1a5cff; width: 120px; margin-right: 16px">
        <f-count-to
          ref="countTo3"
          :start-val="startVal"
          :end-val="endVal"
          :duration="3000"
          separator=""
        ></f-count-to>
      </div>
      <div style="font-size: 18px; color: #1a5cff; width: 120px; margin-right: 16px">
        <f-count-to
          ref="countTo4"
          :start-val="startVal"
          :end-val="endVal"
          :duration="3000"
          prefix="$"
          suffix="美金"
        ></f-count-to>
      </div>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const startVal = ref(0)
  const endVal = ref(2023)
  const countTo1 = ref(null)
  const countTo2 = ref(null)
  const countTo3 = ref(null)
  const countTo4 = ref(null)

  function restart() {
    countTo1.value?.restart()
    countTo2.value?.restart()
    countTo3.value?.restart()
    countTo4.value?.restart()
  }
</script>
```

</template>

</card>

## Props

| 参数      | 说明                     | 类型    | 可选值 | 默认值 |
| --------- | ------------------------ | ------- | ------ | ------ |
| startVal  | 开始值                   | Number  | —      | -      |
| endVal    | 结束值                   | Number  | —      | 2000   |
| duration  | 动画持续时间             | Number  | —      | 2000   |
| autoplay  | 是否自动播放             | Boolean | —      | true   |
| decimals  | 小数点精度               | Number  | —      | 0      |
| decimal   | 小数点显示               | String  | —      | .      |
| separator | 数字分割                 | String  | —      | ，     |
| prefix    | 前缀，用于显示之前的字符 | String  | —      | —      |
| suffix    | 后缀，用于显示之后的字符 | String  | —      | —      |

## Events

| 事件名   | 说明     | 返回值 |
| -------- | -------- | ------ |
| mounted  | 开始渲染 | 无     |
| callback | 调用结束 | 无     |

## Functions

| 事件名      | 说明       | 参数            |
| ----------- | ---------- | --------------- |
| count       | 获取当前值 | timestamp，时间 |
| start       | 开始       | 无              |
| pauseResume | 暂停和启动 | 无              |
| reset       | 重置       | 无              |
| restart     | 重启       | 无              |
