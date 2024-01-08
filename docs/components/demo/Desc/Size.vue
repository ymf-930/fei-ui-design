<template>
  <div>
    <div flex="cross:center">
      <span style="margin: 0 5px">Size:</span>
      <f-radio-group v-model="size">
        <f-radio label="large">大号</f-radio>
        <f-radio label="default">默认</f-radio>
        <f-radio label="small">小型</f-radio>
        <f-radio label="mini">超小</f-radio>
      </f-radio-group>
      <span style="margin: 0 5px">Label宽度:</span>
      <f-input-number
        v-model="labelWidth"
        :min="10"
        :max="20"
        :step="2"
        :formatter="value => `${value}%`"
        :parser="value => value.replace('%', '')"
        style="width: 120px"
      ></f-input-number>
      <f-button @click="labelWidth = null">AUTO</f-button>
    </div>
    <f-divider />
    <f-desc title="带边框列表" :column="3" :size="size" border :label-width="labelWidth">
      <f-desc-item label="用户名">韩梅梅</f-desc-item>
      <f-desc-item label="手机号">1769239****</f-desc-item>
      <f-desc-item label="居住地">徐州市</f-desc-item>
      <f-desc-item label="备注">
        <f-tag type="primary" size="mini">学校</f-tag>
      </f-desc-item>
      <f-desc-item label="联系地址">江苏省xx市吴中区吴中大道 1245 号</f-desc-item>
    </f-desc>
    <f-divider />
    <f-desc title="无边框列表" :column="3" :size="size" :label-width="labelWidth">
      <f-desc-item label="用户名">韩梅梅</f-desc-item>
      <f-desc-item label="手机号">1769239****</f-desc-item>
      <f-desc-item label="居住地">徐州市</f-desc-item>
      <f-desc-item label="备注">
        <f-tag type="primary" size="mini">学校</f-tag>
      </f-desc-item>
      <f-desc-item label="联系地址">江苏省xx市吴中区吴中大道 1245 号</f-desc-item>
    </f-desc>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const size = ref('default')
const labelWidth = ref(null)
</script>
