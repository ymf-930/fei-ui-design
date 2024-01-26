---
title: 步骤 Steps
---

<script setup>
import Basic from './demo/Steps/Basic.vue'
import Small from './demo/Steps/Small.vue'
import Icon from './demo/Steps/Icon.vue'
import Vertical from './demo/Steps/Vertical.vue'
import Status from './demo/Steps/Status.vue'
</script>

##### 提示某个任务的步骤

<card>

## 基础用法

基本用法，组件会根据current自动判断各步骤状态。

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-steps :current="current">
      <f-step title="已完成" content="这里是该步骤的描述信息"></f-step>
      <f-step title="进行中" content="这里是该步骤的描述信息"></f-step>
      <f-step title="待进行" content="这里是该步骤的描述信息"></f-step>
      <f-step title="待进行" content="这里是该步骤的描述信息"></f-step>
    </f-steps>
    <f-button type="primary" @click="next">下一步</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(0)

function next() {
  if (current.value === 3) {
    current.value = 0
  } else {
    current.value += 1
  }
}
</script>
```

</template>

</card>

<card>

## 小型步骤条

设置 `size="small"`开启显示小型步骤条

<template #example>

  <Small/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-steps :current="current" size="small">
      <f-step title="已完成"></f-step>
      <f-step title="进行中"></f-step>
      <f-step title="待进行"></f-step>
      <f-step title="待进行"></f-step>
    </f-steps>
    <f-button type="primary" @click="next">下一步</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(0)

function next() {
  if (current.value === 3) {
    current.value = 0
  } else {
    current.value += 1
  }
}
</script>
```

</template>

</card>

<card>

## 自定义图标

设置 `icon`自定义设置图标

<template #example>

  <Icon/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-steps :current="current">
      <f-step title="已完成" icon="sketch"></f-step>
      <f-step title="进行中" icon="block"></f-step>
      <f-step title="待进行" icon="Gitlab"></f-step>
    </f-steps>
    <f-button type="primary" @click="next">下一步</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(0)

function next() {
  if (current.value === 2) {
    current.value = 0
  } else {
    current.value += 1
  }
}
</script>
```

</template>

</card>

<card>

## 竖型步骤

设置`direction="vertical"`可以开启竖向的步骤

<template #example>

  <Vertical/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-steps :current="current" direction="vertical">
      <f-step title="已完成" content="这里是该步骤的描述信息"></f-step>
      <f-step title="进行中" content="这里是该步骤的描述信息"></f-step>
      <f-step title="待进行" content="这里是该步骤的描述信息"></f-step>
      <f-step title="待进行" content="这里是该步骤的描述信息"></f-step>
    </f-steps>
    <f-button type="primary" @click="next">下一步</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(0)

function next() {
  if (current.value === 3) {
    current.value = 0
  } else {
    current.value += 1
  }
}
</script>
```

</template>

</card>

<card>

## 设置状态

基本用法，组件会根据current自动判断各步骤状态。

<template #example>

  <Status/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-steps :current="2" status="error">
      <f-step title="已完成" content="这里是该步骤的描述信息"></f-step>
      <f-step title="进行中" content="这里是该步骤的描述信息"></f-step>
      <f-step title="待进行" content="这里是该步骤的描述信息"></f-step>
      <f-step title="待进行" content="这里是该步骤的描述信息"></f-step>
    </f-steps>
  </div>
</template>
```

</template>

</card>

## Steps Props

| 参数      | 说明           | 类型   | 可选值                                | 默认值     |
| --------- | -------------- | ------ | ------------------------------------- | ---------- |
| current   | 当前步骤       | Number | —                                     | 0          |
| status    | 当前步骤的状态 | String | wait、process、finish、error、success | process    |
| size      | 大小           | String | small                                 | —          |
| direction | 方向           | String | horizontal（水平）或vertical（垂直）  | horizontal |

## Step Props

| 参数    | 说明           | 类型   | 可选值                                | 默认值  |
| ------- | -------------- | ------ | ------------------------------------- | ------- |
| title   | 标题           | String | —                                     | —       |
| status  | 当前步骤的状态 | String | wait、process、finish、error、success | process |
| content | 详细内容(可选) | String | —                                     | —       |
| icon    | 自定义图标     | String | —                                     | —       |

## Step Slot

| 事件名  | 说明       |
| ------- | ---------- |
| title   | 标题       |
| content | 详细内容   |
| icon    | 自定义图标 |
