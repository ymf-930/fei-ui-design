<template>
  <div>
    <div flex="cross:center" class="mb-16">
      <div class="mr-16">
        <f-color-picker v-model="color" size="large"></f-color-picker>
      </div>
      <div class="mr-16">
        <f-color-picker v-model="color"></f-color-picker>
      </div>
      <div class="mr-16">
        <f-color-picker v-model="color" size="small"></f-color-picker>
      </div>
      <div>
        <f-color-picker v-model="color" size="mini"></f-color-picker>
      </div>
    </div>
    <div flex="cross:center">
      <div class="mr-16">
        <f-color-picker v-model="color" size="large" :show-label="false"></f-color-picker>
      </div>
      <div class="mr-16">
        <f-color-picker v-model="color" :show-label="false"></f-color-picker>
      </div>
      <div class="mr-16">
        <f-color-picker v-model="color" size="small" :show-label="false"></f-color-picker>
      </div>
      <div>
        <f-color-picker v-model="color" size="mini" :show-label="false"></f-color-picker>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#1089ff')
</script>
