<template>
  <div flex>
    <div>
      <f-radio-group v-model="fruit" type="capsule">
        <f-radio label="香蕉"></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="桃子"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
      <div class="p10" />
      <f-radio-group v-model="fruit" type="capsule" size="small">
        <f-radio label="香蕉"></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="桃子"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
      <div class="p10" />
      <f-radio-group v-model="fruit" type="capsule" size="mini">
        <f-radio label="香蕉"></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="桃子"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
    </div>

    <div style="margin-left: 24px">
      <f-radio-group v-model="fruit" type="capsule">
        <f-radio label="香蕉" disabled></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="桃子"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
      <div class="p10" />
      <f-radio-group v-model="fruit" type="capsule" disabled>
        <f-radio label="香蕉" disabled></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="桃子"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const fruit = ref('苹果')
</script>
