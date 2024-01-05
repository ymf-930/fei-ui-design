<template>
  <div>
    <f-space>
      <f-radio-group v-model="transitionName" type="capsule">
        <f-radio label="dialog-fade"></f-radio>
        <f-radio label="fade-in"></f-radio>
        <f-radio label="move-right"></f-radio>
        <f-radio label="zoom-in-top"></f-radio>
        <f-radio label="zoom-in"></f-radio>
        <f-radio label="fade-scale-move"></f-radio>
        <f-radio label="fade-down"></f-radio>
      </f-radio-group>
      <f-button @click="modal1 = true">弹出</f-button>
    </f-space>

    <f-modal
      v-model="modal1"
      :title="`自定义动画${transitionName}`"
      :transition-name="transitionName"
    >
      <p>我是弹窗内容...</p>
      <p>我是弹窗内容...</p>
      <p>我是弹窗内容...</p>
      <template #footer>
        <span>
          <f-button @click="modal1 = false">关闭</f-button>
        </span>
      </template>
    </f-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const modal1 = ref(false)
const transitionName = ref('dialog-fade')
</script>
