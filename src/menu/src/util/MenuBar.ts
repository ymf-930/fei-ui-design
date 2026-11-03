import MenuItem from './MenuItem'

class Menu {
  domNode: HTMLElement

  constructor(domNode: HTMLElement) {
    this.domNode = domNode
    this.init()
  }

  init(): void {
    const menuChildren = this.domNode.childNodes
    ;[].filter
      .call(menuChildren, (child: ChildNode) => child.nodeType === 1)
      .forEach((child: HTMLElement) => {
        new MenuItem(child)
      })
  }
}

export default Menu
