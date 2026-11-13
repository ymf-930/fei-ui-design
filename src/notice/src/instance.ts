import { shallowReactive, createVNode, isVNode, nextTick, render } from 'vue'
import type { VNode } from 'vue'
import { NoticeContext, NoticeProps, CreateNoticeProps } from './types'
import NoticeConstructor from './Notice.vue'
import { transferIncrease } from '../../_utils/config'
import isServer from '../../_utils/isServer'

const notifications: NoticeContext[] = shallowReactive([])
let seed = 1

export function close(id: string, userOnClose?: (vm: VNode) => void) {
  const idx = notifications.findIndex(({ vm }) => {
    const _id = vm.component?.props?.id
    return id === _id
  })
  if (idx === -1) {
    return
  }

  const { vm, $el } = notifications[idx]
  if (!vm) return
  userOnClose?.(vm)

  const removedHeight = (vm.el as HTMLElement | null)?.offsetHeight ?? 0
  render(null, $el)
  nextTick(() => {
    document.body.removeChild($el)
  })
  notifications.splice(idx, 1)
  const len = notifications.length
  if (len < 1) return
  const position = vm.props?.position
  for (let i = idx; i < len; i++) {
    const itemVm = notifications[i].vm
    if (itemVm.component?.props?.position === position) {
      const verticalPos = String(position).split('-')[0]
      const el = itemVm.el as HTMLElement | null
      const style = el?.style as unknown as Record<string, string> | undefined
      const pos = parseInt(style?.[verticalPos] ?? '0', 10) - removedHeight - 16
      if (itemVm.component?.props) {
        itemVm.component.props.offset = pos
      }
      if (style) {
        style[verticalPos] = String(pos)
      }
    }
  }
}

export function closeAll() {
  for (let i = notifications.length - 1; i >= 0; i--) {
    const onClose = notifications[i].vm.component?.props?.onClose as (() => void) | undefined
    onClose?.()
  }
}

const Notice = (options: CreateNoticeProps) => {
  if (isServer) return
  const position = options.position || 'top-right'
  const userOptions = options as Partial<NoticeProps>

  let verticalOffset = options.offset || 0
  notifications
    .filter(({ vm }) => vm.component?.props?.position === position)
    .forEach(({ vm }) => {
      verticalOffset += ((vm.el as HTMLElement | null)?.offsetHeight || 0) + 16
    })
  verticalOffset += 16

  const id = 'notification_' + seed++
  const userOnClose = userOptions.onClose
  const handleClose = () => {
    close(id, userOnClose)
  }
  const noticeProps: NoticeProps = {
    offset: verticalOffset,
    id,
    useHTML: false,
    duration: 4.5,
    position: 'top-right',
    showClose: true,
    zIndex: transferIncrease(),
    ...userOptions,
    onClose: handleClose
  }

  const container = document.createElement('div')

  container.className = `container_${id}`
  container.style.zIndex = String()

  const message = noticeProps.message
  const vm = createVNode(
    NoticeConstructor,
    noticeProps as any,
    isVNode(noticeProps.message) ? { default: () => message } : null
  )
  render(vm, container)
  notifications.push({ vm, $el: container })
  document.body.appendChild(container)

  return {
    close: handleClose
  }
}

// 扩展类型调用
function typeExtend(type: NonNullable<NoticeProps['type']>, opts: CreateNoticeProps | string) {
  if (typeof opts === 'string') {
    opts = {
      message: opts,
      type
    } as CreateNoticeProps
  } else {
    opts.type = type
  }
  return Notice(opts as CreateNoticeProps)
}

Notice.info = (options: CreateNoticeProps | string) => typeExtend('info', options)
Notice.success = (options: CreateNoticeProps | string) => typeExtend('success', options)
Notice.warning = (options: CreateNoticeProps | string) => typeExtend('warning', options)
Notice.error = (options: CreateNoticeProps | string) => typeExtend('error', options)

Notice.closeAll = closeAll

export default Notice
