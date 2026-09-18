import fs from 'node:fs'
import path from 'node:path'

/**
 * 构建期生成本地搜索索引（`outDir/search-index.json`）。
 *
 * ## 为什么自己生成
 *
 * VitePress 1.0.0-rc.35 **没有**内置本地搜索 —— `themeConfig.search.provider: 'local'`
 * 与 `VPLocalSearchBox` 都是更晚的版本才提供的（`vitepress/theme` 在 rc.35 只导出
 * `VPImage`/`VPButton`/… 那一批，没有搜索组件）。而主题里那份
 * `theme/components/SearchBox.vue` 抄的是 **VuePress 0.x** 的实现，依赖
 * `site.pages`（`{title, headers, path}`）与 `$router`，这两样在 VitePress 1.x 都不存在：
 * 输入第一个字符就抛 `TypeError: Cannot read properties of undefined (reading 'length')`，
 * 下拉永远不出现，回车也跳不动。
 *
 * ## 做法
 *
 * 1. 挂到 markdown-it 实例上包一层 `render`：每渲染一页就把**渲染后的 HTML** 收进来，
 *    按 `<h2>/<h3>` 的真实 `id` 切小节 —— 用产物里的 id 而不是自己算 slug，
 *    锚点一定与页面一致（VitePress 的 slugify 规则没必要复刻）。
 * 2. `buildEnd` 时把累积结果写成 `outDir/search-index.json`，前端首次输入时懒加载。
 *
 * 索引字段：`{ path, title, sections: [{ title, id, text }] }`
 * 其中 `path` 是**站点根相对**路径（`/guide/introduction.html`），
 * base 由前端 `siteHref()` 拼接 —— 与全站其它链接同一套约定。
 */

const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/
const HEADING_RE = /<h([23])\b[^>]*\bid="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/g

// 每个小节的正文上限：整站索引别做太大（首次搜索时整包下载）
const MAX_SECTION_TEXT = 500
// 太短的小节（只有标题没有正文）不进索引，减少噪声
const MIN_SECTION_TEXT = 8

/** 去掉 HTML 标签与 Vue 注释，压平空白 */
function stripTags(html) {
  return String(html)
    .replace(/<!--[\s\S]*?-->/g, ' ')
    // 代码块整体丢掉：`<pre class="shiki">` 里是整段代码，留着会让
    // 「搜 f-button 命中全站」—— 正文里提到 API 的散文才是该被搜到的内容
    // （行内 `<code>` 保留：它常常就是那唯一一处 API 说明）。
    .replace(/<(script|style|pre)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    // VitePress 的标题锚点内容是 U+200B（零宽空格），产物里是**命名实体** `&ZeroWidthSpace;`。
    // 两种写法都要处理：JS 的 \s 不匹配 U+200B，漏掉的话每个小标题都拖着它进索引。
    .replace(/&(?:ZeroWidthSpace|zwnj|zwj|#8203|#x200b);/gi, '')
    .replace(/[\u200b-\u200d\ufeff]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** `guide/introduction.md` → `/guide/introduction.html`；`index.md` → `/` */
function toUrlPath (relativePath) {
  const noExt = relativePath.replace(/\\/g, '/').replace(/\.md$/, '')
  if (noExt === 'index' || noExt.endsWith('/index')) {
    return '/' + noExt.replace(/index$/, '')
  }
  return '/' + noExt + '.html'
}

/**
 * @returns {{ plugin: (md: any) => void, collect: (html: string, env: any) => void,
 *             docs: Map<string, any>, writeIndex: (outDir: string) => number }}
 */
export function createSearchIndex () {
  /** @type {Map<string, { path: string, title: string, sections: Array<{title:string,id:string,text:string}> }>} */
  const docs = new Map()
  /**
   * `transformPageData` 给出的**权威页面标题**（VitePress 自己算的：frontmatter.title
   * → 首个 h1 → 首个标题 → 文件名）。两条收集路径的先后顺序不保证，所以两边都兜：
   * markdown 插件先跑就存起来、后跑就直接改写已入索引的文档。
   */
  const titles = new Map()

  function setTitle (relativePath, title) {
    if (!relativePath || !title) return
    const clean = String(title).replace(/^["']|["']$/g, '').trim()
    if (!clean) return
    titles.set(relativePath, clean)
    const doc = docs.get(relativePath)
    if (doc) doc.title = clean
  }

  function collect (html, env) {
    const relativePath = env && env.relativePath
    if (!relativePath || !/\.md$/.test(relativePath)) return
    // 内部文档（srcExclude）不会走到这里，双保险
    if (relativePath.includes('.internal/')) return

    const body = stripTags(html)
    if (!body) return

    // 页标题：transformPageData → frontmatter.title → 文件名
    const fm = env.frontmatter || {}
    const title = titles.get(relativePath) ||
      String(fm.title || relativePath).replace(/^["']|["']$/g, '').trim()

    const sections = []
    const marks = []
    HEADING_RE.lastIndex = 0
    let m
    while ((m = HEADING_RE.exec(html))) {
      marks.push({
        level: Number(m[1]),
        id: m[2],
        title: stripTags(m[3]),
        // `index` = 标题标签起点，`start` = 标题标签之后的正文起点
        index: m.index,
        start: m.index + m[0].length,
      })
    }

    const push = (t, id, raw) => {
      const text = stripTags(raw).slice(0, MAX_SECTION_TEXT)
      if (text.length < MIN_SECTION_TEXT) return
      sections.push({ title: t, id: id || '', text })
    }

    if (!marks.length) {
      // 整页一个小节，锚点用页面本身
      push('', '', html)
    } else {
      // 第一个标题之前的导语
      if (marks[0].index > 0) push('', '', html.slice(0, marks[0].index))
      for (let i = 0; i < marks.length; i++) {
        const stop = i + 1 < marks.length ? marks[i + 1].index : html.length
        push(marks[i].title, marks[i].id, html.slice(marks[i].start, stop))
      }
    }

    if (!sections.length) return
    docs.set(relativePath, { path: toUrlPath(relativePath), title, sections })
  }

  function plugin (md) {
    const render = md.render.bind(md)
    md.render = (src, env) => {
      const html = render(src, env)
      try {
        collect(html, env)
      } catch (err) {
        // 索引失败绝不能影响站点构建
        console.warn('[search-index] 收集失败：', env && env.relativePath, err && err.message)
      }
      return html
    }
  }

  function writeIndex (outDir) {
    const list = [...docs.values()].sort((a, b) => a.path.localeCompare(b.path))
    const target = path.resolve(outDir, 'search-index.json')
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, JSON.stringify(list), 'utf8')
    return list.length
  }

  return { plugin, collect, setTitle, docs, writeIndex }
}
