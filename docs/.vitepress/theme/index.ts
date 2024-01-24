import "./custom.styl"
import 'boxicons/css/boxicons.min.css'
import Layout from "./layouts/Layout.vue"
import DefaultTheme from "vitepress/theme"
import { ElementPlusContainer } from "@vitepress-demo-preview/component";
import FeiUI from "fei-ui-design";
import card from "./global-components/card.vue"
// import codex from "./global-components/codex.vue"

// import '@vitepress-demo-preview/component/dist/style.css'
import './index.css'
import '../../../src/_styles/index.css'

export default {
  ...DefaultTheme,
  NotFound: () => "404", // <- this is a Vue 3 functional component
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(FeiUI)
    // app.component('demo-preview', ElementPlusContainer)
    app.component('card', card)
    // 注册能够被应用内所有组件实例访问到的全局属性的对象
    app.config.globalProperties.vsTheme = {
      mobileActive: false,
      openCode: false,
      themeDarken: false,
      sidebarCollapseOpen: true,
    }
    // app.component('codex', codex)
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
    // register your custom global components
    // app.component('MyGlobalComponent' /* ... */)
  },

};
