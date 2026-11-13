<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import '../styles/index.css'
import { computed, inject } from 'vue'
import type { RowProps, ColProps } from './types'

const prefixCls = 'fei-col'

defineOptions({
  name: 'FCol'
})
const props = defineProps<ColProps>()

const rowProps = inject<RowProps>('FRow', {})

const classes = computed(() => {
  const classList = [
    `${prefixCls}`,
    {
      [`${prefixCls}-span-${props.span}`]: props.span,
      [`${prefixCls}-order-${props.order}`]: props.order,
      [`${prefixCls}-offset-${props.offset}`]: props.offset,
      [`${prefixCls}-push-${props.push}`]: props.push,
      [`${prefixCls}-pull-${props.pull}`]: props.pull,
      [`${props.className}`]: !!props.className
    }
  ]

  ;['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
    // ColProps 只声明 number，但运行时也支持对象型响应式配置，故按索引映射读取
    const value = (props as unknown as Record<string, unknown>)[size]
    if (typeof value === 'number') {
      classList.push(`${prefixCls}-span-${size}-${value}`)
    } else if (value && typeof value === 'object') {
      const propItem = value as Record<string, unknown>
      Object.keys(propItem).forEach(prop => {
        classList.push(
          prop !== 'span'
            ? `${prefixCls}-${size}-${prop}-${propItem[prop]}`
            : `${prefixCls}-span-${size}-${propItem[prop]}`
        )
      })
    }
  })

  return classList
})
const gutter = computed(() => rowProps.gutter)
const styles = computed(() => {
  let style = {}
  if (gutter.value && gutter.value !== 0) {
    style = {
      paddingLeft: +gutter.value / 2 + 'px',
      paddingRight: +gutter.value / 2 + 'px'
    }
  }
  return style
})
</script>
