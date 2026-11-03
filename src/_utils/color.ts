/**
 * 依赖color插件，在此基础上封装部分转换函数
 * 参考文档说明：https://www.npmjs.com/package/color
 */
import Color from 'color'

// 调色板
export function getPalette(color: string): string[] {
  const normalColor = Color(color).hex().toString().toLowerCase()
  // active
  const darkColor1 = mixBlack(normalColor, 0.1)
  const darkColor2 = mixBlack(normalColor, 0.2)
  const darkColor3 = mixBlack(normalColor, 0.3)
  const darkColor4 = mixBlack(normalColor, 0.4)
  // light
  const lightColor1 = mixWhite(normalColor, 0.2)
  const lightColor2 = mixWhite(normalColor, 0.4)
  const lightColor3 = mixWhite(normalColor, 0.6)
  const lightColor4 = mixWhite(normalColor, 0.8)
  const lightColor5 = mixWhite(normalColor, 0.9)
  const lightColor6 = mixWhite(normalColor, 0.95)

  return [
    darkColor4,
    darkColor3,
    darkColor2,
    darkColor1,
    normalColor,
    lightColor1,
    lightColor2,
    lightColor3,
    lightColor4,
    lightColor5,
    lightColor6
  ]
}

// getObject
export function toObject(color: string): { r: number; g: number; b: number } {
  return Color(color).object()
}

// getHex
export function toHex(color: string, toLowerCase = true): string {
  const hex = Color(color).hex().toString()
  return toLowerCase ? hex.toLowerCase() : hex
}

// getRgbArr
export function toRgbArr(color: string): number[] {
  return Color(color).rgb().array()
}

// getHslArr
export function toHslArr(color: string): { h: number; s: number; l: number } {
  return Color(color).hsl()
}

// grayscale
export function grayscale(color: string): string {
  return Color(color).grayscale().toString()
}

/// 两个颜色值比较
export function isEqual(color1: string, color2: string): boolean {
  return Color(color1).toString() === Color(color2).toString()
}

// 是否是light
export function isLight(color: string): boolean {
  return Color(color).isLight()
}

// 是否是dark
export function isDark(color: string): boolean {
  return Color(color).isDark()
}

// 混合色，浓度
export function mix(mixColor: string, color: string, concentration: number): string {
  return Color(color).mix(Color(mixColor), concentration).hex().toLowerCase()
}

// 混合白色
export function mixWhite(color: string, concentration: number): string {
  return mix('#ffffff', color, concentration)
}

// 混合黑色
export function mixBlack(color: string, concentration: number): string {
  return mix('#000000', color, concentration)
}

// 透明度
export function alpha(color: string, alpha: number): string {
  return Color(color).alpha(alpha).toString()
}

// 渐隐
export function fade(color: string, fade: number): string {
  return Color(color).fade(fade).toString()
}

// 变轻
export function lighten(color: string, concentration: number): string {
  return Color(color).lighten(concentration).toString()
}

// 变深
export function darken(color: string, concentration: number): string {
  return Color(color).darken(concentration).toString()
}
