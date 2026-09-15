# 组件文档编写规范

> 本文是 `docs/` 下所有文档的**唯一格式基准**。新增或修改组件文档前请先通读第 2、3 节；
> 第 5 节的自动检查会在 CI 中阻断不合格的提交。
>
> 内部文档（本文件及同目录其它文件）由 `srcExclude` 排除，不会出现在线上站点。

---

## 1. 文件组织

```
docs/
├─ components/
│  ├─ <kebab-name>.md          # 组件文档，文件名一律 kebab-case
│  └─ demo/
│     └─ <PascalName>/         # 示例目录，一律 PascalCase，与组件 name 前缀 F 去掉后一致
│        ├─ Basic.vue
│        └─ ...
├─ guide/                       # 指南类文档
└─ .internal/                   # 内部文档（不进站点）
```

- 组件文档名 = `src/<dir>` 的目录名（`src/date-picker` → `date-picker.md`）。
- demo 目录名 = 组件导出名去掉 `F` 前缀（`FDatePicker` → `DatePicker/`）。
- **不再新增**与组件目录同名的 `index.md` 概览页；概览统一放在 `docs/components/index.md`。

---

## 2. 页面结构

每个组件文档按以下顺序组织，**存在才写，不存在就跳过**，不要为了凑齐而写空章节：

| 顺序 | 章节 | 说明 |
| --- | --- | --- |
| 1 | frontmatter | 至少包含 `title`，格式 `中文名 EnglishName`，如 `title: 日期选择器 DatePicker` |
| 2 | 导语 | **普通段落**，一段话说明组件用途，可配一行「使用场景」。**不要复制其它组件的导语** |
| 3 | 示例小节 | 每个 `##` 小节一个功能点，标题用中文动词短语（如「基础用法」「禁用状态」） |
| 4 | API 章节 | 见第 3 节 |

### 导语写法

主题会根据 frontmatter 的 `title` 自动渲染页面主标题
（`<h1 id="header-title">`，见 `theme/components/Page.vue`），因此：

- 导语**必须写成普通段落**，不要用 `#####`、`#` 等标题包裹。
  用标题会让页面大纲变成 `H1 → H5 → H2`（跳级且层级倒置），也会污染锚点。
- **不要**在正文里再写一次 `# 组件名`，那会和自动渲染的主标题产生两个 `<h1>`。
- 导语与第一个 `<card>` 之间保留一个空行；主题已为「段落 + 卡片」配好间距
  （见 `theme/global-components/card.vue` 的 `p + .card` 规则）。

```md
---
title: 警告提示 Alert
---

<script setup>
import Basic from './demo/Alert/Basic.vue'
</script>

静态的展示一些区块，提示或者警告，可以动态的去删除。

<card>

## 基础用法
```


示例小节统一使用 `<card>` 包裹：

```md
## 基础用法

<card>

<template #example>

<Basic />

</template>

<template #template>

<<< @/components/demo/DatePicker/Basic.vue

</template>

</card>
```

> `<<<` 是 VitePress 的代码片段导入语法，路径以 `@` 开头（对应 `docs/`）。
> **要求**：`<template #example>` 里引用的组件必须在文件顶部有 `import`。

---

## 3. API 章节命名（强制）

章节名一律使用 **英文复数** 形式，且多组件文档需带组件名前缀：

| 内容 | 标准章节名 | 多子组件示例 |
| --- | --- | --- |
| 属性 | `## Props` | `## Row Props` / `## Col Props` |
| 事件 | `## Events` | `## Menu Events` / `## Submenu Events` |
| 方法（通过 ref 调用） | `## Methods` | `## Tree Methods` |
| 插槽 | `## Slots` | `## CascaderPanel Slots` |
| 嵌套对象字段 | `## <对象名> 配置项` | `## Cascader props 配置项` / `## Day 日期对象` |

### 禁止的写法

| ❌ 不推荐 | ✅ 应改为 |
| --- | --- |
| `## Slot` | `## Slots` |
| `## Attributes` / `## 属性` | `## Props` |
| `## 事件` / `## 方法` | `## Events` / `## Methods` |
| `## TreeSelect 属性` / `## TreeSelect 事件` | `## TreeSelect Props` / `## TreeSelect Events` |
| `## Popper 公共属性` | `## Popper Props` |
| `## Select props` / `## Table slot`（小写） | `## Select Props` / `## Table Slots` |
| `## ItemProps` / `## ItemSlot`（无空格、单数） | `## Item Props` / `## Item Slots` |
| `## Menu-Item Props`（名称带连字符） | `## MenuItem Props`（与组件导出名一致） |
| `## FormItem Scoped Slot` | `## FormItem Scoped Slots` |

> 唯一的例外是 `## <对象名> 配置项`：当某个 prop（如 cascader 的 `props`）
> 本身是一个对象、其字段需要单独列表时使用。

### 示例小节不要长得像 API 章节

示例小节（带 `<template #example>`）的标题用**中文动词短语**描述这个例子演示什么。
像 `## 其他参数`、`## 更多参数`、`## 指令事件` 这类标题会让读者误以为是 API 表，
同时也会干扰第 5 节的自动检查，应改成具体描述，例如
`## 自定义配置`、`## 段落数量`、`## 监听指令事件`。

---

## 4. 表格规范

### 4.1 Props 表

固定五列，顺序不可变：

```md
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value | 绑定值，配合 `v-model` 使用 | `string` | — | `''` |
```

- **参数名**：一律 kebab-case，与源码 prop 名一一对应（`modelValue` → `model-value`）。
- **类型**：小写（`string` / `number` / `boolean` / `array` / `object` / `function`），
  多类型用 ` \| ` 分隔。
- **可选值**：无枚举时写 `—`（U+2014 单个），不要写 `-`、`无`、`--`。
- **默认值**：无默认值时写 `—`；有默认值时按源码填，字符串/表达式加反引号。
  - 布尔值统一 `false` / `true`（不要 `False`）。
  - 对象/数组写 `{}` / `[]`，函数写 `() => true` 这种可读形式。
- **`v-model` 的写法**：参数列写 `model-value / v-model`，说明列注明「配合 `v-model` 使用」。
  **不要**单独开一行 `| v-model | ... |`（`v-model` 是模板语法糖，不是 prop 名）。
- 已废弃的旧写法（如 Vue2 时代的 `value`）如需保留，须在说明列注明「已废弃，推荐使用 `model-value`」。

### 4.2 Events 表

固定三列：

```md
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | `v-model` 绑定的值变化时触发 | 当前值 |
| change | 值改变时触发 | 改变后的值 |
```

- 事件名保留源码原样：`update:modelValue` 用驼峰，自定义事件用 kebab-case。
- `update:modelValue` 必须出现在每个支持 `v-model` 的组件的 Events 表中。
- **内部事件不要写进文档**：mitt 总线事件（如 steps 的 `append`/`remove`）、
  子节点广播（如 cascader 的 `expand`/`check`）、内部子组件的原生透传（如 `click`）
  都不属于对外 API。

### 4.3 Methods 表

固定三列，方法名用驼峰：

```md
| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| clearFiles | 清空已上传的列表 | — |
```

### 4.4 Slots 表

两列，插槽名 / 说明：

```md
| 名称 | 说明 |
| --- | --- |
| default | 默认内容 |
| title | 标题内容 |
```

---

## 5. 文字与格式

- **产品名**：品牌展示用 `FEI-UI-DESIGN`；代码、包名、配置项一律 `fei-ui-design`。
- **标点**：正文用中文全角标点（，。：；），代码、路径、参数名内外用反引号包裹，
  代码内用半角标点。
- **术语**：`Props` / `Events` / `Slots` / `Methods` 等章节名保留英文；
  正文中「属性」「事件」用中文。
- **代码围栏**：必须标注语言，允许的标记为
  `vue` / `ts` / `js` / `html` / `css` / `bash` / `json` / `md` / `diff` / `text` / `scss` / `stylus`。
  不要用别名（`typescript` 写 `ts`、`sh` 写 `bash`）。
  纯代码片段导入用 `<<< @/...`。
- **行内代码**：所有 prop 名、事件名、类型、字面量都要加反引号。
- **括号**：一对括号要么都是半角、要么都是全角，由其**内容**决定——
  内容含中文用全角 `（…）`（如 `色彩设计（Design Token）`），
  内容全为英文/代码用半角 `(…)`（如 `Function(a, b)`）。
  **不要出现 `(…)` 这种半角开、全角闭的混搭**。
- **代码里一律半角**：`.md` 中的 `<script setup>` 块、HTML 标签语法（属性名、指令）必须是半角标点。
  全角标点只允许出现在**字符串字面量与字符串要展示的文案**里，
  例如 `Message('普通的消息提示！')`、`placeholder="禁用拖动，默认4行"` 是合法的；
  而 `console.log（'x'）` 会直接导致构建失败。
- **中英文之间加空格**：`支持 Vue 3` 而不是 `支持Vue3`。
- **句号**：中文句子结尾用 `。`，不要用半角 `.`（`文档.md` 这类中英混合名除外）。
- **导语不可复制**：每个组件的导语必须描述该组件本身，出现跨组件重复文案视为缺陷。
- **指南文档同样适用**：`docs/guide/*.md` 也由主题自动渲染 `<h1 id="header-title">`，
  同样**不要**手写 `# 标题`。

---

## 6. 自动检查

以下脚本在 CI 中运行，**失败即阻断合并**：

| 命令 | 作用 |
| --- | --- |
| `npm run docs:check-api` | 比对 API 表与源码 `defineProps`/`emits`，报告缺失 props、多余 props、默认值不符、缺失事件 |
| `npm run docs:check-links` | 检查内部链接、`<card>` 引用、demo import 是否可解析 |
| `npm run docs:check-demo` | 检查 demo 目录与文档的对应关系、孤儿 demo |
| `npm run docs:check-style` | 检查第 2/3/5 节的格式规范：重复 H1、标题级导语、中文半角标点、括号半全角混搭、围栏语言标记、**代码块内的全角标点** |
| `npm run docs:check` | 依次执行以上四项 |
| `npm run build:site` | `ignoreDeadLinks: false`，任何死链都会使构建失败 |

`docs:check-api` 中已人工核对并登记的白名单见脚本内 `KNOWN_EXCEPTIONS` /
`INTERNAL_EMITS` / `DERIVED_DEFAULTS` 三张表。**新增白名单必须写明理由**，
并在 PR 描述中附上源码核对结论。

---

## 7. 提交前自检清单

- [ ] 章节名符合第 3 节（`Props` / `Events` / `Methods` / `Slots`）
- [ ] Props 表五列齐全，参数名 kebab-case，与源码一致
- [ ] 默认值与源码一致（`default: () => []` 要写成 `[]` 而不是 `{}`）
- [ ] 支持 `v-model` 的组件已列出 `model-value` 与 `update:modelValue`
- [ ] 没有把内部事件写进 Events 表
- [ ] 导语是本组件独有的，没有复制粘贴
- [ ] 没有手写 `# 标题`，导语也没有用标题包裹
- [ ] 括号半全角成对，中文后不用半角 `,` `;` `:`
- [ ] 代码块标注了语言（`vue` / `ts` / `js` / `html` / `css` / `bash`）
- [ ] `npm run docs:check` 与 `npm run build:site` 均通过
