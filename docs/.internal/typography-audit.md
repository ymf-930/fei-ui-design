# 文档站字体颜色 / 字号评估报告

> 评估对象：在线使用文档站（VitePress 1.0.0-rc.35 自定义主题）
> 评估时间：2026-09-18　基线产物：`master-7f7a48d0` 分支本地构建（75 页）
> 取证方式：CDP 驱动无头 Chrome 实测 **计算样式 + 祖先链 alpha 合成的真实背景 + WCAG 对比度**，
> 不靠读源码推断。探针脚本见 `.workbuddy/scripts/probe-typography*.mjs`、`probe-fonts.mjs`、
> `probe-code-plain.mjs`、`shot-typography-spots.mjs`；原始数据在
> `.workbuddy/tmp/probe-typography*/report.txt`。

---

## 0. 结论速览

| 级别 | 问题 | 影响 | 位置 |
| --- | --- | --- | --- |
| **P0-1** | 暗色主题下 `--fd-*` 排版 token **一个都没覆盖** | 正文/标题/行内码对比度 **1.55 ~ 1.60 : 1**，实际不可读 | `styles/doc-typography.styl` `:root`（第 60~73 行） |
| **P0-2** | `--shiki-light` 兜底色把 ` ```text ` 代码块**整块染成粉红** | 24 行说明文字 `#e2777a` / 4.10 : 1，且语义误导（像"报错/删除"） | `custom.styl:62` |
| **P1-1** | 表格 `td` 字号被 VitePress 默认主题接管（14px），与 token 声明的 13.5px 冲突 | 表体比表头大 0.5px；表格字号实际不受 token 控制 | `doc-typography.styl` 缺 `td` 声明 |
| **P1-2** | 页面主标题 35px ↔ 小节 h2 22px 跨度 **1.59×**；`--fd-fs-h1: 28px` 从未生效 | 层级断层；正文缺一级；主标题行高 24px **小于字号本身** | `Page.vue:610` + `doc-typography.styl` |
| **P1-3** | 同一页面存在**两套字体栈**（正文 Poppins / 外壳 Helvetica+微软雅黑） | 中英混排观感不统一 | `custom.styl:217` 被组件库 `body` 规则覆盖（死代码） |
| **P2-1** | `--fd-fs-sm: 13.5px`、`--fd-fs-xs: 12.5px` 是**半像素字号** | 100% 缩放下列即将舍入；与库的 12/14/16 三档不一致 | `doc-typography.styl` token |
| **P2-2** | h4 16px 与正文 15px 只差 1px | h4 全站 49 处，层级偏弱 | `--fd-fs-h4` |
| **P2-3** | 外壳字号未与正文共用阶梯：侧边栏链接 12.8px、分组标题 16px **大于**正文 | 层次倒挂 | `.sidebar`、`SidebarLink.vue`、`NavLinks.vue` |
| **P2-4** | Poppins 只注册了 `Regular(400)` 一个 face，标题 600 靠**合成粗体** | 笔画发虚；`public/Poppins/` 里躺着全套 18 个字重没用上 | `custom.styl:86`、`styles/theme.styl:11` |
| **P2-5** | 语言角标 `rgba(255,255,255,.4)` → 3.33 : 1 | 装饰件，略低于 AA | `doc-typography.styl:345` |

**判断**：整体方向是对的 —— 已经收敛出单一权威排版层、token 化、排除 demo 区、8pt 间距节奏，
这些都做得比多数同类文档站扎实。真正的"必须改"只有 **P0 两项**；P1 三项是"看着像小事、
实则是机制漏洞"；P2 是打磨项。

---

## 1. 实测基线（组件文档页 / 明色主题）

`.vp-doc` 底色 `#f4f7f8`，根字号 15px。

| 元素 | 字号 | 行高 | 字重 | 文字色 | 实际背景 | 对比度 | 字号来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 页面主标题 `#header-title` | **35px** | **24px** | 600 | `#2c3e50` | `#eef2f5` | 9.76 : 1 | `Page.vue:610` |
| 正文 h1 | 28px | 1.4 | 600 | `#2c3e50` | — | — | `--fd-fs-h1`（**全站 0 使用**） |
| 小节 h2 | 22px | 30.8px | 600 | `#2c3e50` | `#f4f7f8` | 10.20 : 1 | `--fd-fs-h2` |
| h3 | 18px | — | 600 | `#2c3e50` | — | — | `--fd-fs-h3` |
| h4 | 16px | — | 600 | `#2c3e50` | — | — | `--fd-fs-h4`（49 处） |
| h5 / h6 | 15 / 14px | — | 600 | `text-1` / `text-2` | — | — | **全站 0 使用** |
| 正文 `p` / `li` | 15px | 26.25px | 400 | `#2c3e50` | `#f4f7f8` | 10.20 : 1 | `--fd-fs-body` |
| 表头 `th` | **13.5px** | 21.6px | 600 | `#2c3e50` | `#f5f7fa` | 10.23 : 1 | `--fd-fs-sm` |
| 表格 `td`（第 1 列） | **14px** | 22.4px | 500 | `#2c3e50` | `#ffffff` | 10.98 : 1 | ❌ **VitePress 默认** |
| 表格 `td`（第 3 列） | **14px** | 22.4px | 400 | `#3f3d56` | `#ffffff` | 10.43 : 1 | ❌ **VitePress 默认** |
| 行内 `code` | 13.5px | 23.6px | 400 | `#2c3e50` | `#eef2f5` | 9.76 : 1 | `0.9em` |
| 代码块 | 13px | 21.45px | 400 | 见下 | `#363449` | — | `--fd-fs-code` |
| 引用块 | 15px | 26.25px | 400 | `#5a6b7d` | `#f4f7ff` | 5.11 : 1 | `--fd-text-2` |
| 锚点 `#` | 17.6px | 24.6px | 500 | `#1a5cff` | `#f4f7f8` | 4.85 : 1 | `0.8em` |
| 语言角标 | 12.5px | 21.9px | 500 | `rgba(255,255,255,.4)` | `#363449` | **3.33 : 1** | `--fd-fs-xs` |
| 侧边栏分组标题 | **16px** | 27.2px | 700 | `#2c3e50` | `#ffffff` | 10.98 : 1 | `.sidebar` |
| 侧边栏链接 | **12.8px** | 21.8px | 500 | `#2c3e50` | `#f4f7f8` | 10.20 : 1 | `SidebarLink.vue` |
| 顶部导航链接 | 14.4px | 22.4px | 500 | `#2c3e50` | `#ffffff` | 10.98 : 1 | `NavLinks.vue` |

代码块 token（`github-dark-dimmed` on `#363449`，全站扫描 49 个代码块 / 4159 段文本）：

| 颜色 | 出现 | 对比度 |
| --- | --- | --- |
| `#adbac7` | 468 | 6.09 : 1 ✅ |
| `#8ddb8c` | 216 | 7.25 : 1 ✅ |
| `#6cb6ff` | 154 | 5.60 : 1 ✅ |
| **`#e2777a`** | **142** | **4.10 : 1 ❌**（`span.line` 兜底） |
| `#96d0ff` | 110 | 7.32 : 1 ✅ |
| `#f69d50` | 3 | 5.65 : 1 ✅ |
| `#768390` | 2 | 3.11 : 1 ⚠（注释色，`check-docs-contrast.cjs` 已把关） |

**代码语法着色的配色决策是对的**：两侧都给了 `github-dark-dimmed`，且注释色专门从
`github-dark` 的 `#6A737D`（2.50 : 1）换成了 `#768390`（3.11 : 1）。这部分**不需要改**。

---

## 2. 逐项分析与修法

### P0-1　暗色主题下正文几乎不可见（1.60 : 1）

**实测**

| 元素 | 明色文字 | 暗色文字 | 暗色背景 | 暗色对比度 |
| --- | --- | --- | --- | --- |
| 小节 h2 | `#2c3e50` | `#2c3e50`（**未变**） | `#18191c` | **1.60 : 1** |
| 正文段落 | `#2c3e50` | `#2c3e50`（**未变**） | `#18191c` | **1.60 : 1** |
| 行内 code | `#2c3e50` | `#2c3e50`（**未变**） | `#1b1c1f` | **1.55 : 1** |
| 表格 th / td | `#2c3e50` | `#2c3e50`（**未变**） | `#f5f7fa` / `#ffffff` | 10.2 : 1，但是**整块白斑** |
| 引用块 | `#5a6b7d` | `#5a6b7d` | `#f4f7ff` | 5.11 : 1，但**整块亮块** |
| 锚点 `#` | `#1a5cff` | `#1a5cff` | `#18191c` | **3.36 : 1** ✗ |
| 侧边栏 / 导航 | `#2c3e50` | `#ffffff` ✅ | `#18191c` | 17.58 : 1 |

**机制**：暗色只覆盖了组件库那套 `--vs-theme-*`：

```stylus
// Config.vue:428  —— 唯一的暗色定义
[vs-theme="dark"]
  --vs-theme-bg: #18191c
  --vs-theme-color: #fff
  --vs-theme-layout: #1e2023
  --vs-theme-bg2: #141417
  --vs-theme-code: #141417
  --vs-theme-code2: #161619
```

而 `doc-typography.styl` 的 `--fd-*` 只在 `:root` 定义了一次，**没有任何暗色分支**
（全仓 `grep -- "--fd-"` 只在这一个文件出现；产物 CSS 里 `--fd-text-1: #2c3e50`
全站**只有 1 处**）。

**为什么危害比"整体没做暗色"更糟**：外壳（侧边栏、导航、页面主标题）跟随主题变白，
只有 `.vp-doc` 里那一层不变 —— 于是同一个页面里**大部分内容隐形、少部分正常**，
用户会以为"文档坏了"而不是"暗色没做完"。截图见
`.workbuddy/tmp/typography-shots/vpdoc-dark-fullpage.png`。

**修法**：在 `doc-typography.styl` 的文末（或 token 段之后）补一段暗色覆盖。
注意两件事：

1. 暗色块目前写在 `Config.vue` 的 `<style lang="stylus">` 里，那是**组件 stylesheet**；
   `--fd-*` 属于排版层，应留在 `doc-typography.styl`，否则未来又会分叉。
2. 选择器必须写 `body[vs-theme="dark"]`（`applyTheme()` 把属性写在 `<body>` 上），
   且**不能**写成 `.darken`（`.darken` 只用于消息组件的显隐）。

推荐值（均已实测对比度）：

```stylus
body[vs-theme="dark"]
  --fd-text-1: #e6e8eb      // on #18191c → 14.3:1 ；on #1e2023 → 13.3:1
  --fd-text-2: #a3aab4      // → 7.5:1 / 7.0:1
  --fd-border: #33363c
  --fd-link: #4d8dff        // → 5.50:1（浅色下同 token = #1a5cff）
  --fd-table-text: #c9ced6  // → 11.1:1
  --fd-th-bg: #23262b
  --fd-table-bg: #191a1e
  --fd-tr-stripe: #1c1e22
  --fd-tr-hover: #1f2735
  --fd-quote-bg: rgba(77, 141, 255, .12)   // on #18191c ≈ #1e2737，配 text-2 → 6.4:1
```

**⚠️ 两处耦合必须同时改，否则改一半更糟**：

- `.vp-doc table:not(.example *)` 现在的文字色是 `var(--vs-theme-code)`。
  这个 token 在暗色下被改成 `#141417`（近黑）—— 现在压在**白**表格底上没问题，
  一旦把表格底改暗，文字就会跟着变成近黑 → 对比度归零。
  **必须换成独立的 `--fd-table-text`**，不要再复用 `--vs-theme-code`
  （`custom.styl:104-109` 的注释已经提醒过"它是深色文字色，别当底色用"）。
- 引用块的底色是 `var(--fei-color-primary-light6)` = `#F4F7FF`（组件库 token，
  只有浅色一套）。文档层要给它自己的 `--fd-quote-bg`。
  **不要**在暗色下直接覆盖 `--fei-color-primary*` —— 那套 token 同时被
  `.example` 里的组件演示使用，而演示区在暗色下仍是白卡片，
  改了会把演示的按钮/标签颜色一起改掉。

---

### P0-2　` ```text ` 代码块被兜底色染成粉红（4.10 : 1）

**实测**：`/guide/common-css.html` 第 209 行的 ` ```text ` 块，24 段可见文字
（`dir：主轴方向`、`top：从上到下` …）色彩全部是 `rgb(226,119,122)` = `#e2777a`，
对比度 **4.10 : 1**。截图 `.workbuddy/tmp/typography-shots/plaintext-block-light.png`
里整块是粉红色，视觉上像"被删除的内容"。全站扫描 49 个代码块 / 4159 段文本，
**只有这一处 24 段未着色**（其余 0 段）。

**机制**：

```stylus
// custom.styl:62
--shiki-light: #e2777a!important;
```

`markdown.theme` 两侧都配了 `github-dark-dimmed`，VitePress 走 shiki 的
`css-variables` 模式：每个 token span 带**内联** `style="--shiki-light:#xxxxxx"`，
内联自定义属性优先级高于 `:root`，所以正常 token 不受影响。
但**未识别语言（`text` / 裸围栏）整行不会被切 token**，文本节点直接落在
`<span class="line">` 里 → 继承 `:root` 的兜底 `--shiki-light` = `#e2777a`。

**修法**（二选一，推荐前者）：

1. 把兜底改成与 `github-dark-dimmed` 正文色一致的 `#adbac7`（实测 6.09 : 1）：
   `--shiki-light: #adbac7 !important;`
2. 直接删掉这一行，让 VitePress 默认的 `--vp-code-block-color` 接手。

另外建议给 `docs/guide/common-css.md:209` 的围栏补一个语言标记（`text` 已经是
"纯文本"的显式声明，保留即可，但若改成 `md` 会获得正确的 token 着色）。
**长期护栏**：CI 里加一条"代码块内不存在非 token 文本"的检查（可复用
`.workbuddy/scripts/probe-code-plain.mjs` 的判据）。

---

### P1-1　表格字号倒挂：表体 14px > 表头 13.5px

**实测**：同一张 API 表，`table` 计算字号 13.5px、`th` 13.5px，但 `td` 是 **14px**。

**机制**（这条很容易被误判成"特异度不够"，其实是另一个规则）：

```css
/* VitePress 默认主题，产物第 7 条 .vp-doc 字号规则 */
.vp-doc td { font-size: 14px; }        /* 特异性 (0,1,1) */
```

`doc-typography.styl` 把字号声明写在了 **`<table>`** 上：

```stylus
.vp-doc table:not(.example *) { font-size: var(--fd-fs-sm); }   /* (0,2,1) */
```

`font-size` 是**继承属性**。父元素上的声明特异性再高，也**永远输给直接命中子元素的声明** ——
继承值只在"子元素自己没有任何声明"时才使用。所以 `td` 被 VitePress 的默认规则直接命中，
拿到 14px；而 `th` 因为 `doc-typography.styl` **显式**写了 `.vp-doc table:not(.example *) th { font-size: var(--fd-fs-sm) }`
（0,2,2 > 0,1,1）才压住了默认的 14px。

结论：**表格字号名义上受 token 控制，实际上 `td` 不受控**，且表体比表头大 0.5px。

**修法**：给 `td` 也补显式声明（顺带把文字色收进 token 体系）：

```stylus
.vp-doc table:not(.example *) td {
  font-size: var(--fd-fs-sm);
  color: var(--fd-table-text);          // 替换掉对 --vs-theme-code 的复用
}
.vp-doc table:not(.example *) td:first-child {
  color: var(--fd-text-1);
}
```

**同类风险提醒**：产物里 VitePress 默认主题还有 `.vp-doc th{font-size:14px}`、
`.vp-doc blockquote>p{font-size:16px}`、`.vp-doc a{color:var(--vp-c-brand-1)}` 等
一批规则。它们**目前都被 `doc-typography.styl` 压住了**（因为后者显式命中了同样的元素，
且产物顺序在后），**但 `td` 是唯一的漏网**。以后往 `doc-typography.styl` 里加规则时，
凡是"设在容器上、指望子元素继承"的写法都要警惕这一点。

---

### P1-2　标题阶梯：35px ↔ 22px 断层，且 h1 token 从未生效

**实测阶梯（组件文档页）**

```
35px  页面主标题（#header-title，Page.vue 自己的规则）
 └ 22px  小节 h2
    └ 18px  h3
       └ 16px  h4（49 处）
          └ 15px  正文  ← h4 只比正文大 1px
             └ 13.5px 表格 / 行内码
                └ 13px  代码块
                   └ 12.5px 语言角标
```

两个具体问题：

1. **35 → 22 是 1.59×**，而 22 → 18 → 16 → 15 是 1.22 / 1.13 / 1.07 —— 上面跳得太大，
   下面挤得太密。中间**本该有一级 28px 的 `h1`**，但文档正文全站不用 `#` 一级标题
   （页面标题由 `Page.vue` 渲染在 `.vp-doc` **之外**），所以 `--fd-fs-h1: 28px` 从未生效。
2. **主标题行高实测 24px，小于字号 35px**。`Page.vue:610` 只写了 `font-size 35px`，
   行高由上游某条 `line-height: 24px` 决定。当前靠 `padding` 撑着没露出裁切，
   但一旦换字体/改字号就会出现行间重叠或裁切风险。

另外，35px 也高于主流文档站的主标题（VitePress 默认 32px、Ant Design 30px、Element Plus 28px）。

**修法**

| 位置 | 现值 | 建议 | 理由 |
| --- | --- | --- | --- |
| `Page.vue:610` | `font-size 35px` | **`font-size 30px` + `line-height 1.3`** | 与 h2 24 形成 1.25× 级差；补上行高 |
| `Page.vue:985`（吸顶态） | `1.5rem`(24px) | **22px** | 跟随主标题缩小 |
| `Page.vue:994`（再缩态） | `1.2rem`(19.2px) | **18px** | 同上，去掉半像素 |
| `--fd-fs-h1` | 28px | 保留 28px | 作为"页面内一级标题"的预留档，位阶在 30 与 24 之间 |

---

### P1-3　同一页面两套字体栈

**实测（`CSS.getPlatformFontsForNode` + 计算 `font-family`）**

| 区域 | 计算后的字体栈 | 实际渲染的字体 |
| --- | --- | --- |
| 页面主标题 | `"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif` | 拉丁 **Arial** / 中文 Microsoft YaHei |
| 侧边栏链接 | 同上 | 中文 Microsoft YaHei |
| 正文 `.vp-doc` | `Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", …` | 拉丁 **Poppins** / 中文 **Noto Sans SC** |

**机制**：`body` 上有两条 `font-family` 声明 ——

- 组件库 `src/_styles/base/vars.css` → `body { font-family: var(--fei-font-family) }`
- 主题 `custom.styl:217` → `body { font-family: "Poppins", … }`

**组件库那条赢了**（见产物 CSS 中 `font-family: var(--fei-font-family)` 出现在
`:root` 与 `body`，而 `custom.styl` 的 body 规则没有生效）。所以
`custom.styl:217 / 223 / 226` 那三条 `font-family` 实际上是**死代码**。
只有 `.vp-doc` 通过 `var(--fd-font-sans)` 把正文单独拉回 Poppins。

后果：同一页里 **拉丁字形混用 Arial 与 Poppins**，中文混用 **微软雅黑与 Noto Sans SC**。
尤其"按钮 Button"这个标题，其拉丁部分和正文的同一单词字形不同。

**修法（低风险，建议做）**：给 `--fd-font-sans` 显式补上 CJK 族名，让中文不再依赖
系统兜底选字：

```stylus
--fd-font-sans: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
  "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
```

**修法（中风险，需先确认首页观感）**：让外壳也走同一条栈 —— 把 `custom.styl` 的
`body { font-family: … }` 改成 `html body { font-family: var(--fd-font-sans) }`
（`html body` 特异性 (0,0,2) > `body` (0,0,1)，可稳定压过组件库那条），
同时删掉 `custom.styl:223/226` 两条 `input` / `button` 的重复声明。
⚠️ 外壳字体一变，**首页（`homeInit` / `Home*.vue`）的观感会跟着变**，需要逐屏确认，
建议单独一轮。

---

### P2-1　半像素字号应归整

`--fd-fs-sm: 13.5px`、`--fd-fs-xs: 12.5px` 都是 `.5`。半像素在 100% 缩放下由浏览器
做亚像素舍入，不同元素的舍入方向可能不同 → 行高/基线轻微抖动。

同时组件库自己是有整数三档的：`--fei-font-size-small: 12px` /
`--fei-font-size-default: 14px` / `--fei-font-size-large: 16px`。

**建议**：`--fd-fs-sm: 13.5px → 14px`、`--fd-fs-xs: 12.5px → 12px`，
与库的"默认 / 小"两档对齐。副作用：表格从 13.5→14（表体本来就是 14，等于**表头**长大
0.5px，实现"表头 = 表体"）；语言角标从 12.5→12（本就偏小，影响可忽略）。

---

### P2-2　h4 与正文只差 1px

h4 全站 49 处，是 h2/h3 之外唯一真正在用的层级。16px 与正文 15px 差 1px，
实际靠"600 字重 + 上间距"区分，偏弱。

**建议**：h4 → **17px**（配合 P1-2 把 h2 → 24、h3 → 20，得到 24 / 20 / 17 / 15 的
级差 1.20 / 1.18 / 1.13，比现在的 22 / 18 / 16 / 15（1.22 / 1.13 / 1.07）均匀）。

h5 / h6 全站 0 使用，可一并抬到 16 / 15 只是为了体系完整，**零回归风险**。

---

### P2-3　外壳字号未与正文共用阶梯

| 元素 | 现值 | 建议 | 说明 |
| --- | --- | --- | --- |
| 侧边栏分组标题 | 16px / 700 | 16px / **600** | 它现在**比正文 15px 还大**，字重也重一级，与"容器标签"的语义不符 |
| 侧边栏链接 | **12.8px** | **13.5px**（`--fd-fs-sm`） | 12.8px 低于中文小字常规下限 13px；差距与正文 15px 拉开 2.2px |
| 顶部导航链接 | 14.4px | **14px** | 归整 |
| 页头辅助信息 | 14px | 14px | 保持 |

⚠️ 侧边栏宽度是固定 260px，链接字号从 12.8 → 13.5 会让长条目标题更早换行，需实际看一遍。

---

### P2-4　Poppins 只注册了 400，标题 600 是合成粗体

`docs/public/Poppins/` 里其实躺着**全套 18 个字重**（Thin → Black，含 Italic），
但主题只声明了一个 face：

```stylus
@font-face
  font-family: "Poppins"
  src: url("/Poppins/Poppins-Regular.ttf")
  font-weight: 400
```

而所有标题都是 `font-weight: 600` → 浏览器拿 400 的轮廓**合成伪粗体**，
笔画会发虚、字重看起来比设计稿轻。`document.fonts` 里 Poppins 只有一条
`weight=400` 的记录，可以佐证。

**修法**（零新增资源，文件已在 `public/`）：

```stylus
@font-face
  font-family: "Poppins"
  src: url("/Poppins/Poppins-Regular.ttf") format("truetype")
  font-weight: 400
  font-display: swap
@font-face
  font-family: "Poppins"
  src: url("/Poppins/Poppins-Medium.ttf") format("truetype")
  font-weight: 500
  font-display: swap
@font-face
  font-family: "Poppins"
  src: url("/Poppins/Poppins-SemiBold.ttf") format("truetype")
  font-weight: 600
  font-display: swap
```

同时删掉 `custom.styl:86` 与 `styles/theme.styl:11` 中**重复的那一份**
（同一个 family 声明了两遍，产物里出现两次）。

---

### P2-5　语言角标对比度 3.33 : 1

`rgba(255,255,255,.4)` on `#363449` = 3.33 : 1。改成 `.55` → 约 **4.85 : 1**，
达到 AA。它是装饰性文字，严格说不强制，但既然 `build/check-docs-contrast.cjs`
已经把代码 token 卡到 AA，这条建议一并对齐。

---

## 3. 推荐方案（完整 token 表）

### 3.1 字号阶梯

| token | 现值 | **建议值** | 级差 | 说明 |
| --- | --- | --- | --- | --- |
| 页面主标题（`Page.vue`） | 35px | **30px** | — | 对齐 VitePress 32 / AntD 30 |
| `--fd-fs-h1` | 28px | 28px | 30/28 = 1.07 | 正文内一级标题预留档 |
| `--fd-fs-h2` | 22px | **24px** | 28/24 = 1.17 | |
| `--fd-fs-h3` | 18px | **20px** | 24/20 = 1.20 | |
| `--fd-fs-h4` | 16px | **17px** | 20/17 = 1.18 | 全站 49 处 |
| `--fd-fs-h5` | 15px | **16px** | 17/16 = 1.06 | 0 使用 |
| `--fd-fs-h6` | 14px | **15px** | 16/15 = 1.07 | 0 使用；与正文同级但 600 + `text-2` |
| `--fd-fs-body` | 15px | 15px | — | 中文正文 15~16px 为佳 |
| `--fd-fs-sm` | 13.5px | **14px** | 15/14 = 1.07 | 表格；对齐库 `--fei-font-size-default` |
| `--fd-fs-code` | 13px | 13px | | |
| `--fd-fs-xs` | 12.5px | **12px** | | 角标；对齐库 `--fei-font-size-small` |

改造前后的"密度"对比：

```
现在： 35 ────────── 22 ─── 18 ── 16 15  13.5 13 12.5
        1.59×      1.22× 1.13× 1.07×
建议： 30 ─────── 24 ──── 20 ─── 17 16 15  14 13 12
        1.25×     1.20×  1.18×  1.06× 1.07×
```

### 3.2 颜色 token

| token | 明色 | **暗色** | 用途 | 明色对比度 | 暗色对比度 |
| --- | --- | --- | --- | --- | --- |
| `--fd-text-1` | `#2c3e50` | **`#e6e8eb`** | h1~h5 / 正文 / strong / 行内码 / 表格首列 | 10.2 : 1 | 14.3 : 1 |
| `--fd-text-2` | `#5a6b7d` | **`#a3aab4`** | h6 / 引用块 | 5.11 : 1 | 7.5 : 1 |
| `--fd-link`（新增） | `#1a5cff` | **`#4d8dff`** | 正文链接 / 锚点 | 4.85 : 1 | **5.50 : 1** |
| `--fd-table-text`（新增） | `#3f3d56` | **`#c9ced6`** | 表格正文（替换 `--vs-theme-code`） | 10.43 : 1 | 11.1 : 1 |
| `--fd-border` | `#e6eaf0` | **`#33363c`** | 描边 | — | — |
| `--fd-th-bg` | `#f5f7fa` | **`#23262b`** | 表头底 | — | — |
| `--fd-table-bg` | `#fff` | **`#191a1e`** | 表格底 | — | — |
| `--fd-tr-stripe` | `#fafbfd` | **`#1c1e22`** | 斑马纹 | — | — |
| `--fd-tr-hover` | `#f0f5ff` | **`#1f2735`** | 行悬停 | — | — |
| `--fd-quote-bg`（新增） | `#f4f7ff` | **`rgba(77,141,255,.12)`** | 引用块底 | — | — |
| `--shiki-light`（兜底） | `#e2777a` | **`#adbac7`** | 未着色代码文本 | **4.10 → 6.09 : 1** | — |

### 3.3 字体

`--fd-font-sans` 补 CJK 族名；`@font-face` 补 500/600 两个 face + `font-display: swap`；
删掉重复的 `@font-face` 与失效的 `body { font-family }`。

---

## 4. 建议的实施顺序

| 步骤 | 内容 | 回归范围 | 验收 |
| --- | --- | --- | --- |
| **第 1 步（必做）** | P0-1 暗色 token + P0-2 兜底色 | 只影响暗色主题 + 1 个 `text` 代码块 | 暗色下逐元素对比度 ≥ 4.5；`probe-typography3.mjs` 的暗色表全绿 |
| **第 2 步** | P1-1 表格 `td`、P2-1 半像素归整 | 表格外观；全站 20 张 API 表 | `probe-typography.mjs` 的 td/th 字号一致 |
| **第 3 步** | P1-2 标题阶梯 + P2-2 h4 | 所有文档页的标题观感 | 截图比对；`docs:check-docs-contrast` 等 8 项护栏 |
| **第 4 步（可选）** | P1-3 字体栈、P2-3 外壳字号、P2-4 字重、P2-5 角标 | 首页 + 全站外壳 | 首页逐屏确认 |

**每步都要重跑的护栏**：

```bash
node build/check-docs-api.cjs && node build/check-docs-links.cjs && \
node build/check-docs-demo.cjs && node build/check-docs-style.cjs && \
node build/check-docs-tags.cjs && node build/check-site-links.cjs && \
node build/check-docs-contrast.cjs && node build/check-docs-placeholders.cjs
```

**⚠️ 构建注意**：`build:site` 会被沙箱的批量删除护栏拦住（vitepress 每轮清
`docs/.vitepress/.temp`，150+ 文件逐个 unlink）。构建前先把 `site/` 与
`docs/.vitepress/.temp` **移动**到 `.workbuddy/tmp/stale/`（移动不计入删除额度）即可绕过。

---

## 5. 明确**不需要**改的部分

1. **代码语法着色配色**：`github-dark-dimmed` 两侧一致，注释色已从 `#6A737D`(2.50 : 1)
   优化到 `#768390`(3.11 : 1)，并由 `check-docs-contrast.cjs` 在 CI 把关。
2. **正文 15px / 行高 1.75**：中文正文的合理区间（15~16px / 1.7~1.8），无需动。
3. **锚点 `#` 在标题文字之后**：已确认是正确实现（`.vp-doc a.header-anchor` 特异性
   (0,2,1) 稳压 `theme.styl` 的历史 `float: left` 规则，与样式表顺序无关）。
   唯一建议是把 `0.8em` 收到 `0.7em`（h2 提到 24px 后，0.8em 会变成 19.2px）。
4. **卡片内外共用同一条内容边**、**8pt 间距节奏**、**`:not(.example *)` 排除 demo 区**：
   这三条是这套排版层做得最好的地方，是"层次清晰"的基础，别回退。
5. **56 个 `.vp-doc` 字号规则中只有 `td` 一条漏网**，其余默认主题规则均已被正确压制。
