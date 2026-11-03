import { computed, inject, type ComponentInternalInstance, type ComputedRef } from 'vue'
import type { RootMenuContext } from './types'

export interface UseMenuReturn {
  parentMenu: ComputedRef<ComponentInternalInstance | null>
  paddingStyle: ComputedRef<Record<string, string>>
  indexPath: ComputedRef<Array<string | number | null>>
}

export default function useMenu(
  instance: ComponentInternalInstance,
  currentIndex: string | number | null
): UseMenuReturn {
  const rootMenu = inject('rootMenu') as RootMenuContext

  const indexPath = computed(() => {
    let parent: ComponentInternalInstance | null = instance.parent
    const path: Array<string | number | null> = [currentIndex]
    while (parent && parent.type.name !== 'FMenu') {
      if (parent.props.index) {
        path.unshift(parent.props.index as string | number)
      }
      parent = parent.parent
    }
    return path
  })

  const parentMenu = computed(() => {
    let parent: ComponentInternalInstance | null = instance.parent
    while (parent && ['FMenu', 'FSubmenu'].indexOf(parent.type.name as string) === -1) {
      parent = parent.parent
    }
    return parent
  })
  const paddingStyle = computed<Record<string, string>>(() => {
    let parent: ComponentInternalInstance | null = instance.parent
    if (rootMenu.props.mode !== 'vertical') return {}

    let padding = 20

    if (rootMenu.props.collapse) {
      padding = 20
    } else {
      while (parent && parent.type.name !== 'FMenu') {
        if (parent.type.name === 'FSubmenu') {
          padding += 20
        }
        parent = parent.parent
      }
    }
    return { paddingLeft: padding + 'px' }
  })
  return { parentMenu, paddingStyle, indexPath }
}
