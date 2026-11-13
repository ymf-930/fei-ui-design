import isServer from '../../_utils/isServer'
import { on, off } from '../../_utils/dom'

let isDragging = false

interface DragOptions {
  drag?: (event: any) => void
  start?: (event: any) => void
  end?: (event: any) => void
}

export default function (element: any, options: DragOptions) {
  if (isServer) return

  const moveFn = function (event: any) {
    options.drag?.(event)
  }
  const upFn = function (event: any) {
    off(document, 'mousemove', moveFn)
    off(document, 'mouseup', upFn)
    document.onselectstart = null
    document.ondragstart = null

    isDragging = false

    options.end?.(event)
  }

  on(element, 'mousedown', function (event: any) {
    if (isDragging) return
    document.onselectstart = () => false
    document.ondragstart = () => false
    on(document, 'mousemove', moveFn)
    on(document, 'mouseup', upFn)

    isDragging = true

    options.start?.(event)
  })
}
