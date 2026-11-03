/**
 * `color` 包未随包提供类型声明，这里按项目实际用到的 API 做最小声明。
 * 参考文档：https://www.npmjs.com/package/color
 */
declare module 'color' {
  interface ColorObject {
    r: number
    g: number
    b: number
  }

  interface HslObject {
    h: number
    s: number
    l: number
  }

  interface ColorInstance {
    hex(): string
    rgb(): ColorObject & { array(): number[]; string(): string }
    hsl(): HslObject & { array(): number[]; string(): string }
    object(): ColorObject
    grayscale(): ColorInstance
    alpha(value: number): ColorInstance
    fade(value: number): ColorInstance
    lighten(value: number): ColorInstance
    darken(value: number): ColorInstance
    mix(color: ColorInstance, weight?: number): ColorInstance
    isLight(): boolean
    isDark(): boolean
    toString(): string
  }

  interface ColorConstructor {
    (color: string | ColorInstance): ColorInstance
  }

  const Color: ColorConstructor
  export default Color
}
