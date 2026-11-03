import type { Ref } from 'vue'

/** 注册到菜单 / 子菜单中的条目（Menu 侧仅关心 index） */
export interface MenuItemRegister {
  index: string | number
  indexPath?: unknown
  active?: unknown
}

/** 根菜单对外暴露的方法集合 */
export interface RootMenuMethods {
  addMenuItem: (item: MenuItemRegister) => void
  removeMenuItem: (item: MenuItemRegister) => void
  addSubMenu: (item: MenuItemRegister) => void
  removeSubMenu: (item: MenuItemRegister) => void
  openMenu: (index: any, indexPath: any) => void
  closeMenu: (index: any) => void
}

/** `rootMenu` 注入上下文 */
export interface RootMenuContext {
  props: Record<string, any>
  openedMenus: Ref<(string | number)[]>
  items: Record<string, any>
  submenus: Record<string, any>
  hoverBackground: Ref<string>
  activeIndex: Ref<string>
  isMenuPopup: Ref<boolean>
  methods: RootMenuMethods
  rootMenuEmit: (event: string, ...args: any[]) => void
  rootMenuOn: (event: string, handler: (...args: any[]) => void) => void
}

/** `subMenu:<uid>` 注入上下文 */
export interface SubMenuContext {
  addSubMenu: (item: MenuItemRegister) => void
  removeSubMenu: (item: MenuItemRegister) => void
  handleMouseleave?: (deepDispatch?: boolean) => void
}

export const menuProps = {
  mode: {
    type: String,
    default: 'vertical'
  },
  defaultActive: {
    type: String,
    default: ''
  },
  defaultOpeneds: {
    type: Array,
    default: () => []
  },
  uniqueOpened: {
    type: Boolean,
    default: false
  },
  router: {
    type: Boolean,
    default: false
  },
  menuTrigger: {
    type: String,
    default: 'hover'
  },
  collapse: Boolean,
  backgroundColor: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: ''
  },
  activeTextColor: {
    type: String,
    default: ''
  }
}
