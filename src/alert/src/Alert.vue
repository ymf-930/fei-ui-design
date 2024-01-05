<template>
  <Transition name="fade-in">
    <div v-if="!closed" :class="wrapClasses">
      <span v-if="showIcon" class="fei-alert-icon">
        <slot name="icon">
          <i :class="`f-iconfont f-icon-${iconType}`"></i>
        </slot>
      </span>
      <span class="fei-alert-message"><slot></slot></span>
      <span class="fei-alert-desc"><slot name="desc"></slot></span>
      <span v-if="closable" class="fei-alert-close" @click.stop="close">
        <slot name="close">
          <i class="f-iconfont f-icon-close"></i>
        </slot>
      </span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import '../styles/index.css'
import { computed, onMounted, ref } from 'vue'
import type { AlertProps } from './types'

const prefixCls = 'fei-alert'
const TYPE_CLASSES_MAP = {
  info: 'info-circle',
  success: 'check-circle',
  warning: 'warning-circle',
  error: 'error'
}

defineOptions({
  name: 'FAlert'
})

const emit = defineEmits(['close'])

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info'
})
const slots = defineSlots()

const closed = ref(false)
const desc = ref(false)
const iconType = computed(() => TYPE_CLASSES_MAP[props.type])

const wrapClasses = computed(() => {
  return [
    `${prefixCls}`,
    `${prefixCls}-${props.type}`,
    {
      [`${prefixCls}-with-icon`]: props.showIcon,
      [`${prefixCls}-with-desc`]: desc.value,
      [`${prefixCls}-with-banner`]: props.banner
    }
  ]
})

const close = (e: MouseEvent) => {
  closed.value = true
  emit('close', e)
}

onMounted(() => {
  desc.value = slots.desc !== undefined
})
</script>
