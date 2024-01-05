<template>
  <div>
    <f-button type="primary" @click="value = true">打开抽屉</f-button>
    <f-drawer v-model="value" title="一级抽屉" width="512" :show-close="false">
      <f-button type="primary" @click="value1 = true">打开二层抽屉</f-button>
    </f-drawer>
    <f-drawer v-model="value1" title="二级抽屉" :show-close="false">这是第二层抽屉</f-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(false)
const value1 = ref(false)
</script>
