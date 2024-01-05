<template>
  <div>
    <f-select v-model="select" style="width: 200px" clearable placeholder="可清空">
      <f-option
        v-for="item in cityList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></f-option>
    </f-select>

    <f-select v-model="select" style="width: 200px; margin-left: 20px" placeholder="分组">
      <f-option-group label="直辖市">
        <f-option value="beijing" label="北京"></f-option>
        <f-option value="shanghai" label="上海"></f-option>
      </f-option-group>
      <f-option-group label="热门城市">
        <f-option value="xuzhou" label="徐州"></f-option>
        <f-option value="nanjing" label="南京"></f-option>
        <f-option value="suzhou" label="广州"></f-option>
        <f-option value="shenzhen" label="深圳"></f-option>
      </f-option-group>
    </f-select>

    <f-select v-model="select" style="width: 200px; margin-left: 20px" placeholder="自定义选项">
      <f-option value="beijing" label="北京">
        <span>北京</span>
        <span style="float: right; color: #ccc">beijing</span>
      </f-option>
      <f-option value="shanghai" label="上海">
        <span>上海</span>
        <span style="float: right; color: #ccc">shanghai</span>
      </f-option>
      <f-option value="xuzhou" label="徐州">
        <span>徐州</span>
        <span style="float: right; color: #ccc">xuzhou</span>
      </f-option>
    </f-select>
  </div>
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
