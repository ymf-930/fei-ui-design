<template>
  <div :class="['fei-skeleton__item', `fei-skeleton__${variant}`]">
    <ImagePlaceholder v-if="variant === 'image'" />
  </div>
</template>

<script setup lang="ts">
import ImagePlaceholder from './ImagePlaceholder.vue'
import type { SkeletonItemProps } from './types'

defineOptions({
  name: 'FSkeletonItem'
})

withDefaults(defineProps<SkeletonItemProps>(), {
  variant: 'text'
})
</script>
