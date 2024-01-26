---
title: 骨架屏 Skeleton
---

<script setup>
import Basic from './demo/Skeleton/Basic.vue'
import Rows from './demo/Skeleton/Rows.vue'
import Animation from './demo/Skeleton/Animation.vue'
import Custom from './demo/Skeleton/Custom.vue'
import Loading from './demo/Skeleton/Loading.vue'
</script>

##### 在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

<card>

## 基础用法

基础的骨架效果

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-skeleton></f-skeleton>
</template>
```

</template>

</card>

<card>

## 更多参数

可以配置骨架屏段落数量，以便更接近真实渲染效果。显示的数量会比传入的数量多 1，首行会被渲染一个长度 33% 的段首。

<template #example>

  <Rows/>
  
</template>

<template #template>

```html
<template>
  <f-skeleton :rows="5"></f-skeleton>
</template>
```

</template>

</card>

<card>

## 动画效果

可以显示动画效果

<template #example>

  <Animation/>
  
</template>

<template #template>

```html
<template>
  <f-skeleton animation></f-skeleton>
</template>
```

</template>

</card>

<card>

## 自定义

可以使用slot插槽来自己设定模板，可以根据真实dom来构建差不多的骨架

<template #example>

  <Custom/>
  
</template>

<template #template>

```html
<template>
  <f-layout has-sider>
    <template #sider>
      <div style="height: 300px">侧边栏</div>
    </template>
    <div>右侧容器</div>
  </f-layout>
</template>
```

</template>

</card>

<card>

## Loading 加载

loading结束后加载真实的ui，通过slot设置之后的ui

<template #example>

  <Loading/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div class="mb-15">
      <f-button @click="show">2s 后显示</f-button>
    </div>
    <f-skeleton style="width: 350px" :loading="loading" animation>
      <template #template>
        <div flex="cross:center" style="margin-bottom: 8px">
          <f-skeleton-item variant="circle" style="width: 36px; margin-right: 8px" />
          <div style="width: 200px">
            <div flex="main:justify cross:center">
              <f-skeleton-item variant="text" style="margin-right: 16px" />
              <f-skeleton-item variant="text" style="width: 30%" />
            </div>
          </div>
        </div>
        <f-skeleton />
      </template>
      <template #default>
        <div style="width: 350px">
          <div flex="cross:center" style="margin-bottom: 8px">
            <f-skeleton-item variant="circle" style="width: 36px; margin-right: 8px" />
            <div style="width: 200px">用户信息</div>
          </div>
          <p>用户信息内容</p>
          <p>用户信息内容</p>
          <p>用户信息内容</p>
          <p>{{ currentDate }}</p>
        </div>
      </template>
    </f-skeleton>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

const loading = ref(false)
const currentDate = ref(dayjs().format('YYYY-MM-DD'))

function show() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>
```

</template>

</card>

# Skeleton Props

| 参数     | 说明                                        | 类型    | 可选值       | 默认值 |
| -------- | ------------------------------------------- | ------- | ------------ | ------ |
| animated | 是否使用动画                                | boolean | true / false | false  |
| count    | 渲染多少个 template, 建议使用尽可能小的数字 | number  | integer      | 1      |
| loading  | 是否显示真实的 DOM 结构                     | boolean | true / false | false  |
| rows     | 骨架屏段落数量                              | number  | 正整数       | 3      |
| throttle | 延迟占位 DOM 渲染的时间, 单位是毫秒         | number  | 正整数       | 0      |

## Skeleton Item Attributes

| 参数    | 说明                     | 类型         | 可选值                                                                    | 默认值 |
| ------- | ------------------------ | ------------ | ------------------------------------------------------------------------- | ------ |
| variant | 当前显示的占位元素的样式 | Enum(string) | p / text / h1 / h2 / h5 / text / caption / button / image / circle / rect | text   |

## Skeleton Slots

| name     | description          |
| -------- | -------------------- |
| default  | 用来展示真实 UI      |
| template | 用来展示自定义占位符 |
