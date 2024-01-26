---
title: 抽屉 Drawer
---

<script setup>
import Basic from './demo/Drawer/Basic.vue'
import Left from './demo/Drawer/Left.vue'
import Inner from './demo/Drawer/Inner.vue'
import Preview from './demo/Drawer/Preview.vue'
import Qiantao from './demo/Drawer/Qiantao.vue'
import Dragable from './demo/Drawer/Dragable.vue'
</script>

##### 简易的抽屉用于展示或者快速弹出,可以根据是信息展示还是创建动态插入

<card>

## 基础用法

最简单的使用方法，通过控制属性value来显示 / 隐藏对话框。

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button type="primary" @click="value = true">open</f-button>
    <f-drawer v-model="value" title="抽屉标题">
      <p>我是抽屉内容</p>
    </f-drawer>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const value = ref(false)
</script>
```

</template>

</card>

<card>

## 左侧打开

设置 `placement="left"`为左侧打开

<template #example>

  <Left/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button type="primary" @click="value = true">左侧打开</f-button>
    <f-drawer v-model="value" title="抽屉标题" placement="left" width="500px">
      <p>我是左侧的抽屉</p>
    </f-drawer>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const value = ref(false)
</script>
```

</template>

</card>

<card>

## inner 模式

可以设置inner模式在某个容器内打开

<template #example>

  <Inner/>
  
</template>

<template #template>

```html
<template>
  <div
    style="position: relative; height: 400px; background: #eee; border: 1px solid #eee; z-index: 2"
  >
    <f-button type="primary" @click="valueInner = true">内部抽屉</f-button>
    <f-drawer v-model="valueInner" title="内部抽屉" :lock-scroll="false" inner :z-index="10">
      <p>我是内部的抽屉</p>
    </f-drawer>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const valueInner = ref(false)
</script>
```

</template>

</card>

<card>

## 信息预览框

<template #example>

  <Preview/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button type="primary" @click="value = true">信息预览</f-button>
    <f-drawer v-model="value" :show-close="false" width="640">
      <p :style="pStyle">用户信息</p>
      <p :style="pStyle">个人信息</p>
      <div class="demo-drawer-profile">
        <p flex="box:mean" class="mb-10">
          <span>名称: ymf</span>
          <span>手机号: +86 1762516xxxx</span>
        </p>
        <p flex="box:mean" class="mb-10">
          <span>城市: 徐州市</span>
          <span>区: 鼓楼区</span>
        </p>
        <p flex="box:mean" class="mb-10">
          <span>出生年月: 1990-04</span>
          <span>职业: web前端</span>
        </p>
      </div>
      <f-divider></f-divider>
      <p :style="pStyle">公司</p>
      <div class="demo-drawer-profile">
        <p flex="box:mean" class="mb-10">
          <span>名称: xxxx有限公司</span>
          <span>手机号: +86 1762516xxxx</span>
        </p>
        <p flex="box:mean" class="mb-10">
          <span>地址: 徐州市xx区xx街道88号</span>
          <span>电话: +86 1762516xxxx</span>
        </p>
      </div>
      <f-divider></f-divider>
      <p :style="pStyle">联系我们</p>
      <div class="demo-drawer-profile">
        <p flex="box:mean" class="mb-10">
          <span>Email: 316281400@qq.com</span>
          <span>手机号: +86 1762516xxxx</span>
        </p>
        <p class="mb-10">
          gitee:
          <a href="https://gitee.com/ymf-930/fei-ui-design" target="_blank">
            https://gitee.com/ymf-930/fei-ui-design
          </a>
        </p>
      </div>
    </f-drawer>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref(false)

  const pStyle = {
    fontSize: '16px',
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    marginBottom: '16px'
  }
</script>
```

</template>

</card>

<card>

## 嵌套抽屉

抽屉可以互相嵌套，但一般不推荐这么使用避免层级过多影响用户交互

<template #example>

  <Qiantao/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button type="primary" @click="value = true">打开抽屉</f-button>
    <f-drawer v-model="value" title="一级抽屉" width="512" :show-close="false">
      <f-button type="primary" @click="value1 = true">打开二层抽屉</f-button>
    </f-drawer>
    <f-drawer v-model="value1" title="二级抽屉" :show-close="false">这是第二层抽屉</f-drawer>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const value = ref(false)
  const value1 = ref(false)
</script>
```

</template>

</card>

<card>

## 可拖拽宽度

可以设置拖拽抽屉

<template #example>

  <Dragable/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button type="primary" @click="value = true">open</f-button>
    <f-drawer v-model="value" title="抽屉标题" draggable>
      <p>我是抽屉内容</p>
    </f-drawer>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const value = ref(false)
</script>
```

</template>

</card>

## Props

| 参数           | 说明                                                                     | 类型     | 可选值     | 默认值 |
| -------------- | ------------------------------------------------------------------------ | -------- | ---------- | ------ |
| modelValue     | 是否显示，可使用 v-model 双向绑定数据。                                  | Boolean  | —          | false  |
| title          | 标题，如果使用 slot 自定义了页头，则 title 无效                          | String   | —          | —      |
| placement      | 方向                                                                     | String   | left/right | right  |
| append-to-body | 是否将对话框放置于 body 内                                               | Boolean  | —          | false  |
| width          | 抽屉宽度                                                                 | Number   | —          | 300    |
| min-width      | 抽屉最小宽度                                                             | Number   | —          | 300    |
| show-close     | 是否显示关闭按钮                                                         | Boolean  | —          | true   |
| mask-closable  | 是否允许点击遮罩层关闭                                                   | Boolean  | —          | true   |
| mask           | 是否有mask遮罩                                                           | Boolean  | —          | true   |
| styles         | 抽屉中间层的样式                                                         | Object   | —          | —      |
| inner          | 是否设置抽屉在某个元素内打开，开启此属性时，应当关闭 append-to-body 属性 | Boolean  | —          | false  |
| draggable      | 是否开启拖拽调整宽度                                                     | Boolean  | —          | false  |
| before-close   | 关闭前事件,返回 Promise 可以阻止关闭                                     | Function |
| lock-scroll    | 是否锁定滚动                                                             | Boolean  | —          | true   |

## Events

| 事件名       | 说明         | 返回值 |
| ------------ | ------------ | ------ |
| close        | 关闭抽屉触发 | 无     |
| resize-width | 调整宽度     | 无     |

## Slot

| 名称    | 说明         |
| ------- | ------------ |
| header  | 自定义页头   |
| close   | 关闭按钮     |
| default | 抽屉主体内容 |
