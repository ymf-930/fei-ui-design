import { computed, type Ref } from 'vue'
import buildModifiers from './build-modifiers'
import type { PopperProps } from '../types'

export default function usePopperOptions(
  props: PopperProps,
  state: { arrow: Ref<HTMLElement | null> }
) {
  return computed(() => {
    return {
      placement: props.placement,
      ...props.popperOptions,
      // Avoiding overriding modifiers.
      modifiers: buildModifiers(
        {
          arrow: state.arrow.value,
          arrowOffset: props.arrowOffset,
          offset: props.offset,
          gpuAcceleration: props.gpuAcceleration,
          fallbackPlacements: props.fallbackPlacements
        },
        props.popperOptions?.modifiers
      )
    }
  })
}
