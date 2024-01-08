<template>
  <div>
    <f-dropdown>
      <a href="javascript:void(0)">
        下拉菜单
        <f-icon name="down"></f-icon>
      </a>
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

    <f-dropdown style="margin-left: 20px">
      <f-button type="primary">
        下拉菜单
        <f-icon name="down"></f-icon>
      </f-button>
      <template #dropdown>
        <f-dropdown-menu>
          <f-dropdown-item>驴肉火烧</f-dropdown-item>
          <f-dropdown-item disabled>炸酱面</f-dropdown-item>
          <f-dropdown-item>牛肉板面</f-dropdown-item>
          <f-dropdown-item divided>地锅鸡</f-dropdown-item>
          <f-dropdown-item>街边烧烤</f-dropdown-item>
        </f-dropdown-menu>
      </template>
    </f-dropdown>
  </div>
</template>
