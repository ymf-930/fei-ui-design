<template>
  <div :class="`${prefixCls}__item`">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { SpaceItemProps } from './types'

defineOptions({
  name: 'FSpaceItem'
})
withDefaults(defineProps<SpaceItemProps>(), {
  prefixCls: 'fei-space'
})
</script>
