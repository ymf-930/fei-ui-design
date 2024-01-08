<template>
  <f-tooltip content="延时一秒显示悬停文字" :open-delay="1000">
    <f-button>延时一秒</f-button>
  </f-tooltip>
  <f-tooltip content="点击显示" trigger="click">
    <f-button>点击显示</f-button>
  </f-tooltip>
  <f-tooltip content="关闭和隐藏提示" :disabled="disabled">
    <f-button @click="disabled = !disabled">{{ disabled ? '关闭提示' : '开启提示' }}</f-button>
  </f-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const disabled = ref(false)
</script>
