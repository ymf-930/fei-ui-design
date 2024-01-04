import { defineConfig } from 'vitepress'
export default defineConfig({
  locales: {
    '/': {
      // lang: 'Engl+ish',
      lang: 'en-US',
      text: 'English',
    },
    '/es/': {
      // lang: 'Español',
      lang: 'es-ES',
      text: 'Español',
    }
  },
  // plugins: [
  //   ['vuepress-plugin-typescript']
  // ],
  base: '/',
  outDir: '../site',
  title: 'F-UI-DESIGN',
  head: [
    ['link', { rel: 'icon', href: `/logos/logo-vuesax-logotipo-vuesax-png-8.png`, media: '(prefers-color-scheme:dark)', type: 'image/png' }],
    ['link', { rel: 'icon', href: `/logos/logo-vuesax-logotipo-vuesax-png-7.png`, media: '(prefers-color-scheme:light)', type: 'image/png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, shrink-to-fit=no' }],
    ['meta', { name: 'author', content: 'Lusaxweb' }],
    ['meta', { name: 'google', content: 'nositelinkssearchbox' }],
    ['meta', { hid: 'description', name: 'description', content: 'F-UI-DESIGN Framework Components for Vuejs' }],
    ['meta', { property: 'og:image', content: 'https://vuesax.com/vuesax_components.png' }],
    ['meta', { property: 'og:description', content: 'F-UI-DESIGN Framework Components for Vuejs' }],
    ['meta', { property: 'og:title', content: 'F-UI-DESIGN - Framework for Vuejs'}],
    ['meta', { property: 'og:url', content: 'https://vuesax.com/'}],
    ['meta', { name: 'twitter:card', content: 'summary_large_image'}],
  ],
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/gumingWu/vitepress-fun' }
    ],
    repo: 'lusaxweb/vuesax-next',
    docsDir: 'packages/docs',
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
    searchPlaceholder: 'F-UI-DESIGN Search',
  }
})

function getNavbar (lang = '/') {

  return {
    nav: [
      {
        text: lang !== '/'? `Home` : `首页`,
        link: `${lang}docs/`,
      },
      {
        text: lang !== '/'? `Guía` : `文档`,
        link: `${lang}docs/guide/`,
        items: [
          { text: lang !== '/'? `Introducción` : `Introduction`, link: `${lang}docs/guide/` },
          { text: lang !== '/'? `Empezando` : `Getting Started`, link: `${lang}docs/guide/gettingStarted` },
          { text: `F-UI-DESIGN + Nuxtjs`, link: `${lang}docs/guide/nuxt` }
        ]
      },
      {
        text: lang !== '/'? `Documentación` : `组件`,
        link: `${lang}docs/components`,
        items: [
          {
            text: lang !== '/'? `Componentes` : `Components`,
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
          title: lang !== '/'? `Guía` : `Guide`,
          collapsable: false,
          children: [
            `${lang}docs/guide/`,
            `${lang}docs/guide/gettingStarted`,
            `${lang}docs/guide/nuxt`,
          ]
        },
        {
          title: lang !== '/'? `Tema` : `Theme`,
          collapsable: false,
          children: [
            `${lang}docs/theme/`,
          ]
        },
        {
          title: lang !== '/'? `Componentes` : `Components`,
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
						// new component slot 2
          ]
        },
        {
          title: lang !== '/'? `Diseño` : `Layout`,
          collapsable: false,
          children: [
            `${lang}docs/layout/`,
          ]
        },
      ],
    }
  }
}
