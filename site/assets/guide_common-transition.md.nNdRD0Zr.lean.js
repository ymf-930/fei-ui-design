import{d as C,r,c as f,a as t,L as a,w as o,e,g as n,v as i,T as l,F as P,U as S,i as $,V as y,o as _,j as N,t as T,ab as V,ac as B,_ as I}from"./chunks/framework.Jp5m_bdR.js";const s=p=>(V("data-v-0e65e49d"),p=p(),B(),p),D=s(()=>t("h1",{id:"内置动画",tabindex:"-1"},[e("内置动画 "),t("a",{class:"header-anchor",href:"#内置动画","aria-label":'Permalink to "内置动画"'},"​")],-1)),j=s(()=>t("p",null,"组件提供了如下内置动画,只需要引入base.css 即可包含.",-1)),F=s(()=>t("h2",{id:"淡入淡出",tabindex:"-1"},[e("淡入淡出 "),t("a",{class:"header-anchor",href:"#淡入淡出","aria-label":'Permalink to "淡入淡出"'},"​")],-1)),L=s(()=>t("p",null,[e("提供 2种 淡入淡出效果 "),t("code",null,"fade-in-linear"),e(" 和 "),t("code",null,"fade-in")],-1)),U={class:"demo-transition"},E={style:{display:"flex","margin-top":"20px",height:"100px"}},J={class:"transition-box"},O={class:"transition-box"},q=s(()=>t("h2",{id:"左右平移",tabindex:"-1"},[e("左右平移 "),t("a",{class:"header-anchor",href:"#左右平移","aria-label":'Permalink to "左右平移"'},"​")],-1)),A={class:"demo-transition"},G={style:{display:"flex","justify-content":"center","margin-top":"20px",height:"100px"}},H={class:"transition-box"},K={class:"transition-box"},M=s(()=>t("h2",{id:"缩放",tabindex:"-1"},[e("缩放 "),t("a",{class:"header-anchor",href:"#缩放","aria-label":'Permalink to "缩放"'},"​")],-1)),Q=s(()=>t("p",null,[e("提供 4种 缩放效果 "),t("code",null,"zoom-in-center"),e("，"),t("code",null,"zoom-in-top"),e(" ，"),t("code",null,"zoom-in"),e(" 和 "),t("code",null,"zoom-in-bottom")],-1)),R={class:"demo-transition"},W={style:{display:"flex","margin-top":"20px",height:"100px"}},X={class:"transition-box"},Y={class:"transition-box"},Z={class:"transition-box"},tt={class:"transition-box"},et=s(()=>t("h2",{id:"移动渐变",tabindex:"-1"},[e("移动渐变 "),t("a",{class:"header-anchor",href:"#移动渐变","aria-label":'Permalink to "移动渐变"'},"​")],-1)),ot=s(()=>t("p",null,[e("提供 3种 特殊的移动渐变 "),t("code",null,"fade-transverse"),e(" ,"),t("code",null,"fade-scale"),e(" ,"),t("code",null,"fade-scale-move")],-1)),at={class:"demo-transition"},st={style:{display:"flex","margin-top":"20px",height:"100px"}},nt={class:"transition-box"},it={class:"transition-box"},lt={class:"transition-box"},dt={class:"transition-box"},ct=s(()=>t("h2",{id:"移动变换",tabindex:"-1"},[e("移动变换 "),t("a",{class:"header-anchor",href:"#移动变换","aria-label":'Permalink to "移动变换"'},"​")],-1)),rt=s(()=>t("p",null,"同等位置的移动变化，会存在位置错位情况，这个动画内置了绝对定位的覆盖，可同时切换一组内容的动画类型",-1)),_t={class:"demo-transition"},ht={style:{position:"relative",overflow:"hidden",margin:"10px 0",width:"200px",height:"100px"}},ut={key:0,class:"transition-box"},vt={key:1,class:"transition-box"},mt={key:2,class:"transition-box"},ft={key:3,class:"transition-box"},pt=s(()=>t("h2",{id:"展开折叠",tabindex:"-1"},[e("展开折叠 "),t("a",{class:"header-anchor",href:"#展开折叠","aria-label":'Permalink to "展开折叠"'},"​")],-1)),bt=s(()=>t("p",null,[e("展开折叠也作为内部组件实现，直接使用 "),t("code",null,"<f-collapse-transition>"),e(" 包裹替换即可")],-1)),xt={class:"demo-transition"},kt={style:{"margin-top":"20px",height:"220px"}},yt=s(()=>t("div",{class:"transition-box"},"collapse-transition",-1)),gt=s(()=>t("div",{class:"transition-box"},"collapse-transition",-1)),wt=[yt,gt],Nt=JSON.parse('{"title":"内置动画","description":"","frontmatter":{"title":"内置动画"},"headers":[],"relativePath":"guide/common-transition.md","filePath":"guide/common-transition.md","lastUpdated":1704731654000}'),zt={name:"guide/common-transition.md"},Ct=C({...zt,setup(p){const b=r(!0),x=r(!0),h=r(!0),u=r(!0),k=r(!0),g=r([{key:"tab1",title:"tab1"},{key:"tab2",title:"tab2"},{key:"tab3",title:"tab3"},{key:"tab4",title:"tab4"}]),v=r("tab1");return(Pt,d)=>{const m=y("f-button"),w=y("f-move-transition"),z=y("f-collapse-transition");return _(),f("div",null,[D,j,F,L,t("div",U,[a(m,{onClick:d[0]||(d[0]=c=>b.value=!b.value)},{default:o(()=>[e("查看效果")]),_:1}),t("div",E,[a(l,{name:"fade-in-linear"},{default:o(()=>[n(t("div",J,"fade-in-linear",512),[[i,b.value]])]),_:1}),a(l,{name:"fade-in"},{default:o(()=>[n(t("div",O,"fade-in",512),[[i,b.value]])]),_:1})])]),q,t("div",A,[a(m,{onClick:d[1]||(d[1]=c=>x.value=!x.value)},{default:o(()=>[e("查看效果")]),_:1}),t("div",G,[a(l,{name:"move-left"},{default:o(()=>[n(t("div",H,"move-left",512),[[i,x.value]])]),_:1}),a(l,{name:"move-right"},{default:o(()=>[n(t("div",K,"move-right",512),[[i,x.value]])]),_:1})])]),M,Q,t("div",R,[a(m,{onClick:d[2]||(d[2]=c=>h.value=!h.value)},{default:o(()=>[e("查看效果")]),_:1}),t("div",W,[a(l,{name:"zoom-in-center"},{default:o(()=>[n(t("div",X,"zoom-in-center",512),[[i,h.value]])]),_:1}),a(l,{name:"zoom-in-top"},{default:o(()=>[n(t("div",Y,"zoom-in-top",512),[[i,h.value]])]),_:1}),a(l,{name:"zoom-in"},{default:o(()=>[n(t("div",Z,"zoom-in",512),[[i,h.value]])]),_:1}),a(l,{name:"zoom-in-bottom"},{default:o(()=>[n(t("div",tt,"zoom-in-bottom",512),[[i,h.value]])]),_:1})])]),et,ot,t("div",at,[a(m,{onClick:d[3]||(d[3]=c=>u.value=!u.value)},{default:o(()=>[e("查看效果")]),_:1}),t("div",st,[a(l,{name:"fade-transverse"},{default:o(()=>[n(t("div",nt,"fade-transverse",512),[[i,u.value]])]),_:1}),a(l,{name:"fade-scale"},{default:o(()=>[n(t("div",it,"fade-scale",512),[[i,u.value]])]),_:1}),a(l,{name:"fade-scale-move"},{default:o(()=>[n(t("div",lt,"fade-scale-move",512),[[i,u.value]])]),_:1}),a(l,{name:"fade-down"},{default:o(()=>[n(t("div",dt,"fade-down",512),[[i,u.value]])]),_:1})])]),ct,rt,t("div",_t,[(_(!0),f(P,null,S(g.value,c=>(_(),N(m,{key:c.key,onClick:St=>v.value=c.key,type:v.value===c.key?"primary":null},{default:o(()=>[e(T(c.title),1)]),_:2},1032,["onClick","type"]))),128)),t("div",ht,[a(w,null,{default:o(()=>[v.value==="tab1"?(_(),f("div",ut,"tab1")):v.value==="tab2"?(_(),f("div",vt,"tab2")):v.value==="tab3"?(_(),f("div",mt,"tab3")):v.value==="tab4"?(_(),f("div",ft,"tab4")):$("",!0)]),_:1})])]),pt,bt,t("div",xt,[a(m,{onClick:d[4]||(d[4]=c=>k.value=!k.value)},{default:o(()=>[e("查看效果")]),_:1}),t("div",kt,[a(z,null,{default:o(()=>[n(t("div",null,wt,512),[[i,k.value]])]),_:1})])])])}}}),Tt=I(Ct,[["__scopeId","data-v-0e65e49d"]]);export{Nt as __pageData,Tt as default};
