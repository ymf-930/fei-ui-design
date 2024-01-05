<template>
  <f-radio v-model="single">Radio</f-radio>
  <span style="color: #ff4511">{{ single }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const single = ref(false)
</script>
