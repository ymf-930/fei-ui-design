<template>
  <div style="width: 500px">
    <f-form :model="formObj">
      <f-form-item>
        <f-input v-model="formObj.username" placeholder="输入用户名"></f-input>
      </f-form-item>
      <f-form-item>
        <f-input v-model="formObj.password" placeholder="输入用户名" type="password"></f-input>
      </f-form-item>
      <f-form-item>
        <f-button type="primary" style="width: 100%">登录</f-button>
      </f-form-item>
    </f-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formObj = ref({
  username: '',
  password: ''
})
</script>
