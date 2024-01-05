<template>
  <li
    class="fei-dropdown-item"
    :class="{
      'fei-dropdown-item-disabled': disabled,
      'fei-dropdown-item-divided': divided,
      'fei-dropdown-item-selected': selected
    }"
    :aria-disabled="disabled"
    :tabindex="disabled ? undefined : -1"
    @click="handleClick"
  >
    <i v-if="icon" :class="`f-iconfont f-icon-${icon}`"></i>
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { useDropdown } from './useDropdown'
import type { DropdownItemProps } from './types'

defineOptions({
  name: 'FDropdownItem'
})

const props = withDefaults(defineProps<DropdownItemProps>(), {
  name: ''
})

const { bDropdown } = useDropdown()
const _instance = getCurrentInstance()

function handleClick(e: MouseEvent) {
  if (props.disabled) return
  if (bDropdown.hideOnClick.value) {
    bDropdown.handleClick?.()
  }
  bDropdown.commandHandler?.(props.name, _instance, e)
}
</script>
