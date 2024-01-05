<template>
  <div class="fei-button-group" :class="{ 'fei-button-group--vertical': vertical }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import '../styles/index.css'
import type { ButtonGroupProps } from './types'
defineOptions({
  name: 'FButtonGroup'
})

defineProps<ButtonGroupProps>()
</script>
