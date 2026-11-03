import { createApp, type DirectiveBinding } from 'vue'
import { addClass, removeClass } from './dom'

const relativeCls = 'g-relative'

/** 挂载后需要使用 setTitle 与根元素定位的指令宿主组件 */
interface LoadingLikeInstance {
  $el: HTMLElement
  setTitle: (title: string) => void
}

/** 指令宿主元素：额外挂载组件实例，键为组件 name */
type LoadingHostElement = HTMLElement & Record<string, any>

export default function createLoadingLikeDirective(Comp: any) {
  return {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const host = el as LoadingHostElement
      const app = createApp(Comp)
      const instance = app.mount(document.createElement('div')) as unknown as LoadingLikeInstance
      const name = Comp.name
      if (!host[name]) {
        host[name] = {}
      }
      host[name].instance = instance
      const title = binding.arg
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }

      if (binding.value) {
        append(host)
      }
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
      const host = el as LoadingHostElement
      const title = binding.arg
      const name = Comp.name
      if (typeof title !== 'undefined') {
        host[name].instance.setTitle(title)
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(host) : remove(host)
      }
    }
  }

  function append(el: LoadingHostElement): void {
    const name = Comp.name
    const style = getComputedStyle(el)
    if (!['absolute', 'fixed', 'relative'].includes(style.position)) {
      addClass(el, relativeCls)
    }
    el.appendChild(el[name].instance.$el)
  }

  function remove(el: LoadingHostElement): void {
    const name = Comp.name
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
}
