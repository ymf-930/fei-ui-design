import{_ as r,V as h,o as l,c as k,L as a,w as A,F as d,t as D,a as i,U as F,e as s,f as B}from"./chunks/framework.VDnCybDr.js";const o={},y={style:{height:"500px",overflow:"auto",border:"1px solid #eee"}},g={style:{padding:"20px"}};function c(n,e){const C=h("f-button"),t=h("f-back-top"),E=h("f-scrollbar");return l(),k("div",y,[a(E,{style:{height:"100%"},"wrap-class":"scrollbar-box"},{default:A(()=>[i("div",g,[(l(),k(d,null,F(80,p=>i("div",{key:p,ref_for:!0,ref:"item"},D(p)+":这是用来撑开内容的行...",1)),64))]),a(t,{target:".scrollbar-box","visible-height":200},{default:A(()=>[a(C,{type:"info",size:"large",icon:"up"})]),_:1})]),_:1})])}const f=r(o,[["render",c]]),b={},_={style:{position:"relative",border:"1px solid #eee"}},u={class:"scroll-box",style:{padding:"20px",height:"500px",overflow:"auto"}};function m(n,e){const C=h("f-button"),t=h("f-back-top");return l(),k("div",_,[i("div",u,[(l(),k(d,null,F(80,E=>i("div",{key:E,ref_for:!0,ref:"item"},D(E)+":这是用来撑开内容的行...",1)),64))]),a(t,{target:".scroll-box","visible-height":200},{default:A(()=>[a(C,{type:"success"},{default:A(()=>[s("返回顶端")]),_:1})]),_:1})])}const v=r(b,[["render",m]]),x=i("h1",{id:"返回顶部-backtop",tabindex:"-1"},[s("返回顶部 Backtop "),i("a",{class:"header-anchor",href:"#返回顶部-backtop","aria-label":'Permalink to "返回顶部 Backtop"'},"​")],-1),w=i("p",null,[s("当页面内容比较长滚动后需要快捷返回顶部时使用，一般放置在页面右下角位置。如果指定 "),i("code",null,"target"),s(" 使用则是针对某个容器的滚动")],-1),P=i("h2",{id:"基础用法",tabindex:"-1"},[s("基础用法 "),i("a",{class:"header-anchor",href:"#基础用法","aria-label":'Permalink to "基础用法"'},"​")],-1),S=i("p",null,"直接用组件默认插槽插入即可",-1),N=i("h2",{id:"scrollbar用法",tabindex:"-1"},[s("scrollbar用法 "),i("a",{class:"header-anchor",href:"#scrollbar用法","aria-label":'Permalink to "scrollbar用法"'},"​")],-1),T=i("p",null,[s("如果结合 "),i("code",null,"scrollbar"),s(" 使用则不需要配置其他项")],-1),V=i("p",null,[s("注意：如嵌套在自定义滚动组件中使用则需要将 "),i("code",null,"BackTop"),s(" 组件放置于 "),i("code",null,"Scrollbar"),s(" 组件内部")],-1),$=B("",4),G=JSON.parse('{"title":"返回顶部 Backtop","description":"","frontmatter":{"title":"返回顶部 Backtop"},"headers":[],"relativePath":"components/back-top.md","filePath":"components/back-top.md","lastUpdated":1704731654000}'),q={name:"components/back-top.md"},I=Object.assign(q,{setup(n){return(e,C)=>{const t=h("demo-preview");return l(),k("div",null,[x,w,P,S,a(t,{title:"",description:"",code:"%3Ctemplate%3E%0D%0A%20%20%3Cdiv%20style=%22position:%20relative;%20border:%201px%20solid%20#eee%22%3E%0D%0A%20%20%20%20%3Cdiv%20class=%22scroll-box%22%20style=%22padding:%2020px;%20height:%20500px;%20overflow:%20auto%22%3E%0D%0A%20%20%20%20%20%20%3Cdiv%20v-for=%22item%20in%2080%22%20:key=%22item%22%20ref=%22item%22%3E%7B%7B%20item%20%7D%7D:%E8%BF%99%E6%98%AF%E7%94%A8%E6%9D%A5%E6%92%91%E5%BC%80%E5%86%85%E5%AE%B9%E7%9A%84%E8%A1%8C...%3C/div%3E%0D%0A%20%20%20%20%3C/div%3E%0D%0A%20%20%20%20%3Cf-back-top%20target=%22.scroll-box%22%20:visible-height=%22200%22%3E%0D%0A%20%20%20%20%20%20%3Cf-button%20type=%22success%22%3E%E8%BF%94%E5%9B%9E%E9%A1%B6%E7%AB%AF%3C/f-button%3E%0D%0A%20%20%20%20%3C/f-back-top%3E%0D%0A%20%20%3C/div%3E%0D%0A%3C/template%3E%0D%0A",showCode:"%3Cpre%20class%3D%22shiki%20shiki-themes%20slack-ochin%20rose-pine-moon%20vp-code%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20style%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3Eposition%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23F6C177%22%3E%20relative%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3E%20border%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%201%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23F6C177%22%3E%20solid%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23908CAA%22%3E%20%23%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%233E8FB0%22%3Eeee%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20class%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22scroll-box%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20style%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3Epadding%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%2020%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3E%20height%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%20500%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3E%20overflow%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23F6C177%22%3E%20auto%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3E%20v-for%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3Eitem%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3E%20in%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%2080%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Ekey%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3Eitem%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20ref%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22item%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%7B%7B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3E%20item%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%7D%7D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%3A%E8%BF%99%E6%98%AF%E7%94%A8%E6%9D%A5%E6%92%91%E5%BC%80%E5%86%85%E5%AE%B9%E7%9A%84%E8%A1%8C...%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-back-top%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20target%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22.scroll-box%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Evisible-height%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E200%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20type%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22success%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%E8%BF%94%E5%9B%9E%E9%A1%B6%E7%AB%AF%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-back-top%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",suffixName:"vue",absolutePath:"E:\\GitStore\\fei-ui-design\\docs\\components\\demo\\Backtop\\Basic.vue",relativePath:"./demo/Backtop/Basic.vue"},{default:A(()=>[a(v)]),_:1}),N,T,V,a(t,{title:"",description:"",code:"%3Ctemplate%3E%0D%0A%20%20%3Cdiv%20style=%22height:%20500px;%20overflow:%20auto;%20border:%201px%20solid%20#eee%22%3E%0D%0A%20%20%20%20%3Cf-scrollbar%20style=%22height:%20100%25%22%20wrap-class=%22scrollbar-box%22%3E%0D%0A%20%20%20%20%20%20%3Cdiv%20style=%22padding:%2020px%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cdiv%20v-for=%22item%20in%2080%22%20:key=%22item%22%20ref=%22item%22%3E%7B%7B%20item%20%7D%7D:%E8%BF%99%E6%98%AF%E7%94%A8%E6%9D%A5%E6%92%91%E5%BC%80%E5%86%85%E5%AE%B9%E7%9A%84%E8%A1%8C...%3C/div%3E%0D%0A%20%20%20%20%20%20%3C/div%3E%0D%0A%20%20%20%20%20%20%3Cf-back-top%20target=%22.scrollbar-box%22%20:visible-height=%22200%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cf-button%20type=%22info%22%20size=%22large%22%20icon=%22up%22%3E%3C/f-button%3E%0D%0A%20%20%20%20%20%20%3C/f-back-top%3E%0D%0A%20%20%20%20%3C/f-scrollbar%3E%0D%0A%20%20%3C/div%3E%0D%0A%3C/template%3E%0D%0A",showCode:"%3Cpre%20class%3D%22shiki%20shiki-themes%20slack-ochin%20rose-pine-moon%20vp-code%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20style%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3Eheight%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%20500%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3E%20overflow%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23F6C177%22%3E%20auto%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3E%20border%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%201%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23F6C177%22%3E%20solid%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23908CAA%22%3E%20%23%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%233E8FB0%22%3Eeee%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-scrollbar%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20style%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3Eheight%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%20100%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3E%25%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20wrap-class%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22scrollbar-box%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20style%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DC3EB7%3B--shiki-dark%3A%239CCFD8%22%3Epadding%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%2020%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3E%20v-for%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3Eitem%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%237B30D0%3B--shiki-dark%3A%233E8FB0%22%3E%20in%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E%2080%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Ekey%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3Eitem%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20ref%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22item%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%7B%7B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%232F86D2%3B--shiki-dark%3A%23E0DEF4%3B--shiki-light-font-style%3Ainherit%3B--shiki-dark-font-style%3Aitalic%22%3E%20item%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%7D%7D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23E0DEF4%22%3E%3A%E8%BF%99%E6%98%AF%E7%94%A8%E6%9D%A5%E6%92%91%E5%BC%80%E5%86%85%E5%AE%B9%E7%9A%84%E8%A1%8C...%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-back-top%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20target%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22.scrollbar-box%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3Evisible-height%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23174781%3B--shiki-dark%3A%23EA9A97%22%3E200%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23F6C177%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20type%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22info%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20size%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22large%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23DF8618%3B--shiki-dark%3A%23C4A7E7%3B--shiki-light-font-style%3Aitalic%3B--shiki-dark-font-style%3Aitalic%22%3E%20icon%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%23908CAA%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23A44185%3B--shiki-dark%3A%23F6C177%22%3E%22up%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-back-top%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ef-scrollbar%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%20%20%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Ediv%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%230444AC%3B--shiki-dark%3A%239CCFD8%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23002339%3B--shiki-dark%3A%236E6A86%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",suffixName:"vue",absolutePath:"E:\\GitStore\\fei-ui-design\\docs\\components\\demo\\Backtop\\Scrollbar.vue",relativePath:"./demo/Backtop/Scrollbar.vue"},{default:A(()=>[a(f)]),_:1}),$])}}});export{G as __pageData,I as default};
