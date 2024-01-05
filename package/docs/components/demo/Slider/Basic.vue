<template>
  <div>
    <f-slider v-model="value1"></f-slider>
    <div class="p10"></div>
    <f-slider v-model="value2" range></f-slider>
    <div class="p10"></div>
    <f-slider v-model="value3" range disabled></f-slider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(25)
const value2 = ref([20, 60])
const value3 = ref([30, 40])
</script>
