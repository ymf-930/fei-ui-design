<template>
  <div class="fei-form-item" :class="formItemClass">
    <LabelWrap
      :is-auto-width="labelStyle.width === 'auto'"
      :update-all="FForm.labelWidth === 'auto'"
    >
      <label
        v-if="label || $slots.label"
        :for="labelFor"
        class="fei-form-item__label"
        :style="labelStyle"
      >
        <slot name="label">{{ label }}</slot>
        <span v-if="label || $slots.label" class="item-suffix">
          {{ FForm.labelSuffix }}
        </span>
      </label>
    </LabelWrap>
    <div class="fei-form-item__content" :style="contentStyle">
      <slot></slot>
      <transition name="zoom-in-top">
        <slot v-if="shouldShowError" name="error" :error="validateMessage">
          <div
            class="fei-form-item__error"
            :class="{
              'fei-form-item__error--inline':
                typeof inlineMessage === 'boolean' ? inlineMessage : FForm.inlineMessage || false
            }"
          >
            {{ validateMessage }}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  provide,
  inject,
  ref,
  watch,
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  toRefs,
  reactive,
  defineComponent
} from 'vue'
import AsyncValidator from 'async-validator'
import LabelWrap from './label-wrap'
import { getPropByPath } from '../../_utils/util-helper'
import mitt from 'mitt'
import { FormKey, FormItemKey, FormEvents } from './token'
import { formItemProps } from './types'

export default defineComponent({
  name: 'FFormItem',
  componentName: 'FFormItem',
  components: { LabelWrap },
  props: formItemProps,
  setup(props, { slots }) {
    const formItemMitt = mitt()

    const FForm = inject(FormKey, {})
    const validateState = ref('')
    const validateMessage = ref('')
    const validateDisabled = ref(false)

    const computedLabelWidth = ref('')

    const vm = getCurrentInstance()
    const isNested = computed(() => {
      //@ts-ignore
      let parent = vm.parent
      while (parent && parent.type.name !== 'FForm') {
        if (parent.type.name === 'FFormItem') {
          return true
        }
        parent = parent.parent
      }
      return false
    })

    let initialValue = undefined

    watch(
      () => props.error,
      val => {
        //@ts-ignore
        validateMessage.value = val
        validateState.value = val ? 'error' : ''
      },
      {
        immediate: true
      }
    )
    watch(
      () => props.validateStatus,
      val => {
        //@ts-ignore
        validateState.value = val
      }
    )

    const labelFor = computed(() => props.for || props.prop)
    const labelStyle = computed(() => {
      //@ts-ignore
      if (FForm.labelPosition === 'top') return {}
      //@ts-ignore
      const labelWidth = props.labelWidth || FForm.labelWidth
      if (labelWidth) {
        return {
          width: labelWidth
        }
      }
      return {}
    })
    const contentStyle = computed(() => {
      //@ts-ignore
      if (FForm.labelPosition === 'top' || FForm.inline) {
        return {}
      }
      if (!props.label && !props.labelWidth && isNested.value) {
        return {}
      }
      //@ts-ignore
      const labelWidth = props.labelWidth || FForm.labelWidth
      const ret = {}
      if (labelWidth === 'auto') {
        if (props.labelWidth === 'auto') {
          //@ts-ignore
          ret.width = `calc(100% - ${computedLabelWidth.value})`
          //@ts-ignore
        } else if (FForm.labelWidth === 'auto') {
          //@ts-ignore
          ret.width = `calc(100% - ${FForm.autoLabelWidth})`
        }
      } else {
        //@ts-ignore
        ret.width = `calc(100% - ${labelWidth})`
        //@ts-ignore
        if (!(props.label || slots.label)) ret.paddingLeft = labelWidth
      }
      return ret
    })
    const fieldValue = computed(() => {
      //@ts-ignore
      const model = FForm.model
      if (!model || !props.prop) {
        return
      }

      let path = props.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      return getPropByPath(model, path, true).v
    })
    const isRequired = computed(() => {
      let rules = getRules()
      let required = false

      if (rules && rules.length) {
        rules.every(rule => {
          //@ts-ignore
          if (rule.required) {
            required = true
            return false
          }
          return true
        })
      }
      return required
    })
    //@ts-ignore
    const FFormItemSize = computed(() => props.size || FForm.size)
    const sizeClass = computed(() => {
      return FFormItemSize.value
    })

    const validate = (trigger, callback = () => {}) => {
      validateDisabled.value = false
      const rules = getFilteredRule(trigger)
      if ((!rules || rules.length === 0) && props.required === undefined) {
        callback()
        return
      }
      validateState.value = 'validating'
      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger
        })
      }
      //@ts-ignore
      descriptor[props.prop] = rules
      const validator = new AsyncValidator(descriptor)
      const model = {}
      //@ts-ignore
      model[props.prop] = fieldValue.value
      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        validateState.value = !errors ? 'success' : 'error'
        //@ts-ignore
        validateMessage.value = errors ? errors[0].message : ''

        //@ts-ignore
        callback(validateMessage.value, invalidFields)
        //@ts-ignore
        FForm.emit?.('validate', props.prop, !errors, validateMessage.value || null)
      })
    }

    const clearValidate = () => {
      validateState.value = ''
      validateMessage.value = ''
      validateDisabled.value = false
    }
    const resetField = () => {
      validateState.value = ''
      validateMessage.value = ''
      //@ts-ignore
      let model = FForm.model
      let value = fieldValue.value
      let path = props.prop
      //@ts-ignore
      if (path.indexOf(':') !== -1) {
        //@ts-ignore
        path = path.replace(/:/, '.')
      }
      let prop = getPropByPath(model, path, true)
      validateDisabled.value = true
      if (Array.isArray(value)) {
        //@ts-ignore
        prop.o[prop.k] = [].concat(initialValue)
      } else {
        prop.o[prop.k] = initialValue
      }
      // reset validateDisabled after onFieldChange triggered
      nextTick(() => {
        validateDisabled.value = false
      })
    }

    const getRules = () => {
      //@ts-ignore
      const formRules = FForm.rules
      const selfRules = props.rules
      const requiredRule = props.required !== undefined ? { required: !!props.required } : []

      const prop = getPropByPath(formRules, props.prop || '', false)
      const normalizedRule = formRules ? prop.o[props.prop || ''] || prop.v : []

      //@ts-ignore
      return [].concat(selfRules || normalizedRule || []).concat(requiredRule)
    }
    const getFilteredRule = trigger => {
      const rules = getRules()

      return (
        rules
          .filter(rule => {
            //@ts-ignore
            if (!rule.trigger || trigger === '') return true
            //@ts-ignore
            if (Array.isArray(rule.trigger)) {
              //@ts-ignore
              return rule.trigger.indexOf(trigger) > -1
            } else {
              //@ts-ignore
              return rule.trigger === trigger
            }
          })
          //@ts-ignore
          .map(rule => ({ ...rule }))
      )
    }

    const onFieldBlur = () => {
      //@ts-ignore
      validate('blur')
    }

    const onFieldChange = () => {
      if (validateDisabled.value) {
        validateDisabled.value = false
        return
      }

      //@ts-ignore
      validate('change')
    }
    const updateComputedLabelWidth = width => {
      computedLabelWidth.value = width ? `${width}px` : ''
    }

    const addValidateEvents = () => {
      const rules = getRules()

      if (rules.length || props.required !== undefined) {
        formItemMitt.on(FormEvents.blur, onFieldBlur)
        formItemMitt.on(FormEvents.change, onFieldChange)
      }
    }
    const removeValidateEvents = () => {
      formItemMitt.off(FormEvents.blur, onFieldBlur)
      formItemMitt.off(FormEvents.change, onFieldChange)
    }

    const FFormItem = reactive({
      ...toRefs(props),
      size: sizeClass,
      validateState,
      removeValidateEvents,
      addValidateEvents,
      resetField,
      clearValidate,
      validate,
      formItemMitt,
      updateComputedLabelWidth
    })

    onMounted(() => {
      if (props.prop) {
        //@ts-ignore
        FForm.formMitt?.emit(FormEvents.addField, FFormItem)

        let value = fieldValue.value
        initialValue = Array.isArray(value) ? [...value] : value

        addValidateEvents()
      }
    })
    onBeforeUnmount(() => {
      //@ts-ignore
      FForm.formMitt?.emit(FormEvents.removeField, FFormItem)
    })

    provide(FormItemKey, FFormItem)

    const formItemClass = computed(() => [
      {
        //@ts-ignore
        'fei-form-item--feedback': FForm.statusIcon,
        'is-error': validateState.value === 'error',
        'is-validating': validateState.value === 'validating',
        'is-success': validateState.value === 'success',
        'is-required': isRequired.value || props.required,
        //@ts-ignore
        'is-no-asterisk': FForm.hideRequiredAsterisk
      },
      sizeClass.value ? 'fei-form-item--' + sizeClass.value : ''
    ])

    const shouldShowError = computed(() => {
      //@ts-ignore
      return validateState.value === 'error' && props.showMessage && FForm.showMessage
    })

    return {
      formItemClass,
      shouldShowError,
      FForm,
      labelStyle,
      contentStyle,
      validateMessage,
      labelFor,
      resetField,
      clearValidate
    }
  }
})
</script>
