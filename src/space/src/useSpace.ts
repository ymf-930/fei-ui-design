import { ref, computed, watch, isVNode } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { validSize } from '../../_utils/validator-size'
import { isNumber, isArray, isString } from '../../_utils/util-helper'

const SizeMap: Record<string, number> = {
  mini: 4,
  small: 8,
  default: 16,
  large: 24
}

export const defaultProps = {
  direction: {
    type: String,
    default: 'horizontal'
  },
  class: {
    type: [String, Object, Array],
    default: ''
  },
  style: {
    type: [String, Array, Object]
  },
  alignment: {
    type: String,
    default: 'center'
  },
  prefixCls: {
    type: String
  },
  spacer: {
    type: [Object, String, Number],
    default: null,
    validator: (val: unknown) => {
      return isVNode(val) || isNumber(val) || isString(val)
    }
  },
  wrap: {
    type: Boolean,
    default: false
  },
  size: {
    type: [String, Array, Number],
    validator: (val: unknown) => {
      return validSize(val) || isNumber(val) || isArray(val)
    }
  }
}

export type SpaceProps = ExtractPropTypes<typeof defaultProps>

export function useSpace(props: SpaceProps) {
  const classes = computed(() => ['fei-space', `fei-space--${props.direction}`, props.class])

  const horizontalSize = ref(0)
  const verticalSize = ref(0)

  watch(
    () => [props.size, props.wrap, props.direction],
    ([size = 'small', wrap, dir]) => {
      // when the specified size have been given
      if (Array.isArray(size)) {
        const [h = 0, v = 0] = size as number[]
        horizontalSize.value = h
        verticalSize.value = v
      } else {
        let val: number
        if (isNumber(size)) {
          val = size
        } else {
          // size 可能是字符串或数组，转成字符串后再查表，避免索引签名报错
          val = SizeMap[String(size)] || SizeMap.small
        }

        if (wrap && dir === 'horizontal') {
          horizontalSize.value = verticalSize.value = val
        } else {
          if (dir === 'horizontal') {
            horizontalSize.value = val
            verticalSize.value = 0
          } else {
            verticalSize.value = val
            horizontalSize.value = 0
          }
        }
      }
    },
    { immediate: true }
  )

  const containerStyle = computed(() => {
    const wrapKls = props.wrap
      ? { flexWrap: 'wrap', marginBottom: `-${verticalSize.value}px` }
      : null
    const alignment = {
      alignItems: props.alignment
    }
    return [wrapKls, alignment, props.style]
  })

  const itemStyle = computed(() => {
    return {
      paddingBottom: `${verticalSize.value}px`,
      marginRight: `${horizontalSize.value}px`
    }
  })

  return {
    classes,
    containerStyle,
    itemStyle
  }
}
