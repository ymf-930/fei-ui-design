import { inject, ref } from 'vue'
import { generateId } from '../../_utils/util-helper'
import { EVENT_CODE } from '../../_utils/aria'
import { on } from '../../_utils/dom'
import { dropdownContextKey, type DropdownContext } from './types'

export const useDropdown = () => {
  const bDropdown = inject(dropdownContextKey, {} as DropdownContext)

  return { bDropdown }
}

export const initDropdownDomEvent = (dropdownChildren: any, triggerElm: any, _instance: any) => {
  const menuItems = ref<HTMLElement[] | null>(null)
  const menuItemsArray = ref<HTMLElement[] | null>(null)
  const dropdownElm = ref<HTMLElement | null>(null)
  const listId = ref(`dropdown-menu-${generateId()}`)
  dropdownElm.value = dropdownChildren?.subTree.el ?? null

  function removeTabindex() {
    triggerElm.setAttribute('tabindex', '-1')
    menuItemsArray.value?.forEach(item => {
      item.setAttribute('tabindex', '-1')
    })
  }

  function resetTabindex(ele: HTMLElement | undefined) {
    removeTabindex()
    ele?.setAttribute('tabindex', '0')
  }

  function handleTriggerKeyDown(ev: KeyboardEvent) {
    const code = ev.code
    if ([EVENT_CODE.up, EVENT_CODE.down].includes(code)) {
      removeTabindex()
      resetTabindex(menuItems.value?.[0])
      menuItems.value?.[0].focus()
      ev.preventDefault()
      ev.stopPropagation()
    } else if (code === EVENT_CODE.enter) {
      _instance.handleClick()
    } else if ([EVENT_CODE.tab, EVENT_CODE.esc].includes(code)) {
      _instance.hide()
    }
  }

  function handleItemKeyDown(ev: KeyboardEvent) {
    const code = ev.code
    const target = ev.target as HTMLElement
    const currentIndex = menuItemsArray.value?.indexOf(target) ?? -1
    const max = (menuItemsArray.value?.length ?? 0) - 1
    let nextIndex
    if ([EVENT_CODE.up, EVENT_CODE.down].includes(code)) {
      if (code === EVENT_CODE.up) {
        nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0
      } else {
        nextIndex = currentIndex < max ? currentIndex + 1 : max
      }
      removeTabindex()
      resetTabindex(menuItems.value?.[nextIndex])
      menuItems.value?.[nextIndex].focus()
      ev.preventDefault()
      ev.stopPropagation()
    } else if (code === EVENT_CODE.enter) {
      triggerElmFocus()
      target.click()
      if (_instance.props.hideOnClick) {
        _instance.hide()
      }
    } else if ([EVENT_CODE.tab, EVENT_CODE.esc].includes(code)) {
      _instance.hide()
      triggerElmFocus()
    }
  }

  function initAria() {
    dropdownElm.value?.setAttribute('id', listId.value)
    triggerElm.setAttribute('aria-haspopup', 'list')
    triggerElm.setAttribute('aria-controls', listId.value)
  }

  function initEvent() {
    on(triggerElm, 'keydown', handleTriggerKeyDown)
    dropdownElm.value && on(dropdownElm.value, 'keydown', handleItemKeyDown)
  }

  function initDomOperation() {
    const items = Array.from(dropdownElm.value?.querySelectorAll<HTMLElement>("[tabindex='-1']") || [])
    menuItems.value = items
    menuItemsArray.value = items.slice()

    initEvent()
    initAria()
  }

  function triggerElmFocus() {
    triggerElm.focus()
  }

  initDomOperation()
}
