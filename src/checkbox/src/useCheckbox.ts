import {
  ref,
  computed,
  inject,
  getCurrentInstance,
  watch,
  type Ref,
  type ComputedRef,
  type WritableComputedRef,
  type ExtractPropTypes
} from 'vue'
import { UPDATE_MODEL_EVENT } from '../../_utils/constants'
import { useForm } from '../../_hooks'
import { isBool } from '../../_utils/util-helper'
import { checkboxProps } from './types'

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

/** `CheckboxGroup` 注入上下文 */
export interface CheckboxGroupContext {
  name: string
  value?: Ref<any>
  modelValue?: Ref<any>
  disabled?: Ref<boolean>
  min?: Ref<number>
  max?: Ref<number>
  changeEvent?: (value: any) => void
}

export const useCheckboxGroup = () => {
  const { FForm, FFormItem, formEmit } = useForm()
  const checkboxGroup = inject<CheckboxGroupContext>('CheckboxGroup', {} as CheckboxGroupContext)
  const isGroup = computed(() => checkboxGroup && checkboxGroup?.name === 'FCheckboxGroup')
  return {
    isGroup,
    checkboxGroup,
    FForm,
    FFormItem,
    formEmit
  }
}

const useModel = (props: CheckboxProps) => {
  let selfModel: any = false
  const { emit } = getCurrentInstance()!
  const { isGroup, checkboxGroup } = useCheckboxGroup()
  const isLimitExceeded = ref(false)
  const store = computed(() => (checkboxGroup ? checkboxGroup.modelValue?.value : props.modelValue))
  const model = computed<any>({
    get() {
      return isGroup.value ? store.value : props.modelValue ?? selfModel
    },

    set(val) {
      if (isGroup.value && Array.isArray(val)) {
        isLimitExceeded.value = checkboxGroup.min !== undefined && val.length < checkboxGroup.min.value
        isLimitExceeded.value = checkboxGroup.max !== undefined && val.length > checkboxGroup.max.value

        isLimitExceeded.value === false && checkboxGroup?.changeEvent?.(val)
      } else {
        emit(UPDATE_MODEL_EVENT, val)
        selfModel = val
      }
    }
  })

  return {
    model,
    isLimitExceeded
  }
}

const useCheckboxStatus = (props: CheckboxProps, { model }: { model: WritableComputedRef<any> }) => {
  const focus = ref(false)

  const isChecked = computed<boolean>(() => {
    const value = model.value
    if (isBool(value)) {
      return value
    } else if (Array.isArray(value)) {
      return value.includes(props.label)
    } else if (value !== null && value !== undefined) {
      return value === props.trueLabel
    }
    return value
  })

  return {
    isChecked,
    focus
  }
}

const useDisabled = (
  props: CheckboxProps,
  { model, isChecked }: { model: WritableComputedRef<any>; isChecked: ComputedRef<boolean> }
) => {
  const { isGroup, checkboxGroup, FForm } = useCheckboxGroup()
  const isLimitDisabled = computed(() => {
    const max = checkboxGroup.max?.value
    const min = checkboxGroup.min?.value
    return (
      (!!(max || min) && model.value.length >= max && !isChecked.value) ||
      (model.value.length <= min && isChecked.value)
    )
  })
  const isDisabled = computed(() => {
    const disabled = props.disabled || FForm.disabled
    return isGroup.value
      ? checkboxGroup.disabled?.value || disabled || isLimitDisabled.value
      : props.disabled || FForm.disabled
  })

  return {
    isDisabled,
    isLimitDisabled
  }
}

const setStoreValue = (props: CheckboxProps, { model }: { model: WritableComputedRef<any> }) => {
  function addToStore() {
    if (Array.isArray(model.value) && !model.value.includes(props.label)) {
      model.value.push(props.label)
    } else {
      model.value = props.trueLabel || true
    }
  }

  props.checked && addToStore()
}

const useEvent = (props: CheckboxProps, { isLimitExceeded }: { isLimitExceeded: Ref<boolean> }) => {
  const { formEmit } = useCheckboxGroup()
  const { emit } = getCurrentInstance()!

  function handleChange(e: Event): void {
    if (isLimitExceeded.value) return
    const target = e.target as HTMLInputElement
    const value = target.checked ? props.trueLabel ?? true : props.falseLabel ?? false

    emit('change', value, e)
  }

  watch(
    () => props.modelValue,
    val => {
      formEmit('change', [val])
    }
  )

  return {
    handleChange
  }
}

export const useCheckbox = (props: CheckboxProps) => {
  const { model, isLimitExceeded } = useModel(props)
  const { focus, isChecked } = useCheckboxStatus(props, { model })
  const { isDisabled } = useDisabled(props, { model, isChecked })
  const { handleChange } = useEvent(props, { isLimitExceeded })

  setStoreValue(props, { model })

  return {
    isChecked,
    isDisabled,
    model,
    handleChange,
    focus
  }
}
