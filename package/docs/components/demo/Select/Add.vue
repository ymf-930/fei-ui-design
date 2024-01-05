<template>
  <f-row :gutter="20">
    <f-col :span="8">
      <f-select
        v-model="selected"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请选择城市"
      >
        <f-option
          v-for="item in cityList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></f-option>
      </f-select>
    </f-col>
    <f-col :span="16">
      <div style="height: 32px; line-height: 32px">{{ selected }}</div>
    </f-col>
  </f-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected = ref([])
const cityList = [
  { value: 'beijing', label: '北京' },
  { value: 'nanjing', label: '南京' },
  { value: 'shanghai', label: '上海' },
  { value: 'xuzhou', label: '徐州' },
  { value: 'guangzhou', label: '广州' },
  { value: 'shenzhen', label: '深圳' }
]
</script>
