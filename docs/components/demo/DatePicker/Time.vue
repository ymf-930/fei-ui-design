<template>
  <div flex="cross:center box:mean">
    <div style="padding: 0 10px">
      <div class="demonstration">基础</div>
      <f-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></f-date-picker>
    </div>
    <div style="padding: 0 10px">
      <div class="demonstration">带快捷选项</div>
      <f-date-picker
        v-model="value2"
        type="datetime"
        placeholder="选择日期时间"
        :shortcuts="shortcuts"
      ></f-date-picker>
    </div>
    <div style="padding: 0 10px">
      <div class="demonstration">默认时间</div>
      <f-date-picker
        v-model="value3"
        type="datetime"
        placeholder="选择日期时间"
        :default-time="new Date(2000, 1, 1, 12, 0, 0)"
      ></f-date-picker>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const shortcuts = [
  {
    text: '今日',
    value: new Date()
  },
  {
    text: '昨天',
    value: (() => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    })()
  },
  {
    text: '一周前',
    value: (() => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    })()
  }
]
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
