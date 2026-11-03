import { FormItemKey, FormKey, FormEvents } from '../_utils/form-token'
import { inject, computed, type ComputedRef } from 'vue'

export const VALIDATE_STATE_MAP: Record<string, string> = {
  validating: 'f-icon-loading icon-is-rotating',
  success: 'f-icon-check-circle',
  error: 'f-icon-close-circle'
}

/**
 * 表单上下文：`Form` 通过 `FormKey` 注入的内容。
 * 字段随组件演进增删，未显式声明的成员按动态属性处理。
 */
export interface FormContext {
  disabled?: boolean
  statusIcon?: boolean
  hideRequiredAsterisk?: boolean
  [key: string]: any
}

/** 表单项上下文：`FormItem` 通过 `FormItemKey` 注入的内容。 */
export interface FormItemContext {
  validateState?: string
  formItemMitt?: { emit: (event: string, ...args: any[]) => void }
  [key: string]: any
}

export interface UseFormReturn {
  FForm: FormContext
  FFormItem: FormItemContext
  validateState: ComputedRef<string>
  validateIcon: ComputedRef<string>
  formEmit: (type: string, value?: unknown) => void
}

export default function useForm(): UseFormReturn {
  const FForm = inject(FormKey, {} as FormContext)
  const FFormItem = inject(FormItemKey, {} as FormItemContext)

  const validateState = computed<string>(() => FFormItem.validateState || '')

  const validateIcon = computed<string>(() => VALIDATE_STATE_MAP[validateState.value])

  // blur, change,value
  function formEmit(type: string, value?: unknown): void {
    FFormItem.formItemMitt?.emit(FormEvents[type as keyof typeof FormEvents], value)
  }

  return {
    FForm,
    FFormItem,
    validateState,
    validateIcon,
    formEmit
  }
}
