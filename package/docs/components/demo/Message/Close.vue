<template>
  <div>
    <f-button @click="message">创建三条不会关闭的消息</f-button>
    <f-button @click="closeAll">关闭所有</f-button>
  </div>
</template>

<script setup lang="ts">
import { Message } from 'f-ui-design'

function message() {
  Message.warning({ message: '消息1', duration: 0 })
  Message.warning({ message: '消息2', duration: 0 })
  Message.warning({ message: '消息3', duration: 0 })
}

function closeAll() {
  Message.closeAll()
}
</script>
