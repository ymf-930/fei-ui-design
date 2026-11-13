import { computed, ref, reactive, watch } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance as PopperInstance } from '@popperjs/core'
import { generateId, isBool, isHTMLElement, isString, $ } from '../../../../_utils/util-helper'

import usePopperOptions from './use-popper-options'
import { transferIncrease } from '../../../../_utils/config'
import { DEFAULT_TRIGGER, type PopperProps, type TriggerType } from '../types'

export const UPDATE_VISIBLE_EVENT = 'update:visible'

/** hook 仅依赖 emit，使用最小上下文类型以兼容 defineComponent 推导出的 ctx 变体 */
interface PopperContext {
  emit: (...args: any[]) => void
}

export default function (props: PopperProps, ctx: PopperContext) {
  const arrowRef = ref<HTMLElement | null>(null)
  const triggerRef = ref<HTMLElement | null>(null)
  const popperRef = ref<HTMLElement | null>(null)

  const popperId = `fei-popper-${generateId()}`
  let popperInstance: null | PopperInstance = null
  let showTimer: number | undefined
  let hideTimer: number | undefined
  let triggerFocused = false

  const isManualMode = () => props.manualMode || props.trigger === 'manual'

  const popperStyle = ref({ zIndex: transferIncrease() })

  const popperOptions = usePopperOptions(props, {
    arrow: arrowRef
  })

  const state = reactive({
    visible: !!props.visible
  })
  // visible has been taken by props.visible, avoiding name collision
  // Either marking type here or setter parameter
  const visibility = computed({
    get() {
      if (props.disabled) {
        return false
      } else {
        return isBool(props.visible) ? props.visible : state.visible
      }
    },
    set(val) {
      if (isManualMode()) return
      isBool(props.visible) ? ctx.emit(UPDATE_VISIBLE_EVENT, val) : (state.visible = val)
    }
  })

  function _show() {
    if ((props.hideAfter ?? 0) > 0) {
      hideTimer = window.setTimeout(() => {
        _hide()
      }, props.hideAfter)
    }
    visibility.value = true
  }

  function _hide() {
    visibility.value = false
  }

  function clearTimers() {
    clearTimeout(showTimer)
    clearTimeout(hideTimer)
  }

  const show = () => {
    if (isManualMode() || props.disabled) return
    clearTimers()
    if (props.showAfter === 0) {
      _show()
    } else {
      showTimer = window.setTimeout(() => {
        _show()
      }, props.showAfter)
    }
  }

  const hide = () => {
    if (isManualMode()) return
    clearTimers()
    if ((props.closeDelay ?? 0) > 0) {
      hideTimer = window.setTimeout(() => {
        close()
      }, props.closeDelay)
    } else {
      close()
    }
  }

  const close = () => {
    _hide()
    if (props.disabled) {
      doDestroy(true)
    }
  }

  function onPopperMouseEnter() {
    // if trigger is click, user won't be able to close popper when
    // user tries to move the mouse over popper contents
    if (props.enterable && props.trigger !== 'click') {
      clearTimeout(hideTimer)
    }
  }

  function onPopperMouseLeave() {
    const trigger = props.trigger ?? DEFAULT_TRIGGER
    // 同时兼容字符串 trigger 与历史遗留的数组 trigger 写法（数组形态只需覆盖单元素场景）
    const shouldPrevent =
      (isString(trigger) && (trigger === 'click' || trigger === 'focus')) ||
      (trigger.length === 1 && (trigger[0] === 'click' || trigger[0] === 'focus'))

    if (shouldPrevent) return

    hide()
  }

  function initializePopper() {
    if (!$(visibility)) {
      return
    }
    const unwrappedTrigger = $(triggerRef)
    const _trigger = isHTMLElement(unwrappedTrigger) ? unwrappedTrigger : unwrappedTrigger.$el
    popperInstance = createPopper(_trigger, $(popperRef), $(popperOptions))
    popperInstance.update()
  }

  function doDestroy(forceDestroy?: boolean) {
    /* istanbul ignore if */
    if (!popperInstance || ($(visibility) && !forceDestroy)) return
    detachPopper()
  }

  function detachPopper() {
    popperInstance?.destroy?.()
    popperInstance = null
  }

  const events: Record<string, (e: Event) => void> = {}

  function update() {
    if (!$(visibility)) {
      return
    }
    if (popperInstance) {
      popperInstance.update()
    } else {
      initializePopper()
    }
  }

  function onVisibilityChange(toState: boolean) {
    if (toState) {
      popperStyle.value.zIndex = transferIncrease() + (props.zIndex ?? 0)
      initializePopper()
    }
  }

  if (!isManualMode()) {
    const toggleState = () => {
      if ($(visibility)) {
        hide()
      } else {
        show()
      }
    }

    const popperEventsHandler = (e: Event) => {
      e.stopPropagation()
      switch (e.type) {
        case 'click': {
          if (triggerFocused) {
            // reset previous focus event
            triggerFocused = false
          } else {
            toggleState()
          }
          break
        }
        case 'mouseenter': {
          show()
          break
        }
        case 'mouseleave': {
          hide()
          break
        }
        case 'focus': {
          triggerFocused = true
          show()
          break
        }
        case 'blur': {
          triggerFocused = false
          hide()
          break
        }
      }
    }

    const triggerEventsMap: Partial<Record<TriggerType, string[]>> = {
      click: ['onClick'],
      hover: ['onMouseenter', 'onMouseleave'],
      focus: ['onFocus', 'onBlur']
    }

    const mapEvents = (t: TriggerType) => {
      // contextmenu / manual 等未配置映射的取值不应在解绑流程中抛错
      triggerEventsMap[t]?.forEach(event => {
        events[event] = popperEventsHandler
      })
    }

    // 兼容历史遗留的数组 trigger 写法：运行时透传数组时逐个绑定事件
    const trigger: TriggerType | TriggerType[] = props.trigger ?? DEFAULT_TRIGGER
    if (Array.isArray(trigger)) {
      trigger.forEach(mapEvents)
    } else {
      mapEvents(trigger)
    }
  }

  watch(popperOptions, val => {
    if (!popperInstance) return
    popperInstance.setOptions(val)
    popperInstance.update()
  })

  watch(visibility, onVisibilityChange)

  return {
    update,
    doDestroy,
    show,
    hide,
    onPopperMouseEnter,
    onPopperMouseLeave,
    onAfterEnter: () => {
      ctx.emit('after-enter')
    },
    onAfterLeave: () => {
      detachPopper()
      ctx.emit('after-leave')
    },
    onBeforeEnter: () => {
      ctx.emit('before-enter')
    },
    onBeforeLeave: () => {
      ctx.emit('before-leave')
    },
    initializePopper,
    isManualMode,
    arrowRef,
    events,
    popperId,
    popperInstance,
    popperRef,
    popperStyle,
    triggerRef,
    visibility
  }
}
