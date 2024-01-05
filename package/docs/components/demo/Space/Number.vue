<template>
  <f-space direction="vertical" alignment="start" :size="30">
    <f-radio-group v-model="size" type="capsule">
      <f-radio :label="8">8</f-radio>
      <f-radio :label="16">16</f-radio>
      <f-radio :label="24">24</f-radio>
      <f-radio :label="32">32</f-radio>
      <f-radio :label="40">40</f-radio>
    </f-radio-group>

    <f-space wrap :size="size">
      <f-card v-for="i in 3" :key="i" class="box-card" style="width: 250px">
        <template #header>
          <div class="card-header">
            <span>Card name</span>
            <f-button type="text">Operation button</f-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ 'List item ' + o }}
        </div>
      </f-card>
    </f-space>
  </f-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const size = ref(16)
</script>
