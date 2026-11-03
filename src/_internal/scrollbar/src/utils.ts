export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
} as const

/** 某个滚动方向对应的属性映射（保留字面量类型，便于动态取值） */
export type BarMapItem = (typeof BAR_MAP)[keyof typeof BAR_MAP]

export function renderThumbStyle({
  move,
  size,
  bar
}: {
  move: number
  size: string
  bar: BarMapItem
}): Record<string, string> {
  const style: Record<string, string> = {}
  const translate = `translate${bar.axis}(${move}%)`

  style[bar.size] = size
  style.transform = translate
  style.msTransform = translate
  style.webkitTransform = translate

  return style
}

// 数组转换成对象
export function toObject(arr: any[]): Record<string, any> {
  const res: Record<string, any> = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

function extend(to: Record<string, any>, _from: Record<string, any>): Record<string, any> {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
