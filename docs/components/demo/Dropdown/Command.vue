<template>
  <div>
    <f-dropdown @command="handleClick">
      <f-button>
        下拉菜单
        <f-icon name="down"></f-icon>
      </f-button>
      <template #dropdown>
        <f-dropdown-menu>
          <f-dropdown-item name="驴肉火烧" selected>驴肉火烧</f-dropdown-item>
          <f-dropdown-item name="炸酱面" disabled>炸酱面</f-dropdown-item>
          <f-dropdown-item name="牛肉板面">牛肉板面</f-dropdown-item>
          <f-dropdown-item :name="['徐州美食', '地锅鸡']" divided>地锅鸡</f-dropdown-item>
          <f-dropdown-item :name="{ type: 'info', name: '街边烧烤' }">街边烧烤</f-dropdown-item>
        </f-dropdown-menu>
      </template>
    </f-dropdown>
  </div>
</template>

<script setup lang="ts">
import { Message } from 'fei-ui-design'

function handleClick(name) {
  console.log(name)
  Message('click on item: ' + JSON.stringify(name))
}
</script>
