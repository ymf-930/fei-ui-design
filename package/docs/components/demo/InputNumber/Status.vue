<template>
  <f-row :gutter="16">
    <f-col span="6">
      <f-input-number v-model="value" disabled></f-input-number>
      disabled
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value" readonly></f-input-number>
      readonly
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value" :editable="false"></f-input-number>
      editable="false"
    </f-col>
  </f-row>
  <br />
  <f-row :gutter="16">
    <f-col span="6">
      <f-input-number v-model="value" disabled always></f-input-number>
      disabled
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value" readonly always></f-input-number>
      readonly
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value" :editable="false" always></f-input-number>
      editable="false"
    </f-col>
  </f-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
