<template>
  <div>
    <f-checkbox v-model="disabledSingle" disabled>Checkbox</f-checkbox>
    <f-checkbox-group v-model="disabledGroup">
      <f-checkbox label="香蕉" disabled></f-checkbox>
      <f-checkbox label="苹果" disabled></f-checkbox>
      <f-checkbox label="西瓜"></f-checkbox>
    </f-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabledSingle = ref(true)
const disabledGroup = ref(['苹果'])
</script>
