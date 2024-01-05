<template>
  <div>
    <f-button @click="modal1 = true">打开弹窗1</f-button>
    <f-button @click="modal2 = true">打开弹窗2</f-button>
    <f-modal v-model="modal1" title="弹窗1" draggable>
      <p>弹窗1内容</p>
    </f-modal>
    <f-modal v-model="modal2" title="弹窗2" draggable :mask="false">
      <p>弹窗2内容</p>
    </f-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const modal1 = ref(false)
const modal2 = ref(false)
</script>
