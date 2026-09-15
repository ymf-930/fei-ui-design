# 文档站导航 404 排查报告

> 状态：已定位、已修复、已验证（含第二轮：导航功能缺失类问题）
> 范围：`docs/` 文档站（VitePress 1.0.0-rc.35，部署 base `/fei-ui-design/`）
> 结论：**不是「路由未注册」也不是「构建产物缺失」，而是链接拼接层缺少 `.html` 扩展名 / 缺少 base 前缀**
>
> 第二轮补充（§4.1、§5.5、§7）：连带修掉了三个同源缺陷 —— 「指南」下拉从未渲染、
> 「编辑此页」按钮没有 href、`base` 拼接存在多套约定。

---

## 1. 结论速览

| # | 出错位置 | 出错链接 | 影响页面 | 根因 |
|---|---|---|---|---|
| 1 | 页面底部「下一页」按钮 | `/guide/introduction` | **74 / 74 页（全部）** | `Page.vue` 里的兜底对象硬编码，**缺 base 前缀** |
| 2 | 侧边栏「组件」59 条 | `/fei-ui-design/components/<name>` | 60 页 | `SidebarLink.vue` 直接输出 `item.link`，**缺 `.html`** |
| 3 | 侧边栏「指南」12 条 | `/fei-ui-design/guide/<name>` | 13 页 | 同上 |
| 4 | 页脚 4 条 | `/fei-ui-design/{guide,components}/<name>` | 74 页 | `Footer.vue` 只调了 `withBase()`，**缺 `.html`** |
| 5 | 面包屑示例占位链接 | `/` | 1 页 | 示例代码里的占位 `<a href="/">`，低危 |

**总计：73 个唯一出错链接，在产物中累计出现 3968 次。**

修复前用「纯静态托管」方式实测：

| 请求路径 | 修复前 | 修复后 |
|---|---|---|
| `/fei-ui-design/components/button` | **404** | 200（链接已改为 `button.html`） |
| `/fei-ui-design/guide/introduction.html` | 200 | 200 |
| `/guide/introduction` | **404** | 200（链接已改为 `/fei-ui-design/...`） |
| `/fei-ui-design/` | 200 | 200 |

---

## 2. 排查过程与关键证据

### 步骤 1：确认技术栈与路由生成方式

```
docs/.vitepress/config.js      ← VitePress 配置（base / nav / sidebar）
docs/.vitepress/theme/         ← 自研主题（不是 VitePress 默认主题）
build/check-docs-links.cjs     ← 既有死链检查脚本
```

关键配置：

```js
// docs/.vitepress/config.js
const SITE_BASE = process.env.NODE_ENV === 'production' ? '/fei-ui-design/' : '/'
base: SITE_BASE,
outDir: '../site',
ignoreDeadLinks: false,          // 死链检测已开启
```

**证据 A：`NODE_ENV` 在 config 加载之前就已置为 production**，因此构建期 `base` 取值正确（不是 base 配置错）：

```js
// node_modules/vitepress/dist/node/serve-dMCSG9dM.js:46559
async function build(root, buildOptions = {}) {
  const start = Date.now();
  process.env.NODE_ENV = "production";                    // ← 先设置
  const siteConfig = await resolveConfig(root, "build", "production");  // ← 后加载 config.js
```

产物中资源路径也确实带上了 base：

```
$ grep -o '/fei-ui-design/assets/[^"]*' site/guide/introduction.html | head -1
/fei-ui-design/assets/style.BTg9h-mx.css
```

### 步骤 2：核对源文件与产物（排除「路由未注册 / 页面不存在」）

```bash
$ find docs -name "*.md" -not -path "*/.vitepress/*" -not -path "*/.internal/*" | wc -l
74
$ find site -name "*.html" | wc -l
71        # ← 初始产物，少于源文件
```

初次对照发现 3 个页面「产物缺失」：`guide/index.html`、`components/index.html`、`components/button-group.html`。
但核对其 mtime 后确认：**这三个源文件都在产物生成时间（9-13 14:29）之后才被修改**，属产物陈旧，不是构建错误。

**证据 B：完整重建后产物齐全，构建零报错。**

```
$ node node_modules/vitepress/bin/vitepress.js build docs
vitepress v1.0.0-rc.35
✓ building client + server bundles...
✓ rendering pages...
build complete in 130.35s.
exit=0

$ find site -name "*.html" | wc -l
75        # 74 个页面 + 404.html
```

→ **排除「构建产物缺失」和「路由未注册」**：`sidebar` 里引用的 60 个组件页、13 个指南页在磁盘上全部存在，且全部成功生成。

### 步骤 3：从产物 HTML 中提取真实 href（找到异常形态）

```bash
$ grep -o 'href="/[^"]*"' site/guide/introduction.html | sed 's/href="//;s/"$//' | sort -u
/fei-ui-design/components/
/fei-ui-design/components/button          ← ⚠ 无 .html
/fei-ui-design/favicon.ico
/fei-ui-design/guide/
/fei-ui-design/guide/changelog            ← ⚠ 无 .html
...
/fei-ui-design/guide/installation.html    ← ✅ 有 .html（VitePress 自己生成的）
/guide/introduction                       ← ⚠⚠ 连 base 都没有
```

**证据 C：`.html` 是 VitePress 的既有约定，不是本项目的特例。**
`docs/guide/introduction.md` 里写的是不带扩展名的 `[安装](/guide/installation)`，但产物里被自动改写为 `installation.html`：

```js
// node_modules/vitepress/dist/node/serve-dMCSG9dM.js:37115
cleanUrl = cleanUrl.replace(/\.md$/, env.cleanUrls ? "" : ".html");
```

本项目 `cleanUrls` 为默认的 `false`，因此**页面真实产物一律是 `<route>.html`**，目录页是 `<dir>/`。

**证据 D：项目自身的 README 就是用 `.html` 形式引用线上页面的**，说明线上确实需要扩展名：

```
README.md:87  详见[自定义主题](https://ymf-930.gitee.io/fei-ui-design/guide/custom-theme.html)。
README.md:151 - [安装](https://ymf-930.gitee.io/fei-ui-design/guide/installation.html)
```

### 步骤 4：定位 `/guide/introduction` 的来源（最严重的一条）

```bash
$ grep -o '.\{330\}href="/guide/introduction".\{120\}' site/guide/introduction.html
...</div></div></div><footer class="page-edit">...</footer>
<div class="page-nav"><p class="inner"><!----><span class="next">
  <a href="/guide/introduction"><span>introduction</span><i class="bx bx-chevron-right"></i></a>
</span></p></div>...
```

`title` 是英文的 `introduction`，暴露了它来自一个硬编码对象 —— `docs/.vitepress/theme/components/Page.vue`：

```js
const next = computed(() => {
  const next = frontmatter.value.next
  const obj = { path: '/guide/introduction', title: 'introduction' }   // ← 缺 base
  ...
  return resolveNext(site.value.pages, props.sidebarItems) || obj      // ← 兜底必然命中
})
```

**为什么兜底必然命中？** 因为 `resolveNext` 永远返回 `undefined`：

```js
// docs/.vitepress/theme/util/index.js:244  resolveItem()
return {
  type: 'group',
  ...
  children: item.children,        // ← children 原样透传，未做 resolvePage
}
```

于是每个侧边栏项只有 `{title, link, icon, alias}`，**没有 `type` / `path`**，而旧 `find()` 的判断条件是：

```js
if (cur.type === 'page' && cur.path === decodeURIComponent(page.path))
```

`cur.type` 恒为 `undefined`，条件永远不成立 → `find()` 恒返回 `undefined` → `next` 每次都落到那个硬编码对象。
这条链接**在所有 74 个页面（含 404 页）上都存在**，且因为没有 base 前缀，在任何托管上都是 404。

**附带发现（潜在崩溃）**：`site.value.pages` 在产物 siteData 里**并不存在**。实测解析内联 `window.__VP_SITE_DATA__`：

```
=== siteData 顶层字段 ===
lang, dir, title, description, base, head, router, appearance, themeConfig, locales, scrollOffset, cleanUrls
=== pages 字段 ===
  (siteData 中没有 pages)
```

旧代码 `resolvePage(site.value.pages, prev, route.path)` 一旦某页写了 `frontmatter.prev/next`，就会因 `pages` 为 `undefined` 而抛错（`pages.length`）。当前无人使用该 frontmatter 所以没触发。

### 步骤 5：定位「缺 `.html`」的两处来源

```bash
$ grep -rn "ensureExt" docs/ --include=*.vue
docs/.vitepress/theme/components/NavLink.vue:36:  return ensureExt(props.item.link)   ← 顶部导航：补了 .html
```

| 渲染路径 | 是否补 `.html` | 结果 |
|---|---|---|
| 顶部导航 `NavLink.vue` | ✅ `ensureExt()` | 正常 |
| 首页按钮（复用 `NavLink`） | ✅ | 正常 |
| **侧边栏 `SidebarLink.vue`** | ❌ 直接输出 `item.link` | **404** |
| **页脚 `Footer.vue`** | ❌ 只调 `withBase()` | **404** |

`config.js` 里的 `link()` 只负责拼 base：

```js
function link(path = '') {
  return SITE_BASE + String(path).replace(/^\/+/, '')     // 只有 base，没有 .html
}
```

侧边栏模板是裸输出：

```vue
<!-- 修复前 -->
<a :href="item.link" ...>
```

页脚只补了 base：

```js
// 修复前
link: /^https?:/.test(item.link) ? item.link : withBase(item.link)
```

**证据 E：`withBase()` 不幂等，这是必须统一出口的原因。**

```js
// node_modules/vitepress/dist/client/app/utils.js:14
export function withBase(path) {
  return EXTERNAL_URL_RE.test(path) || !path.startsWith('/')
    ? path
    : joinPath(siteDataRef.value.base, path);
}
```

对已带 base 的 `/fei-ui-design/guide/x` 再调一次会得到 `/fei-ui-design/fei-ui-design/guide/x`。
这正是「有的地方补 base、有的地方不补」这种双约定容易踩坑的地方。

### 步骤 6：为什么问题能长期存活？——三道防线全部有盲区

| 防线 | 覆盖范围 | 为什么漏掉 |
|---|---|---|
| `ignoreDeadLinks: false` | 只校验 **markdown 正文**里的链接 | `themeConfig.nav/sidebar` 与 `.vue` 里的 `<a href>` 不在范围内 |
| `build/check-docs-links.cjs` | 只扫 `[文本](链接)` 语法 | 同上；且它把 `/components/` 这类目录页视为合法，反而「通过」 |
| `vitepress preview` 本地预览 | sirv 会做「无扩展名 → `.html`」回退 | **恰好把 `.html` 缺失问题掩盖掉** |

实测确认 preview 掩盖问题（顺带发现 preview 自身也有 base 不一致问题）：

```js
// node_modules/vitepress/dist/node/serve-dMCSG9dM.js:63673  serve()
const config = await resolveConfig(options.root, "serve", "production");
// 注意：这里并不会设置 process.env.NODE_ENV，
// 因此 config.js 的 SITE_BASE 取到 '/'，与真实产物 base=/fei-ui-design/ 不一致
```

```
$ node 起 vitepress serve 实测
Built site served at http://localhost:8126/        ← 无 base 前缀
状态    路径
404    /fei-ui-design/                              ← 全挂
404    /fei-ui-design/guide/introduction.html      ← 全挂
200    /guide/introduction                         ← sirv 自动补 .html，看不到问题
```

### 步骤 7：用「纯静态托管」复现并全量扫描

线上是 Gitee Pages / GitHub Pages 这类静态托管：按路径原样取文件，**不做无扩展名重写，也不做 SPA fallback**。
用一个不做任何重写的静态服务器即可复现：

| 请求路径 | 状态 | 说明 |
|---|---|---|
| `/fei-ui-design/` | 200 | 首页 |
| `/fei-ui-design/index.html` | 200 | |
| `/fei-ui-design/guide/introduction.html` | 200 | VitePress markdown 链接形态 |
| `/fei-ui-design/guide/introduction` | **404** | 侧边栏形态（缺 `.html`） |
| `/fei-ui-design/components/button` | **404** | 侧边栏形态（缺 `.html`） |
| `/fei-ui-design/components/button.html` | 200 | 顶部导航形态 |
| `/fei-ui-design/guide/` | 200 | 目录形式 |
| `/fei-ui-design/components/` | 200 | 目录形式 |
| `/guide/introduction` | **404** | 翻页按钮（缺 base） |
| `/logos/f-ui-logo.png` | **404** | 该路径不存在 |
| `/fei-ui-design/logos/f-ui-logo.png` | 200 | 真实位置 |

**一个需要澄清的「疑似问题」**：`Navbar.vue` 里写的是 `<img src="/logos/f-ui-logo.png">`（无 base），
看起来也会 404，但实际正常 —— **Vite 在构建期会自动为模板里的 `src="/..."` 补上 base**：

```bash
$ grep -o '/fei-ui-design/logos/f-ui-logo[a-z-]*\.png' site/assets/chunks/theme.*.js
/fei-ui-design/logos/f-ui-logo-white.png
/fei-ui-design/logos/f-ui-logo.png
```

同样地 `HomeComponents.vue` 的 `/home/*.png` 在产物中也都带了 base。
**注意这个机制只作用于 `src`，不作用于 `<a href>`** —— 绑定表达式（`:href="link"`）更是完全不处理。

---

## 3. 根因总结

同一份 `themeConfig`，被四条不同的渲染路径消费，每条路径各自决定「要不要补 base」「要不要补 `.html`」：

```
themeConfig.sidebar / nav  （已由 config.js 的 link() 补过 base）
        │
        ├── NavLink.vue        →  + ensureExt()   →  ✅ base + .html
        ├── SidebarLink.vue    →  原样输出        →  ❌ base，无 .html
        └── Footer.vue         →  + withBase()    →  ❌ base，无 .html（且路径是裸的）

Page.vue 的 prev/next  →  硬编码兜底对象         →  ❌ 连 base 都没有
```

**根本原因是「链接生成没有单一出口」**：base 在 `config.js` 拼、扩展名在组件里拼，
两件事分散在两层，任何一处遗漏都不会在构建期或现有检查中报错。
叠加 `cleanUrls: false` 下「URL 必须带 `.html`」这一硬约束，最终表现为「点击导航按钮 404」。

---

## 4. 已应用的修复

| 文件 | 改动 |
|---|---|
| `docs/.vitepress/theme/util/index.js` | 新增 `siteHref(raw, base)`：统一的「补 base + 补 `.html`」出口，对**已带 base 的路径做识别**（避免 `withBase` 重复拼接），对目录页（以 `/` 结尾）保持原样 |
| `docs/.vitepress/theme/components/SidebarLink.vue` | `:href="item.link"` → `:href="href"`，走 `siteHref()`；`active` 判定逻辑保持不变 |
| `docs/.vitepress/theme/components/Footer.vue` | 去掉 `withBase()`，改用 `siteHref()` |
| `docs/.vitepress/theme/components/Page.vue` | ① 删除硬编码兜底 `{path:'/guide/introduction'}`；② `prev/next === false` 时正确返回 `undefined`（原逻辑反了）；③ 重写 `find()`，按 `link`/`path` 用 `normalize()` 比对当前路由，使翻页按钮真正可用；④ 不再访问不存在的 `site.value.pages`，消除潜在崩溃 |
| `build/check-site-links.cjs`（新增） | 产物级回归护栏，见下节 |
| `build/check-docs-links.cjs` | 修正一处误报：只跳过围栏代码块、未跳过**行内代码**，会把文档里作为示例的 markdown 链接语法当成真链接 |
| `package.json` | 新增 `docs:check-site` 脚本 |
| `.github/workflows/ci.yml` | `docs` 任务在 `build:site` 之后新增一步 `pnpm run docs:check-site` |

新核心函数：

```js
export function siteHref (raw, base = '/') {
  if (!raw) return raw
  if (isExternal(raw)) return raw
  const prefix = String(base || '/').replace(/\/$/, '')
  const path = prefix && !raw.startsWith(prefix) ? prefix + raw : raw
  return ensureExt(path)
}
```

设计要点：`withBase()` 不幂等，所以不能无脑叠加；把「识别是否已带 base」这一步收进函数内部，
使 `siteHref('/guide/x')` 与 `siteHref('/fei-ui-design/guide/x')` 都能得到正确结果，
调用方不必关心 config 里的链接处于哪种约定。

改动共 7 个文件（另新增 2 个）、+84 / −22 行。

---

## 4.1 第二轮修复（导航功能缺失类，非 404）

上一轮列在第 7 节的遗留项已全部处理完（详见第 7 节状态表），涉及：

| 文件 | 改动 |
|---|---|
| `docs/.vitepress/theme/components/NavLinks.vue` | **修复「指南」下拉不生效**：`userLinks` 改为 `themeConfig.nav.map(item => resolveNavLinkItem({...item}))`。原先直接返回 `themeConfig.nav`，`item.type` 恒为 `undefined`，`v-if="item.type === 'links'"` 永远为假，`DropdownLink` 从未渲染 → 5 个子项不可达。传 `{...item}` 是为了不让 `Object.assign` 污染 `siteData` |
| `docs/.vitepress/config.js` | ① **`link()` 不再拼 base**，只声明站点根相对路径（`base` 由渲染层单点拼接），消除「路径可带可不带 base」的双约定；② 补 `editLinks: true` 与 `docsBranch: 'master'`（前者缺失是「编辑此页」没 href 的直接原因）；③ 首页 nav 由 `SITE_BASE` 改为 `link('')` |
| `docs/.vitepress/theme/components/Page.vue` | **修复 `editLink` 取错字段**：改用 `page.relativePath`（原先读 `page.path`，而 VitePress 的 `page` 就是 `route.data`，**没有 `path` 字段**，`normalize(undefined)` 会拼出 `.../docsundefined.md`） |
| `docs/.vitepress/theme/components/NavLink.vue` | `ensureExt(item.link)` → `siteHref(item.link, base)`，与其余渲染路径统一 |
| `docs/.vitepress/theme/components/SidebarGroup.vue` | `:href="item.link"` → `siteHref(...)`（分组标题带 link 时才会渲染，属防御性修正） |
| `docs/.vitepress/theme/components/Home.vue` | 首页 hero 按钮 `withBase()` → `siteHref()`（原先靠 `NavLink` 再补一次扩展名，两套约定叠加） |
| `docs/.vitepress/theme/components/Navbar.vue` | home 链接 `withBase('/')` → `siteHref('/', base)`，`withBase` 彻底退出站内链接生成 |
| `docs/.vitepress/theme/util/index.js` | `siteHref` 的文档注释同步更新（不再说「themeConfig 里的链接已拼过 base」） |

> **关键设计取舍**：之所以让 `link()` 只写相对路径而**保留函数名与全部调用点**（60+ 处），
> 是不想为语义调整制造一个巨大且难审的 diff —— 只改函数体一行，调用方的可读性不变，
> 而「base 从哪来」这件事从此只有一处答案。

---

## 5. 验证结果

### 5.1 构建与既有检查

```
✓ vitepress build docs             exit=0   （build complete in 91.65s）
✓ 产物页面完整                     74 个源 md → 75 个 html（含 404.html）
✓ docs:check（api/死链/示例/格式）  exit=0
✓ docs:check-site（新增）           exit=0
```

> 加了 `build/check-docs-links.cjs` 的行内代码遮蔽后做了反向自检，
> 确认真实死链仍能被抓到（`exit=1`），行内示例不再误报。

### 5.2 新增护栏脚本

```bash
$ pnpm run docs:check-site
[site-links] base = /fei-ui-design/
[site-links] 源 markdown 页面 74 个，产物 html 75 个
✓ 产物页面完整，所有站内链接均可命中
```

它做两件事：

1. **源/产物对照** —— 每个 markdown 页面都必须生成对应 `.html`（防止陈旧产物静默上线）
2. **链接体检** —— 扫描产物中所有站内 `href` / `src`，逐段做**大小写敏感**比对
   （Windows 文件系统不区分大小写，而 Gitee / GitHub Pages 跑在 Linux 上严格区分，
   本地「看着没问题、线上 404」有一类就是这么来的）

护栏自身做了反向自检，确认能抓到问题：

```
$ # 注入一个大小写错误的链接
$ node build/check-site-links.cjs
✗ 有 1 个站内链接在静态托管上命不中文件：
    /fei-ui-design/components/Affix.html
      （1 个页面）components/__probe.html
exit=1
```

### 5.3 端到端 HTTP 验证

起一个不做任何重写的静态服务器，把产物里出现的**每一个**站内链接都真实请求一遍：

```
=== 端到端静态托管验证 ===
junction ok = True；site html 中出现的站内链接（去重）= 170 条
✓ 全部 170 条站内链接均返回 200
```

### 5.4 修复前后的实际 href 对比

| 位置 | 修复前 | 修复后 |
|---|---|---|
| 侧边栏 | `<a href="/fei-ui-design/components/button" class="sidebar-link active">` | `<a href="/fei-ui-design/components/button.html" ...>` |
| 翻页（按钮页） | `<a href="/guide/introduction">`（无 prev） | `prev → /fei-ui-design/components/icon.html`（图标）<br>`next → /fei-ui-design/components/button-group.html`（按钮组） |
| 页脚 | `/fei-ui-design/guide/introduction` | `/fei-ui-design/guide/introduction.html` |

翻页按钮修复后指向「图标 ← 按钮 → 按钮组」，与侧边栏分组顺序一致，说明顺序计算正确。

### 5.5 第二轮修复的验证

**（1）回归对照：链接集合完全没变**

先把修改前 `site/` 里每个页面的内部 `href/src` 抽成快照，改完重建后再比对（剔除每次重建都会变的 `assets/` 哈希文件名）：

```
页面数：修改前 75，修改后 75
消失的链接：0 个
新增的链接：0 个
```

改的是「谁来拼 base」，产物链接应当**逐条不变** —— 0/0 正是预期结果，说明没有修一处坏一处。

**（2）「编辑此页」拿到真实 href**

```
guide/introduction.html  →  href="https://github.com/ymf-930/fei-ui-design/edit/master/docs/guide/introduction.md"
components/button.html   →  href="https://github.com/ymf-930/fei-ui-design/edit/master/docs/components/button.md"
index.html               →  首页无标题栏，本就不渲染该按钮（预期）
```

修改前是 `<li title="Edit Page"><a target="_blank">` —— **完全没有 href 属性**。

**（3）「指南」下拉：必须用真实渲染链路验证**

这里踩到一个方法上的坑，值得记下来：

> `Layout.vue` 把 `Navbar` 包在 `<ClientOnly>` 里，所以**整条顶部导航在静态产物中是零输出的**
> （`nav-links` / `nav-item` / `nav-dropdown` / `nav-link` 在 `site/**.html` 中出现次数均为 **0**）。
> 也就是说，这类问题**任何基于产物 HTML 的扫描都发现不了**，第 5.2 节那个护栏脚本同样覆盖不到。

因此改用「探针构建」取证：临时把 Navbar 外层的 `ClientOnly` 去掉，用 `--outDir` 构建到独立目录，
从产物中读取真实的 SSR DOM，然后立即还原源文件。取证结果：

```
nav-links 出现次数      = 1
nav-item 出现次数       = 3
nav-dropdown 出现次数   = 1
dropdown-item 出现次数  = 5
下拉子项数量 = 5
  介绍          -> /fei-ui-design/guide/introduction.html
  安装          -> /fei-ui-design/guide/installation.html
  在 SFC 中使用  -> /fei-ui-design/guide/usage-sfc.html
  按需引入       -> /fei-ui-design/guide/import-on-demand.html
  变更日志       -> /fei-ui-design/guide/changelog.html
顶层 nav：/fei-ui-design/ 、/fei-ui-design/guide/introduction.html 、/fei-ui-design/components/button.html
```

5 个子项全部带 base 与 `.html`，5 个目标文件在 `site/guide/` 下均真实存在。
`Layout.vue` 还原后与备份**逐字符相等**，`git diff` 为空；探针产物目录已删除。

> 探针只影响验证产物，`site/` 全程由正常构建生成，**未参与本次取证**。

### 5.6 第二轮修复后的完整校验

```
✓ vitepress build docs            exit=0   （build complete in 81.74s）
✓ docs:check（api/死链/示例/格式）  exit=0
✓ docs:check-site（产物护栏）       exit=0
✓ 端到端静态托管                  170 条站内链接全部 200
```

---

## 6. 可复现的验证方式

### 6.1 本地 / CI（推荐，已接入）

```bash
pnpm run build:site        # 必须先生成 site/ 产物
pnpm run docs:check-site   # 页面完整性 + 全量站内链接可达性
```

### 6.2 线上部署验证（针对真实托管）

对线上域名逐个验证关键路径，确认托管是否支持无扩展名：

```bash
BASE=https://ymf-930.gitee.io/fei-ui-design
for p in / /guide/ /components/ /guide/introduction.html \
         /components/button.html /guide/introduction /components/button; do
  printf '%s  %s\n' "$(curl -o /dev/null -s -w '%{http_code}' "$BASE$p")" "$p"
done
```

判读方式：

- `/guide/introduction` **200** → 该托管支持无扩展名回退（`.html` 缺失不会致命）
- `/guide/introduction` **404** → 托管不回退，站内链接必须带 `.html`（本次修复即按此假设）

### 6.3 排查时的一个提醒

**不要用 `vitepress preview` 判断线上链接是否正常。** 本次实测它同时有两处失真：

1. sirv 会自动把 `/guide/introduction` 解析到 `introduction.html`，掩盖缺扩展名问题
2. `serve()` 不设置 `NODE_ENV`，导致 config.js 的 `SITE_BASE` 取 `'/'`，
   与真实产物 `base=/fei-ui-design/` 不一致，反而让所有带 base 的链接全 404

要复现线上行为，应该用一个不做任何路径重写的静态服务器直接托管 `site/`。

---

## 7. 遗留问题：状态与新增发现

### 7.1 原遗留项已全部处理

| # | 问题 | 状态 |
|---|---|---|
| 1 | 顶部导航「指南」下拉不生效 | ✅ 已修（`NavLinks.vue` 走 `resolveNavLinkItem`），见 5.5（3）取证 |
| 2 | 「编辑此页」按钮无链接 | ✅ 已修（补 `editLinks` + 改用 `page.relativePath`），见 5.5（2） |
| 3 | `.vitepress` 下的 Vite 临时文件 | ✅ 已清理（`*.timestamp-*.mjs` 早已在 `.gitignore` 中，两个残留文件已删除） |
| 4 | 面包屑示例里的 `href="/"` | ⬜ 未改，见下 |
| 5 | 结构性建议：链接生成收敛到单一出口 | ✅ 已做（`link()` 不再拼 base，`withBase` 退出站内链接生成） |

第 4 项保持不动的理由：它是**组件示例的演示内容**（面包屑的占位锚点），
指向域名根在示例语义上是合理的；改它属于改文档内容而非修缺陷。
它仍在 `build/check-site-links.cjs` 的 `ALLOWLIST` 中，不会阻断 CI。

### 7.2 本轮新发现（未改，建议单独评估）

1. **顶部导航是 SSR 盲区 —— 护栏脚本覆盖不到它**

   `Layout.vue` 把 `Navbar` 包在 `<ClientOnly>` 中，整条顶部导航在静态产物里零输出
   （`site/**.html` 中 `nav-links` / `nav-dropdown` 出现次数均为 0）。
   `docs:check-site` 是产物级扫描，因此**天然看不见这类问题**；
   本轮是靠「临时去掉 ClientOnly 的探针构建」才拿到证据的。

   若要长期防住这一类，只能引入真实浏览器断言（本项目目前没有 e2e）。
   在补上之前，**改导航相关组件时要人工确认**，别指望 CI。

2. **「编辑此页」在远端合并前会对新页面 404（配置正确，是快照滞后）**

   实测本仓 `origin/master`（Gitee）与 `github.com/ymf-930/fei-ui-design` **都有 `docs/` 目录与
   `docs/guide/*.md`，但都没有 `docs/components/button-group.md`** —— 远端停在旧快照上。
   所以 `button-group` 这类新增页的编辑链接现在打不开，`changelog` 这类老页面正常。

   这不是配置错误：`docsBranch: 'master'` 是文档站该用的默认值。
   等本轮分支合并进 `master` 并推送后，全部页面自然生效。
   若希望编辑链接指向别处（例如 Gitee 仓），只需加一行 `docsRepo`，
   **不必动 `repo`**（`repo` 还驱动导航栏的 GitHub 图标）。

   > 顺带记录一个易踩的点：`themeConfig.repo` 写的是 GitHub，而 `git remote origin`
   > 是 Gitee（`gitee.com/ymf930/f-ui-design`），两者不是同一个仓库。目前
   > 导航栏图标、Bug 上报、编辑链接都统一指向 GitHub 的 `ymf-930/fei-ui-design`，行为一致。

3. **侧边栏「当前分组自动展开」是死代码（当前无害）**

   `SidebarLinks.vue` 的 `resolveOpenGroupIndex()` 用 `c.type === 'page' && isActive(route, c.path)`
   判断，但侧边栏项经 `resolveItem()` 是**原样透传**的，只有 `{title, link, icon, alias}`，
   没有 `type` / `path` —— 与 `Page.vue` 那个 `find()` 是同一个坑（本报告 4 节已修）。
   且 `watch(() => route, ...)` 依赖的 `route` 是 Ref 对象本身、永不变化，
   所以刷新索引的函数根本不会触发；同文件里还有一个同名局部 `isActive` 遮蔽了导入的版本，
   且带一句 `console.log(page)`。

   **之所以现在无害**：`theme/index.ts` 里 `vsTheme.sidebarCollapseOpen = true`，
   `:open` 短路求值后所有分组恒为展开。一旦有人把它改成 `false`，
   侧边栏就会永久只展开第一个分组，且当前页在哪个分组也不会有提示。

4. **`SidebarLinks.vue` 的 active 判定耦合了 `.html` 长度**

   `item.link === route.path.slice(0,-5)` 依赖「`route.path` 恰好以 `.html` 结尾」，
   属于隐式约定；`util.isActive()` 已能正确处理这种比较。建议后续替换。

5. **`SidebarGroup.vue` 用了 `@click.native`**

   `.native` 修饰符在 Vue 3 已移除（会被忽略），此处绑定的 `$emit('toggle')` 实际不生效。
   当前所有分组恒展开，所以没暴露出来。

---

## 附录：修复前完整出错链接清单

### A. 缺 base 前缀（任何托管都 404）

| 链接 | 出现页面数 |
|---|---|
| `/guide/introduction` | 74（全部页面，含 `404.html`） |
| `/` | 1（`components/breadcrumb.html`） |

### B. 带正确 base 但缺 `.html`（纯静态托管 404）

**侧边栏 · 组件类（59 条，各出现于 60 个页面）**

```
/fei-ui-design/components/{affix, alert, anchor, back-top, badge, breadcrumb, button,
  button-group, calendar, card, carousel, cascader, checkbox, circle, collapse,
  color-picker, config-provider, count-to, date-picker, desc, divider, drawer,
  dropdown, empty, form, grid, icon, input, input-number, layout, loading,
  loading-bar, menu, message, message-box, modal, notice, page, popover, popper,
  progress, radio, rate, scrollbar, select, skeleton, slider, space, split, steps,
  switch, table, tabs, tag, time-picker, timeline, tooltip, tree, upload}
```

**侧边栏 · 指南类（12 条，各出现于 13 个页面）**

```
/fei-ui-design/guide/{changelog, color-design, common-api, common-css,
  common-directive, common-transition, custom-theme, import-on-demand,
  installation, introduction, jsx, usage-sfc}
```

**页脚（4 条，各出现于 74 个页面）**

```
/fei-ui-design/guide/introduction      （介绍 / 文档）
/fei-ui-design/guide/installation      （快速上手）
/fei-ui-design/guide/jsx               （指南）
/fei-ui-design/components/button       （组件）
```
