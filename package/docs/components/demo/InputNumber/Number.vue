<template>
  <f-row :gutter="16">
    <f-col span="6">
      <f-input-number v-model="value1" :max="10" :min="1" :step="0.2"></f-input-number>
      小数步长:0.2
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value2" :precision="2"></f-input-number>
      精度范围:2
    </f-col>
  </f-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(1)
const value2 = ref(null)
</script>
