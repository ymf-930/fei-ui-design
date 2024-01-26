---
title: 返回顶部 Backtop
---

<script setup>
import Basic from './demo/Backtop/Basic.vue'
import Scrollbar from './demo/Backtop/Scrollbar.vue'
</script>

##### 当页面内容比较长滚动后需要快捷返回顶部时使用，一般放置在页面右下角位置。如果指定 `target` 使用则是针对某个容器的滚动


<card>

## 基础用法

直接用组件默认插槽插入即可

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div style="position: relative; border: 1px solid #eee">
    <div class="scroll-box" style="padding: 20px; height: 500px; overflow: auto">
      <div v-for="item in 80" :key="item" ref="item">{{ item }}:这是用来撑开内容的行...</div>
    </div>
    <f-back-top target=".scroll-box" :visible-height="200">
      <f-button type="success">返回顶端</f-button>
    </f-back-top>
  </div>
</template>
```

</template>

</card>

<card>

## scrollbar用法

如果结合 `scrollbar` 使用则不需要配置其他项

注意：如嵌套在自定义滚动组件中使用则需要将 `BackTop` 组件放置于 `Scrollbar` 组件内部

<template #example>

  <Scrollbar/>
  
</template>

<template #template>

```html
<template>
  <div style="height: 500px; overflow: auto; border: 1px solid #eee">
    <f-scrollbar style="height: 100%" wrap-class="scrollbar-box">
      <div style="padding: 20px">
        <div v-for="item in 80" :key="item" ref="item">{{ item }}:这是用来撑开内容的行...</div>
      </div>
      <f-back-top target=".scrollbar-box" :visible-height="200">
        <f-button type="info" size="large" icon="up"></f-button>
      </f-back-top>
    </f-scrollbar>
  </div>
</template>
```

</template>

</card>

## Props

| 参数           | 说明                                                        | 类型   | 可选值 | 默认值 |
| -------------- | ----------------------------------------------------------- | ------ | ------ | ------ |
| visible-height | 页面滚动高度达到该值时才显示BackTop                         | Number | —      | 400    |
| target         | 目标容器标识，可设置目标的class、id标识来制定滚动监听的内容 | String | —      | —      |
| bottom         | 组件距离底部的距离                                          | Number | —      | 50     |
| right          | 组件距离右部的距离                                          | Number | —      | 50     |
| duration       | 滚动动画持续时间，单位 毫秒                                 | Number | —      | 1000   |

## Events

| 事件名 | 说明           | 返回值 |
| ------ | -------------- | ------ |
| click  | 点击按钮时触发 | 无     |
