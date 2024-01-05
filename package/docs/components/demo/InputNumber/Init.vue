<template>
  <div>
    <f-row :gutter="16">
      <f-col span="6">
        <f-input-number v-model="obj.num1"></f-input-number>
        初始化值为null(绑定属性存在）
      </f-col>
      <f-col span="6">
        <f-input-number v-model="obj.num2" :min="1" :max="10"></f-input-number>
        初始化值为字符串
      </f-col>
      <f-col span="6">
        <f-input-number v-model="obj.num3"></f-input-number>
        初始化值为undefined(绑定属性不存在）
      </f-col>
    </f-row>
    <p>{{ obj }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const obj = ref({ num1: null, num2: '0', num3: undefined })
</script>
