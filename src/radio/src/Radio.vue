<template>
  <label
    v-if="isBtnGroup"
    v-click-animation
    class="fei-radio"
    :class="{
      'is-disabled': isDisabled,
      'is-focus': focus,
      'is-checked': model === label
    }"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
  >
    <span
      class="fei-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="fei-radio__inner"></span>
      <input
        ref="radioRef"
        v-model="model"
        class="fei-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
      />
    </span>
    <span v-if="$slots.default || label" class="f-ui-designradio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
  <label
    v-else
    class="f-ui-designradio"
    :class="{
      'is-disabled': isDisabled,
      'is-focus': focus,
      'is-checked': model === label
    }"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
  >
    <span
      class="f-ui-designradio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="f-ui-designradio__inner"></span>
      <input
        ref="radioRef"
        v-model="model"
        class="f-ui-designradio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
      />
    </span>
    <span v-if="$slots.default || label" class="fei-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script setup lang="ts">
import '../styles/index.css'
import { computed, nextTick, ref } from 'vue'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../_utils/constants'
import { useRadio, useRadioAttrs } from './useRadio'
import type { RadioProps } from './types'

defineOptions({
  name: 'FRadio'
})

const emit = defineEmits([UPDATE_MODEL_EVENT, CHANGE_EVENT])
const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: '',
  label: '',
  name: ''
})

const { isGroup, isBtnGroup, radioGroup, FForm, focus } = useRadio()
const radioRef = ref<HTMLInputElement | null>(null)

const model = computed({
  get() {
    return isGroup.value ? radioGroup.modelValue : props.modelValue
  },
  set(val) {
    if (isGroup.value) {
      radioGroup.changeEvent(val)
    } else {
      emit(UPDATE_MODEL_EVENT, val)
    }
    if (radioRef.value) {
      radioRef.value.checked = props.modelValue === props.label
    }
  }
})

const { tabIndex, isDisabled } = useRadioAttrs(props, {
  isGroup,
  radioGroup,
  FForm,
  model
})

function handleChange() {
  nextTick(() => {
    emit(CHANGE_EVENT, model.value)
  })
}
</script>
