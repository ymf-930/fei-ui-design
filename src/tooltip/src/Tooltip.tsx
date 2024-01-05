import { defineComponent, h, ref, cloneVNode } from 'vue'
import { UPDATE_MODEL_EVENT } from '../../_utils/constants'
import { getFirstValidNode } from '../../_utils/vnode'
import { tooltipProps } from './types'
import { FPopper } from '../../_internal/popper'
import '../styles/index.css'

export default defineComponent({
  name: 'FTooltip',
  components: { FPopper },
  props: tooltipProps,
  emits: [UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    if (props.manual && typeof props.modelValue === 'undefined') {
      console.warn('[FTooltip] You need to pass a v-model to f-tooltip when `manual` is true')
    }
    const popper = ref(null)

    const onUpdateVisible = val => {
      ctx.emit(UPDATE_MODEL_EVENT, val)
    }

    const updatePopper = () => {
      return popper.value?.update()
    }

    return {
      popper,
      onUpdateVisible,
      updatePopper
    }
  },
  render() {
    const {
      $slots,
      content,
      manualMode,
      openDelay,
      onUpdateVisible,
      showArrow,
      showAfter,
      visible
    } = this

    const throwErrorTip = () =>
      console.warn('[FTooltip]  you need to provide a valid default slot.')

    return h(
      FPopper,
      {
        ...Object.keys(tooltipProps).reduce((result, key) => ({ ...result, [key]: this[key] }), {}),
        ref: 'popper',
        openDelay,
        manualMode,
        showAfter: openDelay || showAfter,
        showArrow,
        visible,
        'onUpdate:visible': onUpdateVisible
      },
      {
        default: () => ($slots.content ? $slots.content() : content),
        trigger: () => {
          if ($slots.default) {
            const firstVnode = getFirstValidNode($slots.default(), 1)
            if (!firstVnode) throwErrorTip()
            return cloneVNode(firstVnode, {}, true)
          }
          throwErrorTip()
        }
      }
    )
  }
})
