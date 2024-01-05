<template>
  <span class="fei-breadcrumb__item">
    <span ref="link" :class="['fei-breadcrumb__inner']" role="link">
      <slot></slot>
    </span>
    <i
      v-if="separatorIcon"
      class="fei-separator icon"
      :class="['f-iconfont', 'f-icon-' + separatorIcon]"
    ></i>
    <span v-else class="fei-separator" role="presentation">{{ separator }}</span>
  </span>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue'
import type { BreadcrumbInject } from './types'

defineOptions({
  name: 'FBreadcrumbItem'
})
const parent = inject<BreadcrumbInject>('Breadcrumb')
const separator = ref(parent?.props.separator)
const separatorIcon = ref(parent?.props.separatorIcon)
const link = ref(null)
</script>
