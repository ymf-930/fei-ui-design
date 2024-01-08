<template>
  <div>
    <f-radio v-model="disabledSingle" disabled>Checkbox</f-radio>
    <f-radio-group v-model="disabledGroup">
      <f-radio label="香蕉" disabled></f-radio>
      <f-radio label="苹果" disabled></f-radio>
      <f-radio label="西瓜"></f-radio>
    </f-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const disabledSingle = ref(true)
const disabledGroup = ref('苹果')
</script>
