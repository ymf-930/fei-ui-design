---
title: 数字输入 InputNumber
---

<script setup>
import Basic from './demo/InputNumber/Basic.vue'
import Init from './demo/InputNumber/Init.vue'
import Number from './demo/InputNumber/Number.vue'
import Format from './demo/InputNumber/Format.vue'
import Size from './demo/InputNumber/Size.vue'
import Status from './demo/InputNumber/Status.vue'
</script>

##### 用于输入数字

<card>

## 基础用法

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-row :gutter="16">
    <f-col span="6">
      <f-input-number
        v-model="value1"
        :max="10"
        :min="1"
        arrow-up-icon="plus"
        arrow-down-icon="minus"
      ></f-input-number>
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value1" :max="10" :min="1" always></f-input-number>
    </f-col>
  </f-row>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const value1 = ref(1)
</script>
```

</template>

</card>

<card>

## 初始化值

默认控件初始化值为null，这时如果绑定的属性值为undefined，则会改变默认值为null（因为undefined转换为数字之后为NaN），
如果默认传输为字符串，则也会进行一次值的转换，如能转换为数字，则会根据最大最小值进行数字转换。否则也会置空。

<template #example>

  <Init/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-row :gutter="16">
      <f-col span="6">
        <f-input-number v-model="obj.num1"></f-input-number>
        初始化值为null(绑定属性存在）
      </f-col>
      <f-col span="6">
        <f-input-number v-model="obj.num2" :min="1" :max="10"></f-input-number>
        初始化值为字符串
      </f-col>
      <f-col span="6">
        <f-input-number v-model="obj.num3"></f-input-number>
        初始化值为undefined(绑定属性不存在）
      </f-col>
    </f-row>
    <p>{{ obj }}</p>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const obj = ref({ num1: null, num2: '0', num3: undefined })
</script>
```

</template>

</card>

<card>

## 小数

<template #example>

  <Number/>
  
</template>

<template #template>

```html
<template>
  <f-row :gutter="16">
    <f-col span="6">
      <f-input-number v-model="value1" :max="10" :min="1" :step="0.2"></f-input-number>
      小数步长:0.2
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value2" :precision="2"></f-input-number>
      精度范围:2
    </f-col>
  </f-row>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const value1 = ref(1)
  const value2 = ref(null)
</script>
```

</template>

</card>

<card>

## 可以格式化

<template #example>

  <Format/>
  
</template>

<template #template>

```html
<template>
  <f-row :gutter="16">
    <f-col span="6">
      <f-input-number
        v-model="value1"
        :max="10000"
        :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
        :parser="value => value.replace(/$s?|(,*)/g, '')"
      ></f-input-number>
    </f-col>
    <f-col span="6">
      <f-input-number
        v-model="value2"
        :max="100"
        :formatter="value => `${value}%`"
        :parser="value => value.replace('%', '')"
      ></f-input-number>
    </f-col>
  </f-row>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const value1 = ref(1)
  const value2 = ref(1)
</script>
```

</template>

</card>

<card>

## 不同尺寸

提供三种额外不同尺寸

<template #example>

  <Size/>
  
</template>

<template #template>

```html
<template>
  <f-row :gutter="16">
    <f-col span="6">
      <f-input-number v-model="value" size="mini"></f-input-number>
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value" size="small"></f-input-number>
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value"></f-input-number>
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value" size="large"></f-input-number>
    </f-col>
  </f-row>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const value = ref(1)
</script>
```

</template>

</card>

<card>

## 多种状态

禁用，只读和不可编辑三种状态

<template #example>
  
  <Status/>
  
</template>

<template #template>

```html
<template>
  <f-row :gutter="16">
    <f-col span="6">
      <f-input-number v-model="value" disabled></f-input-number>
      disabled
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value" readonly></f-input-number>
      readonly
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value" :editable="false"></f-input-number>
      editable="false"
    </f-col>
  </f-row>
  <br />
  <f-row :gutter="16">
    <f-col span="6">
      <f-input-number v-model="value" disabled always></f-input-number>
      disabled
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value" readonly always></f-input-number>
      readonly
    </f-col>
    <f-col span="6">
      <f-input-number v-model="value" :editable="false" always></f-input-number>
      editable="false"
    </f-col>
  </f-row>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const value = ref(1)
</script>
```

</template>

</card>

## Props

| 参数            | 说明                                                       | 类型     | 可选值                        | 默认值   |
| --------------- | ---------------------------------------------------------- | -------- | ----------------------------- | -------- |
| max             | 最大值                                                     | Number   | -                             | Infinity |
| min             | 最小值                                                     | Number   | -                             | Infinity |
| modelValue      | 当前值，可以使用 v-model 双向绑定数据                      | Number   | -                             | 1        |
| step            | 每次改变的步伐，可以是小数                                 | Number   | -                             | 1        |
| size            | 输入框尺寸                                                 | String   | large、small、default或者不填 | -        |
| disabled        | 设置禁用状态                                               | Boolean  | -                             | false    |
| placeholder     | 占位文本                                                   | String   | -                             | -        |
| formatter       | 指定输入框展示值的格式                                     | Function | -                             | -        |
| parser          | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | Function | -                             | -        |
| readonly        | 是否设置为只读                                             | Boolean  | -                             | false    |
| editable        | 是否可编辑                                                 | Boolean  |                               | true     |
| precision       | 数值精度                                                   | Number   |                               | -        |
| active-change   | 是否实时响应数据                                           | Boolean  |                               | true     |
| arrow-up-icon   | 普通模式下箭头图标                                         | String   |                               | up       |
| arrow-down-icon | 普通模式下箭头图标                                         | String   |                               | down     |
| always          | 是否始终显示控制器                                         | Boolean  | true                          | -        |

## Events

| 事件名 | 说明             | 返回值            |
| ------ | ---------------- | ----------------- |
| change | 数值改变时的回调 | 返回当前值 当前值 |
| focus  | 聚焦时触发       | event             |
| blur   | 失焦时触发       | -                 |
