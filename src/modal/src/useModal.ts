import { computed, ref, watch, nextTick, onMounted } from 'vue'
import isServer from '../../_utils/isServer'
import { UPDATE_MODEL_EVENT } from '../../_utils/constants'
import { clearTimer } from '../../_utils/util-helper'
import { transferIncrease } from '../../_utils/config'
import { useLockScreen, useRestoreActive, useModal } from '../../_hooks'

export const CLOSE_EVENT = 'close'
export const OPEN_EVENT = 'open'
export const CLOSED_EVENT = 'closed'
export const OPENED_EVENT = 'opened'
export { UPDATE_MODEL_EVENT }

/** useModal 仅读取以下配置字段，避免与不同调用方的 props 定义耦合 */
interface UseModalProps {
  fullscreen?: boolean
  top?: string
  width?: string
  openDelay?: number
  closeDelay?: number
  destroyOnClose?: boolean
  /** 运行时 props 为 FunctionConstructor，此处保持宽松以兼容组件传入的定义 */
  beforeClose?: any
  lockScroll?: boolean
  escClosable?: boolean
  modelValue?: boolean
  zIndex?: number
  maskClosable?: boolean
}

export default function (
  props: UseModalProps,
  emit: (...args: any[]) => void,
  targetRef: { value: any }
) {
  const visible = ref(false)
  const closed = ref(false)
  const dialogRef = ref(null)
  const openTimer = ref<number | null>(null)
  const closeTimer = ref<number | null>(null)
  const rendered = ref(false) // when desctroyOnClose is true, we initialize it as false vise versa
  const modalIndex = ref(props.zIndex || transferIncrease())
  const modalRef = ref(null)

  const style = computed(() => {
    const style: Record<string, string> = {}
    if (!props.fullscreen) {
      style.marginTop = props.top ?? ''
      if (props.width) {
        style.width = props.width
      }
    }
    return style
  })

  function afterEnter() {
    emit(OPENED_EVENT)
  }

  function afterLeave() {
    emit(CLOSED_EVENT)
    emit(UPDATE_MODEL_EVENT, false)
    if (props.destroyOnClose) {
      rendered.value = false
    }
  }

  function beforeLeave() {
    emit(CLOSE_EVENT)
  }

  function open() {
    clearTimer(closeTimer)
    clearTimer(openTimer)
    if (props.openDelay && props.openDelay > 0) {
      openTimer.value = window.setTimeout(() => {
        openTimer.value = null
        doOpen()
      }, props.openDelay)
    } else {
      doOpen()
    }
  }

  function close() {
    clearTimer(openTimer)
    clearTimer(closeTimer)

    if (props.closeDelay && props.closeDelay > 0) {
      closeTimer.value = window.setTimeout(() => {
        closeTimer.value = null
        doClose()
      }, props.closeDelay)
    } else {
      doClose()
    }
  }

  function hide(shouldCancel?: boolean) {
    if (shouldCancel) return
    closed.value = true
    visible.value = false
  }

  function handleClose() {
    if (props.beforeClose) {
      props.beforeClose(hide)
    } else {
      close()
    }
  }

  function onModalClick() {
    if (props.maskClosable) {
      handleClose()
    }
  }

  function doOpen() {
    if (isServer) {
      return
    }

    visible.value = true
  }

  function doClose() {
    visible.value = false
  }

  if (props.lockScroll) {
    useLockScreen(visible)
  }

  if (props.escClosable) {
    useModal(
      {
        handleClose
      },
      visible
    )
  }

  useRestoreActive(visible)

  watch(
    () => props.modelValue,
    val => {
      if (val) {
        closed.value = false
        open()
        rendered.value = true // enables lazy rendering
        emit(OPEN_EVENT)
        modalIndex.value = (props.zIndex ?? 0) > 0 ? ++modalIndex.value : transferIncrease()
        nextTick(() => {
          if (targetRef.value) {
            targetRef.value.scrollTop = 0
          }
        })
      } else {
        if (visible.value) {
          close()
        }
      }
    }
  )

  onMounted(() => {
    if (props.modelValue) {
      visible.value = true
      rendered.value = true // enables lazy rendering
      open()
    }
  })

  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    closed,
    dialogRef,
    style,
    rendered,
    modalRef,
    visible,
    modalIndex
  }
}
