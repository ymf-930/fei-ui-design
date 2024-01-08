<template>
  <div>
    <f-button @click="modal = true">显示全屏对话框</f-button>
    <f-modal v-model="modal" title="全屏标题" :fullscreen="fullscreen">
      <template #ctrl>
        <i
          :class="`f-iconfont f-icon-fullscreen${fullscreen ? '-exit' : ''}`"
          @click="fullscreen = !fullscreen"
        ></i>
      </template>
      <div :style="fullscreen ? {} : 'height: 300px; overflow-y: auto'">
        <p v-for="i in 50" :key="i">我是全屏的内容{{ i }}...</p>
      </div>
      <template #footer>
        <span>
          <f-button @click="modal = false">取 消</f-button>
          <f-button type="primary" @click="modal = false">确 定</f-button>
        </span>
      </template>
    </f-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const modal = ref(false)
const fullscreen = ref(false)
</script>
