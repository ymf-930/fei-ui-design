/** 全局配置项：zIndex 为已知字段，其余允许按需扩展 */
export interface GlobalConfig {
  zIndex: number
  [key: string]: any
}

let $ELEMENT: GlobalConfig = { zIndex: 2000 }

let transferIndex = 0

function transferIncrease(): number {
  return ++transferIndex + $ELEMENT.zIndex
}

const setConfig = (option: Partial<GlobalConfig>): void => {
  $ELEMENT = { ...$ELEMENT, ...option }
}
const getConfig = (key: string): any => {
  return $ELEMENT[key]
}

export { transferIncrease, getConfig, setConfig }
