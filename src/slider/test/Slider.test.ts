import { describe, test, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Slider from '../src/Slider.vue'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Slider.vue', () => {
  test('区间非法（min > max）时走提示分支，而不是抛 TypeError', async () => {
    // 历史缺陷：Slider.vue 曾以默认导入方式引入 throwError
    // （`import throwError from '../../_utils/log'`），拿到的是 log 对象本身，
    // 调用即 `TypeError: throwError is not a function`。
    // 触发入口是 [min, max] 的 watcher → setValues()。
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const wrapper = mount(Slider, {
      props: { modelValue: 50, min: 0, max: 100 }
    })

    let caught: unknown = null
    try {
      await wrapper.setProps({ min: 200 })
      await nextTick()
    } catch (error) {
      caught = error
    }

    // 旧实现下这里会是 TypeError
    expect(caught).toBe(null)
    // 且必须真的走到了 pretty 提示分支（而非静默吞掉）
    expect(logSpy).toHaveBeenCalledTimes(1)
    expect(String(logSpy.mock.calls[0][0])).toContain('Slider')
    expect(String(logSpy.mock.calls[0][0])).toContain(
      'min should not be greater than max.'
    )
  })

  test('基础渲染与 aria 属性', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 30, min: 0, max: 100, label: '音量' }
    })

    const root = wrapper.get('.fei-slider')
    expect(root.attributes('role')).toBe('slider')
    expect(root.attributes('aria-valuemin')).toBe('0')
    expect(root.attributes('aria-valuemax')).toBe('100')
    expect(root.attributes('aria-orientation')).toBe('horizontal')
    expect(root.attributes('aria-disabled')).toBe('false')
    expect(root.attributes('aria-label')).toBe('音量')
  })

  test('垂直模式切换 aria-orientation', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 30, vertical: true, height: '200px' }
    })
    expect(wrapper.get('.fei-slider').attributes('aria-orientation')).toBe('vertical')
  })

  test('disabled 时映射到 aria-disabled', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 30, disabled: true }
    })
    expect(wrapper.get('.fei-slider').attributes('aria-disabled')).toBe('true')
  })
})
