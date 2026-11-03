/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | info | default ]
 */
export function typeColor(type = 'default'): string {
  let color: string
  switch (type) {
    case 'primary':
      color = '#1a5cff'
      break
    case 'success':
      color = '#46c93a'
      break
    case 'warning':
      color = '#ffba00'
      break
    case 'danger':
      color = '#ff4757'
      break
    // 此前缺少 'info' 分支，typeColor('info') 会落到 default 返回字符串 'info'，
    // 拼出 `color: info` 这种非法颜色值，控制台的 info 输出因此没有任何配色。
    case 'info':
      color = '#909399'
      break
    case 'default':
      color = '#35495E'
      break
    default:
      color = type
      break
  }
  return color
}

/** 日志配色级别 */
type LogType = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'default'

const print = (text: any, type: LogType = 'default', back = false): void => {
  if (typeof text === 'object') {
    // 如果是对象则调用打印对象方式
    console.dir(text)
    return
  }
  if (back) {
    // 如果是打印带背景图的
    console.log(
      `%c ${text} `,
      `background:${typeColor(type)}; padding: 2px; border-radius: 2px;color: #fff;`
    )
  } else {
    console.log(`%c ${text} `, `color: ${typeColor(type)};`)
  }
}

const pretty = (title: string, text: any, type: LogType = 'primary'): void => {
  console.log(
    `%c ${title} %c ${text} %c`,
    `background:${typeColor(type)};border:1px solid ${typeColor(
      type
    )}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
    `border:1px solid ${typeColor(
      type
    )}; padding: 1px; border-radius: 0 2px 2px 0; color: ${typeColor(type)};`,
    'background:transparent'
  )
}

const primary = (text: any, back = false): void => {
  print(text, 'primary', back)
}
const success = (text: any, back = false): void => {
  print(text, 'success', back)
}
const info = (text: any, back = false): void => {
  print(text, 'info', back)
}
const warning = (text: any, back = false): void => {
  print(text, 'warning', back)
}
const danger = (text: any, back = false): void => {
  print(text, 'danger', back)
}
const printVersion = (
  title: string,
  version: string,
  link: string,
  type: LogType = 'primary',
  fontSize = '20px',
  versionColor = '#999'
): void => {
  console.log(
    `%c${title.toUpperCase()} %cV${version}  ${link}`,
    `color: ${typeColor(
      type
    )};font-weight: 500;font-size: ${fontSize};font-family: Source Sans Pro,Helvetica Neue,Arial,sans-serif;`,
    `color: ${versionColor};`
  )
}
const log = {
  print,
  pretty,
  primary,
  info,
  success,
  warning,
  danger,
  printVersion
}

export default log

export const throwError = (scope: string, m: string): void => {
  pretty(scope, m, 'danger')
}
export const throwWarn = (scope: string, m: string): void => {
  pretty(scope, m, 'warning')
}
