import { inject } from 'vue'
import type { TableContext } from '../types'

export default {
  name: 'FTableSlot',
  functional: true,
  props: {
    row: Object,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const tableRoot = inject<TableContext>('FTable', {} as TableContext)
    const render = tableRoot.slots[props.column.slot]
    if (!render) {
      throw Error('columns slot should be write <template> in table slots')
    }
    return () =>
      render({
        row: props.row,
        column: props.column,
        index: props.index
      })
  }
}
