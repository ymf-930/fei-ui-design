<template>
  <div>
    <f-radio-group v-model="social">
      <f-radio label="twitter">
        <span>Twitter</span>
      </f-radio>
      <f-radio label="facebook">
        <span>Facebook</span>
      </f-radio>
      <f-radio label="github">
        <span>Github</span>
      </f-radio>
      <f-radio label="snapchat">
        <span>Snapchat</span>
      </f-radio>
    </f-radio-group>
    <p style="color: #ff4511; margin: 5px 0">{{ social }}</p>
    <f-radio-group v-model="fruit">
      <f-radio label="香蕉"></f-radio>
      <f-radio label="苹果"></f-radio>
      <f-radio label="西瓜"></f-radio>
    </f-radio-group>
    <p style="color: #ff4511; margin: 5px 0">{{ fruit }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const social = ref('facebook')
const fruit = ref('苹果')
</script>
