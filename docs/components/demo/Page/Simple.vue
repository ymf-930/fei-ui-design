<template>
  <f-page v-model:current="current" :total="100" simple></f-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(2)
</script>
