import { getPalette, alpha } from './color'

// 这里的变量覆盖，可以覆盖多种样式，组件库内的样式以bin开头，如feiColorPrimary
// 这里如果是主题色，则对应再生成几种色板进行追加。如colorPrimaryLight1
// 如是需要覆盖本地默认的样式，按需求进行调整即可 如vMBgColor
// 首字母需要小写

/** CSS 变量名到变量值的映射 */
export type CSSVariables = Record<string, any>

/**
 * 转换一个变量值为css变量 turn feiColorPrimary => to  --fei-color-primary
 * @param {*} str
 * @returns
 */
export function convertToCSSVariableName(str: string): string {
  return `--${str.replace(/([A-Z])/g, '-$1').toLowerCase()}`
}

/**
 * 转换一个对象为css变量对象
 * @param {*} obj
 * @returns
 */
export function convertObjectPropsToCSSVariables(obj: CSSVariables): CSSVariables {
  const result: CSSVariables = {}
  Object.keys(obj).forEach(key => {
    // 转换实际css var变量 `--fei-color-primary`
    const cssVariableName = convertToCSSVariableName(key)
    result[cssVariableName] = obj[key]
    // 获取可能的扩展变量
    const extensionVars = getExtensionVariables(cssVariableName, obj[key])
    // 扩展变量名
    Object.keys(extensionVars).forEach(exKey => {
      result[exKey] = extensionVars[exKey]
    })
  })
  return result
}

/**
 * 循环设置一个css变量
 * @param {*} obj
 * @param {*} dom
 * @returns
 */
export function setObjectPropsCSSVariables(
  obj: CSSVariables,
  dom: HTMLElement = document.documentElement
): void {
  const props = convertObjectPropsToCSSVariables(obj)
  Object.keys(props).forEach(key => {
    setCssVar(key, props[key], dom)
  })
}

/**
 * 设置css变量
 * @param {*} prop
 * @param {*} val
 * @param {*} dom
 */
export function setCssVar(
  prop: string,
  val: string | number,
  dom: HTMLElement = document.documentElement
): void {
  dom.style.setProperty(prop, String(val))
}

/**
 * 设置属性
 * @param {} prop
 * @param {*} val
 * @param {*} dom
 */
export function setAttrVar(
  prop: string,
  val: string,
  dom: HTMLElement = document.documentElement
): void {
  dom.setAttribute(prop, val)
}

/**
 * 移除属性
 * @param {} prop
 * @param {*} val
 * @param {*} dom
 */
export function removeAttrVar(prop: string, dom: HTMLElement = document.documentElement): void {
  dom.removeAttribute(prop)
}

// 根据变量名称获取扩展名称色板对象 这里是为了扩充计算色板使用
function getExtensionVariables(key: string, color: string): Record<string, string> {
  const mateProps = ['primary', 'success', 'warning', 'danger', 'info'].map(v => `--fei-color-${v}`)
  const result: Record<string, string> = {}
  // 如果有匹配主色的内容则需要扩充色板
  if (mateProps.includes(key)) {
    const paletteColors = getPalette(color)
    // 根据主色获取色板
    result[`${key}-light1`] = paletteColors[5]
    result[`${key}-light2`] = paletteColors[6]
    result[`${key}-light3`] = paletteColors[7]
    result[`${key}-light4`] = paletteColors[8]
    result[`${key}-light5`] = paletteColors[9]
    result[`${key}-light6`] = paletteColors[10]
    result[`${key}-active`] = paletteColors[3]

    if (key === '--fei-color-primary') {
      result['--fei-color-input-shadow'] = alpha(color, 0.2)
    }
    if (key === '--fei-color-danger') {
      result['--fei-color-input-error-shadow'] = alpha(color, 0.2)
    }
  }
  return result
}
