import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import { fileURLToPath, URL } from 'node:url'

/**
 * 站点部署根路径。开发环境为 '/'，生产环境为 '/fei-ui-design/'（以斜杠结尾）。
 *
 * 注意：本主题的导航与侧边栏使用原生 <a href>（见 theme/components/NavLink.vue、
 * SidebarLink.vue），VitePress 不会自动拼接 base，因此 themeConfig 中的链接必须
 * 通过下面的 link() 手动拼接。
 */
const SITE_BASE = process.env.NODE_ENV === 'production' ? '/fei-ui-design/' : '/'

/**
 * 拼接站点内链接，保证得到 `<base><path>` 且不会出现双斜杠。
 * 例：link('guide/introduction') → '/fei-ui-design/guide/introduction'
 */
function link(path = '') {
  return SITE_BASE + String(path).replace(/^\/+/, '')
}

export default defineConfig({
  lang: 'zh-CN',
  base: SITE_BASE,
  outDir: '../site',
  // 内部文档（面向维护者）不参与站点构建
  srcExclude: ['**/.internal/**'],
  title: 'FEI-UI-DESIGN',
  // 开启死链检测：任何指向不存在页面的链接都会在构建期直接报错，
  // 避免像旧版导航那样长期存在一批 404 入口。
  ignoreDeadLinks: false,
  head: [
    ['link', { rel: 'icon', href: `${SITE_BASE}favicon.ico` }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, shrink-to-fit=no' }],
    ['meta', { name: 'author', content: 'ymf' }],
    ['meta', { name: 'google', content: 'nositelinkssearchbox' }],
    ['meta', { hid: 'description', name: 'description', content: 'FEI-UI-DESIGN Framework Components for Vuejs' }],
    ['meta', { property: 'og:description', content: 'FEI-UI-DESIGN Framework Components for Vuejs' }],
    ['meta', { property: 'og:title', content: 'FEI-UI-DESIGN - Framework for Vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  ],
  themeConfig: {
    repo: 'ymf-930/fei-ui-design',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ymf-930/fei-ui-design' }
    ],
    docsDir: 'docs',
    nav: [
      { text: '首页', link: SITE_BASE },
      {
        text: '指南',
        link: link('guide/introduction'),
        items: [
          { text: '介绍', link: link('guide/introduction') },
          { text: '安装', link: link('guide/installation') },
          { text: '在 SFC 中使用', link: link('guide/usage-sfc') },
          { text: '按需引入', link: link('guide/import-on-demand') },
          { text: '变更日志', link: link('guide/changelog') }
        ]
      },
      { text: '组件', link: link('components/button') }
    ],
    sidebar: {
      '/': getSidebar()
    },
    lastUpdated: true,
    lastUpdatedText: '最后更新',
    searchPlaceholder: '搜索文档'
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
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

/**
 * 侧边栏。注意所有 link 均使用 link() 拼接 base，且必须指向真实存在的页面
 * （ignoreDeadLinks 已关闭，写错会在构建期报错）。
 */
function getSidebar () {
  return [
    {
      title: '概览',
      collapsable: false,
      navType: 'guide',
      children: [
        { title: '指南总览', link: link('guide/') },
        { title: '组件总览', link: link('components/') }
      ]
    },
    {
      title: '介绍',
      collapsable: false,
      navType: 'guide',
      children: [
        { title: 'FEI-UI-DESIGN', link: link('guide/introduction') },
        { title: '变更日志', link: link('guide/changelog') }
      ]
    },
    {
      title: '快速上手',
      collapsable: false,
      navType: 'guide',
      children: [
        { title: '安装', link: link('guide/installation') },
        { title: '在 SFC 中使用', link: link('guide/usage-sfc') },
        { title: '按需引入', link: link('guide/import-on-demand') }
      ]
    },
    {
      title: '指南',
      collapsable: false,
      navType: 'guide',
      children: [
        { title: 'JSX & TSX', link: link('guide/jsx') },
        { title: '色彩设计', link: link('guide/color-design') },
        { title: '调整主题', link: link('guide/custom-theme') },
        { title: '通用样式', link: link('guide/common-css') },
        { title: '帮助函数', link: link('guide/common-api') },
        { title: '组件指令', link: link('guide/common-directive') },
        { title: '内置动画', link: link('guide/common-transition') }
      ]
    },
    {
      title: '通用组件',
      collapsable: false,
      navType: 'components',
      children: [
        { title: '图标', link: link('components/icon'), icon: 'fire', alias: 'Icon' },
        { title: '按钮', link: link('components/button'), icon: 'Youtube', alias: 'Button' },
        { title: '按钮组', link: link('components/button-group'), icon: 'Youtube', alias: 'ButtonGroup' },
        { title: '卡片', link: link('components/card'), icon: 'creditcard', alias: 'Card' },
        { title: '折叠面板', link: link('components/collapse'), icon: 'interation', alias: 'Collapse' },
        { title: '分割线', link: link('components/divider'), icon: 'line', alias: 'Divider' },
        { title: '下拉菜单', link: link('components/dropdown'), icon: 'caret-down', alias: 'Dropdown' },
        { title: '标签', link: link('components/tag'), icon: 'tags', alias: 'Tag' }
      ]
    },
    {
      title: '布局组件',
      collapsable: false,
      navType: 'components',
      children: [
        { title: '布局', link: link('components/layout'), icon: 'layout', alias: 'Layout' },
        { title: '栅格', link: link('components/grid'), icon: 'appstore', alias: 'Grid' },
        { title: '间距', link: link('components/space'), icon: 'swap', alias: 'Space' },
        { title: '分割面板', link: link('components/split'), icon: 'block', alias: 'Split' }
      ]
    },
    {
      title: '数据录入组件',
      collapsable: false,
      navType: 'components',
      children: [
        { title: '输入框', link: link('components/input'), icon: 'edit-square', alias: 'Input' },
        { title: '数字输入', link: link('components/input-number'), icon: 'shake', alias: 'InputNumber' },
        { title: '单选框', link: link('components/radio'), icon: 'plus-circle', alias: 'Radio' },
        { title: '多选框', link: link('components/checkbox'), icon: 'check-square', alias: 'Checkbox' },
        { title: '开关', link: link('components/switch'), icon: 'build', alias: 'Switch' },
        { title: '选择器', link: link('components/select'), icon: 'unorderedlist', alias: 'Select' },
        { title: '级联选择', link: link('components/cascader'), icon: 'pic-left', alias: 'Cascader' },
        { title: '日期选择器', link: link('components/date-picker'), icon: 'calendar', alias: 'DatePicker' },
        { title: '时间选择器', link: link('components/time-picker'), icon: 'time-circle', alias: 'TimePicker' },
        { title: '颜色选择器', link: link('components/color-picker'), icon: 'bg-colors', alias: 'ColorPicker' },
        { title: '评分', link: link('components/rate'), icon: 'star', alias: 'Rate' },
        { title: '滑块', link: link('components/slider'), icon: 'minus', alias: 'Slider' },
        { title: '上传', link: link('components/upload'), icon: 'cloud-upload', alias: 'Upload' },
        { title: '表单', link: link('components/form'), icon: 'reconciliation', alias: 'Form' }
      ]
    },
    {
      title: '数据展示组件',
      collapsable: false,
      navType: 'components',
      children: [
        { title: '树结构', link: link('components/tree'), icon: 'branches', alias: 'Tree' },
        { title: '表格', link: link('components/table'), icon: 'table', alias: 'Table' },
        { title: '分页', link: link('components/page'), icon: 'read', alias: 'Page' },
        { title: '描述', link: link('components/desc'), icon: 'unorderedlist', alias: 'Desc' },
        { title: '时间线', link: link('components/timeline'), icon: 'arrowdown', alias: 'Timeline' },
        { title: '日历', link: link('components/calendar'), icon: 'calendar-fill', alias: 'Calendar' },
        { title: '轮播', link: link('components/carousel'), icon: 'appstore-fill', alias: 'Carousel' },
        { title: '数字动画', link: link('components/count-to'), icon: 'orderedlist', alias: 'CountTo' }
      ]
    },
    {
      title: '导航组件',
      collapsable: false,
      navType: 'components',
      children: [
        { title: '图钉', link: link('components/affix'), icon: 'pushpin', alias: 'Affix' },
        { title: '锚点', link: link('components/anchor'), icon: 'attachment', alias: 'Anchor' },
        { title: '返回顶部', link: link('components/back-top'), icon: 'up', alias: 'BackTop' },
        { title: '面包屑', link: link('components/breadcrumb'), icon: 'right', alias: 'Breadcrumb' },
        { title: '加载条', link: link('components/loading-bar'), icon: 'minus', alias: 'Loading Bar' },
        { title: '菜单', link: link('components/menu'), icon: 'menu', alias: 'Menu' },
        { title: '标签页', link: link('components/tabs'), icon: 'project', alias: 'Tabs' },
        { title: '步骤', link: link('components/steps'), icon: 'arrowright', alias: 'Steps' }
      ]
    },
    {
      title: '反馈组件',
      collapsable: false,
      navType: 'components',
      children: [
        { title: '警告信息', link: link('components/alert'), icon: 'error-fill', alias: 'Alert' },
        { title: '标记', link: link('components/badge'), icon: 'border', alias: 'Badge' },
        { title: '模态框', link: link('components/modal'), icon: 'idcard', alias: 'Modal' },
        { title: '消息提示', link: link('components/message'), icon: 'message', alias: 'Message' },
        { title: '弹框提示', link: link('components/message-box'), icon: 'mail', alias: 'MessageBox' },
        { title: '通知', link: link('components/notice'), icon: 'notification', alias: 'Notice' },
        { title: '弹出提示', link: link('components/tooltip'), icon: 'info-circle', alias: 'Tooltip' },
        { title: '弹出信息', link: link('components/popover'), icon: 'question-circle', alias: 'Popover' },
        { title: '抽屉', link: link('components/drawer'), icon: 'build', alias: 'Drawer' },
        { title: '骨架屏', link: link('components/skeleton'), icon: 'sever-fill', alias: 'Skeleton' },
        { title: '加载', link: link('components/loading'), icon: 'loading', alias: 'Loading' },
        { title: '进度条', link: link('components/progress'), icon: 'hourglass', alias: 'Progress' },
        { title: '进度环', link: link('components/circle'), icon: 'redo', alias: 'Circle' }
      ]
    },
    {
      title: '内置组件',
      collapsable: false,
      navType: 'components',
      children: [
        { title: '空状态', link: link('components/empty'), icon: 'border', alias: 'Empty' },
        { title: '滚动组件', link: link('components/scrollbar'), icon: 'container', alias: 'Scrollbar' },
        { title: '弹层', link: link('components/popper'), icon: 'pic-center', alias: 'Popper' }
      ]
    },
    {
      title: '配置组件',
      collapsable: false,
      navType: 'components',
      children: [
        { title: '全局配置', link: link('components/config-provider'), icon: 'setting', alias: 'ConfigProvider' }
      ]
    }
  ]
}
