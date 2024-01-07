import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import { fileURLToPath, URL } from 'node:url'
import sidebarDocs from "./sidebar-docs.js"
import sidebarComps from "./sidebar-comps.js"

const baseUrl = process.env.NODE_ENV === 'production' ? '/fei-ui-design/' : '/'

export default defineConfig({
  locales: {
    '/': {
      // lang: '中文',
      lang: 'zh-CN',
      text: '中文',
    },
    '/es/': {
      // lang: 'English',
      lang: 'en-US',
      text: 'English',
    }
  },
  lang: 'zh-CN',
  base: baseUrl,
  ignoreDeadLinks: true,
  outDir: '../../site',
  title: 'FEI-UI-DESIGN',
  head: [
    ['link', { rel: 'icon', href: `/logos/logo-vuesax-logotipo-vuesax-png-8.png`, media: '(prefers-color-scheme:dark)', type: 'image/png' }],
    ['link', { rel: 'icon', href: `/logos/logo-vuesax-logotipo-vuesax-png-7.png`, media: '(prefers-color-scheme:light)', type: 'image/png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, shrink-to-fit=no' }],
    ['meta', { name: 'author', content: 'ymf' }],
    ['meta', { name: 'google', content: 'nositelinkssearchbox' }],
    ['meta', { hid: 'description', name: 'description', content: 'FEI-UI-DESIGN Framework Components for Vuejs' }],
    ['meta', { property: 'og:image', content: 'https://vuesax.com/vuesax_components.png' }],
    ['meta', { property: 'og:description', content: 'FEI-UI-DESIGN Framework Components for Vuejs' }],
    ['meta', { property: 'og:title', content: 'FEI-UI-DESIGN - Framework for Vuejs'}],
    ['meta', { property: 'og:url', content: 'https://vuesax.com/'}],
    ['meta', { name: 'twitter:card', content: 'summary_large_image'}],
  ],
  localePath: '/',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/gumingWu/vitepress-fun' }
    ],
    repo: 'lusaxweb/vuesax-next',
    docsDir: 'packages/docs',
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' }
    ],
    sidebar: {
      '/guide/': sidebarDocs,
      '/components/': sidebarComps
    },
    locales: {
      '/': {
        ...getNavbar(),
        ...getSidebar()
      },
      '/es/': {
        ...getNavbar('/es/'),
        ...getSidebar('/es/')
      }
    },
    lastUpdated: true,
    linkPrevVersion: 'https://lusaxweb.github.io/vuesax/',
    searchPlaceholder: 'FEI-UI-DESIGN Search',
  },
  markdown: {
    theme: {
      light: 'slack-ochin',
      dark: 'rose-pine-moon'
    },
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  vite: {
    server: {
      host: '0.0.0.0',
      port: 8000,
      open: true
    },
    resolve: {
      alias: {
        'fei-ui-design': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  }
})

function getNavbar (lang = '/') {

  return {
    nav: [
      {
        text: lang !== '/'? `首页` : `Home`,
        link: `${lang}docs/`,
      },
      {
        text: lang !== '/'? `文档` : `Document`,
        link: `${lang}docs/guide/`,
        items: [
          { text: lang !== '/'? `介绍` : `Introduction`, link: `${lang}docs/guide/` },
          { text: lang !== '/'? `开始` : `Getting Started`, link: `${lang}docs/guide/gettingStarted` },
        ]
      },
      {
        text: lang !== '/'? `组件` : `Components`,
        link: `${lang}docs/components`,
        items: [
          {
            text: lang !== '/'? `组件` : `Components`,
            items: [
              { text: `Button`, link: `${lang}docs/components/` },
              { text: `Alert`, link: `${lang}docs/components/Alert` },
              { text: `Loading`, link: `${lang}docs/components/Loading` },
              { text: `Input`, link: `${lang}docs/components/Input` },
							{ text: 'Checkbox', link: `${lang}docs/components/Checkbox` },
							{ text: 'Switch', link: `${lang}docs/components/Switch` },
							{ text: 'Select', link: `${lang}docs/components/Select` },
							{ text: 'Avatar', link: `${lang}docs/components/Avatar` },
							{ text: 'Notification', link: `${lang}docs/components/Notification` },
							{ text: 'Radio', link: `${lang}docs/components/Radio` },
							{ text: 'Tooltip', link: `${lang}docs/components/Tooltip` },
							{ text: 'Dialog', link: `${lang}docs/components/Dialog` },
							{ text: 'Pagination', link: `${lang}docs/components/Pagination` },
							{ text: 'Table', link: `${lang}docs/components/Table` },
							{ text: 'Navbar', link: `${lang}docs/components/Navbar` },
							{ text: 'Sidebar', link: `${lang}docs/components/Sidebar` },
							{ text: 'Card', link: `${lang}docs/components/Card` },
            ]
          }
        ]
      },
    ]
  }
}

function getSidebar (lang = '/') {
  return {
    sidebar: {
      [`${lang}docs/`]: [
        {
          title: lang !== '/'? `概览` : `Guide`,
          collapsable: false,
          children: [
            `${lang}docs/guide/`,
          ]
        },
        {
          title: lang !== '/'? `主题` : `Theme`,
          collapsable: false,
          children: [
            `${lang}docs/theme/`,
          ]
        },
        {
          title: lang !== '/'? `组件` : `Components`,
          collapsable: false,
          children: [
            `${lang}docs/components/`,
            `${lang}docs/components/Alert`,
            `${lang}docs/components/Loading`,
            `${lang}docs/components/Input`,
						`${lang}docs/components/Checkbox`,
						`${lang}docs/components/Switch`,
						`${lang}docs/components/Select`,
						`${lang}docs/components/Avatar`,
						`${lang}docs/components/Notification`,
						`${lang}docs/components/Radio`,
						`${lang}docs/components/Tooltip`,
						`${lang}docs/components/Dialog`,
						`${lang}docs/components/Pagination`,
						`${lang}docs/components/Table`,
						`${lang}docs/components/Navbar`,
						`${lang}docs/components/Sidebar`,
						`${lang}docs/components/Card`,
          ]
        },
        {
          title: lang !== '/'? `布局` : `Layout`,
          collapsable: false,
          children: [
            `${lang}docs/layout/`,
          ]
        },
      ],
    }
  }
}
