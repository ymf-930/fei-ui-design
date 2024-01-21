import{U as b}from"./chunks/theme.ZIJtnzq8.js";import{d as y,q as C,c,a as t,F as n,U as i,L as g,t as s,f as w,V as $,o as e,m as d,e as p,ab as P,ac as V,_ as q}from"./chunks/framework.VDnCybDr.js";const _=h=>(P("data-v-d21bdcdf"),h=h(),V(),h),S=w('<h1 id="色彩设计" tabindex="-1" data-v-d21bdcdf>色彩设计 <a class="header-anchor" href="#色彩设计" aria-label="Permalink to &quot;色彩设计&quot;" data-v-d21bdcdf>​</a></h1><p data-v-d21bdcdf>F-UI-Design 默认具有一套较为美观的配色方案，在开发中也推荐使用一下色板来达到视觉统一效果</p><h2 id="设计原则" tabindex="-1" data-v-d21bdcdf>设计原则 <a class="header-anchor" href="#设计原则" aria-label="Permalink to &quot;设计原则&quot;" data-v-d21bdcdf>​</a></h2><p data-v-d21bdcdf>默认的色彩样式有5个主色调，并根据白色混入得到了若干个色板值，这些颜色基本可以满足中后台设计中对于颜色的要求</p><p data-v-d21bdcdf>颜色值的取值混合主要参考stylus的mix混合，js部分借助 <a href="https://www.npmjs.com/package/color" target="_blank" rel="noreferrer" data-v-d21bdcdf>color.js</a> 这个第三方库实现，组件中提供了部分转化函数，可以按需引入。</p><h2 id="主色" tabindex="-1" data-v-d21bdcdf>主色 <a class="header-anchor" href="#主色" aria-label="Permalink to &quot;主色&quot;" data-v-d21bdcdf>​</a></h2>',6),U={class:"color-wrap"},I=["onClick"],N={class:"color-wrap"},D=["onClick"],L={class:"color-wrap"},j=["onClick"],B={class:"color-wrap"},F=["onClick"],z={class:"color-wrap"},E=["onClick"],J=_(()=>t("h2",{id:"自定义色板",tabindex:"-1"},[p("自定义色板 "),t("a",{class:"header-anchor",href:"#自定义色板","aria-label":'Permalink to "自定义色板"'},"​")],-1)),O=_(()=>t("p",null,"如果自定的配色不能满足要求，则可以取如下色板，默认会给生成不同的色板值，可供使用",-1)),T={class:"color-wrap"},A=["onClick"],G={class:"color-wrap"},H=["onClick"],K={class:"color-wrap"},M=["onClick"],Q={class:"color-wrap"},R=["onClick"],W={class:"color-wrap"},X=["onClick"],Y={class:"color-wrap"},Z=["onClick"],x=_(()=>t("h2",{id:"中性色",tabindex:"-1"},[p("中性色 "),t("a",{class:"header-anchor",href:"#中性色","aria-label":'Permalink to "中性色"'},"​")],-1)),oo=_(()=>t("p",null,"中性色包含了黑、白、灰。在后台设计中被大量使用到，合理地选择中性色能够令页面信息具备良好的主次关关系。",-1)),to={class:"main-color"},lo=["onClick"],co={class:"main-color-value"},so=_(()=>t("h2",{id:"文字",tabindex:"-1"},[p("文字 "),t("a",{class:"header-anchor",href:"#文字","aria-label":'Permalink to "文字"'},"​")],-1)),eo=_(()=>t("p",null,"提供了几个文字颜色，色板中可自己定义使用",-1)),ao={class:"main-color"},ro=["onClick"],no={class:"main-color-value"},io=_(()=>t("h2",{id:"色板工具",tabindex:"-1"},[p("色板工具 "),t("a",{class:"header-anchor",href:"#色板工具","aria-label":'Permalink to "色板工具"'},"​")],-1)),uo=_(()=>t("p",null,"如果上面的色板还不能满足你的需求，你可以选择一个主色，这里会生成一个色板。",-1)),fo=_(()=>t("div",{class:"color-palette-pick t-center f-s-22 mb-20"},"选择你的主色",-1)),_o={class:"main-color"},po=["onClick"],ho={class:"main-color-value"},ko={class:"mt-20",flex:"cross:center"},vo={class:"ml-10"},bo=_(()=>t("p",{class:"ml-10 f-color-red f-s-12"},"注意：亮度和饱和度建议在70以上，以生成更好的效果",-1)),mo=_(()=>t("div",{style:{height:"100px"}},null,-1)),$o=JSON.parse('{"title":"色彩设计","description":"","frontmatter":{"title":"色彩设计"},"headers":[],"relativePath":"guide/color-design.md","filePath":"guide/color-design.md","lastUpdated":1705671162000}'),yo={name:"guide/color-design.md"},Co=y({...yo,setup(h){const a=C({primary:"#1a5cff",success:"#46c93a",info:"#1e1e1e",warning:"#ffba00",danger:"#ff4757",garyColor:["#ffffff","#fafafa","#f5f5f5","#f0f0f0","#d9d9d9","#bfbfbf","#8c8c8c","#595959","#434343","#262626","#1f1f1f","#141414","#000000"],textColor:["#17233d","#515a6e","#808695","#c5c8ce","#C0C4CC"],customColor1:"#722ed1",customColor2:"#eb2f96",customColor3:"#13c2c2",customColor4:"#a0d911",customColor5:"#fa541c",customColor6:"#2f54eb",custom:"#1a5cff",colorsList:["#1a5cff","#46c93a","#ffba00","#ff4757","#2f54eb","#faad14","#722ed1","#eb2f96","#13c2c2","#fadb14","#a0d911","#fa541c","#00bcd4"]}),f=k=>b.color.getPalette(k),r=k=>b.util.copy(k);return(k,v)=>{const m=$("f-color-picker");return e(),c("div",null,[S,t("div",U,[(e(!0),c(n,null,i(f(a.primary),(o,l)=>(e(),c("div",{class:"item",key:l,onClick:u=>r(o),title:"click to copy color",style:d({color:l<5?"#fff":"#333",background:o})},[t("span",null,"primary-"+s(l+1),1),t("span",null,s(o),1)],12,I))),128))]),t("div",N,[(e(!0),c(n,null,i(f(a.success),(o,l)=>(e(),c("div",{class:"item",key:l,onClick:u=>r(o),title:"click to copy color",style:d({color:l<5?"#fff":"#333",background:o})},[t("span",null,"success-"+s(l+1),1),t("span",null,s(o),1)],12,D))),128))]),t("div",L,[(e(!0),c(n,null,i(f(a.info),(o,l)=>(e(),c("div",{class:"item",key:l,title:"click to copy color",onClick:u=>r(o),style:d({color:l<5?"#fff":"#333",background:o})},[t("span",null,"info-"+s(l+1),1),t("span",null,s(o),1)],12,j))),128))]),t("div",B,[(e(!0),c(n,null,i(f(a.warning),(o,l)=>(e(),c("div",{class:"item",key:l,onClick:u=>r(o),title:"click to copy color",style:d({color:l<5?"#fff":"#333",background:o})},[t("span",null,"warning-"+s(l+1),1),t("span",null,s(o),1)],12,F))),128))]),t("div",z,[(e(!0),c(n,null,i(f(a.danger),(o,l)=>(e(),c("div",{class:"item",key:l,title:"click to copy color",onClick:u=>r(o),style:d({color:l<5?"#fff":"#333",background:o})},[t("span",null,"danger-"+s(l+1),1),t("span",null,s(o),1)],12,E))),128))]),J,O,t("div",T,[(e(!0),c(n,null,i(f(a.customColor1),(o,l)=>(e(),c("div",{class:"item",key:l,title:"click to copy color",onClick:u=>r(o),style:d({color:l<5?"#fff":"#333",background:o})},[t("span",null,"purple-"+s(l+1),1),t("span",null,s(o),1)],12,A))),128))]),t("div",G,[(e(!0),c(n,null,i(f(a.customColor2),(o,l)=>(e(),c("div",{class:"item",key:l,onClick:u=>r(o),title:"click to copy color",style:d({color:l<5?"#fff":"#333",background:o})},[t("span",null,"magenta-"+s(l+1),1),t("span",null,s(o),1)],12,H))),128))]),t("div",K,[(e(!0),c(n,null,i(f(a.customColor3),(o,l)=>(e(),c("div",{class:"item",key:l,onClick:u=>r(o),title:"click to copy color",style:d({color:l<5?"#fff":"#333",background:o})},[t("span",null,"cyan-"+s(l+1),1),t("span",null,s(o),1)],12,M))),128))]),t("div",Q,[(e(!0),c(n,null,i(f(a.customColor4),(o,l)=>(e(),c("div",{class:"item",key:l,onClick:u=>r(o),title:"click to copy color",style:d({color:l<5?"#fff":"#333",background:o})},[t("span",null,"lime-"+s(l+1),1),t("span",null,s(o),1)],12,R))),128))]),t("div",W,[(e(!0),c(n,null,i(f(a.customColor5),(o,l)=>(e(),c("div",{class:"item",key:l,onClick:u=>r(o),title:"click to copy color",style:d({color:l<5?"#fff":"#333",background:o})},[t("span",null,"volcano-"+s(l+1),1),t("span",null,s(o),1)],12,X))),128))]),t("div",Y,[(e(!0),c(n,null,i(f(a.customColor6),(o,l)=>(e(),c("div",{class:"item",key:l,title:"click to copy color",onClick:u=>r(o),style:d({color:l<5?"#fff":"#333",background:o})},[t("span",null,"geekblue-"+s(l+1),1),t("span",null,s(o),1)],12,Z))),128))]),x,oo,t("div",to,[(e(!0),c(n,null,i(a.garyColor,(o,l)=>(e(),c("div",{class:"main-color-item",key:l,title:"click to copy color",onClick:u=>r(o),style:d({background:o,color:l>5?"#fff":"rgba(0,0,0,.85)"})},[p(" gary-"+s(l+1)+" ",1),t("span",co,s(o),1)],12,lo))),128))]),so,eo,t("div",ao,[(e(!0),c(n,null,i(a.textColor,(o,l)=>(e(),c("div",{class:"main-color-item",key:l,title:"click to copy color",onClick:u=>r(o),style:d({background:o,color:l<3?"#fff":"rgba(0,0,0,.85)"})},[p(" text-"+s(l+1)+" ",1),t("span",no,s(o),1)],12,ro))),128))]),io,uo,fo,t("div",_o,[(e(!0),c(n,null,i(f(a.custom),(o,l)=>(e(),c("div",{class:"main-color-item",key:l,title:"click to copy color",onClick:u=>r(o),style:d({color:l<5?"#fff":"#333",background:o})},[p(" color-"+s(l+1)+" ",1),t("span",ho,s(o),1)],12,po))),128))]),t("div",ko,[g(m,{modelValue:a.custom,"onUpdate:modelValue":v[0]||(v[0]=o=>a.custom=o),style:{width:"128px"},colors:a.colorsList},null,8,["modelValue","colors"]),t("span",vo,s(a.custom),1)]),bo,mo])}}}),Po=q(Co,[["__scopeId","data-v-d21bdcdf"]]);export{$o as __pageData,Po as default};
