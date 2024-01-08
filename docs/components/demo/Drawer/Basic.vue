<template>
  <div>
    <f-button type="primary" @click="value = true">open</f-button>
    <f-drawer v-model="value" title="抽屉标题">
      <p>我是抽屉内容</p>
    </f-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(false)
</script>
