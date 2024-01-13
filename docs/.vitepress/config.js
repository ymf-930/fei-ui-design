import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import { fileURLToPath, URL } from 'node:url'
// import sidebarDocs from "./sidebar-docs.js"
// import sidebarComps from "./sidebar-comps.js"

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
  outDir: '../site',
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
    repo: 'ymf930/fei-ui-design',
    docsDir: '/docs',
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: `${baseUrl}/guide/introduction` },
      { text: '组件', link: `${baseUrl}/components/button` }
    ],
   /* sidebar: {
      '/guide/': sidebarDocs,
      '/components/': sidebarComps
    },*/
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
        link: `${lang}`,
      },
      {
        text: lang !== '/'? `文档` : `Document`,
        link: `${baseUrl}/guide/`,
        items: [
          { text: lang !== '/'? `介绍` : `Introduction`, link: `${lang}/guide/` },
          { text: lang !== '/'? `开始` : `Getting Started`, link: `${lang}/guide/gettingStarted` },
        ]
      },
      {
        text: lang !== '/'? `组件` : `Components`,
        link: `${baseUrl}/components`,
        items: [
          {
            text: lang !== '/'? `组件` : `Components`,
            items: [
              { text: `Button`, link: `${baseUrl}/components/` },
              { text: `Alert`, link: `${baseUrl}/components/Alert` },
              { text: `Loading`, link: `${baseUrl}/components/Loading` },
              { text: `Input`, link: `${baseUrl}/components/Input` },
							{ text: 'Checkbox', link: `${baseUrl}/components/Checkbox` },
							{ text: 'Switch', link: `${baseUrl}/components/Switch` },
							{ text: 'Select', link: `${baseUrl}/components/Select` },
							{ text: 'Avatar', link: `${baseUrl}/components/Avatar` },
							{ text: 'Notification', link: `${baseUrl}/components/Notification` },
							{ text: 'Radio', link: `${baseUrl}/components/Radio` },
							{ text: 'Tooltip', link: `${baseUrl}/components/Tooltip` },
							{ text: 'Dialog', link: `${baseUrl}/components/Dialog` },
							{ text: 'Pagination', link: `${baseUrl}/components/Pagination` },
							{ text: 'Table', link: `${baseUrl}/components/Table` },
							{ text: 'Navbar', link: `${baseUrl}/components/Navbar` },
							{ text: 'Sidebar', link: `${baseUrl}/components/Sidebar` },
							{ text: 'Card', link: `${baseUrl}/components/Card` },
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
      [`${lang}`]: [
        {
          title: lang !== '/'? `Introduce` : `介绍`,
          collapsable: false,
          children: [
            { title: 'Fei UI Design', link: '/guide/introduction' },
            { title: '变更日志', link: '/guide/changelog' }
          ]
        },
        {
          title: lang !== '/'? `Get Started` : `快速上手`,
          collapsable: false,
          children: [
            { title: '安装', link: '/guide/installation' },
            { title: '在 SFC 中使用', link: '/guide/usage-sfc' },
            { title: '按需引入', link: '/guide/import-on-demand' }
          ]
        },
        {
          title: lang !== '/'? `Guide` : `指南`,
          collapsable: false,
          children: [
            { title: 'JSX & TSX', link: '/guide/jsx' },
            { title: '色彩设计', link: '/guide/color-design' },
            { title: '调整主题', link: '/guide/custom-theme' },
            { title: '通用样式', link: '/guide/common-css' },
            { title: '帮助函数', link: '/guide/common-api' },
            { title: '组件指令', link: '/guide/common-directive' },
            { title: '内置动画', link: '/guide/common-transition' }
          ]
        },
        {
          title: lang !== '/'? `Common Components` : `通用组件`,
          collapsable: false,
          children: [
            { title: '图标', link: `${baseUrl}components/icon`, icon: 'fire', alias: 'Icon' },
            { title: '按钮', link: `${baseUrl}components/button`, icon: 'Youtube', alias: 'Button' },
            { title: '卡片', link: `${baseUrl}components/card`, icon: 'creditcard', alias: 'Card' },
            { title: '折叠面板', link: `${baseUrl}components/collapse`, icon: 'interation', alias: 'Collapse' },
            { title: '分割线', link: `${baseUrl}components/divider`, icon: 'line', alias: 'Divider' },
            { title: '下拉菜单', link: `${baseUrl}components/dropdown`, icon: 'caret-down', alias: 'Dropdown' },
            { title: '标签', link: `${baseUrl}components/tag`, icon: 'tags', alias: 'Tag' },
          ]
        },
        {
          title: lang !== '/'? `Layout Components` : `布局组件`,
          collapsable: false,
          children: [
            { title: '布局', link: `${baseUrl}components/layout`, icon: 'layout', alias: 'Layout' },
            { title: '栅格', link: `${baseUrl}components/grid`, icon: 'appstore', alias: 'Grid' },
            { title: '间距', link: `${baseUrl}components/space`, icon: 'swap', alias: 'Space' },
            { title: '分割面板', link: `${baseUrl}components/split`, icon: 'block', alias: 'Split' }
          ]
        },
        {
          title: lang !== '/'? `Data entry component` : `数据录入组件`,
          collapsable: false,
          children: [
            { title: '输入框', link: `${baseUrl}components/input`, icon: 'edit-square', alias: 'Input' },
            { title: '数字输入', link: `${baseUrl}components/input-number`, icon: 'shake', alias: 'InputNumber' },
            { title: '单选框', link: `${baseUrl}components/radio`, icon: 'plus-circle', alias: 'Radio' },
            { title: '多选框', link: `${baseUrl}components/checkbox`, icon: 'check-square', alias: 'Checkbox' },
            { title: '开关', link: `${baseUrl}components/switch`, icon: 'build', alias: 'Switch' },
            { title: '选择器', link: `${baseUrl}components/select`, icon: 'unorderedlist', alias: 'Select' },
            { title: '级联选择', link: `${baseUrl}components/cascader`, icon: 'pic-left', alias: 'Cascader' },
            { title: '日期选择器', link: `${baseUrl}components/date-picker`, icon: 'calendar', alias: 'DatePicker' },
            { title: '时间选择器', link: `${baseUrl}components/time-picker`, icon: 'time-circle', alias: 'TimePicker' },
            { title: '颜色选择器', link: `${baseUrl}components/color-picker`, icon: 'bg-colors', alias: 'ColorPicker'},
            { title: '评分', link: `${baseUrl}components/rate`, icon: 'star', alias: 'Rate' },
            { title: '滑块', link: `${baseUrl}components/slider`, icon: 'minus', alias: 'Slider' },
            { title: '上传', link: `${baseUrl}components/upload`, icon: 'cloud-upload', alias: 'Upload' },
            { title: '表单', link: `${baseUrl}components/form`, icon: 'reconciliation', alias: 'Form' }
          ]
        },
        {
          title: lang !== '/'? `Data display Components` : `数据展示组件`,
          collapsable: false,
          children: [
            { title: '树结构', link: `${baseUrl}components/tree`, icon: 'branches', alias: 'Tree' },
            { title: '表格', link: `${baseUrl}components/table`, icon: 'table', alias: 'Table' },
            { title: '分页', link: `${baseUrl}components/page`, icon: 'read', alias: 'Page' },
            { title: '描述', link: `${baseUrl}components/desc`, icon: 'unorderedlist', alias: 'Desc' },
            { title: '时间线', link: `${baseUrl}components/timeline`, icon: 'arrowdown', alias: 'Timeline' },
            { title: '日历', link: `${baseUrl}components/calendar`, icon: 'calendar-fill', alias: 'Calendar' },
            { title: '轮播', link: `${baseUrl}components/carousel`, icon: 'appstore-fill', alias: 'Carousel' },
            { title: '数字动画', link: `${baseUrl}components/count-to`, icon: 'orderedlist', alias: 'CountTo' }
          ]
        },
        {
          title: lang !== '/'? `Navigation Components` : `导航组件`,
          collapsable: false,
          children: [
            { title: '图钉', link: `${baseUrl}components/affix`, icon: 'pushpin', alias: 'Affix' },
            { title: '锚点', link: `${baseUrl}components/anchor`, icon: 'attachment', alias: 'Anchor' },
            { title: '返回顶部', link: `${baseUrl}components/back-top`, icon: 'up', alias: 'BackTop' },
            { title: '面包屑', link: `${baseUrl}components/breadcrumb`, icon: 'right', alias: 'Breadcrumb' },
            { title: '加载条', link: `${baseUrl}components/loading-bar`, icon: 'minus', alias: 'Loading Bar' },
            { title: '菜单', link: `${baseUrl}components/menu`, icon: 'menu', alias: 'Menu' },
            { title: '标签页', link: `${baseUrl}components/tabs`, icon: 'project', alias: 'Tabs' },
            { title: '步骤', link: `${baseUrl}components/steps`, icon: 'arrowright', alias: 'Steps' }
          ]
        },
        {
          title: lang !== '/'? `Feedback Components` : `反馈组件`,
          collapsable: false,
          children: [
            { title: '警告信息', link: `${baseUrl}components/alert`, icon: 'error-fill', alias: 'Alert' },
            { title: '标记', link: `${baseUrl}components/badge`, icon: 'border', alias: 'Badge' },
            { title: '模态框', link: `${baseUrl}components/modal`, icon: 'idcard', alias: 'Modal' },
            { title: '消息提示', link: `${baseUrl}components/message`, icon: 'message', alias: 'Message' },
            { title: '弹框提示', link: `${baseUrl}components/message-box`, icon: 'mail', alias: 'MessageBox' },
            { title: '通知', link: `${baseUrl}components/notice`, icon: 'notification', alias: 'Notice' },
            { title: '弹出提示', link: `${baseUrl}components/tooltip`, icon: 'info-circle', alias: 'Tooltip' },
            { title: '弹出信息', link: `${baseUrl}components/popover`, icon: 'question-circle', alias: 'Popover'},
            { title: '抽屉', link: `${baseUrl}components/drawer`, icon: 'build', alias: 'Drawer' },
            { title: '骨架屏', link: `${baseUrl}components/skeleton`, icon: 'sever-fill', alias: 'Skeleton' },
            { title: '加载', link: `${baseUrl}components/loading`, icon: 'loading', alias: 'Loading' },
            { title: '进度条', link: `${baseUrl}components/progress`, icon: 'hourglass', alias: 'Progress' },
            { title: '进度环', link: `${baseUrl}components/circle`, icon: 'redo', alias: 'Circle' }
          ]
        },
        {
          title: lang !== '/'? `Built-in Components` : `内置组件`,
          collapsable: false,
          children: [
            { title: '空状态', link: `${baseUrl}components/empty`, icon: 'border', alias: 'Empty' },
            { title: '滚动组件', link: `${baseUrl}components/scrollbar`, icon: 'container', alias: 'Scrollbar' },
            { title: '弹层', link: `${baseUrl}components/popper`, icon: 'pic-center', alias: 'Popper' }
          ]
        },
        {
          title: lang !== '/'? `Configure Components` : `配置组件`,
          collapsable: false,
          children: [
            {title: '全局配置', link: `${lang}components/config-provider`, icon: 'setting', alias: 'ConfigProvider'}
          ]
        },
      ],
    }
  }
}
