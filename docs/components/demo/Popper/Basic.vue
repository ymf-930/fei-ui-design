<template>
  <div style="width: 200px">
    <f-popper trigger="click" theme="light" :z-index="1000">
      <template #default>这是一段内容这是一段内容这是一段内容</template>
      <template #trigger>
        <f-button>触发popper</f-button>
      </template>
    </f-popper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>
