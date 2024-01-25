---
title: 卡片 Card
---

<script setup>
import Basic from './demo/Card/Basic.vue'
import TitleDivider from './demo/Card/TitleDivider.vue'
import BorderRadius from './demo/Card/BorderRadius.vue'
import Shadow from './demo/Card/Shadow.vue'
</script>

##### 按照一个区块来展示
<card>

## 基础用法

头部可以 开启高亮提示，如不需要头部则不用插入header 可以开启`head-tip`来高亮header的前头

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-card class="box-card" width="480px" head-tip>
    <template #header>
      <div flex="main:justify cross:center">
        <span>卡片名称</span>
        <f-icon name="dropbox" size="20" style="cursor: pointer"></f-icon>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">卡片内容</div>
  </f-card>
</template>
```

</template>

</card>

<card>

## 默认标题和分割线

直接传入header可以生成默认标题,配置divider="no"可以消除默认标题和内容的分割线

<template #example>

  <TitleDivider/>
  
</template>

<template #template>

```html
<template>
  <div style="background: #f8f8f8; padding: 20px">
    <div flex="main:justify box:mean">
      <div style="padding: 0 10px">
        <f-card class="box-card" header="卡片标题">
          <div v-for="o in 4" :key="o" class="text item">
            {{ '这是内容区域 ' + o }}
          </div>
        </f-card>
      </div>
      <div style="padding: 0 10px">
        <f-card class="box-card" header="卡片标题" divider="no">
          <div v-for="o in 4" :key="o" class="text item">
            {{ '这是内容区域 ' + o }}
          </div>
        </f-card>
      </div>
    </div>
  </div>
</template>
```

</template>

</card>

<card>

## 边框和圆角

无边框适合在有背景的情况下使用

<template #example>

  <BorderRadius/>
  
</template>

<template #template>

```html
<template>
  <div style="background: #f8f8f8; padding: 20px">
    <div flex="main:justify box:mean">
      <div style="padding: 0 10px">
        <f-card class="box-card" header="卡片标题" :bordered="false">
          <div>bordered 设置是否含有边框</div>
        </f-card>
      </div>
      <div style="padding: 0 10px">
        <f-card class="box-card" header="卡片标题" radius="10px">
          <div>radius 设置圆角弧度</div>
        </f-card>
      </div>
    </div>
  </div>
</template>
```

</template>

</card>

<card>

## shadow

<template #example>

  <Shadow/>
  
</template>

<template #template>

```html
<template>
  <div flex="main:justify box:mean">
    <div style="padding: 0 10px">
      <f-card class="box-card" shadow="always">
        <div>总是显示</div>
      </f-card>
    </div>
    <div style="padding: 0 10px">
      <f-card class="box-card">
        <div>默认悬停显示</div>
      </f-card>
    </div>
    <div style="padding: 0 10px">
      <f-card class="box-card" shadow="never">
        <div>不显示</div>
      </f-card>
    </div>
  </div>
</template>
```

</template>

</card>

## Props

| 参数       | 说明                              | 类型    | 可选值                 | 默认值 |
| ---------- | --------------------------------- | ------- | ---------------------- | ------ |
| header     | 设置 header，也可以已插槽形式插入 | String  | —                      | —      |
| body-style | 设置 body 的样式                  | Object  | —                      | —      |
| shadow     | 阴影的显示                        | String  | always / hover / never | hover  |
| bordered   | 设置是否有边框                    | Boolean | false                  | true   |
| width      | 设置卡片默认宽度                  | String  | —                      | 100%   |
| radius     | 设置圆角值                        | String  | 0 / 百分比 / 像素      | 4px    |
| divider    | header和body之间的分割线          | String  | no / has               | has    |
| head-tip   | 头部的高亮提示                    | Boolean | true / false           | false  |
| bg-color   | 整体的背景色                      | String  | —                      | #fff   |
