import { formatSidebar } from './utils/utils.js'

export default formatSidebar([
  {
    text: '介绍',
    items: [
      { text: 'Fei UI Design', link: '/guide/introduction' },
      { text: '变更日志', link: '/guide/changelog' }
    ]
  },
  {
    text: '快速上手',
    items: [
      { text: '安装', link: '/guide/installation' },
      { text: '在 SFC 中使用', link: '/guide/usage-sfc' },
      { text: '按需引入', link: '/guide/import-on-demand' }
    ]
  },
  {
    text: '指南',
    items: [
      { text: 'JSX & TSX', link: '/guide/jsx' },
      { text: '色彩设计', link: '/guide/color-design' },
      { text: '调整主题', link: '/guide/custom-theme' },
      { text: '通用样式', link: '/guide/common-css' },
      { text: '帮助函数', link: '/guide/common-api' },
      { text: '组件指令', link: '/guide/common-directive' },
      { text: '内置动画', link: '/guide/common-transition' }
    ]
  }
])
