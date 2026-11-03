import type { Ref } from 'vue'

/** 可调用 focus 的组件实例或元素 */
interface FocusableInstance {
  focus?: () => void
}

export default (el: Ref<FocusableInstance | null | undefined>) => {
  return {
    focus: () => {
      el.value?.focus?.()
    }
  }
}
