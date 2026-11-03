import { isRef, watch, type Ref } from 'vue'

/**
 * This method provides dialogable components the ability to restore previously activated element before
 * the dialog gets opened
 */
export default (toggle: Ref<unknown>, initialFocus: Ref<HTMLElement | null> | null = null) => {
  let previousActive: HTMLElement | null = null
  watch(
    () => toggle.value,
    val => {
      if (val) {
        previousActive = document.activeElement as HTMLElement
        if (initialFocus && isRef(initialFocus)) {
          initialFocus.value?.focus?.()
        }
      } else {
        if (process.env.NODE_ENV === 'testing') {
          previousActive?.focus.call(previousActive)
        } else {
          previousActive?.focus()
        }
      }
    }
  )
}
