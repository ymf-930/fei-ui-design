<template>
  <ul :class="cpClasses">
    <slot></slot>
  </ul>
</template>

<script setup lang="ts">
import '../styles/index.css'
import type { BTimelineProps } from './types'
import { computed } from 'vue'

const prefixCls = 'fei-timeline'

defineOptions({
  name: 'BTimeline'
})

const props = defineProps<BTimelineProps>()

const cpClasses = computed(() => [`${prefixCls}`, { [`${prefixCls}-pending`]: props.pending }])
</script>
