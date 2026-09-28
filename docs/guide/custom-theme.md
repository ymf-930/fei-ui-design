---
title: 调整主题
---

<script setup>
import Basic from './demo/Theme/Basic.vue'
</script>

<card>

FEI-UI-DESIGN 的主题由一组 CSS 变量（Design Token）驱动，全部以 `--fei-` 前缀命名。
调整主题有两种方式：

1. **组件内覆盖**：用 [`FConfigProvider`](/components/config-provider) 传递 `theme`，只影响其子树；
2. **全局覆盖**：直接覆盖 CSS 变量，需要自行引入全量样式。

两种方式都**不需要**写 Sass、Less 或 Stylus。默认情况下所有组件均为亮色主题，无需任何配置。

## 调整主题变量

`FConfigProvider` 的 `theme` 使用**小驼峰**键名，组件库会把它转换为对应的 CSS 变量：

| `theme` 键名 | 生成的 CSS 变量 |
| --- | --- |
| `feiColorPrimary` | `--fei-color-primary` |
| `feiColorSuccess` | `--fei-color-success` |
| `feiBgColor1` | `--fei-bg-color-1` |
| `feiFontSizeDefault` | `--fei-font-size-default` |

即：在变量名去掉 `--` 前缀后，把 `-x` 转成大写字母 `X`。

当覆盖的是主色(`feiColorPrimary`、`feiColorSuccess`、`feiColorWarning`、`feiColorDanger`、`feiColorInfo`)时，
组件库会自动派生 `-light1` ~ `-light6` 与 `-active` 色板，因此只需要给出一个主色值即可。

<template #example>

<Basic/>

</template>

<template #template>

```vue
<template>
  <f-config-provider
    :theme="{
      feiColorPrimary: '#722ed1',
      feiColorSuccess: '#13c2c2',
      feiColorWarning: '#e14c19',
      feiColorDanger: '#d42a87'
    }"
  >
    <div>
      <div>[default]默认按钮</div>
      <div class="demo-button">
        <f-button type="primary">Primary</f-button>
        <f-button type="success">Success</f-button>
        <f-button type="warning">Warning</f-button>
        <f-button type="danger">Danger</f-button>
      </div>
      <div>[plain]简约按钮</div>
      <div class="demo-button">
        <f-button type="primary" plain>Primary</f-button>
        <f-button type="success" plain>Success</f-button>
        <f-button type="warning" plain>Warning</f-button>
        <f-button type="danger" plain>Danger</f-button>
      </div>
      <div>[round]圆角按钮</div>
      <div class="demo-button">
        <f-button type="primary" round>Primary</f-button>
        <f-button type="success" round>Success</f-button>
        <f-button type="warning" round>Warning</f-button>
        <f-button type="danger" round>Danger</f-button>
      </div>
      <div>[dashed]虚线按钮</div>
      <div class="demo-button">
        <f-button type="primary" dashed>Primary</f-button>
        <f-button type="success" dashed>Success</f-button>
        <f-button type="warning" dashed>Warning</f-button>
        <f-button type="danger" dashed>Danger</f-button>
      </div>
    </div>
  </f-config-provider>
</template>
```

</template>

<template #style>

```vue
<style scoped>
.demo-button {
  margin: 8px 0;
}
</style>
```

</template>

</card>

<card>

## 直接覆盖 CSS 变量

如果希望影响整个应用，可以直接覆盖 CSS 变量。变量定义在
`src/_styles/base/vars.css`，编译后输出为 `dist/styles/base.css`。

```css
/* 引入全量样式后，在自己的样式表中覆盖即可 */
@import 'fei-ui-design/styles/index.css';

:root {
  --fei-color-primary: #722ed1;
  --fei-border-radius-default: 8px;
  --fei-font-size-default: 15px;
}
```

> 覆盖主色时建议同时手动给出派生色板(`--fei-color-primary-light1` ~ `-light6`、`-active`)，
> 否则 hover / active 等状态仍会使用旧色板。使用 `FConfigProvider` 则会自动派生，更省事。

## 暗色主题

通过 `theme-name` 切换明暗主题，组件库的样式会读取 `html` 上的 `theme-name` 属性：

```vue
<template>
  <!-- 只影响子树 -->
  <f-config-provider theme-name="dark">
    <f-button type="primary">暗色模式</f-button>
  </f-config-provider>

  <!-- 或全局生效（写入 html 节点） -->
  <f-config-provider abstract theme-name="dark">
    <router-view />
  </f-config-provider>
</template>
```

</card>

<card>

## 变量清单

以下是常用的全局变量，完整清单见 `src/_styles/base/vars.css`。

### 语义色

| 变量 | 说明 |
| --- | --- |
| `--fei-color-primary` | 主色 |
| `--fei-color-success` | 成功色 |
| `--fei-color-warning` | 警告色 |
| `--fei-color-danger` | 危险色 |
| `--fei-color-info` | 信息色 |

每个语义色都会派生 `-light1` ~ `-light6`（逐级变浅）与 `-active`（加深）。

### 文字色

| 变量 | 说明 |
| --- | --- |
| `--fei-text-color-1` ~ `--fei-text-color-4` | 由深到浅的四档文字色 |
| `--fei-color-text-primary` | 主文字色（默认取 `text-color-1`） |
| `--fei-color-text-default` | 常规文字色 |
| `--fei-color-text-secondary` | 次要文字色 |
| `--fei-color-text-disabled` | 禁用文字色 |
| `--fei-color-text-placeholder` | 占位文字色 |

### 背景与填充

| 变量 | 说明 |
| --- | --- |
| `--fei-bg-color-1` ~ `--fei-bg-color-4` | 由深到浅的四档背景色 |
| `--fei-fill-color-1` ~ `--fei-fill-color-4` | 四档填充色 |
| `--fei-color-bg-disabled` | 禁用态背景 |
| `--fei-color-select-hover` | 选择项 hover 背景 |

### 边框与圆角

| 变量 | 说明 |
| --- | --- |
| `--fei-border-color-base` | 基础边框色 |
| `--fei-border-color-light` | 浅边框色 |
| `--fei-border-base` | 基础边框（简写，含宽度与颜色） |
| `--fei-border-radius-default` | 默认圆角 |
| `--fei-border-radius-medium` / `--fei-border-radius-large` | 中 / 大圆角 |

### 字体与尺寸

| 变量 | 说明 |
| --- | --- |
| `--fei-font-family` | 字体族 |
| `--fei-font-size-large` / `--fei-font-size-default` / `--fei-font-size-small` | 三档字号 |
| `--fei-base-line-height` | 基础行高 |
| `--fei-large-height` / `--fei-default-height` / `--fei-small-height` / `--fei-mini-height` | 控件四档高度 |

### 动效与阴影

| 变量 | 说明 |
| --- | --- |
| `--fei-animation-duration-base` / `--fei-animation-duration-slow` | 动画时长 |
| `--fei-shadow-down` | 向下阴影 |
| `--fei-shadow-popper` | 弹层阴影 |
| `--fei-scrollbar-width` / `--fei-scrollbar-color` / `--fei-scrollbar-radius` | 滚动条 |

另有 `--fei-menu-*`、`--fei-page-*`、`--fei-table-*`、`--fei-tag-*`、`--fei-popper-*`
等组件级变量，可按需覆盖。

</card>
