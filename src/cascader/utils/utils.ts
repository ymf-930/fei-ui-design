import type Node from './node'

export const isLeaf = (el: HTMLElement): boolean => !el.getAttribute('aria-owns')

export const getSibling = (el: HTMLElement, distance: number): HTMLElement | null => {
  const { parentNode } = el

  if (!parentNode) return null

  const siblings = parentNode.querySelectorAll<HTMLElement>('.fei-cascader-node[tabindex="-1"]')
  const index = Array.prototype.indexOf.call(siblings, el)
  return siblings[index + distance] || null
}

export const getMenuIndex = (el: HTMLElement | null): number => {
  if (!el) return 0
  const pieces = el.id.split('-')
  return Number(pieces[pieces.length - 2])
}

export const focusNode = (el: HTMLElement | null): void => {
  if (!el) return
  el.focus()
  !isLeaf(el) && el.click()
}

export const checkNode = (el: HTMLElement | null): void => {
  if (!el) return

  const input = el.querySelector<HTMLInputElement>('input')
  if (input) {
    input.click()
  } else if (isLeaf(el)) {
    el.click()
  }
}

export const sortByOriginalOrder = (oldNodes: Node[], newNodes: Node[]): Node[] => {
  const newNodesCopy = newNodes.slice(0)
  const newIds = newNodesCopy.map(node => node.uid)
  const res = oldNodes.reduce<Node[]>((acc, item) => {
    const index = newIds.indexOf(item.uid)
    if (index > -1) {
      acc.push(item)
      newNodesCopy.splice(index, 1)
      newIds.splice(index, 1)
    }
    return acc
  }, [])

  res.push(...newNodesCopy)

  return res
}

export const PANEL_INJECTION_KEY = Symbol()
