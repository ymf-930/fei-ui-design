import { resolve } from 'path'

export const root = resolve(__dirname, '..')
export const compRoot = resolve(root, 'src')
export const styleRoot = resolve(root, 'src/_styles')

/** 全量样式产物目录 */
export const output = resolve(root, 'dist/styles')

export const pkgPath = root

/**
 * 将 Windows 反斜杠路径统一为正斜杠。
 *
 * gulp/vinyl-fs 底层的 glob 引擎把 `\` 视为转义字符，
 * 在 Windows 上直接传入 `path.resolve()` 得到的绝对路径时，
 * 形如 `C:\a\src/**\/*.css` 的模式会静默匹配不到任何文件
 * （gulp 对空匹配只打印 warning、不会报错，极易漏掉产物）。
 */
export const posix = (p: string): string => p.replace(/\\/g, '/')

/** 单个组件的按需样式（index.css / dark.css 等） */
export const componentStylesGlob = posix(`${compRoot}/**/styles/*.css`)

/** 全量样式入口 glob */
export const fullStylesGlob = posix(`${styleRoot}/*.css`)

/** 通用类样式 glob */
export const commonStylesGlob = posix(`${styleRoot}/common/*.css`)

/** 字体资源 glob */
export const fontsGlob = posix(`${styleRoot}/fonts/**`)
