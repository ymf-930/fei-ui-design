<template>
  <div style="width: 500px">
    <f-form ref="formRef" :model="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <f-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        :label="'域名' + index"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true,
          message: '域名不能为空',
          trigger: 'blur'
        }"
      >
        <div flex="box:last">
          <f-input v-model="domain.value"></f-input>
          <f-button @click="removeDomain(domain)">删除</f-button>
        </div>
      </f-form-item>
      <f-form-item>
        <f-button type="primary" @click="submitForm">提交</f-button>
        <f-button @click="addDomain">新增域名</f-button>
        <f-button @click="resetForm">重置</f-button>
      </f-form-item>
    </f-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dynamicValidateForm = ref({
  domains: [
    {
      value: ''
    }
  ]
})
const formRef = ref(null)

function submitForm() {
  formRef.value?.validate(valid => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
function resetForm() {
  formRef.value?.resetFields()
}
function removeDomain(item) {
  const index = dynamicValidateForm.value.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.value.domains.splice(index, 1)
  }
}
function addDomain() {
  dynamicValidateForm.value.domains.push({
    value: '',
    key: Date.now()
  })
}
</script>
