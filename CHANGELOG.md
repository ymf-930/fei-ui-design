# Changelog

本项目的所有重要变更都会记录在此文件。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### 变更

- 首页演示区统一由组件库真实组件渲染（`FButton` / `FInput` / `FCheckbox`），
  控件的盒型、间距、配色与组件文档页保持一致。
- 文档站排版收敛到单一权威层（`docs/.vitepress/theme/styles/doc-typography.styl`）：
  标题、正文、列表、代码块、表格的字号 / 行高 / 间距不再分散在多个文件里互相覆盖。

### 修复

- 文档站：导航、侧边栏、站内搜索、明暗切换的若干缺陷；页内链接与悬浮提示的英文残留。
- 清除被浏览器静默丢弃的样式：未定义的 Stylus 变量会让整条声明（或整个 `@media` 块）
  原样进入产物后被浏览器丢弃，构建期零警告；现已纳入产物护栏。

### 清理

- 删除文档站中不可达的主题组件与样式文件，以及未被任何入口引用的静态资源（合计约 10.3 MB）。

### 待办（类型债务，按优先级排序）

- 消除 `vue-tsc --noEmit` 暴露的类型错误（详见 `docs/.internal/refactor-plan.md` §3.3）：
  当前严格模式下 156 个文件共 1832 处错误，其中 TS7006（隐式 any 参数）占 972 处。
- 为复杂组件补齐单元测试（当前仅 `button`、`collapse` 两个组件有测试，共 5 条用例，覆盖 56 个组件）。

## [0.0.2] - 2026-09-13

### 修复

- **阻断性缺陷**
  - `input/index.ts` 导出了不存在的类型 `Props`，导致 `import type` 直接报错；
    现已改为从 `./src/types` 正确导出 `inputProps` / `InputProps`，并保留 `Props` 别名兼容旧引用。
  - `space/src/Space.vue` 引用 `./item.vue`，与实际文件名 `Item.vue` 大小写不一致，
    在 Linux / CI 等大小写敏感的文件系统上会构建失败。
  - `form/src/types.ts` 误写 `types: String`（应为 `type`），导致 `size` 校验器完全失效。
  - `_styles/base/vars.css` 缺失 `--fei-color-text-white` 等被引用的主题变量，
    造成暗色主题下文字颜色静默回落。
  - `table/src/table-body.vue` 引用不存在的 `./main/expand.js`。

- **构建与产物**
  - `build/build-style.ts` 的组件样式 glob 在 Windows 下静默匹配不到任何文件，
    导致按需样式 `es/<component>/styles/index.css` 完全缺失；已统一 POSIX 路径。
  - `vite.config.ts` 残留已移除的 `@rollup/plugin-terser` 导入。
  - 声明文件此前重复输出到 `es`、`lib`、`dist/@types` 三处，现统一为与 JS 同目录输出。

### 变更

- 组件 `name` 与各组件 `index.ts` 的导出一律采用 `F` 前缀 PascalCase，命名风格全库一致。
- `src/create.ts` 的全局注册逻辑加固：仅在 `name` 为 PascalCase 时注册，
  自动跳过 hook / 渲染函数等非组件导出，避免向 `app.component()` 注册无效项。
- `vue` 由 `dependencies` 调整为 `peerDependencies`，避免宿主工程出现多实例 Vue。
- `package.json` 补充 `exports` 条件导出、`sideEffects`、`publishConfig`、`engines` 与 `files` 白名单。

### 新增

- `LICENSE`（MIT）、`CHANGELOG.md`。
- GitHub Actions：`ci.yml`（lint / test / build 校验）、`release.yml`（打 tag 自动发布 npm）。
- `docs/components/button-group.md` 及配套示例，补齐此前缺失的文档。

### 移除

- `.npmignore`（改由 `package.json` 的 `files` 白名单统一管控，避免 `*.md` 误排除 README / CHANGELOG）。

[Unreleased]: https://gitee.com/ymf-930/fei-ui-design/compare/v0.0.2...HEAD
[0.0.2]: https://gitee.com/ymf-930/fei-ui-design/releases/tag/v0.0.2
