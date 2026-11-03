import { h, computed, ref, getCurrentInstance, onUnmounted, inject, defineComponent, type Ref } from 'vue'
import { on, off } from '../../../_utils/dom'
import { renderThumbStyle, BAR_MAP } from './utils'

/** 滚动容器元素：需按滚动方向动态读写 scrollTop / scrollLeft / offset 等属性 */
type ScrollElement = HTMLElement & Record<string, any>

export default defineComponent({
  name: 'FScrollbarBar',
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    move: {
      type: Number,
      default: 0
    },
    barStyle: {
      type: Object,
      default: () => ({})
    },
    barWrapStyle: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const instance = getCurrentInstance()
    const thumb = ref<ScrollElement | null>(null)
    const wrap = inject('scroll-bar-wrap', {} as Ref<ScrollElement | null>)
    const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])
    const barStore = ref<Record<string, number>>({})
    const cursorDown = ref<boolean | null>(null)

    /** 组件根元素（进入事件回调时组件必定已挂载） */
    const getRootEl = (): ScrollElement => instance?.vnode.el as ScrollElement

    const clickThumbHandler = (e: MouseEvent) => {
      // prevent click event of right button
      if (e.ctrlKey || e.button === 2) {
        return
      }
      startDrag(e)
      const currentTarget = e.currentTarget as ScrollElement
      barStore.value[bar.value.axis] =
        currentTarget[bar.value.offset] -
        (e[bar.value.client] - currentTarget.getBoundingClientRect()[bar.value.direction])
    }

    const clickTrackHandler = (e: MouseEvent) => {
      const offset = Math.abs(
        (e.target as Element).getBoundingClientRect()[bar.value.direction] - e[bar.value.client]
      )
      const thumbHalf = (thumb.value?.[bar.value.offset] ?? 0) / 2
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100) / getRootEl()[bar.value.offset]

      const wrapEl = wrap.value
      if (wrapEl) {
        wrapEl[bar.value.scroll] = (thumbPositionPercentage * wrapEl[bar.value.scrollSize]) / 100
      }
    }
    const startDrag = (e: MouseEvent) => {
      e.stopImmediatePropagation()
      cursorDown.value = true
      on(document, 'mousemove', mouseMoveDocumentHandler)
      on(document, 'mouseup', mouseUpDocumentHandler)
      document.onselectstart = () => false
    }

    const mouseMoveDocumentHandler = (e: MouseEvent) => {
      if (cursorDown.value === false) return
      const prevPage = barStore.value[bar.value.axis]

      if (!prevPage) return

      const offset =
        (getRootEl().getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1
      const thumbClickPosition = thumb.value?.[bar.value.offset] - prevPage
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100) / getRootEl()[bar.value.offset]

      const wrapEl = wrap.value
      if (wrapEl) {
        wrapEl[bar.value.scroll] = (thumbPositionPercentage * wrapEl[bar.value.scrollSize]) / 100
      }
    }

    function mouseUpDocumentHandler() {
      cursorDown.value = false
      barStore.value[bar.value.axis] = 0
      off(document, 'mousemove', mouseMoveDocumentHandler)
      document.onselectstart = null
    }

    onUnmounted(() => {
      off(document, 'mouseup', mouseUpDocumentHandler)
    })

    return () =>
      h(
        'div',
        {
          class: ['fei-scrollbar__bar', 'is-' + bar.value.key],
          style: props.barWrapStyle,
          onMousedown: clickTrackHandler
        },
        h('div', {
          ref: thumb,
          class: 'fei-scrollbar__thumb',
          onMousedown: clickThumbHandler,
          style: {
            ...renderThumbStyle({
              size: props.size,
              move: props.move,
              bar: bar.value
            }),
            ...props.barStyle
          }
        })
      )
  }
})
