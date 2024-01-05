<template>
  <div :class="anchorLinkClasses">
    <span
      class="fei-anchor-link-title"
      :data-href="href"
      :style="activeColor"
      :title="title"
      @click.prevent="goAnchor"
    >
      {{ title }}
    </span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import '../styles/index.css'
import type { AnchorLinkProps } from './types'
import { inject, computed } from 'vue'

defineOptions({
  name: 'FAnchorLink'
})
const props = withDefaults(defineProps<AnchorLinkProps>(), {
  scrollOffset: 0
})

const prefix = 'fei-anchor-link'
const parent = inject('FAnchor')
const selectLink = inject('chooseLink')

const anchorLinkClasses = computed(() => {
  // @ts-ignore
  return [prefix, parent.data.currentLink === props.href ? `${prefix}-active` : '']
})

const activeColor = computed(() => {
  return {
    // @ts-ignore
    color: parent.data.currentLink === props.href ? parent.props.activeColor : null
  }
})
// @ts-ignore
parent.linksRef.value = [...parent.linksRef.value, props]
const goAnchor = () => {
  // @ts-ignore
  selectLink(props.href)
}
</script>
