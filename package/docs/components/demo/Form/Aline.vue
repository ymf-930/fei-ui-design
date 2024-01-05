<template>
  <div>
    <f-space>
      对齐方式
      <f-radio-group v-model="labelPosition" type="capsule">
        <f-radio label="left">左对齐</f-radio>
        <f-radio label="right">右对齐</f-radio>
        <f-radio label="top">顶部对齐</f-radio>
      </f-radio-group>
      尺寸大小
      <f-radio-group v-model="size" type="capsule">
        <f-radio label="large">large</f-radio>
        <f-radio label="default">default</f-radio>
        <f-radio label="small">small</f-radio>
        <f-radio label="mini">mini</f-radio>
      </f-radio-group>
      文字显示
      <f-switch v-model="onlyText"></f-switch>
    </f-space>
    <div style="width: 500px; margin-top: 20px">
      <f-form :label-position="labelPosition" label-width="100px" :model="formObj" :size="size">
        <f-form-item label="姓名">
          <f-input v-if="!onlyText" v-model="formObj.name" placeholder="输入姓名"></f-input>
          <label v-else>{{ formObj.name }}</label>
        </f-form-item>
        <f-form-item label="年龄">
          <f-input-number v-if="!onlyText" v-model="formObj.age"></f-input-number>
          <label v-else>{{ formObj.age }}</label>
        </f-form-item>
        <f-form-item label="户籍地">
          <f-select v-if="!onlyText" v-model="formObj.city" placeholder="请选择户籍地">
            <b-option label="上海" value="shanghai"></b-option>
            <b-option label="北京" value="beijing"></b-option>
            <b-option label="南京" value="nanjing"></b-option>
            <b-option label="徐州" value="xuzhou"></b-option>
          </f-select>
          <label v-else>{{ formObj.city }}</label>
        </f-form-item>
        <f-form-item label="学历">
          <f-radio-group v-if="!onlyText" v-model="formObj.edu">
            <f-radio label="高中"></f-radio>
            <f-radio label="大专"></f-radio>
            <f-radio label="本科"></f-radio>
            <f-radio label="硕士"></f-radio>
          </f-radio-group>
          <span v-else>{{ formObj.edu }}</span>
        </f-form-item>
        <f-form-item label="爱好">
          <f-checkbox-group v-if="!onlyText" v-model="formObj.hobby">
            <f-checkbox label="打游戏" name="hobby"></f-checkbox>
            <f-checkbox label="看电影" name="hobby"></f-checkbox>
            <f-checkbox label="打篮球/运动" name="hobby"></f-checkbox>
            <f-checkbox label="看书" name="hobby"></f-checkbox>
          </f-checkbox-group>
          <span v-else>{{ formObj.hobby }}</span>
        </f-form-item>
        <f-form-item label="住址">
          <f-input
            v-if="!onlyText"
            v-model="formObj.address"
            type="textarea"
            placeholder="请输入住址..."
          ></f-input>
          <span v-else>{{ formObj.address }}</span>
        </f-form-item>
        <!-- <f-form-item label="进度">
        <f-slider></f-slider>
      </f-form-item>
      <f-form-item label="颜色">
        <f-color-picker></f-color-picker>
      </f-form-item>
      <f-form-item label="评分">
        <f-rate></f-rate>
      </f-form-item>
      <f-form-item label="日期选择器">
        <f-date-picker></f-date-picker>
      </f-form-item>
      <f-form-item label="时间选择器">
        <f-time-picker></f-time-picker>
      </f-form-item>
      <f-form-item label="开关">
        <f-switch></f-switch>
      </f-form-item> -->
        <f-form-item v-if="!onlyText">
          <f-button type="primary">提交</f-button>
          <f-button>取消</f-button>
        </f-form-item>
      </f-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const labelPosition = ref('right')
const size = ref('default')
const onlyText = ref(false)

const formObj = ref({
  name: '张三',
  age: 18,
  city: 'xuzhou',
  edu: '高中',
  hobby: ['打游戏', '看电影'],
  address: '徐州市鼓楼区'
})
</script>
