<template>
  <div>
    <f-checkbox-group v-model="checkAllGroup" :min="1" :max="2">
      <f-checkbox label="香蕉"></f-checkbox>
      <f-checkbox label="苹果"></f-checkbox>
      <f-checkbox label="西瓜"></f-checkbox>
      <f-checkbox label="草莓"></f-checkbox>
    </f-checkbox-group>
    <span style="color: #ff4511; margin: 5px 0">{{ checkAllGroup }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const checkAllGroup = ref(['香蕉', '西瓜'])
</script>
