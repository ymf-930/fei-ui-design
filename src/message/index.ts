import type { App } from 'vue'
import Message from './src/instance'

type MessageWithInstall = typeof Message & { install: (app: App) => void }

const MessagePlugin = Message as MessageWithInstall

MessagePlugin.install = app => {
  app.config.globalProperties.$message = MessagePlugin
}

export default MessagePlugin
