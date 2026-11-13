import { withDirectives, Transition, vShow, withCtx, h } from 'vue'
import type { Ref, VNode } from 'vue'
import { stop } from '../../../../_utils/dom'

/** renderPopper 的渲染配置（FPopper 与 FPopover 复用同一渲染器，多数字段可缺省） */
export interface RenderPopperOptions {
  theme?: string
  name?: string
  stopPopperMouseEvent?: boolean
  popperClass?: string
  popperStyle?: Record<string, any>
  popperRef?: Ref<HTMLElement | null> | string
  pure?: boolean
  popperId?: string
  visibility: boolean
  onMouseEnter?: (e: MouseEvent) => void
  onMouseLeave?: (e: MouseEvent) => void
  onAfterEnter?: () => void
  onAfterLeave?: () => void
  onBeforeEnter?: () => void
  onBeforeLeave?: () => void
}

export default function renderPopper(props: RenderPopperOptions, children: VNode[]): VNode {
  const {
    theme,
    name,
    stopPopperMouseEvent,
    popperClass,
    popperStyle,
    popperRef,
    pure,
    popperId,
    visibility,
    onMouseEnter,
    onMouseLeave,
    onAfterEnter,
    onAfterLeave,
    onBeforeEnter,
    onBeforeLeave
  } = props

  const kls = [popperClass, 'fei-popper', 'is-' + theme, pure ? 'is-pure' : '']

  const mouseUpAndDown = stopPopperMouseEvent ? stop : () => {}
  return h(
    Transition,
    {
      name,
      onAfterEnter: onAfterEnter,
      onAfterLeave: onAfterLeave,
      onBeforeEnter: onBeforeEnter,
      onBeforeLeave: onBeforeLeave
    },
    {
      default: withCtx(() => [
        withDirectives(
          h(
            'div',
            {
              'aria-hidden': String(!visibility),
              class: kls,
              style: popperStyle ?? {},
              id: popperId,
              ref: popperRef ?? 'popperRef',
              role: 'tooltip',
              onMouseenter: onMouseEnter,
              onMouseleave: onMouseLeave,
              onClick: stop,
              onMousedown: mouseUpAndDown,
              onMouseup: mouseUpAndDown
            },
            children
          ),
          [[vShow, visibility]]
        )
      ])
    }
  )
}
