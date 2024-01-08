<template>
  <div>
    <f-button type="primary" @click="value = true">左侧打开</f-button>
    <f-drawer v-model="value" title="抽屉标题" placement="left" width="500px">
      <p>我是左侧的抽屉</p>
    </f-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(false)
</script>
