/**
 * Table 通过 `FTable` 注入的上下文。
 * 表格内部实现会持续增删成员，未显式声明的部分按动态属性处理。
 */
export interface TableContext {
  props?: Record<string, any>
  slots?: Record<string, any>
  store?: Record<string, any>
  [key: string]: any
}

export const tableProps = {
  data: {
    type: Array,
    default() {
      return []
    }
  },
  columns: {
    type: Array,
    default() {
      return []
    }
  },
  size: {
    validator(value) {
      return ['small', 'large', 'default'].includes(value)
    },
    default: 'default'
  },
  width: {
    type: [Number, String]
  },
  height: {
    type: [Number, String]
  },
  maxHeight: {
    type: [Number, String]
  },
  stripe: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  highlightRow: {
    type: Boolean,
    default: false
  },
  rowClassName: {
    type: Function,
    default() {
      return ''
    }
  },
  context: {
    type: Object
  },
  noDataText: {
    type: String,
    default: '暂无数据'
  },
  disabledHover: {
    type: Boolean
  },
  loading: {
    type: Boolean,
    default: false
  },
  draggable: {
    type: Boolean,
    default: false
  },
  dragHandle: String,
  tooltipTheme: {
    type: String,
    validator(value) {
      return ['dark', 'light'].includes(value)
    }
  },
  rowKey: {
    type: Boolean,
    default: false
  },
  mergeMethod: {
    type: Function
  },
  loadingText: {
    type: String,
    default: '正在加载'
  }
}
