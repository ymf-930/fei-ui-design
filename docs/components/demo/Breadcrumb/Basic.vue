<template>
  <div>
    <f-breadcrumb separator="/">
      <f-breadcrumb-item>首页</f-breadcrumb-item>
      <f-breadcrumb-item>组件</f-breadcrumb-item>
      <f-breadcrumb-item>面包屑</f-breadcrumb-item>
    </f-breadcrumb>
    <f-divider />
    <f-breadcrumb separator="/">
      <f-breadcrumb-item>
        <f-dropdown>
          <a>
            Dashboard
            <f-icon name="down"></f-icon>
          </a>
          <template #dropdown>
            <f-dropdown-menu>
              <f-dropdown-item>操作台</f-dropdown-item>
              <f-dropdown-item>分析页</f-dropdown-item>
            </f-dropdown-menu>
          </template>
        </f-dropdown>
      </f-breadcrumb-item>
      <f-breadcrumb-item>组件</f-breadcrumb-item>
      <f-breadcrumb-item>面包屑</f-breadcrumb-item>
    </f-breadcrumb>
  </div>
</template>
