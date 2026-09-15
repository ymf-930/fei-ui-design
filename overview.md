# 文档审查任务 · 概览

## 做了什么

对 `fei-ui-design` 组件库的**在线使用文档**做了一次系统性审查，覆盖 `docs/` 下 73 个 Markdown（22,238 行）、VitePress 站点配置与 `site/` 构建产物，最终产出 **131 项**可按行号定位的问题清单。

完整报告：**`docs-audit-report.md`**

## 审查方法（不只是通读）

除人工通读外，编写了 4 个校验脚本，把"文档与实现是否一致"变成可证伪的检查：

| 手段 | 目的 | 结果 |
|---|---|---|
| 结构与链接扫描 | 提取全部标题层级、内部链接、demo 引用 | 发现 52/59 组件页无 H1、19 处 API 章节名不规范、5 处内链带错误 `.html` |
| **文档 Props 表 ↔ 源码 props 自动比对** | 解析 3 种 props 定义形态（interface / 运行时对象 / withDefaults）+ spread 继承 | 248 项原始差异，人工复核后确认 **11 处默认值错误、34 处属性缺失/多余** |
| **`#template` 代码块 ↔ `demo/*.vue` 比对** | 校验文档展示的源码是否等于真实渲染的 demo | 确认 3 处"整段粘贴成别的组件"的严重错误 |
| 构建产物链接校验 | 直接解析 `site/*.html` 的内嵌路由表 | 证实导航栏 16 个入口全是死链、base 拼接出现双斜杠 |

## 关键结论

**6 个必须先修的问题**

1. 导航栏「组件」下拉的 16 个入口全部指向旧 Vuesax 模板页面，且 URL 因 base 拼接出现双斜杠——整条导航不可用。
2. `back-top.md` 引用 `./demo/Backtop/`，目录实为 `BackTop/`——Linux/CI 上文档站构建会直接失败。
3. `cascader.md` 末尾 `## Props` 写的是 Element Plus 的 `props` 配置子项，FCascader 自身 14 个 props 完全缺失；示例还用了不存在的 `:props="props"`。
4. `menu.md` / `message.md` / `skeleton.md` 的示例代码块整段粘贴成了 Loading / Layout 的代码——**展示的源码与渲染结果无关**。
5. `custom-theme.md` 把 `#example` 写成 `#expmple`（1/291 处），主题演示不渲染；正文还残留 `[TODO]` 占位。
6. `config-provider.md` 有 6 个 props 但零 API 文档，而 `custom-theme.md` 恰恰把用户引导到这个页面。

**暴露出的两个系统性根因**

- **文档从一个 Vue2/Element Plus 版本整体迁移过、未做 API 校正**：`value / v-model`、`emitPath`、`hide-delay`、`auto-close`、`align` 这批 Vue2/EP 专有名称成批出现；`config.js` 里还留着 Vuesax 模板的社交链接与 `linkPrevVersion`。
- **`ignoreDeadLinks: true` 掩盖了所有链接问题**：删掉它，7.1–7.5 的死链会在构建阶段全部暴露。

## 建议的后续动作

1. 先修 P0 的 8 项（报告末尾附清单）。
2. 把本次的 3 个比对脚本固化为 `npm run docs:check-api` / `docs:check-demo`，并在 CI 中移除 `ignoreDeadLinks: true`，形成护栏。
3. 新建《文档编写规范》，固化 API 章节顺序、类型列写法、产品名与标点规则——当前 59 个页面的 API 章节有 6 种写法、产品名有 6 种写法。

## 说明

本次为**只读审查**，未修改任何文档内容；报告为新增文件，不影响现有站点构建。
