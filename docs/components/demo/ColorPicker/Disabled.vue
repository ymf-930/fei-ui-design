<template>
  <div flex>
    <div class="block" style="width: 200px; margin-right: 20px">
      <f-color-picker v-model="color" disabled></f-color-picker>
      &nbsp;&nbsp;
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#1089ff')
</script>
