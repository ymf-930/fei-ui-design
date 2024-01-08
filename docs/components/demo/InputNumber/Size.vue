<template>
  <f-row :gutter="16">
    <f-col span="6">
      <f-input-number v-model="value" size="mini"></f-input-number>
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value" size="small"></f-input-number>
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value"></f-input-number>
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value" size="large"></f-input-number>
    </f-col>
  </f-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
