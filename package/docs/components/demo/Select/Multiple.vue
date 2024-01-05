<template>
  <div>
    <f-select v-model="select" style="width: 300px" multiple>
      <f-option
        v-for="item in cityList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></f-option>
    </f-select>
    <f-select v-model="select" style="width: 300px; margin-left: 20px" multiple collapse-tags>
      <f-option
        v-for="item in cityList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></f-option>
    </f-select>
    <span>{{ select }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const select = ref([])
const cityList = [
  { value: 'beijing', label: '北京' },
  { value: 'nanjing', label: '南京' },
  { value: 'shanghai', label: '上海' },
  { value: 'xuzhou', label: '徐州' },
  { value: 'guangzhou', label: '广州' },
  { value: 'shenzhen', label: '深圳' }
]
</script>
