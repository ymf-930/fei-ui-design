<template>
  <f-space>
    <f-input v-model="value" icon="eye-fill" class="input-item"></f-input>
    <f-input v-model="value1" clearable class="input-item"></f-input>
  </f-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const value1 = ref('')
</script>

<style scoped>
.input-item {
  width: 300px;
  margin-right: 20px;
}
</style>
