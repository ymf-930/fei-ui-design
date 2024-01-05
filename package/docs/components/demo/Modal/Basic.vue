<template>
  <div>
    <f-button type="primary" @click="visible = true">Open</f-button>
    <f-button type="primary" @click="confirm = true">Confirm</f-button>
    <b-modal v-model="visible" title="普通的模态框标题" :z-index="1000">
      <p>我是弹窗内容...</p>
      <p>我是弹窗内容...</p>
      <p>我是弹窗内容...</p>
      <template #footer>
        <span>
          <f-button @click="onClose">取 消</f-button>
          <f-button type="primary" @click="onOk">确 定</f-button>
        </span>
      </template>
    </b-modal>
    <b-modal v-model="confirm" width="420px" :show-close="false">
      <div class="p8">
        <div class="f-s-18" flex="cross:center">
          <f-icon name="info-circle" size="24" color="#fa8c16"></f-icon>
          <span class="ml-8">提示</span>
        </div>
        <div style="padding: 8px 0 8px 32px">确认注销登录吗？</div>
        <div class="t-right">
          <f-button @click="confirm = false">取消</f-button>
          <f-button type="primary" @click="confirm = false">确定</f-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message } from 'f-ui-design'

const visible = ref(false)
const confirm = ref(false)

function onOk() {
  visible.value = false
  Message('点击确定')
}

function onClose() {
  visible.value = false
  Message('点击取消')
}
</script>
