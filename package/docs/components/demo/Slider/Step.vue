<template>
  <div>
    <f-slider v-model="value4" :step="10"></f-slider>
    <div class="p10"></div>
    <f-slider v-model="value5" :step="10" show-stops></f-slider>
    <div class="p10"></div>
    <f-slider v-model="value6" :step="10" range></f-slider>
    <div class="p10"></div>
    <f-slider v-model="value7" :step="10" range show-stops></f-slider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value4 = ref(30)
const value5 = ref(35)
const value6 = ref([20, 40])
const value7 = ref([30, 50])
</script>
