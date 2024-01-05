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
