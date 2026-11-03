/* eslint-disable @typescript-eslint/restrict-plus-operands */
import isServer from './isServer'

/** 通用 DOM 事件回调：事件类型交由调用方自行收窄，避免子类型逆变冲突 */
type DomEventHandler = (...args: any[]) => void

/** 同时提供内联样式的元素（HTMLElement / SVGElement 均满足） */
type StyledElement = Element & ElementCSSInlineStyle

/** 以任意字符串键读取样式键值的映射 */
type StyleMap = Record<string, string | undefined>

/** IE 的旧式事件绑定接口 */
interface LegacyEventTarget {
  attachEvent: (name: string, handler: DomEventHandler) => void
  detachEvent: (name: string, handler?: DomEventHandler) => void
}

/** 兼容旧浏览器的 requestAnimationFrame 声明 */
type WindowWithAnimationFrame = Window & {
  webkitRequestAnimationFrame?: (callback: FrameRequestCallback) => number
}

// 去除空格
const trim = function (str: string): string {
  return (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

// 监听事件
export const on = (function (): (
  element: EventTarget | null | undefined,
  event: string,
  handler: DomEventHandler
) => void {
  if (!isServer && typeof document.addEventListener === 'function') {
    return function (
      element: EventTarget | null | undefined,
      event: string,
      handler: DomEventHandler
    ) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (
      element: EventTarget | null | undefined,
      event: string,
      handler: DomEventHandler
    ) {
      if (element && event && handler) {
        ;(element as unknown as LegacyEventTarget).attachEvent('on' + event, handler)
      }
    }
  }
})()

// 移除事件
export const off = (function (): (
  element: EventTarget | null | undefined,
  event: string,
  handler?: DomEventHandler
) => void {
  if (!isServer && typeof document.removeEventListener === 'function') {
    return function (
      element: EventTarget | null | undefined,
      event: string,
      handler?: DomEventHandler
    ) {
      if (element && event) {
        // 回调缺省时按 DOM 规范传 null，表示移除该事件类型的全部监听
        element.removeEventListener(event, handler || null, false)
      }
    }
  } else {
    return function (
      element: EventTarget | null | undefined,
      event: string,
      handler?: DomEventHandler
    ) {
      if (element && event) {
        ;(element as unknown as LegacyEventTarget).detachEvent('on' + event, handler)
      }
    }
  }
})()

// 监听一次事件
export const once = function (
  el: EventTarget | null | undefined,
  event: string,
  fn: DomEventHandler
): void {
  const listener = function (this: unknown, ...args: any[]) {
    if (fn) {
      fn.apply(this, args)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

// 是否有class类名
export function hasClass(el: Element | null | undefined, cls: string | null | undefined): boolean {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').includes(' ' + cls + ' ')
  }
}

// 添加class
export function addClass(el: Element | null | undefined, cls: string | null | undefined): void {
  if (!el) return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

// 移除一个class样式
export function removeClass(el: Element | null | undefined, cls: string | null | undefined): void {
  if (!el || !cls) return
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

// getStyle
export function getStyle(
  element: StyledElement | null | undefined,
  styleName: string | null | undefined
): string | null {
  if (!element || !styleName) return null
  let styleKey = camelCase(styleName)
  if (styleKey === 'float') {
    styleKey = 'cssFloat'
  }
  try {
    const computed = document.defaultView?.getComputedStyle(element, '')
    // 调用方读取的都是渲染后的最终值（尺寸 / overflow / display），
    // 因此优先返回 computed，内联样式仅作兜底。
    // 注意不要写成 `element.style[styleName] || computed ? ...`：
    // `||` 优先级高于 `?:`，那样条件恒为 computed（真值），语义会被误读。
    return (
      (computed as unknown as StyleMap | undefined)?.[styleKey] ||
      (element.style as unknown as StyleMap)[styleKey] ||
      null
    )
  } catch (e) {
    return (element.style as unknown as StyleMap)[styleKey] || null
  }
}

// 获取浏览器滚动条宽度
// 缓存必须放在模块作用域：写在函数内部时每次调用都是 undefined，缓存永不命中，
// 每次都会真实创建 DOM 测量一遍。
let scrollBarWidth: number | undefined
export function getScrollBarWidth(): number {
  if (isServer) return 0
  if (scrollBarWidth !== undefined) return scrollBarWidth

  const outer = document.createElement('div')
  outer.className = 'fei-scrollbar__wrap'
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  outer.parentNode?.removeChild(outer)
  scrollBarWidth = widthNoScroll - widthWithScroll

  return scrollBarWidth
}

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g // eslint-disable-line
const MOZ_HACK_REGEXP = /^moz([A-Z])/ // eslint-disable-line

function camelCase(name: string): string {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (
      _match: string,
      separator: string,
      letter: string,
      offset: number
    ): string {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

// scrollTop animation
export function scrollTop(
  el: StyledElement | Window,
  from = 0,
  to: number,
  duration = 500,
  endCallback?: () => void
): void {
  if (typeof window.requestAnimationFrame !== 'function') {
    const animationFrame =
      (window as WindowWithAnimationFrame).webkitRequestAnimationFrame ||
      function (callback: FrameRequestCallback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    window.requestAnimationFrame = animationFrame
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil((difference / duration) * 50)

  function scroll(start: number, end: number, step: number): void {
    if (start === end) {
      endCallback?.()
      return
    }

    let d = start + step > end ? end : start + step
    if (start > end) {
      d = start - step < end ? end : start - step
    }

    if (el === window) {
      // 只滚动纵轴：scrollTo(d, d) 会把横向滚动位置也一并改掉
      window.scrollTo(0, d)
    } else {
      ;(el as StyledElement).scrollTop = d
    }
    window.requestAnimationFrame(() => {
      scroll(d, end, step)
    })
  }

  scroll(from, to, step)
}

// 首字母大写
export function firstUpperCase(str: string): string {
  return str.toString()[0].toUpperCase() + str.toString().slice(1)
}

// 是否有滚动条
export const isScroll = (
  el: StyledElement | null | undefined,
  isVertical?: boolean | null
): RegExpMatchArray | null | undefined => {
  if (isServer) return
  const determinedDirection = isVertical === null || isVertical === undefined
  const overflow = determinedDirection
    ? getStyle(el, 'overflow')
    : isVertical
    ? getStyle(el, 'overflow-y')
    : getStyle(el, 'overflow-x')

  return overflow?.match(/(scroll|auto)/)
}

// 获取滚动容器
export const getScrollContainer = (
  el: StyledElement | null | undefined,
  isVertical?: boolean | null
): StyledElement | Window | null | undefined => {
  if (isServer) return

  const scrollTargets: unknown[] = [window, document, document.documentElement]
  let parent: Node | null = el ?? null
  while (parent) {
    if (scrollTargets.includes(parent)) {
      return window
    }
    if (isScroll(parent as StyledElement, isVertical)) {
      return parent as StyledElement
    }
    parent = parent.parentNode
  }
  return parent as StyledElement | null
}

// 阻止冒泡
export const stop = (e: Event): void => e.stopPropagation()
