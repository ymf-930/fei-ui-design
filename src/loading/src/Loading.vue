<template>
  <Transition name="fade-in-linear">
    <!--
      v-show 由组件内部状态驱动（服务式调用可通过 hide() 触发淡出）。
      此前 <Transition> 包着一层无 v-if/v-show 的静态节点，
      过渡效果实际从未生效。
    -->
    <div v-show="visible" :class="classes">
      <div class="fei-loading-inner">
        <slot>
          <div v-if="!showIcon">
            <svg class="circular" viewBox="25 25 50 50">
              <circle
                class="path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke-width="5"
                stroke-miterlimit="10"
              ></circle>
            </svg>
          </div>
          <i
            v-else
            class="f-iconfont loading-icon icon-is-rotating"
            :class="`f-icon-${showIcon}`"
          ></i>
        </slot>
        <slot name="text">
          <div v-if="text" class="loading-text" :style="textStyle">{{ text }}</div>
        </slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import '../styles/index.css'
import type { LoadingProps } from './types'
import { ref, computed } from 'vue'

const prefixCls = 'fei-loading'
defineOptions({
  name: 'FLoading'
})

const props = withDefaults(defineProps<LoadingProps>(), {
  fix: true
})

const text = ref(props.showText)
/** 可见性：由服务式调用 / 指令控制，驱动 <Transition> 的淡入淡出 */
const visible = ref(true)

function show() {
  visible.value = true
}

function hide() {
  visible.value = false
}

const classes = computed(() => [
  `${prefixCls}`,
  {
    [`${prefixCls}-fix`]: props.fix,
    [`${prefixCls}-show-text`]: props.showText
  }
])
const textStyle = computed(() => ({
  fontSize: `${props.size}px`
}))

function setTitle(title: string) {
  text.value = title
}

defineExpose({ setTitle, show, hide, visible })
</script>
