---
title: 消息提示 Message
---

<script setup>
import Basic from './demo/Message/Basic.vue'
import Types from './demo/Message/Types.vue'
import Options from './demo/Message/Options.vue'
import Close from './demo/Message/Close.vue'
</script>

##### 轻量级的信息反馈组件，在顶部居中显示，并自动消失。有多种不同的提示状态可选择。

<card>

## 基础用法

基本用法，默认在 3 秒后关闭

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button @click="message1">info</f-button>
    <f-button @click="message2">render函数</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { h } from 'vue'
import { Message } from 'fei-ui-design'

function message1() {
  Message('普通的消息提示！')
}

function message2() {
  Message.info({
    message: h('i', { style: 'color: red' }, '我是render函数渲染出来的内容')
  })
}
</script>
```

</template>

</card>

<card>

## 不同类别

用来显示「成功、警告、消息、错误」类的操作反馈。

<template #example>

  <Types/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button type="primary" plain @click="message1">info</f-button>
    <f-button type="success" plain @click="message2">success</f-button>
    <f-button type="warning" plain @click="message3">warning</f-button>
    <f-button type="danger" plain @click="message4">error</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { Message } from 'fei-ui-design'

function message1() {
  Message.info('我是普通消息提示')
}
function message2() {
  Message.success('成功的提示消息')
}
function message3() {
  Message.warning('警告的提示消息')
}
function message4() {
  Message.error('错误的提示消息')
}
</script>
```

</template>

</card>

<card>

## 其他参数

可以设置配置参数来渲染

<template #example>

  <Options/>
  
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

## 手动关闭

可以调用Message模块的 `closeAll()` 函数来手动关闭

<template #example>

  <Close/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button @click="message">创建三条不会关闭的消息</f-button>
    <f-button @click="closeAll">关闭所有</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { Message } from 'fei-ui-design'

function message() {
  Message.warning({ message: '消息1', duration: 0 })
  Message.warning({ message: '消息2', duration: 0 })
  Message.warning({ message: '消息3', duration: 0 })
}

function closeAll() {
  Message.closeAll()
}
</script>
```

</template>

</card>

<card>

## API

vue3中引入Message并进行函数调用，同时Message入参可为`string`类型或者是 `CreateMessageProps`对象类型，同时，为方便调用，也扩展了四种 type 的调用

<template #example>

```ts
import { Message } from 'fei-ui-design'

// options 可 直接传入字符串，如入参是字符串，则代表使用默认配置，入参填入message属性中进行调用
Message(options)
Message.info(options)
Message.success(options)
Message.warning(options)
Message.error(options)
```
  
</template>

</card>

## Options 对象

| 函数      | 说明                                                                         | 类型     | 默认值 |
| --------- | ---------------------------------------------------------------------------- | -------- | ------ |
| message   | 通知提醒的内容                                                               | String   | —      |
| duration  | 自动关闭的延时，单位秒，不关闭可以写 0                                       | Number   | 3      |
| onClose   | 关闭时的回调                                                                 | Function | —      |
| showClose | 是否显示关闭按钮                                                             | Boolean  | true   |
| useHTML   | 是否将message转换成HTML片段插入，此操作需谨慎                                | Boolean  | false  |
| offset    | 距离顶部的偏移量，设置后可以固定某个消息距离窗口顶部的位置（不进行向下追加） | Number   | —      |
| zIndex    | 层级，默认2000以后追加                                                       | Number   | —      |
