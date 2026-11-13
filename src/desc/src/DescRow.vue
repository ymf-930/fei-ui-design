<template>
  <tr>
    <template v-for="(cell, index) in row" :key="`tr3-${index}`">
      <template v-if="descriptions.border">
        <f-desc-cell :cell="cell" tag="td" type="label" />
        <f-desc-cell :cell="cell" tag="td" type="content" />
      </template>
      <f-desc-cell v-else :cell="cell" tag="td" type="both" />
    </template>
  </tr>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { PropType } from 'vue'
import FDescCell from './DescCell'
import type { DescProps } from './types'

defineOptions({
  name: 'FDescRow'
})
defineProps({
  row: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => []
  }
})

const descriptions = inject<DescProps>('FDesc', {})
</script>
