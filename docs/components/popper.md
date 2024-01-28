---
title: 弹层 Popper
---

<script setup>
import Basic from './demo/Popper/Basic.vue'
import ColumnSelect from './demo/Popper/ColumnSelect.vue'
</script>

##### popper借助了第三方插件<a href="https://popper.js.org/" target="_blank">popper.js</a>，可参考文档进行配置，组件内部弹层都借助此基础组件实现，你也可以自行编写扩展。

<card>

## 基础用法

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 200px">
    <f-popper trigger="click" theme="light" :z-index="1000">
      <template #default>这是一段内容这是一段内容这是一段内容</template>
      <template #trigger>
        <f-button>触发popper</f-button>
      </template>
    </f-popper>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>
```

</template>

</card>

<card>

## 选择列

<template #example>

  <ColumnSelect/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div style="width: 200px">
      <f-popper
        trigger="click"
        theme="light"
        :show-arrow="false"
        :offset="4"
        placement="bottom-start"
        transition="zoom-in-top"
        popper-class="fei-select__popper"
        :gpu-acceleration="false"
      >
        <template #default>
          <div style="width: 120px">
            <div style="padding: 8px 10px 10px; border-bottom: 1px solid #eee">选择列</div>
            <div v-for="(item, index) in list" :key="index" style="padding: 4px 8px">
              <f-checkbox v-model="item.checked">{{ item.name }}</f-checkbox>
            </div>
          </div>
        </template>
        <template #trigger>
          <f-button>选择列</f-button>
        </template>
      </f-popper>
    </div>

    <pre style="margin-top: 10px; background-color: transparent;">{{ list }}</pre>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const list = ref([
  { name: '姓名', checked: false },
  { name: '年龄', checked: false },
  { name: '电话', checked: false },
  { name: '性别', checked: false },
  { name: '地址', checked: false },
  { name: '备注', checked: false }
])
</script>
```

</template>

</card>

## Props

| 参数                    | 说明                                                     | 类型                                                                           | 可选值                                                                                                    | 默认值         |
| ----------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | -------------- |
| v-model:visible         | 状态是否可见                                             | Boolean                                                                        | —                                                                                                         | false          |
| trigger                 | 触发方式                                                 | string                                                                         | hover（悬停）click（点击）focus（聚焦）                                                                   | click          |
| appendToBody            | 是否将弹层放置于 body 内                                 | Boolean                                                                        | —                                                                                                         | false          |
| placement               | 提示框出现的位置                                         | string                                                                         | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | —              |
| disabled                | 是否禁用提示框                                           | Boolean                                                                        | —                                                                                                         | false          |
| transition              | 自定义渐变动画，自定义动画后需要关闭硬件加速，否则不生效 | string                                                                         | —                                                                                                         | fade-in-linear |
| gpu-acceleration        | gpu加速，默认动画，                                      | Boolean                                                                        | —                                                                                                         | true           |
| stop-popper-mouse-event | 是否阻止popper的mouse事件                                | Boolean                                                                        | —                                                                                                         | true           |
| show-arrow              | 是否显示箭头                                             | Boolean                                                                        | —                                                                                                         | true           |
| manual-mode             | 是否是手动控制，手动控制后需要设置:visible               | Boolean                                                                        | —                                                                                                         | true           |
| theme                   | 主题                                                     | string                                                                         | dark 或 light                                                                                             | dark           |
| show-after              | 延迟出现，单位毫秒                                       | number                                                                         | —                                                                                                         | 0              |
| close-delay             | 延迟消失，单位毫秒                                       | number                                                                         | —                                                                                                         | 0              |
| offset                  | 出现位置的偏移量                                         | Number                                                                         | —                                                                                                         | 12             |
| arrow-offset            | 箭头偏移                                                 | Number                                                                         | —                                                                                                         | 5              |
| class                   | 触发器class                                              | string                                                                         | —                                                                                                         | —              |
| popper-class            | 弹层的额外class                                          | string                                                                         | —                                                                                                         | —              |
| popper-options          | 弹层的额外options，可参考官网，一般不需要额外设置        | Object                                                                         | —                                                                                                         | —              |
| z-index                 | 层级                                                     | Number，默认为2000，弹窗会自增，如设置了此值，则会追加当前值后进行自增进行自增 | —                                                                                                         | 0              |
| style                   | 弹层的style                                              | Object                                                                         | —                                                                                                         | —              |

## Slot

| 名称    | 说明                                                                     |
| ------- | ------------------------------------------------------------------------ |
| default | 弹层内容插槽，必须，可扩展很多业务实现                                   |
| trigger | 触发插槽，必须，切必须使用一个dom 或者 component组件插入，因为要监听事件 |
