import{_ as s,c as i,o as a,f as t}from"./chunks/framework.Jp5m_bdR.js";const g=JSON.parse('{"title":"JSX & TSX","description":"","frontmatter":{"title":"JSX & TSX"},"headers":[],"relativePath":"guide/jsx.md","filePath":"guide/jsx.md","lastUpdated":1704731654000}'),n={name:"guide/jsx.md"},h=t(`<h1 id="jsx-tsx" tabindex="-1">JSX &amp; TSX <a class="header-anchor" href="#jsx-tsx" aria-label="Permalink to &quot;JSX &amp; TSX&quot;">​</a></h1><h2 id="启用-jsx-tsx" tabindex="-1">启用 JSX &amp; TSX <a class="header-anchor" href="#启用-jsx-tsx" aria-label="Permalink to &quot;启用 JSX &amp; TSX&quot;">​</a></h2><p>关于启用 JSX 和 TSX，请参考你使用的工具链的相关文档。</p><h2 id="使用组件" tabindex="-1">使用组件 <a class="header-anchor" href="#使用组件" aria-label="Permalink to &quot;使用组件&quot;">​</a></h2><p>在JSX中，推荐直接引入的形式使用组件</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes rose-pine-moon rose-pine-moon vp-code"><code><span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">import </span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">{</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> defineComponent</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;"> }</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> from </span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&#39;vue&#39;</span></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">import </span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">{</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> FButton</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;"> }</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> from </span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&#39;fei-ui-design&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">export default </span><span style="--shiki-light:#EA9A97;--shiki-dark:#EA9A97;">defineComponent</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">(</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">{</span></span>
<span class="line"><span style="--shiki-light:#EA9A97;--shiki-dark:#EA9A97;">  render</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">()</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;"> {</span></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">    return </span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">&lt;</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">FButton</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">&gt;</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">{{</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> default: </span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">()</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> =&gt; </span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&#39;Star Kirby&#39;</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;"> }}</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">&lt;/</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">FButton</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">  }</span></span>
<span class="line"><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">}</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">)</span></span></code></pre></div>`,6),e=[h];function l(p,k,r,d,o,A){return a(),i("div",null,e)}const c=s(n,[["render",l]]);export{g as __pageData,c as default};