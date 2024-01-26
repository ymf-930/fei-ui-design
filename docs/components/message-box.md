---
title: 弹框提示 MessageBox
---

<script setup>
import Basic from './demo/MessageBox/Basic.vue'
import Confirm from './demo/MessageBox/Confirm.vue'
import Custom from './demo/MessageBox/Custom.vue'
</script>

##### 空显示状态，用于给内部无数据情况的展示。十分简单

<card>

## 基础用法

直接用组件默认插槽插入即可

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button
      type="primary"
      @click="alert({ type: 'info', title: '标题', message: '我是弹窗内容', width: '500px' })"
    >
      Info
    </f-button>
    <f-button
      type="success"
      @click="alert({ type: 'success', title: '标题', message: '我是弹窗内容' })"
    >
      Success
    </f-button>
    <f-button
      type="warning"
      @click="alert({ type: 'warning', title: '标题', message: '我是弹窗内容' })"
    >
      Warning
    </f-button>
    <f-button type="danger" @click="showAlert">Error</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { MessageBox, Message } from 'fei-ui-design'

function alert(opt) {
  MessageBox.alert(opt)
}

function showAlert() {
  MessageBox.alert({
    type: 'error',
    title: '标题',
    message: '我是弹窗内容',
    callback: action => {
      Message({
        type: 'info',
        message: `action: ${action}`
      })
    }
  })
}
</script>

```
</template>

</card>

<card>

## 模拟confirm

模拟confirm提交选择

<template #example>

  <Confirm/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button type="default" @click="open">打开confirm</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { MessageBox, Message } from 'fei-ui-design'

function open() {
  MessageBox.confirm({
    type: 'warning',
    title: '提示',
    message: '<p>此操作将永久<span style="color:red;">删除</span>该文件, 是否继续?</p>',
    useHTML: true
  })
    .then(() => {
      Message({ type: 'success', message: '删除成功!' })
    })
    .catch(() => {
      Message({ type: 'info', message: '已取消删除' })
    })
}
</script>
```

</template>

</card>

<card>

## 自定义

可以自定义内容

<template #example>

  <Custom/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button type="default" @click="open">打开MessageBox</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { MessageBox, Message } from 'fei-ui-design'
import { h } from 'vue'

function open() {
  MessageBox.confirm({
    title: '消息',
    message: h('p', null, [
      h('span', null, '内容可以是 '),
      h('i', { style: 'color: teal' }, 'VNode')
    ]),
    showCancelButton: true,
    confirmText: 'OK',
    cancelText: 'Cancel',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmText = '执行中... , 三秒关闭'
        setTimeout(() => {
          done()
          setTimeout(() => {
            instance.confirmButtonLoading = false
          }, 300)
        }, 3000)
      } else {
        done()
      }
    }
  })
    .then(action => {
      Message({
        type: 'info',
        message: 'action: ' + action
      })
    })
    .catch(() => {
      Message({ type: 'info', message: 'Cancel' })
    })
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
import { MessageBox } from 'fei-ui-design'

// options 可 直接传入字符串，如入参是字符串，则代表使用默认配置，入参填入message属性中进行调用
MessageBox(options)
Message.alert(options)
Message.confirm(options)
```
  
</template>

</card>

## Options

| 函数              | 说明                                                                                   | 类型                   | 默认值               |
| ----------------- | -------------------------------------------------------------------------------------- | ---------------------- | -------------------- |
| title             | 标题                                                                                   | String                 | —                    |
| message           | 内容                                                                                   | String /Element String | —                    |
| type              | 类别，用于显示图标,info,success,warning,error                                          | String                 | —                    |
| useHTML           | 是否使用html插入                                                                       | Boolean                | false                |
| iconClass         | 替换图表名称（不带前缀）                                                               | String                 | —                    |
| callback          | 回调函数，不实用promise，可以用参数指定，参数为action，值为'confirm','cancel'          | Function               | —                    |
| beforeClose       | 闭前的回调，会暂停实例的关闭(action, instance, done)，action 的值为'confirm', 'cancel' | String                 | 取消                 |
| showCancelButton  | 是否显示取消按钮                                                                       | Boolean                | false                |
| scrollable        | 页面是否可以滚动                                                                       | Boolean                | false                |
| showConfirmButton | 是否显示确定按钮                                                                       | Boolean                | true                 |
| cancelText        | 取消按钮文字                                                                           | String                 | 取消                 |
| confirmText       | 确定按钮文字                                                                           | String                 | 确定                 |
| maskClosable      | 是否可以点击遮罩关闭                                                                   | Boolean                | true ,alert时为false |
| escClosable       | esc按钮关闭                                                                            | Boolean                | true ,alert时为false |
