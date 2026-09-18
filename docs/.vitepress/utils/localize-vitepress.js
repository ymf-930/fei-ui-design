/**
 * 把 VitePress 自己生成、且**硬编码为英文**的界面文案换成中文。
 *
 * ## 为什么需要这一步
 *
 * VitePress 有一部分界面文案是**写在框架源码里**的，既不走 `themeConfig`，
 * 也没有 i18n 钩子。最典型的就是代码块右上角的复制按钮 —— 1.0.0-rc.35 的
 * `markdown/plugins/highlight.ts` 里直接拼了：
 *
 * ```js
 * return `<div class="language-${lang}">…<button title="Copy Code" class="copy"></button>…`
 * ```
 *
 * 这串 HTML 在**渲染期**（不是 token 期）才生成，所以：
 * - 在 `themeConfig` 里配不出来（rc.35 没有 `copyCodeTooltip` 之类的键，
 *   那是更晚的版本才加的）；
 * - 用 `md.core.ruler` / `md.renderer.rules` 钩子也抓不到 —— 字符串是在
 *   fence 渲染函数内部拼的，钩子能拿到的只有最终 HTML。
 *
 * 因此唯一的落点是**包一层 `md.render`，对渲染结果做一次定向替换**。
 * 已核对 `node_modules/vitepress/dist/**` 中所有 `title="大写开头"` 的硬编码文案，
 * **只有 `Copy Code` 一条**（其余界面文案 —— 上一页/下一页、最后更新、
 * 编辑此页、目录标题等 —— 都由主题组件自己渲染或走 `themeConfig`，已在
 * theme/ 与 config.js 中中文化）。
 *
 * ## 为什么匹配整只 `<button …>` 标签
 *
 * 不能裸替 `title="Copy Code"`：文档里的代码示例经过 shiki 着色后，
 * 引号是原样的（只有 `<`/`>` 被转义成 `&lt;`/`&gt;`），
 * 一篇讲「怎么自定义代码块」的文档完全可能原样印出这段字符串，
 * 裸替会把示例内容也改掉。加上 `<button` 前缀后，HTML 里的标签必然是
 * 真按钮（示例里的 `<` 已被转义，永远匹配不上），既准确又安全。
 */

/** @type {Array<[RegExp, (tag: string) => string]>} */
const RULES = [
  [
    // 只匹配真实的 <button …> 开始标签，且该标签带 title="Copy Code"
    /<button\b[^>]*\btitle="Copy Code"[^>]*>/g,
    (tag) => tag.replace('title="Copy Code"', 'title="复制代码"'),
  ],
]

/**
 * markdown-it 插件：包一层 `md.render`，对产物做定向中文化。
 *
 * 顺序上建议放在 `createSearchIndex().plugin` **之前** ——
 * 这样搜索索引收集到的是已中文化的 HTML（虽然本场景只改属性、对索引无影响，
 * 但「先本地化、再索引」在语义上更清楚，将来若替换正文文案也不会漏）。
 *
 * @param {any} md markdown-it 实例
 */
export function vitepressUiLocalizer (md) {
  const render = md.render.bind(md)
  md.render = (src, env) => {
    let html = render(src, env)
    for (const [re, replacer] of RULES) {
      html = html.replace(re, replacer)
    }
    return html
  }
}
