<template>
  <template v-if="uiLoading">
    <div :class="['fei-skeleton', animation ? 'is-animated' : '']" v-bind="$attrs">
      <template v-for="i in count" :key="i">
        <slot v-if="loading" name="template">
          <f-skeleton-item class="is-first" variant="p" />
          <f-skeleton-item
            v-for="item in rows"
            :key="item"
            :class="{
              'fei-skeleton__paragraph': true,
              'is-last': item === rows && rows > 1
            }"
            variant="p"
          />
        </slot>
      </template>
    </div>
  </template>
  <template v-else>
    <slot v-bind="$attrs"></slot>
  </template>
</template>

<script setup lang="ts">
import '../styles/index.css'
import { computed } from 'vue'
import type { SkeletonProps } from './types'
import useThrottleRender from './use-throttle'
import FSkeletonItem from './SkeletonItem.vue'

defineOptions({
  name: 'FSkeleton'
})

const props = withDefaults(defineProps<SkeletonProps>(), {
  count: 1,
  rows: 3,
  loading: true
})

const innerLoading = computed(() => props.loading)

const uiLoading = useThrottleRender(innerLoading, props.throttle)
</script>
