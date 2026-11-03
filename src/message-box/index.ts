import type { App } from 'vue'
import MessageBox from './src/instance'

type MessageBoxWithInstall = typeof MessageBox & { install: (app: App) => void }

const MessageBoxPlugin = MessageBox as MessageBoxWithInstall

MessageBoxPlugin.install = app => {
  app.config.globalProperties.$messageBox = MessageBoxPlugin
  app.config.globalProperties.$alert = MessageBoxPlugin.alert
  app.config.globalProperties.$confirm = MessageBoxPlugin.confirm
}

export default MessageBoxPlugin
