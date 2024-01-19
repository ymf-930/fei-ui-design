import{_ as C,V as e,o as h,j as A,w as t,a as s,d as p,c as k,L as a,e as l,f as r}from"./chunks/framework.poAQ63CV.js";const o={},B=s("div",{style:{height:"300px"}},"侧边栏",-1),D=s("div",null,"右侧容器",-1);function F(n,d){const i=e("f-layout");return h(),A(i,{"has-sider":""},{sider:t(()=>[B]),default:t(()=>[D]),_:1})}const c=C(o,[["render",F]]),y=s("h1",{id:"布局-layout",tabindex:"-1"},[l("布局 Layout "),s("a",{class:"header-anchor",href:"#布局-layout","aria-label":'Permalink to "布局 Layout"'},"​")],-1),g=s("h2",{id:"基础用法",tabindex:"-1"},[l("基础用法 "),s("a",{class:"header-anchor",href:"#基础用法","aria-label":'Permalink to "基础用法"'},"​")],-1),u=s("p",null,"目前暂时为简易左右布局，后续扩展",-1),_=r('<h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>hasSider</td><td>是否又侧边栏（目前为左侧）</td><td>Boolean</td><td>—</td><td>—</td></tr><tr><td>siderWidth</td><td>侧边栏宽度</td><td>Number</td><td>—</td><td>240</td></tr><tr><td>collapsedWidth</td><td>侧边栏折叠后宽度</td><td>Number</td><td>—</td><td>40</td></tr><tr><td>showToggle</td><td>是否显示折叠按钮</td><td>Boolean</td><td>—</td><td>true</td></tr><tr><td>showCollapsedContent</td><td>是否显示折叠后的内部区域</td><td>Boolean</td><td>—</td><td>false</td></tr><tr><td>contentStyle</td><td>右侧容器样式</td><td>Object</td><td>—</td><td>{}</td></tr></tbody></table>',2),x=JSON.parse('{"title":"布局 Layout","description":"","frontmatter":{"title":"布局 Layout"},"headers":[],"relativePath":"components/layout.md","filePath":"components/layout.md","lastUpdated":1704731654000}'),m={name:"components/layout.md"},v=p({...m,setup(n){return(d,i)=>{const E=e("demo-preview");return h(),k("div",null,[y,g,u,a(E,{title:"",description:"",code:"%3Ctemplate%3E%0D%0A%20%20%3Cf-layout%20has-sider%3E%0D%0A%20%20%20%20%3Ctemplate%20#sider%3E%0D%0A%20%20%20%20%20%20%3Cdiv%20style=%22height:%20300px%22%3E%E4%BE%A7%E8%BE%B9%E6%A0%8F%3C/div%3E%0D%0A%20%20%20%20%3C/template%3E%0D%0A%20%20%20%20%3Cdiv%3E%E5%8F%B3%E4%BE%A7%E5%AE%B9%E5%99%A8%3C/div%3E%0D%0A%20%20%3C/f-layout%3E%0D%0A%3C/template%3E%0D%0A",showCode:"%3Cpre%20class%3D%22shiki%20shiki-themes%20slack-ochin%20rose-pine-moon%20vp-code%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-layout%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20has-sider%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%23%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Esider%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20style%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3Eheight%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%20300%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%E4%BE%A7%E8%BE%B9%E6%A0%8F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%E5%8F%B3%E4%BE%A7%E5%AE%B9%E5%99%A8%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-layout%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",suffixName:"vue",absolutePath:"E:\\GitStore\\fei-ui-design\\docs\\components\\demo\\Layout\\Basic.vue",relativePath:"./demo/Layout/Basic.vue"},{default:t(()=>[a(c)]),_:1}),_])}}});export{x as __pageData,v as default};
