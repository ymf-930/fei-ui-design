<template>
  <div
    :class="[
      'fei-divider',
      `fei-divider-${type}`,
      {
        ['fei-divider-dashed']: !!dashed
      }
    ]"
  >
    <span v-if="$slots.default" :class="['fei-divider-inner-text', `is-${align}`]">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import '../styles/index.css'
import type { DividerProps } from './types'

defineOptions({
  name: 'FDivider'
})

withDefaults(defineProps<DividerProps>(), {
  type: 'horizontal',
  align: 'center',
  dashed: false
})
</script>
