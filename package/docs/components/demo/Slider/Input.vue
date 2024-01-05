<template>
  <div>
    <f-slider v-model="value1" show-input></f-slider>
    <div class="p10"></div>
    <f-slider v-model="value2" :format-tooltip="format"></f-slider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(25)
const value2 = ref(35)

function format(val) {
  return '进度: ' + val + '%'
}
</script>
