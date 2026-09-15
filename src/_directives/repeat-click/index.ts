import type { DirectiveBinding } from 'vue'
import { on, once } from '../../_utils/dom'

export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    let interval: ReturnType<typeof setInterval> | null = null
    let startTime = 0
    const handler = () => binding?.value()
    const clear = () => {
      if (Date.now() - startTime < 100) {
        handler()
      }
      if (interval !== null) {
        clearInterval(interval)
      }
      interval = null
    }

    on(el, 'mousedown', (e: MouseEvent) => {
      if (e.button !== 0) return
      startTime = Date.now()
      once(document, 'mouseup', clear)
      if (interval !== null) {
        clearInterval(interval)
      }
      interval = setInterval(handler, 100)
    })
  }
}
