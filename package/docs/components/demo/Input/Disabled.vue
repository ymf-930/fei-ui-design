<template>
  <div>
    <f-input v-model="value" placeholder="disabled" disabled class="input-item"></f-input>
    <f-input v-model="value1" placeholder="readonly" readonly class="input-item"></f-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('禁用的文字')
const value1 = ref('只读的输入')
</script>

<style scoped>
.input-item {
  width: 300px;
  margin-right: 20px;
}
</style>
