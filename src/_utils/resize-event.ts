import ResizeObserver from 'resize-observer-polyfill'
import isServer from './isServer'

export type ResizeListener = () => void

/** 存放监听器与 observer 实例的宿主元素 */
interface ResizableElement extends HTMLElement {
  __resizeListeners__?: ResizeListener[]
  __ro__?: ResizeObserver
}

/* istanbul ignore next */
const resizeHandler = function (entries: ResizeObserverEntry[]): void {
  for (const entry of entries) {
    const listeners = (entry.target as ResizableElement).__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach(fn => {
        fn()
      })
    }
  }
}

/* istanbul ignore next */
export const addResizeListener = function (element: Element | null | undefined, fn: ResizeListener): void {
  if (isServer || !element) return
  const target = element as ResizableElement
  if (!target.__resizeListeners__) {
    target.__resizeListeners__ = []
    target.__ro__ = new ResizeObserver(resizeHandler)
    target.__ro__.observe(element)
  }
  target.__resizeListeners__.push(fn)
}

/* istanbul ignore next */
export const removeResizeListener = function (element: Element | null | undefined, fn: ResizeListener): void {
  if (!element) return
  const target = element as ResizableElement
  if (!target.__resizeListeners__) return
  const index = target.__resizeListeners__.indexOf(fn)
  // indexOf 未命中时为 -1，直接 splice(-1, 1) 会误删最后一个无关监听器
  if (index === -1) return
  target.__resizeListeners__.splice(index, 1)
  if (!target.__resizeListeners__.length) {
    target.__ro__?.disconnect()
    // 必须一并清掉标记：addResizeListener 以 __resizeListeners__ 是否存在
    // 判断要不要重建 observer，只 disconnect 会让后续注册永久失效。
    delete target.__resizeListeners__
    delete target.__ro__
  }
}
