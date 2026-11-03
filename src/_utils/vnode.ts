import {
  Fragment,
  Text,
  Comment,
  createBlock,
  openBlock,
  createCommentVNode,
  type VNode,
  type VNodeArrayChildren
} from 'vue'

const TEMPLATE = 'template'

export const PatchFlags = {
  TEXT: 1,
  CLASS: 2,
  STYLE: 4,
  PROPS: 8,
  FULL_PROPS: 16,
  HYDRATE_EVENTS: 32,
  STABLE_FRAGMENT: 64,
  KEYED_FRAGMENT: 128,
  UNKEYED_FRAGMENT: 256,
  NEED_PATCH: 512,
  DYNAMIC_SLOTS: 1024,
  HOISTED: -1,
  BAIL: -2
}

/** 可递归遍历的子节点形态（覆写 vnode 的 children / 插槽返回值） */
type VNodeChildrenInput = VNode | VNodeArrayChildren | string | number | null | undefined

export const isFragment = (node: VNode): boolean => node.type === Fragment

export const isText = (node: VNode): boolean => node.type === Text

export const isComment = (node: VNode): boolean => node.type === Comment

export const isTemplate = (node: VNode): boolean => node.type === TEMPLATE

/**
 * get a valid child node (not fragment nor comment)
 * @param node {VNode} node to be searched
 * @param depth {number} depth to be searched
 */
function getChildren(node: VNode, depth: number): VNode | undefined {
  if (isComment(node)) return
  if (isFragment(node) || isTemplate(node)) {
    return depth > 0
      ? getFirstValidNode(node.children as VNodeArrayChildren, depth - 1)
      : undefined
  }
  return node
}

/**
 * determine if the element is a valid element type rather than fragments and comment e.g. <template> v-if
 * @param node {VNode} node to be tested
 */
export const isValidElementNode = (node: VNode): boolean =>
  !(isFragment(node) || isComment(node))

export const getFirstValidNode = (
  nodes: VNodeChildrenInput,
  maxDepth = 3
): VNode | undefined => {
  if (Array.isArray(nodes)) {
    return getChildren(nodes[0] as VNode, maxDepth)
  }
  return getChildren(nodes as VNode, maxDepth)
}

export function renderIf(
  condition: unknown,
  node: any,
  props: any,
  children: any,
  patchFlag?: number,
  patchProps?: any
): VNode {
  return condition
    ? renderBlock(node, props, children, patchFlag, patchProps)
    : createCommentVNode('v-if', true)
}

export function renderBlock(
  node: any,
  props: any,
  children: any,
  patchFlag?: number,
  patchProps?: any
): VNode {
  return (openBlock(), createBlock(node, props, children, patchFlag, patchProps))
}
