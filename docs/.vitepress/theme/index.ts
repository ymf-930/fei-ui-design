import { reactive } from "vue"
import "./custom.styl"
import 'boxicons/css/boxicons.min.css'
import Layout from "./layouts/Layout.vue"
import NotFound from "./layouts/404.vue"
import DefaultTheme from "vitepress/theme"
import { ElementPlusContainer } from "@vitepress-demo-preview/component";
import FeiUI from "fei-ui-design";
import card from "./global-components/card.vue"
// import codex from "./global-components/codex.vue"

import '@vitepress-demo-preview/component/dist/style.css'
import './index.css'
import '../../../src/_styles/index.css'

export default {
  // ...DefaultTheme,
  NotFound, // 使用 layouts/404.vue（原先返回字符串 "404"，整页只剩两字）
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(FeiUI)
    app.component('demo-preview', ElementPlusContainer)
    app.component('card', card)
    // 注册能够被应用内所有组件实例访问到的全局属性的对象。
    // ⚠️ 必须是 reactive：各消费组件通过 `const feiThemeVal = ref(feiTheme)` 取用，
    // 共享同一个代理。若写成普通对象、消费方再用 `{ ...feiTheme }` 取值，
    // 展开运算符产出的是【副本】—— 一处写入其它组件读不到，
    // 「展开/收起侧边栏子栏目」「打开/关闭所有代码」会表现为「点击无反应」。
    // 回归证明：.workbuddy/tmp/proof-vstheme-fix.mjs
    app.config.globalProperties.feiTheme = reactive({
      mobileActive: false,
      openCode: false,
      themeDarken: false,
      sidebarCollapseOpen: true,
    })
    // app.component('codex', codex)
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
    // register your custom global components
    // app.component('MyGlobalComponent' /* ... */)
  },

};
