/**
 * 尺寸校验（可直接作为 prop 的 validator 使用，因此入参保持宽松）
 */
export const validSize = (val: any): boolean => ['', 'large', 'default', 'small', 'mini'].includes(val)
