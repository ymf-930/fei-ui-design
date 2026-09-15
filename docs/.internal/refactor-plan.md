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

- **现象一：`locale` 只被透传，从不被消费**
  - `src/config-provider/src/types.ts`：`locale: { type: String, default: 'zh-CN' }`
  - `ConfigProvider.ts:40-44` 只把它 provide 成 `mergedLocaleRef`
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
- **建议**：二选一 —— 补齐 locale 语言包并让组件统一走 `useLocale`；或明确标注为「预留、尚未生效」，
  同时把示例替换为真实存在的组件。`locale` 是否保留 `'zh-CN'` 默认值，应与语言包设计一并定
  （若要支持继承，应删掉默认值，把缺省值下沉到消费侧）。
- **状态**：⚠️ **部分修复**（见 §8.8.3）—— 示例已换成真实存在的写法、文档已据实标注，
  并记录了继承缺陷；**国际化实现本身（语言包 + 组件消费）尚未开工**，
  它是一次功能建设而非缺陷修复，范围待定（见 §8.9）。

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

  更隐蔽的一层：站点没有暗色开关，VitePress 自带的
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
| 4 | **P0-2b** 国际化实现（语言包 + 组件消费 + `locale` 默认值取舍） | ⬜ 待定范围 | 属**功能建设**，涉及公开 API 与语言包设计，须先定范围（见 §8.9） |
| 5 | **P1-2 + P1-1** 先补测试、再去 `@ts-ignore`、逐组件闭环 | ⬜ 进行中（3/56） | 没有回归网就动 731 处 ignore，风险不可控。建议按「补该组件测试 → 删除该文件的 ignore → 修真实错误」推进 |
| 6 | **P1-3 / P1-4** 暗色主题、a11y | ⬜ 待办 | 都是「文档已承诺 / 行业已要求」的能力缺口，体量最大但边界清晰 |
| 7 | **P2** 体积与配置（`browserslist`、字体裁剪、`iconfont.json` 动态化、移除 `lodash`、虚拟滚动） | ⬜ 待办 | 优化项，不阻塞发布 |
| 8 | **P3** 文档一致性，并把本文档纳入校验范围 | ⬜ 待办 | 防止权威文档再次漂移（本次已发现 4 处过时事实） |

> **P1-6 已提前完成**（见 §8.8.1）：它是纯配置层的一处笔误，改动量最小，
> 却直接决定「文档示例能不能读」，性价比高于表内任何一项，因此不等排期先做掉。
>
> **P0 三项已全部处理完毕**（见 §8.8.2 / §8.8.3）：其中 P0-2 只完成了「文档不说谎」这一半。
> 剩下的国际化实现是功能建设，**不要**在没有范围共识前零散开写。

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

### 8.9 待定范围的独立事项：国际化实现

P0-2 的「文档不说谎」已完成，但**国际化本身尚未实现**。它不应作为零散修补推进，
需要先就以下几点达成范围共识：

| 决策点 | 选项 | 影响 |
| --- | --- | --- |
| 语言包范围 | 仅 `zh-CN` / `zh-CN` + `en-US` | 决定是否需要维护翻译与 CI 校验（缺 key / 多 key） |
| 接入方式 | 新增 `useLocale()` 读取 `mergedLocaleRef` / 沿用现有 provide | 决定改动面（约 18 个文件含硬编码文案） |
| `locale` 默认值 | 删除默认值以支持嵌套继承 / 保留 `'zh-CN'` | 前者修正继承缺陷但属公开 prop 语义变更 |
| 日期类组件 | 是否随 `locale` 切换 dayjs locale（当前 `date-picker` **硬编码 `.locale('en')`**） | 月份与星期当前恒为英文，与 `zh-CN` 默认值自相矛盾 |
| 校验护栏 | 是否新增「文档承诺的能力是否有实现」类检查 | 本次 P0-2 正是「文档承诺 > 实现」的产物 |

> 硬编码文案分布（`src` 中匹配到中文字面量的文件，共约 18 个）：
> `date-picker`（5 个文件最重：月份、星期、placeholder、`aria-label`）、
> `page`、`select`、`table`、`tree`、`message-box`、`rate`、`_internal/empty` 等。
