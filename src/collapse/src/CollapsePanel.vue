<template>
  <div
    class="fei-collapse-item"
    :class="{
      'fei-collapse-item-active': isActive,
      'is-disabled': disabled
    }"
  >
    <div class="fei-collapse-header" @click="handleHeaderClick">
      <f-icon v-if="!hideArrow" name="right" />
      <slot name="title">
        {{ title }}
      </slot>
    </div>

    <f-collapse-transition>
      <div v-show="isActive" class="fei-collapse-content">
        <div class="fei-collapse-content-box">
          <slot />
        </div>
      </div>
    </f-collapse-transition>
  </div>
</template>

<script setup lang="ts">
import '../styles/index.css'
import { inject, computed } from 'vue'
import { FCollapseTransition } from '../../_internal/collapse-transition'
import { FIcon } from '../../icon'
import type { CollapsePanelProps } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: 'FCollapsePanel',
  components: { FIcon, FCollapseTransition }
})

const props = defineProps<CollapsePanelProps>()

const collapseContext = inject(collapseContextKey)

const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))

const handleHeaderClick = () => {
  if (props.disabled) return
  collapseContext?.handleItemClick(props.name)
}
</script>
