# 代码审计与改造计划

> 审计时间：2026-09-13
> 审计范围：`src/`（56 个公共组件 + 内部模块）、`build/`、`docs/`、根级工程配置
> 审计方式：静态扫描脚本 + `vue-tsc` 类型检查 + 真实构建 + 消费方打包冒烟测试
> 目标：使项目可作为独立 npm 包发布，工程质量对标 antd / Element Plus

本文档是**唯一的改造计划来源**（已合并原 `docs/CODE_AUDIT_AND_PLAN.md`，避免两份计划数据互相矛盾）。

> **第二轮全量审计（2026-09-15）见 §八** —— 记录第一轮修复之后**当前仍存在**的问题，
> 按 P0/P1/P2/P3 分级并附证据、成因、影响与整改顺序。§一 / §五 / §七 中的过时事实已就地更正。

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
| 包管理 | pnpm（`pnpm-lock.yaml`，lockfileVersion 9.0），`packageManager` 锁定 `pnpm@10.34.5` |

### 1.2 规模统计

| 指标 | 数量 |
| --- | --- |
| `src/` 文件总数 | 419 |
| 公共组件目录 | 56 |
| 内部组件（`src/_internal`） | `empty` `popper` `scrollbar` `collapse-transition` `move-transition` |
| 组件文档 | 60（公共 56 + 内部 3 + 索引 1），覆盖率 100% |
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

### 5.7 包管理器统一说明（2026-09-15 更正）

本节原结论「执行环境中 pnpm / corepack 均不可用，故统一为 npm」**经复核有误**：
corepack 0.34.6 一直可用，当时是判断失误。项目已切回 **pnpm**：

- 已删除 `package-lock.json`，恢复并提交 `pnpm-lock.yaml`（lockfileVersion 9.0）
- `packageManager: pnpm@10.34.5` 为版本的唯一事实来源，`engines.pnpm = ">=10.0.0 <11.0.0"`
- 所有脚本、CI、Release 改用 `pnpm` / `pnpm install --frozen-lockfile`
- 执行方式：`corepack enable pnpm`，由 corepack 按 `packageManager` 自动准备版本

选择 pnpm 10.x 的原因：pnpm 11 要求 Node >= 22.13，与「Node 20 起可用」的声明冲突；
10.x 是最后一个同时支持 Node 20 的大版本。详见 README「环境要求」。

> 注意：聚合脚本（`build:package` / `docs:check` / `verify` / `prepublishOnly`）
> 已改用 `run-s`（`npm-run-all`）而非嵌套 `pnpm run` —— 嵌套写法按 PATH 解析 pnpm，
> 会被 `engines.pnpm` 校验拦下（本机曾存在全局 pnpm 9.15.9）。

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
7. ~~**不要把构建产物提交进仓库**~~ —— **已于 2026-09-15 解决**。
   原问题是 `site/`（VitePress 输出目录）被提交进仓库（359 个文件），
   导致每次改文档都产生数万行 `site/assets/*` 的 hash 变动 diff，
   且该目录曾被 ESLint 扫描制造出数千条假问题（见 §3.1 #13）。
   现 `/site/`、`es/`、`lib/`、`dist/` 均已加入 `.gitignore`，
   实测被 git 跟踪的产物文件数为 **0**，改为在 CI 中构建与发布。

---

## 八、第二轮全量审计（2026-09-15）

> 审计范围：`src/`（56 个公共组件 + 内部模块）、`build/`、`docs/`、根级配置、**已构建产物**
> 审计方式：4 个自定义静态扫描脚本 + `vue-tsc` + 产物解析 + 质量门禁全量重跑
> 与 §三 的关系：§三 是**第一轮（2026-09-13）**的问题清单及修复状态；本节是**当前仍存在的问题**。
> §一 / §五 / §七 中已过时的事实已在本节审计前就地更正（见 8.4 P3-2）。

### 8.0 当前质量门禁基线（实测）

| 门禁 | 结果 |
| --- | --- |
| `pnpm run lint:check` | exit=0 |
| `pnpm run test` | 2 个文件 / 5 条用例通过（25.2s） |
| `pnpm run verify`（`verify:dist` + `smoke`） | exit=0 |
| `pnpm run docs:check`（api / 死链 / 示例 / 格式） | exit=0 |
| `pnpm run type-check` | **exit=2，1832 处错误 / 157 个文件**，CI 中 `continue-on-error: true` |

**关键判断：门禁全绿不等于没有问题。** 类型检查是当前唯一能发现「接口错用」的静态手段，
可它既不阻断流水线，又被 731 处 `@ts-ignore` 大量压制 —— 8.1 的 P0-1 就是被压制的真实运行期缺陷。

### 8.1 P0 — 会导致运行期故障，或使用者无法按文档接入

#### P0-1 `f-slider`：`throwError` 默认导入错误，调用即抛 `TypeError`，且被 `//@ts-ignore` 掩盖

- **位置**：`src/slider/src/Slider.vue:96`（导入）、`:124`（调用）
- **证据链**：
  1. `src/_utils/log.ts` 的导出形态是 `export default log`（一个**对象**）+ `export const throwError`（具名函数）
  2. Slider 写的是 `import throwError from '../../_utils/log'` → 绑定到 **log 对象**
  3. 产物 `es/_utils/log.js` 结尾为 `export { log as default, throwError, typeColor }`，印证默认导出是对象
  4. 复现脚本（`.workbuddy/tmp/proof-slider-throwerror.mjs`）：默认导出 `typeof === 'object'`，
     具名 `throwError` `typeof === 'function'`；按默认导入的方式调用 → `TypeError: logDefault is not a function`
- **触发路径**：`min > max` 时进入该分支。`setValues()` 由 `runtime` 侧 4 个 watcher 调用
  （`initData.dragging` / `props.modelValue` / `[props.min, props.max]`），
  因此**运行期把 `min` 调过 `max` 或在挂载后修改这两个 prop，就会在 watcher 回调里抛错**；
  紧随其后的 `return` 兜底逻辑永远不可达。
- **成因**：调用行上方写了 `//@ts-ignore`，把 TS2349（此表达式不可调用）压掉了。
  这是「用 `@ts-ignore` 换取安静」的典型代价 —— 连真实缺陷一起被静音。
- **影响**：使用者的一个配置笔误会让组件运行期抛错，且拿不到本应给出的提示信息；
  同时说明当前类型门禁不具备发现此类问题的能力。
- **建议**：改为 `import { throwError } from '../../_utils/log'`；删除该处 `//@ts-ignore`；
  并把 `log.ts` 的默认导出收敛掉（只保留具名导出），从根上杜绝同类错用。
- **状态**：✅ **已修复**（见 §8.8.2）。导入改为具名、`//@ts-ignore` 已删除，并补了回归测试；
  反向自检确认未修复版本会在测试中抛出 `TypeError: default is not a function`，
  即该故障已从「静态推断」升级为「运行期实证」。
  `log.ts` 的默认导出**保留未动**：`src/index.ts` 仍以 `Utils.log` 对外暴露该对象，
  收敛默认导出属破坏性改动，需与 `Utils` 命名空间一并规划，故不在本轮处理。

#### P0-2 `ConfigProvider` 的国际化是空壳，且文档示例用了不存在的组件

- **现象一：`locale` 只被透传，从不被消费**（下述写法已于 2026-09-16 **移除**，见 §8.9）
  - ~~`src/config-provider/src/types.ts`：`locale: { type: String, default: 'zh-CN' }`~~
  - ~~`ConfigProvider.ts:40-44` 只把它 provide 成 `mergedLocaleRef`~~
  - 全库检索：**没有任何语言包文件**（`src/**/*locale*` / `*lang*` 均无命中）；
    除 `config-provider` 自身外，**没有任何组件读取 `locale`**
- **现象二：唯一演示 locale 的文档示例无法运行**
  - `docs/components/config-provider.md:163` 写的是 `<f-pagination :total="100" />`
  - 库中**并无 `FPagination`**；分页组件是 `Page`（`export { default as FPage }`，
    标签 `<f-page>`，见 `docs/components/index.md:56`）
  - 系统比对（`.workbuddy/tmp/audit-tag-exports.cjs`）：文档中 82 个 kebab 标签里只有 3 个
    无法对应到真实导出，`<f-pagination>` 是其中之一
- **成因**：i18n 属「先立接口、后补实现」，接口立完就写进了文档，但实现与校验都没跟上。
  `docs:check` 的四件套只校验 API 表、死链、示例存在性与格式，**不校验示例中用到的组件是否真实存在**。
- **现象三：`locale` 的继承分支不可达（新增）**
  - `locale` 声明了 `default: 'zh-CN'`，而 `ConfigProvider.ts:43` 的继承逻辑是
    `locale === undefined ? 继承上层 : 用自己的值` —— 有默认值就永不为 `undefined`，
    因此**嵌套 `FConfigProvider` 无法继承上层 `locale`**。
  - 对照证据：同文件的 `themeName` / `theme` **刻意不声明默认值**，继承逻辑因此正常。
    三者写法不一致，说明 `locale` 的默认值是遗漏而非设计。
- **影响**：`locale` 让使用者误以为已支持多语言；照抄这个示例会直接渲染失败；
  嵌套场景下「未设置即继承」的文档承诺也不成立。
- **建议（原）**：~~二选一 —— 补齐 locale 语言包并让组件统一走 `useLocale`；或明确标注为「预留、尚未生效」，
  同时把示例替换为真实存在的组件。~~
- **状态**：✅ **已闭环**（见 §8.9）。分两步走：先「让文档不说谎」（见 §8.8.3），
  再按 2026-09-16 的决策**整体移除国际化** —— `locale` prop、provide 链路、文档章节、
  文档站语言切换入口全部删除。这同时消除了「`locale` 有默认值导致嵌套不可继承」的缺陷：
  该缺陷随 prop 一起消失，无需单独修。

#### P0-3 `timeline`：导出名与组件名分裂，使文档推荐的按需自动引入失效

- **证据**：
  - `src/timeline/index.ts`：`export { default as FTimeLine }` / `FTimeLineItem`
  - `src/timeline/src/TimeLine.vue:15`：`name: 'FTimeline'`；`TimeLineItem.vue:19`：`name: 'FTimelineItem'`
  - 文档使用 `<f-timeline>` / `<f-timeline-item>`（`docs/components/timeline.md:30`）
- **两条路径后果不同**：
  - 全局注册（`app.use`）→ 按 `name` 注册 → `<f-timeline>` 可用 ✅
  - 文档推荐的自动引入配方（`docs/guide/import-on-demand.md:44`：
    `componentName => ({ name: componentName, from: 'fei-ui-design' })`）
    → unplugin 传入的 `componentName` 是标签的 PascalCase 形式即 `FTimeline`，
    它会去找 `import { FTimeline }`，而**该导出不存在** → 组件解析失败 ❌
- **附带**：`src/timeline/index.ts:7/10` 仍在导出 `@deprecated` 的
  `BTimelineProps` / `BTimelineItemProps`（§3.2 #24 声称已统一为 `F*`，实际只统一了一部分）。
- **影响**：timeline 是本库文档中**唯一**「照着文档做自动引入会失败」的公共组件。
- **建议**：统一为 `FTimeline` / `FTimelineItem`（改 `index.ts` 导出名，或改组件 `name`，二选一），
  并借机清理 `B*` 遗留类型。
- **状态**：✅ **已修复**（见 §8.8.3）。选择**改导出名**而非改组件 `name`：
  组件 `name` 与文档里的 `<f-timeline>` 标签是一对已经正确的组合，
  改它要连带改 42 处文档标签，属无谓的破坏性改动。
  旧名 `FTimeLine` / `FTimeLineItem` 以 `@deprecated` 别名保留，不影响既有导入语句。
  本项**未追踪** `src/timeline/src/TimeLine.vue` 的文件名拼写（`TimeLine` vs `Timeline`）：
  在大小写不敏感的文件系统（本机 Windows）上重命名同名文件有误伤风险，
  且它不影响任何对外行为，降级为 P3 待办。

### 8.2 P1 — 影响交付质量与长期可维护性

#### P1-1 类型债务的真实规模被 `@ts-ignore` 掩盖

| 指标 | 实测 |
| --- | --- |
| `type-check` 错误 | **1832 处 / 157 个文件** |
| 含 `@ts-ignore` / `@ts-expect-error` 的文件 | **53 个** |
| `@ts-ignore` / `@ts-expect-error` 总数 | **731 处** |
| CI 门禁 | `continue-on-error: true`（不阻断） |
| 显式 `any`（不含 disable 行） | 31 处 |
| `eslint-disable` | 79 处 |
| 错误码分布 | TS7006 972 / TS2339 323 / TS7053 91 / TS18046 75 / TS2322 69 / TS7005 51 |

- **成因**：由 JS 迁移到 TS 时按「先压后修」推进。`@ts-ignore` 会屏蔽**下一行的全部**类型错误，
  因此 1832 是「已被压掉一部分之后」的剩余量，实际未处理问题 **≥ 2563 处**。
- **影响**：已在 P0-1 得到实证 —— 被屏蔽的错误里存在**真实运行期缺陷**。
  这也说明整改顺序很重要：没有测试兜底就批量改类型，风险不可控。
- **密集区**（与 `@ts-ignore` 分布高度重合）：
  `tree` 147、`table` 129、`date-picker` 114、`cascader` 56、`form` 54、`color-picker` 51 ——
  恰好也是**最复杂、最缺测试**的组件。

#### P1-2 测试体系严重不足（2 / 56）

- 实测：`src/**/*.test.*` 共 **2 个文件 / 5 条用例**（`button` 4 条 + `collapse` 1 条），
  覆盖 56 个公共组件中的 2 个，约 **3.6%**。
- 结构性缺口：无 a11y 断言、无 SSR 渲染断言（仅 `smoke` 覆盖一条路径）、无快照、无 e2e / 视觉回归。
- 结构审计（`.workbuddy/tmp/audit-structure.cjs`）显示各组件目录已具备 `test/` 位置约定，
  但 **54 个组件的 `test/` 为空** → 属「约定已立、实践未铺」。
- **影响**：P0/P1 的类型整改、暗色主题补齐、a11y 改造都缺少回归网，任何批量改动都可能静默破坏现有行为。

#### P1-3 暗色主题只实现了 2 / 56 个组件，但文档承诺「内置提供」

- **实测**：全库仅 `src/button/styles/dark.css` 与 `src/icon/styles/dark.css` 两个文件
  含 `theme-name='dark'` 选择器（各自由 `styles/index.css` 通过 `@import './dark.css'` 引入）。
- **文档承诺**（`docs/components/config-provider.md:140/150`）：`theme-name` 支持 `light|dark`，
  「暗色主题的样式变量由组件库内置提供，无需额外引入 CSS」。
- **成因**：暗色主题按组件零散实现，未作为一次系统性变更覆盖全组件；
  `_styles/base/vars.css` 中也只有 3 处与 dark 相关的变量。
- **影响**：使用者按文档开 `<f-config-provider theme-name="dark">` 后，
  54 个组件仍是亮色 → 观感上是「主题坏了」，比不提供更容易招致信任损失。

#### P1-4 无障碍（a11y）基本空白

| 组件 | aria-* | role | 键盘处理 |
| --- | --- | --- | --- |
| select | 0 | 0 | 13 |
| drawer | 0 | 0 | 0 |
| tooltip | 0 | 0 | 0 |
| table | 0 | 0 | 0 |
| tabs | 0 | 0 | 0 |
| form | 0 | 0 | 0 |
| upload | 0 | 0 | 0 |
| popover | 0 | 0 | 0 |

全库合计仅 **45 处 `aria-*` / 28 处 `role`**，分布在 56 个组件中。
- **影响**：`select` / `drawer` / `tabs` / `table` 这类交互组件在屏幕阅读器与纯键盘环境下不可用。
  README 定位为「企业级中后台」，政企 / 金融场景常有无障碍合规要求。
- **建议**：先给 8 个核心交互组件补 `role` + `aria-*` + 键盘导航，再引入 `vitest-axe` 做回归
  （否则补完会再次退化）。

#### P1-5 诊断信息品牌错乱

| 前缀 | 数量 |
| --- | --- |
| `[Element Warn]…`（Element Plus 文案残留） | **7** |
| `[FPopover]` / `[FTooltip]`（项目自有） | **3** |
| 无前缀的裸 `console.warn/error` | 11 |

- 分布：`form` 4、`carousel` 2、`slider` 1（`[Element*]`）；全库 `console.warn/error` 共 21 处。
- **影响**：使用者在自己的控制台里看到 `[Element Warn]` 会误判依赖来源；
  同一库内并存三套风格也增加排查成本。

#### P1-6 代码块语法着色与底色不配套，文档示例代码几乎不可读（本轮已修复，见 §8.8）

- **现象**：组件文档里的「使用示例」代码块、以及指南里的命令行示例，
  正文代码呈「深字压深底」，肉眼基本看不清。
- **证据**（全站产物度量，`.workbuddy/tmp/_contrast-before.txt`）：

  | 指标 | 实测 |
  | --- | --- |
  | 产物中 shiki 代码块 / 着色 span | **323 个 / 29783 个**（75 个页面） |
  | 低于 3:1 底线的 token 颜色 | **8 种** |
  | 正文 token `#24292E` | 对比度 **1.22:1**（WCAG 正文需 ≥ 4.5） |
  | 字符串 token `#032F62` | **1.10:1** ｜ 关键字 `#6F42C1` **1.85:1** ｜ 注释 `#6A737D` **2.50:1** |

- **成因**：代码块**底色**与**语法着色主题**是两处独立配置，互不感知 ——
  - 底色：`docs/.vitepress/theme/custom.styl` 的 `--vs-theme-code2 = #363449`（深色，经
    `theme/index.css` 的 `[class*='language-'] pre { background: var(--vs-theme-code2) }` 生效）
  - 配色：`docs/.vitepress/config.js` 的 `markdown.theme.light = 'github-light'`
    （一套**按白底设计**的深色 token 色板）

  更隐蔽的一层：**站点有暗色开关**，但它走自研的 `body[vs-theme="dark"]` + `body.darken`
  （`theme/components/Config.vue`），并非 VitePress 的 `html.dark`。因此 VitePress 自带的
  `html:not(.dark) .vp-code span { color: var(--shiki-light) }` 是唯一命中的规则，
  于是 `--shiki-light` 一侧（深色 token）必然压在深色底上，`--shiki-dark` 一侧永远不会被用到。
  主题里那句 `pre code { color: #fff }` 也救不了 —— 着色在 `span` 上，`code` 只是父节点。
- **为什么既有防线全漏**：`docs:check` 四件套分别校验 API 表、死链、demo 存在性、格式，
  **没有一项看颜色**；构建与类型检查更不可能发现。这类「配置之间不配套」的缺陷
  只能靠**产物度量**发现，属护栏空白。
- **影响**：组件库文档的核心用途就是「照着示例抄用法」，代码不可读等于示例失效；
  且因为底色与配色分处两个文件，任何人后续只改其一都会重新引入。
- **建议（已落地）**：`markdown.theme` 两侧统一为 `github-dark-dimmed`（保持品牌深色底不动），
  并新增 `build/check-docs-contrast.cjs` 护栏把对比度纳入 CI。详见 §8.8。

### 8.3 P2 — 性能、体积与配置债务

#### P2-1 发布包体积（实测 9.1 MB 未压缩）

| 目录 | 体积 |
| --- | --- |
| `es/` | 3.8 MB |
| `lib/` | 3.9 MB |
| `dist/` | 1.4 MB |

- `dist/styles/fonts/` 合计约 **770 KB**，其中 `iconfont.svg` **410 KB** + `iconfont.eot` **147 KB**
  是 **IE 时代格式**，在现代浏览器矩阵下是纯死重。
- `src/icon/src/iconfont.json`（**100 KB**）被 `IconSelect.vue` 以
  `import icon from './iconfont.json'` 静态引入 → 产物 `es/icon/src/iconfont.json.js` 达 **81 KB**，
  使用 `<f-icon-select>` 的使用者会把这 81 KB 全部打进自己的 bundle。
- **成因**：`minify: false`（有明确理由，见 `vite.config.ts` 注释）+ 字体与图标数据未按
  目标浏览器、使用方式做裁剪。
- **建议**：`iconfont.json` 改为动态 `import()` 或提供独立子入口；字体只保留 `woff2` / `woff`；
  若坚持发布未压缩 `es/`，可评估对 `lib/` 单独压缩的收益。

#### P2-2 未声明 `browserslist`

- `package.json` 与 `.browserslistrc` 均无该字段。
- **影响**：`autoprefixer` 走默认目标（`> 0.5%, last 2 versions, Firefox ESR, not dead`），
  降级范围不可控，也无法解释「产物里为什么还有这些前缀」；与 P2-1 的 legacy 字体问题同源。

#### P2-3 无虚拟滚动能力

- 全库检索 `virtualScroll` / `虚拟滚动` / `VirtualList`：**0 命中**。
- **影响**：`table` / `tree` / `select` / `cascader` 在万级行 / 节点下全量渲染 DOM，
  中后台真实场景下会出现明显卡顿；`table` 也没有「拖拽排序 + 大数据量」的组合方案。

#### P2-4 `resize-observer-polyfill` 是无人维护的依赖

- 声明 `^1.5.1`，实际安装 `1.5.1`（该包最后一次发布在 2018 年），
  仅被 `src/_utils/resize-event.ts` 使用。
- 现代浏览器矩阵下原生 `ResizeObserver` 已全覆盖，属可移除的历史包袱
  （替代品为 `@juggle/resize-observer`，或直接用原生 + 少量降级）。

#### P2-5 运行时依赖中「用一处、带整包」的项

| 依赖 | 被引用源文件数 | 说明 |
| --- | --- | --- |
| `lodash` | 1 | 只用 `lodash/union`（`time-picker`），为一行并集引入整包依赖声明 |
| `async-validator` | 1 | 仅 `form` 使用，体量不小 |
| `dayjs` | 11 | 日期类组件的合理依赖 |
| `sortablejs` | 2 | `table` 拖拽 |
| `@popperjs/core` | 3 | 合理 |
| `mitt` | 6 | 合理 |

- **影响**：`lodash` 为单个函数引入整包，是明显的可裁剪项（5 行实现即可替代），
  并会让使用者的依赖审计多出一条 `lodash`。

#### P2-6 `src/version.ts` / `src/info.ts` 是生成物却入库

- 两者由 `build/gen-version.cjs` 生成（当前 `version.ts` 内容为 `export default '0.0.2'`），
  但**被 git 跟踪**。
- **影响**：版本号存在「`package.json` 与 `src/version.ts` 两个事实源」；
  `release:*` 走 `npm version` 后若未重跑 `gen-version`，产物中的版本号会静默过期。

#### P2-7 内部组件的契约边界名存实亡

- `src/components.ts` 通过 `export *` 把 `_internal/{empty,popper,scrollbar,collapse-transition,move-transition}`
  全部对外导出（实测公开导出名合计 **107 个**）。
- `docs/components/` 为 `empty`、`popper`、`scrollbar` 都建了正式文档页，
  `docs/components/index.md` 也把它们计入「59 个组件」。
- `Utils`（`src/index.ts:22`）把 `_utils/{util,helper,resize,color,dom,log}` 整体暴露，
  且 `docs/guide/common-api.md` 已将其写成公开能力。
- **影响**：`_internal` / `_utils` 前缀在语义上表示「API 不承诺稳定」，但实际已是文档化的公开面
  → 后续任何重构都会被使用者依赖，失去改动自由度。反过来，
  8.2 P1-1 里错误最密集的 `_utils/dom.ts`(47) / `_utils/util.ts`(37)
  恰好落在这个「已公开但零类型保障」的区间。

### 8.4 P3 — 规范与文档一致性

#### P3-1 文档中的事实性错误

| 位置 | 问题 |
| --- | --- |
| `docs/guide/common-api.md` | 示例写 `Utils.util.throttl`、`Utils.util.debounc`；源码导出是 `throttle` / `debounce`，照抄得到 `undefined`。系统比对（`.workbuddy/tmp/audit-utils-docs.cjs`）：文档 13 条 `Utils.*` 引用中有 **2 条不存在** |
| `README.md:6/18`、`docs/components/index.md:7` | 均称「59 个组件」，实际公共组件目录 **56** 个（59 = 56 + 3 个 `_internal` 组件） |
| `docs/components/config-provider.md:163` | 国际化示例使用不存在的 `<f-pagination>`（见 P0-2） |

#### P3-2 本文档 §一 / §五 / §七 的过时事实（已在本次审计前就地更正）

| 位置 | 原文 | 实际 |
| --- | --- | --- |
| §1.1 技术栈 | 包管理 npm / `package-lock.json` | 已统一为 **pnpm 10.34.5** + `pnpm-lock.yaml` |
| §5.7 | 「执行环境中 pnpm / corepack 均不可用…统一为 npm」 | 该结论**有误**：corepack 一直可用，已切回 pnpm（本节已重写） |
| §7 建议 7 | 「`site/` 被提交进仓库（359 个文件）」 | 已加入 `.gitignore`，实测被跟踪产物文件数 **0** |
| §1.2 | 组件文档 59 篇 | 实为 **60** 篇（含索引页） |

#### P3-3 其余观察项（低危）

- `v-for` 缺 `:key` **2 处**：`src/table/src/table-body.vue:24` 与 `:59`（均为 `<template v-for>`）；
  全库 44 个 `v-for` 元素中其余 42 个都带了 key。
- 仅有 2 处 `TODO`，且都属「实现待重构」性质（`basic-date-table.vue:123`、`basic-time-spinner.vue:335`）。
  也就是说**未实现的功能没有被显式登记在代码里** —— 这正是 i18n、暗色主题这类缺口
  必须靠外部审计才能发现的原因。建议新增能力时同步写入本节与 CHANGELOG。
- `es/` 与 `lib/` 下各有 **108 个 `*2.vue.js`** 文件（es 285 KB / lib 307 KB）。
  经核对**不是死代码**：是 `<script setup>` 与 `<template>` 在 `preserveModules` 下被拆成两个模块
  （如 `es/table/src/Table.vue.js` 从 `Table2.vue.js` 引入 `_sfc_main`），两者都被引用。
  属正常编译切分，仅作产物形态记录。
- `docs/.internal/docs-style-guide.md` 被 `build/check-docs-demo.cjs` 与 `check-docs-style.cjs` 引用，
  是活文档，非孤儿。
- 仍缺 `unplugin-vue-components` 官方 resolver（文档要求使用者手写配方，而该配方在 timeline 上失效，
  见 P0-3）；仍缺 `changesets`，CHANGELOG 手工维护。

### 8.5 声明的 Vue 下限未经验证（非缺陷，属风险）

- 声明：`peerDependencies.vue = "^3.2.0"`。
- **核查结论：未发现运行期层面的 3.3+ 依赖。**
  - `defineOptions`（52 处）与 `defineSlots`（4 处）都是编译宏，已被库自身构建消除 ——
    实测 `es/` 中二者命中数均为 **0**
  - 产物从 Vue 导入的符号集合全部是 3.0 / 3.2 时代 API（`ref` / `onMounted` / `createApp` …）
  - 唯一疑似的 `useModel` 是 `src/checkbox/src/useCheckbox.ts:19` 里的**本地函数**，非 Vue API
- **但下限从未被任何自动化验证**：`files` 白名单不含 `src/`（使用者只拿到已编译产物，
  这既是下限成立的原因），而 `devDependencies` 与 CI 只安装 **Vue 3.5.42**，没有版本矩阵。
- **风险**：一旦将来有人在源码里引入真实的新 API（如 `useId` / `useTemplateRef`），
  类型检查与构建都不会报错，但使用者的 3.2 环境会运行期失败。
- **建议**：CI 增加 Vue 版本矩阵（最低档 3.2 + 当前档），或把下限上调到团队真实验证过的版本。

### 8.6 整改优先级建议

| 顺序 | 事项 | 状态 | 理由 |
| --- | --- | --- | --- |
| 1 | **P0-1** Slider 导入错误 + 删除该处 `//@ts-ignore` | ✅ 已完成 | 唯一已实证的运行期故障，改动局部、收益立刻 |
| 2 | **P0-3** timeline 导出名统一 | ✅ 已完成 | 直接决定「使用者能否照文档接入」，成本低 |
| 3 | **P0-2** 示例修正 + 文档据实标注 | ✅ 已完成 | 同上；文档不说谎优先于功能补齐 |
| 4 | ~~**P0-2b** 国际化实现~~ → **决策：移除国际化**（`locale` prop + provide 链路 + 文档章节 + 文档站语言入口） | ✅ 已完成 | 见 §8.9。不做语言包，改为彻底移除空壳接口；顺带消除「`locale` 默认值导致嵌套不可继承」缺陷 |
| 5 | **P1-2 + P1-1** 先补测试、再去 `@ts-ignore`、逐组件闭环 | ⬜ 进行中（3/56） | 没有回归网就动 731 处 ignore，风险不可控。建议按「补该组件测试 → 删除该文件的 ignore → 修真实错误」推进 |
| 6 | **P1-3 / P1-4** 暗色主题、a11y | ⬜ 待办 | 都是「文档已承诺 / 行业已要求」的能力缺口，体量最大但边界清晰 |
| 7 | **P2** 体积与配置（`browserslist`、字体裁剪、`iconfont.json` 动态化、移除 `lodash`、虚拟滚动） | ⬜ 待办 | 优化项，不阻塞发布 |
| 8 | **P3** 文档一致性，并把本文档纳入校验范围 | ⬜ 待办 | 防止权威文档再次漂移（本次已发现 4 处过时事实） |

> **P1-6 已提前完成**（见 §8.8.1）：它是纯配置层的一处笔误，改动量最小，
> 却直接决定「文档示例能不能读」，性价比高于表内任何一项，因此不等排期先做掉。
>
> **P0 三项已全部闭环**（见 §8.8.2 / §8.8.3 / §8.9）：P0-2 先「让文档不说谎」，
> 再按决策**整体移除国际化** —— 「立了接口却没有实现」本身比缺功能更危险，
> 它会让使用者以为能力已经存在。
>
> **本轮新增 §8.10「文档站未完成功能入口清单」**：共 6 个占位入口，其中 4 个可点击且点击后无实现。
> 它们全部落在文档站主题（`docs/.vitepress/theme`）而非 Markdown 正文，因此现有五件套护栏都看不见。
> 补齐前请先逐个确认「该入口是否值得保留」，而不是默认「都要把功能开发出来」。
> 校验结果见 §8.10.4：`build:site` + 死链 + 对比度三项均已 exit=0，产物占位文案与清单逐条吻合。

### 8.7 建议新增的自动化护栏

| 护栏 | 检查内容 | 对应问题 |
| --- | --- | --- |
| `check-docs-tags` | 文档中出现的 `<f-xxx>` 标签能否解析到真实组件 —— **同时**要求满足全局注册（组件 `name`）与按需引入（导出名）两条路径 | P0-2、P0-3 ✅ 已落地（实际命名 `check-docs-tags`，见 §8.8.3） |
| `check-doc-utils` | 文档中 `Utils.<group>.<fn>` 是否都存在于源码导出 | P3-1 |
| `check-ts-ignore` | `@ts-ignore` 数量基线，新增即失败（冻结存量、只减不增） | P1-1 |
| `check-diag-prefix` | 源码 `console.*` 文案必须以项目自有前缀开头，禁止 `[Element` | P1-5 |
| Vue 版本矩阵 | CI 增加最低支持版本的打包 + 渲染冒烟 | §8.5 |
| `check-plan-facts` | 校验本文档中的组件数、文档数、包管理器等关键事实与仓库一致 | P3-2 |
| `check-docs-contrast` | 产物中每个着色 token 与代码块底色的 WCAG 对比度（全部 ≥ 3:1、正文 token ≥ 4.5:1），并检测着色整体失效 | P1-6 ✅ 已落地 |
| `check-docs-placeholders` | 产物主题 chunk 中占位文案（`暂未开发` / `开发中` …）数量基线，新增即失败；低于基线则提示下调 | P1-2b、§8.10 ✅ 已落地 |

### 8.8 本轮已完成的修复

#### 8.8.1 代码块可读性（对应 P1-6）

**改法**：保持品牌深色底 `--vs-theme-code2: #363449` 不变，把
`docs/.vitepress/config.js` 的 `markdown.theme` 两侧统一为 `github-dark-dimmed`，
让着色 token 变成浅色、与该底色配套。改动只有一处配置 + 一组守卫。

**验证（同一套度量脚本，前后对照；span 总数含 3 个新增说明页的差异）**：

| token 类型 | 修复前色值 / 对比度 | 修复后色值 / 对比度 | 出现次数 |
| --- | --- | --- | --- |
| 正文 | `#24292E` **1.22:1** | `#ADBAC7` **6.09:1** | 15004 |
| 标签 / entity | `#22863A` **2.60:1** | `#8DDB8C` **7.25:1** | 5859 |
| 函数 / 命令 | `#6F42C1` **1.85:1** | `#6CB6FF` **5.60:1** | 4202 |
| 字符串 | `#032F62` **1.10:1** | `#96D0FF` **7.32:1** | 3248 |
| 关键字 | `#D73A49` **2.63:1** | `#F47067` **4.22:1** | 701 |
| 注释 | `#6A737D` **2.50:1** | `#768390` **3.11:1** | 351 |
| 数字 / 常量 | `#005CC5` **1.91:1** | `#F69D50` **5.65:1** | 189 |
| 已删除行 | `#B31D28` **1.79:1** | `#FF938A` **5.61:1** | 30 |
| **低于 3:1 的种类** | **8 种** | **0 种** | — |
| **正文（频次最高）** | **1.22:1** | **6.09:1** | — |

范围：75 个页面 / 323 个代码块 / 29786 个着色 span，全部达标。

**为什么是 `github-dark-dimmed` 而不是 `github-dark`**（这一版是实测迭代出来的，记下来避免后人重走）：

1. 先换成 `github-dark`：正文 token 冲到 9.44:1，但注释色 `#6A737D` 仍是 **2.50:1** ——
   `github-dark` 与 `github-light` 的注释色**恰好同值**，换主题并没有改善它。
2. 试过在 CSS 里用属性选择器把该 token 提亮（`--shiki-light: #8B949E !important`）：
   **被自己的护栏否掉了，而且否得对** —— 护栏量的是 shiki 输出的内联变量，
   看不到样式表里的覆盖，于是「改好了但验不出来」。这类修法等于给未来埋一个不可验证的洞。
3. 于是回到「在产生颜色的地方修」：枚举 shikiji 内置的 35 个主题，
   按「色板中最低对比度」排序（`.workbuddy/tmp/audit-code-theme-pick.txt`），
   选中同族、观感一致、色彩语义对得上的 `github-dark-dimmed`，全部 token ≥ 3.11:1。

> 若更看重正文对比度、愿接受注释偏暗，把两个值都改成 `github-dark` 即可
> （正文 9.44:1 / 注释 2.50:1）—— 但那会让护栏变红，需同时改护栏下限，不推荐。

**同步落地的护栏**：新增 `build/check-docs-contrast.cjs`（`docs:check-contrast`），
并在 CI 的 docs 任务 `build:site` 之后新增校验步骤。护栏做了**反向自检**：
在未修复的旧产物上运行 → **exit=1**，报出 8 种不可读 token 与正文 1.22:1；
修复后 → **exit=0**。护栏还顺带能发现「语法着色整体失效」
（`markdown.theme` 退化成单字符串主题时，产物不再带 `--shiki-*` 变量）。

**顺带消除的认知陷阱**：`--vs-theme-code` 与 `--vs-theme-code2` 名字相近、用途相反
（前者是表格文字用的深色**前景**色，后者才是代码块**底色**）。
已在 `custom.styl` 就地加注释说明，避免后续有人「修底色」时改错变量、把表格文字改没。

> 本节所用的 4 个扫描脚本位于 `.workbuddy/tmp/`（`audit-structure.cjs`、`audit-tag-exports.cjs`、
> `audit-utils-docs.cjs`、`audit-vfor-key.cjs`）及其输出 `audit-*.txt`；
> `.workbuddy/` 不入版本控制，如需长期保留建议移入 `build/`。

#### 8.8.2 P0-1：`f-slider` 的 `throwError` 误用（本轮修复）

**改动**（`src/slider/src/Slider.vue`，共 2 行）：

| 位置 | 改动 |
| --- | --- |
| `:96` | `import throwError from '../../_utils/log'` → `import { throwError } from '../../_utils/log'` |
| `:123` | 删除调用上方的 `//@ts-ignore`（它正是把 TS2349 压掉、让缺陷静音的那一行） |

**回归测试**：新增 `src/slider/test/Slider.test.ts`（4 例）。核心断言不只看「有没有报错」，
而是要求**真的走到提示分支**：spy `console.log` 并断言首参同时包含 `Slider` 与
`min should not be greater than max.` —— 否则「把错误整个吞掉」也会让测试变绿。

**反向自检（关键）**：把导入改回错误形态后重跑同一测试 →

```
× min > max 时走提示分支，而不是抛 TypeError
  AssertionError: expected TypeError: default is not a function to be null
Test Files  1 failed (1)   Tests  1 failed | 3 passed (4)
```

即 P0-1 由「静态推断」升级为**运行期实证**：未修复版本确实抛 `TypeError`，
且只有目标用例失败、其余 3 例通过，说明测试定位准确、没有连坐。

**顺带**：组件测试覆盖由 **2/56 → 3/56**，用例数 **5 → 9**（对应 §8.6 第 5 项的起步）。

#### 8.8.3 P0-2 / P0-3：接入级问题收敛 + 新增标签护栏

**P0-3 `timeline` 导出名统一**

`src/timeline/index.ts` 改为导出 `FTimeline` / `FTimelineItem`（与组件 `name`、与类型名、
与文档标签 `<f-timeline>` 全部对齐），旧名以 `@deprecated` 别名保留：

```ts
export { FTimeline, FTimelineItem }
/** @deprecated 旧命名与组件 `name` 不一致，会导致按需自动引入失败。请使用 `FTimeline` */
export { FTimeline as FTimeLine }
```

别名不会造成重复全局注册：`src/preset.ts` 的 `componentList` 以
`Array.from(new Set(Object.values(components)))` 按**对象身份**去重，
且 `install` 注册时取的是 `component.name` 而非导出名。

**P0-2 文档据实修正**（`docs/components/config-provider.md`）

1. 示例中的 `<f-pagination>` → 移除（该组件不存在）。该示例本意是演示 `locale` 生效，
   而组件库尚未消费 `locale`，因此**换成不指向具体组件的写法**，
   避免用「一个能渲染但不会变化的组件」继续暗示功能已实现。
2. 「国际化」章节顶部加显著提示：未内置语言包、无组件消费、切换 `locale` 无显示变化。
3. 补记现象三（`locale` 默认值使继承分支不可达），并同步修正 Props 表中该行的说明。

**新增护栏 `build/check-docs-tags.cjs`**（`docs:check-tags`，已并入 `docs:check` 与 CI）

判据比原设想更严：一个标签必须**同时**满足两条路径，任一缺失都报错 ——

| 路径 | 名字来源 | 缺失后果 |
| --- | --- | --- |
| 全局注册 `app.use` | 组件内部 `defineOptions({ name })`（`install` 解构的是 `component.name`） | `<f-xxx>` 无法解析 |
| 按需自动引入 | 文档配方反推的**导出名** | `import { Fxxx }` 得到 `undefined`，组件静默不渲染 |

并额外检查「某个组件 `name` 不存在同名导出」= 上面两条路径分裂（即 P0-3 的形态）。
刻意不拿 `exportName` 去比，否则 `@deprecated` 别名会被误报成缺陷。

**反向自检**：在 `timeline` 已修、`<f-pagination>` 未修的中间态运行 → **exit=1**，
且**恰好只报出 `<f-pagination>` 这一项**；示例修正后 → **exit=0**，
输出「全部 81 个标签均可解析，且全局注册 / 按需引入两条路径指向同一名字」。

**护栏自身也踩了一次坑（值得记下）**：首跑报出 **6 个**「不存在」的标签，
除 `<f-pagination>` 外还有 `<f-empty>` / `<f-popper>` / `<f-scrollbar>` /
`<f-collapse-transition>` / `<f-move-transition>`。核查后确认这 5 个是**误报** ——
它们都在 `src/components.ts` 里以 `export * from './_internal/xxx'` 导出，
而初版脚本只扫 `src/*/index.ts`、**没有展开 `export *` 链**。
修正为从 `src/index.ts` 递归展开后，误报消失、只剩真问题。

> 教训：**「脚本报错」不等于「代码有问题」，也不等于「脚本写错了」。**
> 先证明每一条报错属于哪一类，再决定改代码还是改脚本；
> 6 条里混着 1 真 5 假，正是最容易在任一端过度自信的位置。
> 这也是为什么本节的每一项护栏都必须做反向自检 —— 否则无法区分
> 「护栏有效且代码干净」与「护栏失效（永远绿灯）」。

#### 8.8.4 本轮校验结果

| 校验项 | 结果 |
| --- | --- |
| `eslint`（新增脚本，`--no-ignore`） | 0 问题 |
| `vitest run` | **3 文件 / 9 用例全过**（3/56 组件） |
| `docs:check`（API / 死链 / 示例 / 格式 / **标签**） | 五项 exit=0 |
| `docs:check-site` / `docs:check-contrast` | exit=0 |
| 反向自检 | Slider 回归测试、标签护栏 —— 均确认「未修复即失败」 |

### 8.9 决策记录：国际化 —— 移除，不做

原 §8.9 列了 5 个待定决策点（语言包范围 / 接入方式 / `locale` 默认值 / 日期组件 dayjs locale / 校验护栏）。
**2026-09-16 决策：移除国际化。** 理由：组件库当前不引入语言包的维护成本，
而「接口立了、实现没跟上」的状态本身就是缺陷来源 —— P0-2 的 `locale` 空壳与文档站的语言切换死按钮
都是这一状态的产物。

移除范围（本轮已落地）：

| 位置 | 移除内容 |
| --- | --- |
| `src/config-provider/src/types.ts` | `ConfigProviderProps.locale` 与 `configProviderProps.locale`（连同 `default: 'zh-CN'`） |
| `src/config-provider/src/ConfigProvider.ts` | `provide` 中的 `mergedLocaleRef` 计算属性 |
| `src/config-provider/src/internal-interface.ts` | `ConfigProviderInjected.mergedLocaleRef` 字段 |
| `src/_hooks/use-theme.ts` | 返回值中的 `locale` 字段（`useTheme` 未从 `src/index.ts` 导出，属内部 hook） |
| `docs/components/config-provider.md` | `## 国际化` 章节、API 表中的 `locale` 行 |
| `docs/.vitepress/theme/components/Config.vue` | 语言切换按钮、`changeLang()`、`lang` 计算属性、`useData` / `computed` 导入、`.theme-translate` 系列死样式与注释掉的语言下拉模板 |
| §8.10 入口 3 | 文档站「切换文档语言」死入口 |

> **对外影响（属破坏性变更，需写入 CHANGELOG）**：删除公开 prop `locale`。
> 由于该 prop 此前**无任何组件消费、且库内不存在语言包**，删除后不会改变任何现有渲染结果；
> 但使用者若在模板上写过 `locale="en-US"`，该属性会退化为普通 HTML 属性透传，建议在发布说明中明确标注。

> **~~移出本轮范围的一项：`date-picker` 硬编码 dayjs locale~~ → 复核结论：这不是缺陷（2026-09-16 更正）**
>
> 初判认为 `basic-date-table.vue:91` / `basic-month-table.vue:81` 的 `.locale('en')`
> 会让月份与星期「恒为英文」。**复核后推翻**：那两个英文字符串只作**查表用的 key**，从不直接渲染：
> - 月份 — `basic-month-table.vue:7` 渲染 `<span class="cell">{{ monthMap[months[cell.text]] }}</span>`，
>   `monthMap`（同文件 `:64`）把 `jan…dec` 映射为 `一月…十二月`
> - 星期 — `basic-date-table.vue:13` 渲染 `<th v-for="(week, key) in WEEKS">{{ weeksMap[week] }}</th>`，
>   `weeksMap`（同文件 `:107`）把 `mon…sun` 映射为 `一…日`
> - 逐文件检索确认 `months` / `WEEKS` **没有第二个消费点**，英文串到不了 DOM
>
> 所以 `.locale('en')` 的作用是「借一套稳定的英文标识当 key」，**面向用户的输出始终是中文**。
> **该项从待办中移除**。它剩下的是写法问题（`ref` 当常量用、`@ts-ignore` 掩盖类型），
> 归入 P1-1 类型债一并处理，**不计作独立缺陷**。
>
> 教训（已并入技能陷阱清单）：**判断「文案是否错」必须追到渲染点，不能停在数据来源** ——
> 数据是英文 ≠ 界面是英文。

### 8.10 文档站「未完成功能入口」清单（2026-09-16 扫描）

**扫描方法**：全仓检索占位文案（`暂未开发` / `开发中`）→ 逐条回溯其 `@click` 处理函数与状态消费方
→ 用 `.workbuddy/tmp/proof-docs-theme-state.mjs` 复现「写入是否传播」。

**产物证据**：`site/assets/chunks/theme.REw0ZrkO.js` 命中 `暂未开发` ×2、`开发中` ×3（共 5 处），
与源码 5 处一一对应；**Markdown 正文里没有这类占位文案**（正文中的「开发中」均为「开发中也推荐…」这类叙述）。
另有 4 处 `开发中` 命中来自 `guide/color-design.md`、`guide/common-api.md` 的正文，属误报。

**范围说明**：下列入口全部渲染在文档站主题里（`docs/.vitepress/theme`），
因此**在全部 75 个页面上同时存在**；「位置」一列指其在页面中的方位。

| # | 位置（全站每页） | 功能名称 | 入口元素 | 当前提示文案 | 点击后的真实行为 | 归类 | 建议 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 左下角「配置」按钮展开菜单 · 第 3 项 | 展开 / 收起侧边栏子栏目 | `bx-list-plus` / `bx-list-minus`，`title`「打开/关闭侧边栏子栏目」 | ~~**`暂未开发`**~~ → **已无占位提示** | ~~只写入 `Config.vue` 自己那份状态副本并写 `localStorage.sidebarCollapseOpen`（**全仓无任何地方读它**）→ 界面无任何变化~~ → **已改为共享 `reactive` 对象**，写入可传播；`localStorage` 读写闭环（偏好刷新后保留）；分组标题可单独收起 | 真未完成 | ✅ **已补齐**（见 §8.11） |
| 2 | 同上 · 第 5 项 | 打开 / 关闭所有代码 | `bx-code-block`，`title`「打开/关闭所有代码」 | ~~**`开发中`**~~ → **已无占位提示** | ~~连 `localStorage` 都没写 → 完全无副作用~~ → 已接入 `codex.vue` 的 `watch`，示例面板整体展开/收起，偏好写入 `localStorage` | 真未完成 | ✅ **已补齐**（见 §8.11） |
| 3 | 左下角配置区 · 翻译图标按钮 | 切换文档语言（国际化） | `.btn-lang.theme-translate` | **`暂未开发！`** | 无任何实现 | 真未完成 | ✅ **已移除**（决策见 §8.9） |
| 4 | 内容区左上角 | 返回上一页 | ~~`<a class="back-link">`~~ → `<button type="button" class="back-link">` + `bx-left-arrow-alt` | ~~**`开发中`**~~ → **已无占位提示** | ~~无任何实现；`<a>` 无 href 也不可键盘聚焦~~ → 已实现 `router.go(-1)`（无站内历史时回首页），并补 `title` / `aria-label`，改为 `<button>` 使其可键盘聚焦 | 真未完成 | ✅ **已补齐**（见 §8.11） |
| 5 | 顶部导航 · logo 右侧 | 站点状态标记（非入口） | ~~`<f-tag type="success" palin>开发中</f-tag>`~~ → `<f-tag type="success">开发中</f-tag>` | 文案本身即 **`开发中`** | 位于首页链接（`<a :href="homeLink">`）内部，点击即回首页；标记整站处于开发状态 | 状态标记 | ✅ **文案保留、无效属性已修**：`palin` 不是 Tag 的属性（`plain` 是 **Button** 的属性，Tag 只有 `no-border`），会静默透传成 `palin=""`；版本号 `0.0.2` 与「开发中」相符，故文案据实保留（见 §8.11.9） |
| 6 | 顶部导航 · 右侧 | 版本切换（Previous Version） | ~~`<span title="Previous Version" class="v-old">v3.x</span>`~~ → **已移除** | 无 —— 点击**没有任何反馈** | ~~不是链接、无 `@click`，纯静态文本~~ → **元素已删除**，同时清掉随之失效的 `.v-old` 样式与 `.remove-links` 中的引用 | 伪入口（死元素） | ✅ **已移除**：本库版本线从未有过 3.x，且唯一候选旧站点（`fei-ui-one`）已 404、其 npm 包也不存在 —— 不是「待补 URL」，而是**信息本身就是错的**（见 §8.11.9） |

#### 8.10.1 两条与直觉相反：入口 1 / 2 不是「没开发」，而是「接错了」

这两个功能的状态字段与消费方**都已存在**，只差一层响应式传递 —— 因此它们的提示文案是「误诊」。

证据（可复现，见 `.workbuddy/tmp/proof-docs-theme-state.txt`）：

1. 状态定义在 `theme/index.ts:25`，是一个**普通对象**（非 `reactive`）：
   `app.config.globalProperties.vsTheme = { mobileActive, openCode, themeDarken, sidebarCollapseOpen }`
2. 两个消费方都用对象展开取值 —— `Config.vue` 的 `vsThemeVal.value = { ...vsTheme }`、
   `SidebarLinks.vue:65` 同样写法。**展开运算符产出的是副本，不是同一个对象。**
   脚本用真实 vue 运行时复现：在 Config 的副本里写 `sidebarCollapseOpen = false`，
   `SidebarLinks` 的副本仍读到 `true`（两副本 `!==`）；换成共享同一对象后立即可传播 ✅
3. `localStorage` 读写核对：
   - `sidebarCollapseOpen` —— **写 2 处、读 0 处** → 刷新后也不会恢复；
   - `openCode` —— 写 1 处（`codex.vue:182`）、读 1 处（`codex.vue:197`，仅在 `onMounted`），
     且入口 2 自己不写 → 即使写进去也只在重新加载时生效一次，**从入口 2 点进去则毫无效果**。

**连带发现（同一根因，但不由占位文案暴露）**：`SidebarLinks.vue:14` 的
`:open="fixed || i === openGroupIndex || vsThemeVal.sidebarCollapseOpen"` 中，
那份**恒为 `true`** 的副本使整个表达式恒真 → **侧边栏分组标题点开也收不起**。
它与入口 1 是同一个根因，修入口 1 时应一并验证「分组能否折叠」。

#### 8.10.2 潜在同类（当前不可见，配了参数才会暴露）

示例面板 `codex.vue` 的 CodePen / CodeSandbox 按钮（`:9` / `:13`）仅在
`<card codepen / codesandbox>` 传入参数时才渲染，当前**无任何页面传入**，因此线上看不到。但其实现是坏的：

- `openCodepen()` 调用 `window.open(props.codepen)`，而 `codepen` 被声明为 `Boolean`
  → 会打开一个内容为 `true` 的空白页；
- `openCodesandbox()` 只执行 `document.body.style.overflow = 'hidden'`，之后什么都不做
  → **点击后页面滚动被永久锁死**。

> 结论：不要为了让按钮出现而随手传参，**先修实现**。这两条登记为待办。

#### 8.10.3 本批问题的统一成因与建议

成因是同一次「先摆 UI、后接实现」的取舍：图标与文案先放上去，实现留待后续，用一条
`Message.info` 占位。真正的问题不是「留了占位」，而是**占位没有跟踪机制**：
`docs:check` 五件套（API / 死链 / 示例 / 格式 / 标签）都不检查「可点击元素是否有实现」，
因此它们能在全部门禁绿灯的情况下长期存在。

建议按以下顺序处理，而不是一律「补齐」：

1. **先决策去留**：入口 4、5、6 更像设计遗留（返回箭头 / 开发中标签 / 伪版本号），
   优先判断是否值得保留，能删则删 —— 删掉入口比开发一个没人要的功能更划算。
2. **再补两条接错的**：入口 1、2 是低成本的正确性修复（共享响应式状态），
   同时可验证并修掉 8.10.1 的连带问题。
3. **新增护栏**：`check-docs-placeholders` —— 扫描文档站产物中是否存在
   `暂未开发` / `开发中` / `Coming soon` 等占位文案，命中即失败；
   若确实需要保留（如入口 5 的状态标记），以显式白名单登记并写明理由。
   —— 这条护栏的价值在于：把「占位文案」从看不见的角落变成必须显式登记的决策。
   ✅ **本轮已落地**（`build/check-docs-placeholders.cjs`，基线 6 处 = 入口 1/2/4/5，
   已挂到 CI docs 任务 `pnpm run docs:check-placeholders`；反向测试确认新增即 exit=1）。

#### 8.10.4 本轮校验结果（2026-09-16）

| 校验项 | 结果 |
| --- | --- |
| `eslint`（改动文件，`--no-ignore`） | 仅剩该文件**既有**问题（`no-var` ×4、`eqeqeq` ×1 等）——`docs/` 目录未纳入 lint 范围，属既有盲区 |
| `vitest run` | 3 文件 / 9 用例全过 |
| `docs:check`（API / 死链 / 示例 / 格式 / **标签**） | 五项 exit=0（删除 `locale` 后 API 表与源码 props 保持一致） |
| `build:lib` + `build:style` + `verify:dist` | exit=0；`es/` 与 `lib/` 的 `config-provider` 下已无任何 `locale` 引用 |
| 消费方冒烟 `smoke`（真实 vite 构建 + 按需引入 + SSR） | exit=0 |
| SFC 编译校验（`@vue/compiler-sfc`，脚本 `.workbuddy/tmp/compile-sfc-check.cjs`） | 改动过的 `Config.vue` parse / template / script 全部可编译，0 错误 |
| **`build:site`**（vitepress，551s） | ✅ exit=0，产出 368 个文件 |
| `docs:check-site`（产物死链） | ✅ exit=0 —— 「源 markdown 页面 74 个，产物 html 75 个；所有站内链接均可命中」 |
| `docs:check-contrast`（代码块对比度） | ✅ exit=0 —— 底色 `#363449`，75 个 html / 322 个 shiki 代码块 / 29762 个着色 span；最低 token `#768390` 3.11:1，正文 token `#ADBAC7` 6.09:1，全部达标 |
| 产物占位文案复核 | ✅ `theme` chunk 中 `暂未开发` 由 **2 → 1**（入口 3 已随实现一起消失），`theme-translate` / `changeLang` / `btn-lang` 命中数均为 **0**；剩余 `开发中` ×3 与 `暂未开发` ×1 正好对应清单入口 1 / 2 / 4，与 §8.10 表格逐条吻合 |

> **沙箱规避手法（供后续复用）**：本轮 `build:site` 前先把 `site/` 与 `docs/.vitepress/.temp`
> **移动**（而非删除）到 `.workbuddy/tmp/stale/`。vitepress 对**不存在**的目录执行 `emptyDir` 是空操作，
> 于是绕开了批量删除护栏（50 个/轮）；移动不计入删除额度。

> **顺带修复一个 CI 缺口**：`docs:check` 此前只聚合了四项，`docs:check-tags` **并未被引用**，
> 而 CI 步骤名早已写着「API / 死链 / 示例 / 格式 / 标签」—— 等于标签护栏一直没真正挂上。
> 根因是同一批里对 `package.json` 的两次编辑互相覆盖（后写回滚前写）。
> 已补齐为五项并复核聚合行。
>
> **另为两个产物护栏加了 `FEI_SITE_DIR`**（`check-site-links.cjs` / `check-docs-contrast.cjs`）：
> 指向隔离产物目录即可校验，用于无法清空 `site/` 的环境；默认仍读 `site/`，CI 行为不变。
> （后续新增的 `check-docs-placeholders.cjs` 同样支持该变量。）

#### 8.10.5 同一 family 的更大残留：主题内 22 个未被引用的组件

做移除国际化的收尾核对时（确认「`theme-translate` 在源码里也清干净了」）发现：
主题里还留着一份**完整的语言下拉实现** `components/NavLinksLanguages.vue`，
读 `this.$site.locales` / `this.$localeConfig` —— 它**无人引用**，且**未被打包进产物**
（产物中 `NavLinksLanguages` 命中 0）。这正是 §8.9 决策要清掉、却漏在源码里的东西。

顺着这个线索做了全量扫描（只读脚本，方法见下），结论是它不是孤例：

`.vitepress/theme` 下 `.vue` 共 **48 个，其中 22 个疑似死文件**：

| 类别 | 数量 | 文件 |
| --- | --- | --- |
| 完全无引用（`theme/components`，含 `layouts` 目录） | 13 → **12** | `AlgoliaSearchBox` / `ASidebarLink` / `Branding` / `Codefund` / `headerSvg` / `HomeIllustration3` / `HomeIllustration4` / `HomePatrons` / `HomeTwiter` / `HomeUses` / `navbarLayout` / ~~**`NavLinksLanguages`**~~（已删，见下） / `PassLayout` |
| 完全无引用（`global-components`） | 4 | `Badge` / `Coloren` / `docsWarn` / `Icons` |
| 仅出现在注释里 | 5 | `HeaderNotification` / `HomeIllustration1` / `HomeIllustration2` / `NavLinks2` / `premiumThemes` |

> `global-components/` 那 4 个名字过于通用（`Badge` / `Icons` 在别处的类名、词义中大量出现），
> 静态检索易误判，**需人工确认**后再决定去留。

> 说明：`global-components/` 下的文件在本配置里**没有全局注册**
> （`theme/index.ts` 只 `app.component('card', card)`，`codex` 由 `card.vue` 直接 import），
> 因此它们既不能从 Markdown 直接使用、也无处引用。

**产物反证**（避免只做静态推断）：对疑似死文件逐个在 `site/assets/` 检索组件名 ——
`NavLinksLanguages` / `PassLayout` / `HomeUses` / `HomeTwiter` / `Codefund` / `Branding` / `headerSvg`
命中数均为 **0**，确认未被打包；`Badge` / `Icons` 因名字过于通用（命中的是别处的类名/词）不可作数。

**扫描方法**（可复现，只读）：遍历 `theme/**/*.{vue,js,ts}` 建立「文件名 → 是否被其它文件引用」表，
并按行判断引用是否落在注释里；再拿产物交叉验证。一次性脚本见
`.workbuddy/tmp/scan-dead-theme-components.cjs`。

**建议**：这批文件属「先摆 UI、后接实现」的遗留（多为 VitePress 默认主题的分叉副本）。
**不建议逐个顺手删** —— 单删一个会留下不一致状态。建议作为**独立一批**处理，删除前逐个确认
（`HomeIllustration1/2/3/4` 这类是首页插图，可能只是暂时下线）。

**例外：`components/NavLinksLanguages.vue` 已于 2026-09-16 删除**（22 → 21）。
它不是「顺手删」，而是 §8.9「移除国际化」决策**漏掉的源码残留**，故随该项一并清掉：

| 检查 | 结果 |
| --- | --- |
| 是否被引用 | 全仓检索 `NavLinksLanguages` / `nav-links-languages`（`.vue/.ts/.js/.md/.json`）→ **0 命中**；`theme/index.ts` 的 `import` 与 `app.component` 里也没有 |
| 是否被打包 | 产物 `site/assets/` 检索 `NavLinksLanguages` → **0 命中** |
| 它到底是什么 | 170 行**语言下拉**，读 `this.$site.locales` / `this.$lang` / `this.$themeLocaleConfig` —— 全是 **VuePress 1.x 的 API**，在 VitePress 下**根本不可能工作**，属 VuePress 时代的分叉副本 |
| 删除后如何复核 | 重新 `build:site` → exit=0。若「不可达」判断有误，Vite 解析导入时会**直接构建失败**，所以构建通过本身就是强证据 |
| 如何找回 | 删除前记录 blob = `83e3b178c7e85d59a7ee5e2ce5a9b147b0d8d97d`（`git show 83e3b17 > <path>` 即还原） |

> 其余 21 个**本轮仍未删**，只登记。它们与国际化无关（首页插图 / Algolia / 赞助等模板遗留），
> 应作为独立一批逐个确认后再统一处理。

#### 8.10.6 本轮新增护栏：`check-docs-placeholders`

落实 §8.10.3 建议 3，把「占位文案」从看不见的角落变成必须显式登记的决策。
脚本 `build/check-docs-placeholders.cjs`，已接 `package.json` 脚本与 CI docs 任务
（依赖 `site/` 产物，故**不并入 `docs:check`**，与 `docs:check-site` / `docs:check-contrast` 并列）。

| 设计点 | 取值 / 行为 | 理由 |
| --- | --- | --- |
| 扫描对象 | 产物 `site/assets/chunks/theme.*.js` | **不扫源码** —— 源码 Markdown 正文的「开发中也推荐…」是误报，只有产物主题 chunk 才是「用户真会点到的入口」的准确集合 |
| 基线 | 初始 `暂未开发` 1、`开发中` 3、`Coming soon` 0、`敬请期待` 0；**2026-09-16 晚随 §8.11 下调为 `暂未开发` 0、`开发中` 1** | 初始对应入口 1 / 2+4+5；每条基线在脚本里写明理由 |
| 超基线 | exit 1，给出两条出路：`A. 补齐/移除（推荐）` 或 `B. 改基线 + 本节加一行` | 只报「失败」无法行动 |
| 低于基线 | 不失败，提示下调 | 否则基线虚高，将来新增会被旧基线的余量掩盖 |
| 目标文件找不到 | **报错 exit 1**（不静默跳过） | 主题产物布局变更时，静默跳过等于护栏永久失效 |
| 反向自检 | 往隔离产物塞一处 `敬请期待` → exit 1 | 确认护栏不是「永远绿灯」 |

### 8.11 补齐入口 1 / 2 / 4 的实现（2026-09-16）

按 §8.10.3 的建议 1、2 执行：先修「接错了」的那两条，再补返回箭头。
入口 5（状态标记）与入口 6（伪入口 `v3.x`）**本轮未动** —— 它们的去留取决于发布状态，
不能靠改代码判断，见文末「仍待决策」。

#### 8.11.1 根因修复：`vsTheme` 从「普通对象 + 副本」改为「共享 reactive 对象」

§8.10.1 已证明：状态本身没问题，坏在传递方式。修法是让 4 个消费方共享**同一个**对象。

| 位置 | 改动 |
| --- | --- |
| `theme/index.ts` | `globalProperties.vsTheme = { ... }` → `reactive({ ... })` |
| `Config.vue` | `vsThemeVal.value = { ...vsTheme }` → `vsThemeVal.value = vsTheme` |
| `SidebarLinks.vue` | 同上 |
| `global-components/card.vue` | 同上 |
| `global-components/codex.vue` | 同上 |

**为什么保留 `ref` 包装而不直接改用裸对象**：`vsThemeVal` 在脚本里被大量写作
`vsThemeVal.value.X`、在模板里写作 `vsThemeVal.X`（`ref` 自动解包）。
保留 `ref(null)` + `.value = <reactive 对象>` 的写法，**模板与脚本一行都不用改**，
diff 只剩「去掉 `{ ... }`」，改动面最小、最容易复核。

实证（`.workbuddy/tmp/proof-vstheme-fix.mjs`，真实 vue 运行时，全部通过）：
1. `ref(reactive(x)).value === reactive(x)` —— Vue 对已代理对象直接返回自身，不会多包一层；
2. 旧写法 `{ ...vsTheme }` 的副本**仍然**不传播（对照组，证明这不是「碰巧好了」）；
3. 新写法下 Config 写 → SidebarLinks 读到、codex 写 → Config 读到；
4. 写入能触发 `watch`（模板重渲染依赖它）。

#### 8.11.2 入口 1：展开 / 收起侧边栏子栏目

除根因外还有两个独立缺陷：

1. **`localStorage` 只写不读** —— `ChangeMenu` 写了 `sidebarCollapseOpen`，全仓无人读它，
   刷新后偏好丢失。已在 `Config.vue` 的 `onMounted` 补读回。
2. **分组标题「点开也收不起」** —— 旧表达式
   `:open="fixed || i === openGroupIndex || vsThemeVal.sidebarCollapseOpen"`
   用 `||` 串联全局开关，全局为 `true` 时表达式**恒真**。
   改为 `isGroupOpen(i)`，按优先级判定：`fixed` → **用户点过的分组（`groupOverride`）** →
   全局开关 → 当前页面所在分组。没有 `groupOverride`，就无法在「全局展开」时单独收起一组。

顺带修掉一个**静默失效**：`watch(() => route, refreshIndex)` 监听的是同一个对象引用，
**永不触发**，`refreshIndex` 实际从未执行过（`openGroupIndex` 一直是初始值 `0`）。
已改为 `watch(() => route.path, refreshIndex, { immediate: true })`，
`openGroupIndex` 初值同时由 `0` 改为 `-1`（`0` 会让第 0 组被误判为「当前所在分组」）。

补充：确认 `Layout.vue:39` 渲染 `<Sidebar>` 时**未传 `fixed`**（默认 `false`），
因此全局开关不会被 `fixed` 短路 —— 这是「改完到底有没有效果」的前提，必须验证。

#### 8.11.3 入口 2：打开 / 关闭所有代码

`codex.vue` 早已有 `watch(() => openCode)` → `active.value = val`，链路是通的，
唯一的断点就是副本。根因修完即生效。另在 `Config.vue` 的 `ChangeOpenCode` 补写
`localStorage.openCode`（`codex.vue` 的 `watch` 也会写，但它只在「当前页面存在示例面板」
时挂载；无示例的页面上切换会丢）。

#### 8.11.4 入口 4：返回上一页

> ⚠️ **本节的做法已被 §10.11 推翻**（2026-09-16 同日晚）：`router.go(-1)` / `router.push(...)`
> 在 VitePress 1.x 下**根本不存在**，`goBack()` 每次点击都抛 `TypeError`，
> 即这个按钮从补上起就一直是坏的。下表所列的按钮元素改动（`<a>` → `<button>`）
> 与无障碍属性**仍然有效**，只有跳转实现被替换。

取「补齐」而非「移除」（移除会丢掉一个各文档站都有的常规能力）：

- ~~`goBack()` 由 `Message.info('开发中')` 改为真实跳转：有站内上一条记录时 `router.go(-1)`，
  否则 `router.push(site.base)` 回首页 —— 直接打开某个链接时后退会**离开站点**，
  判定依据与 vue-router 一致（`push` 时写入 `history.state.back`）。~~
  ← **实际从未生效**，见 §10.11。
- 元素由 `<a>` 改为 `<button type="button">`：`<a>` 没有 `href` 时**不可键盘聚焦**，
  改 `button` 才能被 Tab 到、被回车触发；同时补 `title` 与 `aria-label`。
- 为此在 `.back-link` 里补了 `background / border / color / cursor` 的按钮默认样式重置。

#### 8.11.5 顺带挖出的第二个真缺陷：`isActive` 是无限递归，被「永不触发的 watch」掩盖着

修入口 1 时，`refreshIndex` 第一次真正被执行（此前那段 `watch(() => route, ...)` 永不触发），
立刻暴露出 `SidebarLinks.vue` 里另一个问题 —— **整个 7 条用例的测试都挂在
`RangeError: Maximum call stack size exceeded` 上**，但堆栈全在 Node 的 `console.log`
对象检查里，看起来像「测试环境的问题」，实际是被测代码的问题：

```js
// 旧代码：本地声明了一个 isActive(page)
function isActive(page) {
  console.log(page);
  return isActive(route, page.value?.regularPath)   // ← 又调用自己
}
```

`resolveOpenGroupIndex` 里写的是 `isActive(route, c.path)` —— 于是 `page` 收到底层的
`route` 对象，`console.log(route)` 去 inspect VitePress 那个巨大的响应式路由对象，
下一次调用又传入 `route`……**两个问题叠在一起**：无限递归 + 在递归里打印大对象。

> ⚠️ 这个函数原本就被两件事遮住了：① `refreshIndex` 从未执行过；
> ② `// refreshIndex()` 在源码里是**被注释掉的**（第 66 行）。
> 也就是说「注释掉一行」让一个必然栈溢出的函数长期存活了下来。

修法：删掉本地 `isActive`，改为从 `../util` 导入真正的 `isActive(route, path)`。
（`../util` 早就导出了正确实现，`SidebarGroup.vue` / `SidebarLink.vue` 用的都是它，
**只有 `SidebarLinks.vue` 自己写了一个坏的**。）

> 方法论教训：**静态检索证明不了「点了会动」**。若只做 grep + 编译校验，
> 这次会得出「已修复」的结论并提交，而线上一点击配置菜单就是栈溢出。
> 是「挂载真实组件 + 点击真实节点」这一步把它逼出来的。

#### 8.11.6 固化为仓库测试（`docs/**/__tests__/`）

入口 1 的行为已写成 7 条运行期用例：
`docs/.vitepress/theme/__tests__/sidebar-collapse.test.ts`（配 `vitepress-mock.ts`）。

接入方式（一处易踩的坑）：`vitest.config.ts` 原先 `include` 只有 `src/**`、
`exclude` 里还明确排除了 `docs` —— **两处叠加会让文档站测试静默不跑**。
已改为 `include` 显式收进 `docs/**/__tests__/*.test.*`，并从 `exclude` 移除 `docs`
（`coverage.include` 仍只统计 `src/**`，不污染覆盖率口径）。

**反向自检已做**（这一步不能省，否则无法区分「护栏有效」与「永远绿灯」）：
把 `:open` 还原成旧表达式 `fixed || i === openGroupIndex || vsThemeVal.sidebarCollapseOpen`
→ **正好 3 条用例失败**，其中就包括「全局展开时仍能单独收起某一个分组」这条原始缺陷；
恢复修复后 7/7 通过。

同时把 `ref(reactive(x))` 的语义、旧写法的对照组一并写进
`.workbuddy/tmp/proof-vstheme-fix.mjs`（6 组断言，全过）。

#### 8.11.7 本轮校验

| 校验项 | 结果 |
| --- | --- |
| 实证脚本 `proof-vstheme-fix.mjs` | ✅ 6 组断言全过（含「旧写法不传播」的对照组） |
| **运行期回归测试** `sidebar-collapse.test.ts` | ✅ 7/7 通过；**反向自检**（还原旧表达式）→ 3 条失败 ✅ |
| 全量 `vitest run` | ✅ 4 文件 / 16 用例（原 3 文件 / 9 用例） |
| `eslint`（`pnpm lint:check`，全仓） | ✅ exit=0 |
| SFC 编译（`@vue/compiler-sfc`） | ✅ 5 个改动过的 SFC 全部 parse / template / script 通过 |
| `docs:check` 五项 | ✅ 全过（81 个标签两条路径一致） |
| 源码占位文案检索 | ✅ `docs/.vitepress/theme` 下仅剩 `Navbar.vue:10` 的站点状态标记一处 |
| `build:site` + 三个产物护栏 | ✅ 见 §8.10.4 同款口径；基线已下调为 `暂未开发` 0 / `开发中` 1 |

> **一处口径纠正**：此前把「`docs/` 不在 lint 范围」归因于 `.eslintignore`。
> 实际 `.eslintignore` **并没有**列出 `docs/`；真正原因是 ESLint **默认忽略点目录**，
> 而路径里含 `.vitepress`（实测报 `File ignored by default.`）。
> 所以 `eslint . --ext ...` 全仓 exit=0 是可信的，文档站主题确实不在门禁内 ——
> 这也解释了为什么那里的 5 个 `no-var` / `eqeqeq` 存量问题能长期存在。

#### 8.11.8 原「仍待决策」三项的去向（2026-09-16 二次处理）

| 项 | 去向 | 依据 |
| --- | --- | --- |
| **入口 5** | 文案**保留**、无效属性 `palin` **移除** | `0.0.2` 就是开发中（见 §8.11.9 证据表） |
| **入口 6** | 元素**移除** | 不是「待补 URL」，而是版本号与目标双错（§8.11.9） |
| **§8.10.2** `codex.vue` 的 CodePen / CodeSandbox | **仍不动** | 见下方说明 |

`codex.vue` 继续不动的理由：它的两个按钮**当前不可见**（`card.vue` 未传 `codepen` / `codesandbox`），
而修好它需要先决定「示例面板要不要提供在线试玩」这个产品问题；
更要紧的是 `codesandbox` 分支的现有实现会把 `body` 滚动**永久锁死**，
所以**不要为了「让按钮显出来」而随手传参** —— 那会把一个隐藏缺陷变成线上缺陷。

#### 8.11.9 入口 5 / 6 的决断与证据（2026-09-16）

**入口 5 · `<f-tag type="success" palin>` —— 属性名写错了，文案是对的**

| 结论 | 证据 |
| --- | --- |
| `palin` 不是 Tag 的属性 | `src/tag/src/types.ts` 的 `TagProps` 里没有 `plain`；`docs/components/tag.md` 属性表只有 `no-border`。`plain` 是 **Button** 的属性（`docs/components/button.md:433`） |
| 它会**静默**透传成 DOM 属性 | 产物 `theme.DZ7jE8hT.js` 的渲染函数写作 `q(h,{type:"success",palin:""},…)`；Tag 根节点是单元素 `<span>`，未声明属性按 fallthrough 落到它上面 —— **单根节点不触发任何 Vue 警告**，所以长期无人发现 |
| 视觉上等于没写 | Tag 的类名拼接里没有 `plain` 分支，去掉前后渲染结果一致（纯清理，非行为变更） |
| 「开发中」据实保留 | `package.json` `version=0.0.2`，`docs/guide/changelog.md` 说明重构后版本线自 `0.0.2` 起算 —— 未发布 1.0，状态标记准确 |

**入口 6 · `<span class="v-old">v3.x</span>` —— 移除（而非补 `href`）**

1. **本库没有 3.x 这条版本线**：`changelog.md` 载重构前为 `0.0.1~0.0.4`，
   重构后重新自 `0.0.2` 起算，当前 `0.0.2`。「Previous Version = v3.x」对不上任何一条版本线。
2. **唯一候选旧站点已不可达**：上一代项目为 `fei-ui-one`（README:9 指向
   `https://ymf-930.gitee.io/fei-ui-one/#/guide`）。实测 Pages 根路径 **404**、
   `gitee.com/ymf-930/fei-ui-one` 仓库页 **404**、`registry.npmjs.org/fei-ui-one` 返回 `{"error":"Not found"}`。
3. **所以它不是「占位待补」，而是错误信息**：留着一个指向不存在的版本、又永远点不动的元素，
   比没有它更糟 —— 使用者会以为存在上一版文档。

同时清掉了随之失效的 `.v-old` 样式块与 `.remove-links` 里对它的 `display none`。
复原方式：在 `.external-links-search` 内加回
`<a class="v-old" href="<真实地址>">v3.x</a>` 并补回样式；模板中已保留说明性注释，
注明「没有真实地址时不要加回」。


## 九、文档站正文排版统一（2026-09-16）

**需求口径**：保持现有主题风格（`--vs-*` token、Poppins、卡片圆角、深色代码块）
不变，把**组件在线使用说明文档**的正文排版做一次收敛，让字号成阶梯、间距成节奏、
正文/列表/代码块/表格共用同一条左右基准线。**Markdown 内容与标题层级一律不动。**

### 9.1 复现「不专业」的六个成因

改造前先定位，避免只调数值：

| # | 成因 | 证据 |
| --- | --- | --- |
| 1 | **同一批元素被四处重复定义、互相抵消** | 元素级规则分散在 `theme/custom.styl`、`theme/index.css`、`global-components/card.vue`、`global-components/codex.vue` 四处，后写的覆盖先写的 |
| 2 | **卡片内内容额外内缩** | `card.vue` 给 `.text` 里的 `h2/p/li` 加 `padding 15px 20px`，导致「导语段落 ↔ 卡片内标题」左边缘差 20px |
| 3 | **字号阶梯断裂** | VitePress 默认主题只声明了 `.vp-doc h1~h3`；`h4~h6` 落到浏览器默认的 `1.17em/.83em/.67em`，**h6 ≈10px，比正文（15px）还小** |
| 4 | **表格是满格描边** | 原规则 `border-collapse:collapse` + 逐格 `1px solid #dfe2e5`，无圆角、无斑马纹；且 `color: var(--vs-theme-code)` |
| 5 | **引用块对比度不达标** | 正文色 `#999` 在页面底 `#f4f7f8` 上约 **2.6:1**，低于 WCAG AA 的 4.5:1 |
| 6 | **正文链接与正文同色** | 站点外壳有一条 `a { color: var(--vs-theme-color) !important }`（`custom.styl`），把 `.vp-doc a` 的主色**顶掉**，链接只剩 `font-weight:500` 可辨 |

### 9.2 做法：单层收敛 + token 化

新增 **`docs/.vitepress/theme/styles/doc-typography.styl`** 作为唯一权威来源：

- 只作用于 `.vp-doc`，首页 `.home` / 导航 / 侧边栏 / 页脚不受影响；
- 所有数值走 `--fd-*` token（字号阶梯 28/22/18/16/15/14、行高、8pt 间距、描边圆角、
  两档文字色），规则里不写裸数字；
- 原来四处重复的元素规则**全部删除**，避免再次互相抵消。

**引入位置是关键**（踩过才写下来）：`doc-typography.styl` 由 `theme/index.css`
顶部 `@import` 引入，而 `index.css` 在 `theme/index.ts` 里排在
`import DefaultTheme from "vitepress/theme"` **之后**。这样同优先级规则才是本层胜出。
产物已验证：

```
195852:.vp-doc h2{margin:48px 0 16px;border-top:1px solid var(--vp-c-divider);padding-top:24px;…;font-size:24px}   ← VitePress 默认
307014:.vp-doc h2{font-size:var(--fd-fs-h2);letter-spacing:-.01em;margin:var(--fd-sp-7) 0 var(--fd-sp-3)}          ← 本层
```

**两条「必须排除 demo 区」的规则**（`:not(.example *)`）—— demo 渲染的是组件实体：
`<f-table>` 就是 `<table>`（全站 74 个）；面包屑 / 分割线 / 下拉菜单 / 抽屉 / 菜单 /
弹出信息的示例里是**真实的 `<a>`**。文档表格样式与文档链接色都不能刷到它们身上。

**一处有意为之的视觉变更**：VitePress 默认给 `h2` 加了
`border-top: 1px solid var(--vp-c-divider)` + `padding-top: 24px`。本层统一
`border: 0; padding: 0`，h2 不再有顶部分隔线，层级改由间距表达 —— 因为组件文档的每个
小节都包在 `<card>` 里，卡片边界本身已经很清楚地分段，再叠一条分隔线会在卡片顶部
形成「双线」。**如需恢复，只需在 `doc-typography.styl` 的 `.vp-doc h2` 里补回
`border-top` 与 `padding-top`。**

### 9.3 顺带修掉的「看着生效、其实被浏览器丢弃」的声明

这一轮最值钱的产出是把这类**静默失效**的 CSS 清掉。成因：VitePress 1.x 删除了
VuePress 0.x 的整套 Stylus 变量（`$borderColor`、`$textColor`、`$accentColor`、
`$MQNarrow`、`$MQMobile`、`$MQMobileNarrow`、`$navbarHeight`、`$codeLang`、
`$lineNumbersWrapperWidth`、`$arrowBgColor`…）。**Stylus 对未定义变量不报错，而是把
变量名原样输出**，产物里就是 `border-bottom:1px solid $borderColor` 这类非法值，
浏览器整条丢弃；构建全程无任何警告。

改动前产物里残留的非法串（`site/assets/style.*.css`）：`$borderColor`、
`$MQNarrow`、`$MQMobileNarrow`、`$lineNumbersWrapperWidth`、`language-$codeLang`。

本轮清除的位置：

| 文件 | 原声明 | 处理 |
| --- | --- | --- |
| `styles/code.styl` | `for lang in $codeLang` 循环、`$lineNumbersWrapperWidth`、`.line-numbers-mode` / `.highlight-lines` / `.tag` | 整块删除（VitePress 1.x 已无这些结构，语言角标它自己输出 `span.lang`） |
| `styles/wrapper.styl` | `@media (max-width: $MQNarrow)` / `$MQMobileNarrow` | 断点改**字面值** `1240px` / `560px`，窄屏内边距这才真正生效（该文件由 `components/Page.vue` `@require`） |
| `styles/theme.styl` | `h2 { border-bottom 1px solid $borderColor }`、`hr { border-top 1px solid $borderColor }` | 删除并注明（该文件由 `layouts/404.vue` 引入，作用域是**全站**） |
| `custom.styl` | `h2 { border-bottom … }`、`h1/h2/h3` 固定字号、`h1~h6 { line-height 1.25 !important }`、`a.header-anchor { float left; margin-left -0.87em }` | 删除；`!important` 行高会顶掉新 token，`float` 锚点在标题不再内缩后会被卡片 `overflow` 裁掉 |
| `codex.vue` | `.con-code div[class*="language-"] …`、`.slots div …` | 删除 —— **`<style scoped>` 管不到插槽内容**（插槽 DOM 带使用方的 scope id） |

### 9.4 尚未处理：外壳里仍有约 49 处未定义 Stylus 变量（P3）

**为什么没一起改**：这些都落在站点外壳（导航 / 侧边栏 / 首页 / 搜索框），
不在本次需求范围内；而且**补齐变量 = 激活一批从未生效过的规则**，属于「改行为」而非
「调样式」，需要人眼在窄屏下过一遍才能确认。此处先建档，不改。

根因（**关键**）：每个 SFC 的 `<style lang="stylus">` 是**独立的编译单元**，
`styles/mixins.styl` 里的 `getVar()` / `getColor()` 不是全局注入的 ——
**每个 SFC 都自己抄了一份**（`SearchBox.vue` 甚至自己定义了 `$borderColor`）。
所以修法只能是「逐文件补本地 `$` 定义」，没有一处改全局的办法。

| 文件 | 处数 | 变量 |
| --- | --- | --- |
| `components/AlgoliaSearchBox.vue` | 9 | `$borderColor` `$accentColor` `$textColor` `$MQMobile` |
| `components/SearchBox.vue` | 4 | `$MQNarrow` `$MQMobile`（`$borderColor` 该文件自备，不算） |
| `components/SidebarGroup.vue` | 3 | `$accentColor`（侧边栏分组 active/hover 高亮） |
| `components/Sidebar.vue` | 3 | `$navbarHeight` `$textColor` `$borderColor` |
| `components/AsideNav.vue` | 3 | `$navbarHeight` `$textColor` `$borderColor` |
| `components/DropdownLink.vue` | 3 | `$MQMobile` `$arrowBgColor` |
| `components/Page.vue` | 2 | `$accentColor`（返回顶部按钮 hover）、`$MQMobile` |
| `components/Navbar.vue` | 2 | `$navbarHeight` |
| `components/NavLinks.vue` / `NavLinks2.vue` | 各 2 | `$MQMobile` |
| `components/Home.vue` | 2 | `$MQMobile` `$MQMobileNarrow` |
| `global-components/Badge.vue` | 1 | `$accentColor` |
| `global-components/codex.vue` | 1 | `$accentColor`（active 标签页；该处 `i { color:#fff !important }` 已把图标刷白，实为无效声明） |
| `components/api.vue` | 1 | `$accentColor`（**该组件未被任何页面引用，属死组件**） |
| `styles/arrow.styl` / `mobile.styl` | 4 / 3 | 两者都 `@require './config'`，而 **`config.styl` 不存在**；且无任何文件引入它们 |
| `styles/palette.styl` / `custom-blocks.styl` | 2 / 2 | 定义了变量但无人引入，属**孤儿文件** |

**严重度判断（已取证，故定 P3 而非 P1）**：主题内另有 **68 处字面断点**
（`@media (max-width: 719px/1000px/1200px…`），窄屏布局由它们承担；
失效的 `$MQ*` 只有 14 处，且 `a.sidebar-link.active/:hover` 的高亮、
`:after` 指示条用的是字面值，**侧边栏「当前页」标识是正常的**。
所以这批残留是可读性层面的小瑕疵，不是布局缺陷。

### 9.5 本轮校验

| 校验项 | 结果 |
| --- | --- |
| `build:site` | ✅ `build complete in 64.49s`（两次重建均 exit=0） |
| 产物含 `--fd-*` token / `.vp-doc` 新规则 | ✅ 逐条 grep 命中；`--fd-fs-h1`、`--fd-sp-5`、`--fd-border`、`--fd-lh-body` 等值正确 |
| 规则优先级 | ✅ 本层 `.vp-doc h2` 字节偏移 307014 > VitePress 默认 195852 |
| `:not(.example *)` 保护 | ✅ 表格 8 条 + 链接 2 条均在产物中 |
| 非法串残留 | ✅ `language-$codeLang`、`$lineNumbersWrapperWidth` 已归零（`$borderColor`/`$MQ*` 的残余来自 §9.4，已建档） |
| `docs:check` 五项 | ✅ 全过（78 条链接 0 死链 / 81 个标签两条路径一致 / 格式 0 项） |
| `docs:check-placeholders` | ✅ 未超基线 |
| `docs:check-contrast` | ✅ 代码块底色与着色主题配套、全部 token 对比度达标 |
| `docs:check-site`（产物资检） | ✅ 74 个源页面 / 75 个产物 html，站内链接全命中 |
| `vitest run` | ✅ 4 文件 / 16 用例全过 |
| `eslint`（全仓） | ✅ exit=0 |

> **口径提醒（重复记一次）**：`vitepress build` 会清空 `outDir`（此处为 `../site`），
> 在受限沙箱下「批量删除」会被拦截。做法是先把 `site` 与 `docs/.vitepress/.temp`
> 移到 `.workbuddy/tmp/stale/` 再构建，不要试图给 `clean` 开白名单。

### 9.6 后续建议

1. **P3·外壳 Stylus 变量**：按 §9.4 的表逐文件补本地变量，改完必须在
   ≤719px / ≤1000px / ≤1200px 三档下过一遍（激活规则会改布局）。
2. **P2·可考虑加护栏**：产物 CSS 里出现 `$[A-Za-z_]` 一定是死代码，天然无误报。
   但当前 §9.4 尚有 49 处存量，直接做成阻断项会红 —— 需要先清理，或按文件建基线。
3. **P2·`api.vue` 是死组件**（无引用、无 md 使用 `con-api`），可整体删除，
   与 §8.10 的占位清理同批处理。


## 十、明暗主题切换动画不一致（2026-09-16）

### 10.1 现象

同一个开关：**切到暗色有「从点击处扩散的圆形擦除」，切回浅色却什么都没有**（只剩一次整体
淡出）；并且无论哪个方向，观感上都不是「一条动画」。用户反馈原话：
**「切换明暗主题效果感觉动画不一致」**。

### 10.2 根因：一段 scoped 样式让整套 view-transition 规则静默失效

站点明暗切换是自研的（`theme/components/Config.vue`）：

- 状态落在 `document.body` 的 `vs-theme="dark"` 属性与 `.darken` 类上
  （**不是** VitePress 的 `html.dark`）
- 切换时 `document.startViewTransition()`，在 `transition.ready` 里对某个
  `::view-transition-*(root)` 伪元素跑一条 `clipPath` 的 `circle()` 动画

而「关掉 UA 默认交叉淡入淡出、固定图层顺序」的那套规则，原先写在
`layouts/Layout.vue` 的 **`<style lang="stylus" scoped>`** 里。产物证据：

```css
[data-v-1b2f3e07]::view-transition-old(root){z-index:9999999}
[data-v-1b2f3e07]::view-transition-new(root){z-index:1}
```

`<html>` 上不带任何 `data-v-*`，而 view-transition 伪元素**只挂在文档根元素上** ——
两个条件都不成立，5 条规则全部永不匹配。**构建不报错、产物里还能 grep 到**，属典型静默失效
（与 §9.3 的「未定义 Stylus 变量原样输出」是同一类问题：看着生效，实际被浏览器丢弃）。

失效后果（CDP 采样实测，修复前）：

| 采样点 | `::view-transition-old/new(root)` 计算样式 | 同时在跑的动画 |
| --- | --- | --- |
| 切换中 40~400ms | `blend=plus-lighter`、`z=auto` | UA 默认 `fade-out`/`fade-in` + `plus-lighter` 混合（**250ms, linear**），与 JS 的 clip-path（**500ms, ease-in**）叠加 |

即：`animation:none` 没生效 → 250ms 交叉淡入淡出一直在跑；`mix-blend-mode:normal` 没生效 →
两层以 `plus-lighter` 加色叠加，画面发白；z-index 换序没生效 → 默认层级是 `new` 在上。

**最后一条直接造成「两个方向不一样」**：原逻辑是「去程动 `new`、回程动 `old`」，
回程那条动画被压在不透明的 `new` 之下，**完全看不见**，于是回程只剩默认淡出。

### 10.3 做法

1. **规则搬到全局**：新建 `theme/styles/view-transition.styl`（由 `theme/index.css` 顶部
   `@import` 引入）；`Layout.vue` 的 scoped 块只留一句指向它的注释。
2. **只留一条可见动画**：`::view-transition-old/new(root) { animation:none; mix-blend-mode:normal }`，
   层级固定为 `old:1 / new:2`，**删掉按明暗方向换序的那套 `.darken::…` 规则**。
   （UA 还会在 `::view-transition-group(root)` 上跑一条 250ms 的几何对齐动画；`root` 的快照
   恒等于视口，它不产生可见位移，故保留。）
3. ~~**两个方向统一**：`ChangeTheme` 现在无论去哪个方向都只动
   `::view-transition-new(root)`（新主题从点击处扩散），不再反转 clipPath、不再切换目标伪元素。~~
   **⚠️ 本条已被 §10.7 推翻**：「两个方向都从点击处扩散」只让两段动画的**构成**一致，
   观感上并不是一次往复。现已改为「去程铺开、回程收回」，见 §10.7。
4. **缓动对齐**：`ease-in` → `ease-in-out`。`ease-in` 在整个主题里**只此一处**，
   其余是 `ease` / `ease-out`；揭示式动画「越接近结束越快」观感突兀。

### 10.4 顺带修掉的两个健壮性问题

- **不支持 View Transitions 的浏览器「点了没反应」**：原实现无条件调用
  `document.startViewTransition(...)`，在不支持的环境会抛 `TypeError`；由于
  `applyTheme` 写在回调里，**主题根本不会被切换**。现已先判断
  `typeof document.startViewTransition !== 'function'`，降级为直接切换。
- **定时器与动画时长靠人工对齐**：原先 `vs-remove-transition` 的释放写死 500ms，
  与动画时长是两份需人工同步的数字；现改为等 `transition.finished`。
  另补 `prefers-reduced-motion: reduce` 时跳过圆形擦除。

### 10.5 本轮校验

| 校验项 | 结果 |
| --- | --- |
| 产物 CSS | ✅ `::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}` 等 3 条均为**全局**选择器；`data-v*…view-transition` 命中数 0 |
| CDP 实测（两方向 × 5 采样点） | ✅ 两方向均为 `Animation@::view-transition-new(root)(500ms,ease-in-out)`；伪元素 `anim=none / z=1,2 / blend=normal`；UA 默认 fade 与 plus-lighter 已消失 |
| 抓帧（切换后 150ms） | ✅ 两方向都能看到「从点击处扩散的圆」，画面不再发白 |
| `build:site` | ✅ exit=0 |
| 8 项文档护栏（`docs:check` ×5 + contrast + placeholders + site-links） | ✅ 全过 |
| `vitest run` | ✅ 4 文件 / 16 用例 |
| `eslint`（全仓） | ✅ exit=0 |

复现脚本（均为只读探针）：
- `.workbuddy/tmp/probe-theme-transition.mjs` —— CDP 驱动无头 Chrome，采样
  `getAnimations({subtree:true})` 与伪元素 `getComputedStyle`，两方向各抓一帧；
- `.workbuddy/tmp/serve-site.mjs` —— 本地起已构建站点。**必须用它**：
  `vitepress preview` 不带 `base` 前缀，产物里的 `/fei-ui-design/…` 资源会 404
  （页面能打开但没有任何样式），排查时极易误判。

### 10.6 尚未处理 / 建议

1. **P3·`reloadConfig` 的「重置为暗色」从未生效**：该函数里写着
   `localStorage.theme = 'dark'`，但全站读取的是 `localStorage.vsTheme` —— 这个 key
   没有任何读取点，所以「重新加载配置」不会重置主题（其余项都会重置）。
   已就地加注释、**未改语义**：「重置到底该跟随系统还是强制暗色」属产品判断，确认后再动。
2. **P3·暗色模式下的代码块配色没有护栏**：`check-docs-contrast` 只校验
   `--vs-theme-code2` 的**浅色值** `#363449`。暗色下该变量变为 `#161619`，而 shiki 两侧
   都是深色主题、实际只用 `--shiki-light`。按比例换算：达标 token 都比 `#363449` 更亮，
   底色变暗只会**提升**对比度，故无回归风险 —— 但这条推论尚未被自动化验证。

### 10.7 方向修正：去程铺开 / 回程收回（2026-09-16 同日）

> ⚠️ **本节确定的方向已被同日的 §10.8 反转**（用户紧接着提出「方向要相反」）。
> 本节仍然有效的是：取证方法，以及「按方向换序为什么是双重失效」的结论。
> **动效方向一律以 §10.8 为准**，本节的方向描述只作过程记录。

**触发**：用户反馈原话 **「动画是左下到右上，右上到左下」**。

**先取证**：把视图过渡**冻结**在 6 个时间点，逐帧读**渲染后的像素**，沿「画面左下角 →
右上角」对角线打 21 点亮度剖面（`D`=深色底 / `L`=浅色底，**从左往右读 = 从左下到右上**）：

| 时间 | 修改前 light→dark | 修改前 dark→light |
| --- | --- | --- |
| 0ms | `LLLLLLLLLLLLLLLLLLLLL` | `DDDDDDDLDDDDDDDDDDDDD` |
| 160ms | `LDDDDDDLLLLLLLLLLLLLL` | `DLLLLLLLDDDDDDDDDDDDD` |
| 240ms | `DDDDDDDLDDDDLLLLLLLLL` | `LLLLLLLLLLLLDDDDDDDDD` |
| 400ms | `DDDDDDDLDDDDDDDDDDDLL` | `LLLLLLLLLLLLLLLLLLLLL` |

读完即知：**修改前两个方向的前沿都是「左下 → 右上」**，两段动画在几何与层级上完全一致
（`z=2/1`、`blend=normal`、圆心同为点击处 `336,782`）。也就是说，用户那句话不是在描述
「当前行为」，而是在给出**期望的动效** —— 一次**往复**。

**为什么原实现做不到**：原作者写的本来就是往复（`.darken` 换序 +`[...clipPath].reverse()`
去动 `old`）。但那批规则除了被 scoped 污染（§10.2），还叠了**第二个错**：
`.darken` 挂在 **`<body>`** 上，而 view-transition 伪元素树挂在 `<html>` 下、与 `<body>`
是**兄弟**关系 —— `body.<类>::view-transition-*(root)` 这类选择器**永远匹配不到**。
所以「换序」从来就没生效过，是双重失效。

**做法**：

1. `view-transition.styl` 恢复按方向换序，但方向类挂**文档根元素**：
   `html.vs-wipe-retract::view-transition-old(root){z-index:2}` /
   `…-new(root){z-index:1}`；默认（去暗色）仍是 `old:1 / new:2`。
2. `ChangeTheme` 恢复「去程动 `new`（半径 0→R，铺满）/ 回程动 `old`（半径 R→0，收回）」，
   两程共用同一个以点击处为圆心的圆。**这次两个方向都真的看得见** —— 因为换序这回生效了。
3. 方向类必须在 `startViewTransition` **之前**加、过渡**结束后**撤 —— 否则第一帧的上下
   关系是错的；再用递增序号 `wipeSeq` 作废旧过渡的收尾，避免连点两下时前一次把方向类
   （连同元素级 transition 开关）提前撤掉。

**实测验证**（同一个探针，改后）：

| 时间 | light→dark | dark→light |
| --- | --- | --- |
| 160ms | `LDDDDDDLLLLLLLLLLLLLL` | `DDDDDDDDDDDDDDDDDLLLL` |
| 240ms | `DDDDDDDLDDDDLLLLLLLLL` | `DDDDDDDLDDDDDLLLLLLLL` |
| 400ms | `DDDDDDDLDDDDDDDDDDDLL` | `LLLLLLLLLLLLLLLLLLLLL` |

- 改后 light→dark：前沿**向右**推进 → **左下 → 右上** ✅
- 改后 dark→light：亮色先出现在**最右端**、前沿**向左**推进 → **右上 → 左下** ✅
- 层级实测已随方向翻转：去暗色 `z(new/old)=2/1`，回浅色 `z(new/old)=1/2`
  —— 这同时证明 `html.vs-wipe-retract::…` 这条选择器**确实匹配**
- 动画目标伪元素也随方向切换：去暗色 `::view-transition-new(root)`、
  回浅色 `::view-transition-old(root)`，clipPath 关键帧相应反转

**回退方式**：若确认要「两个方向都从点击处扩散」，把 §10.3 第 3 条的做法改回来
（JS 两处方向分支 + 删掉方向类规则）即可；但要意识到那会让回程**不再收回**。

**新增只读探针**：`.workbuddy/scripts/probe-wipe-geometry.mjs`
（冻结 + 逐帧采样渲染像素 + 输出亮度剖面字符串；比看截图更容易比对方向）。

### 10.8 方向反转：去程收回 / 回程铺开（2026-09-16 同日）

**触发**：用户反馈原话 **「切换明暗主题效果动画方向要相反」** —— 紧接 §10.7 之后。

**判定**：§10.7 刚把两程定为「去暗色铺开（左下→右上）/ 回浅色收回（右上→左下）」，
「相反」即把两程**互换**：**去暗色 = 收回（右上→左下）、回浅色 = 铺开（左下→右上）**。
圆心仍留在点击处（保持「跟手」），只反行进方向 —— 不是把起点挪到对角（见文末另一种读法）。

**做法**（两个文件、四个改动点）：

| | 作用层（WAAPI 目标） | 关键帧 | `z(new/old)` | 观感 |
| --- | --- | --- | --- | --- |
| 去暗色 | `::view-transition-old(root)`（浅色快照） | `R → 0`（收回） | 1/2（old 在上） | 右上 → 左下 |
| 回浅色 | `::view-transition-new(root)`（浅色页） | `0 → R`（铺开） | 2/1（new 在上） | 左下 → 右上 |

相对 §10.7 就是把两分支的「条件 / 伪元素 / 关键帧顺序」整体对调：
`if (!nextIsDark)` → `if (nextIsDark)`，`pseudoElement` 与 `clipPath` 两处三元同时取反。
「**收缩谁，谁就必须在上层**」这条不变。

**顺带改名**：`vs-wipe-retract` → `vs-wipe-old-top`（常量 `THEME_WIPE_OLD_TOP_CLASS`），
`html.vs-wipe-retract::…` → `html.vs-wipe-old-top::…`。
理由：类名原先按**方向**取名（retract = 回浅色），方向一反转立刻名不副实。
改按**机制**取名（old 压在上层）—— 机制不随产品决策变。**两个文件必须同名同步改。**

**实测验证**（同一探针，剖面从左往右读 = 左下 → 右上）：

| 时间 | light→dark | dark→light |
| --- | --- | --- |
| 0ms | `LLLLLLLLLLLLLLLLLLLLL` | `DDDDDDDLDDDDDDDDDDDDD` |
| 160ms | `LLLLLLLLLLLLLLLDDDD` | `DLLLLLLLDDDDDDDDDDDDD` |
| 240ms | `LLLLLLLLLLLLLDDDDDDDD` | `LLLLLLLLLLLLDDDDDDDDD` |
| 400ms | `DDDDDDDLDDDDDDDDDDDDD` | `LLLLLLLLLLLLLLLLLLLDD` |

- 去暗色：暗色先出现在**最右端**（右上角）、前沿**向左**推进 → **右上 → 左下** ✅
- 回浅色：亮色先出现在**最左端**（点击处）、前沿**向右**推进 → **左下 → 右上** ✅
- 作用层与层级随方向对调：去暗色 `pseudo=::view-transition-old(root)`、`z(new/old)=1/2`；
  回浅色 `pseudo=::view-transition-new(root)`、`z(new/old)=2/1`
  —— 与 §10.7 记录的**完全相反**，说明反转确实落地

**⚠️ 一个容易误判的点**：缓动是对称的 `ease-in-out`，两个方向的半径关键帧又是同一组，
所以**同一时刻的冻结帧几何几乎重合**（如 240ms 两侧半径都 ≈623px）。
「方向」只能从**早期/末期相位**读（谁由小到大、谁由大到小），
拿中间帧目视比对会得出「两个方向一样」的错误结论 —— 亮度剖面才是可靠判据。

~~**另一种「相反」的读法**（本次**未**采用）：把圆心挪到对角
（`x` → `innerWidth - x`、`y` → `innerHeight - y`），即擦除从右上角起手。
那样前沿方向同样相反，但圆心不再跟手（点击处从「起点」变成「收束点」）。
若产品要的是这一种，只需改 `ChangeTheme` 里算 `x`/`y` 的两行。~~
**已作废（§10.9）**：用户随后明确了「圆心在开关处」——圆心**跟手且落在开关上**，
不挪到对角；方向仍以 §10.8 的「去程收回 / 回程铺开」为准。

### 10.9 圆心修正：从「鼠标落点」改为「开关几何中心」（2026-09-16 同日）

**触发**：用户反馈原话 **「圆心应该在开关处」** —— 紧接 §10.8 之后。

**取证：必须换探针，旧探针对这个问题是盲的**

§10.7 / §10.8 用的 `probe-wipe-geometry.mjs` **派发 click 时给的坐标正是开关中心**，
于是「圆心 = 鼠标落点」与「圆心 = 开关中心」两种实现在它眼里一模一样，
永远分不出对错 —— 这个盲区只能用**偏心坐标**踩出来。

新增 `.workbuddy/scripts/probe-wipe-origin.mjs`，三个场景，**全部走真实输入管线**
（CDP `Input.dispatchMouseEvent`，不用 `dispatchEvent`）：配置栏靠 CSS `:hover` 展开，
`dispatchEvent` 骗不出 hover，场景 2 就废了。

| 场景 | 意图 |
| --- | --- |
| `pointer-corner` | 鼠标点在浮动开关**左上角内 3px** |
| `panel-corner` | 先 hover 展开配置栏，再点栏内主题项的偏心处 |
| `no-coord-click` | 派发**不带坐标**的 click（`clientX/Y` 默认 `0`）＝键盘 Enter / 辅助技术激活 |

**对照实测**（旧 `c18c612` 构建 vs 本次修复后，同一探针、同一起点状态）：

| 场景 | 点击坐标 | 开关几何中心 | 旧圆心 | 新圆心 |
| --- | --- | --- | --- | --- |
| `pointer-corner` | (303, 762) | (336, 782) | **(303, 762)**，偏 33×20 ❌ | **(336, 782)**，偏 0×0 ✅ |
| `panel-corner` | (267, 717) | (284, 710) | **(267, 717)**，偏 17×7 ❌ | **(284, 710)**，偏 0×0 ✅ |
| `no-coord-click` | 无坐标 | (336, 782) | **(0, 0)**，圆心飞到画面左上角 ❌ | **(336, 782)**，偏 0×0 ✅ |

前两条就是用户看到的「圆心不在开关处」：圆心**跟着鼠标落点跑**，
点在开关边角时圆就从那个角发散，不像从开关里长出来。

**第三条不只是观感，是真实缺陷**：键盘 Enter 或屏幕阅读器激活开关时，
`click` 事件不带指针坐标（`clientX/Y` 恒为 `0`），旧实现把 `(0,0)` 当圆心 ⇒
**圆从画面左上角开始扩散**。这条路径用鼠标点击**永远测不出来**。

**做法**：`Config.vue` 新增 `wipeOrigin(event)` —— 圆心取**触发元素的几何中心**；
圆形开关优先取内层 `.switch-con`（按钮自身 padding 不对称时也不会偏中心），
取不到有效尺寸则回退视口中心。

两个实现要点：

1. `event.currentTarget` **只在处理函数同步执行期间有值**，过后为 `null` ——
   矩形必须**当场**取出来，不能留到 `transition.ready` 回调里再算。
2. 用 `getBoundingClientRect()` 的**视口坐标**，与 `clipPath` 里圆的坐标系同源，
   不需要补滚动偏移。

**本次未动**：方向（§10.8 的去程收回 / 回程铺开）、时长 500ms、缓动 `ease-in-out`、
图层机制（`vs-wipe-old-top`）全部保持 —— 只改圆心，不碰其它变量。

**⚠️ 探针写法陷阱**：不要用 `el.click()` 冒充「无坐标 click」。Chrome 会给它填上元素的
**左上角**坐标（实测 `[300,759]`），于是测的还是偏心点击，**无坐标分支一次都没走到**，
会得到「这条也过了」的假绿。必须
`dispatchEvent(new MouseEvent('click', {bubbles: true}))`。

**本轮校验**：

| 校验项 | 结果 |
| --- | --- |
| `probe-wipe-origin`（3 场景 × 旧/新两版对照） | ✅ 旧版 3/3 FAIL（含 `(0,0)`）、新版 3/3 PASS（偏差 0×0） |
| `build:site` | ✅ exit=0，191.42s |
| 8 项文档护栏（`docs:check` ×5 + site-links + contrast + placeholders） | ✅ 全过 |
| `vitest run` | ✅ 4 文件 / 16 用例 |
| `eslint`（全仓） | ✅ exit=0 |

### 10.10 圆心「在外部浏览器里不对」的复核：**无缺陷，但圆心不在圆钮上**（2026-09-16 同日）

**触发**：用户反馈「内部浏览器验证看着是在开关处，但是外部浏览器打开圆心位置不对」。

**结论先说**：产品**没有**缺陷。用户在出问题的那个浏览器里跑现场诊断脚本，返回
`✅ 圆心=开关中心`（`(76,961)` = 轨道中心）—— 即该页面跑的已是 §10.9 的新代码。
两侧表现不一致更可能来自**缓存住的旧产物**（旧实现的圆心跟着鼠标落点跑，
点开关边角时就从那个角发散，观感正是「不在开关处」）。

**但 §10.9 之前的验证有个根本漏洞，这轮才补上：**

§10.9 的三个场景读数全部取自 `getAnimations()` 的关键帧
（`circle(R at x y)`），也就是**把代码自己写进去的数字读回来** —— 这是自证，
只能证明「算对了」，证明不了「屏幕上画在哪」。**坐标系一旦错位，探针照样全绿。**

正确做法是**像素级拟合**：把视图过渡冻结在时刻 T，沿每一列自上而下扫描浅色区上沿
`y_top(x)`，那是一段圆弧；对 ±25px 邻域做最小二乘抛物拟合，顶点 `-b/(2a)` 即可见圆心 x。
另加一条**不依赖拟合**的交叉验证：只在圆内有值的那些列，其 x 范围就是弦，弦中点即圆心 x。

新增 `.workbuddy/scripts/probe-wipe-center-fit.mjs`（像素拟合 + 弦 + 环叠加证据图）
与 `.workbuddy/scripts/probe-wipe-visual.mjs`（带准星的冻结帧）。

**实测（两方向 × 四档 dpr，圆心横向均落在轨道中心）**：

| 方向 | T | 动画半径 | 拟合半径 | 弦中点 x | 轨道中心 | 圆钮中心 |
| --- | --- | --- | --- | --- | --- | --- |
| 去暗色 | 410ms | 109.7 | 105.5 | —（窗内饱和） | 76 | 63 |
| 去暗色 | 450ms | 32.9 | 28.2 | **75.5** | 76 | 63 |
| 回浅色 | 40ms | 20.9 | 15.6 | **75.5** | 76 | 90 |
| 回浅色 | 90ms | 109.7 | 105.5 | —（窗内饱和） | 76 | 90 |

- 弦长与动画直径吻合到 **0.4px**（如 40ms：弦宽 41 vs `2×20.9=41.8`），
  说明**屏幕上的圆与代码的数值完全一致**；
- 拟合半径恒比动画半径小 4~5px，且圆心 y 同步小 5px —— 这是**顶点附近曲率估计的固有偏差**
  （抛物线在顶点附近太平，r 被低估），不是真实位移：三个样本的偏差量完全一致，
  且扫描到的**圆弧最高点与代码值逐像素吻合**（40ms：拟合 `cy-r=940.8` vs 代码 `962-20.9=941.1`）。
- `dpr = 1 / 1.25 / 1.5 / 2` 四档横向拟合值均为 **75.4~75.8**。

**用户看到的「偏」到底偏在哪**：那个「开关」实际是 **60×32 的胶囊**，
而肉眼认定的「那个圆」是里面的 **23px 圆钮**（`.circle`）。圆心取的是**胶囊中心 x=76**，
圆钮中心则是 **63（浅色，贴左）/ 90（暗色，贴右）** —— 两者恒差 **13.5px**，
且**这一偏移会随明暗换边**：去暗色时圆心在圆钮右边 13px，回浅色时在圆钮左边 14px。
圆由半径 0 开始长，起手那几帧「小点」相对 23px 的圆钮偏出半个半径，观感就是「圆心不在这」。

→ **是否需要把圆心从「胶囊中心」改成「圆钮中心」，是产品决策，尚未改动**
（改法是 `wipeOrigin` 里把 `.switch-con` 换成 `.circle`，一行）。取舍：
胶囊中心是控件中心、两方向完全对称（现状，也是主流做法）；
圆钮中心最贴合「圆从你看得见的那个圆钮长出来」的直觉，但两个方向的圆心会左右差 27px。

**顺带复现的一个独立缺陷**（与圆心无关，此前在 800×600 记录过，本轮在 900×984 再次命中）：
**真实鼠标**点在开关中心，`document.elementFromPoint` 返回的是 `sidebar <aside>` ——
窄窗口下配置栏（`left: 0`）被侧边栏盖住，主题开关既看不见也点不到
（`dispatchEvent` 绕开命中测试，所以老探针发现不了）。根因与既有的
「`$MQ*` 变量未定义 → 窄屏规则被浏览器整条丢弃」同源。**未修。**

**新增脚本里当场修掉的一个 bug**（写工具时踩的，留档）：
扫描窗口的左边界下限写成了裸数字 `42`，而其余坐标都是 CSS 像素再乘 `s` ——
`dpr=2` 时该下限退到 21 CSS 像素，把左边的**白色配置齿轮图标**扫了进来，
于是「弦」量到的是齿轮不是圆。**混用 CSS 像素与设备像素的常量必须一起乘 `s`。**



### 10.11 标题锚点 `#` 的位置 + 返回按钮不生效（2026-09-16 同日）

**触发**：用户一次报两条 ——「在线文档 # 号在标题文字前」「文档上方返回按钮不生效」。

两条的**性质完全不同**：第 1 条在本地产物上**不存在**（是旧产物残留），第 2 条是**真缺陷**。

#### 10.11.1 第 1 条：`#` 在文字前 —— 本地产物无此现象，是旧构建的残留

先纠正一个容易搞错的前提：**屏幕上那个 `#` 不是文字**。产物里锚点元素的内容是
**U+200B 零宽空格**：

```html
<h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor"
    href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">&#8203;</a></h2>
```

`#` 由 VitePress 默认样式画出来：`.vp-doc .header-anchor::before{content:var(--vp-header-anchor-symbol)}`
（实测 `getComputedStyle(a,'::before').content === '"#"'`）。所以「`#` 在文字前」这件事，
只可能由**定位**决定，不可能由 DOM 顺序决定 —— 锚点在 DOM 里永远排在文字之后。

把 `#` 顶到文字**左侧**的，是本主题的历史规则 `theme.styl`：

```styl
a.header-anchor
  float left
  margin-left -0.87em   // ← float 到文字的左边负偏移里
```

它与 `doc-typography.styl` 的 `.vp-doc a.header-anchor` 的关系（产物 CSS 实测）：

| 规则 | 来源 | 特异性 | 后果 |
| --- | --- | --- | --- |
| `.vp-doc .header-anchor{position:absolute;top:0;left:0;margin-left:-.87em}` | VitePress 默认 | 0,2,0 | `#` 在文字左 |
| `a.header-anchor{float:left;margin-left:-.87em}` | `theme.styl`（历史） | 0,1,1 | `#` 在文字左 |
| `.vp-doc a.header-anchor,…{position:static;float:none;margin:0 0 0 8px}` | `doc-typography.styl`（§227886b 起） | **0,2,1** | `#` 在文字右 |

`0,2,1` 稳压另外两条，**且不依赖样式表先后顺序**（含元素选择器的那条永远赢），
所以现在的实现不可能被翻盘。

**多页实测**（新增 `.workbuddy/scripts/probe-back-button.mjs` 的 A 段，
按「标题文字 Range 的右边界 vs 锚点矩形左边界」逐条判决）：

| 页面 | 锚点数 | 在文字前 | 在文字后 | 非 `.vp-doc` |
| --- | --- | --- | --- | --- |
| components/button.html | 13 | 0 | 13 | 0 |
| components/table.html | 23 | 0 | 23 | 0 |
| components/select.html | 13 | 0 | 13 | 0 |
| components/form.html | 14 | 0 | 14 | 0 |
| guide/common-api.html | 7 | 0 | 7 | 0 |

另：全站扫 `site/**/*.html`，**525 个锚点全部落在 `.vp-doc` 容器内**（无一例外），
故上表的 `0,2,1` 覆盖 100% 的锚点。放大 4 倍的标题截图亦为 `基础用法 #`。

→ **结论：这条是旧产物造成的，源码无需改动。** 提交时序正好解释了这一对症状：

```
a807100  新增返回按钮（此时锚点仍是「# 在文字前」的旧样式）   ← 两者同时成立
227886b  文档站正文排版统一：锚点改为跟在文字之后             ← 第 1 条在此修掉
```

即「# 在文字前 + 返回按钮不生效」精确对应 `a807100`~`227886b` 之间的构建。

#### 10.11.2 第 2 条：返回按钮 —— VitePress 1.x 没有 vue-router

**现象**：按钮可见、可点、命中测试也命中它自己（`elementFromPoint` 返回按钮内的 `<i>`），
但点击后 URL、`history` 一概不动，控制台也**看不到报错**。

**三层取证**：

1. 拦 `history.pushState/replaceState/go`（用 `Page.addScriptToEvaluateOnNewDocument`
   在页面脚本之前注入，避免漏掉初始化那一次）→ 三种触发方式（真实鼠标 / 程序化 `click()` /
   直接调 invoker）**一次调用都没有**。
2. 对照实验：真实点击侧边栏的跨页链接 → `pushState('/fei-ui-design/')` 正常出现。
   → SPA 导航本身是好的，问题只在这个按钮。
3. 把 Vue 挂的 invoker 抠出来直接调用：

   ```
   function x(){!!(window.history.state&&window.history.state.back)?t.go(-1):t.push(i.value.base||"/")}
   → TypeError: t.push is not a function
   ```

**根因**：`t` 是 `useRouter()` 的返回值，而 **VitePress 1.x（本仓 1.0.0-rc.35）用的是它自己的
router，不是 vue-router**：

```js
// node_modules/vitepress/dist/client/app/router.js
export function createRouter(loadPageModule, fallbackComponent) {
  const router = { route, go }        // ← 只有 route 和 go
  async function go(href = …) {       // ← go 收的是「目标 href」，不是前进/后退步数
    href = normalizeHref(href)
    …
  }
}
```

| 旧代码的假设 | VitePress 1.x 的现实 | 后果 |
| --- | --- | --- |
| `router.push(href)` | 没有 `push` | `TypeError: t.push is not a function` |
| `router.go(-1)` = 后退一步 | `go(href)`；`-1` 会被当 href 归一化 | `TypeError`（另一条分支同样抛） |
| `history.state.back` 判站内历史 | `updateHistory` 只写 `{scrollPosition}` / `null`，**从不写 `back`** | 恒 `undefined`，判断永远走 else |

也就是说 `goBack()` **两条分支都会抛**，只是 `history.state` 恒为 `null` 时先撞上第一条。
「看不到报错」是 Vue 在事件回调里把异常交给 `console.error`，而我们最初只监听了
`Runtime.exceptionThrown`（不是 `Runtime.consoleAPICalled`）—— 补上监听才看得见。

**修法**（`Page.vue`）：

```js
if (window.history.length > 1) {
  window.history.back()                 // 有可退历史 → 浏览器原生回退
} else {
  router.go(site.value.base || '/')     // 无历史（新标签直接打开）→ 回文档首页
}
```

浏览器原生回退与 VitePress 是兼容的：VitePress 监听了 `popstate` 并据此 `loadPage`，
站内回退仍是一次 SPA 切换。兜底那条用上了 VitePress 真正存在的 API
（`router.go(href)`，且 href 必须**带 base** —— `normalizeHref` 用 `new URL(href,'http://a.com')`
解析，不会替你补 base）。

**取舍**（留给后续决策）：`history.length > 1` 无法区分「上一条是站内页」还是「从搜索引擎来」，
所以从外部链接进入时点返回会离开站点。这正是 §8.11.4 原本想避免的情形，
但要精确表达「仅站内回退」就必须自己维护一个站内导航栈（挂 `router.onAfterRouteChanged`），
本轮没做。**「返回上一页」按字面语义就是浏览器回退**，故取现状。

#### 10.11.3 本轮校验

| 项 | 结果 |
| --- | --- |
| `probe-back-button.mjs` | ✅ 12/12 |
| ├ S1 站内 `button.html → icon.html` 后点返回 | ✅ 退回 `button.html`，无异常 |
| ├ S2 新标签直接打开（`history.length === 1`）后点返回 | ✅ 兜底跳到 `/fei-ui-design/` |
| └ A 段 5 页 70 个锚点 | ✅ 0 个在文字前 |
| `build:site` | ✅ exit=0，222.8s |
| 8 项文档护栏 | ✅ 全过 |
| `vitest run` | ✅ 4 文件 / 16 用例 |
| `eslint`（全仓） | ✅ exit=0 |

**S2 必须用 `Target.createTarget` 新建标签**：CDP 复用 `about:blank` 那个标签时
`history.length` 恒 ≥ 2，兜底分支**一次都走不到**，会得到假绿。

#### 10.11.4 顺带实测：导航栏搜索框同样是坏的（**未修**）

排查过程中顺手验了一下导航栏搜索框（`SearchBox.vue` 在每页都渲染，
`theme.search !== false && frontmatter.search !== false`）。在输入框里输入字符后：

```
[error] TypeError: Cannot read properties of undefined (reading 'length')
        at ic.fn (assets/chunks/theme.C0DF_t1u.js)
```

下拉建议 DOM 为 `null` —— **搜索框输不出任何建议**。同一族的两个成因：

- `SearchBox.vue:86` `const {pages} = site.value` → VitePress 1.x 的 `SiteData` **没有 `pages`**
  （那是 VuePress 0.x 的字段），`pages.length` 直接抛错；
- `SearchBox.vue:213` `router.push(...)` 里的 `router` **从未声明也从未导入**
  （该文件只 import 了 `useData`），即使前面不抛也会是 `ReferenceError`。

同族的还有 `$router.push(...)`：`HeaderNotification.vue:42`、
`HomeIllustration1.vue:13`、`HomeIllustration2.vue:8`（`$router` 在 VitePress 下不存在）。
这几个组件属于 §8.10.5 统计的「主题内未被引用的组件」范畴，部分已无人引用。

→ **未修**。修搜索不是改一行的事：要么按 VitePress 1.x 的本地搜索索引重写
（`site.themeConfig.search.provider: 'local'`），要么把这一整套 VuePress 0.x 的搜索组件下线。
属于独立决策，建议单开一轮。

#### 10.11.5 方法论（本轮踩到的）

- **「读内部结构」的断言必须先用已知可用的对照组校准。** 前两轮我用
  `el[Symbol(_vei)].click !== undefined` 判「监听器没挂上」，得出「handler 没绑定」的结论 ——
  **是错的**：Vue 把 invoker 存在**原始 prop 名**下，即 `_vei.onClick`（`click` 当然为空）。
  只差一步校准：同页面点一个已知能用的元素（侧边栏链接）做对照，就会立刻发现自己的判据是坏的。
- **`Runtime.exceptionThrown` 收不到 Vue 事件回调里被 `console.error` 掉的异常**，
  必须同时监听 `Runtime.consoleAPICalled` 并筛 `type === 'error'`。
- **报「这里不对」时先确认对面跑的是哪份产物**：本轮两条反馈里，一条是旧构建残留
  （§10.11.1），一条是真缺陷（§10.11.2）。判断依据是**提交时序 + 产物哈希**，不是感觉 ——
  上一轮 §10.10 已因「缓存旧产物」误判过一次，这次直接先比对时序，省掉一整轮往返。




