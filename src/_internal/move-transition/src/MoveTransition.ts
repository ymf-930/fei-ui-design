import { h, Transition, TransitionGroup, defineComponent } from 'vue'

export default defineComponent({
  name: 'FMoveTransition',
  props: {
    name: {
      type: String,
      default: 'fade-transverse'
    },
    group: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    return () => {
      const config = {
        name: props.name,
        appear: true,
        onBeforeLeave(el: Element) {
          // Vue 的 Transition 钩子参数类型为 Element，实际传入的是 HTMLElement
          const style = (el as HTMLElement).style
          style.position = 'absolute'
          style.top = '0'
          style.left = '0'
          style.width = '100%'
          style.height = '100%'
          style.overflow = 'hidden'
        },
        onAfterLeave(el: Element) {
          // 原写法 el.style = '' 实际等价于清空 cssText（DOM 类型中 style 只读）
          ;(el as HTMLElement).style.cssText = ''
        }
      }
      if (props.group) {
        return h(TransitionGroup, config, slots.default)
      }
      return h(Transition, config, slots.default)
    }
  }
})
