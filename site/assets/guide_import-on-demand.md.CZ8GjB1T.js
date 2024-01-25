import{_ as i,c as s,o as a,f as t}from"./chunks/framework.Jp5m_bdR.js";const g=JSON.parse('{"title":"按需引入","description":"","frontmatter":{"title":"按需引入"},"headers":[],"relativePath":"guide/import-on-demand.md","filePath":"guide/import-on-demand.md","lastUpdated":1704731654000}'),n={name:"guide/import-on-demand.md"},l=t(`<h1 id="按需引入-tree-shaking" tabindex="-1">按需引入（Tree Shaking） <a class="header-anchor" href="#按需引入-tree-shaking" aria-label="Permalink to &quot;按需引入（Tree Shaking）&quot;">​</a></h1><p>F-UI-Design 支持 tree shaking，组件、语言、主题均可 tree-shaking。</p><p>了解更多关于主题设定的信息，参见 <a href="/fei-ui-design/docs/custom-theme.html">调整主题</a>。</p><h2 id="手动引入" tabindex="-1">手动引入 <a class="header-anchor" href="#手动引入" aria-label="Permalink to &quot;手动引入&quot;">​</a></h2><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes rose-pine-moon rose-pine-moon vp-code"><code><span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&lt;</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">script</span><span style="--shiki-light:#C4A7E7;--shiki-dark:#C4A7E7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> setup</span><span style="--shiki-light:#C4A7E7;--shiki-dark:#C4A7E7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> lang</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">=</span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&quot;ts&quot;</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">import </span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">{</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> FButton</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;"> }</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> from </span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&#39;fei-ui-design&#39;</span></span>
<span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&lt;/</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">script</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&lt;</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">template</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">  &lt;</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">div</span><span style="--shiki-light:#C4A7E7;--shiki-dark:#C4A7E7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> class</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">=</span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&quot;card&quot;</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">    &lt;</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">f-button</span><span style="--shiki-light:#C4A7E7;--shiki-dark:#C4A7E7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> type</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">=</span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&quot;primary&quot;</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">Primary Button</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&lt;/</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">f-button</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">    &lt;</span><span style="--shiki-light:#EB6F92;--shiki-dark:#EB6F92;">FButton</span><span style="--shiki-light:#C4A7E7;--shiki-dark:#C4A7E7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> type</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">=</span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&quot;primary&quot;</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">Primary Button</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&lt;/</span><span style="--shiki-light:#EB6F92;--shiki-dark:#EB6F92;">FButton</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">  &lt;/</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">div</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&lt;/</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">template</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span></code></pre></div><h2 id="自动引入" tabindex="-1">自动引入 <a class="header-anchor" href="#自动引入" aria-label="Permalink to &quot;自动引入&quot;">​</a></h2><p>可以借助插件 <code>unplugin-vue-components</code> 来自动的进行组件的引入。</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes rose-pine-moon rose-pine-moon vp-code"><code><span class="line"><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> vite.config.js</span></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">import </span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">{</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> defineConfig</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;"> }</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> from </span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&#39;vite&#39;</span></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">import </span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">vue</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> from </span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&#39;@vitejs/plugin-vue&#39;</span></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">import </span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">vueJsx</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> from </span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&#39;@vitejs/plugin-vue-jsx&#39;</span></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">import </span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">Components</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> from </span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&#39;unplugin-vue-components/vite&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">export default </span><span style="--shiki-light:#EA9A97;--shiki-dark:#EA9A97;">defineConfig</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">(</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">{</span></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">  plugins</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">:</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;"> [</span></span>
<span class="line"><span style="--shiki-light:#EA9A97;--shiki-dark:#EA9A97;">    vue</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">()</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">,</span></span>
<span class="line"><span style="--shiki-light:#EA9A97;--shiki-dark:#EA9A97;">    vueJsx</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">()</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">,</span></span>
<span class="line"><span style="--shiki-light:#EA9A97;--shiki-dark:#EA9A97;">    Components</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">(</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">{</span></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">      resolvers</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">:</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;"> [</span></span>
<span class="line"><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">        //</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 自动引入组件</span></span>
<span class="line"><span style="--shiki-light:#C4A7E7;--shiki-dark:#C4A7E7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">        componentName</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> =&gt; </span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">(</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">{</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> name</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">:</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> componentName</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">,</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> from</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">:</span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;"> &#39;fei-ui-design&#39;</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;"> }</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">)</span></span>
<span class="line"><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">      ]</span></span>
<span class="line"><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">    }</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">)</span></span>
<span class="line"><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">  ]</span></span>
<span class="line"><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">}</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">)</span></span></code></pre></div><h2 id="按需全局安装组件-手动" tabindex="-1">按需全局安装组件（手动） <a class="header-anchor" href="#按需全局安装组件-手动" aria-label="Permalink to &quot;按需全局安装组件（手动）&quot;">​</a></h2><p>组件库暴露了全部组件，指令，公共函数等。可以在配合自动引入，将公共的指令和帮助函数引入。便于管理</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes rose-pine-moon rose-pine-moon vp-code"><code><span class="line"><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> main.js</span></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">import </span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">{</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> createApp</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;"> }</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> from </span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&#39;vue&#39;</span></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">import </span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">{</span></span>
<span class="line"><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">  //</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> create UI 全局组件和指令安装器</span></span>
<span class="line"><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">  create</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">,</span></span>
<span class="line"><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">  //</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 部分指令</span></span>
<span class="line"><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">  ClickOutside</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">,</span></span>
<span class="line"><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">  //</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 组件</span></span>
<span class="line"><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">  FButton</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">,</span></span>
<span class="line"><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">  //</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 工具包</span></span>
<span class="line"><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">  Utils</span></span>
<span class="line"><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">}</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> from </span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&#39;fei-ui-design&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">const</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> UI</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> =</span><span style="--shiki-light:#EA9A97;--shiki-dark:#EA9A97;"> create</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">(</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">{</span></span>
<span class="line"><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">  components</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">:</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;"> [</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">FButton</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">]</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">,</span></span>
<span class="line"><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">  directives</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">:</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;"> [</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">ClickOutside</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">]</span></span>
<span class="line"><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">}</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">const</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> app</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;"> =</span><span style="--shiki-light:#EA9A97;--shiki-dark:#EA9A97;"> createApp</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">()</span></span>
<span class="line"><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">app</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">.</span><span style="--shiki-light:#EA9A97;--shiki-dark:#EA9A97;">use</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">(</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">UI</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">)</span></span>
<span class="line"><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">app</span><span style="--shiki-light:#3E8FB0;--shiki-dark:#3E8FB0;">.</span><span style="--shiki-light:#EA9A97;--shiki-dark:#EA9A97;">mount</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">(</span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&#39;#app&#39;</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">)</span></span></code></pre></div><p>这时候你就可以愉快的进行组件使用啦。</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes rose-pine-moon rose-pine-moon vp-code"><code><span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&lt;</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">template</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">  &lt;</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">div</span><span style="--shiki-light:#C4A7E7;--shiki-dark:#C4A7E7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> class</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">=</span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&quot;card&quot;</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">    &lt;</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">f-button</span><span style="--shiki-light:#C4A7E7;--shiki-dark:#C4A7E7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> type</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">=</span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&quot;primary&quot;</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">Primary Button</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&lt;/</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">f-button</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">    &lt;</span><span style="--shiki-light:#EB6F92;--shiki-dark:#EB6F92;">FButton</span><span style="--shiki-light:#C4A7E7;--shiki-dark:#C4A7E7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> type</span><span style="--shiki-light:#908CAA;--shiki-dark:#908CAA;">=</span><span style="--shiki-light:#F6C177;--shiki-dark:#F6C177;">&quot;primary&quot;</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span><span style="--shiki-light:#E0DEF4;--shiki-dark:#E0DEF4;">Primary Button</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&lt;/</span><span style="--shiki-light:#EB6F92;--shiki-dark:#EB6F92;">FButton</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">  &lt;/</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">div</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&lt;/</span><span style="--shiki-light:#9CCFD8;--shiki-dark:#9CCFD8;">template</span><span style="--shiki-light:#6E6A86;--shiki-dark:#6E6A86;">&gt;</span></span></code></pre></div>`,13),h=[l];function k(p,e,E,r,d,A){return a(),s("div",null,h)}const o=i(n,[["render",k]]);export{g as __pageData,o as default};
