---
title: 单选框 Radio
PROPS:
  - name: color
    type: String
    values: Vuesax Colors, RGB, HEX
    description: Change the color of the radio.
    default: primary
    link: null
    usage: '#color'
    code: >
            <vs-radio success v-model="picked" val="2">
              Success
            </vs-radio>

  - name: disabled
    type: Boolean
    values: true,false
    description: Determine if the component is in the disabled state.
    default: false
    link: null
    usage: '#default'
    code: >
            <vs-radio disabled v-model="picked" val="3">
              Option C
            </vs-radio>

  - name: loading
    type: Boolean
    values: true,false
    description: Determine if the component has a loading animation and is disabled.
    default: false
    link: null
    usage: '#loading'
    code: >
            <vs-radio loading v-model="picked" val="1">
              Option 1
            </vs-radio>

  - name: val
    type: String
    values: String
    description: Determine the value of the radio input.
    default: null
    link: null
    usage: '#default'
    code: >
            <vs-radio v-model="picked" val="1">
              Option A
            </vs-radio>

SLOTS:
  - name: default
    type: slot
    values: null
    description: Add a label to the component.
    default: null
    link: null
    usage: '#label'
    code: >
            <vs-radio v-model="picked" val="1">
              Label
            </vs-radio>
  - name: icon
    type: slot
    values: null
    description: Add an icon inside the radio.
    default: null
    link: null
    usage: '#icon'
    code: >
            <vs-radio v-model="picked" val="1">
              Yen
              <template #icon>
                <i class='bx bx-yen' ></i>
              </template>
            </vs-radio>

NEWS:
  - loading
  - icon
  - label
---

<script setup>
import Basic from './demo/Radio/Basic.vue'
import Group from './demo/Radio/Group.vue'
import Disabled from './demo/Radio/Disabled.vue'
import ButtonType from './demo/Radio/ButtonType.vue'
import CapsuleType from './demo/Radio/CapsuleType.vue'
</script>

##### 单选框。主要用于一组可选项单项选择，或者单独用于切换到选中状态。

<card>

## 基础用法

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-radio v-model="single">Radio</f-radio>
  <span style="color: #ff4511">{{ single }}</span>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const single = ref(false)
</script>
```

</template>

</card>

<card>

## 组合使用

<template #example>

  <Group/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-radio-group v-model="social">
      <f-radio label="twitter">
        <span>Twitter</span>
      </f-radio>
      <f-radio label="facebook">
        <span>Facebook</span>
      </f-radio>
      <f-radio label="github">
        <span>Github</span>
      </f-radio>
      <f-radio label="snapchat">
        <span>Snapchat</span>
      </f-radio>
    </f-radio-group>
    <p style="color: #ff4511; margin: 5px 0">{{ social }}</p>
    <f-radio-group v-model="fruit">
      <f-radio label="香蕉"></f-radio>
      <f-radio label="苹果"></f-radio>
      <f-radio label="西瓜"></f-radio>
    </f-radio-group>
    <p style="color: #ff4511; margin: 5px 0">{{ fruit }}</p>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const social = ref('facebook')
  const fruit = ref('苹果')
</script>
```

</template>

</card>


<card>

## 禁用状态

设置 `disabled` 可以禁用单选组或者某个单选值

<template #example>

  <Disabled/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-radio v-model="disabledSingle" disabled>Checkbox</f-radio>
    <f-radio-group v-model="disabledGroup">
      <f-radio label="香蕉" disabled></f-radio>
      <f-radio label="苹果" disabled></f-radio>
      <f-radio label="西瓜"></f-radio>
    </f-radio-group>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const disabledSingle = ref(true)
  const disabledGroup = ref('苹果')
</script>
```

</template>

</card>

<card>

## 按钮类型

设置 `type="button"` 可以设置单选框为按钮类型

<template #example>

  <ButtonType/>
  
</template>

<template #template>

```html
<template>
  <div flex>
    <div>
      <f-radio-group v-model="fruit" type="button">
        <f-radio label="香蕉"></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
      <div class="p10" />
      <f-radio-group v-model="fruit" type="button" size="small">
        <f-radio label="香蕉"></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
      <div class="p10" />
      <f-radio-group v-model="fruit" type="button" size="mini">
        <f-radio label="香蕉"></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
    </div>
    <div style="margin-left: 24px">
      <f-radio-group v-model="fruit" type="button">
        <f-radio label="香蕉" disabled></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
      <br />
      <f-radio-group v-model="fruit" type="button" disabled>
        <f-radio label="香蕉" disabled></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const fruit = ref('苹果')
</script>
```

</template>

</card>


<card>

## 胶囊类型

设置 `type="capsule"` 可以设置单选框为胶囊类型

<template #example>

  <CapsuleType/>
  
</template>

<template #template>

```html
<template>
  <div flex>
    <div>
      <f-radio-group v-model="fruit" type="capsule">
        <f-radio label="香蕉"></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="桃子"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
      <div class="p10" />
      <f-radio-group v-model="fruit" type="capsule" size="small">
        <f-radio label="香蕉"></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="桃子"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
      <div class="p10" />
      <f-radio-group v-model="fruit" type="capsule" size="mini">
        <f-radio label="香蕉"></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="桃子"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
    </div>

    <div style="margin-left: 24px">
      <f-radio-group v-model="fruit" type="capsule">
        <f-radio label="香蕉" disabled></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="桃子"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
      <div class="p10" />
      <f-radio-group v-model="fruit" type="capsule" disabled>
        <f-radio label="香蕉" disabled></f-radio>
        <f-radio label="苹果"></f-radio>
        <f-radio label="桃子"></f-radio>
        <f-radio label="西瓜"></f-radio>
      </f-radio-group>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'
  const fruit = ref('苹果')
</script>
```

</template>

</card>

## Props

| 参数     | 说明                                                            | 类型                  | 可选值 | 默认值 |
| -------- | --------------------------------------------------------------- | --------------------- | ------ | ------ |
| value    | 只在单独使用时有效。可以使用 v-model 双向绑定数据               | Boolean               | —      | false  |
| label    | 组合使用时有效。指定当前选项的 value 值，组合会自动判断是否选中 | String/Number/Boolean | —      | —      |
| disabled | 是否禁用当前项                                                  | Boolean               | —      | false  |

## Radio events

| 事件名 | 说明                                                                     | 返回值 |
| ------ | ------------------------------------------------------------------------ | ------ |
| change | 在选项状态发生改变时触发，返回当前状态。通过修改外部的数据改变时不会触发 | ...    |

## RadioGroup props

| 参数     | 说明                                              | 类型           | 可选值                | 默认值 |
| -------- | ------------------------------------------------- | -------------- | --------------------- | ------ |
| value    | 指定选中项目的集合，可以使用 v-model 双向绑定数据 | String/ Number | —                     | ''     |
| disabled | 是否禁用所有选项                                  | Boolean        | —                     | false  |
| type     | 是否开启button模式                                | String         | button /capsule       | —      |
| size     | 按钮模式单选组的尺寸                              | String         | large、small、default | —      |

### RadioGroup events

| 事件名 | 说明                                                                         | 返回值 |
| ------ | ---------------------------------------------------------------------------- | ------ |
| change | 在选项状态发生改变时触发，返回已选中的数组。通过修改外部的数据改变时不会触发 | ...    |
