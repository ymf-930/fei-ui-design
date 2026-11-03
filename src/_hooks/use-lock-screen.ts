import { watch, isRef, onScopeDispose, type Ref } from 'vue'
import { throwError } from '../_utils/log'
import { addClass, removeClass, hasClass, getStyle, getScrollBarWidth } from '../_utils/dom'

/**
 * Hook that monitoring the ref value to lock or unlock the screen.
 * When the trigger became true, it assumes modal is now opened and vice versa.
 * @param trigger {boolean}
 */
export default (trigger: Ref<boolean>): void => {
  if (!isRef(trigger)) {
    throwError('useLockScreen', 'You need to pass a ref param to this function')
  }
  let scrollBarWidth = 0
  let withoutHiddenClass = false
  let bodyPaddingRight = '0'
  let computedBodyPaddingRight = 0
  let timer: ReturnType<typeof setTimeout> | null = null
  watch(trigger, val => {
    if (val) {
      if (timer) clearTimeout(timer)
      withoutHiddenClass = !hasClass(document.body, 'fei-popup-parent--hidden')
      if (withoutHiddenClass) {
        bodyPaddingRight = document.body.style.paddingRight
        computedBodyPaddingRight = parseInt(getStyle(document.body, 'paddingRight') || '', 10)
      }
      scrollBarWidth = getScrollBarWidth()
      const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight
      const bodyOverflowY = getStyle(document.body, 'overflowY')
      addClass(document.body, 'fei-popup-parent--hidden')
      if (
        scrollBarWidth > 0 &&
        (bodyHasOverflow || bodyOverflowY === 'scroll') &&
        withoutHiddenClass
      ) {
        document.body.style.paddingRight = computedBodyPaddingRight + scrollBarWidth + 'px'
        addClass(document.body, 'with-scrollbar')
      }
    } else {
      timer = setTimeout(() => {
        if (withoutHiddenClass) {
          document.body.style.paddingRight = bodyPaddingRight
          removeClass(document.body, 'fei-popup-parent--hidden')
          removeClass(document.body, 'with-scrollbar')
        }
        withoutHiddenClass = true
      }, 300)
    }
  })

  // 弹层在「打开」状态下被卸载时，上面的 else 分支永远不会执行：
  // 锁屏 class 与 body 内边距会永久残留在页面上（页面从此无法滚动）。
  // 同时挂起的解锁定时器也必须清掉，否则会对已卸载实例再操作一次 DOM。
  onScopeDispose(() => {
    if (timer) clearTimeout(timer)
    if (!withoutHiddenClass) return
    document.body.style.paddingRight = bodyPaddingRight
    removeClass(document.body, 'fei-popup-parent--hidden')
    removeClass(document.body, 'with-scrollbar')
  })
}
