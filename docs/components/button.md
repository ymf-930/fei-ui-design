---
title: 按钮 Button
---

<script setup>
import Basic from './demo/Button/Basic.vue'
import Plain from './demo/Button/Plain.vue'
import Round from './demo/Button/Round.vue'
import Dashed from './demo/Button/Dashed.vue'
import Ghost from './demo/Button/Ghost.vue'
import Icon from './demo/Button/Icon.vue'
import Disabled from './demo/Button/Disabled.vue'
import Text from './demo/Button/Text.vue'
import Group from './demo/Button/Group.vue'
import Size from './demo/Button/Size.vue'
import Loading from './demo/Button/Loading.vue'
import Waves from './demo/Button/Waves.vue'
</script>

<card>

## 基础用法

按钮的 type 分别为 primary、info、success、warning 和 error。

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-button">
    <f-button>Default</f-button>
    <f-button type="primary">Primary</f-button>
    <f-button type="success">Success</f-button>
    <f-button type="info">Info</f-button>
    <f-button type="warning">Warning</f-button>
    <f-button type="danger">Danger</f-button>
  </div>
</template>
```

</template>

</card>

<card>

## 简约按钮

可以设置 `plain` 显示简约按钮

<template #example>

  <Plain/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-button">
    <f-button plain>Default</f-button>
    <f-button type="primary" plain>Primary</f-button>
    <f-button type="success" plain>Success</f-button>
    <f-button type="info" plain>Info</f-button>
    <f-button type="warning" plain>Warning</f-button>
    <f-button type="danger" plain>Danger</f-button>
  </div>
</template>
```

</template>

</card>


<card>

## 圆角按钮

可以设置 `round` 显示圆角按钮

<template #example>

  <Round/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-button">
    <f-button round>Default</f-button>
    <f-button type="primary" round>Primary</f-button>
    <f-button type="success" round>Success</f-button>
    <f-button type="info" round>Info</f-button>
    <f-button type="warning" round>Warning</f-button>
    <f-button type="danger" round>Danger</f-button>
  </div>
</template>
```

</template>

</card>

<card>

## 虚线按钮

可以设置 `dashed` 显示虚线按钮

<template #example>

  <Dashed/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-button">
    <f-button dashed>Default</f-button>
    <f-button type="primary" dashed>Primary</f-button>
    <f-button type="success" dashed>Success</f-button>
    <f-button type="info" dashed>Info</f-button>
    <f-button type="warning" dashed>Warning</f-button>
    <f-button type="danger" dashed>Danger</f-button>
  </div>
</template>
```

</template>

</card>

<card>

## 幽灵按钮

可以设置 `transparent` 开启透明背景的幽灵模式，用于有背景色的位置

<template #example>

  <Ghost/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-button" style="background: #cad4d4; padding: 10px 6px">
    <f-button type="primary" transparent size="small">Primary</f-button>
    <f-button type="success" transparent size="small">Success</f-button>
    <f-button type="info" transparent size="small">Info</f-button>
    <f-button type="warning" transparent size="small">Warning</f-button>
    <f-button type="danger" transparent size="small">Danger</f-button>
  </div>
</template>
```

</template>

</card>

<card>

## 带图标的按钮

使用 `icon` 给按钮配置图标

<template #example>

  <Icon/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-button">
    <f-button icon="search">search</f-button>
    <f-button icon="plus-circle">create</f-button>
    <f-button icon="check-circle" type="primary">check</f-button>
    <f-button icon="delete" type="danger">delete</f-button>
  </div>
</template>
```

</template>

</card>


<card>

## 禁用状态

使用 `disabled` 设置禁用状态的按钮

<template #example>

  <Disabled/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-button" flex="cross:center">
    <f-button disabled>Default</f-button>
    <f-button dashed disabled>Dashed</f-button>
    <f-button background disabled>Background</f-button>
    <f-button type="primary" disabled>Primary</f-button>
    <f-button type="success" disabled>Success</f-button>
    <f-button type="info" disabled>Info</f-button>
    <f-button type="warning" disabled>Warning</f-button>
    <f-button type="danger" disabled>Danger</f-button>
  </div>
</template>
```

</template>

</card>

<card>

## 文字状态按钮

使用 `type="text"` 设置仅文字的按钮

<template #example>

  <Text/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-button">
    <div>
      <f-button type="text">文字按钮</f-button>
      <f-button type="text" text-color="primary">Primary</f-button>
      <f-button type="text" text-color="success">Success</f-button>
      <f-button type="text" text-color="info">Info</f-button>
      <f-button type="text" text-color="warning">Warning</f-button>
      <f-button type="text" text-color="danger">Danger</f-button>
      <f-button type="text" text-color="#b37feb">多彩按钮</f-button>
      <f-button type="text" text-color="#f759ab">多彩按钮2</f-button>
    </div>
    <div>
      <f-button type="text" disabled>禁用按钮</f-button>
      <f-button type="text" text-color="primary" disabled>Primary</f-button>
      <f-button type="text" text-color="success" disabled>Success</f-button>
      <f-button type="text" text-color="info" disabled>Info</f-button>
      <f-button type="text" text-color="warning" disabled>Warning</f-button>
      <f-button type="text" text-color="danger" disabled>Danger</f-button>
      <f-button type="text" text-color="#b37feb" disabled>多彩按钮</f-button>
      <f-button type="text" text-color="#f759ab" disabled>多彩按钮2</f-button>
    </div>
  </div>
</template>
```

</template>

</card>


<card>

## 按钮组

使用 `button-group` 组件包裹后可显示按钮组

<template #example>

  <Group/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-button" flex="cross:center">
    <f-button-group>
      <f-button type="primary" icon="left">上一页</f-button>
      <f-button type="primary">
        下一页
        <i class="f-iconfont f-icon-right"></i>
      </f-button>
    </f-button-group>
    <f-button-group>
      <f-button>上一页</f-button>
      <f-button>下一页</f-button>
    </f-button-group>
    <f-button-group>
      <f-button type="success" icon="star"></f-button>
      <f-button type="info" icon="heatmap"></f-button>
      <f-button type="danger" icon="edit"></f-button>
    </f-button-group>
    <f-button-group vertical>
      <f-button>Default</f-button>
      <f-button type="primary">Primary</f-button>
      <f-button type="success">Success</f-button>
      <f-button type="info">Info</f-button>
      <f-button type="warning">Warning</f-button>
      <f-button type="danger">Danger</f-button>
    </f-button-group>
  </div>
</template>
```

</template>

</card>


<card>

## 不同尺寸

设置 `size` 不同尺寸

<template #example>

  <Size/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-button">
    <f-button size="large">不小</f-button>
    <f-button>正好</f-button>
    <f-button size="small">小</f-button>
    <f-button size="mini">小迷你</f-button>
  </div>
</template>
```

</template>

</card>

<card>

## 加载状态

设置 `loading` 加载状态

<template #example>

  <Loading/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-button" flex="cross:center">
    <f-button type="primary" :loading="loading" icon="reload" @click="loading = true">
      Click me!
    </f-button>
    <f-button @click="loading = false">stop</f-button>
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

</card>

<card>

## 点击反馈

可以设置 `v-waves` 指令来更改点击反馈动画

<template #example>

  <Waves/>
  
</template>

<template #template>

```html
<template>
  <div class="demo-button">
    <f-button>Normal Animation</f-button>
    <f-button type="danger">Normal Animation</f-button>
    <f-button v-waves>Waves Animation</f-button>
    <f-button v-waves type="success">Waves Animation</f-button>
  </div>
</template>
```

</template>

</card>

## Props

| 参数        | 说明                         | 类型    | 可选值                                                          | 默认值 |
| ----------- | ---------------------------- | ------- | --------------------------------------------------------------- | ------ |
| size        | 尺寸                         | String  | large / small / mini                                            | —      |
| type        | 类型                         | String  | primary / success / warning / danger / info / text              | —      |
| plain       | 简单按钮                     | Boolean | —                                                               | false  |
| round       | 圆角按钮                     | Boolean | —                                                               | false  |
| transparent | 透明按钮                     | Boolean | —                                                               | false  |
| loading     | 加载中                       | Boolean | —                                                               | false  |
| disabled    | 禁用状态                     | Boolean | —                                                               | false  |
| background  | 拟物背景（仅供默认按钮使用） | Boolean | —                                                               | false  |
| icon        | 图标                         | String  | —                                                               | —      |
| icon-style  | 可设置图标大小               | Object  | —                                                               | —      |
| text-color  | 文字按钮颜色                 | String  | primary / success / warning / danger / info / text / 自定义色值 | —      |
| autofocus   | 是否默认聚焦                 | Boolean | —                                                               | false  |
| native-type | 原生 type 属性               | String  | button / submit / reset                                         | button |
