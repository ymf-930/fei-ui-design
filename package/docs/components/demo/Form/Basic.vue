<template>
  <div style="width: 500px">
    <f-form ref="form" :model="formObj" label-width="100px">
      <f-form-item label="姓名">
        <f-input v-model="formObj.name" placeholder="输入姓名"></f-input>
      </f-form-item>
      <f-form-item label="年龄">
        <f-input-number v-model="formObj.age"></f-input-number>
      </f-form-item>
      <f-form-item label="户籍地">
        <f-select v-model="formObj.region" placeholder="请选择户籍地">
          <b-option label="上海" value="shanghai"></b-option>
          <b-option label="北京" value="beijing"></b-option>
          <b-option label="南京" value="nanjing"></b-option>
          <b-option label="徐州" value="xuzhou"></b-option>
        </f-select>
      </f-form-item>
      <f-form-item label="学历">
        <f-radio-group v-model="formObj.edu">
          <f-radio label="高中"></f-radio>
          <f-radio label="大专"></f-radio>
          <f-radio label="本科"></f-radio>
          <f-radio label="硕士"></f-radio>
        </f-radio-group>
      </f-form-item>
      <f-form-item label="爱好">
        <f-checkbox-group v-model="formObj.hobby">
          <f-checkbox label="打游戏" name="hobby"></f-checkbox>
          <f-checkbox label="看电影" name="hobby"></f-checkbox>
          <f-checkbox label="打篮球/运动" name="hobby"></f-checkbox>
          <f-checkbox label="看书" name="hobby"></f-checkbox>
        </f-checkbox-group>
      </f-form-item>
      <f-form-item label="住址">
        <f-input v-model="formObj.address" type="textarea" placeholder="请输入住址..."></f-input>
      </f-form-item>
      <f-form-item>
        <f-button type="primary" @click="onSubmit">提交</f-button>
        <f-button>取消</f-button>
      </f-form-item>
    </f-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formObj = ref({
  name: '',
  age: null,
  region: '',
  city: '',
  edu: '',
  hobby: [],
  address: ''
})

function onSubmit() {
  console.log('submit!', formObj.value)
}
</script>
