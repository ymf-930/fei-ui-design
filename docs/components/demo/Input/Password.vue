<template>
  <div>
    <f-input v-model="value" show-password-toggle type="password" class="input-item"></f-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<style scoped>
.input-item {
  width: 300px;
  margin-right: 20px;
}
</style>
