<!-- eslint-disable vue/no-v-html -->
<template>
  <transition name="fei-notice-fade">
    <div
      v-show="visible"
      :id="id"
      ref="elRef"
      :class="['fei-notice', customClass, horizontalClass]"
      :style="noticeStyles"
      role="alert"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
    >
      <i v-if="type || iconClass" class="fei-notice__icon" :class="[typeClass, iconClass]"></i>
      <div class="fei-notice__group" :class="{ 'is-with-icon': typeClass || iconClass }">
        <h2 class="fei-notice__title" v-text="title"></h2>
        <div v-show="message" class="fei-notice__content">
          <slot>
            <p v-if="!useHTML">{{ message }}</p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <div v-if="showClose" class="f-iconfont f-icon-close" @click.stop="close"></div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import '../styles/index.css'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { EVENT_CODE } from '../../_utils/aria'
import { on, off } from '../../_utils/dom'
import type { NoticeProps } from './types'

const TypeMap = {
  info: 'info-circle-fill',
  success: 'check-circle-fill',
  warning: 'warning-circle-fill',
  error: 'close-circle-fill'
}
defineOptions({
  name: 'BNotice'
})

const props = withDefaults(defineProps<NoticeProps>(), {
  showClose: true,
  duration: 4.5,
  offset: 0,
  position: 'top-right'
})

const typeClass = computed(() => {
  const type = props.type
  return type && TypeMap[type] ? `f-iconfont f-icon-${TypeMap[type]} is-${type}` : ''
})

const horizontalClass = computed(() => (props.position.indexOf('right') > 1 ? 'right' : 'left'))

const verticalProperty = computed(() => (props.position.startsWith('top') ? 'top' : 'bottom'))

const noticeStyles = computed(() => ({
  [verticalProperty.value]: `${props.offset}px`,
  zIndex: props.zIndex
}))

const visible = ref(false)
const closed = ref(false)
let timer: any = null
const elRef = ref(null)

function close() {
  closed.value = true
  timer = null
}

function clearTimer() {
  clearTimeout(timer)
  timer = null
}

function keydown(e: KeyboardEvent) {
  const { code } = e
  if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) {
    clearTimer() // press delete/backspace clear timer
  } else if (code === EVENT_CODE.esc) {
    // press esc to close the notification
    if (!closed.value) {
      close()
    }
  } else {
    startTimer() // resume timer
  }
}

function startTimer() {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      if (!closed.value) {
        close()
      }
    }, props.duration * 1000)
  }
}

function destroyElement() {
  visible.value = false
  off(elRef.value, 'transitionend', destroyElement)
  props.onClose?.()
}

watch(
  () => closed.value,
  val => {
    if (val) {
      visible.value = false
      on(elRef.value, 'transitionend', destroyElement)
    }
  }
)

onMounted(() => {
  startTimer()
  visible.value = true
  on(document, 'keydown', keydown)
})

onBeforeUnmount(() => {
  off(document, 'keydown', keydown)
})
</script>
