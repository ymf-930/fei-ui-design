let supportsPassive = false
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true
    }
  })
  const noop = () => {}
  window.addEventListener('testPassive', noop, opts)
  window.removeEventListener('testPassive', noop, opts)
  // eslint-disable-next-line no-empty
} catch {}

type Listener = (...args: any[]) => void

export function addEventListenerWrap(
  target: EventTarget | null,
  eventType: string,
  cb: Listener | null,
  option?: boolean | AddEventListenerOptions
) {
  if (target?.addEventListener) {
    let opt = option
    if (
      opt === undefined &&
      supportsPassive &&
      (eventType === 'touchstart' || eventType === 'touchmove' || eventType === 'wheel')
    ) {
      opt = { passive: false }
    }
    target.addEventListener(eventType, cb, opt)
  }
  return {
    remove: () => {
      if (target?.removeEventListener) {
        target.removeEventListener(eventType, cb)
      }
    }
  }
}
