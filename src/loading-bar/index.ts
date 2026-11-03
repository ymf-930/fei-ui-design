import type { App } from 'vue'
import LoadingBar from './src/instance'

type LoadingBarWithInstall = typeof LoadingBar & { install: (app: App) => void }

const LoadingBarPlugin = LoadingBar as LoadingBarWithInstall

LoadingBarPlugin.install = app => {
  app.config.globalProperties.$loadingBar = LoadingBarPlugin
}

export default LoadingBarPlugin
