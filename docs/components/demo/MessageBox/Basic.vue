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
