---
title: 折叠面板 Collapse
---

<script setup>
import Basic from './demo/Collapse/Basic.vue'
import Accordion from './demo/Collapse/Accordion.vue'
import Simple from './demo/Collapse/Simple.vue'
import Wrap from './demo/Collapse/Wrap.vue'
</script>

##### 需要进行分段显示时使用折叠面板

<card>

## 基础用法

默认可以同时展开多个面板，可以设置默认展开第几个。

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-collapse v-model="value">
      <f-collapse-panel title="面板一标题" name="1">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </f-collapse-panel>
      <f-collapse-panel title="面板二标题" name="2">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </f-collapse-panel>
      <f-collapse-panel title="面板三标题" name="3">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </f-collapse-panel>
    </f-collapse>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const value = ref('')
</script>
```

</template>

</card>

<card>

## 手风琴模式

设置 `accordion` 手风琴模式默认只能开启一个

<template #example>

  <Accordion/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-collapse v-model="value" accordion>
      <f-collapse-panel title="面板一标题" name="1">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </f-collapse-panel>
      <f-collapse-panel title="面板二标题" name="2">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </f-collapse-panel>
      <f-collapse-panel title="面板三标题" name="3">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </f-collapse-panel>
    </f-collapse>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const value = ref('')
</script>
```

</template>

</card>

<card>

## 简单模式和自定义头

`simple` 设置简单模式，也可以通过 插槽自定义头部

<template #example>

  <Simple/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-collapse v-model="value" simple>
      <f-collapse-panel title="面板一标题" name="1">
        <template #title>
          面板一标题
          <f-icon name="smile" size="18"></f-icon>
        </template>
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </f-collapse-panel>
      <f-collapse-panel title="面板二标题" name="2">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </f-collapse-panel>
      <f-collapse-panel title="面板三标题" name="3">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </f-collapse-panel>
    </f-collapse>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const value = ref('')
</script>
```

</template>

</card>

<card>

## 容器组件

使用 `f-collapse-wrap` 组件可以单独使用独立的折叠面板

<template #example>

  <Wrap/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-collapse-wrap title="标题栏" collapse>
      <div class="p5">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </div>
    </f-collapse-wrap>
    <f-collapse-wrap title="收起附加右侧操作" collapse>
      <template #right>
        <f-button type="primary" plain size="small">编辑</f-button>
      </template>
      <div class="p5">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </div>
    </f-collapse-wrap>
    <f-collapse-wrap v-model="value" shadow="none">
      <template #title>
        <div style="font-size: 16px; padding: 10px">自定义开关和标题</div>
      </template>
      <template #right>
        <f-button type="text" @click="value = !value">{{ value ? '收起' : '展开' }}</f-button>
      </template>
      <div class="p5">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </div>
    </f-collapse-wrap>
    <f-collapse-wrap title="标题栏" collapse shadow="none" arrow-icon="caret-down">
      <template #title><span class="title">自定义label标题</span></template>
      <div class="p5">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </div>
    </f-collapse-wrap>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const value = ref('')
</script>
```

</template>

</card>

## Props

| 参数       | 说明                                             | 类型         | 可选值 | 默认值 |
| ---------- | ------------------------------------------------ | ------------ | ------ | ------ |
| modelValue | 当前激活的面板的 name，可以使用 v-model 双向绑定 | Array/String | —      | —      |
| accordion  | 是否开启手风琴模式，开启后每次至多展开一个面板   | Boolean      | —      | false  |
| simple     | 是否开启简洁模式                                 | Boolean      | —      | false  |

## Events

| 事件名 | 说明                                                   | 返回值  |
| ------ | ------------------------------------------------------ | ------- |
| change | 切换面板时触发，返回当前已展开的面板的 key，格式为数组 | array[] |

## Slot

| 名称  | 说明       |
| ----- | ---------- |
| title | 面板头内容 |

## CollapseWrap Props

| 参数     | 说明                               | 类型    | 可选值            | 默认值 |
| -------- | ---------------------------------- | ------- | ----------------- | ------ |
| value    | 是否展开                           | boolean | —                 | true   |
| title    | 标题                               | string  | —                 | —      |
| collapse | 是否可以展开收起                   | boolean | —                 | false  |
| shadow   | shadow，设置为none可以开启简单模式 | string  | none/自定义shadow | —      |

## CollapseWrap Slot

| 名称  | 说明             |
| ----- | ---------------- |
| title | 面板头内容       |
| right | 右侧插入内容区域 |
