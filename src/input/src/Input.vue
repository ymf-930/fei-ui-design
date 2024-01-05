<template>
  <div :class="wrapClasses">
    <template v-if="type !== 'textarea'">
      <span v-if="$slots.prepend" class="fei-input-group-prepend">
        <slot name="prepend"></slot>
      </span>
      <input
        :id="elementId"
        ref="inputRef"
        :autocomplete="type === 'password' ? 'new-password' : autocomplete"
        :type="inputType"
        :class="inputClasses"
        :placeholder="placeholder"
        :disabled="inputDisabled"
        :maxlength="maxlength"
        :readonly="readonly"
        :name="name"
        :value="currentValue"
        :number="number"
        :autofocus="autofocus"
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="handleKeypress"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @change="handleChange"
      />
      <span v-if="showPrefix" class="fei-input-prefix">
        <slot name="prefix">
          <i v-if="prefix" class="f-iconfont" :class="['f-icon-' + prefix]"></i>
        </slot>
      </span>
      <span v-if="showSuffix" class="fei-input-suffix">
        <i
          v-if="icon"
          class="f-iconfont"
          :class="['f-icon-' + icon, 'f-ui-designinput-icon', 'f-ui-designinput-icon-normal']"
          @click="handleIconClick"
        ></i>
        <i
          v-if="search"
          class="f-iconfont f-icon-search"
          :class="['fei-input-icon', 'fei-input-icon-normal', 'fei-input-search-icon']"
          @click.stop="handleSearch"
        ></i>
        <i
          v-if="showPasswordToggle"
          class="f-iconfont fei-input-icon fei-input-icon-normal fei-input-view-icon"
          :class="showPassword ? 'f-icon-eye' : 'f-icon-eye-close'"
          @click.stop="handleTogglePass"
        ></i>
        <slot name="suffix">
          <i v-if="suffix" class="f-iconfont" :class="['f-icon-' + suffix]"></i>
        </slot>
        <i
          v-if="FForm.statusIcon && validateState"
          :class="['f-iconfont', 'fei-input__validateIcon', validateIcon]"
        ></i>
      </span>
      <span v-if="showWordCount" class="fei-input-word-count">{{ wordCount }}</span>
      <!--清空按钮-->
      <span v-if="clearable && currentValue && !disabled" :class="closeClasses">
        <i class="f-iconfont f-icon-close-circle-fill" @click.stop.prevent="handleClear"></i>
      </span>

      <span v-if="$slots.append" class="fei-input-group-append">
        <slot name="append"></slot>
      </span>
    </template>
    <template v-else>
      <textarea
        :id="elementId"
        ref="textareaRef"
        :wrap="wrap"
        :autocomplete="autocomplete"
        :class="textareaClasses"
        :style="textareaStyle"
        :placeholder="placeholder"
        :disabled="inputDisabled"
        :rows="rows"
        :maxlength="maxlength"
        :readonly="readonly"
        :name="name"
        :value="currentValue"
        :autofocus="autofocus"
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="handleKeypress"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
      ></textarea>
      <span v-if="showWordCount" class="fei-input-word-count">{{ wordCount }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import '../styles/index.css'
import { inputProps } from './types'
import calcTextareaHeight from './calcTextareaHeight'
import { computed, ref, watch, onMounted, reactive, toRefs, nextTick, defineComponent } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../_utils/constants'
import { useForm } from '../../_hooks'

const prefixCls = 'fei-input'

export default defineComponent({
  name: 'FInput',
  props: inputProps,
  emits: [
    UPDATE_MODEL_EVENT,
    CHANGE_EVENT,
    'enter',
    'search',
    'keydown',
    'keyup',
    'keypress',
    'click',
    'blur',
    'focus',
    'input',
    'clear'
  ],
  setup(props, ctx) {
    // data
    const data = reactive({
      currentValue: props.modelValue,
      textareaStyles: {},
      isOnComposition: false
    })
    const inputRef = ref(null)
    const textareaRef = ref(null)
    const showPassword = ref(false)

    const { FForm, FFormItem, validateState, validateIcon, formEmit } = useForm()
    // watch
    watch(
      () => props.modelValue,
      val => {
        setCurrentValue(val)
      }
    )
    // computed
    const wrapClasses = computed(() => {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-wrapper-${props.size}`]: !!props.size,
          [`${prefixCls}-type-${props.type}`]: props.type,
          [`${prefixCls}-group-with-prepend`]: ctx.slots.prepend,
          [`${prefixCls}-group-with-append`]: ctx.slots.append || props.search,
          [`${prefixCls}-hide-icon`]: ctx.slots.append, // #554
          [`${prefixCls}-with-search`]: props.search,
          [`${prefixCls}-with-word-count`]: props.showWordCount,
          [`is-disabled`]: inputDisabled.value
        }
      ]
    })
    const showPrefix = computed(() => props.prefix !== '' || ctx.slots.prefix !== undefined)
    const showSuffix = computed(() => {
      return (
        props.suffix !== '' ||
        props.icon !== '' ||
        props.search ||
        props.showPasswordToggle ||
        // @ts-ignore
        (FForm.statusIcon && validateState.value !== '') ||
        ctx.slots.suffix !== undefined
      )
    })
    // @ts-ignore
    const inputDisabled = computed(() => props.disabled || FForm.disabled)
    // @ts-ignore
    const inputSize = computed(() => props.size || FFormItem.size)
    const inputType = computed(() =>
      props.type !== 'password' ? props.type : `${showPassword.value ? 'text' : 'password'}`
    )
    const inputClasses = computed(() => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${inputSize.value}`]: !!inputSize.value,
          [`${prefixCls}-disabled`]: inputDisabled.value,
          [`${prefixCls}-with-prefix`]: showPrefix.value,
          [`${prefixCls}-with-suffix`]: showSuffix.value || props.search
        }
      ]
    })
    const closeClasses = computed(() => [prefixCls + '-icon', prefixCls + '-icon-clear'])
    const textareaStyle = computed(() => {
      return {
        resize: props.noResize ? 'none' : null,
        ...data.textareaStyles
      }
    })
    const textareaClasses = computed(() => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: props.disabled
        }
      ]
    })
    const wordCount = computed(() => {
      return data.currentValue.toString().length + (props.maxlength ? `/${props.maxlength}` : '')
    })

    // self methods
    const setCurrentValue = value => {
      if (value === data.currentValue) return
      nextTick(() => {
        resizeTextarea()
      })
      data.currentValue = value
      if (props.validateEvent) {
        formEmit('change', [value])
      }
    }
    const resizeTextarea = () => {
      const autosize = props.autosize
      if (!autosize || props.type !== 'textarea') {
        return false
      }

      const minRows = autosize.minRows || props.rows
      const maxRows = autosize.maxRows || props.rows

      data.textareaStyles = calcTextareaHeight(textareaRef.value, minRows, maxRows)
    }
    // handle methods
    const handleEnter = e => {
      ctx.emit('enter', e)
      if (props.search) ctx.emit('search', data.currentValue)
    }
    const handleKeydown = e => {
      ctx.emit('keydown', e)
    }
    const handleKeypress = e => {
      ctx.emit('keypress', e)
    }
    const handleKeyup = e => {
      ctx.emit('keyup', e)
    }
    const handleIconClick = e => {
      ctx.emit('click', e)
    }
    const handleFocus = e => {
      ctx.emit('focus', e)
    }
    const handleBlur = e => {
      ctx.emit('blur', e)
      if (props.validateEvent) {
        formEmit('blur', [props.modelValue])
      }
    }

    const handleComposition = e => {
      if (e.type === 'compositionstart') {
        data.isOnComposition = true
      }
      if (e.type === 'compositionend') {
        data.isOnComposition = false
        handleInput(e)
      }
    }
    const handleInput = e => {
      if (data.isOnComposition) return
      let value = e.target.value
      if (props.number && value !== '') value = Number.isNaN(Number(value)) ? value : Number(value)
      setCurrentValue(value)
      ctx.emit(UPDATE_MODEL_EVENT, value)
      ctx.emit('input', value)
    }
    const handleChange = e => {
      ctx.emit(CHANGE_EVENT, e.target.value)
    }
    const handleTogglePass = () => {
      showPassword.value = !showPassword.value
    }

    const handleClear = () => {
      setCurrentValue('')
      ctx.emit(UPDATE_MODEL_EVENT, '')
      ctx.emit(CHANGE_EVENT, '')
      ctx.emit('clear')
    }
    const handleSearch = () => {
      if (props.disabled) return false
      // @ts-ignore
      inputRef.value?.focus()
      ctx.emit('search', data.currentValue)
    }

    const focus = () => {
      if (props.type === 'textarea') {
        // @ts-ignore
        textareaRef.value?.focus()
      } else {
        // @ts-ignore
        inputRef.value?.focus()
      }
    }

    const blur = () => {
      if (props.type === 'textarea') {
        // @ts-ignore
        textareaRef.value?.blur()
      } else {
        // @ts-ignore
        inputRef.value?.blur()
      }
    }

    // mounted
    onMounted(() => {
      if (props.type === 'textarea') {
        resizeTextarea()
      }
    })
    return {
      inputRef,
      textareaRef,
      showPassword,
      ...toRefs(data),
      handleEnter,
      handleKeydown,
      handleKeypress,
      handleKeyup,
      handleIconClick,
      handleFocus,
      handleBlur,
      handleComposition,
      handleInput,
      handleChange,
      handleClear,
      handleSearch,
      handleTogglePass,
      focus,
      blur,
      FForm,
      FFormItem,
      validateState,
      validateIcon,
      formEmit,
      inputDisabled,
      inputSize,
      wrapClasses,
      showPrefix,
      showSuffix,
      inputClasses,
      closeClasses,
      inputType,
      textareaStyle,
      textareaClasses,
      wordCount
    }
  }
})
</script>
