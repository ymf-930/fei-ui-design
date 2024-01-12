<template>
  <f-row class="tac">
    <f-col :span="12">
      <h5 style="margin-bottom: 10px">默认颜色</h5>
      <f-menu
        default-active="2"
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
    </f-col>
    <f-col :span="12">
      <h5 style="margin-bottom: 10px">自定义颜色</h5>
      <f-menu
        :unique-opened="true"
        default-active="2"
        class="f-menu-vertical-demo"
        background-color="#495662"
        text-color="#fff"
        active-text-color="#ffd04b"
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
    </f-col>
  </f-row>
</template>

<script setup lang="ts">
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
