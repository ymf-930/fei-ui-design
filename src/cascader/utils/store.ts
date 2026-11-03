import Node, { type CascaderConfig, type CascaderNodeData } from './node'
import { isEqual } from '../../_utils/util'

const flatNodes = (nodes: Node[], leafOnly: boolean): Node[] => {
  return nodes.reduce<Node[]>((res, node) => {
    if (node.isLeaf) {
      res.push(node)
    } else {
      !leafOnly && res.push(node)
      res = res.concat(flatNodes(node.children, leafOnly))
    }
    return res
  }, [])
}

export default class Store {
  config: CascaderConfig
  nodes: Node[]
  allNodes: Node[]
  leafNodes: Node[]

  constructor(data: CascaderNodeData[] | undefined, config: CascaderConfig) {
    this.config = config
    const nodes = (data || []).map(nodeData => new Node(nodeData, this.config))
    this.nodes = nodes
    this.allNodes = flatNodes(nodes, false)
    this.leafNodes = flatNodes(nodes, true)
  }

  getNodes(): Node[] {
    return this.nodes
  }

  getFlattedNodes(leafOnly: boolean): Node[] {
    return leafOnly ? this.leafNodes : this.allNodes
  }

  appendNode(nodeData: CascaderNodeData, parentNode?: Node | null): void {
    const node = parentNode ? parentNode.appendChild(nodeData) : new Node(nodeData, this.config)

    if (!parentNode) this.nodes.push(node)

    this.allNodes.push(node)
    node.isLeaf && this.leafNodes.push(node)
  }

  appendNodes(nodeDataList: CascaderNodeData[], parentNode?: Node | null): void {
    nodeDataList.forEach(nodeData => this.appendNode(nodeData, parentNode))
  }

  // when checkStrictly, leaf node first
  getNodeByValue(value: any, leafOnly = false): Node | null {
    if (!value && value !== 0) return null

    const nodes = this.getFlattedNodes(leafOnly).filter(
      node => isEqual(node.value, value) || isEqual(node.pathValues, value)
    )

    return nodes[0] || null
  }

  getSameNode(node: Node | null): Node | null {
    if (!node) return null

    const nodes = this.getFlattedNodes(false).filter(
      ({ value, level }) => isEqual(node.value, value) && node.level === level
    )

    return nodes[0] || null
  }
}
