<template>
  <div>
    <f-menu
      :default-active="activeIndex"
      class="f-menu-demo"
      mode="horizontal"
      style="padding-left: 55px"
      @select="handleSelect"
    >
      <f-menu-item index="1">处理中心</f-menu-item>
      <f-submenu index="2">
        <template #title>我的工作台</template>
        <f-menu-item index="2-1">选项1</f-menu-item>
        <f-menu-item index="2-2">选项2</f-menu-item>
        <f-menu-item index="2-3">选项3</f-menu-item>
        <f-submenu index="2-4">
          <template #title>选项4</template>
          <f-menu-item index="2-4-1">选项1</f-menu-item>
          <f-menu-item index="2-4-2">选项2</f-menu-item>
          <f-menu-item index="2-4-3">选项3</f-menu-item>
        </f-submenu>
      </f-submenu>
      <f-menu-item index="3" disabled>消息中心</f-menu-item>
      <f-menu-item index="4">
        <a href="https://ymf-930.gitee.io/fei-ui-design/" target="_blank">文档外链</a>
      </f-menu-item>
    </f-menu>
    <f-divider />
    <f-menu
      :default-active="activeIndex2"
      class="f-menu-demo"
      mode="horizontal"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="padding-left: 55px"
      @select="handleSelect"
    >
      <f-menu-item index="1">处理中心</f-menu-item>
      <f-submenu index="2">
        <template #title>我的工作台</template>
        <f-menu-item index="2-1">选项1</f-menu-item>
        <f-menu-item index="2-2">选项2</f-menu-item>
        <f-menu-item index="2-3">选项3</f-menu-item>
        <f-submenu index="2-4">
          <template #title>选项4</template>
          <f-menu-item index="2-4-1">选项1</f-menu-item>
          <f-menu-item index="2-4-2">选项2</f-menu-item>
          <f-menu-item index="2-4-3">选项3</f-menu-item>
        </f-submenu>
      </f-submenu>
      <f-menu-item index="3" disabled>消息中心</f-menu-item>
      <f-menu-item index="4">
        <a href="https://ymf-930.gitee.io/fei-ui-design/" target="_blank">文档外链</a>
      </f-menu-item>
    </f-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')

function handleSelect(key, keyPath) {
  console.log(key, keyPath)
}
</script>
