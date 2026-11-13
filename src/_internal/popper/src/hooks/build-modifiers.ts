import type { Modifier, Placement } from '@popperjs/core'

/** buildModifiers 所需的配置子集，由 usePopperOptions 组装后传入 */
export interface BuildModifierOptions {
  arrow?: HTMLElement | null
  arrowOffset?: number
  offset?: number
  gpuAcceleration?: boolean
  /** 预留字段：组装 options 时透传，当前 modifiers 未消费 */
  fallbackPlacements?: Placement[]
}

export default function buildModifier(
  props: BuildModifierOptions,
  externalModifiers: Partial<Modifier<string, any>>[] = []
): Partial<Modifier<string, any>>[] {
  const { arrow, arrowOffset, offset, gpuAcceleration } = props

  const modifiers: Partial<Modifier<string, any>>[] = [
    {
      name: 'offset',
      options: {
        offset: [0, offset ?? 12]
      }
    },
    {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: 'flip',
      options: {
        padding: 5
      }
    },
    {
      name: 'computeStyles',
      options: {
        gpuAcceleration,
        adaptive: gpuAcceleration
      }
    }
    // tippyModifier,
  ]

  if (arrow) {
    modifiers.push({
      name: 'arrow',
      options: {
        element: arrow,
        // the arrow size is an equailateral triangle with 10px side length, the 3rd side length ~ 14.1px
        // adding a offset to the ceil of 4.1 should be 4 this resolves the problem of arrow overflowing out of popper.
        padding: arrowOffset ?? 4
      }
    })
  }

  modifiers.push(...externalModifiers)
  return modifiers
}
