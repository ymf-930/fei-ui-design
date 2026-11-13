import type { PropType } from 'vue'

export const optionsProps = {
  pageSizeOpts: Array as PropType<number[]>,
  showSizer: Boolean,
  showElevator: Boolean,
  current: Number,
  currentTo: Number,
  pageSize: Number,
  allPages: Number,
  isSmall: Boolean,
  placement: String,
  appendToBody: Boolean
}

export const pageProps = {
  current: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizeOpts: {
    type: Array as PropType<number[]>,
    default: () => {
      return [10, 20, 30, 40]
    }
  },
  placement: {
    validator: (value: string) => ['top', 'bottom'].includes(value),
    default: 'bottom'
  },
  appendToBody: { type: Boolean, default: true },
  size: {
    validator: (value: string) => ['', 'small'].includes(value)
  },
  simple: Boolean,
  showTotal: Boolean,
  showElevator: Boolean,
  showSizer: Boolean,
  className: String,
  styles: Object,
  prevText: {
    type: String,
    default: ''
  },
  nextText: {
    type: String,
    default: ''
  }
}
