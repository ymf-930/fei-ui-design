import { cloneVNode, type VNode } from 'vue'
import { getFirstValidNode } from '../../../../_utils/vnode'

export default function renderTrigger(trigger: any, extraProps: any): VNode {
  const firstElement = getFirstValidNode(trigger, 1)
  if (!firstElement) {
    console.warn('trigger expects single rooted node')
  }
  // getFirstValidNode 的返回可能为空，此处维持既有行为（空值交由 cloneVNode 处理）
  return cloneVNode(firstElement as VNode, extraProps, true)
}
