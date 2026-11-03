import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../src/Button.vue'

describe('Button.vue', () => {
  test('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    })

    // 查看是否包含某个class
    expect(wrapper.classes()).toContain('fei-button--primary')
    // slot
    // get, find
    expect(wrapper.get('button').text()).toBe('button')
    // 测试事件
    wrapper.get('button').trigger('click')
    // 事件中是否有属性
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  test('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled'
      }
    })
    // 判断属性attributes
    expect(wrapper.attributes('disabled')).toBeDefined()
    // attributes
    expect(wrapper.find('button').element.disabled).toBeDefined()
    // 测试事件
    wrapper.get('button').trigger('click')
    // 事件中是否有属性
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  test('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      }
    })
    // 图标容器与图标类名均应正确渲染
    const iconWrap = wrapper.get('.fei-button__icon')
    expect(iconWrap.element).toBeTruthy()
    expect(iconWrap.find('i.f-icon-arrow-up').exists()).toBe(true)
  })

  test('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      }
    })
    expect(wrapper.classes()).toContain('is-loading')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
