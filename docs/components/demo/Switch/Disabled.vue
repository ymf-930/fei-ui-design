<template>
  <div>
    <f-switch v-model="value1" disabled size="large"></f-switch>
    &nbsp;
    <f-switch v-model="value1" disabled></f-switch>
    &nbsp;
    <f-switch v-model="value1" disabled size="small"></f-switch>
    &nbsp;
    <f-switch v-model="value2" disabled size="large"></f-switch>
    &nbsp;
    <f-switch v-model="value2" disabled></f-switch>
    &nbsp;
    <f-switch v-model="value2" disabled size="small"></f-switch>
    &nbsp;
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(false)
</script>
