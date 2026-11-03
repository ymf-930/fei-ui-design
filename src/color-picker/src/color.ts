export interface ColorOptions {
  [key: string]: any
}

interface RGB {
  r: number
  g: number
  b: number
}

const hsv2hsl = function (hue: number, sat: number, val: number): number[] {
  return [hue, (sat * val) / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue) || 0, hue / 2]
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
const isOnePointZero = function (n: number | string): boolean {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1
}

const isPercentage = function (n: number | string): boolean {
  return typeof n === 'string' && n.indexOf('%') !== -1
}

// Take input from [0, n] and return it as [0, 1]
const bound01 = function (value: number | string, max: number | string): number {
  if (isOnePointZero(value)) value = '100%'

  const processPercent = isPercentage(value)
  let num = Math.min(+max, Math.max(0, parseFloat(value + '')))

  // Automatically convert percentage into number
  if (processPercent) {
    num = parseInt(num * +max + '', 10) / 100
  }

  // Handle floating point rounding errors
  if (Math.abs(num - +max) < 0.000001) {
    return 1
  }

  // Convert into [0, 1] range if it isn't already
  return (num % +max) / parseFloat(max + '')
}

const INT_HEX_MAP: Record<number, string> = { 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F' }

const toHex = function ({ r, g, b }: RGB): string {
  const hexOne = function (value: number): string {
    value = Math.min(Math.round(value), 255)
    const high = Math.floor(value / 16)
    const low = value % 16
    return '' + (INT_HEX_MAP[high] || high) + (INT_HEX_MAP[low] || low)
  }

  if (isNaN(r) || isNaN(g) || isNaN(b)) return ''

  return '#' + hexOne(r) + hexOne(g) + hexOne(b)
}

const HEX_INT_MAP: Record<string, number> = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 }

const parseHexChannel = function (hex: string): number {
  if (hex.length === 2) {
    return (
      (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 + (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1])
    )
  }

  return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1]
}

const hsl2hsv = function (hue: number, sat: number, light: number): { h: number; s: number; v: number } {
  let s = sat / 100
  let l = light / 100
  let smin = s
  const lmin = Math.max(l, 0.01)

  l *= 2
  s *= l <= 1 ? l : 2 - l
  smin *= lmin <= 1 ? lmin : 2 - lmin
  const v = (l + s) / 2
  const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s)

  return {
    h: hue,
    s: sv * 100,
    v: v * 100
  }
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
const rgb2hsv = function (r: number | string, g: number | string, b: number | string): { h: number; s: number; v: number } {
  const red = bound01(r, 255)
  const green = bound01(g, 255)
  const blue = bound01(b, 255)

  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  let h
  const v = max

  const d = max - min
  const s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0 // achromatic
  } else {
    switch (max) {
      case red: {
        h = (green - blue) / d + (green < blue ? 6 : 0)
        break
      }
      case green: {
        h = (blue - red) / d + 2
        break
      }
      case blue: {
        h = (red - green) / d + 4
        break
      }
      default: {
        h = 0
      }
    }
    h /= 6
  }

  return { h: h * 360, s: s * 100, v: v * 100 }
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
const hsv2rgb = function (h: number | string, s: number | string, v: number | string): RGB {
  const hue = bound01(h, 360) * 6
  const saturation = bound01(s, 100)
  const value = bound01(v, 100)

  const i = Math.floor(hue)
  const f = hue - i
  const p = value * (1 - saturation)
  const q = value * (1 - f * saturation)
  const t = value * (1 - (1 - f) * saturation)
  const mod = i % 6
  const r = [value, q, p, p, t, value][mod]
  const g = [t, value, value, q, p, p][mod]
  const b = [p, p, t, value, value, q][mod]

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

export default class Color {
  _hue: number
  _saturation: number
  _value: number
  _alpha: number
  enableAlpha: boolean
  format: string
  value: string
  selected: boolean
  options: ColorOptions

  constructor(options: ColorOptions = {}) {
    this._hue = 0
    this._saturation = 100
    this._value = 100
    this._alpha = 100
    this.enableAlpha = false
    this.format = 'hex'
    this.value = ''
    this.selected = false
    this.options = options

    for (const option in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(option)) {
        ;(this as ColorOptions)[option] = options[option]
      }
    }

    this.doOnChange()
  }

  set(prop: string | ColorOptions, value?: any): void {
    if (arguments.length === 1 && typeof prop === 'object') {
      for (const p in prop) {
        // eslint-disable-next-line no-prototype-builtins
        if (prop.hasOwnProperty(p)) {
          this.set(p, prop[p])
        }
      }
      return
    }

    ;(this as ColorOptions)[`_${prop}`] = value
    this.doOnChange()
  }

  get(prop: string): number {
    return (this as ColorOptions)[`_${prop}`]
  }

  toRgb(): RGB {
    return hsv2rgb(this._hue, this._saturation, this._value)
  }

  fromString(value: string): void {
    if (!value) {
      this._hue = 0
      this._saturation = 100
      this._value = 100

      this.doOnChange()
      return
    }

    const fromHSV = (h: number, s: number, v: number) => {
      this._hue = Math.max(0, Math.min(360, h))
      this._saturation = Math.max(0, Math.min(100, s))
      this._value = Math.max(0, Math.min(100, v))

      this.doOnChange()
    }

    if (value.indexOf('hsl') !== -1) {
      const parts = value
        .replace(/hsla|hsl|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter(val => val !== '')
        .map((val, index) => (index > 2 ? parseFloat(val) : parseInt(val, 10)))

      if (parts.length === 4) {
        this._alpha = Math.floor(parts[3] * 100)
      } else if (parts.length === 3) {
        this._alpha = 100
      }
      if (parts.length >= 3) {
        const { h, s, v } = hsl2hsv(parts[0], parts[1], parts[2])
        fromHSV(h, s, v)
      }
    } else if (value.indexOf('hsv') !== -1) {
      const parts = value
        .replace(/hsva|hsv|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter(val => val !== '')
        .map((val, index) => (index > 2 ? parseFloat(val) : parseInt(val, 10)))

      if (parts.length === 4) {
        this._alpha = Math.floor(parts[3] * 100)
      } else if (parts.length === 3) {
        this._alpha = 100
      }
      if (parts.length >= 3) {
        fromHSV(parts[0], parts[1], parts[2])
      }
    } else if (value.indexOf('rgb') !== -1) {
      const parts = value
        .replace(/rgba|rgb|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter(val => val !== '')
        .map((val, index) => (index > 2 ? parseFloat(val) : parseInt(val, 10)))

      if (parts.length === 4) {
        this._alpha = Math.floor(parts[3] * 100)
      } else if (parts.length === 3) {
        this._alpha = 100
      }
      if (parts.length >= 3) {
        const { h, s, v } = rgb2hsv(parts[0], parts[1], parts[2])
        fromHSV(h, s, v)
      }
    } else if (value.indexOf('#') !== -1) {
      const hex = value.replace('#', '').trim()
      if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$/.test(hex)) return

      const channels =
        hex.length === 3
          ? [hex[0] + hex[0], hex[1] + hex[1], hex[2] + hex[2]]
          : [hex.substring(0, 2), hex.substring(2, 4), hex.substring(4, 6)]
      const [r, g, b] = channels.map(parseHexChannel)

      if (hex.length === 8) {
        this._alpha = Math.floor((parseHexChannel(hex.substring(6)) / 255) * 100)
      } else if (hex.length === 3 || hex.length === 6) {
        this._alpha = 100
      }

      const { h, s, v } = rgb2hsv(r, g, b)
      fromHSV(h, s, v)
    }
  }

  compare(color: Color): boolean {
    return (
      Math.abs(color._hue - this._hue) < 2 &&
      Math.abs(color._saturation - this._saturation) < 1 &&
      Math.abs(color._value - this._value) < 1 &&
      Math.abs(color._alpha - this._alpha) < 1
    )
  }

  doOnChange(): void {
    const { _hue, _saturation, _value, _alpha, format } = this

    if (this.enableAlpha) {
      switch (format) {
        case 'hsl': {
          const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100)
          this.value = `hsla(${_hue}, ${Math.round(hsl[1] * 100)}%, ${Math.round(hsl[2] * 100)}%, ${
            _alpha / 100
          })`
          break
        }
        case 'hsv': {
          this.value = `hsva(${_hue}, ${Math.round(_saturation)}%, ${Math.round(_value)}%, ${_alpha / 100})`
          break
        }
        default: {
          const { r, g, b } = hsv2rgb(_hue, _saturation, _value)
          this.value = `rgba(${r}, ${g}, ${b}, ${_alpha / 100})`
        }
      }
    } else {
      switch (format) {
        case 'hsl': {
          const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100)
          this.value = `hsl(${_hue}, ${Math.round(hsl[1] * 100)}%, ${Math.round(hsl[2] * 100)}%)`
          break
        }
        case 'hsv': {
          this.value = `hsv(${_hue}, ${Math.round(_saturation)}%, ${Math.round(_value)}%)`
          break
        }
        case 'rgb': {
          const { r, g, b } = hsv2rgb(_hue, _saturation, _value)
          this.value = `rgb(${r}, ${g}, ${b})`
          break
        }
        default: {
          this.value = toHex(hsv2rgb(_hue, _saturation, _value))
        }
      }
    }
  }
}
