---
title: 加载 Loading
---

<script setup>
import Basic from './demo/Loading/Basic.vue'
import Center from './demo/Loading/Center.vue'
import Custom from './demo/Loading/Custom.vue'
import Ctrl from './demo/Loading/Ctrl.vue'
</script>

##### 获取数据或加载中时显示，提示用户正在等待中。

<card>

## 基础用法

最简单的Loading

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-loading">
    <f-loading></f-loading>
  </div>
</template>
```

</template>

<template #style>

```html
<style scoped>
.demo-loading {
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin-right: 5px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #cecece;
}
</style>
```

</template>

</card>

<card>

## 居中固定

可以在父级元素中居中固定 默认是剧中固定的，fix设置为false后用于加载类似下拉加载的功能

<template #example>

  <Center/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-loading">
    <div>我是后面的段落我是后面的段落我是后面的段落我是后面的段落</div>
    <f-loading fix></f-loading>
  </div>
</template>
```

</template>

<template #style>

```html
<style scoped>
.demo-loading {
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin-right: 5px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #cecece;
}
</style>
```

</template>

</card>

<card>

## 自定义内容

可以自定义文字和内容

<template #example>

  <Custom/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div class="demo-loading">
      <f-loading fix>加载中</f-loading>
    </div>
    <div class="demo-loading">
      <f-loading fix show-text="loading"></f-loading>
    </div>
    <div class="demo-loading">
      <f-loading fix show-text="loading" show-icon="loading2"></f-loading>
    </div>
  </div>
</template>
```

</template>

<template #style>

```html
<style scoped>
.demo-loading {
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin-right: 5px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #cecece;
}
</style>
```

</template>

</card>

<card>

## 切换显示状态

切换显示状态

<template #example>

  <Ctrl/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div class="demo-loading">
      <div>我是后面的段落我是后面的段落我是后面的段落我是后面的段落</div>
      <f-loading v-show="loading" fix></f-loading>
    </div>
    <div>
      <f-button v-if="loading" type="danger" @click="loading = false">停止</f-button>
      <f-button v-else @click="loading = true">加载</f-button>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const loading = ref(false)
</script>
```

</template>

<template #style>

```html
<style scoped>
.demo-loading {
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin-right: 5px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #cecece;
}
</style>
```

</template>

</card>

## Props

| 参数     | 说明               | 类型    | 可选值  | 默认值 |
| -------- | ------------------ | ------- | ------- | ------ |
| showIcon | 显示加载图标       | String  | loading | —      |
| showText | 显示加载的文字     | String  | loading | —      |
| fix      | 是否固定于父级中心 | Boolean | —       | true   |
| size     | 文字显示的大小     | Number  | —       | —      |
