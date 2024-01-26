---
title: 栅格 Grid
---

<script setup>
import Basic from './demo/Grid/Basic.vue'
import Gutter from './demo/Grid/Gutter.vue'
import Order from './demo/Grid/Order.vue'
import Pull from './demo/Grid/Pull.vue'
import Offset from './demo/Grid/Offset.vue'
import Flex from './demo/Grid/Flex.vue'
import Auto from './demo/Grid/Auto.vue'
</script>

##### 采用了24栅格系统，将区域进行24等分

<card>

## 间隔

<template #example>

  <Gutter/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-grid">
    <f-space>
      <span>栅格间距：</span>
      <f-radio-group v-model="gutter" size="small" type="capsule">
        <f-radio :label="8">8</f-radio>
        <f-radio :label="16">16</f-radio>
        <f-radio :label="24">24</f-radio>
      </f-radio-group>
    </f-space>

    <f-row :gutter="gutter" class="gutter">
      <f-col span="6">
        <div>col-6</div>
      </f-col>
      <f-col span="6">
        <div>col-6</div>
      </f-col>
      <f-col span="6">
        <div>col-6</div>
      </f-col>
      <f-col span="6">
        <div>col-6</div>
      </f-col>
    </f-row>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const gutter = ref(8)
</script>
```

</template>

</card>

<card>

## 栅格次序

<template #example>

  <Order/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-grid">
    <f-row type="flex">
      <f-col span="6" order="4">1 | order-4</f-col>
      <f-col span="6" order="3">2 | order-3</f-col>
      <f-col span="6" order="2">3 | order-2</f-col>
      <f-col span="6" order="1">4 | order-1</f-col>
    </f-row>
  </div>
</template>
```

</template>

</card>

<card>

## 栅格顺序

使用push和pull来改变栅格顺序

<template #example>

  <Pull/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-grid">
    <f-row>
      <f-col span="14" push="10">col-14 | push="10"</f-col>
      <f-col span="10" pull="14">col-10 | pull="14"</f-col>
    </f-row>
  </div>
</template>
```

</template>

</card>

<card>

## 左右偏移

offset 可以设置偏移量

<template #example>

  <Offset/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-grid">
    <f-row>
      <f-col span="8">col-8</f-col>
      <f-col span="8" offset="8">col-8 | offset-8</f-col>
    </f-row>
    <br />
    <f-row>
      <f-col span="6" offset="8">col-6 | offset-8</f-col>
      <f-col span="6" offset="4">col-6 | offset-4</f-col>
    </f-row>
    <br />
    <f-row>
      <f-col span="12" offset="8">col-12 | offset-8</f-col>
    </f-row>
  </div>
</template>
```

</template>

</card>

<card>

## flex布局

<template #example>

  <Flex/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-grid">
    <p>子元素向左排列</p>
    <f-row type="flex" justify="start" class="code-row-bg">
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
    </f-row>
    <p>子元素向右排列</p>
    <f-row type="flex" justify="end" class="code-row-bg">
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
    </f-row>
    <p>子元素居中排列</p>
    <f-row type="flex" justify="center" class="code-row-bg">
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
    </f-row>
    <p>子元素等宽排列</p>
    <f-row type="flex" justify="space-between" class="code-row-bg">
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
    </f-row>
    <p>子元素分散排列</p>
    <f-row type="flex" justify="space-around" class="code-row-bg">
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
      <f-col span="4">col-4</f-col>
    </f-row>
    <p>顶部对齐</p>
    <f-row type="flex" justify="center" align="top" class="code-row-bg">
      <f-col span="4"><p style="height: 80px">col-4</p></f-col>
      <f-col span="4"><p style="height: 30px">col-4</p></f-col>
      <f-col span="4"><p style="height: 100px">col-4</p></f-col>
      <f-col span="4"><p style="height: 60px">col-4</p></f-col>
    </f-row>
    <p>底部对齐</p>
    <f-row type="flex" justify="center" align="bottom" class="code-row-bg">
      <f-col span="4"><p style="height: 80px">col-4</p></f-col>
      <f-col span="4"><p style="height: 30px">col-4</p></f-col>
      <f-col span="4"><p style="height: 100px">col-4</p></f-col>
      <f-col span="4"><p style="height: 60px">col-4</p></f-col>
    </f-row>
    <p>居中对齐</p>
    <f-row type="flex" justify="center" align="middle" class="code-row-bg">
      <f-col span="4"><p style="height: 80px">col-4</p></f-col>
      <f-col span="4"><p style="height: 30px">col-4</p></f-col>
      <f-col span="4"><p style="height: 100px">col-4</p></f-col>
      <f-col span="4"><p style="height: 60px">col-4</p></f-col>
    </f-row>
  </div>
</template>
```

</template>

<template #style>

```html
<style scoped>
.code-row-bg {
  background: #eee;
  p {
    color: #fff;
  }
}
</style>
```

</template>

</card>

<card>

## 响应式布局

预设六个响应尺寸：xs sm md lg xl xxl，详见 API。

<template #example>

  <Auto/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-grid">
    <f-row>
      <f-col :xs="2" :sm="4" :md="6" :lg="8">f-col</f-col>
      <f-col :xs="20" :sm="16" :md="12" :lg="8">f-col</f-col>
      <f-col :xs="2" :sm="4" :md="6" :lg="8">f-col</f-col>
    </f-row>
  </div>
</template>
```

</template>

</card>


## Row Props

| 参数       | 说明                         | 类型          | 可选值                                          | 默认值 |
| ---------- | ---------------------------- | ------------- | ----------------------------------------------- | ------ |
| gutter     | 栅格间距，单位 px            | Number/String | —                                               | 0      |
| type       | 布局模式，在现代浏览器下有效 | String        | flex或不选                                      | —      |
| justify    | lex 布局下的水平排列方式     | String        | —                                               | —      |
| align      | flex 布局下的垂直对齐方式    | String        | start、end、center、space-around、space-between | —      |
| class-name | 自定义的class名称            | String        | —                                               | —      |

## Col Props

| 参数       | 说明                                      | 类型          | 可选值 | 默认值 |
| ---------- | ----------------------------------------- | ------------- | ------ | ------ |
| span       | 栅格的占位格数 为0 时，相当于display:none | Number/String | 0~24   | -      |
| order      | 栅格的顺序 在flex布局模式下有效           | Number/String | -      | -      |
| offset     | 栅格左侧偏移                              | Number/String | -      | -      |
| push       | 栅格向右移动格数                          | Number/String | -      | -      |
| pull       | 栅格向左移动格数                          | Number/String | -      | -      |
| class-name | 自定义的class                             | String        | -      | -      |
| xs         | <576px 响应式栅格                         | Number        | -      | -      |
| sm         | (≥576px < 768px)≥576px 响应式栅格         | Number        | -      | -      |
| md         | (≥768px < 992px) 响应式栅格               | Number        | -      | -      |
| lg         | (≥992px < 1200px) 响应式栅格              | Number        | -      | -      |
| xl         | (≥1200px < 1600px) 响应式栅格             | Number        | -      | -      |
| xxl        | ≥1600px 响应式栅格                        | Number        | -      | -      |
