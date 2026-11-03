import isServer from './isServer'
import { isObject, typeOf } from './util'

/**
 * 随机一个id
 * @returns id
 */
export const generateId = (): number => Math.floor(Math.random() * 10000)

/**
 * 是否是一个函数
 * @param val
 * @returns
 */
export const isFunction = (val: unknown): val is (...args: any[]) => any => typeOf(val) === 'function'

/**
 * 是否是boolean
 * @param val
 * @returns
 */
export const isBool = (val: unknown): val is boolean => typeof val === 'boolean'

/**
 * 是否是number
 * @param val
 * @returns
 */
export const isNumber = (val: unknown): val is number => typeof val === 'number'

/**
 * 是否是string
 * @param val
 * @returns
 */
export const isString = (value: unknown): value is string => typeof value === 'string'

/**
 * 是否是object
 * @param val
 * @returns
 */
export { isObject }

/**
 * 是否是isArray
 * @param val
 * @returns
 */
export const isArray = (value: unknown): boolean => typeOf(value) === 'array'

/**
 * 是否是Promise
 * @param fn
 * @returns
 */
export const isPromise = (fn: any): fn is Promise<any> => fn instanceof Promise

/**
 * 是否是HTMLElement
 * @param val
 * @returns
 */
export const isHTMLElement = (val: unknown): val is HTMLElement =>
  typeof val === 'object' &&
  val !== null &&
  Object.prototype.toString.call(val).startsWith('[object HTML')

/**
 * 是否为空
 */
export function isEmpty(val: any): boolean {
  return (
    (!val && val !== 0) ||
    (Array.isArray(val) && !val.length) ||
    (isObject(val) && !Object.keys(val as object).length)
  )
}

/**
 * 查找数组元素
 * @param arr
 * @param pred
 * @returns
 */
export const arrayFind = <T>(arr: readonly T[], pred: (value: T, index: number, arr: readonly T[]) => unknown): T | undefined =>
  arr.find(pred)

/**
 * 查找数组索引
 * @param arr
 * @param pred
 * @returns
 */
export const arrayFindIndex = <T>(
  arr: readonly T[],
  pred: (value: T, index: number, arr: readonly T[]) => unknown
): number => arr.findIndex(pred)

/**
 * 清空计时器
 * @param val
 * @returns
 */
export const clearTimer = (timer: { value: any }): void => {
  clearTimeout(timer.value)
  timer.value = null
}

/**
 * 追加transition前缀
 * @param style
 * @returns
 */
export const autoprefixer = function (style: Record<string, any>): Record<string, any> {
  const rules = ['transform', 'transition', 'animation']
  const prefixes = ['ms-', 'webkit-']
  rules.forEach(rule => {
    const value = style[rule]
    if (rule && value) {
      prefixes.forEach(prefix => {
        style[prefix + rule] = value
      })
    }
  })
  return style
}

/**
 * 根据.获取拼接路径
 * @param obj
 * @param paths
 * @returns
 */
export const getValueByPath = (obj: any, paths = ''): any => {
  let ret = obj
  paths.split('.').map(path => {
    ret = ret?.[path]
  })
  return ret
}

/**
 * 根据路径信息获取prop
 * @param obj
 * @param path
 * @param strict
 * @returns
 */
export function getPropByPath(obj: any, path: string, strict?: boolean): { o: any; k: string; v: any } {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  const keyArr = path.split('.')
  let i = 0
  for (i; i < keyArr.length - 1; i++) {
    if (!tempObj && !strict) break
    const key = keyArr[i]

    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj?.[keyArr[i]]
  }
}

/**
 * 是否是IE
 * @returns
 */
export const isIE = function (): boolean {
  // 必须读 document.documentMode（只有 IE 才有该属性）：
  // 此前读的 document.DOCUMENT_NODE 是常量 9，Number(9) 永不为 NaN，导致该函数恒为 true。
  const documentMode = (document as Document & { documentMode?: number }).documentMode
  return !isServer && !isNaN(Number(documentMode))
}

/**
 * 是否是Edge
 * @returns
 */
export const isEdge = function (): boolean {
  return !isServer && navigator.userAgent.indexOf('Edge') > -1
}

/**
 * 正则转换
 * @param value
 * @returns
 */
export const escapeRegexpString = (value: string | number = ''): string =>
  String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

/**
 * 是否存在entries
 * @param obj
 * @returns
 */
export function entries(obj: Record<string, any>): [string, any][] {
  return Object.keys(obj).map(key => [key, obj[key]])
}

/**
 * ref解包
 * @param ref Refed value
 */
export function $(ref: { value: any }): any {
  return ref.value
}

/** 是否是undefined */
export function isUndefined(val: unknown): val is undefined {
  return val === void 0
}

/**
 * 数组扁平化（递归展开所有层级）
 * @param arr
 * @returns
 */
export function arrayFlat(arr: any[]): any[] {
  return arr.reduce<any[]>((acm, item) => {
    const val = Array.isArray(item) ? arrayFlat(item) : item
    return acm.concat(val)
  }, [])
}

/**
 * 数组去重
 * @param arr
 * @returns
 */
export function deduplicate<T>(arr: readonly T[]): T[] {
  return Array.from(new Set(arr))
}

/**
 * 实际值转换为数组
 * @param arr
 * @returns
 */
export const coerceTruthyValueToArray = (arr: any): any[] => {
  if (!arr && arr !== 0) {
    return []
  }
  return Array.isArray(arr) ? arr : [arr]
}

export function capitalize(str: string): string {
  if (str.length === 0) {
    return str
  }
  return str[0].toUpperCase() + str.slice(1)
}
