<template>
  <div class="demo-button" flex="cross:center">
    <f-button type="primary" :loading="loading" icon="reload" @click="loading = true">
      Click me!
    </f-button>
    <f-button @click="loading = false">stop</f-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
</script>
