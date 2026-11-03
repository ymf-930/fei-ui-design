import isServer from './isServer'

export default function scrollIntoView(
  container: Element,
  selected?: HTMLElement | null
): void {
  if (isServer) return

  if (!selected) {
    container.scrollTop = 0
    return
  }

  const offsetParents: HTMLElement[] = []
  // offsetParent 在 DOM 类型里声明为 Element，实际定位链上都是 HTMLElement
  let pointer = selected.offsetParent as HTMLElement | null
  while (pointer !== null && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer)
    pointer = pointer.offsetParent as HTMLElement | null
  }
  const top = selected.offsetTop + offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0)
  const bottom = top + selected.offsetHeight
  const viewRectTop = container.scrollTop
  const viewRectBottom = viewRectTop + container.clientHeight

  if (top < viewRectTop) {
    container.scrollTop = top
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight
  }
}
