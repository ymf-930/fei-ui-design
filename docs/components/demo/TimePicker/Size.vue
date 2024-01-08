<template>
  <div flex>
    <div style="width: 240px; margin-right: 20px">
      <f-time-picker v-model="value1" size="large"></f-time-picker>
    </div>
    <div style="width: 240px; margin-right: 20px">
      <f-time-picker v-model="value1"></f-time-picker>
    </div>
    <div style="width: 240px; margin-right: 20px">
      <f-time-picker v-model="value1" size="small"></f-time-picker>
    </div>
    <div style="width: 240px; margin-right: 20px">
      <f-time-picker v-model="value1" size="mini"></f-time-picker>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(new Date(2016, 9, 10, 18, 40))
</script>
