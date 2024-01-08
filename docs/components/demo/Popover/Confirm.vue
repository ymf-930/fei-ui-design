<template>
  <f-popover v-model:visible="visible" :width="240">
    <f-button type="danger" plain>确认气泡框</f-button>
    <template #content>
      <p>
        <f-icon name="question-circle" size="16" color="#f5222d"></f-icon>
        Are you sure delete this item?
      </p>
      <div style="text-align: right; margin-top: 4px">
        <f-button size="mini" type="text" @click="cancel">取消</f-button>
        <f-button type="primary" size="mini" @click="ok">确定</f-button>
      </div>
    </template>
  </f-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message } from 'fei-ui-design'

const visible = ref(false)

function ok() {
  visible.value = false
  Message('点击了 [确定]')
}
function cancel() {
  visible.value = false
  Message('点击了 [取消]')
}
</script>
