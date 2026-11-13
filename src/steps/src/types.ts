export const stepsProps = {
  current: {
    type: Number,
    default: 0
  },
  status: {
    validator: (value: string) => ['wait', 'process', 'finish', 'error', 'success'].includes(value),
    default: 'process'
  },
  size: {
    validator: (value: string) => ['small'].includes(value)
  },
  direction: {
    validator: (value: string) => ['horizontal', 'vertical'].includes(value),
    default: 'horizontal'
  }
}

export const stepProps = {
  status: {
    validator: (value: string) => ['wait', 'process', 'finish', 'error', 'success'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  content: String,
  icon: String
}
