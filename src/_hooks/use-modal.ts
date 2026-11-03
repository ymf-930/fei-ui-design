import { watch, type Ref } from 'vue'
import { on } from '../_utils/dom'
import { EVENT_CODE } from '../_utils/aria'
import isServer from '../_utils/isServer'

/** 可通过 Esc 关闭的弹层实例 */
interface ModalInstance {
  handleClose: () => void
}

const modalStack: ModalInstance[] = []

const closeModal = (e: KeyboardEvent): void => {
  if (modalStack.length === 0) return
  if (e.code === EVENT_CODE.esc) {
    e.stopPropagation()
    const topModal = modalStack[modalStack.length - 1]
    topModal.handleClose()
  }
}

export default (instance: ModalInstance, visibleRef: Ref<boolean>): void => {
  watch(
    () => visibleRef.value,
    val => {
      if (val) {
        modalStack.push(instance)
      } else {
        const index = modalStack.findIndex(modal => modal === instance)
        // 未入栈时 index 为 -1，直接 splice(-1, 1) 会误删栈顶的另一个弹层
        if (index === -1) return
        modalStack.splice(index, 1)
      }
    }
  )
}

if (!isServer) {
  on(document, 'keydown', closeModal)
}
