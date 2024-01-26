---
title: 面包屑 Breadcrumb
---

<script setup>
import Basic from './demo/Breadcrumb/Basic.vue'
import Separator from './demo/Breadcrumb/Separator.vue'
</script>

##### 显示当前页面的路径，快速返回之前的任意页面或者跳转链接

<card>

## 基础用法

面包屑的用法，separator设置分隔符 不设置to属性，一切都需要自行在插槽中灵活运用

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
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
```

</template>

</card>

<card>

## 分隔符

可以设置分隔符

<template #example>

  <Separator/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-breadcrumb separator-icon="right">
      <f-breadcrumb-item><a href="/">首页</a></f-breadcrumb-item>
      <f-breadcrumb-item><a href="/">组件</a></f-breadcrumb-item>
      <f-breadcrumb-item>面包屑</f-breadcrumb-item>
    </f-breadcrumb>
    <br />
    <f-breadcrumb separator-icon="caret-right">
      <f-breadcrumb-item><a href="/">首页</a></f-breadcrumb-item>
      <f-breadcrumb-item><a href="/">组件</a></f-breadcrumb-item>
      <f-breadcrumb-item>面包屑</f-breadcrumb-item>
    </f-breadcrumb>
  </div>
</template>
```

</template>

</card>

## Breadcrumb Props

| 参数           | 说明           | 类型   | 可选值 | 默认值 |
| -------------- | -------------- | ------ | ------ | ------ |
| separator      | 分隔           | string | —      | '/'    |
| separator-icon | 图标分隔符icon | string | —      | —      |
