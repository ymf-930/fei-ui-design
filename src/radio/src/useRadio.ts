import { ref, computed, inject } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import useForm from '../../_hooks/use-form'
import type { RadioGroupInject, RadioProps, ValueType } from './types'

export const useRadio = () => {
  const { FForm, FFormItem, formEmit } = useForm()
  const radioGroup = inject<RadioGroupInject>('RadioGroup', {} as RadioGroupInject)
  const focus = ref(false)
  const isGroup = computed(() => radioGroup?.name === 'FRadioGroup')
  const isBtnGroup = computed(() => isGroup.value && radioGroup?.type === 'button')

  return {
    isGroup,
    focus,
    radioGroup,
    isBtnGroup,
    FForm,
    FFormItem,
    formEmit
  }
}

interface RadioAttrsState {
  isGroup: ComputedRef<boolean>
  radioGroup: RadioGroupInject
  FForm: { disabled?: boolean }
  model: Ref<ValueType | undefined>
}

export const useRadioAttrs = (
  props: RadioProps,
  { isGroup, radioGroup, FForm, model }: RadioAttrsState
) => {
  const isDisabled = computed(() => {
    return isGroup.value
      ? radioGroup.disabled || props.disabled || FForm.disabled
      : props.disabled || FForm.disabled
  })

  const tabIndex = computed(() => {
    return isDisabled.value || (isGroup.value && model.value !== props.label) ? -1 : 0
  })

  return {
    isDisabled,
    tabIndex
  }
}
