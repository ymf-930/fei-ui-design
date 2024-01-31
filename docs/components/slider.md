---
title: 滑块组件 Slider
---

<script setup>
import Basic from './demo/Slider/Basic.vue'
import Step from './demo/Slider/Step.vue'
import Input from './demo/Slider/Input.vue'
import Mark from './demo/Slider/Mark.vue'
</script>

#####

<card>

## 基础用法

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-slider v-model="value1"></f-slider>
    <div class="p10"></div>
    <f-slider v-model="value2" range></f-slider>
    <div class="p10"></div>
    <f-slider v-model="value3" range disabled></f-slider>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(25)
const value2 = ref([20, 60])
const value3 = ref([30, 40])
</script>
```

</template>

</card>

<card>

## 步长和断点

<template #example>

  <Step/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-slider v-model="value4" :step="10"></f-slider>
    <div class="p10"></div>
    <f-slider v-model="value5" :step="10" show-stops></f-slider>
    <div class="p10"></div>
    <f-slider v-model="value6" :step="10" range></f-slider>
    <div class="p10"></div>
    <f-slider v-model="value7" :step="10" range show-stops></f-slider>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const value4 = ref(30)
const value5 = ref(35)
const value6 = ref([20, 40])
const value7 = ref([30, 50])
</script>
```

</template>

</card>

<card>

## 输入框

<template #example>

  <Input/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-slider v-model="value1" show-input></f-slider>
    <div class="p10"></div>
    <f-slider v-model="value2" :format-tooltip="format"></f-slider>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(25)
const value2 = ref(35)

function format(val) {
  return '进度: ' + val + '%'
}
</script>
```

</template>

</card>

<card>

## 带标记

<template #example>

  <Mark/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-slider v-model="value1" range :marks="marks"></f-slider>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref, h } from 'vue'

const value1 = ref([15, 65])
const marks = {
  0: '0°C',
  12: '12°C',
  36: '36°C',
  88: {
    style: {
      color: '#ff0000'
    },
    label: h('strong', '88°C')
  }
}
</script>
```

</template>

</card>

## Props

| 参数                | 说明                                                                                    | 类型            | 可选值                         | 默认值 |
| ------------------- | --------------------------------------------------------------------------------------- | --------------- | ------------------------------ | ------ |
| value / v-model     | 绑定值                                                                                  | number          | —                              | 0      |
| min                 | 最小值                                                                                  | number          | —                              | 0      |
| max                 | 最大值                                                                                  | number          | —                              | 100    |
| disabled            | 是否禁用                                                                                | boolean         | —                              | false  |
| step                | 步长                                                                                    | number          | —                              | 1      |
| show-input          | 是否显示输入框，仅在非范围选择时有效                                                    | boolean         | —                              | false  |
| show-input-controls | 在显示输入框的情况下，是否显示输入框的控制按钮                                          | boolean         | —                              | true   |
| input-size          | 输入框的尺寸                                                                            | string          | large / default / small / mini | small  |
| show-stops          | 是否显示间断点                                                                          | boolean         | —                              | false  |
| show-tooltip        | 是否显示 tooltip                                                                        | boolean         | —                              | true   |
| format-tooltip      | 格式化 tooltip message                                                                  | function(value) | —                              | —      |
| range               | 是否为范围选择                                                                          | boolean         | —                              | false  |
| vertical            | 是否竖向模式                                                                            | boolean         | —                              | false  |
| height              | Slider 高度，竖向模式时必填                                                             | string          | —                              | —      |
| label               | 屏幕阅读器标签                                                                          | string          | —                              | —      |
| debounce            | 输入时的去抖延迟，毫秒，仅在`show-input`等于true时有效                                  | number          | —                              | 300    |
| tooltip-class       | tooltip 的自定义类名                                                                    | string          | —                              | —      |
| marks               | 标记， key 的类型必须为 number 且取值在闭区间 `[min, max]` 内，每个标记可以单独设置样式 | object          | —                              | —      |

## Events

| 事件名称 | 说明                                               | 回调参数   |
| -------- | -------------------------------------------------- | ---------- |
| change   | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | 改变后的值 |
| input    | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） | 改变后的值 |
