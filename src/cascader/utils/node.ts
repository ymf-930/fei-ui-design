import { capitalize, isUndefined, isEmpty, isFunction } from '../../_utils/util-helper'

export interface CascaderNodeData {
  value?: any
  label?: any
  children?: CascaderNodeData[]
  leaf?: boolean
  disabled?: boolean
  [key: string]: any
}

export interface CascaderConfig {
  expandTrigger: string
  multiple: boolean
  checkStrictly: boolean
  emitPath: boolean
  lazy: boolean
  lazyLoad: (node: Node | null, resolve: (data: CascaderNodeData[]) => void) => void
  value: string
  label: string
  children: string
  leaf: string | ((data: CascaderNodeData, node: Node) => boolean)
  disabled: string | ((data: CascaderNodeData, node: Node) => boolean)
  hoverThreshold: number
}

type NodeHandlerName = 'onParentCheck' | 'onChildCheck' | 'onParentExpand' | 'onChildExpand'
type NodeHandler = ((...handlerArgs: any[]) => void) | undefined

const getNodeHandler = (node: Node, handlerName: NodeHandlerName): NodeHandler => {
  return (node as unknown as Record<NodeHandlerName, NodeHandler>)[handlerName]
}

let uid = 0

const calculatePathNodes = (node: Node): Node[] => {
  const nodes: Node[] = [node]
  let { parent } = node

  while (parent) {
    nodes.unshift(parent)
    parent = parent.parent
  }

  return nodes
}

export default class Node {
  uid: number
  data: CascaderNodeData
  config: CascaderConfig
  parent: Node | null
  root: boolean
  checked: boolean
  indeterminate: boolean
  loading: boolean
  text: string
  level: number
  value: any
  label: any
  pathNodes: Node[]
  pathValues: any[]
  pathLabels: any[]
  childrenData: CascaderNodeData[] | undefined
  children: Node[]
  loaded: boolean

  constructor(data: CascaderNodeData, config: CascaderConfig, parent: Node | null = null, root = false) {
    this.uid = uid++
    this.data = data
    this.config = config
    this.parent = parent
    this.root = root
    this.checked = false
    this.indeterminate = false
    this.loading = false
    this.text = ''
    const { value: valueKey, label: labelKey, children: childrenKey } = config

    const childrenData = data[childrenKey]
    const pathNodes = calculatePathNodes(this)

    this.level = root ? 0 : parent ? parent.level + 1 : 1
    this.value = data[valueKey]
    this.label = data[labelKey]
    this.pathNodes = pathNodes
    this.pathValues = pathNodes.map(node => node.value)
    this.pathLabels = pathNodes.map(node => node.label)
    this.childrenData = childrenData
    this.children = (childrenData || []).map((child: CascaderNodeData) => new Node(child, config, this))
    this.loaded = !config.lazy || this.isLeaf || !isEmpty(childrenData)
  }

  get isDisabled(): boolean {
    const { data, parent, config } = this
    const { disabled, checkStrictly } = config
    const isDisabled = isFunction(disabled) ? disabled(data, this) : !!data[disabled]
    return isDisabled || (!checkStrictly && !!parent?.isDisabled)
  }

  get isLeaf(): boolean {
    const { data, config, childrenData, loaded } = this
    const { lazy, leaf } = config
    const isLeaf = isFunction(leaf) ? leaf(data, this) : data[leaf]

    return isUndefined(isLeaf) ? (lazy && !loaded ? false : !Array.isArray(childrenData)) : !!isLeaf
  }

  get valueByOption(): any {
    return this.config.emitPath ? this.pathValues : this.value
  }

  appendChild(childData: CascaderNodeData): Node {
    const { childrenData, children } = this
    const node = new Node(childData, this.config, this)

    if (Array.isArray(childrenData)) {
      childrenData.push(childData)
    } else {
      this.childrenData = [childData]
    }

    children.push(node)

    return node
  }

  calcText(allLevels: boolean, separator: string): string {
    const text = allLevels ? this.pathLabels.join(separator) : this.label
    this.text = text
    return text
  }

  broadcast(event: string, ...args: any[]): void {
    const handlerName = `onParent${capitalize(event)}` as NodeHandlerName
    this.children.forEach(child => {
      if (child) {
        // bottom up
        child.broadcast(event, ...args)
        const handler = getNodeHandler(child, handlerName)
        handler && handler(...args)
      }
    })
  }

  emit(event: string, ...args: any[]): void {
    const { parent } = this
    const handlerName = `onChild${capitalize(event)}` as NodeHandlerName
    if (parent) {
      const handler = getNodeHandler(parent, handlerName)
      handler && handler(...args)
      parent.emit(event, ...args)
    }
  }

  onParentCheck(checked: boolean): void {
    if (!this.isDisabled) {
      this.setCheckState(checked)
    }
  }

  onChildCheck(): void {
    const { children } = this
    const validChildren = children.filter(child => !child.isDisabled)
    const checked = validChildren.length ? validChildren.every(child => child.checked) : false

    this.setCheckState(checked)
  }

  setCheckState(checked: boolean): void {
    const totalNum = this.children.length
    const checkedNum = this.children.reduce((c, p) => {
      const num = p.checked ? 1 : p.indeterminate ? 0.5 : 0
      return c + num
    }, 0)

    this.checked = this.loaded && this.children.every(child => child.loaded && child.checked) && checked
    this.indeterminate = this.loaded && checkedNum !== totalNum && checkedNum > 0
  }

  doCheck(checked: boolean): void {
    if (this.checked === checked) return

    const { checkStrictly, multiple } = this.config

    if (checkStrictly || !multiple) {
      this.checked = checked
    } else {
      // bottom up to unify the calculation of the indeterminate state
      this.broadcast('check', checked)
      this.setCheckState(checked)
      this.emit('check')
    }
  }
}
