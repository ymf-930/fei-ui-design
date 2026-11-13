import { shallowReactive, createVNode, nextTick, render, isVNode } from 'vue'
import type { VNode } from 'vue'
import { MessageContext, MessageProps, CreateMessageProps } from './types'
import MessageConstructor from './Message.vue'
import { transferIncrease } from '../../_utils/config'
import isServer from '../../_utils/isServer'

const instances: MessageContext[] = shallowReactive([])
let seed = 1

function close(id: string, userOnClose?: (vm: VNode) => void) {
  const idx = instances.findIndex(({ vm }) => vm.component?.props?.id === id)
  if (idx === -1) return
  const { vm, $el } = instances[idx]
  if (!vm) return
  userOnClose?.(vm)
  const removedHeight = (vm.el as HTMLElement | null)?.offsetHeight ?? 0
  render(null, $el)
  nextTick(() => {
    document.body.removeChild($el)
  })
  instances.splice(idx, 1)
  // adjust other instances vertical offset
  const len = instances.length
  if (len < 1) return
  for (let i = idx; i < len; i++) {
    const el = instances[i].vm.el as HTMLElement | null
    const pos = parseInt(el?.style.top ?? '0', 10) - removedHeight - 16
    const componentProps = instances[i].vm.component?.props
    if (componentProps) {
      componentProps.offset = pos
      componentProps.vertOffset = pos
    }
  }
}

function closeAll() {
  // 手动调用删除，其实就是手动的调整组件中 visible 的值
  // close 是通过 expose 传出来的
  instances.forEach(instance => {
    instance.vm.component?.exposed?.close()
  })
}

const Message = (opts: CreateMessageProps | string) => {
  if (isServer) return
  const userOptions = (typeof opts === 'string' ? { message: opts } : opts) as Partial<MessageProps>

  let verticalOffset = userOptions.offset || 20
  instances.forEach(({ vm }) => {
    verticalOffset += ((vm.el as HTMLElement | null)?.offsetHeight || 42) + 16
  })
  verticalOffset += 16

  const id = `message_${seed++}`
  const userOnClose = userOptions.onClose

  const options: MessageProps = {
    id,
    offset: verticalOffset,
    zIndex: transferIncrease(),
    ...userOptions,
    onClose: () => {
      close(id, userOnClose)
    }
  }

  const container = document.createElement('div')

  container.className = `container_${id}`

  const message = options.message

  const vm = createVNode(
    MessageConstructor,
    options as any,
    isVNode(options.message) ? { default: () => message } : null
  )
  render(vm, container)
  instances.push({ vm, $el: container })
  document.body.appendChild(container)
  return {
    close: options.onClose
  }
}

// 扩展类型调用
function typeExtend(type: NonNullable<MessageProps['type']>, opts: CreateMessageProps | string) {
  if (typeof opts === 'string') {
    opts = {
      message: opts,
      type
    } as CreateMessageProps
  } else {
    opts.type = type
  }

  return Message(opts)
}

Message.info = (options: CreateMessageProps | string) => typeExtend('info', options)
Message.success = (options: CreateMessageProps | string) => typeExtend('success', options)
Message.warning = (options: CreateMessageProps | string) => typeExtend('warning', options)
Message.error = (options: CreateMessageProps | string) => typeExtend('error', options)

Message.closeAll = closeAll

export default Message
