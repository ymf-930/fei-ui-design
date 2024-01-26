---
title: 输入框 Input
---

<script setup>
import Basic from './demo/Input/Basic.vue'
import Icon from './demo/Input/Icon.vue'
import Disabled from './demo/Input/Disabled.vue'
import Group from './demo/Input/Group.vue'
import Search from './demo/Input/Search.vue'
import Password from './demo/Input/Password.vue'
import Size from './demo/Input/Size.vue'
import Text from './demo/Input/Text.vue'
import Count from './demo/Input/Count.vue'
</script>

##### 基本表单组件，支持 input 和 textarea

<card>

## 基础用法

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div style="margin-bottom: 10px">输入的内容：{{ value }}</div>
    <f-input v-model="value" placeholder="请输入一些文字..." class="input-item"></f-input>
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

<template #style>

```html
<style scoped>
.input-item {
  width: 300px;
  margin-right: 20px;
}
</style>
```

</template>

</card>

<card>

## 图标和清空

设置 `clearable` 可以开启清空按钮,icon设置icon图标名称

<template #example>

  <Icon/>
  
</template>

<template #template>

```html
<template>
  <f-space>
    <f-input v-model="value" icon="eye-fill" class="input-item"></f-input>
    <f-input v-model="value1" clearable class="input-item"></f-input>
  </f-space>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')
  const value1 = ref('')
</script>
```

</template>

<template #style>

```html
<style scoped>
.input-item {
  width: 300px;
  margin-right: 20px;
}
</style>
```

</template>

</card>

<card>

## 禁用和只读

设置 `disabled` 可以禁用，设置 `readonly` 可以只读

<template #example>

  <Disabled/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-input v-model="value" placeholder="disabled" disabled class="input-item"></f-input>
    <f-input v-model="value1" placeholder="readonly" readonly class="input-item"></f-input>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('禁用的文字')
  const value1 = ref('只读的输入')
</script>
```

</template>

<template #style>

```html
<style scoped>
.input-item {
  width: 300px;
  margin-right: 20px;
}
</style>
```

</template>

</card>

<card>

## 组合使用

提供两种方式来进行插入图标

<template #example>

  <Group/>
  
</template>

<template #template>

```html
<template>
  <div>
    <p>Props：</p>
    <div>
      <f-input prefix="bulb-fill" clearable placeholder="Enter name" style="width: auto"></f-input>
      &nbsp;
      <f-input suffix="search" clearable placeholder="Enter text" style="width: auto"></f-input>
    </div>
    <p>Slots：</p>
    <div style="margin-top: 6px">
      <f-input placeholder="Enter name" style="width: auto">
        <template #prefix>
          <f-icon name="bulb-fill"></f-icon>
        </template>
      </f-input>
      &nbsp;
      <f-input placeholder="Enter text" clearable style="width: auto">
        <template #suffix>
          <f-icon name="search"></f-icon>
        </template>
      </f-input>
    </div>
    <p>prepend/append：</p>
    <div>
      <f-input placeholder="Enter text" style="width: auto; margin-top: 6px" clearable>
        <template #prepend>
          <f-button>prepend</f-button>
        </template>
      </f-input>
      &nbsp;
      <f-input placeholder="Enter name" style="width: auto; margin-top: 6px" clearable>
        <template #append>
          <f-button>append</f-button>
        </template>
      </f-input>
      &nbsp;
      <f-input placeholder="Enter name" style="width: auto; margin-top: 6px" clearable>
        <template #prepend>
          <f-select v-model="type" clearable style="width: 100px">
            <f-option lable="email" value="email"></f-option>
            <f-option lable="phone" value="phone"></f-option>
          </f-select>
        </template>
        <template #append>
          <f-button>append</f-button>
        </template>
      </f-input>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const type = ref('')
</script>
```

</template>

<template #style>

```html
<style scoped>
.input-item {
  width: 300px;
  margin-right: 20px;
}
</style>
```

</template>

</card>

<card>

## 设置search

可以设置查询状态

<template #example>

  <Search/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-input v-model="value" search placeholder="请输入一些文字..." class="input-item"></f-input>
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

<template #style>

```html
<style scoped>
.input-item {
  width: 300px;
  margin-right: 20px;
}
</style>
```

</template>

</card>

<card>

## 密码框

输入密码的时候默认需要隐藏显示，这里会开启图标提示

<template #example>

  <Password/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-input v-model="value" show-password-toggle type="password" class="input-item"></f-input>
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

<template #style>

```html
<style scoped>
.input-item {
  width: 300px;
  margin-right: 20px;
}
</style>
```

</template>

</card>

<card>

## 不同尺寸

提供额外3种尺寸进行配置 `large` `small` 或 `mini`三种尺寸

<template #example>

  <Size/>
  
</template>

<template #template>

```html
<template>
  <f-row :gutter="10">
    <f-col span="6">
      <f-input size="large" clearable placeholder="large input"></f-input>
    </f-col>
    <f-col span="6">
      <f-input clearable placeholder="default input"></f-input>
    </f-col>
    <f-col span="6">
      <f-input size="small" clearable placeholder="small input"></f-input>
    </f-col>
    <f-col span="6">
      <f-input size="mini" clearable placeholder="mini input"></f-input>
    </f-col>
  </f-row>
</template>
```

</template>

</card>

<card>

## 设置textarea

可以设置 `type="textarea"`开启文本域模式

<template #example>

  <Text/>
  
</template>

<template #template>

```html
<template>
  <div flex="box:mean">
    <div class="input-item">
      <f-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6 }"
        placeholder="自动大小，可拖动，最大行数6"
      ></f-input>
    </div>
    <div class="input-item">
      <f-input type="textarea" :rows="4" placeholder="禁用拖动，默认4行" no-resize></f-input>
    </div>
  </div>
</template>
```

</template>

<template #style>

```html
<style scoped>
.input-item {
  width: 300px;
  margin-right: 20px;
}
</style>
```

</template>

</card>

<card>

## 字数统计

可以设置 `show-word-count`开启字数统计

<template #example>

  <Count/>
  
</template>

<template #template>

```html
<template>
  <div flex="box:mean">
    <div class="input-item">
      <f-input :maxlength="10" show-word-count></f-input>
    </div>
    <div class="input-item">
      <f-input type="textarea" :rows="2" no-resize show-word-count></f-input>
    </div>
  </div>
</template>
```

</template>

<template #style>

```html
<style scoped>
.input-item {
  width: 300px;
  margin-right: 20px;
}
</style>
```

</template>

</card>

## Props

| 参数            | 说明                                                                                  | 类型                        | 可选值                                                  | 默认值  |
| --------------- | ------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------- | ------- |
| type            | 输入框类型                                                                            | string                      | text、password、textarea、url、email、date、number、tel | —       |
| value           | 绑定的值，可使用 v-model 双向绑定                                                     | String / Number             | —                                                       | —       |
| size            | 输入框尺寸                                                                            | large、small、default、mini | —                                                       | default |
| placeholder     | 占位文本                                                                              | String                      | —                                                       | —       |
| clearable       | 是否显示清空按钮                                                                      | Boolean                     | —                                                       | false   |
| disabled        | 禁用状态                                                                              | Boolean                     | —                                                       | false   |
| readonly        | 只读模式                                                                              | Boolean                     | —                                                       | false   |
| maxlength       | 最大输入长度                                                                          | Number                      | —                                                       | —       |
| icon            | 输入框尾部图标，仅在 text 类型下有效                                                  | String                      | —                                                       | —       |
| prefix          | 输入框头部图标                                                                        | String                      | —                                                       | —       |
| suffix          | 输入框尾部图标                                                                        | String                      | —                                                       | —       |
| search          | 是否显示为搜索型输入框                                                                | Boolean                     | —                                                       | false   |
| rows            | 文本域默认行数，仅在 textarea 类型下有效                                              | Number                      | —                                                       | 2       |
| autosize        | 自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 \{ minRows: 2, maxRows: 6 \} | Boolean/Object              | —                                                       | false   |
| number          | 将用户的输入转换为 Number 类型                                                        | Boolean                     | —                                                       | false   |
| autofocus       | 自动获取焦点                                                                          | Boolean                     | —                                                       | false   |
| autocomplete    | 原生的自动完成功能，可选值为 off 和 on                                                | String                      | —                                                       | off     |
| element-id      | 给表单元素设置 id，详见 Form 用法。                                                   | String                      | —                                                       | —       |
| wrap            | 原生的 wrap 属性，可选值为 hard 和 soft，仅在 textarea 下生效                         | String                      | —                                                       | soft    |
| no-resize       | 禁用文本域resize ，仅在 textarea 下生效                                               | Boolean                     | —                                                       | false   |
| show-word-count | 显示文本字数统计，仅在 textarea 下生效                                                | Boolean                     | —                                                       | false   |
| validateEvent   | 是否触发校验，主要为form表单使用，选择框等也使用到input的内部设置为false              | Boolean                     | —                                                       | true    |

## Input events

| 方法名   | 说明                                           | 返回值 |
| -------- | ---------------------------------------------- | ------ |
| enter    | 按下回车键时触发                               | 无     |
| click    | 设置 icon 属性后，点击图标时触发               | 无     |
| change   | 数据改变时触发                                 | event  |
| focus    | 输入框聚焦时触发                               | 无     |
| blur     | 输入框失去焦点时触发                           | 无     |
| keyup    | 原生的 keyup 事件                              | event  |
| keydown  | 原生的 keydown 事件                            | event  |
| keypress | 原生的 keypress 事件                           | event  |
| search   | 开启 search 时可用，点击搜索或按下回车键时触发 | value  |
| clear    | 开启 clearable 时可用，点击清空按钮时触发      | 无     |

## Input slot

| 名称    | 说明                           |
| ------- | ------------------------------ |
| prepend | 前置内容，仅在 text 类型下有效 |
| append  | 后置内容，仅在 text 类型下有效 |
| prefix  | 输入框头部图标                 |
| suffix  | 输入框尾部图标                 |

## Input methods

| 方法名 | 说明           | 返回值 |
| ------ | -------------- | ------ |
| focus  | 手动聚焦输入框 | 无     |
