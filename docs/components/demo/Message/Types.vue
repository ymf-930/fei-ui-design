<template>
  <div>
    <f-button type="primary" plain @click="message1">info</f-button>
    <f-button type="success" plain @click="message2">success</f-button>
    <f-button type="warning" plain @click="message3">warning</f-button>
    <f-button type="danger" plain @click="message4">error</f-button>
  </div>
</template>

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
