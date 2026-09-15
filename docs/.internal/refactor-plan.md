# 代码审计与改造计划

> 审计时间：2026-09-13
> 审计范围：`src/`（56 个公共组件 + 内部模块）、`build/`、`docs/`、根级工程配置
> 审计方式：静态扫描脚本 + `vue-tsc` 类型检查 + 真实构建 + 消费方打包冒烟测试
> 目标：使项目可作为独立 npm 包发布，工程质量对标 antd / Element Plus

本文档是**唯一的改造计划来源**（已合并原 `docs/CODE_AUDIT_AND_PLAN.md`，避免两份计划数据互相矛盾）。

---

## 一、项目现状盘点

### 1.1 技术栈

| 维度 | 现状 |
| --- | --- |
| 框架 | Vue 3.4（`<script setup>` + TS） |
| 构建 | Vite 5（多入口 + `preserveModules`）+ `vite-plugin-dts` |
| 样式 | 原生 CSS + PostCSS + Gulp |
| 文档 | VitePress 1.0-rc + `@vitepress-demo-preview` |
| 测试 | Vitest 1 + `@vue/test-utils` |
| 类型检查 | `vue-tsc` 1.8（**存量 1832 处错误，见 §3.3**） |
| 代码规范 | ESLint 8（`.eslintrc.cjs`）+ Prettier，**当前 0 问题** |
| 包管理 | npm（`package-lock.json`，lockfileVersion 3） |

### 1.2 规模统计

| 指标 | 数量 |
| --- | --- |
| `src/` 文件总数 | 419 |
| 公共组件目录 | 56 |
| 内部组件（`src/_internal`） | `empty` `popper` `scrollbar` `collapse-transition` `move-transition` |
| 组件文档 | 59（公共 56 + 内部 3），覆盖率 100% |
| 单元测试文件 | **2**（`button` 4 例 + `collapse` 1 例，共 5 例通过） |
| 类型错误（严格模式） | **1832 处 / 156 个文件** |
| ESLint 问题 | **0**（635 个文件） |

### 1.3 目录结构

```
fei-ui-design/
├── build/                      构建脚本
│   ├── build-style.ts          gulp 样式任务
│   ├── gen-version.cjs         生成 src/version.ts 与 src/info.ts
│   ├── gen-pkg-type.cjs        写入 es/package.json、lib/package.json 模块类型标记
│   ├── verify-dist.cjs         产物完整性静态校验
│   ├── smoke-consumer.cjs      消费方冒烟测试（真实 vite 构建 + SSR）
│   └── util-path.ts            路径与 glob 常量
├── docs/                       VitePress 文档站点
│   ├── .vitepress/             站点配置、主题、侧边栏
│   └── components/             组件文档 + demo/ 示例
├── src/
│   ├── _internal/              内部基础组件（不对外承诺 API）
│   ├── _hooks/                 组合式函数（useTheme 等）
│   ├── _styles/                全局样式与设计变量
│   │   ├── base/vars.css       设计令牌（Design Token）
│   │   └── common/             通用类
│   ├── _utils/                 工具函数（dom / color / util / config）
│   ├── _directives/            自定义指令
│   ├── <component>/            每个组件一个目录
│   │   ├── src/*.vue           组件实现
│   │   ├── src/types.ts        类型定义
│   │   ├── styles/*.css        组件样式
│   │   ├── test/*.test.ts      单元测试
│   │   └── index.ts            对外出口
│   ├── components.ts           全量组件聚合导出
│   ├── create.ts               插件工厂（install / 按需注册）
│   ├── preset.ts               全量 preset（含 Message / MessageBox / Notice / LoadingBar）
│   └── index.ts                包总出口
├── .github/workflows/          CI / Release
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

**评价**：目录分层已具备成熟组件库的雏形，主要问题不在结构，而在**产物一致性、工程化护栏与类型纪律**。

---

## 二、目标架构与目录规范

### 2.1 分层职责

| 层 | 目录 | 职责 | 对外可见 |
| --- | --- | --- | --- |
| 包出口层 | `src/index.ts`、`components.ts`、`preset.ts` | 汇总导出、插件工厂 | ✅ 稳定 API |
| 组件层 | `src/<component>/` | 单组件自治：实现 + 类型 + 样式 + 测试 | ✅ |
| 内部组件层 | `src/_internal/` | 复用的基础组件，API 不承诺稳定 | ⚠️ 不承诺 |
| 组合式函数层 | `src/_hooks/` | 跨组件逻辑复用 | ⚠️ 不承诺 |
| 设计系统层 | `src/_styles/` | 设计令牌、主题、通用类 | ✅（CSS 变量） |
| 工具层 | `src/_utils/` | 纯函数工具 | ⚠️ 不承诺 |

### 2.2 单个组件的标准结构（强制）

```
src/<component>/
├── src/
│   ├── <Component>.vue          实现
│   └── types.ts                 类型（props / emits / 插槽）
├── styles/
│   └── index.css                按需样式
├── test/
│   └── <Component>.test.ts      单元测试
└── index.ts                     出口：具名导出组件 + 类型
```

**约定**：

1. `index.ts` 必须导出一个与目录语义一致的组件，命名统一 `F` 前缀 PascalCase（如 `FButton`）。
2. 组件内 `defineOptions({ name: 'FButton' })`，与 `index.ts` 导出名保持一致。
3. 样式在组件内 `import '../styles/index.css'`，保证按需引入即带样式（无样式组件除外，见 §3.1）。
4. 类型从 `src/types.ts` 导出，禁止在 `index.ts` 中声明不存在的类型。

---

## 三、问题清单与处理状态

### 3.1 P0 — 阻断性缺陷（已全部修复）

| # | 问题 | 位置 | 影响 |
| --- | --- | --- | --- |
| 1 | `export type { Props }` 导出了不存在的类型 | `src/input/index.ts` | 使用者 `import type` 直接编译失败 |
| 2 | 引用 `./item.vue`，实际文件为 `Item.vue` | `src/space/src/Space.vue` | Linux / CI 等大小写敏感文件系统构建失败 |
| 3 | `types: String`（应为 `type`） | `src/form/src/types.ts` | `size` 校验器完全失效，非法值不报错 |
| 4 | 引用已删除的变量 `--fei-color-text-white` | `src/_styles/base/vars.css` | 暗色主题文字颜色静默回落 |
| 5 | 引用不存在的 `./main/expand.js` | `src/table/src/table-body.vue` | 表格展开行逻辑断裂 |
| 6 | 样式 glob 在 Windows 下**静默匹配 0 文件** | `build/build-style.ts` | 按需样式全部缺失（gulp 空匹配只告警不报错） |
| 7 | **包入口路径与产物不一致** | `package.json` | ⚠️ 发布后包完全无法导入 |
| 8 | **组件级入口 `index.js` 全部缺失** | `vite.config.ts` | 按需引入指向的文件根本不存在 |
| 9 | 按需样式落错目录（`es/src/<c>/`） | `build/build-style.ts` | 与 JS 产物层不一致，样式 404 |
| 10 | `lib/` 是 CJS，但根 `package.json` 为 `type: module` | `package.json` | `require('fei-ui-design')` 直接抛错 |
| 11 | `exports` 子路径不支持目录索引解析 | `package.json` | `import 'fei-ui-design/es/button'` 解析失败 |
| 12 | `.eslintrc.js` 在 `type: module` 下用 `module.exports` | `.eslintrc.js` | ⚠️ ESLint 完全无法启动，lint 形同虚设 |
| 13 | `.eslintignore` 被 `--ignore-path .gitignore` 覆盖 | `package.json` | 在 lint **已构建产物**（`site/`），产生数千条假问题 |
| 14 | 库构建因 terser 内存溢出中断 | `vite.config.ts` | 无法产出 `lib/` |
| 15 | 声明文件重复输出到 3 处 | `vite.config.ts` | 产物冗余、类型入口指向不明 |

#### 重点说明

**#7 / #8 / #9（本次修复的核心，属「构建成功但产物不可用」）**

这三项是组件库最隐蔽、后果最严重的缺陷类型——本地 `npm run build` 全部成功，
但装到使用者项目里会直接失败：

```
修复前 package.json 声明  vs  实际产物
main  : ./lib/src/index.js   ← 实际是 ./lib/index.js     ❌
module: ./es/src/index.mjs   ← 实际是 ./es/index.js      ❌
types : ./es/src/index.d.ts  ← 实际是 ./es/index.d.ts    ⚠️ 基准不同
```

`#8` 的根因尤其典型：`rollupOptions.input` 只声明 `src/index.ts` 一个入口时，
rollup 会把「纯 re-export」的组件入口模块**合并进 `components.js`**，
于是 `es/button/index.js` 从未生成——而 `.d.ts` 却是按目录逐文件产出的，
形成「**有类型、没实现**」的错位。修复方式：显式声明全部组件入口（58 个 `index.ts`），
并设置 `preserveEntrySignatures: 'strict'`（vite 在库模式下默认置为 `false`，与 `preserveModules` 冲突会直接报错）。

**#10（双格式共存的经典陷阱）**

`es/` 与 `lib/` 同为 `.js` 后缀、但一个是 ESM、一个是 CJS。根 `package.json` 声明
`"type": "module"` 后，`lib/*.js` 会被 Node 误判为 ESM。修复方式与 antd / Element Plus 一致：
在产物目录内放置就近生效的 `package.json`（`build/gen-pkg-type.cjs` 在构建后写入）：

```
es/package.json   → { "type": "module" }
lib/package.json  → { "type": "commonjs" }
```

同时**刻意不使用 `.mjs` / `.cjs` 后缀**：dts 插件产出的是 `.d.ts`，
若 JS 用 `.mjs`，TypeScript 会去找 `.d.mts` 而解析失败。

**#11（exports 子路径不做目录索引解析）**

`"./es/*": "./es/*"` 这类直通映射不会做 `index.js` 补全，因此
`fei-ui-design/es/button` 解析不到文件。修复为带回退的数组形式：

```json
"./es/*":  ["./es/*/index.js", "./es/*"],
"./lib/*": ["./lib/*/index.js", "./lib/*"]
```

既支持 `fei-ui-design/es/button`（目录式），也保留 `fei-ui-design/es/button/styles/index.css`（深路径）。

**#13（测量失真带来的误判）**

`--ignore-path .gitignore` 使 `.eslintignore` 完全失效，ESLint 因此扫描了 `site/`
下的**压缩构建产物**，报出 4132 个问题（1803 error）。修正忽略规则后，
真实问题仅 **41 个**（13 error / 28 warning）。这说明：先修测量工具，再修代码。

### 3.2 P1 — 一致性与工程化（已修复）

| # | 问题 | 处理 |
| --- | --- | --- |
| 16 | 组件命名混乱（`B` 前缀 / 无前缀 / 与内部组件重名），共 27 处 | 统一为 `F` 前缀，同步更新导出与类型名 |
| 17 | 全局注册用 `name.slice(1)` 推导注册名，会把 hook、渲染函数也注册进去 | `create.ts` 增加 `isRegisterableComponent` 守卫 + `resolveGlobalName` 归一化 |
| 18 | ESLint 配置引用未安装的 `@babel/eslint-parser` | 改为 `vue-eslint-parser` + `@typescript-eslint/parser` |
| 19 | `tsconfig` 的 `composite` 与 `vue-tsc --noEmit` 冲突 | 移除 `composite` |
| 20 | `vitest.config.ts` 缺少 `include` / `coverage` 配置 | 补齐测试匹配范围与环境 |
| 21 | `vue` 放在 `dependencies` | 改为 `peerDependencies`，避免宿主多实例 |
| 22 | 缺少 `exports` / `sideEffects` 条件导出 | 补齐 ESM / CJS / 类型三路解析 |
| 23 | `button-group` 有组件无文档 | 新增 `docs/components/button-group.md` + 2 个示例 |
| 24 | 声明类型引用 `BTimelineProps` 等旧名 | 统一为 `FTimelineProps` / `FTimelineItemProps` |
| 25 | 大量 stale 的 `// eslint-disable-next-line no-unused-vars`（规则名已变更，注释失效） | 清理并按实际规则修正代码 |
| 26 | 未使用变量 / `this` 别名 / `.apply()` 展开 / 废弃 `.native` 修饰符 | 逐项修复，lint 归零 |
| 27 | vitest 临时产物 `vitest.config.ts.timestamp-*.mjs` 残留在仓库根 | 删除并加入 `.gitignore` |

#### 修复过程中暴露的真实缺陷（非风格问题）

| 组件 | 问题 | 修复 |
| --- | --- | --- |
| `upload/UploadList.vue` | `@click.native` 是 **Vue 2 已移除**的修饰符，Vue 3 下事件不触发 | 改为 `@click` |
| `loading/Loading.vue` | `<Transition>` 包裹静态节点，无 `v-if` / `v-show`，**过渡效果从未生效** | 引入内部 `visible` 状态并暴露 `show()` / `hide()` |
| `select/Select.vue` | `v-if` 写在 `<transition>` 自身，`@after-leave` 永不触发、`resetInputHeight` 从不执行 | `v-if` 下移到子节点 |
| `table/src/main/util.ts` | `push.apply` 展开（大表可能触发参数上限） | 改为展开运算符 |
| `docs/.../Table/Drag.vue` | 插槽参数 `row` 未使用（`vue/no-unused-vars` error） | 移除无用插槽参数 |
| `docs/.../Cascader/Custom.vue` | `selected` 展示但从未更新、`handleChange` 未绑定，示例实际不可用 | 补 `v-model` 与 `@change` 绑定 |

### 3.3 P2 — 类型安全（**未完成，本次最大遗留项**）

**现状**：`vue-tsc --noEmit` 报告 **1832 处错误 / 156 个文件**。

| 错误码 | 数量 | 含义 | 根因 |
| --- | --- | --- | --- |
| TS7006 | 972 | 参数隐式 `any` | 由 JS 迁移而来，函数参数未标注类型 |
| TS2339 | 323 | 属性不存在 | class 未声明字段；`inject()` 未指定类型 |
| TS7053 | 91 | 索引签名缺失 | 动态键访问对象 |
| TS18046 | 75 | 值类型为 `unknown` | `catch` / 未定型返回值 |
| TS2322 | 69 | 类型不可赋值 | 联合类型收窄不足 |
| TS7005 | 51 | 变量隐式 `any` | 同 TS7006 |
| 其他 | 251 | — | — |

**错误最密集的文件**：

| 文件 | 错误数 |
| --- | --- |
| `src/color-picker/src/color.ts` | 92 |
| `src/select/src/useSelect.ts` | 85 |
| `src/cascader/utils/node.ts` | 69 |
| `src/table/src/Table.vue` | 63 |
| `src/table/src/table-body.vue` | 51 |
| `src/_utils/dom.ts` | 47 |

**结论**：这是历史存量债务，无法在一次改造中清零，必须分阶段推进。
其中 TS2339 多为**真实缺陷**（如 class 声明了 `this.uid` 却无字段声明，
严格模式下类型推断完全失效）。

**分阶段路线图**：

| 阶段 | 目标 | 手段 | 验收 |
| --- | --- | --- | --- |
| S1 | 消除 TS2339（323） | 为 class 补齐字段声明；`inject<T>()` 补类型参数 | 错误数 ≤ 1500 |
| S2 | 消除 TS7006 / TS7005（1023） | 按目录批量补参数类型（`_utils` → 简单组件 → 复杂组件） | 错误数 ≤ 400 |
| S3 | 清零并开启阻断 | 剩余零散错误逐个修复；CI 移除 `continue-on-error` | `type-check` 通过 |
| S4 | 收紧严格度 | 开启 `noUncheckedIndexedAccess`、`exactOptionalPropertyTypes` | — |

> S1 切入点清晰：`src/cascader/utils/node.ts`、`src/color-picker/src/color.ts`
> 均为「class 字段未声明」型问题，属低风险机械修复。

### 3.4 P2 — 测试体系（未完成）

- 仅 2 个测试文件、5 个用例（`button` 4 例 + `collapse` 1 例），
  对比 56 个公共组件，覆盖率极低。
- 缺少快照测试、可访问性测试、SSR 渲染测试。
- `vitest.config.ts` 已补齐配置，具备铺开条件。

### 3.5 P3 — 待建设能力

| 能力 | 说明 |
| --- | --- |
| 无障碍（a11y） | 未系统化补齐 `aria-*`、`role`、键盘导航；建议引入 `vitest-axe` 做回归 |
| 国际化 | `ConfigProvider` 已存在，但组件内文案未统一走 locale |
| 按需引入插件 | 建议提供 `unplugin-vue-components` resolver，替代手工引样式 |
| SSR 兼容 | 样式以 `import '../styles/index.css'` 保留在 JS 中（利于 SPA 零配置），SSR 需 `ssr.noExternal`（见 §5.4）；另有部分组件直接访问 `document` / `window`，需环境守卫 |
| 主题定制 | 已具备 CSS 变量体系，缺「运行时换肤」文档与示例 |
| 浏览器矩阵 | 未声明 `browserslist`，`autoprefixer` 目标不明确 |

---

## 四、改造计划

| 阶段 | 内容 | 状态 |
| --- | --- | --- |
| 阶段一 | 修复阻断性缺陷（§3.1 的 15 项），使项目可构建、产物完整 | ✅ 已完成 |
| 阶段二 | 统一命名 + 加固注册逻辑（§3.2 #16 #17） | ✅ 已完成 |
| 阶段三 | 工程化护栏：lint 可运行且归零、忽略规则修正、真实缺陷修复（§3.2 #18–#27） | ✅ 已完成 |
| 阶段四 | 发布链路：入口一致性、双格式模块标记、按需引入可解析、产物校验与冒烟测试（§5） | ✅ 已完成 |
| 阶段五 | 类型安全：按 S1→S4 推进（§3.3） | ⏳ 待执行 |
| 阶段六 | 测试与质量门禁：补齐组件测试、移除 `type-check` 的 `continue-on-error`（§3.4） | ⏳ 待执行 |
| 阶段七 | 能力补全：a11y → i18n → 按需引入插件 → SSR 守卫 → 主题文档（§3.5） | ⏳ 待执行 |

---

## 五、构建、打包与发布流程

### 5.1 本地命令

```bash
npm install              # 安装依赖
npm run dev              # 启动文档站点（本地调试组件）
npm run test             # 运行单元测试
npm run test:coverage    # 覆盖率
npm run type-check       # 类型检查
npm run lint             # 代码风格检查并自动修复
npm run lint:check       # 只检查不修复（CI 用）
npm run build:package    # 完整构建：clean → 版本号 → JS 产物 → 模块标记 → 样式产物
npm run build:site       # 构建文档站点
npm run verify:dist      # 产物完整性静态校验（6 组断言）
npm run smoke            # 消费方冒烟测试（真实 vite 构建 + SSR）
npm run verify           # verify:dist + smoke
npm run release:patch    # npm version patch + push --follow-tags（触发自动发布）
```

### 5.2 产物结构

```
es/                                ESM 产物（.js，由 es/package.json 标记 type: module）
├── index.js                       全量入口
├── index.d.ts                     类型声明（与 JS 同层）
├── <component>/
│   ├── index.js                   组件入口（按需引入）
│   ├── index.d.ts
│   └── styles/index.css           组件按需样式
├── _utils/  _hooks/  _internal/  _directives/
└── package.json                   { "type": "module", "sideEffects": ["**/*.css"] }

lib/                                CJS 产物（结构同上，package.json 标记 type: commonjs）

dist/styles/
├── index.css                       全量样式（已内联依赖、已压缩、已加前缀）
├── base.css                        设计令牌
├── components.css                  组件样式
├── icon.css                        图标样式
├── common/                         通用类
└── fonts/                          图标字体
```

### 5.3 三种使用方式

```ts
// 1. 全量引入
import FUI from 'fei-ui-design'
import 'fei-ui-design/styles/index.css'   // 或 'fei-ui-design/dist/styles/index.css'
app.use(FUI)

// 2. 具名按需引入（推荐，可 tree-shaking）
import { FButton, FInput } from 'fei-ui-design'

// 3. 子路径按需引入（仅打包该组件，样式随组件自动引入）
import { FButton } from 'fei-ui-design/es/button'
```

> 本库统一使用**具名导出**（`exports: 'named'`），与 `unplugin-vue-components`
> 自动导入的约定一致，因此不提供默认导出。

### 5.4 SSR 使用说明

组件样式以 `import '../styles/index.css'` 的形式保留在 JS 产物中，
使 SPA 使用方**无需手动引样式**；代价是 Node 原生 ESM 无法解析 `.css`。
因此在 SSR（Nuxt / Vite SSR）环境下需要让打包器处理该依赖：

```ts
// vite.config.ts / nuxt.config.ts
export default defineConfig({
  ssr: { noExternal: ['fei-ui-design'] }
})
```

`npm run smoke` 已覆盖该场景并验证通过。

### 5.5 质量门禁

`verify-dist.cjs` 的 6 组断言（任一失败即 CI 失败）：

1. **包入口一致性** — `main` / `module` / `types` / `exports` 指向的文件真实存在
2. **双格式模块标记** — `es/package.json` 为 `module`、`lib/package.json` 为 `commonjs`
3. **组件级入口与按需样式** — 56 个组件全部产出 `es|lib/<c>/index.js` 与 `styles/index.css`
   （`config-provider`、`count-to` 为无样式组件，走白名单并做反向校验）
4. **全量样式产物** — 文件齐备、无残留 `@import`（证明 postcss 生效）、含主题变量
5. **模块格式与语法** — `node --check` 校验 ESM / CJS 入口可解析；依赖未被内联
6. **发布内容** — `README` / `CHANGELOG` / `LICENSE` 齐备、`files` 白名单、`publishConfig`

`smoke-consumer.cjs` 的端到端断言：

- 按 `files` 白名单真实拷贝出「安装后的包」
- 以真实 vite 执行客户端构建，断言产出 CSS 且包含 `.fei-button` 等组件样式
- 断言全量引入与按需引入的组件均进入 bundle
- 以 `ssrLoadModule` + `renderToString` 验证 SSR 渲染正常

### 5.6 发布步骤

```bash
# 1. 更新版本号并打 tag（自动 commit + tag）
npm run release:patch     # 或 release:minor / release:major

# 2. 同步 CHANGELOG.md（可后续接入 changesets 自动化）

# 3. push 后触发 GitHub Actions
git push --follow-tags
```

流水线（`.github/workflows/release.yml`）会自动：

1. 校验 tag 与 `package.json` version 一致（不一致直接失败）
2. lint → test → build → `verify`（产物校验 + 冒烟测试）
3. `npm publish --access public`
4. 创建 GitHub Release

> 需在仓库 `Settings → Secrets` 配置 `NPM_TOKEN`（npm Automation Token）。

### 5.7 包管理器统一说明

原仓库同时存在 `pnpm-lock.yaml`，但执行环境中 pnpm / corepack 均不可用，
脚本却引用 `pnpm run`，存在实际执行风险。现已统一为 **npm**：

- 删除 `pnpm-lock.yaml`，生成并提交 `package-lock.json`（lockfileVersion 3）
- 所有脚本、CI、Release 流程改用 `npm` / `npm ci`

---

## 六、验收标准

### 功能与产物

- [x] `npm run build:package` 可完整产出 `es/` `lib/` `dist/styles/`
- [x] ESM / CJS / 类型声明三路入口存在，且与 `package.json` 声明**逐项一致**
- [x] 56 个组件全部产出 `index.js`（按需引入可用），54 个有样式组件产出按需样式
- [x] 组件文档覆盖率 100%（59 / 59）
- [x] 全量引入 / 具名按需 / 子路径按需三种用法均通过真实打包验证
- [x] SSR 渲染通过（配合 `ssr.noExternal`）

### 工程化

- [x] CI 覆盖 lint / test / build / 产物完整性 / 消费方冒烟
- [x] `npm run lint:check` **0 问题**，CI 中为阻断项
- [x] 打 tag 可自动发布 npm 包（含版本号一致性校验）
- [ ] `npm run type-check` 通过 ← **阶段五**
- [ ] 单元测试覆盖全部公共组件 ← **阶段六**
- [ ] CI 中类型检查为阻断项 ← **阶段六**

### 规范

- [x] 组件命名统一 `F` 前缀（111 处 `name` 声明全部合规）
- [x] 单个组件目录结构一致（实现 / 类型 / 样式 / 测试 / 出口）
- [x] 公开 API 均有类型导出，无「导出不存在类型」类错误
- [x] 计划文档唯一，无互相矛盾的多份版本
- [ ] 全部组件具备 a11y 属性 ← **阶段七**

---

## 七、后续建议（优先级排序）

1. **类型债务清零**（阶段五）——直接决定使用者体验与包的专业度，优先启动 S1。
2. **测试体系铺开**（阶段六）——避免重构类型时引发回归，建议与 S1 / S2 并行。
3. **按需引入插件**——提供 `unplugin-vue-components` resolver，显著降低接入成本。
4. **a11y 与 i18n**——对标 antd 的必备项。
5. **接入 `changesets`**——管理版本与 CHANGELOG 自动生成，替代手工维护。
6. **声明 `browserslist`**——让 `autoprefixer` / esbuild 的降级目标明确可控。
7. **不要把构建产物提交进仓库**——`docs/.vitepress/config.js` 把 VitePress 的
   `outDir` 设为 `../site`，而 `site/` 被提交进了仓库（359 个文件）。这带来两个问题：
   - 每次改文档都会让 `site/assets/*` 的 hash 文件名整体变动，产生数万行无意义 diff；
   - 该目录曾被 ESLint 扫描，制造出数千条假问题（见 §3.1 #13）。
   建议将 `site/` 移出版本控制（加入 `.gitignore`），改为在 CI 中构建并发布产物；
   若 Gitee Pages 必须直接读取该目录，则应同时在 CI 中加一步「重新生成 `site/` 并校验无差异」。
