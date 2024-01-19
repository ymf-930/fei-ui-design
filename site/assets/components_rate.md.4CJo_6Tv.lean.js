import{_ as F,V as C,o as k,j as y,d as B,r,c as D,L as i,a as s,ab as g,ac as c,w as d,e as E,f}from"./chunks/framework.poAQ63CV.js";const u={};function m(t,a){const l=C("f-rate");return k(),y(l,{"model-value":3.7,disabled:"","show-score":"","text-color":"#ffba00","score-template":"3.7"})}const v=F(u,[["render",m]]),_={flex:""},x=B({__name:"Icon",setup(t){const a=r(null),l=["heart-fill","heart-fill","heart-fill"];return(h,e)=>{const A=C("f-rate");return k(),D("div",_,[i(A,{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=n=>a.value=n),"icon-classes":l,"void-icon-class":"heart",colors:["#99A9BF","#F7BA2A","#ffba00"]},null,8,["modelValue"])])}}}),o=t=>(g("data-v-3d809c49"),t=t(),c(),t),b={flex:""},w={class:"block"},P=o(()=>s("span",{class:"demonstration"},"默认不区分颜色",-1)),R={class:"block"},V=o(()=>s("span",{class:"demonstration"},"区分颜色",-1)),S=B({__name:"Basic",setup(t){const a=r(null),l=r(null),h=["#99A9BF","#F7BA2A","#ffba00"];return(e,A)=>{const n=C("f-rate");return k(),D("div",b,[s("div",w,[P,i(n,{modelValue:a.value,"onUpdate:modelValue":A[0]||(A[0]=p=>a.value=p),"allow-half":"","show-text":""},null,8,["modelValue"])]),s("div",R,[V,i(n,{modelValue:l.value,"onUpdate:modelValue":A[1]||(A[1]=p=>l.value=p),colors:h},null,8,["modelValue"])])])}}}),I=F(S,[["__scopeId","data-v-3d809c49"]]),N=s("h1",{id:"评分-rate",tabindex:"-1"},[E("评分 Rate "),s("a",{class:"header-anchor",href:"#评分-rate","aria-label":'Permalink to "评分 Rate"'},"​")],-1),$=s("p",null,"用于显示评分",-1),T=s("h2",{id:"基础用法",tabindex:"-1"},[E("基础用法 "),s("a",{class:"header-anchor",href:"#基础用法","aria-label":'Permalink to "基础用法"'},"​")],-1),q=s("p",null,"直接用组件默认插槽插入即可",-1),U=s("h2",{id:"自定义图标",tabindex:"-1"},[E("自定义图标 "),s("a",{class:"header-anchor",href:"#自定义图标","aria-label":'Permalink to "自定义图标"'},"​")],-1),G=s("h2",{id:"只读",tabindex:"-1"},[E("只读 "),s("a",{class:"header-anchor",href:"#只读","aria-label":'Permalink to "只读"'},"​")],-1),j=f("",4),J=JSON.parse('{"title":"评分 Rate","description":"","frontmatter":{"title":"评分 Rate"},"headers":[],"relativePath":"components/rate.md","filePath":"components/rate.md","lastUpdated":1704731654000}'),z={name:"components/rate.md"},L=Object.assign(z,{setup(t){return(a,l)=>{const h=C("demo-preview");return k(),D("div",null,[N,$,T,q,i(h,{title:"",description:"",code:"%3Ctemplate%3E%0D%0A%20%20%3Cdiv%20flex%3E%0D%0A%20%20%20%20%3Cdiv%20class=%22block%22%3E%0D%0A%20%20%20%20%20%20%3Cspan%20class=%22demonstration%22%3E%E9%BB%98%E8%AE%A4%E4%B8%8D%E5%8C%BA%E5%88%86%E9%A2%9C%E8%89%B2%3C/span%3E%0D%0A%20%20%20%20%20%20%3Cf-rate%20v-model=%22value1%22%20allow-half%20show-text%3E%3C/f-rate%3E%0D%0A%20%20%20%20%3C/div%3E%0D%0A%20%20%20%20%3Cdiv%20class=%22block%22%3E%0D%0A%20%20%20%20%20%20%3Cspan%20class=%22demonstration%22%3E%E5%8C%BA%E5%88%86%E9%A2%9C%E8%89%B2%3C/span%3E%0D%0A%20%20%20%20%20%20%3Cf-rate%20v-model=%22value2%22%20:colors=%22colors%22%3E%3C/f-rate%3E%0D%0A%20%20%20%20%3C/div%3E%0D%0A%20%20%3C/div%3E%0D%0A%3C/template%3E%0D%0A%0D%0A%3Cscript%20setup%20lang=%22ts%22%3E%0D%0Aimport%20%7B%20ref%20%7D%20from%20'vue'%0D%0Aconst%20value1%20=%20ref(null)%0D%0Aconst%20value2%20=%20ref(null)%0D%0Aconst%20colors%20=%20%5B'#99A9BF',%20'#F7BA2A',%20'#ffba00'%5D%0D%0A%3C/script%3E%0D%0A%0D%0A%3Cstyle%20scoped%3E%0D%0A.block%20%7B%0D%0A%20%20padding:%2030px%200;%0D%0A%20%20text-align:%20center;%0D%0A%20%20border-right:%201px%20solid%20#eff2f6;%0D%0A%20%20display:%20inline-block;%0D%0A%20%20width:%2049%25;%0D%0A%20%20box-sizing:%20border-box;%0D%0A%7D%0D%0A%3C/style%3E%0D%0A",showCode:"%3Cpre%20class%3D%22shiki%20shiki-themes%20slack-ochin%20rose-pine-moon%20vp-code%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20flex%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20class%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22block%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Espan%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20class%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22demonstration%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%E9%BB%98%E8%AE%A4%E4%B8%8D%E5%8C%BA%E5%88%86%E9%A2%9C%E8%89%B2%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Espan%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-rate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20v-model%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3Evalue1%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20allow-half%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20show-text%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-rate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20class%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22block%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Espan%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20class%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22demonstration%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%E5%8C%BA%E5%88%86%E9%A2%9C%E8%89%B2%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Espan%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-rate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20v-model%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3Evalue2%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Ecolors%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3Ecolors%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-rate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20setup%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20lang%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22ts%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3Eimport%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%7B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3E%20ref%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%7D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3E%20from%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%20'vue'%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%230991B6%3B--shiki-dark%3A%233E8FB0%22%3Econst%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3E%20value1%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3E%20%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237EB233%3B--shiki-dark%3A%23EA9A97%22%3E%20ref%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E(%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3Enull%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E)%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%230991B6%3B--shiki-dark%3A%233E8FB0%22%3Econst%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3E%20value2%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3E%20%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237EB233%3B--shiki-dark%3A%23EA9A97%22%3E%20ref%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E(%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3Enull%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E)%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%230991B6%3B--shiki-dark%3A%233E8FB0%22%3Econst%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3E%20colors%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3E%20%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%20%5B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E'%2399A9BF'%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%2C%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%20'%23F7BA2A'%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%2C%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%20'%23ffba00'%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%5D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Estyle%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20scoped%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23908CAA%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E.%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Eblock%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3E%20%20padding%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%2030%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%200%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3E%20%20text-align%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23F6C177%22%3E%20center%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3E%20%20border-right%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%201%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23F6C177%22%3E%20solid%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23908CAA%22%3E%20%23%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%233E8FB0%22%3Eeff2f6%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3E%20%20display%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23F6C177%22%3E%20inline-block%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3E%20%20width%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%2049%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3E%25%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3E%20%20box-sizing%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23F6C177%22%3E%20border-box%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Estyle%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",suffixName:"vue",absolutePath:"E:\\GitStore\\fei-ui-design\\docs\\components\\demo\\Rate\\Basic.vue",relativePath:"./demo/Rate/Basic.vue"},{default:d(()=>[i(I)]),_:1}),U,i(h,{title:"",description:"",code:"%3Ctemplate%3E%0D%0A%20%20%3Cdiv%20flex%3E%0D%0A%20%20%20%20%3Cf-rate%0D%0A%20%20%20%20%20%20v-model=%22value%22%0D%0A%20%20%20%20%20%20:icon-classes=%22iconClasses%22%0D%0A%20%20%20%20%20%20void-icon-class=%22heart%22%0D%0A%20%20%20%20%20%20:colors=%22%5B'#99A9BF',%20'#F7BA2A',%20'#ffba00'%5D%22%0D%0A%20%20%20%20%3E%3C/f-rate%3E%0D%0A%20%20%3C/div%3E%0D%0A%3C/template%3E%0D%0A%0D%0A%3Cscript%20setup%20lang=%22ts%22%3E%0D%0Aimport%20%7B%20ref%20%7D%20from%20'vue'%0D%0Aconst%20value%20=%20ref(null)%0D%0Aconst%20iconClasses%20=%20%5B'heart-fill',%20'heart-fill',%20'heart-fill'%5D%0D%0A%3C/script%3E%0D%0A",showCode:"%3Cpre%20class%3D%22shiki%20shiki-themes%20slack-ochin%20rose-pine-moon%20vp-code%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20flex%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-rate%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20%20%20%20%20%20v-model%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3Evalue%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%20%20%20%20%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Eicon-classes%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3EiconClasses%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20%20%20%20%20%20void-icon-class%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22heart%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%20%20%20%20%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Ecolors%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%5B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E'%2399A9BF'%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%2C%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%20'%23F7BA2A'%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%2C%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%20'%23ffba00'%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%5D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-rate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20setup%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20lang%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22ts%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3Eimport%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%7B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3E%20ref%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%7D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3E%20from%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%20'vue'%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%230991B6%3B--shiki-dark%3A%233E8FB0%22%3Econst%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3E%20value%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3E%20%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237EB233%3B--shiki-dark%3A%23EA9A97%22%3E%20ref%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E(%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3Enull%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E)%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%230991B6%3B--shiki-dark%3A%233E8FB0%22%3Econst%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3E%20iconClasses%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3E%20%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%20%5B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E'heart-fill'%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%2C%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%20'heart-fill'%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%2C%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%20'heart-fill'%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%5D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",suffixName:"vue",absolutePath:"E:\\GitStore\\fei-ui-design\\docs\\components\\demo\\Rate\\Icon.vue",relativePath:"./demo/Rate/Icon.vue"},{default:d(()=>[i(x)]),_:1}),G,i(h,{title:"",description:"",code:"%3Ctemplate%3E%0D%0A%20%20%3Cf-rate%20:model-value=%223.7%22%20disabled%20show-score%20text-color=%22#ffba00%22%20score-template=%223.7%22%3E%3C/f-rate%3E%0D%0A%3C/template%3E%0D%0A%0D%0A%3Cscript%20setup%20lang=%22ts%22%3E%3C/script%3E%0D%0A",showCode:"%3Cpre%20class%3D%22shiki%20shiki-themes%20slack-ochin%20rose-pine-moon%20vp-code%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-rate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Emodel-value%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E3.7%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20disabled%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20show-score%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20text-color%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22%23ffba00%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20score-template%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%223.7%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-rate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20setup%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20lang%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22ts%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",suffixName:"vue",absolutePath:"E:\\GitStore\\fei-ui-design\\docs\\components\\demo\\Rate\\Readonly.vue",relativePath:"./demo/Rate/Readonly.vue"},{default:d(()=>[i(v)]),_:1}),j])}}});export{J as __pageData,L as default};