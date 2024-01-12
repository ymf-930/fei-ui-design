<template>
  <div>
    <f-button-group v-model="isCollapse" style="margin-bottom: 20px">
      <f-button :type="isCollapse ? 'default' : 'primary'" @click="isCollapse = false">
        展开
      </f-button>
      <f-button :type="isCollapse ? 'primary' : 'default'" @click="isCollapse = true">
        收起
      </f-button>
    </f-button-group>

    <f-menu
      style="width: 240px"
      default-active="1-4-1"
      :collapse="isCollapse"
      background-color="#232324"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="f-menu-vertical-demo border"
      @open="handleOpen"
      @close="handleClose"
    >
      <f-submenu index="1">
        <template #title>
          <f-icon name="location-fill"></f-icon>
          <span>导航一</span>
        </template>
        <f-menu-item-group>
          <template #title>分组一</template>
          <f-menu-item index="1-1">选项1</f-menu-item>
          <f-menu-item index="1-2">选项2</f-menu-item>
        </f-menu-item-group>
        <f-menu-item-group title="分组2">
          <f-menu-item index="1-3">选项3</f-menu-item>
        </f-menu-item-group>
        <f-submenu index="1-4">
          <template #title>选项4</template>
          <f-menu-item index="1-4-1">选项1</f-menu-item>
        </f-submenu>
      </f-submenu>
      <f-menu-item index="2">
        <f-icon name="appstore-fill"></f-icon>
        <template #title>导航二</template>
      </f-menu-item>
      <f-menu-item index="3" disabled>
        <f-icon name="file-text"></f-icon>
        <template #title>导航三</template>
      </f-menu-item>
      <f-menu-item index="4">
        <f-icon name="setting-fill"></f-icon>
        <template #title>导航四</template>
      </f-menu-item>
    </f-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isCollapse = ref(false)

function handleOpen(key, keyPath) {
  console.log(key, keyPath)
}
function handleClose(key, keyPath) {
  console.log(key, keyPath)
}
</script>

<style scoped>
.f-menu-vertical-demo {
  width: 240px;
  border-right: 1px solid #f0f0f0;
}
</style>
