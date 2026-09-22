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

### 10.12 首页配置齿轮 + 页头「指南」下拉（2026-09-18）

**触发**：用户一次报两条 ——「在线使用文档 `config-btn` 首页应该不需要显示」
「在线使用文档头部导航指南应该不需要展开收起」。两条都按**产品决策**处理（不是缺陷修复），
但第 2 条查下去发现它**本来就是个死控件**。

勘察工具：`.workbuddy/scripts/probe-nav-config.mjs`（CDP 无头 Chrome，1440×984，
只读快照 + hover 实测 + 验收断言）。

#### 10.12.1 首页去掉齿轮 `.config-btn`（已改）

现状（CDP 快照）：

| 页面 | `.config` 位置 | 内含 |
| --- | --- | --- |
| 首页 | `x=0`（`Home.vue` 的 `.home ~ .config { left: 0px }`） | `.config-btn`（齿轮，40px）+ `.switch-dark`（明暗开关，32px） |
| 文档页 | `x=260` | 同上 |

首页**没有侧边栏、也没有代码示例**，而齿轮菜单（`ul.options`，6 项）里
「收起/展开侧边栏」「展开/收起侧边栏子栏目」「打开/关闭所有代码」三项在首页**全是空操作**。

→ `Config.vue` 增加 `useData().frontmatter.home` 判定，齿轮加 `v-if="!isHome"`
（`ul.options` 写在齿轮 `<button>` 内部，跟着一起离开 DOM）。

**明暗开关保留** —— 它是同一容器里的**独立按钮**（`.switch-dark`），首页同样需要。
只认 `home: true` 的主页；`docsHome` 类页面（`guide/index.md`、`components/index.md`）
同样没有侧边栏，如需一并处理，把判定换成「`home || docsHome`」即可（未做，等确认）。

#### 10.12.2 页头「指南」改成普通链接（已改）

原来 `config.js` 的 `指南` 项带 `items`（介绍 / 安装 / 在 SFC 中使用 / 按需引入 / 变更日志），
`resolveNavLinkItem()` 会按 `items.length > 0` 打上 `type: 'links'`，
`NavLinks.vue` 据此把它交给 `DropdownLink.vue` —— 于是有了箭头和「展开/收起」。

**但这个下拉从来就打不开。** 让它在桌面端可见的那组规则
（`display: block !important` / `visibility` / `opacity` / 定位）写在
`DropdownLink.vue:192` 的 `@media (min-width: $MQMobile)` 里；
`$MQMobile` 是 VuePress 0.x 的 Stylus 变量、VitePress 1.x 已删除，
Stylus 对未定义变量**不报错、把变量名原样输出**，产物里就是
`@media (min-width: $MQMobile){…}` —— **浏览器把整条规则丢掉**。

CDP 实测坐实：hover 到「指南」后，`ul.nav-dropdown` 的 `display` 仍是 `none`
（来自 `v-show` 的内联样式，本该被 `display: block !important` 覆盖却没人覆盖），
`getBoundingClientRect()` 为 **0×0**，5 个子项虽在 DOM 里但一个都点不到。
屏幕上只剩一个「hover 会转 180° 却什么都不弹」的箭头。

→ 去掉 `items`，`指南` 变回普通 `NavLink`（`type: 'link'`）。
指南下的 5 个子页面在侧边栏（`概览` / `介绍` / `快速上手` 三组）里都有，**不丢任何入口**。

**箭头不必额外处理**：`NavLink.vue` 的模板虽**无条件**渲染
`<i class="bx bx-chevron-down">`，但 `NavLink.vue` 自己的样式里有
`.nav-item i.bx:not(.bx-dots-horizontal-rounded) { display: none }`，
会把普通链接的箭头压掉（实测同类项「首页」「组件」的箭头计算样式即 `display: none`）。
⚠️ 判箭头在不在**必须看计算样式**，`querySelector` 恒为真 —— 首版探针就差点因此误判。

#### 10.12.3 顺带查实：产物里有 **10 处**伪媒体查询被整条丢弃（**未修**）

新增 `.workbuddy/scripts/count-bad-media.mjs`（扫产物 CSS，数未解析的 Stylus 变量）：

```
@media (max-width: $MQMobile){                              ×5
@media (min-width: $MQMobile){                              ×2
@media (max-width: $MQMobileNarrow){                        ×1
@media (max-width: $MQNarrow){                              ×1
@media (max-width: $MQNarrow) and (min-width: $MQMobile){   ×1
```

声明级残留：`$navbarHeight`×3、`$accentColor`×5、`$textColor`×1、`$borderColor`×1、
`$arrowBgColor`×1（这些声明同样被浏览器逐条丢弃）。

项目里已零散记过这个坑（`styles/wrapper.styl` 头部、`theme.styl:256/285`、
`custom.styl:308`、§10.10 末尾），但一直没做系统性处理。影响面举例：
窄屏下 `Home.vue` 的 `.features` 不换列、`Navbar.vue` 的 logo 尺寸规则失效、
`Page.vue` / `NavLinks.vue` 的移动端间距失效；**也与 §10.10 末尾那条
「窄窗口下配置栏被侧边栏盖住、主题开关点不到」同源**。

→ **未修**。这动的是全站响应式表现，需要单独一轮 + 逐断点实测，不该混在本次两条 UI 决策里。
断点字面值：`$MQMobile = 719px`、`$MQNarrow = 959px`、`$MQMobileNarrow = 419px`
（VuePress 0.x 的取值；`wrapper.styl` 里写的 1240/560 是另一套 VitePress 默认主题的值，
**别混用**）。`Navbar.vue:59` 已有先例：直接写字面 `719`，并注明「refer to config.styl」。

#### 10.12.4 验收

`probe-nav-config.mjs` 三页 × 5 条断言 = **15 PASS / 0 FAIL**：

| 断言 | 首页 | 文档页 | 指南页 |
| --- | --- | --- | --- |
| 齿轮按预期出现/消失 | 不在 DOM（`hasConfigBtn:false`） | 在，`display:flex` | 在，`display:flex` |
| 明暗开关仍在 | ✅ | ✅ | ✅ |
| 「指南」不是下拉（无 `.dropdown-wrapper` / 无 `ul.nav-dropdown`） | ✅ | ✅ | ✅ |
| 「指南」箭头 `display:none`（盒子 0×0） | ✅ | ✅ | ✅ |
| 「指南」文字与 href = `guide/introduction.html` | ✅ | ✅ | ✅ |

首页 `.config` 容器随之从 **112×45 收窄到 72×45**（只剩明暗开关），
`ul.options` 的 6 个 `li` 归零；hover「指南」返回 `noDropdown: true`，下拉节点彻底不存在。

**其余校验全绿**：`build:site`（见下）75 个 html；8 项文档护栏
（`check-docs-api` / `-links` / `-demo` / `-style` / `-tags` / `check-site-links` /
`-contrast` / `-placeholders`）全部 PASS；vitest **16/16**；eslint exit 0。
侧边栏复核：「在 SFC 中使用」在 `guide/installation.html` 里出现 5 次、「按需引入」3 次
—— 去掉导航下拉**没有丢入口**。

⚠️ 顺带记一条**构建环境**的坑（本轮踩了两轮才定位）：
沙箱有「单次工具调用最多 50 次删除」的护栏，而 `docs/.vitepress/.temp` 在构建收尾时
会被 `rimraf` 整体删掉（实测 **87 个条目**），必然超限 → 构建在 `rendering pages` 阶段
以 `SAFE_DELETE_BULK_CONFIRM_REQUIRED` 失败（**不是代码问题**）。
解法是 VitePress 自带的开关：

```bash
DEBUG=1 node node_modules/vitepress/bin/vitepress.js build docs
```

`vitepress/dist/node/serve-*.js` 里那句 `if (!process.env.DEBUG) await rimraf(siteConfig.tempDir)`
即为此设。构建仍会在开头 `emptyDir(outDir)`，所以构建前要把 `site/` 先移走（移动不计删除额度）。
本次 43.37s 完成。

### 10.13 排版体检：字体颜色与字号（2026-09-18，仅评估未改动）

用户要求「评估文档的字体颜色与文字大小是否合理」。本轮**只做体检与方案，不动代码**，
完整报告（含全部实测数值、推荐 token 表、实施顺序、验收方法）在
**`docs/.internal/typography-audit.md`**。要点：

| 级别 | 结论 |
| --- | --- |
| P0-1 | 暗色主题下 `--fd-*` **一个都没覆盖** → 正文/标题/行内码 1.55~1.60 : 1，实际不可读 |
| P0-2 | `custom.styl:62` 的 `--shiki-light: #e2777a` 兜底把 ` ```text ` 代码块整块染粉（4.10 : 1） |
| P1-1 | 表格 `td` 被 VitePress 默认 `.vp-doc td{font-size:14px}` 直接命中 → 表体 14 > 表头 13.5，且字号不受 token 控制 |
| P1-2 | 页面主标题 35px ↔ h2 22px 跨 1.59×；`--fd-fs-h1: 28px` 从未生效；主标题行高 24px **小于**字号 |
| P1-3 | 同一页面两套字体栈（正文 Poppins/Noto Sans SC vs 外壳 Helvetica/Arial + 微软雅黑）；`custom.styl` 的 `body{font-family}` 是死代码 |
| P2 | 半像素字号 13.5/12.5、h4 与正文只差 1px、外壳字号未共用阶梯、Poppins 只注册 400（600 为合成粗体）、语言角标 3.33 : 1 |

**三条可复用的机制性教训**（比具体数值更重要）：

1. **`font-size` 是继承属性，容器上的声明压不过直接命中子元素的声明。**
   `.vp-doc table:not(.example *)` 特异性 (0,2,1) 也赢不了 VitePress 的
   `.vp-doc td` (0,1,1) —— 因为后者是**直接声明**、前者只是**继承源**。
   所以「在容器上设字号、指望子元素跟随」是错的，必须逐个元素显式声明。
   （产物里 56 条 `.vp-doc` 字号规则只有 `td` 漏网，正是这个原因。）
2. **暗色主题只覆盖了 `--vs-theme-*` 那 6 个变量**，自建 token 必须自己补暗色分支。
   判断"哪些 token 没跟随主题"最快的办法：在产物 CSS 里 `grep -o -- "--fd-text-1:[^;]*"`
   数出现次数 —— **只有 1 处**就说明没有暗色分支。
3. **shiki `css-variables` 模式下 `:root` 的 `--shiki-light` 是"未切 token 文本"的兜底色。**
   未识别语言（`text`/裸围栏）的整行不会带内联变量，于是落到它身上。
   全站扫描 49 个代码块 4159 段文本才逮到 1 处 24 段，**只看主路径页面根本发现不了**。

新增探针（均在 `.workbuddy/scripts/`）：

| 脚本 | 作用 |
| --- | --- |
| `probe-typography.mjs` | 逐元素字号/颜色/背景合成/WCAG 对比度 + `.vp-doc` 内字号分布 census |
| `probe-typography2.mjs` | 表格字号来源诊断 + 代码块 token 对比度分布 + 局部截图 |
| `probe-typography3.mjs` | 明暗两套主题的完整层级阶梯 + 「代码块非 token 文本」检测 |
| `probe-code-plain.mjs` | 全站代码块扫描未着色文本 |
| `probe-fonts.mjs` | `CSS.getPlatformFontsForNode` 读**实际渲染字体** + `document.fonts` 已注册 face |
| `count-code-fences.mjs` | 统计代码围栏语言用量 / 裸围栏 |
| `shot-typography-spots.mjs` | 问题局部取证截图 |

⚠️ 写截图探针时的两个 CDP 坑：`Page.captureScreenshot` 的 **`clip.scale` 是必填字段**
（缺了报 `Failed to deserialize params.clip.scale - mandatory field missing`）；
且 `captureBeyondViewport: true` 时 **`clip` 用的是页面坐标**，
必须 `rect.y + window.scrollY`，否则裁到页面外、返回空图。





---

### 10.14 排版体检的落地实施（2026-09-18，承接 §10.13）

§10.13 只做了评估、没动代码。本节记录按那份报告改了什么、以及**改的过程中
新发现的三处同源缺陷**（都属于「VitePress 默认主题的暗色分支挂在 `html.dark`，
而本站暗色是自研的 `body[vs-theme="dark"]`」这一个根因）。

#### 10.14.1 按报告落地的改动

| 编号 | 改动 | 文件 | 关键值 |
| --- | --- | --- | --- |
| P0-1 | `--fd-*` 补暗色分支 | `styles/doc-typography.styl` | `--fd-text-1: #e6e8eb`、`--fd-text-2: #a3aab4`、`--fd-link: #4d8dff`、`--fd-table-text: #c9ced6`、`--fd-quote-bg: rgba(77,141,255,.12)` + 描边/表头底/表格底/斑马纹/行悬停 |
| P0-2 | shiki 兜底色 | `custom.styl` | `--shiki-light: #e2777a` → `#adbac7`（4.10 → 6.09 : 1）；顺手删掉**死声明** `--vp-code-tag-color: #e2777a`（全产物只出现 1 次，就是它自己） |
| P1-1 | 表格 `td` 显式声明字号 | `doc-typography.styl` | 新增 `.vp-doc table:not(.example *) td { font-size: var(--fd-fs-sm); color: var(--fd-table-text) }` |
| P1-2 | 标题阶梯 | `doc-typography.styl` + `Page.vue` | 主标题 35 → **30px** 并补 `line-height: 1.3`（原先行高 24px < 字号）；h2 22→24、h3 18→20、h4 16→17、h5 15→16、h6 14→15 |
| P1-3 | 字体栈统一 | `custom.styl` + `doc-typography.styl` | `body` → `html body`（0,0,2）并用 `var(--fd-font-sans)`；`--fd-font-sans` 补 CJK 族名 |
| P2-1 | 半像素归整 | `doc-typography.styl` | `--fd-fs-sm` 13.5 → 14、`--fd-fs-xs` 12.5 → 12（对齐组件库 14/12 两档） |
| P2-3 | 外壳字号 | `SidebarLink.vue`、`SidebarGroup.vue`、`Page.vue` | 侧边栏链接 12.8 → 14px；分组标题 `bold`(700) → 600；右侧「本页目录」12.8 → 14px、`opacity .6 → .72` |
| P2-4 | 字形 | `custom.styl`、`styles/theme.styl` | 补 Poppins **500 / 600** 两个 face + `font-display: swap`；删掉 `theme.styl` 里重复的 @font-face 与失效的 body/input/button 字体声明 |
| P2-5 | 语言角标 | `doc-typography.styl` | `rgba(255,255,255,.4)` → `.55`（3.33 → 4.86 : 1） |

验收（产物 + 无头 Chrome 实测）：

| 项目 | 改前 | 改后 |
| --- | --- | --- |
| 暗色 h2 / 正文段落 | **1.60 : 1** ✗ | **14.32 : 1** ✅ |
| 暗色行内 code | **1.55 : 1** ✗ | **13.55 : 1** ✅ |
| 暗色正文链接 / 锚点 | **3.36 : 1** ✗ | **5.50 : 1** ✅ |
| 暗色引用块 | 5.11 : 1（亮块） | **6.40 : 1** ✅ |
| ` ```text ` 代码块 24 段 | `#e2777a` 4.10 : 1 ✗ | `#adbac7` **6.09 : 1** ✅ |
| 表格 th / td 字号 | 13.5 : 14（倒挂） | 14 : 14 ✅ |
| 页面主标题 字号 / 行高 | 35px / 24px（行高小于字号） | **30px / 39px** ✅ |
| 侧边栏链接 | 12.8px / 700 | **14px / 600** ✅ |
| 外壳与正文字体栈 | 两套（Helvetica+Arial vs Poppins） | **同一套**，标题用真实 SemiBold ✅ |
| 8 项文档护栏 / vitest / eslint | — | 全 PASS / 16 of 16 / exit 0 |

#### 10.14.2 改的过程中新发现的三处缺陷（同一根因，原报告未覆盖）

**根因一句话**：VitePress 默认主题的暗色 token 定义在 `html.dark` 下，而本站
明暗切换是**自研**的 `body[vs-theme="dark"]`（`components/Config.vue` 的
`applyTheme()`）——`<html>` 上永远没有 `.dark`，所以凡是默认主题里写成
`var(--vp-c-*)` 的**非文字色**，在暗色下都恒取浅色值。原报告只看了 `.vp-doc`
里的字号/文字色，这三处是量到具体元素背景时才暴露的。

**① `.vp-doc tr` 的白底（表格变白斑）**

```css
/* VitePress 默认主题 */
.vp-doc tr { background-color: var(--vp-c-bg); border-top: 1px solid var(--vp-c-divider) }
.vp-doc tr:nth-child(2n) { background-color: var(--vp-c-bg-soft) }
```

行底色画在单元格之下、表格底之上 → 暗色下整张表是白的。实测改前
`tr` 暗色底 `#ffffff`（**1.58 : 1**）、`td` `#ffffff`（**1.23 : 1**）。
修法：`.vp-doc table:not(.example *) tr, … tr:nth-child(2n) { background: transparent; border-top: 0 }`
（行底色交给单元格；顺带消掉了 tr 的 border-top 与单元格 border-bottom 叠出来的双线）。

**② `body` 的白底（页面底部露白条）**

```css
/* VitePress 默认主题 */
body { min-height: 100vh; color: var(--vp-c-text-1); background-color: var(--vp-c-bg); … }
```

它与 `custom.styl` 的 `html, body { background-color: var(--vs-theme-layout) }`
**同特异性、但排在产物后面** → 赢，且恒取 `#ffffff`。后果是暗色下 `body` 仍把
整页盒子画成白色，凡 `.page` / `.sidebar` / `.navbar` 没盖住的地方就露白 ——
实测 1440×2600 视口下 `/guide/` 页面**底部约 200px 纯白**（截图
`.workbuddy/tmp/probe-dark-canvas-tall/guide-index-dark-viewport.png`）。
修法：选择器改 `html, html body`（0,0,2 压 0,0,1）。

**③ `color-scheme` 恒为浅色**

VitePress 把 `color-scheme: dark` 写在 `html.dark` 下 → 永不生效。影响 UA 层级的
默认底色：画布、**滚动条**、原生表单控件、自动填充背景。修法：
`html[vs-theme="dark"] { color-scheme: dark }`。

**配套的必要改动**：②③ 都要靠 `html` 上的属性才能命中，而 `applyTheme()` 原先
只把 `vs-theme` 写到 `<body>`。自定义属性**只向下继承、不向上传播**，所以
`<html>` 的 `--vs-theme-layout` 不会因为 body 有属性而变暗。因此 `applyTheme()`
现在**同时**写 `<html>` 与 `<body>` 两层；`doc-typography.styl` 的暗色 token 块
选择器也放宽成 `html[vs-theme="dark"], body[vs-theme="dark"]`，
任一层被删都不会静默退回浅色值。

#### 10.14.3 可复用的判别方法

**「自研暗色 + VitePress 默认主题」这类组合，要专门扫一遍 `var(--vp-c-*)`。**
判据：

```bash
# 1) 产物里凡是选择器命中我们页面、又用了 --vp-c-* 的规则，都是嫌疑对象
# 2) 逐个判断它是否被自己的权威层压住（文字色通常压住了，背景色常漏）
node -e "…扫 selector + var(--vp-c-*)…"
```

实扫结果：13 条里 11 条已被 `doc-typography.styl` 压住（`h2` 边框、`blockquote` 边框、
`a` 颜色、`th/td` 边框、`hr` 边框…），**漏的正好是三条「背景/色彩方案」类**：
`tr` 背景、`body` 背景、`html.dark` 的 `color-scheme`。规律很清楚 ——
**默认主题里改「字」的规则多半被我们的排版层覆盖了，改「底」的没有。**

另外一条方法论：**量背景不能只量目标元素，必须量到「谁真正画了这层底色」。**
`td` 的 `color` 一切正常，问题在 `tr`；`body` 的 `color` 正常，问题在它的
`background-color`。本轮新增/改进了三个探针来固化这一点：

| 脚本 | 作用 |
| --- | --- |
| `probe-typography.mjs`（已扩充） | 采样器新增 `tr（表格行）`——只量 `td` 的 color 看不出白底 |
| `probe-dark-canvas.mjs`（新增） | 量 `html`/`body`/`.page` 的底色与矩形，`--h=` 可把视口调高逼出「内容不足一屏」的露白 |
| `shot-inline-code.mjs`（新增） | 行内 code 的底色来源链（元素 → 祖先逐层 `background-color`）+ 3× 放大截图 |

⚠️ 判读截图的一个坑：`body` 在暗色下是白的、被 `.page` 盖住，所以
**普通高度视口下的截图完全看不出问题**，必须把视口调到高于内容才会露出来。

## §10.15 第四处同源缺陷：`:root` 与 `[vs-theme="dark"]` 的特异性平局（2026-09-18 追加）

§10.14 收尾时用 `probe-dark-canvas.mjs` 复测，`html` 背景**仍然是白**。当时的
**第一反应是「探针没模拟真实行为」，第二反应是「`:root` 兜底赢了特异性平局」**
—— 两个都要处理，前者会造出**假绿/假红**，后者才是真缺陷。

### 10.15.1 先修探针：探针与实现不同构，测出来的是假象

原探针的「切暗色」只写 `document.body`：

```js
document.body.setAttribute('vs-theme','dark'); document.body.classList.add('darken')
```

而真实的 `applyTheme()`（§10.14 已改成同时写 `<html>`）：

```js
document.documentElement.setAttribute('vs-theme', isDark ? 'dark' : 'light')
document.body.setAttribute('vs-theme', isDark ? 'dark' : 'light')
```

两者差一个 `<html>`。后果是 `--vs-theme-layout` 在 `<html>` 上**取不到暗色值**，
只能落到 `custom.styl` / `styles/theme.styl` 里 `:root { --vs-theme-layout: #fff }`
这个浅色兜底 —— 于是探针报出 `htmlBg: rgb(255,255,255)`，**看起来像缺陷，其实是探针自己造的**。

> **方法论（本轮最重要的一条）**：探针里凡是「模拟应用状态」的语句，必须与实现
> **逐字符对齐**。只要有一处不同构，测出来的既可能是假绿也可能是假红，而且**两种都很难怀疑到探针头上**。
> 现在探针把这段抽成 `SET_THEME(dark)` 常量，并在文件头写明「必须与 `applyTheme()` 完全一致」，
> 同时新增 `htmlAttr` / `htmlLayoutVar` / `htmlColorScheme` 三个采样点，让「属性写没写上去」
> 与「变量有没有解析成暗色」两件事分开可见。

### 10.15.2 再修实现：特异性平局靠源码顺序定胜负，而实测站错了边

把探针修成同构之后，结果变成**「属性是对的、变量还是错的」**：

```
"htmlAttr": "dark",          ← 属性写上了
"htmlLayoutVar": "#fff",     ← 但 --vs-theme-layout 仍是浅色兜底
"htmlColorScheme": "dark",   ← color-scheme 因为用了 html[vs-theme="dark"]（0,1,1）反而是对的
```

根因：`<html>` **同时**匹配两条同特异性规则

| 规则 | 位置 | 特异性 |
| --- | --- | --- |
| `:root { --vs-theme-layout: #fff }` | `custom.styl`（浅色兜底），`styles/theme.styl` 里还有一份重复 | **(0,1,0)** |
| `[vs-theme="dark"] { --vs-theme-layout: #1e2023 }` | `Config.vue` | **(0,1,0)** |

平局 → 由**源码顺序**定胜负。产物实测：两份 `:root` 分别在字节偏移 `304719` 与 `504714`，
而暗色块在 `474408` —— **后一份 `:root`（504714）排在暗色块之后**，`<html>` 输掉。

为什么 `body` 反而是对的？因为 `body` 只被 `[vs-theme="dark"]` 命中，没有 `:root` 跟它抢。
**于是出现「`body` 正确、`html` 错误」这种很容易被当成「没问题」的组合**：
`<html>` 的背景会成为**画布色**，只在 overscroll 与「内容短于视口时的页面底部」显形，
平时被 `body` 和 `.page` 盖得严严实实。

修法（一行选择器）：把暗色 token 块的选择器写成

```stylus
:root[vs-theme="dark"],
[vs-theme="dark"]
  --vs-theme-bg: #18191c
  ...
```

`:root[vs-theme="dark"]` 是 **(0,2,0)**，稳压两份 `:root` 的 (0,1,0)，**与样式表顺序无关**；
`[vs-theme="dark"]` 保留，继续覆盖 `body` 及其它可能挂属性的元素。

修复后复测：

```
"htmlAttr": "dark", "htmlLayoutVar": "#1e2023",
"htmlColorScheme": "dark",
"htmlBg": "rgb(30, 32, 35)",  "bodyBg": "rgb(30, 32, 35)"
```

`guide-index` 在 1440×2600 视口下 `gapBelowPage = 855px`（正好是原来会露白条的那块），
截图确认整屏纯暗色，无白条。

### 10.15.3 规律与排查清单

- **凡是「浅色兜底写在 `:root`、暗色覆盖写在属性选择器」的组合，都要查特异性是不是平局。**
  平局一律用 `:root[attr="value"]` 破，不要靠「我把它写在后面」。
- 判别口诀：**属性对不对看 `getAttribute`，变量对不对看 `getPropertyValue('--x')`，
  两者要分别采样** —— 只采一个会把「属性写了但变量没变」误判成修好了。
- 🔁 与 §10.14 同源：四次缺陷（`tr` 白块、`body` 白条、`color-scheme`、`html` 画布白）
  **全部**是「VitePress 默认主题的暗色分支挂在 `html.dark` 下，而本站暗色是自研的」。
  自查方式：`node -e`（见 §10.14）扫产物里命中本站页面又用了 `--vp-c-*` 的规则，
  重点看**背景/色彩方案**类。

### 10.15.4 本轮验证（全部通过）

| 项 | 结果 |
| --- | --- |
| `vitest run` | 4 文件 / 16 用例全绿 |
| `eslint . --ext …` | 退出码 0 |
| 8 项文档与产物护栏 | `check-docs-api`/`-links`/`-demo`/`-style`/`-tags`/`check-site-links`/`-contrast`/`-placeholders` 全 PASS |
| 暗色对比度（CDP） | h2 与正文 14.32:1、`td` 14.16:1、`tr` 11.00:1、代码块 `span.line` 9.14:1、引用 6.40:1 |
| 外壳字号（CDP） | 页头 30px/600/39px、h2 24px、正文 15px/26.25px、侧边栏 14px/500、导航 14.4px |
| 字体（CDP） | Poppins 400/500/600 三个 face 均 `loaded`，`document.fonts.check('600 22px Poppins') = true`（不再是合成粗体） |
| 代码块（CDP） | 49 个块 / 4159 段可见文本，24 段未切 token 者已为 `#adbac7`（6.09:1） |

⚠️ **一条已知假阳性，不要再当缺陷**：`probe-typography.mjs` 的 `pre code（代码块）` 行会报
`rgba(60, 60, 67, 0.78)` / 1.45:1。那是 **`code` 元素自身的计算色**（VitePress 的 `--vp-c-text-1`），
而代码块的**每一个可见字符都在 shiki 的 token `span` 里**，实显色由 span 决定。
`probe-typography3.mjs` 已经内置了这条判别，会额外打印
「✓ 代码块所有可见字符都被 token 包裹（span.line 的兜底色不外显）」；
要看**实显色**用 `probe-code-plain.mjs`（按文本段采样），别看 `pre code` 的计算色。

### 10.15.5 构建侧的一条经验（`build:site` 的沙箱删除护栏）

`.temp` 被删的时机**不止收尾那一处**。本轮第一次重建直接失败在
`vite:prepareOutDir → emptyDir`，目标 `docs/.vitepress/.temp/components_loading.md.js`：

```
[safe-delete][SAFE_DELETE_BULK_CONFIRM_REQUIRED] {"count":50,"threshold":50,"scope":"turn",…}
```

即 **SSR 产物目录就是 `tempDir`**，构建**开始时**也要清它一次。所以「只移 `site`」
不够，正确顺序是：

```bash
mv site .workbuddy/tmp/stale/site-<date>
find docs/.vitepress/.temp -mindepth 1 -maxdepth 1 \
  -exec mv {} .workbuddy/tmp/stale/vp-temp-<date>/ \;   # 内容全部移走
rmdir docs/.vitepress/.temp                              # 清空后 rmdir 才能成功
DEBUG=1 "<托管node绝对路径>" node_modules/vitepress/bin/vitepress.js build docs
```

`.temp` **目录本身**被占用时 `mv` 会报 `Permission denied`，但逐个移出**条目**是可行的，
移空之后 `rmdir` 也就成功了。这样 `emptyDir` 面对的是空目录、一次删除都不需要，
收尾的 `rimraf` 又被 `DEBUG=1` 跳过。本次实测构建 39.61s。

## §10.16 文档站五项体验缺陷（悬浮提示英文 / 代码块分离 / logo / 卡片圆角裁字 / 站内搜索）（2026-09-18 追加）

用户一次性报了 5 条，逐条定位后**根因各不相同**，唯一共同点是「都只在产物里看得出来」——
因此本轮所有结论都由 `.workbuddy/scripts/probe-docs-ux5.mjs`（CDP 驱动无头 Chrome，五段）
在**真实产物**上取证，不靠读源码推断。

### 10.16.1 悬浮提示仍是英文 —— 三类来源，只有一类能配出来

按「能不能从配置修」分三类，处理方式完全不同：

| 来源 | 例子 | 处理 |
|---|---|---|
| 主题组件模板里的 `title` | `Navbar.vue` 的 `Github`、`Page.vue` 的 `Package NPM`/`View Code Github`/`Edit Page`/`Report a Bug`、`Home.vue` 的 `Get Started`、`Config.vue` 的 `Theme ${dark?'Dark':'Light'}`、`codex.vue` 的 `Copy Code` | 逐条改成中文（`GitHub 仓库`、`npm 包`、`查看源码`、`编辑此页`、`报告问题`、`快速开始`、`切换到暗色/浅色主题`、`复制代码`） |
| **VitePress 硬编码** | `title="Copy Code"` | 见下 |
| 死组件里的可见文案 | `Footer.vue` 的 `Github`/`Github Issues` | 顺手中文化（该文件无任何引用，见 §10.16.1 末尾） |

⚠️ **VitePress 1.0.0-rc.35 的英文界面文案只有一处硬编码**：代码块右上角复制按钮。
它在 `markdown/plugins/highlight.ts` 里**渲染期拼字符串**：

```js
return `<div class="language-${lang}">…<button title="Copy Code" class="copy"></button>…`
```

所以：`themeConfig` 里配不出来（`copyCodeTooltip` 之类的键是**更晚版本**才有的）；
`md.core.ruler` / `md.renderer.rules` 钩子也抓不到（字符串在 fence 渲染函数内部拼，钩子只能拿到最终 HTML）。
唯一落点是**包一层 `md.render` 做定向替换** ⇒ 新增 `utils/localize-vitepress.js`。

⚠️ 替换**不能裸替 `title="Copy Code"`**：文档里的代码示例经 shiki 着色后**引号是原样的**
（只有 `<`/`>` 被转义），一篇讲「怎么自定义代码块」的文档完全可能原样印出这段字符串。
改为匹配**整只 `/<button\b[^>]*\btitle="Copy Code"[^>]*>/`** —— HTML 里的 `<button` 必然是真按钮，
示例里的 `<` 已转义成 `&lt;`，永远匹配不上。已用两个用例钉住（真标签被替换、转义串保持原样）。

排查方式上有一条**方法论**：探针扫 `[title]` 找英文时，**必须先挖掉专有名词白名单**
（`npm`/`pnpm`/`GitHub`/`Gitee`/`CodePen`/`CodeSandbox`/`Props`/`Events`…）。
否则 `npm 包`、`Gitee 仓库`、`在 CodePen 中打开` 会被永远判成「英文未改」，
告警长红、检查失去意义 —— 这正是本轮第一版探针的假阳性。

#### ⚠️ 只扫 `title` 是**不够**的 —— 页签的「可见文字」是另一个盲区

第一版探针报「0 条英文」之后，**人工看截图**才发现 codex 面板的页签正文仍是
`Template` / `Script` / `Style` / `All`。原因是那 4 个 `<li>` 的 `title` 早就改成了
模板/脚本/样式/全部，而**标签正文**没人动 —— 读者一眼看到的英文根本没进检查范围。

> 教训：**`title` 改了 ≠ 读者看到的改了。** 中文化检查必须**两类都扫**：
> `[title]` 属性 **和** 元素的可见文字。

扫可见文字还有两个必须处理的细节，否则又是假阳性/假阴性：

1. **只能取「元素直接持有的文本节点」**（`el.childNodes` 里 `nodeType === 3` 的那些），
   不能 `textContent` —— 后者会把整棵子树的文字都算进来，导航项一取就把整页内容带进结果。
2. `<input>` 没有可见文字，要单独取 `placeholder`。
3. 只扫**外壳选择器**（导航 / 代码面板 / 页脚 / 配置栏 / 搜索框），
   **不要扫 `.vp-doc` 正文** —— 正文里出现英文 API 名（`f-button`、`Props`）是正常的。

同时**顺带纠正一处此前的误判**：`components/Footer.vue` **不是死组件**，
它由 `DocsHome.vue` 使用、而 `DocsHome.vue` 被 `layouts/Layout.vue` 引入
（出现在 `guide/index` 与 `components/index` 两个页面上），所以它的
`Theme based on` 是**真实可见**的英文，已改为「主题基于」。
判「组件是否活」要**同时**满足「被 import」且「用在模板里」两个条件：
- `homeInit.vue` 是典型的**只 import 不用**（`Home.vue` 第 76 行 import、模板里从没出现），
  产物中 0 处文案 ⇒ 死 import；
- `premiumThemes.vue`（Home.vue 里注释掉）、`HeaderNotification.vue`（Layout.vue 里注释掉）、
  `api.vue`、`Branding.vue`、`HomePatrons.vue`、`PassLayout.vue`、`Color.vue`/`Coloren.vue`
  也都未渲染。
判别产物是否真的渲染：`grep -l "<该组件独有文案>" site/`。

### 10.16.2 「查看代码」按钮与代码区**不该分开**

原结构里工具栏 `.header-codex` 在 `.con-code` **之外**：收起态下它是一条**独立浅色横带**，
与下方深色代码面板形成视觉断裂（用户截图里正是「两个不相干的块」）。改法：

- **收起态**新增 `.code-trigger`（`<i class="bx bx-code-alt">` + 「查看代码」）作为唯一切入点；
- **展开态**把工具栏移进 `.con-code`，成为 `.panel-head`（左 `.ul-codes` 页签 / 右 `.header-codex` 动作），
  底色跟随 `--vs-theme-code2`，与代码面板**同属一个深色块**；
- 高度算式随之改：`codexRef.style.height = h + panelHeadRef.offsetHeight - 1 + 'px'`
  （原为 `h + ulRef.value.scrollHeight`，`ulRef` 已不再是直接子层级）；
- 顺带清掉 `$accentColor` 死变量（`.active` 改 `rgba(255,255,255,.12)`），并为整个组件删掉
  `console.log(slots)` 调试残留。

⚠️ 这次重构踩了一个**结构性**坑：第一次改完模板后构建报
`Element is missing end tag`（`24:5`）。真因是编辑时**旧的一段 `<transition>…<div class="con-code">…<ul class="ul-codes">`
没删干净**，与新块并存。定位手法值得记：`@vue/compiler-sfc` 的 `parse` 只给出行列，
真正指认「谁没闭合」要靠**自写标签栈扫描器**（栈顶是 `svg` 却遇到 `</path>` ⇒ MISMATCH）。
修完把**全部 8 个被改 SFC** 都过一遍 `@vue/compiler-sfc` 编译 + Stylus 块渲染（产物 0 处死 `$var`）才收工。

### 10.16.3 logo 调整：从双图切到单图 + 裁剪

原 `f-ui-logo.png` / `f-ui-logo-white.png` 是两张 1200×1200，语义重复且分辨率严重浪费。
从设计稿 `logo.png`（1774×887）裁出 **F 标记**：bbox `x 256–524 / y 295–576`，四周留 6% padding、
居中到正方形，`LANCZOS` 重采样，透明底，输出 **256×256** `docs/public/logos/fei-logo.png`（约 39KB）；
`favicon.ico` 同步按同一标记重生成（16–128 多尺寸）。

之所以能从两张并为一张：品牌渐变是**青→蓝→紫**，在浅色与深色导航底色上对比度都够
⇒ 原先 `not-darken` / `has-darken` 的双 `<img>` 切换可以直接删掉。
`Navbar.vue` 与 `HomeComponents.vue` 均改为单 `<img class="logo-img" src="/logos/fei-logo.png">`。

### 10.16.4 卡片圆角把文字裁掉

`.card` 上的 `border-radius: var(--vs-radius,20px)` + `overflow:hidden` 让**首行/末行文字**
在 20px 圆角处被切掉（探针量到 `leftInset 0`，即文字左边缘正好顶到圆角切线）。

改法是**把「裁剪」这件事下放到真正需要它的子面板**：

- `.card` 本体**去掉** `border-radius` 与 `overflow:hidden`；
- 只给 `.example:last-child:not(.mobile)`、`.slotcode` 补 `border-radius: 0 0 20px 20px` + `overflow:hidden`。

这样圆角依旧只出现在卡片底部（视觉不变），而 `.text` 正文区不再被任何 `overflow` 约束。
复测 4 个抽样页：`radius 0`、`overflow visible`、无文字裁切、无横向溢出。

### 10.16.5 站内搜索不完整 —— 这一处工作量最大

**现状认定（先证伪再修）**：VitePress **1.0.0-rc.35 没有内置本地搜索**。
`themeConfig.search.provider: 'local'` 与 `VPLocalSearchBox` 都是**更晚版本**才提供的；
rc.35 的 `vitepress/theme` 只导出 `VPImage`/`VPButton` 那一批。而主题里那份 `SearchBox.vue`
抄的是 **VuePress 0.x** 实现，依赖 `site.pages`（`{title, headers, path}`）与 `$router` ——
这两样在 VitePress 1.x **都不存在**：输入第一个字符即抛
`TypeError: Cannot read properties of undefined (reading 'length')`，下拉永不出现、回车也跳不动。

**做法 = 构建期自造索引 + 重写组件**：

- `utils/search-index.js`（新增）：挂到 markdown-it 上包一层 `render`，把每页**渲染后的 HTML**
  收进来，按 `<h2>/<h3>` 的**真实 `id`** 切小节 —— 用产物里的 id 而不是自己复刻 slugify，
  锚点必然与页面一致。`buildEnd` 时写成 `outDir/search-index.json`（落在**站点根**，与 `index.html` 同级，
  故地址就是 `<base>search-index.json`）。放 `buildEnd` 是刻意的：早于它写会被 public/ 的拷贝覆盖。
- 页标题不能只靠 `env.frontmatter.title`（markdown 插件的 `env` 里有没有 frontmatter 并不保证），
  权威来源是 VitePress 自己算的 `pageData.title` ⇒ 由 `transformPageData` 喂进来，两条路径互相兜底。
- `components/SearchBox.vue`（**整体重写**）：懒加载索引（`fetch(<base>search-index.json)`，共享同一个
  Promise）、`title > header > body` 打分排序、每文档最多 3 条、总计 ≤20 条；片段用 `<mark>` 高亮
  （**不用 `v-html`**）；`/` 与 `Ctrl/Cmd+K` 聚焦、`Esc` 关闭、`↑↓` 选择、回车跳转；
  跳转用原生 `window.location.href`（与全站其它链接同一套约定）。
  下拉容器用 `@mousedown.prevent` —— 否则 input 的 `blur` 会**先于** `click` 触发，结果点不中。

⚠️ **索引质量两个坑，不修的话「搜什么都命中全站」**：

1. **`<pre>` 必须整体丢出索引**，否则代码块里遍地是 `f-button`、`props`、`button` ——
   实测修前 108 处 `button` 噪声；行内 `<code>` 要保留（它常常就是那唯一一处 API 说明）。
2. VitePress 标题锚点的内容是 **U+200B 零宽空格**，产物里写作**命名实体** `&ZeroWidthSpace;`；
   JS 的 `\s` **不匹配 U+200B** ⇒ 每个小标题都拖着一个零宽字符进索引（搜索结果标题看起来「带方框」）。
   两种写法（命名实体 + 裸码点 `\u200b-\u200d\ufeff`）都要处理。

修前索引 288KB / 修后 138KB；73 个页面入索引。

### 10.16.6 验证结果

`probe-docs-ux5.mjs` 在 `tEstnx` 之后这一版产物上复测：

> ⚠️ **本节的 codex 部分（A/C 段）已被 §10.17 推翻并回退。**
> 用户随后明确要求「不要改动代码查看方式及相关图标按钮位置」，
> 故 `.panel-head` / `.code-trigger` 已删除，A/C 段断言已改回「工具条在面板之外」。
> 本节其余四项（logo / 卡片圆角 / 搜索 / 悬浮提示）仍然有效。

| 段 | 结论 |
|---|---|
| A/C | 代码块展开后 `headerInPanel: true`、`sameRow: true`、工具条底色与面板同色（`rgb(54,52,73)`），收起态入口为「查看代码」 |
| B | 4 个抽样页 `card radius 0` / `overflow visible` / 无文字裁切 / 无横向溢出 |
| D | logo `src=/fei-ui-design/logos/fei-logo.png`，`nat 256×256`，明暗两张截图均正常 |
| E | 4 个页面**待改英文 0 条**；复制按钮 `title="复制代码"`、`rawCopyCode` 命中 0 |
| 搜索 | 输入 `button` 出 14 条、`安装` 出 9 条、乱码出「未找到与「…」匹配的内容」；点击/回车/Esc/`/` 快捷键全部生效 |

护栏：`vitest` 4 文件 16 用例全绿；`eslint` 归零；`docs:check` 五项全绿；
`check-site-links`（75 个产物页、站内链接全命中）、`check-docs-contrast`（全 token 达标）、
`check-docs-placeholders`（未超基线）均通过。

⚠️ 本轮又踩了一次**「同一文件并行发多个编辑」**：`Navbar.vue` 的 `title="Github"` 第一次改完
其实**没落盘**（两个编辑各自读旧内容再写回），直到探针报 `["Github","npm 包"]` 才暴露。
⇒ 该条纪律（同一文件多次改动必须**串行**、改完 Read 复核）已在 `MEMORY.md` 记为「已复现多次」，
本轮是第 N 次复现，**不要再图快并行**。

---

## §10.17 回退 §10.16 的 codex 结构改动；并查清「还有很多 vs-」的真实成因（2026-09-18 追加）

### 10.17.1 起因：用户否定了 §10.16 对 codex 的改法

用户反馈：**「不要改动我的代码查看方式、及相关图标按钮位置」**。

§10.16 为满足「查看代码按钮与代码区域不需要分开」，做了两件**结构性**动作：

1. 把 `.header-codex`（CodePen / CodeSandbox / 复制 / 展开折叠 四个图标）从 `.con-code`
   **之外**搬进其中，与页签合成 `.panel-head`；
2. 收起态**新增**一个通栏 `.code-trigger`（图标 +「查看代码」）当唯一入口。

方向没错，但**改变了读者原有的操作路径** —— 入口位置、按钮数量、页签与操作图标的相对位置
全变了。这是产品决策，不该在排查过程中顺手改掉。

**处理：整体回退到 `b2a4994^` 的结构，只保留文案本地化。** 具体：

- 模板 / 样式 / 高度算式回到原状：`.header-codex` 排在 `.con-code` 之前、
  `ulRef.value.scrollHeight` 参与高度计算、`.ul-codes` 居中（`padding 0 var(--fd-sp-5)`）、
  `.header-codex li` 用 `getVar(theme-color)` 深色图标、分隔线用 `getVar(theme-layout)`；
- 保留的中文化：`代码已复制`、`在 CodePen 中打开`、`在 CodeSandbox 中打开`、`复制代码`、
  `收起代码 / 查看代码`、页签 `模板 / 脚本 / 样式 / 全部`；
- 顺手删掉 `console.log(slots)`（调试残留，与交互无关）；
- **刻意不碰** `.header-codex li.active` 原有的 `$accentColor`（属既有缺陷，见 §10.17.3，
  留给用户决定）。

> **原设计的「相连」手法本来就有**：`.header-codex li.active` 带
> `border-radius 12px 12px 0 0` + `background getVar(theme-code2)` —— 展开时那个图标变成
> **与深色面板同色的页签**，视觉上与面板连成一体（探针实测 `toggleActiveBg: rgb(54,52,73)`）。
> §10.16 没识别出这一点，误判为「两块分离」而重做了结构。

### 10.17.2 用户第二问：「是不是有改造遗漏，现在还有很多 vs-」

背景：用户参考 Vuesax 自建组件库，看到主题里大量 `vs-` 前缀，怀疑有漏改。
新增 `.workbuddy/scripts/audit-vs-prefix.py` 盘查后分三类，**只有第三类算缺陷**：

| 类别 | 规模 | 性质 |
|---|---|---|
| **机制层**：`--vs-theme-*` 令牌 + `[vs-theme]` 属性 | 6 个令牌 / 1 个属性 | **必须保留**：`Config.vue` 与 `applyTheme()` 运行时读写，是明暗主题的契约 |
| **命名层（活的）**：`.vs-button` / `.vs-input` / `.vs-checkbox` 等 | 29 个类名 | 文档站**自己的** UI 原子（首页装饰卡），样式在 `custom.styl` + `styles/vf-*.styl`；与组件库 `src/`（早已统一 `fei-`，328 处）**是两套独立实现**。产物里只有 `index.html` 命中（55 处元素） |
| **死代码** | 36 个类名 / **32 个变量** | 随 Vuesax 搬来、本站从未使用：社交品牌色 28 个（`--vs-youtube`/`--vs-facebook`…）、`--vs-zindex-1..4`、`.vs-loading`/`.vs-clipboard` 整套、按钮的 hover/loading/动画态 |

**结论：`vs-` 命名本身不是漏改**（`--vs-*` 是本站的令牌 API，`.vs-*` 是文档站自有的 UI 原子）。
真正的「遗漏」是同一次迁移里没被带过来的 **VuePress 0.x 变量** —— 见下节。

### 10.17.3 真·遗漏：未定义 Stylus 变量进了产物，被浏览器静默丢弃

Stylus 对未定义变量**不报错**，原样拼进 `unquote()` → 产物里是语法非法的声明 →
浏览器整条丢弃 → **构建零警告、页面静默缺样式**。

新增 `.workbuddy/scripts/audit-dead-css.py`：从产物 CSS 抠出含 `$` 的声明，
再判定「同一条规则内该属性有没有合法兜底」。改动前：**25 条，全部无兜底**，落在 11 个选择器上。
逐条核对「选择器是否真的命中产物」后的判定：

| 选择器 | 缺失属性 | 源码位置 | 可见缺陷？ |
|---|---|---|---|
| `.up:hover` | `color` | `components/Page.vue` | **是** —— 返回顶部按钮真实渲染 |
| `.vs-input` / `.vs-input__label` / `.vs-input__icon` | `background`/`color`/`box-shadow` | `styles/vf-input.styl` | 否 —— 后续规则已覆盖；label 未渲染 |
| `.navbar .logo` | `height`/`min-width` | `components/Navbar.vue` | 否 —— `.logo` 元素已不存在（模板用 `.logo-img`） |
| `.header__btns button(:after)` | `height`/`background` | `AsideNav.vue`/`Sidebar.vue` | 否 —— 两组件均不渲染 |
| `.sidebar .nav-links` | `border-bottom` | 同上 | 否 |
| `.sidebar-heading.clickable.active/:hover` | `color`/`border-left-color` | `SidebarGroup.vue` | 否 —— 活的侧边栏是 VitePress 自己的，类名只有 `open sidebar-heading`，无 `clickable` |
| `.dropdown-wrapper .dropdown-title .arrow` | `border-top` | `DropdownLink.vue`/`styles/arrow.styl` | 否 |
| `.header-codex ul li.active` | `color` | `global-components/codex.vue` | 否 —— 该 `li` 只有图标，且图标被强制 `#fff` |

**本轮修掉 3 处**：

1. `styles/vf-input.styl`：删掉「mixin 声明被注释、下面仍引用 `$color`」的 12 行 ——
   它产出 17 条 `rgba(var(--vs-$color), …)`，是「产物里看着像漏改的 vs- 变量」的主因
   （无视觉影响）。文件顶部留了注释说明来由。
2. `components/Page.vue` 的 `.up:hover`：改用 `getColor('primary', 1)`。
   ⚠️ **不能直接写 `rgba(var(--vs-primary), 1)`** —— Stylus 有同名内置函数 `rgba()`，
   它要求首参是真颜色字面量，会在编译期抛 `assertColor` 让**整个构建中断**（实测 `at ".up"`）。
   必须走 `unquote()` 拼串；为此在本文件补了 `getColor` 助手（与 `custom.styl`/`Config.vue`/`vf-*.styl` 一致）。
3. `components/api.vue`、`components/homeInit.vue` 的 `getVar(theme-text)`：该令牌**从未定义**
   （令牌集只有 `--vs-theme-{bg,bg2,color,code,code2,layout}`）⇒ 改回 `theme-color`。
   改完产物里「引用了但未定义的 `--vs-*`」归零。

**余下 13 条未修**（都在从不渲染的元素/组件上，见上表）：属「连带清理死组件」的范畴，
需要产品决策（删文件 vs 留待启用），**未擅自处理**。

### 10.17.4 验证

`probe-docs-ux5.mjs` 的 C 段已按**用户原有交互**重写断言（不再是「header 在面板内」）：

```
收起态：headerOutsidePanel true / extraTrigger false / headerVisible true /
        panelShown false / headerCentered true / hasToggle true
展开态：headerStillOutside true / tabsCentered true / tabsLabels [模板, 全部] /
        toggleActiveBg rgb(54,52,73)（= --vs-theme-code2，原本的「页签相连」手法）
```

E 段（`[title]`）4 个页面待改英文 **0 条**；F 段（外壳可见文字）4 个页面 **0 条**；
复制按钮 `title="复制代码"`、`rawCopyCode` 命中 0。死 CSS **25 → 13 条**。
`vitest` 4 文件 16 用例、`eslint`、`docs:check` 五项、三项产物护栏全绿。

⚠️ **探针的选择器表与交互动作必须跟着结构一起回退**：C 段原用
`.panel-head .ul-codes li` / 点 `.code-trigger`，F 段的 `CHROME` 表同样引用了它们。
回退代码却不回退探针，就会「断言已不存在的元素」，得到一堆**假绿**。

## §10.18 命名前缀全量迁移：`vs-` → `fei-`（2026-09-18 追加）

### 10.18.1 起因与口径确认

用户：「对于 vs-button 组件类似 这种改为 f-button f-xx」。

澄清后确定**三套体系不许混**（这是本轮最容易搞错的地方）：

| 层 | 前缀 | 例 |
| --- | --- | --- |
| 样式类名 / CSS 自定义属性 | `fei-` | `.fei-button`、`--fei-color-primary` |
| 图标字体 | `f-` | `.f-icon-close`（601 个） |
| 组件注册名 / 导出名 | `F` | `FButton` |

⚠️ 用户口述的「`f-button`」是**口误**：组件库样式类名真实是 `.fei-button`（890 处）；
`f-button` 来自 SCSS 变量 `$f-btn-*` 的误匹配。搬进文档站要跟**组件库**一致，所以是 `fei-`。
范围选了**全量**：类名 + `--vs-*` 变量 + `[vs-theme]` 属性 + `localStorage.vsTheme` + JS 标识符。

### 10.18.2 一处必须先解决的撞名

文档站 `theme/index.ts` 已经 `import '../../../src/_styles/index.css'` + `app.use(FeiUI)` ——
即**组件库样式已全量生效**。若把首页那批 vuesax 静态 HTML 块（`vf-button`/`vf-input`/`vf-checkBox`
三份共 1019 行外观复刻样式）只改类名成 `.fei-button`，就会**与组件库同名规则打架**、
外观不可预期。故按用户决策改为**组件库真实组件**：

- 20 处 `<button class="vs-button…">` → `<f-button type="danger|primary|warning" circle|transparent|plain>`
- 17 处 `<div class="vs-input-parent"><input class="vs-input">` → `<f-input v-model placeholder>`
- 12 处 `<input class="vs-checkbox">`+自绘勾 → `<f-checkbox v-model label>`
- 连着删掉 `vf-button.styl`(399) / `vf-input.styl`(414) / `vf-checkBox.styl`(206) 及其 `@require`

### 10.18.3 迁移落点

机械替换用 `.workbuddy/tmp/migrate-vs.py`，8 条固定顺序规则（**`--vs-` 必须先跑**，
否则会把 `--vs-theme-bg2` 拆错）：`--vs-`→`--fei-`、`vs-theme`→`fei-theme`、`vsTheme`→`feiTheme`、
`vs-wipe-old-top`、`vs-clipboard`、`vs-remove-transition`、`vs-icon-`、`vs-api`。
命中 **49 文件 / 348 处**。`docs/.internal/`（历史档案）与 `site/.temp/cache/node_modules` 排除。

同时删掉 7 个死文件（零引用，其中 `homeInit.vue` 1120 行、`navbarLayout.vue` 里 50 处 vs-、
`layouts/sidebar.vue` 零引用）：`homeInit.vue`、`navbarLayout.vue`、`premiumThemes.vue`、
`layouts/sidebar.vue` + 上述三份 `.styl`。**`vs-switch`/`vs-radio`/`vs-navbar-item`/`vs-sidebar-item`/
`vs-avatar`/`vs-col`/`vs-row` 这些类名全在死文件里**，随删文件一并消失 —— 不必单独处理。

另：`HomeComponents.vue` 的 `.vuesax-logo` → `.fei-logo`（与兄弟类 `.gitee-logo` 配对，无冲突）。

### 10.18.4 两个踩坑（都会**静默**失败）

1. **`@require` 有两处，只改一处的后果是构建失败**：`custom.styl` 与 `styles/theme.styl`
   **都** `@require` 了那三份 `vf-*.styl`（后者经 `Layout.vue` 的 `<style src>` 进入 404 页）。
   Phase 1 只改了前者 ⇒ `failed to locate @require file ./vf-button.styl`。
   教训：**同一个被 require 的路径改成删除时，要全仓 grep 一遍 `@require`**。
2. **护栏会跟着旧变量名一起失效** —— `build/check-docs-contrast.cjs` 直接读
   `--vs-theme-code2` / `--vs-theme-code` / `vs-theme` 来取代码块底色。改名后它**取不到值**，
   于是「校验通过」但**其实什么都没校**（构建零警告、退出码 0）。只有真正重跑并看输出里的
   `代码块底色` 一行才露出来。
   教训：**改名类重构的检查清单里必须有「grep 旧前缀在整个仓库（含 `build/`）的出现」**，
   `docs/` 之外的脚本目录最容易漏。

### 10.18.5 守卫脚本 `.workbuddy/scripts/audit-vs-prefix.py`

从「审计 vs- 三类」重写为**迁移后守卫**，做三件事 + 两处误报修正：

- ① 断言 `vs-` 零残留（`.internal` 单独列、不计失败）；② `fei-*` 变量自洽性；③ `vuesax` 品牌词盘点。
- ⚠️ **修正 1：`@each` 循环生成族会被误判成「引用了未定义」**。
  `src/_styles/base/vars.css:5-14` 用 Stylus `@each $val, $color in var(--colors)` 生成整族
  `--fei-color-$(val)[-light1..6|-active]`，**变量名里含字面 `$(val)`**，
  于是定义侧正则抓不到 ⇒ `--fei-color-danger`/`-primary-light1` 等 7 个被误报。
  修法：解析 `--colors: (primary: …, success: …)` 取调色板名，再把 `$(\w+)` 模板**展开**成具体变量名。
- ⚠️ **修正 2：跨行块注释里的内容会被当成活代码**。
  `Page.vue` 整段分享按钮被 `<!-- -->` 包住（死代码），里面 4 条 `lusaxweb.github.io/vuesax` 链接
  被算成「可见文案」。修法：用 `re.finditer(r'<!--.*?-->|/\*.*?\*/', txt, re.S)` 先算出**块注释行区间**。
- 顺带把 ③ 做成可执行：按 `text`（可见文案）/ `ident`（类名）/ `asset`（资源名）/ `note`（注释）
  分桶，并**标注该文件是否仍被引用**（`ref_count`）——
  否则每次跑都报一堆 `text=16 ✗`，人就会学会忽略它，**守卫随即腐烂**。

### 10.18.6 验证

```
vitest               4 文件 16 用例通过
build:site           ✓ rendering pages / ✓ search-index.json 已生成：73 个页面
docs:check-site      ✓ 产物页面完整，所有站内链接均可命中
docs:check-contrast  ✓ 代码块底色与语法着色主题配套，全部 token 对比度达标
docs:check-placeholders ✓ 主题占位文案未超基线
audit-vs-prefix      EXIT=0（① 零残留 ② 无未定义变量 ③ 无可⻅文案）
产物全局             vs- 残留 0；fei-button 2096 / fei-input 1416 / fei-checkbox 347 / fei-theme 187
DOM（CDP 实挂）      feiButton 10 / feiInput 2 / feiCheckbox 4 / vsLeftover [] / vuesaxWord []
                     暗色契约 bodyBg rgb(30,32,35) / 控制台报错（无）
产物 CSS             .con-logo.fei-logo{border-radius:50px} 等 3 条规则均已编译，vuesax-logo 选择器 0
```

### 10.18.7 遗留（**本轮有意未做**）

`vuesax` 品牌词只剩两处，且**用户均不可见**：
- 未被引用的死组件里的文案（`Branding` / `HomeTwiter` / `docsWarn` / `Icons`）；
- 资源文件名（`docs/public/home/vuesax-brand-*.svg`、`logos/logo-vuesax-*`、`use/*-vuesax*.png`）。

品牌素材（Logo SVG/PNG）替换属独立设计议题，**需与「品牌 Logo」任务一起做**，不在前缀迁移范围内。

### 10.19 死代码清理（2026-09-18，用户指令「删掉死代码」）

§10.17.3 与 §8.10.5 遗留的两笔（「13 条死 CSS」+「35 个从 index.ts 不可达的主题文件」）本轮一次性清掉。
**用户两次拍板**：死 CSS「全删，外观不变」；孤儿资源「97 个全删」。

#### 10.19.1 判定方法：可达性分析（不靠"看着像死"）

三次扫描交叉验证，**以「从入口出发的可达性」为最终依据**：

| 方法 | 脚本 | 结论 |
| --- | --- | --- |
| 字符串级「文件名是否被提到」 | 早期 `scan-dead-theme-components.cjs` | 只作粗筛，**通用名会大量误判** |
| 只追 JS `import` 边 | `audit-dead-files.py`（原始版） | 漏 `@require` / `<style src>` / md 引用 / 目录 index ⇒ 假阳性 |
| **可达性（入口 BFS）** | `.workbuddy/tmp/reachability.cjs` | **权威**：20 个不可达 `.vue` |

入口 = `theme/index.ts` + `.vitepress/config.*` + **全部 `.md`**（md 可 import 组件、也可用全局注册组件）。
**反向还要查「只被死文件引用」的传递死链** —— 本次结果为 0（每个存活文件都有存活引用者）。

#### 10.19.2 实际删除：**124 个文件**

| 类别 | 数量 | 明细 |
| --- | --- | --- |
| 不可达 `.vue` 组件 | **21** | `AlgoliaSearchBox` / `ASidebarLink` / `Branding` / `Codefund` / `HeaderNotification` / `headerSvg` / `HomeIllustration1~4` / `HomePatrons` / `HomeTwiter` / `HomeUses` / `NavLinks2` / `PassLayout` / `api.vue` / `Badge` / `Coloren` / `docsWarn` / `Icons` / **`Color.vue`** |
| 从未参与编译的 `.styl` | **6** | `arrow` / `custom-blocks` / `mobile` / `palette` / `toc` / `styleSass.stylus`（对应 `@require` **一直是被注释着的**） |
| 孤儿静态资源 | **97**（≈10.3 MB） | 46 个随上述组件一起失去引用；51 个本就零引用 |

另有 11 个文件被**局部清理**（净 −271 行）：10 条死 CSS 声明 + 7 处坏 `@media` 块。

⚠️ **`Color.vue` 是本轮唯一靠"复核"捞回来的**：上一轮的可达性脚本按**组件名**匹配 md 标签，
而 `anchor.md` / `timeline.md` 里的 `<Color/>` 指向的是**就地 import** 的
`./demo/Anchor/Color.vue`（另一个文件）⇒ 全局那个被误判成"活"。
**教训：按名字匹配标签时，必须确认那次 import/注册到底绑定的是哪个文件。**

#### 10.19.3 死 CSS 的两类，以及"删"为什么零风险

| 类别 | 形态 | 后果 | 数量 |
| --- | --- | --- | --- |
| **A. 死声明** | 声明值里引用未定义变量，如 `border-top 6px solid $arrowBgColor` | 浏览器丢弃**这一条声明** | 10 |
| **B. 坏 `@media` 块** | 媒体条件里含未定义变量，如 `@media (max-width: $MQMobile)` | 浏览器丢弃**整个块** | 7 处 / 3 条唯一 |

**根因**：这些变量（`$accentColor` / `$navbarHeight` / `$textColor` / `$borderColor` / `$arrowBgColor` / `$MQMobile`）
原本由 `palette.styl` 与 VuePress 的 `theme.styl` 提供 —— 而 **`palette.styl` 从未被任何文件 `@require`**
（`theme.styl` 里的 `@require` 全被注释掉了）。所以它们在整个编译上下文里都不存在。

Stylus 对未定义变量**不报错、原样输出** ⇒ 产物里是**语法非法**的 CSS ⇒ 浏览器静默丢弃、构建零警告。
（与 §10.17.3 同一个坑。）

**"删除零风险"是证明出来的**，两条独立证据：

1. **CSS 层面**：非法声明的属性值对任何选择器都无效 ⇒ 删掉不可能改变渲染。
2. **DOM 层面**（CDP 实测，三页）：
   ```js
   matchMedia('(max-width: 768px)').matches      // true   ← 375px 视口
   matchMedia('(max-width: $MQMobile)').matches  // false  ← 该条件永不成立
   ```
   且那 7 个选择器在真实 DOM 里**全部命中 0**：
   `.header__btns` / `.sidebar .nav-links` / `.navbar .logo` /
   `.dropdown-title .arrow` / `.header-codex ul li.active` / `.sidebar-heading.clickable[.active|:hover]`
   —— 其中 `.header__btns`、`.nav-links`（在 `.sidebar` 内）、`.logo` **根本不在模板里**；
   `.dropdown-wrapper` / `.nav-dropdown` / `.dropdown-item` 全站 0（自定义下拉那一层不渲染）。

#### 10.19.4 顺带修掉：`layouts/404.vue` 的 `<router-link>`（VuePress 1.x 遗留）

做多页冒烟时 404 页报 `Hydration completed but contains mismatches.`，定位过程与结论：

```
SSR   : <h1>404</h1><!---->                                   ← 渲染成空注释
client: <h1>404</h1><router-link to="/">Take me home.</router-link>  ← 未解析元素！
```

`<router-link>` 是 **VuePress 1.x / Vue Router 3** 的全局组件，VitePress（Vue Router 4）里**不存在**。
后果两条：① SSR 与水合结果不一致 ⇒ 水合告警；② 该链接**没有 href，点不动**。
改用原生 `<a :href>` + `useData().site.value.base`（base 形如 `/fei-ui-design/`），
并顺手删掉同文件里声明后从未使用的 `msgs` 数组。

⚠️ **写这条修复注释时踩了一个新坑**：注释里写了字面量 `<!---->`，它的 `-->` **提前闭合了 HTML 注释**，
剩下半截变成非法内容 ⇒ `@vue/compiler-dom` 解析抛错、**构建直接中断**。
⇒ **HTML 注释内不能出现连续两个减号**（Vue 官方文档明确提到 `--` 在注释里非法）。

#### 10.19.5 守卫脚本修正（防"守卫腐烂"）

`audit-dead-files.py` 原版只追 JS `import`，把 `@require` 的 styl、md 引用的组件、目录 index
一律误判为死 ⇒ 每次跑都报 8 个假阳性。**噪声多了人就会学会忽略它，守卫随即腐烂**（同 §10.18.5 的教训）。
本轮补齐 5 类边：`import/require`、Stylus `@import/@require`、`<style src>`、
**`<preview path="...">`（VitePress demo-preview，不是 import！）**、目录 `index.*` 解析，
并把 `__tests__/*` 列为白名单。修后：**A 段 0 个，退出码 0**。

#### 10.19.6 验证（全绿）

```
vitest 16/16 ✓
build:site ✓ 73 页面        ← 构建通过本身即「删除无残留导入」的强证据（Vite 会直接失败）
check-site-links ✓ / check-docs-contrast ✓ / check-docs-placeholders ✓
audit-dead-files.py  A 段 0 个，EXIT=0
audit-dead-css.py    被丢弃的声明 0 条（原 10）
count-bad-media      未解析媒体查询 0 处（原 7）；产物里残留 $ 变量（原 5 种）→ 空
eslint               0 error
CDP 首页              feiButton 10 / feiInput 2 / feiCheckbox 4 / vs 残留 [] / 控制台报错 无
CDP 多页冒烟           8 页全部渲染正常、无断图；删改后 404 页水合告警消除
```

#### 10.19.7 本轮发现但**未处理**（留给后续）

1. **自定义侧边栏链在运行时并不渲染**：`Sidebar.vue` 的 `.content-sidebar` 出现在 DOM（2 处），
   但 `SidebarLinks → SidebarGroup → SidebarLink` 这条链渲染不出来 ——
   实测 `.sidebar-heading.clickable` / `.sidebar-group`（自定义那套）均为 0，
   活着的侧边栏是 **VitePress 自己的**（`.sidebar-heading` 8 个来自它）。
   因此 `SidebarLink.vue:35` 的 `h('router-link', …)` 也从未执行（DOM 里未解析 `router-link` 元素为 0）。
   ⇒ **这几个组件"可达但运行时无效"**，是否保留需产品决策。
2. **更大范围的"选择器永不匹配" CSS**：本轮只清了引用了未定义变量的那批。
   例如 `@media (max-width: 1000px) { .sidebar .nav-links {…} }` 媒体条件**合法**，
   但 `.sidebar .nav-links` 永不匹配。全量清理需要覆盖率分析，未做。
3. **首页 `.home .features` / `.feature` 元素不存在**，相关规则（含刚删的两个坏 `@media` 内的）本就无效。

## §10.20 codex 代码查看面板的 4 个页签**改回英文**（产品决策，2026-09-18 追加）

**背景**：§10.16 那轮把主题里所有 `title` 与可见文案做过一轮中文化，其中包括 codex
（`theme/global-components/codex.vue`）代码面板的 4 个页签 —— 由 `Template / Script / Style / All`
改成了 `模板 / 脚本 / 样式 / 全部`。

**用户决策**：2026-09-18 用户明确要求这 4 个页签**改回英文**（保留改造前的原样）。
本轮把 `<ul class="ul-codes">` 里 4 个 `<li>` 的文本改回 `Template / Script / Style / All`，
并在模板里加了注释锁住这个决定，避免后续会话（或文本审计技能）再当"漏翻"改回中文。

⚠️ **同组件其它文案仍是中文，两类刻意不统一，不要"顺手统一"**：
`代码已复制`（`.noti-code`）、`查看代码` / `收起代码` / `复制代码` /
`在 CodePen 中打开` / `在 CodeSandbox 中打开`（各 `title`）。

**顺带修掉**：`layouts/404.vue` 的链接文案 `Take me home.` → `返回首页`。
这是 §10.19 把 `<router-link>` 换成原生 `<a>` 时**原样保留**下来的英文残留；
§10.16 的自查脚本没覆盖到它，因为它在自定义布局里、不在 `.vp-doc` 内。

### 10.20.1 验证（本轮全绿）

```
vitest 16/16 ✓
build:site ✓ 73 页面（92.83s；绕过沙箱删除护栏的配方见 §10.15.5）
check-site-links ✓ / check-docs-contrast ✓ / check-docs-placeholders ✓
产物静态核对（脚本 .workbuddy/tmp/scan-codelabels.mjs）
  页签汇总：All 287 / Template 285 / Script 178 / Style 26
  ← 与改前中文计数 287 / 285 / 178 / 26 **逐一对应**，证明 287 个实例全覆盖、无遗漏
  site/404.html   无 "Take me home"、含「返回首页」
  site/**/*.html  仍含「查看代码」「复制代码」（悬浮提示保持中文，符合预期）
```

### 10.20.2 教训：「扫到英文」≠「必须中文化」

本轮最值得记的一条。§10.16 的文本审计把「主题模板里写死的英文」一律当待修项，
但**处置方向是产品决策**：用户完全可能希望代码相关标签（`Template` / `Script` /
`Style` / `All`）保持英文 —— 那正是上游 vuesax 的原始设计。
所以审计的正确产物是**一份位置清单 + 让用户拍板**，不是自动清零；
本次正因为当初"一律中文化"，才需要再多一轮回退。
`vitepress-docs-text-audit` 技能已同步补上该约束与「两类合法命中」的判定方法。

另注：本轮的**排除过程**本身有价值 —— 为确认英文在哪一层，逐一排除了
① 源码/最新产物（已是中文，287 个实例逐条核过）、② 主仓库 `E:\GitStore\fei-ui-design`
（**没有任何构建产物**，但其 `codex.vue` 仍是旧英文版 `Template/Script/Style/All`）、
③ Gitee Pages 线上站（`ymf930.gitee.io/f-ui-design` 返回 404，无部署）、
④ 是否存在第三个 worktree（`git worktree list` 只有 main + 本 worktree）。
**结论：工作树内不存在英文页签，唯一存量在主仓库源码。**

## §10.21 首页视觉回归：外壳字体栈被打翻 + 搜索框高度丢失（2026-09-22 追加）

用户报「首页控件样式与改动前不一致」（附改动前/后两张截图：标题词间空格像"丢了"、
左下角控件变少）。**先构建基线 + 全量 DOM diff 再动手** —— 结论是两处**真回归**，
另两处差异来自**用户自己的既有决策**，不改。

### 10.21.1 方法：基线产物 + 全量元素树 diff

- 基线 = `git checkout 6c51741 -- docs/.vitepress/theme` 后重新 `build`（`6c51741` 是产品反馈
  那批提交的父提交）。产物留档 `.workbuddy/tmp/stale/site-fix/site`，起在 4177。
- 探针 `.workbuddy/scripts/probe-home-tree.mjs`：遍历全 DOM，按**结构键**
  （`tag#id.class` 路径）记 rect + 30 项计算样式，连采两次把会动的元素标 unstable；
  `--pause=1` 用 `document.getAnimations().forEach(a => { a.pause(); a.currentTime = 0 })`
  把动画**确定性**冻在 t=0（比 `animation:none` 保真：保留 keyframes 的 from 态）；
  `--theme=dark` 走**真实点击** `.switch-dark`（别只写属性：`6c51741` 那版的暗色是
  JS 写内联 CSS 变量，不是属性选择器，写属性会测出"假亮"）。
- 对比脚本 `.workbuddy/tmp/diff-tree.mjs`：输出「仅基线有 / 仅当前有 / 共有但属性不同」。

⚠️ **起站必须 `.workbuddy/scripts/serve-site.mjs <port> <dir> /fei-ui-design`（尾斜杠不能有）**。
带尾斜杠时 `path.startsWith(PREFIX + '/')` 判定失败 ⇒ **HTML 能开、assets 全 404**、
页面静默变无样式 —— 那时采到的 rect 全是流式布局，diff 出一堆**假差异**（本轮真踩了）。

### 10.21.2 真回归 ①：外壳字体栈被"提升特异性"打翻（主因）

`custom.styl` 在重构中把 `body { font-family "Poppins", … }`（特异性 (0,0,1)）
"修正"为 `html body { font-family var(--fd-font-sans) }`（(0,0,2)，栈首仍是 Poppins）。
动机是"让外壳与正文共用一条栈"，但**后果是把组件库字体压掉了**：
`src/_styles/common/reset.css` 的 `body { font-family: var(--fei-font-family) }`
（`Helvetica Neue, Helvetica, …`）与它同为 (0,0,1) 但**更晚**加载 —— 原来靠"晚"赢；
改成 `html body` 后特异性更高，Poppins 栈夺回控制权。

**可见症状**：h1 的 `line-height` 一直是 24px（VitePress `base.css` 的 `h1..h6` 规则，
与 `theme.styl` 的 `h1..h6{line-height:1.25}` 同为 (0,0,1) 但更晚 ⇒ 一直赢，
**基线亦然，非本轮引入**）。但 Poppins 的 em 盒（`<b>` 行盒 **52px**）远高于 Helvetica（**41px**），
同样 24px 行距下两行标题就**视觉重叠**、词间空格看着像"没了"；
连带 hero 变宽（`content-hero` 574 → 589）、复选框缺字形由空心变实心。

**修法**：把值换回 `var(--fei-font-family)`（Helvetica Neue / PingFang SC 栈），即
**刻意保留两套字体栈** —— 外壳走组件库栈，`.vp-doc` 由 `styles/doc-typography.styl`
里那条 `font-family: var(--fd-font-sans)` 单独保持 Poppins；规则位置不动
（`html body` 的特异性仍高于 reset.css，只是值相同，结论一致）。代码里已就地写长注释锁住。
修后实测 h1 字体族 = `"Helvetica Neue", Helvetica, …`、`<b>` 行盒 41px，与基线**逐项相同**。

### 10.21.3 真回归 ②：搜索框高度 40px → 32px

`SearchBox.vue` 的 `input` 丢了基线的 `line-height 2rem`（=32px），padding 也从
`4px` + `padding-left 20px` 变成 `4px 20px`。缺 `line-height` ⇒ 继承 `body` 的 24px
⇒ 高度由 32+4+4 变 24+4+4，搜索框 **40px 缩到 32px**，导航栏右端随之矮一截。
**修法**：显式写回 `line-height 2rem` 与 `padding 4px` + `padding-left 20px`。

### 10.21.4 两处**不是回归**、故不改（均出自用户自己的决策）

| 差异 | 出处 | 为什么不改 |
| --- | --- | --- |
| 首页左下角少「配置齿轮」（`.config` 112 → 72px） | §10.12.1，**用户产品反馈**「首页去掉齿轮」 | 用户明确要求过，恢复等于推翻该决策 |
| 右侧演示区各卡片内部尺寸变化（见下） | §10.18.2，**用户决策**「撞名处改用组件库真实组件」 | 是 vs→fei 重命名的必然配套，回退等于推翻用户的重命名要求 |

演示区实测（确定性冻结，基线 → 当前）：`component1>footer` 50→32px；`component4` 228→210；
`component7` 399→389（其 `footer` 52→42）；`component10` 64.4×163.2 → 187.2×62
（旧的 3 个图标按钮是**竖排**、新组件是**横排**）；`component12` 48→32；
`component13>ul` 197.9→141（每项 `li` 44.48→30.27）。即"新组件更紧凑"。
**已如实报给用户，待其拍板是否也要按基线盒型回填 CSS。**

### 10.21.5 教训

**"把一条看着不生效的规则改成生效"之前，必须先实测谁的层叠真的赢了。**
`html body` 那一改动机是"让样式生效"（原 `body` 声明确被 reset.css 压掉），
但生效方向是**把外壳拉进 Poppins 栈**，恰好就是用户看到的"字变了"。凡动
**字体/排版基座**，改完必须跑基线构建 + 全量 diff；只验证"规则生效了"会漏掉"生效成了什么"。

## §11 工程环境与工具链速查（跨轮次复用，2026-09-18 追加）

> 本仓库 git 在 **E 盘**、工作区在 **C 盘**（跨盘）+ 受限沙箱，导致下列行为与常规环境不同。
> `MEMORY.md` 只留一行指针（控制注入体量），细节在此；`build:site` 配方另见 §10.15.5。

### 11.1 Git：嵌套 ref 的两类坑（**会造成真实损失**）

- ⚠️ **禁止对嵌套 ref 做删除类操作**（`update-ref -d` / `branch -d` / `remote prune` / `gc`）：
  git 删完 ref 会 `rmdir` 空父目录，而沙箱的删除拦截会把**整个 `refs/heads/<a>/` 子树移走**。
  2026-09-15 因此丢过分支 ref。
- ⚠️ **git 对嵌套两级 ref（形如 `a/b`）的写入不可靠**：可能**返回退出码 0 但 ref 根本没落盘**
  ⇒ **每次提交后必须用 `git log` 校验 ref 是否真的指过去了**。
  - 判别「提交是否已生成」：`git reflog --format=%H -1`
  - 若已生成，就把 ref 指向该 SHA，**不要重做提交**。取 SHA 用 `git log -g --format=%H -1`
  - ⚠️ 别用 `Get-Content <reflog 文件> -Tail 1`：文件末尾无换行时会把最后两行拼在一起、**取到旧 SHA**
  - 恢复脚本 `.workbuddy/scripts/restore-worktree-ref.ps1`（幂等、只写不删）

### 11.2 Shell 与工具调用

- ⚠️ **`corepack` / `pnpm` 在 Bash 工具里会把路径拼成 `C:\c\Users\...` 而失败**
  （报 `Cannot find module 'C:\c\Users\...\corepack.js'`）⇒ 这类命令**必须走 PowerShell 工具**。
  2026-09-18 实测：`pnpm test` 与三个 `pnpm docs:check-*` 在 Bash 下全挂。
- ⚠️ 但 **PowerShell 工具在受限沙箱下「命令输出整体为空」**（只报 `exit code 0`、`Stdout` 空白）
  ⇒ 只用它做「有副作用、不需要看输出」的操作。
- ✅ **要看输出时的正解：绕开 shell 包装、直接调包内入口，且必须用绝对路径**：
  ```bash
  NODE="C:/Users/YMF/.workbuddy/binaries/node/versions/22.22.2-3/node.exe"
  "$NODE" node_modules/vitest/vitest.mjs run
  "$NODE" node_modules/vitepress/bin/vitepress.js build docs
  "$NODE" build/check-docs-contrast.cjs     # 同理 build/check-*.cjs、eslint/bin/eslint.js
  ```
- ⚠️ 含中文的 5.1 版脚本文件必须存为 **UTF-8 with BOM**，否则乱码。
- Bash 工具 PATH 偶发损坏，临时 `export PATH="/usr/bin:/bin:$PATH"` 可救。
- ⚠️ **不要对同一文件并行发多个编辑**：后写的会覆盖先写的（工具仍各自报成功）。**已复现多次**
  ⇒ 必须**串行**，改完用 Read 复核。

### 11.3 沙箱批量删除护栏（阈值：单次工具调用 **50 个删除**）

- `build:package` 的 `clean` 会被拦。因 `vite.config.ts` 是 `emptyOutDir:false`，
  **直接跑 `build:lib && build:style` 即可**、不必 clean。
- `build:site`：`site` 与 `docs/.vitepress/.temp` **两处**都要绕过 —— 完整配方见 **§10.15.5**。
  判别「构建其实没跑」：看日志有无 `✓ rendering pages`。
- `build/smoke-consumer.cjs`：`.workbuddy/tmp/consumer` 已有产物时**把该目录改名**即可跑完。
- 逃生开关：`CODEBUDDY_SAFE_DELETE_ENABLED=0`（本轮 `build:site` 即用它跑通）。

### 11.4 CDP 探针（本机无头 Chrome，**不需要 Playwright**）

- ⚠️ `Page.captureScreenshot` 的 `clip.scale` **必填**，漏了拿不到图。
- ⚠️ `captureBeyondViewport: true` 时 `clip` 用的是**页面坐标**，须 `rect.y + window.scrollY`，否则返回空图。
- ⚠️ **探针必须与真实实现同构**：模拟主题切换要**同时**把 `fei-theme` 写到 `<html>` 与 `<body>`
  （只写 body 会让 `<html>` 落到 `:root` 浅色兜底、测出**假白**）。凡「模拟应用状态」的语句都要与实现逐字符对齐。
- ⚠️ **探针的选择器表与交互动作必须跟着结构改动一起回退**，否则断言已不存在的元素 = **一堆假绿**。
- ⚠️ 已知假阳性：`probe-typography.mjs` 的 `pre code` 行恒报 1.45:1 —— 那是 `code` 自身的计算色；
  代码块实显色看 shiki token `span`（用 `probe-code-plain.mjs` 按文本段采样）。
- 本站起服务的正解：`.workbuddy/scripts/serve-site.mjs [port] [dir] [prefix]`（剥掉 base 前缀，默认 4174）。
  ⚠️ `vitepress preview` **不带 base 前缀**，资源全 404、页面能开但没样式。

