import { computed, watch, type ExtractPropTypes } from 'vue'
import { typeOf } from '../../_utils/util'
import { usePopper } from '../../_internal/popper'
import { popoverProps } from './types'

export const SHOW_EVENT = 'show'
export const HIDE_EVENT = 'hide'

type PopoverProps = ExtractPropTypes<typeof popoverProps>

/** 与 popper hook 一致，仅依赖 emit */
interface PopoverContext {
  emit: (...args: any[]) => void
}

export default function usePopover(props: PopoverProps, ctx: PopoverContext) {
  const popperProps = usePopper(props, ctx)

  const popperStyle = computed(() => {
    let _width

    if (typeOf(props.width) === 'string') {
      _width = props.width
    } else {
      _width = props.width + 'px'
    }

    return {
      width: _width,
      zIndex: popperProps.popperStyle.value.zIndex
    }
  })

  watch(popperProps.visibility, val => {
    ctx.emit(val ? SHOW_EVENT : HIDE_EVENT)
  })

  return {
    ...popperProps,
    popperStyle
  }
}
