<template>
  <f-popover v-model:visible="visible">
    <f-button type="text" @click="close">点我打开浮层</f-button>
    <a style="margin-left: 30px">Click</a>
    <template #content>
      <f-button type="text" @click="close">关闭</f-button>
    </template>
  </f-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
function close() {
  visible.value = false
}
</script>
