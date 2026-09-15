---
title: 弹出信息 Popover
---

<script setup>
import Basic from './demo/Popover/Basic.vue'
import Placement from './demo/Popover/Placement.vue'
import InnerClose from './demo/Popover/InnerClose.vue'
import More from './demo/Popover/More.vue'
import Confirm from './demo/Popover/Confirm.vue'
</script>

气泡类型的弹窗，用于放置更多信息或询问流程等

<card>

## 基础用法

<template #example>

  <Basic/>

</template>

<template #template>

```html
<template>
  <div>
    <f-popover trigger="hover" title="Title" content="这是一段内容这是一段内容这是一段内容">
      <f-button>Hover</f-button>
    </f-popover>
    <f-popover
      trigger="click"
      title="Title"
      content="这是一段内容这是一段内容这是一段内容"
      :z-index="1000"
    >
      <f-button>Click</f-button>
    </f-popover>
    <f-popover trigger="focus" title="Title" content="这是一段内容这是一段内容这是一段内容">
      <f-button>Focus</f-button>
    </f-popover>
  </div>
</template>
```

</template>

</card>

<card>

## 多种悬停位置

使用 `placement` 来设置不同的悬停位置

<template #example>

  <Placement/>

</template>

<template #template>

```html
<template>
  <div class="demo-popover">
    <div class="top">
      <f-popover title="Title" content="Top Left text" placement="top-start">
        <f-button>上左</f-button>
        &nbsp;&nbsp;
      </f-popover>
      <f-popover title="Title" content="Top Center text" placement="top">
        <f-button>上边</f-button>
        &nbsp;&nbsp;
      </f-popover>
      <f-popover title="Title" content="Top Right text" placement="top-end">
        <f-button>上右</f-button>
      </f-popover>
    </div>
    <div class="center">
      <div class="center-left">
        <f-popover title="Title" content="Left Top text" placement="left-start">
          <f-button>左上</f-button>
        </f-popover>
        <br />
        <br />
        <f-popover title="Title" content="Left Center text" placement="left">
          <f-button>左边</f-button>
        </f-popover>
        <br />
        <br />
        <f-popover title="Title" content="Left Bottom text" placement="left-end">
          <f-button>左下</f-button>
        </f-popover>
      </div>
      <div class="center-right">
        <f-popover title="Title" content="Right Top text" placement="right-start">
          <f-button>右上</f-button>
        </f-popover>
        <br />
        <br />
        <f-popover title="Title" content="Right Center text" placement="right">
          <f-button>右边</f-button>
        </f-popover>
        <br />
        <br />
        <f-popover title="Title" content="Right Bottom text" placement="right-end">
          <f-button>右下</f-button>
        </f-popover>
      </div>
    </div>
    <div class="bottom">
      <f-popover title="Title" content="Bottom Left text" placement="bottom-start">
        <f-button>下左</f-button>
        &nbsp;&nbsp;
      </f-popover>
      <f-popover title="Title" content="Bottom Center text" placement="bottom">
        <f-button>下边</f-button>
        &nbsp;&nbsp;
      </f-popover>
      <f-popover title="Title" content="Bottom Right text" placement="bottom-end">
        <f-button>下右</f-button>
      </f-popover>
    </div>
  </div>
</template>
```

</template>

<template #style>

```html
<style scoped>
.demo-popover {
  .top,
  .bottom {
    text-align: center;
  }
  .center {
    width: 300px;
    margin: 10px auto;
    overflow: hidden;
    .center-left {
      float: left;
    }
    .center-right {
      float: right;
    }
  }
}
</style>
```

</template>

</card>

<card>

## 浮层内关闭

<template #example>

  <InnerClose/>

</template>

<template #template>

```html
<template>
  <f-popover v-model:visible="visible">
    <f-button type="text" @click="close">点我打开浮层</f-button>
    <a style="margin-left: 30px">Click</a>
    <template #content>
      <f-button type="text" @click="close">关闭</f-button>
    </template>
  </f-popover>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
function close() {
  visible.value = false
}
</script>
```

</template>

</card>

<card>

## 更多内容

<template #example>

  <More/>

</template>

<template #template>

```html
<template>
  <div>
    <f-popover placement="top" width="200px">
      <f-button>长文本</f-button>
      <template #content>
        <div>这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述</div>
      </template>
    </f-popover>
    <f-popover placement="right" width="300px">
      <f-button>更多内容</f-button>
      <template #content>
        <div>这是自定义内容~这是自定义内容~这是自定义内容~这是自定义内容~</div>
        <div>这是自定义内容~这是自定义内容~这是自定义内容~这是自定义内容~</div>
      </template>
    </f-popover>
  </div>
</template>
```

</template>

</card>

<card>

## 确认气泡框

通过设置属性confirm开启确认框模式。确认框只会以 click 的形式激活，并且只会显示 title 的内容，忽略 content。

<template #example>

  <Confirm/>

</template>

<template #template>

```html
<template>
  <f-popover v-model:visible="visible" :width="240">
    <f-button type="danger" plain>确认气泡框</f-button>
    <template #content>
      <p>
        <f-icon name="question-circle" size="16" color="#ff4757"></f-icon>
        Are you sure delete this item?
      </p>
      <div style="text-align: right; margin-top: 4px">
        <f-button size="mini" type="text" @click="cancel">取消</f-button>
        <f-button type="primary" size="mini" @click="ok">确定</f-button>
      </div>
    </template>
  </f-popover>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from 'fei-ui-design'

const visible = ref(false)

function ok() {
  visible.value = false
  Message('点击了 [确定]')
}
function cancel() {
  visible.value = false
  Message('点击了 [取消]')
}
</script>
```

</template>

</card>

## Props

除下列属性外，Popover 还继承全部 Popper 公共属性（见下方「Popper 公共属性」）。

| 参数            | 说明                                       | 类型          | 可选值 | 默认值         |
| --------------- | ------------------------------------------ | ------------- | ------ | -------------- |
| trigger         | 触发方式                                   | string        | hover（悬停）/ click（点击）/ contextmenu（右键）/ manual（手动） | click          |
| title           | 标题                                       | string        | —      | —              |
| content         | 显示的内容                                 | string        | —      | —              |
| width           | 宽度                                       | string/number | —      | 150            |
| transition      | 自定义渐变动画                             | string        | —      | fade-in-linear |
| z-index         | 层级，弹窗会自增，如设置了此值则在其基础上自增 | number        | —      | 0              |
| visible         | 状态是否可见（配合 `v-model:visible` 使用） | boolean       | —      | —              |

## Popper Props

以下属性由 `_internal/popper` 提供，Popover / Tooltip / Dropdown 等浮层组件共用。

| 参数                  | 说明                                        | 类型    | 可选值                            | 默认值         |
| --------------------- | ------------------------------------------- | ------- | --------------------------------- | -------------- |
| placement             | 提示框出现的位置                            | string  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top            |
| theme                 | 主题                                        | string  | dark / light                      | dark           |
| offset                | 出现位置的偏移量                            | number  | —                                 | 12             |
| arrow-offset          | 箭头的偏移量                                | number  | —                                 | 4              |
| show-arrow            | 是否显示箭头                                | boolean | —                                 | true           |
| append-to-body        | 是否将弹层放置于 body 内                    | boolean | —                                 | true           |
| disabled              | 是否禁用                                    | boolean | —                                 | false          |
| manual-mode           | 手动控制模式，为 true 时鼠标进入 / 移出事件不生效 | boolean | —                              | false          |
| open-delay            | 延迟出现，单位毫秒                          | number  | —                                 | 0              |
| close-delay           | 延迟消失，单位毫秒                          | number  | —                                 | 200            |
| show-after            | 显示后的延时，单位毫秒                      | number  | —                                 | 0              |
| hide-after            | 隐藏后的延时，单位毫秒                      | number  | —                                 | 0              |
| popper-class          | 自定义浮层类名                              | string  | —                                 | ''             |
| popper-options        | popper.js 参数，具体参考 popper.js 文档     | object  | —                                 | null           |
| boundaries-padding    | 边界内边距                                  | number  | —                                 | 0              |
| gpu-acceleration      | 是否开启 GPU 加速                           | boolean | —                                 | true           |
| stop-popper-mouse-event | 是否阻止浮层上的鼠标事件                  | boolean | —                                 | true           |
| strategy              | 定位策略                                    | string  | fixed / absolute                  | fixed          |
| style                 | 浮层的行内样式                              | object  | —                                 | —              |
| cutoff                | 浮层内容超出可视区域时是否裁剪              | boolean | —                                 | false          |
| pure                  | 是否开启纯净模式（去掉默认样式）            | boolean | —                                 | false          |

## Slots

| 名称    | 说明                                                 |
| ------- | ---------------------------------------------------- |
| content | 提示框的内容，定义此 slot 时，会覆盖 props content。 |
