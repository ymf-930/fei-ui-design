import { computed, h, inject, defineComponent } from 'vue'
import type { DescProps } from './types'

export default defineComponent({
  name: 'FDescCell',
  props: {
    cell: {
      type: Object,
      default: () => ({})
    },
    tag: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const descriptions = inject<DescProps>('FDesc', {})
    // FDesc 的 column 默认值为 3，inject 缺省时沿用同一默认值
    const column = descriptions.column ?? 3

    const label = computed(() => props.cell?.children?.label?.() || props.cell?.props?.label)
    const content = computed(() => props.cell?.children?.default?.())
    const span = computed(() => props.cell?.props?.span || 1)
    const labelWidth = computed(() => descriptions.labelWidth || 50 / column)
    const contentWidth = computed(() => {
      const labelWidth = descriptions.labelWidth
      return labelWidth ? (100 - column * labelWidth) / column : 50 / column
    })

    return {
      descriptions,
      label,
      content,
      span,
      labelWidth,
      contentWidth,
      column
    }
  },
  render() {
    switch (this.type) {
      case 'label':
        return h(
          this.tag,
          {
            class: ['fei-desc__label', { 'is-bordered-label': this.descriptions.border }],
            style: { width: `${this.labelWidth}%` },
            colSpan: 1
          },
          this.label
        )
      case 'content':
        return h(
          this.tag,
          {
            class: 'fei-desc__content',
            style: { width: `${this.span * this.contentWidth}%` },
            colSpan: this.span * 2 - 1
          },
          this.content
        )
      default:
        return h(
          'td',
          {
            colSpan: this.span,
            style: { width: `${this.span * (100 / this.column)}%` }
          },
          [
            h('span', { class: 'fei-desc__label' }, this.label),
            h('span', { class: 'fei-desc__content' }, this.content)
          ]
        )
    }
  }
})
