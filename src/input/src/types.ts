import type { PropType } from 'vue'

/** FInput 组件对外暴露的 Props 类型（与下方 inputProps 运行时声明保持一一对应） */
export interface InputProps {
  /** 原生 input 类型 */
  type?: 'text' | 'textarea' | 'password' | 'url' | 'email' | 'date' | 'number' | 'tel'
  /** 双向绑定的值 */
  modelValue?: string | number | boolean
  /** 尺寸 */
  size?: 'small' | 'large' | 'default' | 'mini' | ''
  /** 占位文本 */
  placeholder?: string
  /** 最大输入长度 */
  maxlength?: number
  /** 是否禁用 */
  disabled?: boolean
  /** 是否展示密码可见性切换按钮 */
  showPasswordToggle?: boolean
  /** 后缀图标名 */
  icon?: string
  /** textarea 自适应高度配置 */
  autosize?: { minRows?: number; maxRows?: number }
  /** textarea 行数 */
  rows?: number
  /** 是否只读 */
  readonly?: boolean
  /** 原生 name */
  name?: string
  /** 是否作为数字输入（保留原生 number 属性） */
  number?: boolean
  /** 是否自动聚焦 */
  autofocus?: boolean
  /** 自动完成 */
  autocomplete?: 'on' | 'off'
  /** 是否可清空 */
  clearable?: boolean
  /** 原生 id */
  elementId?: string
  /** textarea 换行模式 */
  wrap?: 'hard' | 'soft'
  /** 前缀图标名 */
  prefix?: string
  /** 后缀图标名 */
  suffix?: string
  /** 是否为搜索框 */
  search?: boolean
  /** 是否禁用 textarea 缩放 */
  noResize?: boolean
  /** 是否展示字数统计 */
  showWordCount?: boolean
  /** 是否触发表单校验 */
  validateEvent?: boolean
}

export const inputProps = {
  type: {
    type: String as PropType<InputProps['type']>,
    validator: (value: string) => {
      return ['text', 'textarea', 'password', 'url', 'email', 'date', 'number', 'tel'].includes(
        value
      )
    },
    default: 'text'
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  size: {
    type: String as PropType<InputProps['size']>,
    validator: (value: string) => ['small', 'large', 'default', 'mini', ''].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
  },
  maxlength: {
    type: Number
  },
  disabled: Boolean,
  showPasswordToggle: Boolean,
  icon: {
    type: String,
    default: ''
  },
  autosize: {
    type: Object as PropType<InputProps['autosize']>,
    default: () => {
      return {}
    }
  },
  rows: {
    type: Number,
    default: 2
  },
  readonly: Boolean,
  name: String,
  number: Boolean,
  autofocus: Boolean,
  autocomplete: {
    type: String as PropType<InputProps['autocomplete']>,
    validator: (value: string) => {
      return ['on', 'off'].includes(value)
    },
    default: 'off'
  },
  clearable: Boolean,
  elementId: String,
  wrap: {
    type: String as PropType<InputProps['wrap']>,
    validator: (value: string) => {
      return ['hard', 'soft'].includes(value)
    },
    default: 'soft'
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  search: Boolean,
  noResize: Boolean,
  showWordCount: Boolean,
  validateEvent: {
    type: Boolean,
    default: true
  }
}
