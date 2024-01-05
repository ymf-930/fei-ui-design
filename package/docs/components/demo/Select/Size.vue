<template>
  <f-row :gutter="20">
    <f-col :span="6">
      <f-select v-model="select" clearable size="large">
        <f-option
          v-for="item in cityList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></f-option>
      </f-select>
    </f-col>
    <f-col :span="6">
      <f-select v-model="select" clearable>
        <f-option
          v-for="item in cityList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></f-option>
      </f-select>
    </f-col>
    <f-col :span="6">
      <f-select v-model="select" clearable size="small">
        <f-option
          v-for="item in cityList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></f-option>
      </f-select>
    </f-col>
    <f-col :span="6">
      <f-select v-model="select" clearable size="mini">
        <f-option
          v-for="item in cityList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></f-option>
      </f-select>
    </f-col>
  </f-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const select = ref('')
const cityList = [
  { value: 'beijing', label: '北京' },
  { value: 'nanjing', label: '南京' },
  { value: 'shanghai', label: '上海' },
  { value: 'xuzhou', label: '徐州' },
  { value: 'guangzhou', label: '广州' },
  { value: 'shenzhen', label: '深圳' }
]
</script>
