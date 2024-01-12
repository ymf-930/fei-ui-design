import "./custom.styl"
import 'boxicons/css/boxicons.min.css'
import Layout from "./layouts/Layout.vue"
import DefaultTheme from "vitepress/theme"
import {ElementPlusContainer} from "@vitepress-demo-preview/component";
import FeiUI from "fei-ui-design";
// import Vuesax from 'vuesax'
// import 'vuesax/dist/vuesax.css' //Vuesax styles

import '@vitepress-demo-preview/component/dist/style.css'
import './index.css'
import '../../../src/_styles/index.css'

export default {
  ...DefaultTheme,
  NotFound: () => "404", // <- this is a Vue 3 functional component
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({app, router, siteData}) {
    app.use(FeiUI)
    // app.use(Vuesax)
    app.component('demo-preview', ElementPlusContainer)
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
    // register your custom global components
    // app.component('MyGlobalComponent' /* ... */)
  },

};
