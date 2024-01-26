---
title: 颜色选择器 ColorPicker
---

<script setup>
import Basic from './demo/ColorPicker/Basic.vue'
import Alpha from './demo/ColorPicker/Alpha.vue'
import Colors from './demo/ColorPicker/Colors.vue'
import Disabled from './demo/ColorPicker/Disabled.vue'
import Size from './demo/ColorPicker/Size.vue'
</script>

##### 用于选择颜色色值

用于选择颜色色值

<card>

## 基础用法

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div flex>
    <div class="block" style="width: 240px; margin-right: 20px">
      <div class="demonstration mb-5">有默认值</div>
      <f-color-picker v-model="color1" show-alpha color-format="hex"></f-color-picker>
      <div class="demonstration mb-5">{{ color1 }}</div>
    </div>
    <div class="block" style="width: 240px; margin-right: 20px">
      <div class="demonstration mb-5">无默认值</div>
      <f-color-picker v-model="color2" show-alpha></f-color-picker>
      <div class="demonstration mb-5">{{ color2 }}</div>
    </div>
    <div class="block" style="width: 240px; margin-right: 20px">
      <div class="demonstration mb-5">不显示label</div>
      <f-color-picker v-model="color3" show-alpha :show-label="false"></f-color-picker>
      <div class="demonstration mb-5">{{ color3 }}</div>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const color1 = ref('#1a5cff')
  const color2 = ref(null)
  const color3 = ref(null)
</script>
```

</template>

</card>

<card>

## 带透明度

可以选择透明度

<template #example>

  <Alpha/>
  
</template>

<template #template>

```html
<template>
  <div flex>
    <div class="block" style="width: 200px; margin-right: 20px">
      <div class="demonstration mb-5">带透明度</div>
      <f-color-picker v-model="color" show-alpha></f-color-picker>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const color = ref('rgba(45,140,240,0.45)')
</script>
```

</template>

</card>

<card>

## 带有预设色卡

可以提供预设的色卡

<template #example>

  <Colors/>
  
</template>

<template #template>

```html
<template>
  <div flex>
    <div class="block" style="width: 200px; margin-right: 20px">
      <f-color-picker v-model="color1" show-alpha :colors="colors1"></f-color-picker>
    </div>
    <div class="block" style="width: 200px; margin-right: 20px">
      <f-color-picker v-model="color2" show-alpha :colors="colors2"></f-color-picker>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const color1 = ref('#2d8cf0')
  const color2 = ref('#2d8cf0')
  const colors1 = [
    '#1a5cff',
    '#46c93a',
    '#ffba00',
    '#ff4757',
    '#2f54eb',
    '#faad14',
    '#722ed1',
    '#eb2f96',
    '#13c2c2',
    '#fadb14',
    '#a0d911',
    '#fa541c',
    '#eaff8f',
    '#bae7ff',
    '#efdbff',
    '#ffd6e7',
    '#ff1885',
    '#fff506',
    '#00bcd4',
    '#f06292',
    '#cb6c00',
    '#607d8b',
    '#000000',
    '#ffffff'
  ]
  const colors2 = [
    '#311B92',
    '#512DA8',
    '#673AB7',
    '#9575CD',
    '#D1C4E9',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)'
  ]
</script>
```

</template>

</card>

<card>

## 禁用状态

可设置禁用状态

<template #example>

  <Disabled/>
  
</template>

<template #template>

```html
<template>
  <div flex>
    <div class="block" style="width: 200px; margin-right: 20px">
      <f-color-picker v-model="color" disabled></f-color-picker>
      &nbsp;&nbsp;
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const color = ref('#1a5cff')
</script>
```

</template>

</card>

<card>

## 不同的大小

四个不同大小

<template #example>

  <Size/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div flex="cross:center" class="mb-16">
      <div class="mr-16">
        <f-color-picker v-model="color" size="large"></f-color-picker>
      </div>
      <div class="mr-16">
        <f-color-picker v-model="color"></f-color-picker>
      </div>
      <div class="mr-16">
        <f-color-picker v-model="color" size="small"></f-color-picker>
      </div>
      <div>
        <f-color-picker v-model="color" size="mini"></f-color-picker>
      </div>
    </div>
    <div flex="cross:center">
      <div class="mr-16">
        <f-color-picker v-model="color" size="large" :show-label="false"></f-color-picker>
      </div>
      <div class="mr-16">
        <f-color-picker v-model="color" :show-label="false"></f-color-picker>
      </div>
      <div class="mr-16">
        <f-color-picker v-model="color" size="small" :show-label="false"></f-color-picker>
      </div>
      <div>
        <f-color-picker v-model="color" size="mini" :show-label="false"></f-color-picker>
      </div>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const color = ref('#1a5cff')
</script>
```

</template>

</card>

## Props

| 参数            | 说明                      | 类型    | 可选值                | 默认值                                                |
| --------------- | ------------------------- | ------- | --------------------- | ----------------------------------------------------- |
| value / v-model | 绑定值                    | string  | —                     | —                                                     |
| disabled        | 是否禁用                  | boolean | —                     | false                                                 |
| size            | 尺寸                      | string  | —                     | medium / small / mini                                 |
| show-alpha      | 是否支持透明度选择        | boolean | —                     | false                                                 |
| color-format    | 写入 v-model 的颜色的格式 | string  | hsl / hsv / hex / rgb | hex（show-alpha 为 false）/ rgb（show-alpha 为 true） |
| popper-class    | ColorPicker 下拉框的类名  | string  | —                     | —                                                     |
| colors          | 预定义颜色                | array   | —                     | —                                                     |

## Events

| 事件名称      | 说明                               | 回调参数         |
| ------------- | ---------------------------------- | ---------------- |
| change        | 当绑定值变化时触发                 | 当前值           |
| active-change | 面板中当前显示的颜色发生改变时触发 | 当前显示的颜色值 |
