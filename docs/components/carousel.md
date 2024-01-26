---
title: 轮播 Carousel
---

<script setup>
import Basic from './demo/Carousel/Basic.vue'
import Auto from './demo/Carousel/Auto.vue'
import Card from './demo/Carousel/Card.vue'
import Style from './demo/Carousel/Style.vue'
import Direction from './demo/Carousel/Direction.vue'
</script>

##### 轮播组件，用于滚动显示图片等

<card>

## 基础用法

直接用组件默认插槽插入即可

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-carousel loop trigger="click">
    <f-carousel-item>
      <div class="demo-carousel-panel">1</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">2</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">3</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">4</div>
    </f-carousel-item>
  </f-carousel>
</template>
```

</template>

<template #style>

```html
<style scoped>
.demo-carousel-panel {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #99a9bf;
}
</style>
```

</template>

</card>

<card>

## 自动切换和速度

可以设置`autoplay`自动切换，`trigger="hover"`悬停切换

<template #example>

  <Auto/>
  
</template>

<template #template>

```html
<template>
  <f-carousel autoplay :interval="2000" :initial-index="value" loop>
    <f-carousel-item>
      <div class="demo-carousel-panel">1</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">2</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">3</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">4</div>
    </f-carousel-item>
  </f-carousel>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const value = ref(1)
</script>
```

</template>

<template #style>

```html
<style scoped>
.demo-carousel-panel {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #99a9bf;
}
</style>
```

</template>

</card>

<card>

## 指示器样式和位置


<template #example>

  <Style/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-carousel indicator-position="inside" arrow="always" trigger="hover" loop>
      <f-carousel-item>
        <div class="demo-carousel-panel">1</div>
      </f-carousel-item>
      <f-carousel-item>
        <div class="demo-carousel-panel">2</div>
      </f-carousel-item>
      <f-carousel-item>
        <div class="demo-carousel-panel">3</div>
      </f-carousel-item>
      <f-carousel-item>
        <div class="demo-carousel-panel">4</div>
      </f-carousel-item>
    </f-carousel>
    <f-divider></f-divider>
    <f-carousel indicator-position="outside" loop>
      <f-carousel-item>
        <div class="demo-carousel-panel">1</div>
      </f-carousel-item>
      <f-carousel-item>
        <div class="demo-carousel-panel">2</div>
      </f-carousel-item>
      <f-carousel-item>
        <div class="demo-carousel-panel">3</div>
      </f-carousel-item>
      <f-carousel-item>
        <div class="demo-carousel-panel">4</div>
      </f-carousel-item>
    </f-carousel>
  </div>
</template>
```

</template>

<template #style>

```html
<style scoped>
.demo-carousel-panel {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #99a9bf;
}
</style>
```

</template>

</card>

<card>

## 卡片风格

可以设置`card`卡片风格

<template #example>

  <Card/>
  
</template>

<template #template>

```html
<template>
  <f-carousel :interval="4000" type="card" height="200px" loop>
    <f-carousel-item>
      <div class="demo-carousel-panel">1</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">2</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">3</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">4</div>
    </f-carousel-item>
  </f-carousel>
</template>
```

</template>

<template #style>

```html
<style scoped>
.demo-carousel-panel {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #99a9bf;
}
</style>
```

</template>

</card>

<card>

## 方向

可以设置`direction`方向为竖直方向

<template #example>

  <Direction/>
  
</template>

<template #template>

```html
<template>
  <f-carousel height="200px" direction="vertical" :autoplay="false">
    <f-carousel-item>
      <div class="demo-carousel-panel">1</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">2</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">3</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">4</div>
    </f-carousel-item>
  </f-carousel>
</template>
```

</template>

<template #style>

```html
<style scoped>
.demo-carousel-panel {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #99a9bf;
}
</style>
```

</template>

</card>

## Props

| 参数               | 说明                                            | 类型            | 可选值                                           | 默认值     |
| ------------------ | ----------------------------------------------- | --------------- | ------------------------------------------------ | ---------- |
| initial-index      | 轮播的索引，从 0 开始，                         | Number          | —                                                | 0          |
| height             | 走马灯的高度，可填 auto 或具体高度数值，单位 px | String / Number | —                                                | 200px      |
| loop               | 是否开启循环                                    | Boolean         | —                                                | false      |
| autoplay           | 是否自动切换                                    | Boolean         | —                                                | false      |
| interval           | 自动切换的时间间隔，单位为毫秒                  | Number          | —                                                | 3000       |
| indicator-position | 指示器的位置                                    | String          | inside （内部），outside（外部），none（不显示） | inside     |
| trigger            | 触发方式                                        | String          | click，hover                                     | click      |
| arrow              | 切换箭头的显示时机                              | String          | hover，always，never                             | hover      |
| direction          | 方向                                            | String          | horizontal、vertical                             | horizontal |
| type               | 类型                                            | String          | card                                             | —          |

### Events

| 事件名 | 说明                                     | 返回值          |
| ------ | ---------------------------------------- | --------------- |
| change | 轮播切换时触发，目前激活的索引，原的索引 | oldValue, value |
