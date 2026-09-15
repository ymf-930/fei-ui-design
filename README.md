# Fei UI Design

[![NPM version](https://img.shields.io/npm/v/fei-ui-design.svg)](https://www.npmjs.com/package/fei-ui-design)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

面向 Vue 3 的企业级中后台组件库，提供 59 个开箱即用的组件，完整支持 TypeScript、
按需引入与 CSS 变量主题定制。

> 本项目由 [fei-ui-one](https://ymf-930.gitee.io/fei-ui-one/#/guide) 升级而来，可平滑迁移。

## 特性

- **Vue 3 专属** — 基于 `<script setup>` + TypeScript 编写，不支持 Vue 2
- **完整类型** — 全部组件与 props 均有类型声明，`es/` 与 `lib/` 各自携带 `.d.ts`
- **可 tree-shaking** — 支持全量引入、具名按需引入、子路径按需引入三种方式
- **按需样式自动加载** — 子路径引入组件时样式随之带入，无需手动引 CSS
- **主题可定制** — 基于 CSS 变量（Design Token）体系，支持主题覆盖
- **文档完备** — 59 篇组件文档与在线示例

## 安装

```sh
npm i fei-ui-design
# 或
pnpm add fei-ui-design
# 或
yarn add fei-ui-design
```

仅支持 Vue 3（`vue >= 3.2`）。

## 快速开始

### 全量引入

```ts
import { createApp } from 'vue'
import FUI from 'fei-ui-design'
import 'fei-ui-design/styles/index.css'
import App from './App.vue'

createApp(App).use(FUI).mount('#app')
```

### 具名按需引入（推荐）

借助打包器的 tree-shaking 只保留用到的组件：

```ts
import { FButton, FInput } from 'fei-ui-design'
```

### 子路径按需引入

只打包指定组件，样式随组件自动引入：

```ts
import { FButton } from 'fei-ui-design/es/button'
```

> 本库统一使用**具名导出**，与 `unplugin-vue-components` 自动导入的约定一致，
> 因此不提供默认导出。

## SSR（Nuxt / Vite SSR）

组件样式以 `import '../styles/index.css'` 的形式保留在 JS 产物中，
因此 SPA 使用方无需手动引样式。SSR 环境下需让打包器处理该依赖：

```ts
// vite.config.ts / nuxt.config.ts
export default defineConfig({
  ssr: { noExternal: ['fei-ui-design'] }
})
```

## 主题定制

设计令牌集中在 `src/_styles/base/vars.css`，全部以 `--fei-*` 变量暴露，
通过覆盖变量即可换肤：

```css
:root {
  --fei-color-primary: #2f6bff;
}
```

详见[自定义主题](https://ymf-930.gitee.io/fei-ui-design/guide/custom-theme.html)。

## 本地开发

```sh
npm install          # 安装依赖
npm run dev          # 启动文档站点，本地调试组件
```

## 构建与校验

```sh
npm run build:package   # 完整构建：clean → 版本号 → JS 产物 → 模块标记 → 样式产物
npm run build:site      # 构建文档站点

npm run lint:check      # 代码风格检查
npm run type-check      # 类型检查
npm run test            # 单元测试
npm run verify:dist     # 产物完整性校验（入口一致性 / 按需产物 / 发布内容）
npm run smoke           # 消费方冒烟测试（真实 vite 构建 + SSR）
npm run verify          # verify:dist + smoke
```

产物结构：

```
es/       ESM 产物（.js + 同名 .d.ts），含 es/<component>/index.js 与 styles/index.css
lib/      CJS 产物（结构同上）
dist/     样式产物：styles/index.css（全量）、base.css、components.css、common/、fonts/
```

## 发布

```sh
npm run release:patch   # 或 release:minor / release:major
# 会自动 commit + 打 tag，push 后由 GitHub Actions 发布到 npm
git push --follow-tags
```

发布流水线会在 `publish` 前依次执行 版本号一致性校验 → lint → test → build →
产物校验 → 消费方冒烟测试，任一环节失败即中止发布。

> 需在仓库 `Settings → Secrets` 配置 `NPM_TOKEN`（npm Automation Token）。

## 文档

- [安装](https://ymf-930.gitee.io/fei-ui-design/guide/installation.html)
- [在 SFC 中使用](https://ymf-930.gitee.io/fei-ui-design/guide/usage-sfc.html)
- [按需引入](https://ymf-930.gitee.io/fei-ui-design/guide/import-on-demand.html)
- [自定义主题](https://ymf-930.gitee.io/fei-ui-design/guide/custom-theme.html)

> 内部的代码审计与改造计划（含类型债务路线图）位于
> [`docs/.internal/refactor-plan.md`](./docs/.internal/refactor-plan.md)，不参与在线文档站构建。

## 许可证

[MIT](./LICENSE)
