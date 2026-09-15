import * as components from './components'

import * as directives from './_directives'

import LoadingBar from './loading-bar'
import Message from './message'
import MessageBox from './message-box'
import Notice from './notice'

import create, { isRegisterableComponent, type ComponentType } from './create'

const plugins = [LoadingBar, Message, MessageBox, Notice]

/**
 * components.ts 通过 `export *` 汇总了各组件模块的全部导出，其中包含
 * usePopper / renderPopper 这类 hook 与渲染函数，需要过滤掉；
 * 同时通过 Set 去重，避免“同一组件以 F/B 两个名字导出”导致的重复注册。
 */
const componentList = Array.from(
  new Set(Object.values(components as Record<string, ComponentType>))
).filter(isRegisterableComponent)

const FeiUI = create({
  components: componentList,
  directives: Object.keys(directives).map(key => ({
    name: key,
    directive: directives[key as keyof typeof directives]
  })),
  plugins
})

export default FeiUI

export const install = FeiUI.install

export { LoadingBar, Message, MessageBox, Notice }
