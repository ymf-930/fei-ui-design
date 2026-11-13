import type { PropType } from 'vue'

export const colorProps = {
  modelValue: String,
  showAlpha: Boolean,
  colorFormat: {
    type: String,
    default: 'hex'
  },
  disabled: Boolean,
  size: {
    type: String,
    validator: (val: string) => ['', 'large', 'default', 'small', 'mini'].includes(val)
  },
  popperClass: String,
  colors: Array as PropType<string[]>,
  showLabel: {
    type: Boolean,
    default: true
  }
}
