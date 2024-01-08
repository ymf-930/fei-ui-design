<template>
  <div>
    <f-steps :current="current">
      <f-step title="已完成" icon="sketch"></f-step>
      <f-step title="进行中" icon="block"></f-step>
      <f-step title="待进行" icon="Gitlab"></f-step>
    </f-steps>
    <f-button type="primary" @click="next">下一步</f-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(0)

function next() {
  if (current.value === 2) {
    current.value = 0
  } else {
    current.value += 1
  }
}
</script>
