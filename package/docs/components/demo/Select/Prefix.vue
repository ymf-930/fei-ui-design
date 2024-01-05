<template>
  <div style="width: 200px">
    <f-select v-model="select">
      <template #prefix>
        <i class="f-iconfont f-icon-alert"></i>
      </template>
      <f-option value="beijing" label="北京"></f-option>
      <f-option value="shanghai" label="上海"></f-option>
      <f-option value="xuzhou" label="徐州"></f-option>
      <f-option value="nanjing" label="南京"></f-option>
    </f-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const select = ref('')
</script>
