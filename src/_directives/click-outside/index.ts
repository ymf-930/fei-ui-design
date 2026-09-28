import type { DirectiveBinding } from 'vue'
import { on } from '../../_utils/dom'
import isServer from '../../_utils/isServer'

interface DocumentHandler {
  documentHandler: (mouseup: MouseEvent, mousedown: MouseEvent) => void
  bindingFn: (...args: any[]) => any
}

const nodeList = new Map<HTMLElement, DocumentHandler[]>()

let startClick: MouseEvent

if (!isServer) {
  on(document, 'mousedown', (e: MouseEvent) => (startClick = e))
  on(document, 'mouseup', (e: MouseEvent) => {
    for (const handlers of nodeList.values()) {
      for (const { documentHandler } of handlers) {
        documentHandler(e, startClick)
      }
    }
  })
}

function createDocumentHandler(el: HTMLElement, binding: DirectiveBinding) {
  let excludes: any[] = []
  if (Array.isArray(binding.arg)) {
    excludes = binding.arg
  } else {
    // due to current implementation on binding type is wrong the type casting is necessary here
    excludes.push(binding.arg)
  }

  return function (mouseup: MouseEvent, mousedown: MouseEvent) {
    if (!mouseup || !mousedown) return
    const popperRef = (binding.instance as any).popperRef
    const mouseUpTarget = mouseup.target as Node | null
    const mouseDownTarget = mousedown.target as Node | null
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    const isBound = !binding || !binding.instance
    const isTargetExists = !mouseUpTarget || !mouseDownTarget
    const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget)
    const isSelf = el === mouseUpTarget

    const isTargetExcluded =
      (excludes.length && excludes.some(item => item?.contains(mouseUpTarget))) ||
      (excludes.length && excludes.includes(mouseDownTarget))
    const isContainedByPopper =
      popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget))

    if (
      isBound ||
      isTargetExists ||
      isContainedByEl ||
      isSelf ||
      isTargetExcluded ||
      isContainedByPopper
    ) {
      return
    }
    binding.value(mouseup, mousedown)
  }
}

export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    // there could be multiple handlers on the element
    if (!nodeList.has(el)) {
      nodeList.set(el, [])
    }
    nodeList.get(el)!.push({
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    })
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, [])
    }
    const handlers = nodeList.get(el)!
    const oldHandlerIndex = handlers.findIndex(item => item.bindingFn === binding.oldValue)
    const newHandler = {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    }

    if (oldHandlerIndex >= 0) {
      // replace the old handler to the new handler
      handlers.splice(oldHandlerIndex, 1, newHandler)
    } else {
      handlers.push(newHandler)
    }
  },
  unmounted(el: HTMLElement) {
    // remove all listeners when a component unmounted
    nodeList.delete(el)
  }
}
