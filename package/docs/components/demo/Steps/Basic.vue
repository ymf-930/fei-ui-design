<template>
  <div>
    <f-steps :current="current">
      <f-step title="已完成" content="这里是该步骤的描述信息"></f-step>
      <f-step title="进行中" content="这里是该步骤的描述信息"></f-step>
      <f-step title="待进行" content="这里是该步骤的描述信息"></f-step>
      <f-step title="待进行" content="这里是该步骤的描述信息"></f-step>
    </f-steps>
    <f-button type="primary" @click="next">下一步</f-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(0)

function next() {
  if (current.value === 3) {
    current.value = 0
  } else {
    current.value += 1
  }
}
</script>
