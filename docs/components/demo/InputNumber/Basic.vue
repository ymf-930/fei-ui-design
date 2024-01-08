<template>
  <f-row :gutter="16">
    <f-col span="6">
      <f-input-number
        v-model="value1"
        :max="10"
        :min="1"
        arrow-up-icon="plus"
        arrow-down-icon="minus"
      ></f-input-number>
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value1" :max="10" :min="1" always></f-input-number>
    </f-col>
  </f-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(1)
</script>
