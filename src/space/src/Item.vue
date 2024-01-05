<template>
  <div :class="`${prefixCls}__item`">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { SpaceItemProps } from './types'

defineOptions({
  name: 'FSpace'
})
withDefaults(defineProps<SpaceItemProps>(), {
  prefixCls: 'fei-space'
})
</script>
