export default {
  name: 'FTableExpand',
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render: ctx => {
    const params: { row: any; index: any; column?: any } = {
      row: ctx.row,
      index: ctx.index
    }
    if (ctx.column) params.column = ctx.column
    return ctx.render(params)
  }
}
