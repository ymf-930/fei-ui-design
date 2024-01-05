<template>
  <f-form ref="form" :model="formObj" inline class="demo-form-inline">
    <f-form-item label="姓名">
      <f-input v-model="formObj.name" placeholder="输入姓名"></f-input>
    </f-form-item>
    <f-form-item label="户籍地">
      <f-select v-model="formObj.region" placeholder="请选择户籍地">
        <f-option label="上海" value="shanghai"></f-option>
        <f-option label="北京" value="beijing"></f-option>
        <f-option label="南京" value="nanjing"></f-option>
        <f-option label="徐州" value="xuzhou"></f-option>
      </f-select>
    </f-form-item>
    <f-form-item>
      <f-button type="primary" @click="onSubmit">提交</f-button>
    </f-form-item>
  </f-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formObj = ref({
  name: '',
  region: ''
})

function onSubmit() {
  console.log('submit!', formObj.value)
}
</script>
