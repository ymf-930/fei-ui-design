---
title: 上传 Upload
---

<script setup>
import Basic from './demo/Upload/Basic.vue'
import Multiple from './demo/Upload/Multiple.vue'
import Handle from './demo/Upload/Handle.vue'
import Drag from './demo/Upload/Drag.vue'
</script>

##### 文件选择上传按钮，实现简单的上传封装

<card>

## 基础用法

最基本用法，点击上传，一次选择一个文件。

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 400px">
    <f-upload action="//jsonplaceholder.typicode.com/posts/"></f-upload>
  </div>
</template>
```

</template>

</card>

<card>

## 多选

可以开启多选模式来一次选择多个

<template #example>

  <Multiple/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 400px">
    <f-upload action="//jsonplaceholder.typicode.com/posts/" multiple>
      <f-button icon="cloud-upload" plain type="primary">点击上传</f-button>
    </f-upload>
  </div>
</template>
```

</template>

</card>

<card>

## 手动上传

绑定 before-upload，并返回false，可以阻止默认上传流程，手动控制文件上传。

可以自由控制上传逻辑，具体参考api实现

<template #example>

  <Handle/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 400px">
    <f-upload
      action="//jsonplaceholder.typicode.com/posts/"
      :before-upload="handleUpload"
    ></f-upload>

    <div v-if="file !== null" flex="cross:center">
      Upload file: {{ file.name }}
      <f-button type="text" :loading="loadingStatus" @click="upload">
        {{ loadingStatus ? 'Uploading...' : 'Click to upload' }}
      </f-button>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from 'fei-ui-design'

const file = ref(null)
const loadingStatus = ref(false)

function handleUpload(f) {
  file.value = f
  return false
}
function upload() {
  loadingStatus.value = true
  setTimeout(() => {
    file.value = null
    loadingStatus.value = false
    Message({ type: 'success', message: '上传成功' })
  }, 1500)
}
</script>
```

</template>

</card>

<card>

## 拖拽上传

设置属性 type 为 drag，可以拖拽上传。

<template #example>

  <Drag/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 400px">
    <f-upload action="//jsonplaceholder.typicode.com/posts/" multiple type="drag">
      <div
        style="padding: 20px 0; border: 1px dashed #eee; cursor: pointer"
        flex="dir:top main:center cross:center"
      >
        <p>
          <f-icon name="cloud-upload" size="52" style="color: #3399ff"></f-icon>
        </p>
        <p>Click or drag files here to upload</p>
      </div>
    </f-upload>
  </div>
</template>
```

</template>

</card>

## Attributes

| 参数              | 说明                                                                                                                                           | 类型     | 可选值                           | 默认值 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------- | ------ |
| action            | 上传的地址，必填                                                                                                                               | string   | —                                | —      |
| headers           | 上传的请求头                                                                                                                                   | Object   | —                                | {}     |
| multiple          | 是否支持多选                                                                                                                                   | Boolean  | —                                | false  |
| paste             | 是否支持粘贴上传                                                                                                                               | Boolean  | —                                | false  |
| disabled          | 禁用                                                                                                                                           | Boolean  | —                                | false  |
| data              | 上传时附带的额外参数                                                                                                                           | Object   | —                                | —      |
| name              | 上传的文件字段名                                                                                                                               | String   | —                                | file   |
| with-credentials  | 支持发送 cookie 凭证信息                                                                                                                       | Boolean  | —                                | false  |
| show-upload-list  | 是否显示已上传文件列表                                                                                                                         | Boolean  | —                                | true   |
| type              | 上传控件的类型                                                                                                                                 | String   | select（选择），drag（支持拖拽） | select |
| accept            | 接受上传的文件类型,input 标签原生的 accept 属性，会在选择文件时过滤                                                                            | String   | —                                | —      |
| format            | 支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名                                                                                  | String   | —                                | —      |
| max-size          | 文件大小限制，单位 kb                                                                                                                          | Number   | —                                | —      |
| before-upload     | 上传文件之前的钩子，参数为上传的文件,若返回 false 或者 Promise 则停止上传                                                                      | Function | —                                | —      |
| on-progress       | 文件上传时的钩子，返回字段为 event, file, fileList                                                                                             | Function | —                                | —      |
| on-success        | 文件上传成功时的钩子，返回字段为 response, file, fileList                                                                                      | Function | —                                | —      |
| on-error          | 文件上传失败时的钩子，返回字段为 error, file, fileList                                                                                         | Function | —                                | —      |
| on-preview        | 点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据                                                      | Function | —                                | —      |
| on-remove         | 文件列表移除文件时的钩子，返回字段为 file, fileList                                                                                            | Function | —                                | —      |
| on-format-error   | 文件格式验证失败时的钩子，返回字段为 file, fileList                                                                                            | Function | —                                | —      |
| on-exceeded-size  | 文件超出指定大小限制时的钩子，返回字段为 file, fileList                                                                                        | Function | —                                | —      |
| default-file-list | 默认已上传的文件列表，例如：[{name: 'img1.jpg',url: 'http://www.xxx.com/img1.jpg' }, { name: 'img2.jpg', url: 'http://www.xxx.com/img2.jpg' }] | Array    | —                                | []     |

## Methods

| 方法名     | 说明             | 参数 |
| ---------- | ---------------- | ---- |
| clearFiles | 清空已上传的列表 | 无   |

## Slot

| 名称    | 说明                                   |
| ------- | -------------------------------------- |
| default | 触发上传组件的控件，默认是一个按钮     |
| tip     | 辅助的提示消息，如：单个文件不能超过2M |
