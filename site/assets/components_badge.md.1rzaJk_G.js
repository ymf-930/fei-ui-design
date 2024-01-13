import{_ as e,V as A,o as n,j as p,w as s,e as t,L as i,c as d,a as E,f as D}from"./chunks/framework.poAQ63CV.js";const F={};function r(k,l){const C=A("f-button"),a=A("f-badge"),h=A("f-space");return n(),p(h,{size:24},{default:s(()=>[i(a,{value:"hot"},{default:s(()=>[i(C,null,{default:s(()=>[t("热点")]),_:1})]),_:1}),i(a,{value:"new"},{default:s(()=>[i(C,null,{default:s(()=>[t("回复")]),_:1})]),_:1}),i(a,{"is-dot":""},{default:s(()=>[t("红点模式")]),_:1})]),_:1})}const B=e(F,[["render",r]]),g={};function y(k,l){const C=A("f-button"),a=A("f-badge"),h=A("f-space");return n(),p(h,{size:24},{default:s(()=>[i(a,{value:12},{default:s(()=>[i(C,null,{default:s(()=>[t("普通按钮")]),_:1})]),_:1}),i(a,{value:3},{default:s(()=>[i(C,null,{default:s(()=>[t("回复")]),_:1})]),_:1}),i(a,{value:1,type:"primary"},{default:s(()=>[i(C,null,{default:s(()=>[t("primary徽标")]),_:1})]),_:1}),i(a,{value:2,type:"warning"},{default:s(()=>[i(C,null,{default:s(()=>[t("warning徽标")]),_:1})]),_:1}),i(a,{value:"ok",type:"success"},{default:s(()=>[i(C,null,{default:s(()=>[t("success徽标")]),_:1})]),_:1}),i(a,{value:200,max:99},{default:s(()=>[i(C,null,{default:s(()=>[t("最大数值")]),_:1})]),_:1})]),_:1})}const o=e(g,[["render",y]]),c=E("h1",{id:"标记-badge",tabindex:"-1"},[t("标记 Badge "),E("a",{class:"header-anchor",href:"#标记-badge","aria-label":'Permalink to "标记 Badge"'},"​")],-1),f=E("p",null,"空显示状态，用于给内部无数据情况的展示。十分简单",-1),u=E("h2",{id:"基础用法",tabindex:"-1"},[t("基础用法 "),E("a",{class:"header-anchor",href:"#基础用法","aria-label":'Permalink to "基础用法"'},"​")],-1),b=E("p",null,"基础的徽标用法",-1),_=E("h2",{id:"自定义提示内容",tabindex:"-1"},[t("自定义提示内容 "),E("a",{class:"header-anchor",href:"#自定义提示内容","aria-label":'Permalink to "自定义提示内容"'},"​")],-1),m=E("p",null,"可以提示非数字的徽标",-1),x=D('<h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>value</td><td>显示值</td><td>string, number</td><td>—</td><td>—</td></tr><tr><td>max</td><td>最大值，超过最大值会显示 &#39;{max}+&#39;</td><td>number</td><td>—</td><td>—</td></tr><tr><td>is-dot</td><td>小圆点</td><td>boolean</td><td>—</td><td>false</td></tr><tr><td>hidden</td><td>隐藏 badge</td><td>boolean</td><td>—</td><td>false</td></tr><tr><td>type</td><td>类型</td><td>string</td><td>primary / success / warning / danger / info</td><td>—</td></tr></tbody></table>',2),P=JSON.parse('{"title":"标记 Badge","description":"","frontmatter":{"title":"标记 Badge"},"headers":[],"relativePath":"components/badge.md","filePath":"components/badge.md","lastUpdated":1704731654000}'),v={name:"components/badge.md"},N=Object.assign(v,{setup(k){return(l,C)=>{const a=A("demo-preview");return n(),d("div",null,[c,f,u,b,i(a,{title:"",description:"",code:"%3Ctemplate%3E%0D%0A%20%20%3Cf-space%20:size=%2224%22%3E%0D%0A%20%20%20%20%3Cf-badge%20:value=%2212%22%3E%0D%0A%20%20%20%20%20%20%3Cf-button%3E%E6%99%AE%E9%80%9A%E6%8C%89%E9%92%AE%3C/f-button%3E%0D%0A%20%20%20%20%3C/f-badge%3E%0D%0A%20%20%20%20%3Cf-badge%20:value=%223%22%3E%0D%0A%20%20%20%20%20%20%3Cf-button%3E%E5%9B%9E%E5%A4%8D%3C/f-button%3E%0D%0A%20%20%20%20%3C/f-badge%3E%0D%0A%20%20%20%20%3Cf-badge%20:value=%221%22%20type=%22primary%22%3E%0D%0A%20%20%20%20%20%20%3Cf-button%3Eprimary%E5%BE%BD%E6%A0%87%3C/f-button%3E%0D%0A%20%20%20%20%3C/f-badge%3E%0D%0A%20%20%20%20%3Cf-badge%20:value=%222%22%20type=%22warning%22%3E%0D%0A%20%20%20%20%20%20%3Cf-button%3Ewarning%E5%BE%BD%E6%A0%87%3C/f-button%3E%0D%0A%20%20%20%20%3C/f-badge%3E%0D%0A%20%20%20%20%3Cf-badge%20value=%22ok%22%20type=%22success%22%3E%0D%0A%20%20%20%20%20%20%3Cf-button%3Esuccess%E5%BE%BD%E6%A0%87%3C/f-button%3E%0D%0A%20%20%20%20%3C/f-badge%3E%0D%0A%20%20%20%20%3Cf-badge%20:value=%22200%22%20:max=%2299%22%3E%0D%0A%20%20%20%20%20%20%3Cf-button%3E%E6%9C%80%E5%A4%A7%E6%95%B0%E5%80%BC%3C/f-button%3E%0D%0A%20%20%20%20%3C/f-badge%3E%0D%0A%20%20%3C/f-space%3E%0D%0A%3C/template%3E%0D%0A",showCode:"%3Cpre%20class%3D%22shiki%20shiki-themes%20slack-ochin%20rose-pine-moon%20vp-code%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-space%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Esize%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E24%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Evalue%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E12%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%E6%99%AE%E9%80%9A%E6%8C%89%E9%92%AE%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Evalue%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E3%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%E5%9B%9E%E5%A4%8D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Evalue%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E1%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20type%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22primary%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3Eprimary%E5%BE%BD%E6%A0%87%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Evalue%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E2%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20type%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22warning%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3Ewarning%E5%BE%BD%E6%A0%87%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20value%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22ok%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20type%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22success%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3Esuccess%E5%BE%BD%E6%A0%87%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Evalue%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E200%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Emax%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E99%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%E6%9C%80%E5%A4%A7%E6%95%B0%E5%80%BC%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-space%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",suffixName:"vue",absolutePath:"E:\\GitStore\\fei-ui-design\\docs\\components\\demo\\Badge\\Basic.vue",relativePath:"./demo/Badge/Basic.vue"},{default:s(()=>[i(o)]),_:1}),_,m,i(a,{title:"",description:"",code:"%3Ctemplate%3E%0D%0A%20%20%3Cf-space%20:size=%2224%22%3E%0D%0A%20%20%20%20%3Cf-badge%20value=%22hot%22%3E%0D%0A%20%20%20%20%20%20%3Cf-button%3E%E7%83%AD%E7%82%B9%3C/f-button%3E%0D%0A%20%20%20%20%3C/f-badge%3E%0D%0A%20%20%20%20%3Cf-badge%20value=%22new%22%3E%0D%0A%20%20%20%20%20%20%3Cf-button%3E%E5%9B%9E%E5%A4%8D%3C/f-button%3E%0D%0A%20%20%20%20%3C/f-badge%3E%0D%0A%20%20%20%20%3Cf-badge%20is-dot%3E%E7%BA%A2%E7%82%B9%E6%A8%A1%E5%BC%8F%3C/f-badge%3E%0D%0A%20%20%3C/f-space%3E%0D%0A%3C/template%3E%0D%0A",showCode:"%3Cpre%20class%3D%22shiki%20shiki-themes%20slack-ochin%20rose-pine-moon%20vp-code%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-space%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Esize%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E24%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20value%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22hot%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%E7%83%AD%E7%82%B9%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20value%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22new%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%E5%9B%9E%E5%A4%8D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20is-dot%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%E7%BA%A2%E7%82%B9%E6%A8%A1%E5%BC%8F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-badge%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-space%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",suffixName:"vue",absolutePath:"E:\\GitStore\\fei-ui-design\\docs\\components\\demo\\Badge\\Custom.vue",relativePath:"./demo/Badge/Custom.vue"},{default:s(()=>[i(B)]),_:1}),x])}}});export{P as __pageData,N as default};