import { type App, type Directive } from 'vue'
import version from './version'
import info from './info'
import { setConfig } from './_utils/config'
import log from './_utils/log'

/** 组件定义：至少包含 name，使用 as const 之外的结构以兼容各种组件定义形式 */
interface ComponentWithMeta {
  name?: string
  alias?: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type ComponentType = ComponentWithMeta

export type { ComponentType }

/** 指令注册项 */
export interface DirectiveItem {
  name: string
  directive: Directive
}

export interface FUiInstance {
  version: string
  componentPrefix: string
  install: (app: App, options?: FUiInstallOptions) => void
}

export interface FUiInstallOptions {
  /** 是否禁用控制台的版本信息打印 */
  disabledDoc?: boolean
  // 允许透传其他全局配置项给 setConfig
  [key: string]: unknown
}

// 必须 export：src/index.ts 会 re-export 该类型，
// 未导出会让 `import type { FUiCreateOptions } from 'fei-ui-design'` 直接报 TS2305。
export interface FUiCreateOptions {
  components?: ComponentType[]
  componentPrefix?: string
  directives?: DirectiveItem[]
  plugins?: { install: (app: App) => void }[]
}

/**
 * 判断是否为可全局注册的组件。
 * 组件必须是以大写字母开头的 PascalCase 命名的对象/函数；
 * 借此跳过 `usePopper`、`renderPopper` 等 hook / 渲染函数等非组件导出。
 */
export function isRegisterableComponent(component: ComponentType): boolean {
  if (!component) return false
  const type = typeof component
  if (type !== 'object' && type !== 'function') return false
  return typeof component.name === 'string' && /^[A-Z][A-Za-z0-9]*$/.test(component.name)
}

/**
 * 计算组件的全局注册名。
 * - 已带目标前缀（FButton）→ 原样返回，避免出现 FFButton
 * - 兼容历史单字母前缀（BCol / BOption）→ 替换为目标前缀（FCol / FOption）
 * - 无前缀（TableBody）→ 补前缀（FTableBody）
 */
export function resolveGlobalName(name: string, componentPrefix: string): string {
  if (!name) return ''
  if (name.startsWith(componentPrefix)) return name
  if (/^[A-Z][A-Z]/.test(name)) return componentPrefix + name.slice(1)
  return componentPrefix + name
}

// 组件自动注册，可以支持扩展前缀
function create({
  componentPrefix = 'F',
  components = [],
  directives = [],
  plugins = []
}: FUiCreateOptions = {}): FUiInstance {
  const installTargets: App[] = []

  function registerComponent(app: App, name: string, component: ComponentType): void {
    const newName = resolveGlobalName(name, componentPrefix)
    if (!newName) return
    // 已注册过的组件（含别名）不重复注册
    if (!app.component(newName)) {
      app.component(newName, component)
    }
  }

  function install(app: App, options: FUiInstallOptions = {}): void {
    if (installTargets.includes(app)) return
    installTargets.push(app)

    // 全局注册组件
    components.forEach(component => {
      if (!isRegisterableComponent(component)) return
      const { name, alias } = component
      registerComponent(app, name as string, component)
      if (alias) {
        alias.forEach((aliasName: string) => {
          registerComponent(app, aliasName, component)
        })
      }
    })

    // 全局注册指令
    directives.forEach(item => {
      const { name, directive } = item
      app.directive(name, directive)
    })

    // 注册全局install
    plugins.forEach(plugin => {
      app.use(plugin)
    })

    // 注册全局函数和属性
    setConfig({ ...options })

    if (!options.disabledDoc) {
      log.printVersion(info.name, version, info.homepage)
    }
  }

  return {
    version,
    componentPrefix,
    install
  }
}

export default create
