import { watch, getCurrentInstance, onUnmounted, ref, type Ref } from 'vue'

export function tryOnUnmounted(fn: () => void): void {
  getCurrentInstance() && onUnmounted(fn)
}

function isFunction(val: unknown): val is (...args: any[]) => any {
  return typeof val === 'function'
}

/** useTimeoutRef 返回的控制句柄 */
export interface TimeoutRefHandle {
  readyRef: Ref<boolean>
  stop: () => void
  start: () => void
}

export function useTimeoutFn(
  handle: () => void,
  wait: number,
  native = false
): TimeoutRefHandle {
  if (!isFunction(handle)) {
    throw new Error('handle is not Function!')
  }

  const { readyRef, stop, start } = useTimeoutRef(wait)
  if (native) {
    handle()
  } else {
    watch(
      readyRef,
      maturity => {
        maturity && handle()
      },
      { immediate: false }
    )
  }
  return { readyRef, stop, start }
}

export function useTimeoutRef(wait: number): TimeoutRefHandle {
  const readyRef = ref(false)

  let timer: ReturnType<typeof setTimeout> | null = null

  function stop(): void {
    readyRef.value = false
    timer && window.clearTimeout(timer)
  }

  function start(): void {
    stop()
    timer = setTimeout(() => {
      readyRef.value = true
    }, wait)
  }

  start()

  tryOnUnmounted(stop)

  return { readyRef, stop, start }
}
