<template>
  <div class="demo-grid">
    <f-space>
      <span>栅格间距：</span>
      <f-radio-group v-model="gutter" size="small" type="capsule">
        <f-radio :label="8">8</f-radio>
        <f-radio :label="16">16</f-radio>
        <f-radio :label="24">24</f-radio>
      </f-radio-group>
    </f-space>

    <f-row :gutter="gutter" class="gutter">
      <f-col span="6">
        <div>col-6</div>
      </f-col>
      <f-col span="6">
        <div>col-6</div>
      </f-col>
      <f-col span="6">
        <div>col-6</div>
      </f-col>
      <f-col span="6">
        <div>col-6</div>
      </f-col>
    </f-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const gutter = ref(8)
</script>
