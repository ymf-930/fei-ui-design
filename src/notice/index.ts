import type { App } from 'vue'
import Notice from './src/instance'

type NoticeWithInstall = typeof Notice & { install: (app: App) => void }

const NoticePlugin = Notice as NoticeWithInstall

NoticePlugin.install = app => {
  app.config.globalProperties.$notice = NoticePlugin
}

export default NoticePlugin
