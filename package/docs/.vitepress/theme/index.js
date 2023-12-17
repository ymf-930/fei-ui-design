import DefaultTheme from "vitepress/theme";
import "./custom.styl"
import 'boxicons/css/boxicons.min.css'
// import MyLayout from "./MyLayout.vue"
import Layout from "./layouts/Layout.vue";

export default {
    ...DefaultTheme,
    NotFound: () => "404", // <- this is a Vue 3 functional component
    extends: DefaultTheme,
    // Layout: MyLayout,
    Layout: Layout,
    enhanceApp({ app, router, siteData }) {
        // app is the Vue 3 app instance from createApp()
        // router is VitePress' custom router (see `lib/app/router.js`)
        // siteData is a ref of current site-level metadata.
        // register your custom global components
        // app.component('MyGlobalComponent' /* ... */)
    },

};