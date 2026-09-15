<template>
  <ul :class="cpClasses">
    <slot></slot>
  </ul>
</template>

<script setup lang="ts">
import '../styles/index.css'
import type { FTimelineProps } from './types'
import { computed } from 'vue'

const prefixCls = 'fei-timeline'

defineOptions({
  name: 'FTimeline'
})

const props = defineProps<FTimelineProps>()

const cpClasses = computed(() => [`${prefixCls}`, { [`${prefixCls}-pending`]: props.pending }])
</script>
