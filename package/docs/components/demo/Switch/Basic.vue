<template>
  <f-switch v-model="value" @change="change"></f-switch>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)

function change(val) {
  console.log(val)
}
</script>
