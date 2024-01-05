<template>
  <label
    :id="id"
    class="fei-checkbox"
    :class="[{ 'is-disabled': isDisabled }, { 'is-checked': isChecked }]"
    :aria-controls="indeterminate ? controls : null"
  >
    <span
      class="fei-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? 'checkbox' : false"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span class="fei-checkbox__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        v-model="model"
        :checked="isChecked"
        class="fei-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
      <input
        v-else
        v-model="model"
        class="fei-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span v-if="$slots.default || label" class="fei-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts">
import '../styles/index.css'
import { checkboxProps } from './types'
import { UPDATE_MODEL_EVENT } from '../../_utils/constants'
import { useCheckbox } from './useCheckbox'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FCheckbox',
  props: checkboxProps,
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props) {
    return useCheckbox(props)
  }
})
</script>
