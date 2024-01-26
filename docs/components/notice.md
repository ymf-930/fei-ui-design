---
title: 通知 Notice
---

<script setup>
import Basic from './demo/Notice/Basic.vue'
import TypeIcon from './demo/Notice/TypeIcon.vue'
import Position from './demo/Notice/Position.vue'
import Other from './demo/Notice/Other.vue'
</script>

##### 组件提供通知功能

<card>

## 基础用法

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button @click="open(false)">提醒</f-button>
    <f-button @click="open(true)">打开提醒(仅标题)</f-button>
    <f-button @click="open1">render函数渲染</f-button>
    <f-button @click="time">自定义时长</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { h } from 'vue'
import { Notice } from 'fei-ui-design'

function open(hasMessage) {
  Notice({
    title: 'Notice 标题',
    message: hasMessage ? '' : '这是通知内容,这是通知内容. 这是通知内容,这是通知内容.'
  })
}
function open1() {
  Notice({
    title: '标题名称',
    message: h('i', { style: 'color: red' }, '我是render函数渲染出来的内容')
  })
}
function time() {
  Notice({
    title: 'Notice 标题',
    message: 'duration设置为0则不会自动关闭',
    duration: 0
  })
}
</script>
```

</template>

</card>

<card>

## 带图标

可以附带提示性的图标进行使用

<template #example>

  <TypeIcon/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div style="padding: 5px 0">带描述</div>
    <f-button type="primary" plain @click="info(false)">Info</f-button>
    <f-button type="success" plain @click="success(false)">Success</f-button>
    <f-button type="warning" plain @click="warning(false)">Warning</f-button>
    <f-button type="danger" plain @click="error(false)">error</f-button>
    <div style="padding: 5px 0">仅标题</div>
    <f-button type="primary" plain @click="info(true)">Info</f-button>
    <f-button type="success" plain @click="success(true)">Success</f-button>
    <f-button type="warning" plain @click="warning(true)">Warning</f-button>
    <f-button type="danger" plain @click="error(true)">error</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { Notice } from 'fei-ui-design'

function info(message) {
  Notice.info({
    title: 'Notice 标题',
    message: message ? '' : '这是通知内容,这是通知内容. 这是通知内容,这是通知内容.'
  })
}
function success(message) {
  Notice.success({
    title: 'Notice 标题',
    message: message ? '' : '这是通知内容,这是通知内容. 这是通知内容,这是通知内容.'
  })
}
function warning(message) {
  Notice.warning({
    title: 'Notice 标题',
    message: message ? '' : '这是通知内容,这是通知内容. 这是通知内容,这是通知内容.'
  })
}
function error(message) {
  Notice.error({
    title: 'Notice 标题',
    message: message ? '' : '这是通知内容,这是通知内容. 这是通知内容,这是通知内容.'
  })
}
</script>
```

</template>

</card>

<card>

## 4个方向

可以设置其他参数控制notice位置和显示

<template #example>

  <Position/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button
      @click="open({ title: '右上角', message: '右上角弹出notice', position: 'top-right' })"
    >
      右上角
    </f-button>
    <f-button @click="open({ title: '左上角', message: '左上角弹出notice', position: 'top-left' })">
      左上角
    </f-button>
    <f-button
      @click="open({ title: '右下角', message: '右下角弹出notice', position: 'bottom-right' })"
    >
      右下角
    </f-button>
    <f-button
      @click="open({ title: '左下角', message: '左下角弹出notice', position: 'bottom-left' })"
    >
      左下角
    </f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { Notice } from 'fei-ui-design'

function open(options) {
  Notice.info(options)
}
</script>
```

</template>

</card>

<card>

## 其他参数

可以设置其他参数控制notice位置和显示

<template #example>

  <Other/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button
      @click="open({ title: '标题', useHTML: true, message: '我是<i>html</i>片段插入的内容' })"
    >
      HTML片段
    </f-button>
    <f-button @click="open({ title: '标题', showClose: false, message: '隐藏关闭按钮内容' })">
      隐藏关闭按钮
    </f-button>
    <f-button @click="open({ title: '偏移', message: '这是一条带有偏移的提示消息', offset: 200 })">
      偏移位置
    </f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { Notice } from 'fei-ui-design'

function open(options) {
  Notice.info(options)
}
</script>
```

</template>

</card>

<card>

## API

vue3中引入 Notice 并进行函数调用，同时 Notice 入参可为`string`类型或者是 `CreateNoticeProps`对象类型，同时，为方便调用，也扩展了四种 type 的调用

<template #example>

```ts
import { Notice } from 'fei-ui-design'

// options 可 直接传入字符串，如入参是字符串，则代表使用默认配置，入参填入message属性中进行调用
Notice(options)
Notice.info(options)
Notice.success(options)
Notice.warning(options)
Notice.error(options)
```
  
</template>

</card>

## Options

函数及参数说明如下：

| 函数      | 说明                                                         | 类型     | 默认值    |
| --------- | ------------------------------------------------------------ | -------- | --------- |
| title     | 通知提醒的标题                                               | String   | —         |
| message   | 通知提醒的内容，为空或不填时，自动应用仅标题模式下的样式     | String   | —         |
| duration  | 自动关闭的延时，单位秒，不关闭可以写 0                       | Number   | 4.5       |
| position  | 弹出位置 可选top-right 、top-left、bottom-right、bottom-left | String   | top-right |
| onClose   | 关闭时的回调                                                 | Function | —         |
| showClose | 是否显示关闭按钮                                             | Boolean  | true      |
| useHTML   | 是否将message转换成HTML片段插入，此操作需谨慎                | Boolean  | false     |
| offset    | 偏移量                                                       | Number   | —         |
| zIndex    | 层级，默认2000以后追加                                       | Number   | —         |
