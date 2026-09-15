# fei-ui-design 在线使用文档 · 系统性审查报告

> 审查对象：`docs/` 目录下的全部在线文档（VitePress 站点）
> 审查范围：73 个 Markdown 文件（22,238 行）+ `docs/.vitepress/` 站点配置 + `site/` 构建产物
> 审查日期：2026-09-13
> 审查方式：结构扫描 + 内部链接校验 + **文档 API 表 ↔ 源码 props 自动比对** + **示例代码 ↔ demo 源文件比对** + 构建产物链接校验

---

## 0. 审查结论摘要

| 问题类别 | 数量 | 严重度分布 |
|---|---|---|
| 七、站点配置与工程遗留（构建产物级） | 11 项 | **P0 × 3** / P1 × 4 / P2 × 4 |
| 一、内容缺失 | 26 项 | P1 × 12 / P2 × 14 |
| 二、表述不清 / 文案错误 | 21 项 | P1 × 6 / P2 × 15 |
| 三、示例错误（不可运行或与结果不符） | 12 项 | **P0 × 3** / P1 × 5 / P2 × 4 |
| 四、API 描述不准确 | 34 项 | **P0 × 2** / P1 × 18 / P2 × 14 |
| 五、结构混乱 | 11 项 | P1 × 5 / P2 × 6 |
| 六、格式不一致 | 16 项 | P2 × 16 |
| **合计** | **131 项** | — |

**最高优先级（会导致用户直接踩坑或文档站功能失效）**

1. 导航栏 16 个组件入口全部指向旧模板页面，且 URL 因 base 拼接出现双斜杠（`/fei-ui-design//components/Alert`）——**整条导航栏不可用**。
2. `back-top.md` 引用 `./demo/Backtop/` 而目录实际为 `BackTop/`——**大小写不一致，Linux/CI 上文档站构建直接失败**。
3. `cascader.md` 末尾 `## Props` 表写的是 Element Plus 的 `props` 配置子项，**FCascader 自身 14 个 props 完全缺失**；正文示例还使用了源码中不存在的 `:props="props"`。
4. `menu.md`、`message.md`、`skeleton.md` 的示例代码块整段粘贴成了其他组件的代码（Loading / Layout），**显示的代码和渲染结果完全无关**。
5. `custom-theme.md` 把 `#example` 写成 `#expmple`，**主题演示不渲染**；且正文残留 `[TODO]` 占位。
6. `config-provider.md` 有 6 个 props 但**通篇没有任何 API 说明**，而 `custom-theme.md` 却把用户引导到这个"没有文档"的组件上。

---

## 七、站点配置与工程遗留（P0，建议最先修复）

### 7.1 导航栏 16 个组件入口全部是死链

**位置**：`docs/.vitepress/config.js` 第 109-136 行 `getNavbar()` 的「组件」下拉菜单

**问题**：这些条目指向 Vuesax 旧模板的页面名（大写 PascalCase）：

```
Alert / Loading / Input / Checkbox / Switch / Select / Avatar /
Notification / Radio / Tooltip / Dialog / Pagination / Table / Navbar / Sidebar / Card
```

而当前文档的真实页面是小写（`docs/components/alert.md`、`modal.md` …），且 `Dialog`、`Navbar`、`Sidebar`、`Pagination`、`Avatar`、`Notification` **根本没有对应文档**。

**证据**（`site/guide/introduction.html` 内嵌路由表实测）：

```
/fei-ui-design//components/Alert
/fei-ui-design//components/Dialog
/fei-ui-design//components/Navbar
/fei-ui-design//components/Sidebar
/fei-ui-design//components/Pagination
/fei-ui-design//components/Table
...
```

**修改建议**：删除 `getNavbar()` 里的整段组件下拉菜单（侧边栏 `getSidebar()` 已完整覆盖 59 个组件），或改为读取 `sidebar-comps.js` 的数据源，避免出现两处需要手工同步的组件清单。同时把 `config.js` 第 49-52 行被注释掉的 `sidebar` 配置清理掉。

### 7.2 base 拼接产生双斜杠

**位置**：`docs/.vitepress/config.js` 第 103、106、111、116-132 行

**问题**：`baseUrl` 在生产环境已经是 `/fei-ui-design/`（含尾斜杠），代码又写成 `` `${baseUrl}/guide/` ``，产出 `/fei-ui-design//guide/`。

**证据**：`site/guide/introduction.html` 内嵌 `"link":"/fei-ui-design//guide/"`
**修改建议**：统一为 `` `${baseUrl}guide/...` ``（不加前置斜杠）；或者在 `defineConfig` 中改用一个不带尾斜杠的常量 `siteBase = '/fei-ui-design'`，由 VitePress 自己处理 base。

### 7.3 导航项指向不存在的页面

**位置**：`config.js` 第 103、106 行

| 链接 | 问题 |
|---|---|
| `` `${baseUrl}/guide/` `` | 不存在 `docs/guide/index.md` → 404 |
| `` `${baseUrl}/guide/gettingStarted` `` | 不存在该页面（实际是 `installation`）→ 404 |
| `` `${baseUrl}/components` `` / `/components/` | 不存在 `docs/components/index.md` → 404 |

**修改建议**：新增 `docs/guide/index.md` 与 `docs/components/index.md` 作为落地页；把 `gettingStarted` 改为 `installation`。另**建议开启死链检测**：删除 `config.js` 第 24 行的 `ignoreDeadLinks: true`，让构建直接暴露此类问题（`ignoreDeadLinks` 正是这些死链能长期存在的根因）。

### 7.4 语言切换是坏的：`/es/` 英文站点不存在

**位置**：`config.js` 第 16-20 行（声明 `'/es/'` locale）、第 58-61 行（`getSidebar('/es/')`）、第 98-131 行（`getNavbar` 的英文文案）

**问题**：配置里完整声明了英文 locale，但 `docs/` 下**没有任何 `es/` 目录和英文页面**。用户点「English」会得到 404，或看到中文内容配英文导航。

**修改建议**：二选一——① 移除 `/es/` locale（推荐，先保证单语言质量）；② 补齐英文文档目录后再启用。

### 7.5 页脚硬编码无 base 的链接

**位置**：`docs/.vitepress/theme/components/Footer.vue` 第 65、69、73、82、86 行

```js
link: '/guide/introduction'
link: '/guide/installation'
link: '/guide/jsx'
link: '/components/button'
```

**问题**：这些链接**不带 base**，部署到 `/fei-ui-design/` 后全部 404。
**修改建议**：在 Footer 中使用带 base 的路径，或统一从 `config` 的 `site.data.themeConfig` 读取，避免再出现硬编码。

### 7.6 社交链接指向他人仓库（模板遗留）

**位置**：`config.js` 第 40 行

```js
{ icon: 'github', link: 'https://github.com/gumingWu/vitepress-fun' }
```

**问题**：`repo` 是 `ymf-930/fei-ui-design`（第 42 行），社交链接却是模板原作者仓库。实测产物中存在该外链。

**修改建议**：改为项目自身的 GitHub / Gitee 仓库地址。

### 7.7 残留的无关外链与模板配置

| 位置 | 内容 | 说明 |
|---|---|---|
| `config.js` 第 65 行 | `linkPrevVersion: 'https://lusaxweb.github.io/vuesax/'` | Vuesax 模板遗留，产物中仍有 `http://lusaxweb.net` |
| `config.js` 第 66 行 | `searchPlaceholder: 'Search'` | 中文站点里用英文占位符 |
| `config.js` 第 71-72 行 | `light: 'rose-pine-moon'` | 亮色模式使用暗色代码主题，与站点亮色主题冲突 |
| `docs/.vitepress/theme/components/HeaderNotification.vue` 第 42 行 | `this.$router.push('/docs/components/Card')` | 指向前缀 `/docs/` 与旧页面，且组件在 `Layout.vue` 中已注释停用（死代码） |
| `docs/.vitepress/theme/components/DropdownLink.vue` 第 52 行 | `'/guide/components/'` | 不存在的路径（死代码） |

### 7.8 `site/` 构建产物被提交进仓库，且已经过期

**问题**：
- `site/` 是 `vitepress build` 的输出目录（`config.js` 第 25 行 `outDir: '../site'`），共 359 个文件被纳入版本控制。
- 产物已**落后于源码**：`site/components/` 有 58 个页面，`docs/components/` 有 59 个——缺 `button-group.html`；`site/guide/` 缺 `refactor-plan.html`。
- 产物中混入了 VitePress 内部文件 `site/hashmap.json`。

**修改建议**：把 `site/` 加入 `.gitignore` 并从版本控制移除，改由 CI 部署 `docs:build` 产物。

### 7.9 Vite 配置缓存文件被提交

**位置**：`docs/.vitepress/config.js.timestamp-1789280509365-6868462fa4b2c.mjs`

**问题**：Vite 的临时缓存文件，不属于源码。
**修改建议**：删除并加入 `.gitignore`（`.vitepress/*.timestamp-*.mjs`）。

### 7.10 内部审计文档被暴露在公开侧边栏（P1，方向性建议）

**位置**：`config.js` 第 176 行 → `docs/guide/refactor-plan.md`（465 行）

**问题**：`refactor-plan.md` 是内部代码审计与改造计划（含类型债务统计、缺陷清单），却在侧边栏以「代码审计与改造计划」的标题对外公开。

**说明**：从项目记录看，该文件是此前为"消除两份互相矛盾的计划文档"而**有意保留在文档站**的。本次审查从"面向使用者的在线文档"视角提出不同意见：它的读者是维护者而非组件使用者，且与 `changelog.md` 的定位重叠；以「指南」分组末尾的身份出现，会让首次访问的用户误以为它是必读内容。

**修改建议**：从 `getSidebar()` 中移除该条目，文档移到 `docs/.internal/` 或仓库其他位置（保留在仓库内供维护者查阅，但不参与站点构建）。若确有对外公布改造进展的需要，建议改为在 `changelog.md` 中呈现面向用户的摘要。

### 7.11 `back-top.md` 引用路径大小写不一致，Linux/CI 上文档站构建失败（P0）

**位置**：`docs/components/back-top.md` 第 6-7 行

```js
import Basic from './demo/Backtop/Basic.vue'
import Scrollbar from './demo/Backtop/Scrollbar.vue'
```

**问题**：实际目录为 `docs/components/demo/BackTop/`（大写 T）。Windows/macOS 文件系统大小写不敏感，本地看不出问题；**在 Linux / CI 上这两个 import 会直接解析失败，文档站构建中断**。

**证据**：
1. 目录清单为 `docs/components/demo/BackTop/`；
2. 用"引用路径"对照 demo 目录做孤儿检测时，`BackTop/Basic.vue`、`BackTop/Scrollbar.vue` 被判定为**无任何文档引用**——因为文档声明的是另一种大小写。

> 这与源码侧此前修复过的 `space/src/Space.vue` 引用 `./item.vue`（实际 `Item.vue`）属于**同一类缺陷**。

**修改建议**：改为 `./demo/BackTop/Basic.vue` 与 `./demo/BackTop/Scrollbar.vue`；并考虑在文档侧也统一 demo 目录命名规范（当前 `TimePicker`、`BackTop`、`ButtonGroup` 用大驼峰，`button`、`colors`、`grid`、`utils` 用小写，共两类混用）。

---

## 一、内容缺失

### 1.1 `config-provider.md` 完全没有 API 说明（P0）

**位置**：`docs/components/config-provider.md`（全文 128 行）

**问题**：源码 `src/config-provider/src/types.ts` 定义了 6 个 props，文档一个都没写：

| 缺失项 | 类型 | 默认值 |
|---|---|---|
| `abstract` | Boolean | — |
| `tag` | String | `'div'` |
| `inlineThemeDisabled` | Boolean | — |
| `locale` | String | `'zh-CN'` |
| `themeName` | `'light' \| 'dark'` | — |
| `theme` | Object | — |

而 `docs/guide/custom-theme.md` 第 13-17 行却把用户引导过来：「通过使用 f-config-provider 调整主题」。**形成"引导到无文档页面"的死路。**

**修改建议**：补齐 `## Props` 表；额外补充 `themeName` 的 `light/dark` 暗色模式说明（目前**整套暗色主题在文档中零覆盖**）、`locale` 的国际化说明。

### 1.2 `icon.md` 未覆盖 `FIconSelect`（P1）

**位置**：`docs/components/icon.md`

**问题**：`src/icon/index.ts` 导出了 `FIconSelect`，且 `icon.md` 第 19 行自身就在使用 `<f-icon-select>`，但页面既没有该组件的用法说明，也没有 props 表。
**修改建议**：新增「图标选择器」小节，说明 `FIconSelect` 的用途、props 与 `clear` 事件（源码 `emits: ['clear']`，文档同样缺失）。

### 1.3 `common-directive.md` 指令数量错误且漏文档 2 个（P1）

**位置**：`docs/guide/common-directive.md` 第 9 行

**问题**：正文写「组件提供了**四个**指令」，但 `src/_directives/index.ts` 实际导出 **6 个**：

```
ClickAnimation、Waves、ClickOutside、RepeatClick、Loading、NoData
```

`Loading`（`v-loading`）与 `NoData`（`v-no-data`）**完全未文档化**。
**修改建议**：改为「六个」并补齐 `v-loading`、`v-no-data` 两节。

### 1.4 `common-api.md` 的"导入"示例引用了未文档化的 API（P1）

**位置**：`docs/guide/common-api.md` 第 28-33 行

**问题**：示例中使用 `Utils.dom.on`、`Utils.dom.off`、`Utils.dom.addClass`、`Utils.dom.removeClass`、`Utils.resize.addResizeListener`、`Utils.resize.removeResizeListener`，但文档的 API 清单里**没有 `## Utils.resize` 小节**，`Utils.dom` 小节也漏了 `on/off/once/stop/isScroll/getScrollContainer`。实测源码导出但文档未提及的函数共 **28 个**：

| 命名空间 | 未文档化数量 | 举例 |
|---|---|---|
| `Utils.helper` | 18 | `generateId`、`getValueByPath`、`isFunction`、`arrayFind`… |
| `Utils.dom` | 6 | `on`、`off`、`once`、`isScroll`、`getScrollContainer`、`stop` |
| `Utils.resize` | 2 | `addResizeListener`、`removeResizeListener` |
| `Utils.log` | 2 | `throwError`、`throwWarn` |

**修改建议**：补齐缺失命名空间；或明确声明「仅公开部分函数」并删除示例中对未公开函数的引用。

### 1.5 复合组件：子组件 props 大面积缺失（P1）

**问题**：文档只给一张主组件 Props 表，但源码中「主组件 + 子组件」是分开定义的，子组件属性无处可查。已确认缺口：

| 文档 | 缺失的属性 | 所属 |
|---|---|---|
| `collapse.md` | `name`、`title`、`hide-arrow`、`disabled` | `CollapsePanelProps`（FCollapseItem） |
| `collapse.md` | `collapse`、`shadow`、`arrow-icon` | `CollapseWrapProps`（FCollapseTransition） |
| `anchor.md` | `href`、`title` | `AnchorLinkProps` |
| `desc.md` | `label`、`span` | `DescItemProps` |
| `calendar.md` | `date`、`year`、`month`、`day`、`month-flag`、`is-current-day`、`selected` | `DateProps`（日期单元格） |
| `radio.md` | `type`、`size` | `RadioGroupProps` |
| `page.md` | `current-to`、`all-pages`、`is-small`、`append-to-body` | `optionsProps`（分页器下拉） |
| `tabs.md` | `hide-arrow`、`model-value`、`context-menu` | `TabsProps` |
| `tree.md` | `render`、`default-expand` | `treeProps` |
| `tree.md` | `model-value`、`size`、`disabled`、`clearable`、`placeholder`、`append-to-body`、`clear-icon`、`popper-class` | `treeSelectProps`（FSelect 模式） |

**修改建议**：为每个复合组件增加「`XxxItem` / `XxxGroup` / `XxxPanel` Props」子表（`checkbox.md`、`select.md`、`menu.md`、`steps.md` 已有此结构，可对齐复用）。

### 1.6 `cascader.md`：主组件 14 个 props 缺失（P0）

**位置**：`docs/components/cascader.md` 第 1167-1186 行（`CascaderPanel Attributes` 只有 3 项）、第 1188-1203 行（末尾 `## Props`）

**问题**：源码 `src/cascader/src/types.ts` 的 `cascaderProps` / `panelProps` 共 **17 个属性**，文档只覆盖了 3 个（`value / v-model`、`options`、`props`）。以下 **14 个完全缺失**：

```
model-value（写法不一致）、border、render-label、size、placeholder、
clearable、filterable、filter-method、separator、show-all-levels、
collapse-tags、debounce、before-filter、popper-class
```

**修改建议**：新建 `## Cascader Props` 表补齐上述属性（含类型与默认值）；把末尾那个无前缀的 `## Props`（实际是 `props` 配置对象子表）改名为 `## Cascader props 配置项`。

### 1.7 Popper 继承属性未说明（P1）

**位置**：`docs/components/tooltip.md`、`docs/components/popover.md`

**问题**：两者源码都 `...popperProps`（`src/_internal/popper/src/types.ts`），但文档未说明这一继承关系，导致 17 个可用属性不可发现：

```
manual-mode、arrow-offset、style、close-delay、open-delay、popper-class、
popper-options、boundaries-padding、show-after、hide-after、cutoff、pure、
strategy、visible、stop-popper-mouse-event、gpu-acceleration、z-index
```

**修改建议**：在两张 Props 表下加「以下属性继承自 Popper 基础能力」分组表，并给 `docs/components/popper.md` 补充完整 props（该页目前只有 149 行，未做完整覆盖）。

### 1.8 指南文档的关键步骤缺失（P1/P2）

| 位置 | 缺失内容 |
|---|---|
| `docs/guide/jsx.md` 第 11 行 | 只说「请参考你使用的工具链的相关文档」，**没有给出本项目实际使用的 `@vitejs/plugin-vue-jsx` 配置**，用户无法照做 |
| `docs/guide/custom-theme.md` 全文 | 声称"调整主题变量"，但**没有任何变量清单、变量命名规则或可复制的配置示例** |
| `docs/guide/installation.md` | 无 CDN 用法、无 Vue 版本约束说明（`peerDependencies` 为 `vue@^3.2.0`） |
| `docs/guide/usage-sfc.md` | 未说明 `dist/styles/index.css`、`base.css`、`icon.css` 三者该如何选择 |
| `docs/guide/import-on-demand.md` | 未说明按需引入时样式如何处理（会与 `usage-sfc.md` 第 46 行的说明冲突） |
| `docs/guide/common-transition.md` 第 107 行 | `f-move-transition` 只给了演示，未说明其与普通 `<transition>` 的区别和适用场景 |

### 1.9 文档页面普遍缺少"使用场景"章节（P2）

**问题**：59 个组件文档中，**52 个只用一行 `#####` 作为导语**，没有"何时使用/使用场景"章节；`layout.md`（49 行）、`affix.md`（81 行）、`calendar.md`（88 行）、`back-top.md`（93 行）等页面内容严重偏薄，与 `table.md`（1817 行）差距悬殊。
**修改建议**：为每个组件补「何时使用 / 何时不用」小节，并对 `layout`、`affix`、`calendar`、`empty`、`popper` 等薄页面做内容补齐。

---

## 二、表述不清 / 文案错误

### 2.1 组件导语被整段复制粘贴（P1）

**位置**：`badge.md`、`dropdown.md`、`message-box.md`、`page.md`

**问题**：这 4 个文件的导语与 `empty.md` **完全相同**：

> `##### 空显示状态，用于给内部无数据情况的展示。十分简单`

即"空状态"组件的描述被复制到了标记、下拉菜单、弹框提示、分页器 4 个页面上——**导语与组件完全无关**。

**修改建议**：为每个组件写正确的导语（可参考侧边栏中文名定位用途），如 badge → 「用于展示数量、状态等标记信息的徽标」。

### 2.2 明确的错别字与笔误

| 位置 | 现状 | 建议 |
|---|---|---|
| `docs/guide/introduction.md` 第 13 行 | 「可以平滑的**过度**和切换」 | 过渡 |
| `docs/guide/changelog.md` 第 41 行 | 「完成**组建**文档初始化」 | 组件 |
| `docs/guide/color-design.md` 第 9 行 | 「推荐**使用一下**色板」 | 使用以下 |
| `docs/guide/color-design.md` 第 238 行 | 「良好的**主次关关系**」 | 主次关系 |
| `docs/guide/color-design.md` 第 29、243、249 行 | 变量名 `garyColor`、文案 `gary-{{n}}` | `grayColor` / `gray-` |
| `docs/components/icon.md` 第 9 行 | 「只设置 name 来**实用**」 | 使用 |
| `docs/guide/common-api.md` 第 26 行 | `Utils.util.**throttl**` | `throttle`（当前写法取到 `undefined`） |
| `docs/guide/common-api.md` 第 27 行 | `Utils.util.**debounc**` | `debounce`（同上） |
| `docs/guide/custom-theme.md` 第 25 行 | `<template #**expmple**>` | `#example`（见 3.1） |

### 2.3 相互矛盾的表述

| 位置 | 矛盾点 |
|---|---|
| `docs/guide/introduction.md` 第 27 行「你不需要导入任何 CSS 就能让组件正常工作」 | 与 `docs/guide/usage-sfc.md` 第 46-52 行「对于全局样式和字体样式，仍然需要进行全局引入」**直接冲突** |
| `docs/guide/introduction.md` 第 15 行「使用了 Postcss 重构了样式」 | 与 `docs/guide/color-design.md` 第 15 行「参考 **stylus** 的 mix 混合」**冲突**（stylus 已不再使用） |
| `docs/guide/introduction.md` 第 21 行「超过 **60** 个组件」 | 实际组件目录 55 个、文档 59 篇，数字不实 |
| `docs/guide/installation.md` 第 17 行「推荐使用 **pnpm** 进行安装」 | 与项目实际统一使用 npm（无 pnpm 环境）不一致，且同段下方又列出 `npm i` |
| `docs/components/button.md` 第 24 行「type 分别为 primary、info、success、warning 和 **error**」 | 真实可取值是 `danger`（同页 Props 表第 434 行也写的是 `danger`），正文写错 |
| `docs/guide/common-transition.md` 第 82 行「提供 **3 种** 特殊的移动渐变」 | 该小节实际演示了 **4 种**（第 96 行还有 `fade-down`），且 `fade-down` 未在文案中列出 |
| `docs/components/circle.md` 第 187 行 `stroke-color` 默认值 `#2db7f5` | 源码默认 `#1a5cff`（详见 4.2） |

### 2.4 章节标题与内容不符（P2）

| 位置 | 问题 |
|---|---|
| `docs/guide/installation.md` 第 15 行 `## npm` | 该节同时给出了 npm / yarn / pnpm 三种方式，标题只写 npm |
| `docs/guide/common-css.md` 第 242 行「`## common.css` / 边框和部分常用样式」 | 其下的代码块（第 246-559 行）只有 margin / padding / 字体 / 文本对齐工具类，**没有任何 border 类** |
| `docs/guide/common-css.md` 第 209 行「flex 属性」 | 第 226 行 `cross` 的 `bottom` 说明写成「从上到下」，应为「从下到上」（复制自 `dir.top`） |
| `docs/guide/color-design.md` 第 256 行「## 文字 / 提供了几个文字颜色」 | 页面只展示色块，未给出对应的 CSS 变量名或类名，用户无法实际使用 |
| `docs/components/skeleton.md` 第 191 行 `# Skeleton Props` | 同页其他 API 章节为 `##`，此节误用一级标题 |

### 2.5 模糊表述（P2）

| 位置 | 现状 | 建议 |
|---|---|---|
| `docs/guide/color-design.md` 第 294 行 | 「亮度和饱和度建议在 70 以上」 | 说明判断依据（HSL 的 L/S 分量） |
| `docs/guide/common-transition.md` 第 104 行 | 「会存在位置错位情况，这个动画内置了绝对定位的覆盖」 | 说明容器需要 `position: relative` 等要求 |
| `docs/guide/common-api.md` 第 140 行 | throttle 的 JSDoc 写的是 debounce 的语义（「空闲时间必须大于或等于 wait 才执行」） | 与第 152 行 debounce 说明互换修正 |
| `docs/guide/common-api.md` 第 125、133 行 | `shuffle(arr)`、`swap(arr,i,j)` 的 `@return {number}` | 返回数组，应为 `{Array}` |
| `docs/guide/common-css.md` 第 229 行 | `stretch：高度并排铺满` | 拉伸填满交叉轴 |
| `docs/components/back-top.md` 第 17 行 | 「直接用组件默认插槽插入即可」 | 与 alert 描述同源复制，未解释 target 容器场景 |
| `docs/components/tabs.md` 第 14 行导语 | 「由于标签内容定制化比较多，这里就预留给后续内容判定」 | 是开发备忘，不是用户文档 |

---

## 三、示例错误（代码无法运行或结果不符）

### 3.1 `custom-theme.md` slot 名拼错，主题演示不渲染（P0）

**位置**：`docs/guide/custom-theme.md` 第 25 行

```html
<template #expmple>      <!-- 应为 #example -->
  <Basic/>
</template>
```

**证据**：`docs/.vitepress/theme/global-components/card.vue` 第 4 行 `v-if="slots.example"` —— 只有名为 `example` 的插槽才会被渲染。全文其他 290 处均正确使用 `#example`，仅此 1 处拼错。
**修改建议**：改为 `#example`。

### 3.2 示例代码块整段粘贴成了别的组件（P0）

| 位置 | 代码块实际内容 | 应展示内容 |
|---|---|---|
| `docs/components/menu.md` 第 259-265 行 | `<div class="demo-loading"><f-loading></f-loading></div>`（来自 Loading 文档），且第 272-287 行的 `#style` 也是 `.demo-loading` 样式 | `<Collapse/>` 对应的菜单折叠代码 |
| `docs/components/message.md` 第 126-136 行 | `<f-layout has-sider>` + `#sider`（来自 Layout 文档） | `<Options/>` 对应的消息配置代码 |
| `docs/components/skeleton.md` 第 99-107 行 | `<f-layout has-sider>` + `#sider`（来自 Layout 文档） | `<Custom/>` 对应的自定义骨架代码 |

**说明**：这三处 `<template #example>` 里挂的 demo 组件是对的（渲染结果正确），但**展示给用户的源码是错的**——用户复制过去会得到完全不同的结果。
**修改建议**：按对应 demo 文件重写代码块。

### 3.3 `cascader.md` 示例使用了不存在的 prop（P0）

**位置**：`docs/components/cascader.md` 第 357-368 行（「显示最后一级」小节）

```html
<f-cascader v-model="selected" :props="props"></f-cascader>
```

**证据**：对应 demo `docs/components/demo/Cascader/Last.vue` 第 4-9 行实际为：

```html
<f-cascader
  v-model="selected"
  :options="options"
  clearable
  :show-all-levels="false"
  @change="handleChange"
></f-cascader>
```

`FCascader` 的 props 中**没有 `props` 这个属性**（源码 `cascaderProps` 键名为 `props`，指的是配置对象，写法应为 `:props="{...}"` 且需配套定义）。文档示例既与实现不符，也无法达成"只显示最后一级"的效果（缺少 `:show-all-levels="false"`）。

**修改建议**：同步为 `Last.vue` 的真实代码。

### 3.4 `form.md` 示例代码缺少实际渲染内容（P1）

**位置**：`docs/components/form.md` 第 175-281 行（「对齐和尺寸」小节的代码块）

**问题**：对应 demo `docs/components/demo/Form/Aline.vue` 第 67-79 行额外渲染了 `f-slider`、`f-color-picker`、`f-rate`、`f-date-picker`、`f-time-picker` 五个表单项，但文档代码块中**完全没有这些内容**。用户看到的"对齐和尺寸"示例比实际演示少了一整块。

**修改建议**：补全代码块使其与 `Aline.vue` 一致。

### 3.5 帮助函数的注册示例写法错误（P1）

**位置**：`docs/guide/common-directive.md` 第 26-28 行、`docs/guide/import-on-demand.md` 第 71-74 行

```js
const UI = create({
  directives: [ClickOutside, ClickAnimation, Waves, RepeatClick]
})
```

**问题**：`create` 的 `FUiCreateOptions.directives` 类型是 `DirectiveItem[]`，即 `{ name, directive }[]`（见 `src/create.ts` 第 20-23、33-38 行），而示例传入的是**裸指令对象数组**，不会注册成功。

**修改建议**：改为

```js
directives: [
  { name: 'click-outside', directive: ClickOutside },
  { name: 'click-animation', directive: ClickAnimation },
  { name: 'waves', directive: Waves },
  { name: 'repeat-click', directive: RepeatClick }
]
```

（`src/preset.ts` 第 25-28 行展示了正确的映射写法）

### 3.6 `import-on-demand.md` 的自动引入 resolver 不完整（P1）

**位置**：`docs/guide/import-on-demand.md` 第 44-47 行、`docs/guide/usage-sfc.md` 第 78-81 行

```js
Components({
  resolvers: [
    componentName => ({ name: componentName, from: 'fei-ui-design' })
  ]
})
```

**问题**：`componentName` 是模板中的标签名（如 `f-button`），直接作为 `name` 返回会生成 `import { f-button } from 'fei-ui-design'`，而库的导出名是 `FButton`（PascalCase）——**该 resolver 无法工作**。

**修改建议**：给出可运行的 resolver（做 kebab → Pascal 转换），或改为推荐 `@fei-ui-design/resolver` 之类的官方导出；同时补充按需场景下样式的处理说明。

### 3.7 示例片段不完整/不可独立运行（P2）

| 位置 | 问题 |
|---|---|
| `docs/guide/import-on-demand.md` 第 76 行 | `const app = createApp()` 未传入根组件；第 68 行导入的 `Utils` 全程未使用 |
| `docs/guide/common-directive.md` 第 30-32 行 | 同上，`createApp()` 无根组件 |
| `docs/components/cascader.md` 第 830-847 行 | 代码块第 2 个 `{{ selected }}` 引用了未声明/未绑定的 `selected`，缺少 `v-model` 与 `@change`（对比 `Custom.vue` 第 4 行） |
| `docs/guide/jsx.md` 第 23 行 | `<FButton>{{ default: () => 'Star Kirby' }}</FButton>` 中插槽内容含义不明，且未说明这是 Vue 3 JSX 的具名插槽写法 |
| `docs/components/skeleton.md` 第 145-176 行 | `#script` 块用 ```` ```html ```` 包裹 `<script setup lang="ts">`（应为 ```` ```vue ````），`button.md` 第 389 行同样问题 |

---

## 四、API 描述不准确

> 本节全部由「文档 Props 表 ↔ 源码 `types.ts` / `withDefaults` / 运行时 props 对象」自动比对后人工复核得出，已排除继承属性与脚本误报。

### 4.1 默认值错误（已逐条核对源码，P1）

| 位置 | 参数 | 文档 | 源码实际 | 源码出处 |
|---|---|---|---|---|
| `docs/components/back-top.md` 第 85 行 | `bottom` | `50` | **`40`** | `src/back-top/src/BackTop.vue` L35-38 |
| `docs/components/back-top.md` 第 86 行 | `right` | `50` | **`40`** | 同上 |
| `docs/components/circle.md` 第 187 行 | `stroke-color` | `#2db7f5` | **`#1a5cff`** | `src/circle/src/Circle.vue` L39 |
| `docs/components/layout.md` 第 46 行 | `collapsed-width` | `40` | **`32`** | `src/layout/src/Layout.vue` L32 |
| `docs/components/input-number.md` 第 326 行 | `min` | `Infinity` | **`-Infinity`** | `src/input-number/src/types.ts` L6-9 |
| `docs/components/input-number.md` 第 337 行 | `active-change` | `true` | **`false`** | 同上 L14-17 |
| `docs/components/tree.md` 第 1598 行 | `draggable` | `true` | **`false`** | `src/tree/src/types.ts` L28-31 |
| `docs/components/time-picker.md` 第 366 行 | `prefix-icon` | `time-circle` | **`''`** | `src/time-picker/src/common/props.ts` L31-34 |
| `docs/components/time-picker.md` 第 362 行 | `range-separator` | `'-'` | `-` | 文档多写了引号，值本身一致 |
| `docs/components/popover.md` 第 317 行 | `offset` | `0` | **`12`** | `src/_internal/popper/src/types.ts` L76-79 |
| `docs/components/tooltip.md` 第 270 行 | `hide-delay` | `0` | 属性名应为 **`close-delay`**，默认 **`200`** | 同上 L85-88 |
| `docs/components/count-to.md` 第 157 行 | `separator` | `，`（全角逗号） | **`,`**（半角） | `src/count-to/src/types.ts` |

**共 11 处默认值/属性名错误**。其中 `back-top`、`layout`、`time-picker`、`popover`、`tooltip` 会直接导致用户按文档写的代码出现预期外的间距、偏移或图标。

### 4.2 Props 表缺失源码中真实存在的属性（P1）

| 位置 | 缺失属性 |
|---|---|
| `docs/components/button.md` 第 431-445 行 | `loading-icon`、`circle`、`dashed` |
| `docs/components/alert.md` 第 189-193 行 | `banner`（且同页第 164、177-178 行的示例正在使用 `banner`） |
| `docs/components/affix.md` 第 60-67 行 | `target` |
| `docs/components/input.md` 第 490-530 行 | `model-value`、`show-password-toggle`、`name` |
| `docs/components/tag.md` | `name`、`dark`（同页第 52 行正文提到了 `dark`） |
| `docs/components/switch.md` | `name` |
| `docs/components/slider.md` 第 195-210 行 | `model-value` |
| `docs/components/color-picker.md` 第 300-306 行 | `model-value`、`show-label` |
| `docs/components/modal.md` 第 440-455 行 | `model-value`、`mask-class` |
| `docs/components/drawer.md` 第 310-330 行 | `z-index`、`class-name` |
| `docs/components/tabs.md` | `model-value`、`context-menu`、`hide-arrow` |
| `docs/components/input-number.md` 第 324-339 行 | `autofocus`、`name`、`element-id` |
| `docs/components/desc.md` 第 124-129 行 | `row` |

### 4.3 Props 表写了源码中不存在的属性（P0/P1）

| 位置 | 属性 | 说明 |
|---|---|---|
| `docs/components/cascader.md` 第 1195-1196 行 | `emitPath`、`lazy` | Element Plus 的属性名，源码为 `lazyLoad`，且无 `emitPath` |
| `docs/components/tooltip.md` 第 270 行 | `hide-delay` | 源码为 `closeDelay`（见 4.1） |
| `docs/components/tooltip.md` 第 262 行、`popover.md` 第 308 行 | `v-model:visible` | 源码无此声明（`visible` 来自 `popperProps`，绑定写法应为 `v-model:visible` 之外的形式，需按实现核实并统一） |
| `docs/components/popover.md` 第 315-316、319 行 | `auto-close`、`manual`、`options` | 源码中不存在 |
| `docs/components/input.md` 第 504 行 | `value` | 源码用 `modelValue` |
| `docs/components/color-picker.md` 第 301 行、`date-picker.md` 第 790 行、`slider.md` 第 195 行、`time-picker.md` 第 349 行 | `value / v-model` | 全库统一用 Vue 3 的 `modelValue`，`value` 是 Vue 2 / Element Plus 写法 |
| `docs/components/modal.md` 第 441 行 | `v-model` | 同上 |
| `docs/components/radio.md` 第 296 行 | `value` | 源码为 `modelValue` |
| `docs/components/time-picker.md` 第 360 行 | `align` | 源码无该属性 |

**根因**：这些名称特征（`emitPath`、`hide-delay`、`value / v-model`、`auto-close`、`align`）高度一致，判断为**从 Element Plus / Vue 2 版本文档整体迁移时未做 API 校正**。

### 4.4 Events 章节缺失（P1，共 11 处"整章缺失" + 24 处"单事件缺失"）

**整章缺失**（源码有 `emits` 但文档无 `## Events`）：

| 文档 | 源码实际 emit 的事件 |
|---|---|
| `docs/components/table.md` | `sort-change`、`current-change`、`row-click`、`row-dblclick`、`selection-change`、`expand`、`select-all`、`select-all-cancel`、`update:data`、`drag-drop` |
| `docs/components/select.md` | `OptionQueryChange`、`OptionGroupQueryChange`、`visible-change`、`remove-tag`、`clear`、`focus`、`blur` |
| `docs/components/input.md` | `enter`、`search`、`keydown`、`keypress`、`keyup`、`click`、`focus`、`blur`、`input`、`clear` |
| `docs/components/menu.md` | `close`、`open`、`select`、`rootMenu:toggle-collapse`、`click`、`submenu:mouse-enter-child`、`submenu:mouse-leave-child` |
| `docs/components/cascader.md` | `focus`、`blur`、`visible-change`、`remove-tag`、`expand-change`、`close`、`expand`、`check` |
| `docs/components/steps.md` | `append`、`remove` |
| `docs/components/upload.md` | `cancel`、`file-click`、`file-preview`、`file-remove` |
| `docs/components/dropdown.md` | `visible-change`、`command` |
| `docs/components/message-box.md` | `vanish`、`action` |
| `docs/components/checkbox.md` | `change` |
| `docs/components/icon.md` | `clear` |

**单事件缺失**（有 Events 表但漏了事件）：`calendar`(`select-day`)、`date-picker`(`update:modelValue`/`pick`/`select`/`changerange`/`set-picker-option`)、`time-picker`(同上 + `select-range`/`set-option`)、`tree`(`update`/`node-drop`/`update:checked`/`clear`)、`page`(`size`/`page`/`update:current`)、`switch`/`input-number`/`tabs`/`drawer`/`switch`(`update:modelValue`)、`modal`(`click`)、`rate`(`update:modelValue`)。

**修改建议**：`update:modelValue` / `update:xxx` 类事件建议统一在文档中以「v-model 更新」一行说明，避免每个组件重复且遗漏。

### 4.5 Props 章节命名与层级不规范（P2）

同一份 Props 表在 59 个页面里有 **6 种写法**：

| 写法 | 出现页面 |
|---|---|
| `## Props` | alert、button、affix、back-top、circle、collapse、color-picker、count-to、divider、drawer、input-number、input、layout、modal、popover、progress、radio、slider、split、switch、tabs、tag、time-picker、timeline… |
| `## Xxx Props`（大驼峰前缀） | breadcrumb(`Breadcrumb Props`)、form(`Form Props`)、grid(`Row Props`/`Col Props`)、menu(`Menu Props`)、skeleton(`Skeleton Props`)、space(`Space Props`)、steps(`Steps Props`)、timeline(`Timeline Props`)、tree… |
| `## Xxx props`（小写） | checkbox(`Checkbox props`)、dropdown(`Dropdown props`)、select(`Select props`)、table(`Table props`+`Table events`) |
| `## Attributes` | rate、upload |
| `## API` + `## Options` | loading-bar、message、message-box、notice |
| `## Methods` | form、table、time-picker、tree、upload |

**修改建议**：约定统一形态——`## Props` / `## Events` / `## Slots` / `## Methods`（子组件用 `## XxxItem Props`），并在文档中新增《文档编写规范》一节固化。

### 4.6 类型列写法不统一（P2）

同一批文档中并存 4 种类型写法，混用 `Number`/`number`、`String`/`string`/`'a' | 'b'`、`Boolean`/`boolean`：

| 用大写包装类型 | 用小写原始类型 | 用字面量联合 |
|---|---|---|
| `alert.md`（`String`/`Boolean`）、`button.md`、`back-top.md`、`desc.md` | `menu.md`（`string`/`boolean`）、`skeleton.md`（`boolean`/`number`） | `circle.md`（`'square' \| 'round'`）、`switch.md` |

另外「可选值」列的使用也不统一：有的用 `、` 分隔（`alert.md` 第 191 行 `info、success、warning、error`），有的用 ` / `（`button.md` 第 433 行 `large / small / mini`），有的用 `或`。

**修改建议**：统一为 Vue 3 官方文档风格——类型列写 `string` / `number` / `boolean` / 联合字面量，可选值列统一用 ` / ` 分隔。

---

## 五、结构混乱

### 5.1 一级标题使用极不统一（P1）

**问题**：59 篇组件文档中，**52 篇没有 `#` 一级标题**（仅靠 frontmatter `title`），另外 **8 篇使用了 `#`**，且其中 2 篇用法错误：

| 文件 | 行 | 标题 | 问题 |
|---|---|---|---|
| `docs/components/config-provider.md` | 13、87 | `# 基础用法`、`# 抽象容器` | **把章节标题写成 H1**，导致整页出现多个 H1；且 `card.vue` 只对 `h2` 施加了样式（`.card .text h2 { padding-top: 100px }`），该页的视觉会与其他页面明显不一致 |
| `docs/components/skeleton.md` | 191 | `# Skeleton Props` | 同级 API 章节（第 201、207 行）是 `##`，此节误用 H1 |
| `button-group.md`、`divider.md`、`icon.md`、`layout.md`、`tag.md`、`tree.md` | — | `# 按钮组 ButtonGroup` 等 | 与其余 52 篇写法不一致 |

**修改建议**：统一在 frontmatter 里放 `title`，正文从 `##` 开始（推荐，与现有 52 篇一致）；并把 `config-provider.md`、`skeleton.md` 的 H1 降级为 H2。

### 5.2 API 章节被拆散、命名与前缀不统一（P1）

以 `tree.md`、`cascader.md` 为例，同一组件的 API 被切成多段并混用「有无组件名前缀」：

- `cascader.md`：`## Cascader Methods` → `## Cascader Slots` → `## CascaderPanel Attributes` → `## CascaderPanel Events` → `## CascaderPanel Methods` → `## CascaderPanel Slots` → `## Props`（无前缀，实为 `props` 配置项）
- `table.md`（1817 行）：`## Table props` → `## Table events` → `## Table slot` → `## Table methods` → `## column`
- `tabs.md`：正文有 `#ctrl`、`#left`、`#right` 插槽示例，但 API 区只有 `## Props` / `## Events`，**没有 Slots 表**

**修改建议**：统一为固定的 API 章节顺序 `Props → Events → Slots → Methods → Expose`，并在需要时使用一致的组件名前缀。

### 5.3 超长页面缺少导航（P2）

**位置**：`docs/components/table.md`（1817 行，20 个 `##` 小节）、`docs/components/tree.md`（1653 行，17 个演示小节）、`docs/components/cascader.md`（1202 行）

**问题**：这些页面演示章节极多但没有分组目录，用户只能靠右侧 outline 长列表滚动定位；`tree.md` 的「栅格…」类小节之间也没有渐进关系说明。

**修改建议**：在页首加一行页内锚点目录；或将 `table.md` 按「基础 / 数据操作 / 高级」拆分为多页。

### 5.4 相近语义的章节名并列（P1）

**位置**：`docs/components/grid.md`

| 行 | 章节 |
|---|---|
| 76 | `## 栅格次序`（演示 `order` 属性） |
| 105 | `## 栅格顺序`（演示 `push` / `pull` 属性） |
| 134 | `## 左右偏移`（演示 `offset` 属性） |

「次序」与「顺序」在中文里几乎同义，用户无法从标题判断差异。
**修改建议**：改为「**排序（order）**」「**左右推移（push / pull）**」「**列偏移（offset）**」。

### 5.5 页面结构与其他页面不一致（P2）

| 位置 | 问题 |
|---|---|
| `docs/components/icon.md` | 全文无 `<card>` 块，直接堆 HTML + `<script setup>`，与其他 58 篇不一致 |
| `docs/guide/common-transition.md` | 全文用裸 `<div class="demo-transition">` + `<transition>` 演示，无 `<card>` 包装与 `#template` 代码块，用户看不到可复制代码 |
| `docs/guide/common-css.md` 第 188-207 行 | 同一段 HTML 注释与示例**连续出现两次**（一次裸 HTML、一次包在代码块中） |
| `docs/guide/common-css.md` 第 236-559 行 | 用 320 行陈列全部工具类，未做分组表格化 |
| `docs/components/button.md` 第 286-328 行「按钮组」小节 | 与独立的 `docs/components/button-group.md` 内容重复 |
| `docs/guide/changelog.md` | 与仓库根 `CHANGELOG.md` 内容**互相冲突**（见 6.5） |

### 5.6 `refactor-plan.md` 结构不适合作为用户文档（P1）

**位置**：`docs/guide/refactor-plan.md`

**问题**：它是面向维护者的内部计划（含 `src/` 缺陷清单、类型债务 S1→S4 路线图），出现在公开侧边栏「指南」分组末尾，且与 `docs/guide/changelog.md` 的定位重叠。
**修改建议**：从站点移除（同时见 7.10）。

---

## 六、格式不一致

### 6.1 产品名称有 6 种写法（P2）

| 写法 | 出现次数 | 示例位置 |
|---|---|---|
| `fei-ui-design` | 74 | 安装命令、import 语句 |
| `FEI-UI-DESIGN` | 4 | `docs/index.md` 首页 |
| `Fei UI Design` | 2 | `docs/guide/introduction.md` 第 9 行 |
| `F-UI-Design` | 2 | `docs/guide/color-design.md` 第 9 行、`import-on-demand.md` 第 9 行 |
| `FeiUI` | 2 | `docs/guide/usage-sfc.md` 第 107 行 |
| `f-ui-one` | 2 | `docs/guide/introduction.md` 第 13 行（历史项目名） |

**修改建议**：确定唯一规范——正文用 `fei-ui-design`（包名）或 `FEI-UI-DESIGN`（品牌名），并在《文档编写规范》中固化。

### 6.2 中文句子使用半角标点（P2，20+ 处）

示例（均为「中文，应使用，」）：

| 位置 | 现状 |
|---|---|
| `docs/components/card.md` 第 49 行 | 「直接传入header可以生成默认标题**,**配置divider="no"…」 |
| `docs/components/drawer.md` 第 14 行 | 「用于展示或者快速弹出**,**可以根据是信息展示还是创建动态插入」 |
| `docs/components/form.md` 第 167 行 | 「可以有三种不同的标签对齐方式**,**纯文字需要包裹label标签」 |
| `docs/components/input.md` 第 73 行 | 「可以开启清空按钮**,**icon设置icon图标名称」 |
| `docs/components/tabs.md` 第 14 行 | 「显示标签**,**由于标签内容定制化比较多」 |
| `docs/guide/common-api.md` 第 15 行 | 「这里只介绍部分包中的函数**.**」 |
| `docs/guide/common-directive.md` 第 9 行 | 「组件功能**,**如果组件是全局引入则会自动注册**.**」 |
| `docs/guide/common-transition.md` 第 9 行 | 「提供如下内置动画**,**只需要引入base.css 即可包含**.**」 |
| `docs/guide/common-css.md` 第 167 行 | 「兼容样式 **，** `flex.css` 扩展了…」（全角逗号前多空格） |

反向问题同样存在：`docs/components/alert.md` 第 191 行可选值用全角顿号 `、`，`docs/components/button.md` 第 433 行用空格斜杠 ` / `。

**修改建议**：全文统一中文标点为全角；数字/英文单词与中文之间加空格（可用 markdownlint + prettier 自动检查）。

### 6.3 行内代码与组件名大小写不统一（P2）

| 位置 | 现状 | 建议 |
|---|---|---|
| `docs/components/back-top.md` frontmatter | `返回顶部 Backtop` | `BackTop`（与组件名 `FBackTop`、侧边栏 alias `BackTop` 一致） |
| `docs/components/calendar.md` frontmatter | `日历组件 Calendar` | 去掉「组件」（其余页面为「中文 English」） |
| `docs/components/slider.md` frontmatter | `滑块组件 Slider` | 同上 |
| `docs/components/config-provider.md` frontmatter | `全局配置  ConfigProvider`（双空格） | 单空格 |
| `docs/components/tooltip.md` frontmatter | `提示 Tooltip` | 与侧边栏「弹出提示」不一致，需统一 |
| `docs/components/page.md` frontmatter | `分页器 Page` | 与侧边栏「分页」不一致 |
| `docs/components/menu.md` frontmatter | `导航菜单 Menu` | 与侧边栏「菜单」不一致 |

代码示例内部同样混用：`docs/components/back-top.md` 第 33 行用 `<f-back-top>`，同页第 50 行用 `` `BackTop` ``；`docs/guide/usage-sfc.md` 第 92 行同一模板中同时使用 `<f-button>` 和 `<FButton>`。

### 6.4 章节标题的标签层级被当作排版工具（P2）

**问题**：52 篇组件文档用 `#####`（H5）承载"组件简介"这一正文段落。例如：

```
docs/components/alert.md:13   ##### 静态的展示一些区块，提示或者警告，可以动态的去删除
docs/components/back-top.md:10 ##### 当页面内容比较长滚动后需要快捷返回顶部时使用…
docs/components/space.md:16   ##### 可以设置组件和不同dom之间的间距…
```

**影响**：语义上是段落而非标题，会被搜索引擎和 outline 误读；且**11 篇文档没有这行导语**（`affix`、`button`、`button-group`、`config-provider`、`divider`、`icon`、`layout`、`select`、`slider`、`tag`、`tree`），造成页面顶部结构不统一。

**修改建议**：改为普通段落；或统一定义为 `## 何时使用` 小节，与 1.9 的建议合并处理。

### 6.5 `changelog` 内容与实际版本冲突（P1）

**位置**：`docs/guide/changelog.md`

| 问题 | 现状 |
|---|---|
| 版本不一致 | 文档最新版本 `0.0.4 (2023-10-08)`；`package.json` / `src/version.ts` 实际为 `0.0.2`；根 `CHANGELOG.md` 为 `0.0.2 - 2026-09-13` |
| 锚点重复 | 第 31 行 `<h2 id="0.0.3">0.0.3</h2>` 与第 38 行 `<h2 id="0.0.3">0.0.2</h2>` —— **两处 id 相同**，`0.0.2` 的锚点是错的 |
| 日期格式 | `2023-10-08` / `2023-8-23` / `2023-8-22` / `2023-8-21` 补零不统一 |
| 与根 `CHANGELOG.md` 双源 | 两处各维护一份变更日志，内容互不相同 |
| 根 CHANGELOG 存在悬空引用 | 根 `CHANGELOG.md` 第 11 行引用 `docs/CODE_AUDIT_AND_PLAN.md`，该文件已在重构中删除 |
| 无关 CSS 变量 | 第 74 行使用 `var(--vs-theme-bg2)`（Vuesax 主题变量） |

**修改建议**：以根 `CHANGELOG.md` 为唯一数据源，文档页改为引用或自动生成；修正 `id`；统一日期补零；修复悬空引用。

### 6.6 代码块语言标注不统一（P2）

| 位置 | 问题 |
|---|---|
| `docs/components/button.md` 第 389 行、`config-provider.md` 第 113 行、`skeleton.md` 第 145 行 | `<script setup>` 用 ```` ```html ```` 标注，应为 ```` ```vue ```` |
| `docs/guide/common-css.md` 第 211 行 | flex 属性说明用无语言标注的裸围栏 |
| `docs/guide/common-transition.md` | 演示区完全没有代码块 |
| `docs/guide/common-api.md` 第 42-644 行 | 全部函数签名写成 `export function xxx() { // -- }` 的**伪代码**，无参数表、无返回值说明、无类型标注 |

---

## 附：按文件的修复清单（按优先级）

### P0 — 建议立即修复（8 项）

| # | 文件 | 问题 | 对应章节 |
|---|---|---|---|
| 1 | `docs/.vitepress/config.js` | 导航栏 16 个组件入口指向旧模板页面 + base 双斜杠 | 7.1 / 7.2 |
| 2 | `docs/components/back-top.md` | `./demo/Backtop/` 大小写错误，Linux/CI 构建失败 | 7.11 |
| 3 | `docs/components/cascader.md` | 主组件 14 个 props 缺失；示例用不存在的 `:props` | 1.6 / 3.3 |
| 4 | `docs/components/menu.md` | 「折叠」代码块粘贴成 Loading 代码 | 3.2 |
| 5 | `docs/components/message.md` | 「其他参数」代码块粘贴成 Layout 代码 | 3.2 |
| 6 | `docs/components/skeleton.md` | 「自定义」代码块粘贴成 Layout 代码 | 3.2 |
| 7 | `docs/guide/custom-theme.md` | `#expmple` 拼写错误导致演示不渲染；`[TODO]` 残留 | 3.1 / 7.7 |
| 8 | `docs/components/config-provider.md` | 6 个 props 零文档，却被其他文档引导跳转 | 1.1 |

### P1 — 建议本轮修复（约 45 项）

主要包括：
- 全部默认值错误（4.1，11 项）
- 全部 Events 章节缺失（4.4，11 + 24 项）
- 全部导语复制粘贴错误（2.1，4 个文件）
- 帮助函数注册示例写法错误（3.5、3.6）
- 一级标题层级错误（5.1）
- 产品名/组件名/标题命名统一（6.1、6.3）
- `changelog` 版本冲突与重复锚点（6.5）
- `refactor-plan.md` 移出公开文档（5.6、7.10）
- `site/` 移出版本控制（7.8）

### P2 — 建议排期修复（约 75 项）

- 章节标题与内容不符（2.4）
- 模糊表述（2.5）
- Props 章节命名与类型列统一（4.5、4.6）
- 结构不一致与超长页面导航（5.3、5.5）
- 标点、空格、代码块语言标注（6.2、6.4、6.6）
- 薄页面内容补齐（1.9）

---

## 附：建议引入的自动化护栏

为避免上述问题回潮，建议补充三项检查到 CI：

1. **死链检查**：移除 `config.js` 的 `ignoreDeadLinks: true`，让 `vitepress build` 直接失败于死链。
2. **API 一致性检查**：把本次审查使用的「文档 Props 表 ↔ 源码 props」比对脚本固化为 `npm run docs:check-api`，在 PR 阶段拦截默认值/属性名不一致。
3. **示例一致性检查**：把「`#template` 代码块 ↔ `demo/*.vue`」比对脚本固化为 `npm run docs:check-demo`，在 PR 阶段拦截整段粘贴错误。

> 报告结束。全部条目均已定位到具体文件与行号，并附修改建议。

---

## 八、整改闭环（2026-09-15 更新）

本节记录上述 131 项问题的修复结果 —— **全部已闭环**，且原「建议护栏」已全部落地为可执行脚本。

### 8.1 P0 阻断项（8/8 完成）

| # | 文件 | 整改结果 |
|---|---|---|
| 1 | `docs/.vitepress/config.js` | 导航栏重写为 56 个真实组件入口；`base` 双斜杠修复；移除 `/es` 前缀；`ignoreDeadLinks` 关闭 |
| 2 | `docs/components/back-top.md` | `demo/Backtop/` → `demo/BackTop/`，大小写一致 |
| 3 | `docs/components/cascader.md` | 补齐 14 个 props；新增 `## FCascader 配置项`；移除不存在的 `:props` 用法 |
| 4-6 | `menu.md` / `message.md` / `skeleton.md` | 三处错贴代码块全部替换为对应组件真实 demo 代码 |
| 7 | `docs/guide/custom-theme.md` | `#expmple` → `#example`；清除 `[TODO]` 占位 |
| 8 | `docs/components/config-provider.md` | 补齐 6 个 props 的完整 API 说明 |

### 8.2 P1 项（完成）

- **API 准确性（#14）**：默认值 11 项、Events 章节 11+24 项、缺失 props —— 全部修正并通过 `docs:check-api` 校验（**残留 0 项**）。
  - 顺带发现 2 处真实文档 bug：`menu.md` 的伪 `popper-class`、`select.md` 硬编码 `placement`，均已移除。
- **文案与结构（#13）**：导语（lead）规范性归一化、重复 H1 清除（12 篇 guide + 组件页）、API 章节命名统一（57 处 `## 属性`→`## Props` 等）、产品名统一为 `FEI-UI-DESIGN`（正文）/ `fei-ui-design`（代码）、changelog 版本冲突与锚点修复。
- `refactor-plan.md` 移入 `docs/.internal/`（`srcExclude` 排除，不再公开）；`site/` 移出版本控制。

### 8.3 P2 项（完成）

标点/空格归一化（CJK 与半角符号）、代码块语言标注、Props 表类型列统一、薄页面内容补齐、`build/verify-dist.cjs` 的 `STYLELESS_COMPONENTS` 白名单同步。

### 8.4 护栏建设（原「附」章节已落地）

| 原建议 | 落地形态 | 当前状态 |
|---|---|---|
| 死链检查 | `docs:check-links` + `ignoreDeadLinks:false` | ✅ 78 条内部链接，死链 0 |
| API 一致性检查 | `npm run docs:check-api` | ✅ 0 项残留 |
| 示例一致性检查 | `npm run docs:check-demo` | ✅ 缺失引用 0 / 孤儿 demo 0 / 未使用 import 0 |
| （新增）格式规范检查 | `npm run docs:check-style` | ✅ 0 项待修复 |

**聚合入口**：`npm run docs:check`（依次执行 api → links → demo → style）。
**规范依据**：`docs/.internal/docs-style-guide.md`。

### 8.5 遗留发现（待用户决策，非阻断）

- **源码死代码**：`src/dropdown/src/types.ts:41` 的 `CollapseWrapProps` 未被 `dropdown/index.ts` 导出，src/docs 全库零引用 —— 系从 `collapse` 模块复制残留，建议删除。

> 整改闭环结束。
