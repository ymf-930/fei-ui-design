<template>
  <div>
    <f-checkbox-group v-model="social">
      <f-checkbox label="twitter">
        <span>Twitter</span>
      </f-checkbox>
      <f-checkbox label="facebook">
        <span>Facebook</span>
      </f-checkbox>
      <f-checkbox label="github">
        <span>Github</span>
      </f-checkbox>
      <f-checkbox label="snapchat">
        <span>Snapchat</span>
      </f-checkbox>
    </f-checkbox-group>
    <p style="color: #ff4511; margin: 5px 0">{{ social }}</p>
    <f-checkbox-group v-model="fruit">
      <f-checkbox label="香蕉"></f-checkbox>
      <f-checkbox label="苹果"></f-checkbox>
      <f-checkbox label="西瓜"></f-checkbox>
    </f-checkbox-group>
    <p style="color: #ff4511; margin: 5px 0">{{ fruit }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const social = ref(['facebook', 'github'])
const fruit = ref(['苹果'])
</script>
