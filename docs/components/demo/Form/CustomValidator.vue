<template>
  <div style="width: 500px">
    <f-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <f-form-item label="密码" prop="pass">
        <f-input v-model="ruleForm.pass" type="password" autocomplete="off"></f-input>
      </f-form-item>
      <f-form-item label="确认密码" prop="checkPass">
        <f-input v-model="ruleForm.checkPass" type="password" autocomplete="off"></f-input>
      </f-form-item>
      <f-form-item label="年龄" prop="age">
        <f-input v-model.number="ruleForm.age" type="number"></f-input>
      </f-form-item>
      <f-form-item>
        <f-button type="primary" @click="submitForm">提交</f-button>
        <f-button @click="resetForm">重置</f-button>
      </f-form-item>
    </f-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkAge = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('年龄不能为空'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (value < 18) {
        callback(new Error('必须年满18岁'))
      } else {
        callback()
      }
    }
  }, 1000)
}
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.value.checkPass !== '') {
      ruleFormRef.value?.validateField('checkPass')
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.value.pass) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const ruleFormRef = ref(null)

const rules = ref({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }]
})

const ruleForm = ref({
  pass: '',
  checkPass: '',
  age: ''
})

function submitForm() {
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
function resetForm() {
  ruleFormRef.value?.resetFields()
}
</script>
