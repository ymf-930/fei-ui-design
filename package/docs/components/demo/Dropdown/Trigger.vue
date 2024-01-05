<template>
  <f-space>
    <f-dropdown trigger="hover">
      <f-button type="primary">
        hover 触发
        <f-icon name="down"></f-icon>
      </f-button>
      <template #dropdown>
        <f-dropdown-menu>
          <f-dropdown-item name="驴肉火烧" selected>驴肉火烧</f-dropdown-item>
          <f-dropdown-item name="炸酱面" disabled>炸酱面</f-dropdown-item>
          <f-dropdown-item name="牛肉板面">牛肉板面</f-dropdown-item>
          <f-dropdown-item name="地锅鸡" divided>地锅鸡</f-dropdown-item>
          <f-dropdown-item name="街边烧烤">街边烧烤</f-dropdown-item>
        </f-dropdown-menu>
      </template>
    </f-dropdown>
    <f-dropdown>
      <f-button type="primary">
        click 触发
        <f-icon name="down"></f-icon>
      </f-button>
      <template #dropdown>
        <f-dropdown-menu>
          <f-dropdown-item selected>驴肉火烧</f-dropdown-item>
          <f-dropdown-item disabled>炸酱面</f-dropdown-item>
          <f-dropdown-item>牛肉板面</f-dropdown-item>
          <f-dropdown-item divided>地锅鸡</f-dropdown-item>
          <f-dropdown-item>街边烧烤</f-dropdown-item>
        </f-dropdown-menu>
      </template>
    </f-dropdown>
    <f-dropdown trigger="contextmenu">
      <f-button type="primary">
        右键 触发
        <f-icon name="down"></f-icon>
      </f-button>
      <template #dropdown>
        <f-dropdown-menu>
          <f-dropdown-item>返回</f-dropdown-item>
          <f-dropdown-item style="color: #ed4014">删除</f-dropdown-item>
        </f-dropdown-menu>
      </template>
    </f-dropdown>
  </f-space>
</template>
