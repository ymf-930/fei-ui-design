---
title: 分页器 Page
---

<script setup>
import Basic from './demo/Page/Basic.vue'
import Number from './demo/Page/Number.vue'
import Elevator from './demo/Page/Elevator.vue'
import Total from './demo/Page/Total.vue'
import Mini from './demo/Page/Mini.vue'
import Text from './demo/Page/Text.vue'
import Simple from './demo/Page/Simple.vue'
</script>

##### 空显示状态，用于给内部无数据情况的展示。十分简单

<card>

## 基础用法

直接用组件默认插槽插入即可

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-page v-model:current="current" :total="100"></f-page>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(2)
</script>
```

</template>

</card>

<card>

## 每页数量

<template #example>

  <Number/>
  
</template>

<template #template>

```html
<template>
  <f-page v-model:current="current" :total="100" show-sizer></f-page>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(2)
</script>
```

</template>

</card>

<card>

## 电梯

<template #example>

  <Elevator/>
  
</template>

<template #template>

```html
<template>
  <f-page v-model:current="current" :total="100" show-elevator></f-page>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(2)
</script>
```

</template>

</card>

<card>

## 总数

<template #example>

  <Total/>
  
</template>

<template #template>

```html
<template>
  <f-page v-model:current="current" :total="100" show-total></f-page>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(2)
</script>
```

</template>

</card>

<card>

## mini型

<template #example>

  <Mini/>
  
</template>

<template #template>

```html
<template>
  <f-page
    v-model:current="current"
    :total="100"
    size="small"
    show-elevator
    show-sizer
    show-total
  ></f-page>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(2)
</script>
```

</template>

</card>

<card>

## 上一页下一页文字

<template #example>

  <Text/>
  
</template>

<template #template>

```html
<template>
  <f-page v-model:current="current" :total="100" prev-text="上一页" next-text="下一页"></f-page>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(2)
</script>
```

</template>

</card>

<card>

## 简洁模式

<template #example>

  <Simple/>
  
</template>

<template #template>

```html
<template>
  <f-page v-model:current="current" :total="100" simple></f-page>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(2)
</script>
```

</template>

</card>

## Props

| 参数           | 说明                                  | 类型    | 可选值        | 默认值           |
| -------------- | ------------------------------------- | ------- | ------------- | ---------------- |
| current        | 当前页码 支持v-model:current修饰      | Number  | —             | 1                |
| total          | 数据总数                              | Number  | —             | 0                |
| page-size      | 每页条数                              | Number  | —             | 10               |
| page-size-opts | 每页条数切换的配置                    | Array   | —             | [10, 20, 30, 40] |
| placement      | 条数切换弹窗的展开方向                | string  | bottom 和 top | bottom           |
| size           | 可选值为small（迷你版）或不填（默认） | string  | —             | —                |
| simple         | 简洁版                                | Boolean | —             | false            |
| show-total     | 显示总数                              | Boolean | —             | false            |
| show-elevator  | 显示电梯，可以快速切换到某一页        | Boolean | —             | false            |
| show-sizer     | 显示分页，用来改变page-size           | Boolean | —             | false            |
| class-name     | 自定义 class 名称                     | String  | —             | —                |
| styles         | 自定义 style 样式                     | Object  | —             | —                |
| prev-text      | 替代图标显示的上一页文字              | String  | —             | —                |
| next-text      | 替代图标显示的下一页文字              | String  | —             | —                |

## Events

| 事件名      | 说明                                       | 返回值    |
| ----------- | ------------------------------------------ | --------- |
| change      | 页码改变的回调，返回改变后的页码           | 页码      |
| size-change | 切换每页条数时的回调，返回切换后的每页条数 | page-size |

## Slot

| 名称    | 说明                 |
| ------- | -------------------- |
| default | 自定义显示总数的内容 |
