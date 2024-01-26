---
title: 开关 Switch
---

<script setup>
import Basic from './demo/Switch/Basic.vue'
import Size from './demo/Switch/Size.vue'
import Icon from './demo/Switch/Icon.vue'
import Disabled from './demo/Switch/Disabled.vue'
import Loading from './demo/Switch/Loading.vue'
import Confirm from './demo/Switch/Confirm.vue'
import Confirm2 from './demo/Switch/Confirm2.vue'
</script>

##### 在两种状态间切换时用到的开关选择器

<card>

## 基础用法

直接用组件默认插槽插入即可

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-switch v-model="value" @change="change"></f-switch>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)

function change(val) {
  console.log(val)
}
</script>
```

</template>

</card>

<card>

## 大小及颜色

<template #example>

  <Size/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-switch size="large"></f-switch>
    &nbsp;
    <f-switch></f-switch>
    &nbsp;
    <f-switch size="small"></f-switch>
    &nbsp;
    <f-switch active-color="#13ce66" inactive-color="#ff4949"></f-switch>
  </div>
</template>
```

</template>

</card>

<card>

## 文字或图标

<template #example>

  <Icon/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-switch>
      <template #open><span>开</span></template>
      <template #close><span>关</span></template>
    </f-switch>
    &nbsp;
    <f-switch>
      <template #open>
        <f-icon name="check"></f-icon>
      </template>
      <template #close>
        <f-icon name="close"></f-icon>
      </template>
    </f-switch>
    <br />
    <br />
    <f-switch size="large">
      <template #open><span>开启</span></template>
      <template #close><span>关闭</span></template>
    </f-switch>
    &nbsp;
    <f-switch size="large">
      <template #open><span>ON</span></template>
      <template #close><span>OFF</span></template>
    </f-switch>
  </div>
</template>
```

</template>

</card>

<card>

## 禁用

<template #example>

  <Disabled/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-switch v-model="value1" disabled size="large"></f-switch>
    &nbsp;
    <f-switch v-model="value1" disabled></f-switch>
    &nbsp;
    <f-switch v-model="value1" disabled size="small"></f-switch>
    &nbsp;
    <f-switch v-model="value2" disabled size="large"></f-switch>
    &nbsp;
    <f-switch v-model="value2" disabled></f-switch>
    &nbsp;
    <f-switch v-model="value2" disabled size="small"></f-switch>
    &nbsp;
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(false)
</script>
```

</template>


</card>

<card>

## loading

<template #example>

  <Loading/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-switch v-model="value1" loading size="large"></f-switch>
    &nbsp;
    <f-switch v-model="value1" loading></f-switch>
    &nbsp;
    <f-switch v-model="value1" loading size="small"></f-switch>
    &nbsp;
    <f-switch v-model="value2" loading size="large"></f-switch>
    &nbsp;
    <f-switch v-model="value2" loading></f-switch>
    &nbsp;
    <f-switch v-model="value2" loading size="small"></f-switch>
    &nbsp;
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(false)
</script>
```

</template>

</card>

<card>

## 切换前拦截

可以通过设置`confirm`来设置切换前拦截，并通过`confirm-txt`来自定义切换文字提示。

<template #example>

  <Confirm/>
  
</template>

<template #template>

```html
<template>
  <f-switch confirm></f-switch>
</template>
```

</template>

</card>

<card>

## 阻止切换

可以配合loading和confirm一级before-change函数props来配合实现阻止切换

<template #example>

  <Confirm2/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-switch
      v-model="value1"
      confirm
      :loading="loading1"
      :before-change="beforeChange1"
    ></f-switch>
    &nbsp;
    <f-switch
      v-model="value2"
      confirm
      :loading="loading2"
      :before-change="beforeChange2"
    ></f-switch>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(false)
const value2 = ref(false)
const loading1 = ref(false)
const loading2 = ref(false)

const beforeChange1 = () => {
  loading1.value = true
  return new Promise(resolve => {
    setTimeout(() => {
      loading1.value = false
      return resolve(true)
    }, 1000)
  })
}

const beforeChange2 = () => {
  loading2.value = true
  return new Promise((_, reject) => {
    setTimeout(() => {
      loading2.value = false
      return reject(new Error('调用出错！'))
    }, 1000)
  })
}
</script>
```

</template>

</card>

## Props

| 参数           | 说明                                                       | 类型                    | 可选值                | 默认值  |
| -------------- | ---------------------------------------------------------- | ----------------------- | --------------------- | ------- |
| modelValue     | 指定当前是否选中，可以使用 v-model 双向绑定数据            | Boolean                 | —                     | false   |
| size           | 开关的尺寸。建议开关如果使用了2个汉字的文字，使用 large。  | String                  | large、small、default | default |
| disabled       | 禁用开关                                                   | Boolean                 | —                     | false   |
| true-value     | 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用     | String, Number, Boolean | —                     | true    |
| false-value    | 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用 | String, Number, Boolean | —                     | false   |
| active-color   | switch 打开时的背景色                                      | string                  | —                     | —       |
| inactive-color | switch 关闭时的背景色                                      | string                  | —                     | —       |
| confirm        | 开启切换前拦截功能                                         | Boolean                 | —                     | false   |
| confirm-txt    | 切换拦截文字                                               | string                  | —                     | —       |
| loading        | 加载中状态                                                 | Boolean                 | —                     | —       |
| beforeChange   | 改变状态前拦截函数，return type Promise or boolean         | Function                | —                     | —       |

## Events

| 事件名 | 说明                           | 返回值      |
| ------ | ------------------------------ | ----------- |
| change | 开关变化时触发，返回当前的状态 | true、false |

## Slot

| 事件名 | 说明                   |
| ------ | ---------------------- |
| open   | 自定义显示打开时的内容 |
| close  | 自定义显示关闭时的内容 |
