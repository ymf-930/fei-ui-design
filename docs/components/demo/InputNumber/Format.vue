<template>
  <f-row :gutter="16">
    <f-col span="6">
      <f-input-number
        v-model="value1"
        :max="10000"
        :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
        :parser="value => value.replace(/$s?|(,*)/g, '')"
      ></f-input-number>
    </f-col>
    <f-col span="6">
      <f-input-number
        v-model="value2"
        :max="100"
        :formatter="value => `${value}%`"
        :parser="value => value.replace('%', '')"
      ></f-input-number>
    </f-col>
  </f-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(1)
const value2 = ref(1)
</script>
