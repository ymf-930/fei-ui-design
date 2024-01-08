<template>
  <div style="border-bottom: 1px solid #e9e9e9; padding-bottom: 6px; margin-bottom: 6px">
    <f-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
      全选
    </f-checkbox>
    <span style="color: #ff4511; margin: 5px 0">{{ checkAllGroup }} - {{ checkAll }}</span>
  </div>
  <f-checkbox-group v-model="checkAllGroup" @change="checkAllGroupChange">
    <f-checkbox label="香蕉"></f-checkbox>
    <f-checkbox label="苹果"></f-checkbox>
    <f-checkbox label="西瓜"></f-checkbox>
    <f-checkbox label="草莓"></f-checkbox>
  </f-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const all = ['香蕉', '西瓜', '苹果', '草莓']

const indeterminate = ref(false)
const checkAll = ref(false)
const checkAllGroup = ref(['香蕉', '西瓜'])

function handleCheckAll(val) {
  checkAllGroup.value = val ? all : []
  indeterminate.value = false
}

function checkAllGroupChange(value) {
  if (value.length === all.length) {
    indeterminate.value = false
    checkAll.value = true
  } else if (value.length > 0) {
    indeterminate.value = true
    checkAll.value = false
  } else {
    indeterminate.value = false
    checkAll.value = false
  }
}
</script>
