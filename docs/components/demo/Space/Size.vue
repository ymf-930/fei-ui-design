<template>
  <f-space direction="vertical" alignment="start" :size="30">
    <f-radio-group v-model="size" type="capsule">
      <f-radio :label="'mini'">迷你</f-radio>
      <f-radio :label="'small'">小</f-radio>
      <f-radio :label="'default'">默认</f-radio>
      <f-radio :label="'large'">大号</f-radio>
    </f-radio-group>

    <f-space :size="size">
      space
      <f-button type="primary">Button</f-button>
      <f-button icon="upload">Button</f-button>
      <f-button type="danger">Delete</f-button>
    </f-space>
  </f-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const size = ref('default')
</script>
