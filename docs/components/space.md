---
title: 间距 Space
---

<script setup>
import Basic from './demo/Space/Basic.vue'
import Vertical from './demo/Space/Vertical.vue'
import Size from './demo/Space/Size.vue'
import Number from './demo/Space/Number.vue'
import Wrap from './demo/Space/Wrap.vue'
import Split from './demo/Space/Split.vue'
import Align from './demo/Space/Align.vue'
</script>


##### 可以设置组件和不同dom之间的间距，用于设置相同间隔，方便使用

<card>

## 基础用法

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-space>
    space
    <f-button type="primary">Button</f-button>
    <f-button icon="upload">Button</f-button>
    <f-button type="danger">Delete</f-button>
  </f-space>
</template>
```

</template>

</card>

<card>

## 垂直间距

<template #example>

  <Vertical/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-space direction="vertical">
      <f-card width="480px" head-tip header="Card">
        <p>card content</p>
        <p>card content</p>
      </f-card>
      <f-card width="480px" head-tip header="Card">
        <p>card content</p>
        <p>card content</p>
      </f-card>
    </f-space>
  </div>
</template>
```

</template>

</card>

<card>

## 间距大小

<template #example>

  <Size/>
  
</template>

<template #template>

```html
<template>
  <f-space direction="vertical" alignment="start" :size="30">
    <f-radio-group v-model="size" type="capsule">
      <f-radio :label="'mini'">迷你</f-radio>
      <f-radio :label="'small'">小</f-radio>
      <f-radio :label="'default'">默认</f-radio>
      <f-radio :label="'large'">大号</f-radio>
    </f-radio-group>

    <f-space :size="size">
      space
      <f-button type="primary">Button</f-button>
      <f-button icon="upload">Button</f-button>
      <f-button type="danger">Delete</f-button>
    </f-space>
  </f-space>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const size = ref('default')
</script>
```

</template>

</card>

<card>

## 任意数字大小

<template #example>

  <Number/>
  
</template>

<template #template>

```html
<template>
  <f-space direction="vertical" alignment="start" :size="30">
    <f-radio-group v-model="size" type="capsule">
      <f-radio :label="8">8</f-radio>
      <f-radio :label="16">16</f-radio>
      <f-radio :label="24">24</f-radio>
      <f-radio :label="32">32</f-radio>
      <f-radio :label="40">40</f-radio>
    </f-radio-group>

    <f-space wrap :size="size">
      <f-card v-for="i in 3" :key="i" class="box-card" style="width: 250px">
        <template #header>
          <div class="card-header">
            <span>Card name</span>
            <f-button type="text">Operation button</f-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ 'List item ' + o }}
        </div>
      </f-card>
    </f-space>
  </f-space>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const size = ref(16)
</script>
```

</template>

</card>

<card>

## 换行

<template #example>

  <Wrap/>
  
</template>

<template #template>

```html
<template>
  <f-space wrap>
    <div v-for="i in 20" :key="i">
      <f-button type="text">文字按钮</f-button>
    </div>
  </f-space>
</template>
```

</template>

</card>

<card>

## 分隔符

<template #example>

  <Split/>
  
</template>

<template #template>

```html
<template>
  <f-space :size="size" spacer="|">
    <div v-for="i in 3" :key="i">
      <f-button>button {{ i }}</f-button>
    </div>
  </f-space>
  <br />
  <br />
  <f-space :size="size" :spacer="spacer">
    <div v-for="i in 3" :key="i">
      <f-button>button {{ i }}</f-button>
    </div>
  </f-space>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { h, ref } from 'vue'

const size = ref(10)
const spacer = h('span', { style: { color: '#999' } }, '>-<')
</script>
```

</template>

</card>

<card>

## 对齐方式

设置该值可以调整所有子节点在容器内的对齐方式, 可设置的值与 [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) 一致

<template #example>

  <Align/>
  
</template>

<template #template>

```html
<template>
  <f-space>
    <div style="width: 240px; margin-bottom: 20px; padding: 8px; border: 1px solid #ccc">
      <f-space>
        string
        <f-button>button</f-button>
        <f-card>
          <template #header>header</template>
          body
        </f-card>
      </f-space>
    </div>
    <div style="width: 240px; margin-bottom: 20px; padding: 8px; border: 1px solid #ccc">
      <f-space alignment="flex-start">
        string
        <f-button>button</f-button>
        <f-card>
          <template #header>header</template>
          body
        </f-card>
      </f-space>
    </div>
    <div style="width: 240px; margin-bottom: 20px; padding: 8px; border: 1px solid #ccc">
      <f-space alignment="flex-end">
        string
        <f-button>button</f-button>
        <f-card>
          <template #header>header</template>
          body
        </f-card>
      </f-space>
    </div>
  </f-space>
</template>
```

</template>

</card>

## Space Props

| 参数      | 说明                      | 类型                                      | 可选值                 | 默认值     |
| --------- | ------------------------- | ----------------------------------------- |---------------------| ---------- |
| alignment | 对齐的方式                | String                                    | -                   | 'center'   |
| class     | 类名                      | String / Array<Object \| String> / Object | -                   | -          |
| direction | 排列的方向                | String                                    | vertical/horizontal | horizontal |
| prefixCls | 给 space-items 的类名前缀 | String                                    | fei-space           | -          |
| style     | 额外样式                  | String / Array<Object \| String> / Object | -                   | -          |
| spacer    | 间隔符                    | String / Number / VNode                   | -                   | -          |
| size      | 间隔大小                  | String / Number / [Number, Number]        | -                   | 'small'    |
| wrap      | 设置是否自动折行          | Boolean                                   | true / false        | false      |

## Space Slot

| name    | 说明               |
| ------- | ------------------ |
| default | 需要添加间隔的元素 |
