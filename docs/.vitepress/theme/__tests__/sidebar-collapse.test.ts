/**
 * 文档站侧边栏「展开 / 收起子栏目」的运行期回归测试。
 *
 * 背景（见 docs/.internal/refactor-plan.md §8.10 入口 1、§8.11.2）：
 *   这个入口原本点击后只弹一条「暂未开发」，且**修不掉**——两个叠在一起的原因：
 *   1. 状态传递写成了副本：`app.config.globalProperties.vsTheme` 是普通对象，
 *      各组件用 `{ ...vsTheme }` 取值 → 一处写入其它组件读不到；
 *   2. `:open="fixed || i === openGroupIndex || vsThemeVal.sidebarCollapseOpen"`
 *      用 `||` 串联全局开关 → 全局为 true 时表达式恒真，分组标题**点开也收不起**。
 *
 * 这份测试**必须能跑出真实 DOM 变化**（挂载真实组件 + 点击真实节点），
 * 而不是断言「源码里写法变了」——后者证明不了界面真的会动。
 *
 * 反向自检（提交前手工做过）：把 `:open` 还原成旧表达式 → 第 3 条用例失败。
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { reactive, nextTick } from 'vue'
import { mount } from '@vue/test-utils'

vi.mock('vitepress', async () => {
  const mock = await import('./vitepress-mock')
  return {
    useRoute: () => mock.route,
    useData: () => mock.data,
  }
})

/**
 * 模拟 app 级单例：真实实现是 enhanceApp 里的
 * `app.config.globalProperties.vsTheme = reactive({...})`。
 * 关键在于「同一个 reactive 对象被所有挂载实例共享」——这正是被测的不变量。
 */
const globalTheme = reactive({
  mobileActive: false,
  openCode: false,
  themeDarken: false,
  sidebarCollapseOpen: true,
})

const items = [
  {
    type: 'group',
    title: '组件 A 组',
    children: [{ type: 'page', title: 'A1', path: '/components/button' }],
  },
  {
    type: 'group',
    title: '组件 B 组',
    children: [{ type: 'page', title: 'B1', path: '/components/input' }],
  },
]

async function mountSidebar(props = {}) {
  const SidebarLinks = (await import('../components/SidebarLinks.vue')).default
  const wrapper = mount(SidebarLinks, {
    props: { items, depth: 0, sidebarDepth: 0, ...props },
    global: { config: { globalProperties: { vsTheme: globalTheme } } },
  })
  await nextTick()
  return wrapper
}

/** 分组是否展开：SidebarGroup 会给标题元素加 `.open` */
const openCount = (w) => w.findAll('.sidebar-heading.open').length
const headings = (w) => w.findAll('.sidebar-heading')

describe('文档站侧边栏：展开 / 收起子栏目', () => {
  beforeEach(async () => {
    globalTheme.sidebarCollapseOpen = true
    const { route, page } = await import('./vitepress-mock')
    route.path = '/components/button'
    page.value = { ...page.value, regularPath: '/components/button' }
  })

  it('全局开关为 true 时，所有分组展开', async () => {
    const w = await mountSidebar()
    expect(openCount(w)).toBe(2)
  })

  it('全局开关关闭后，只有当前页面所在分组保持展开（写入能跨组件传播）', async () => {
    const w = await mountSidebar()
    globalTheme.sidebarCollapseOpen = false
    await nextTick()

    expect(openCount(w)).toBe(1)
    expect(headings(w)[0].classes()).toContain('open')
    expect(headings(w)[1].classes()).not.toContain('open')
  })

  it('全局展开时，仍能单独收起某一个分组（旧实现此处恒真，点了没反应）', async () => {
    const w = await mountSidebar()
    expect(openCount(w)).toBe(2)

    await headings(w)[0].trigger('click')
    await nextTick()
    expect(openCount(w)).toBe(1)
    expect(headings(w)[0].classes()).not.toContain('open')

    await headings(w)[0].trigger('click')
    await nextTick()
    expect(openCount(w)).toBe(2)
  })

  it('全局收起时，可以单独展开某个分组', async () => {
    const w = await mountSidebar()
    globalTheme.sidebarCollapseOpen = false
    await nextTick()
    expect(openCount(w)).toBe(1)

    await headings(w)[1].trigger('click')
    await nextTick()
    expect(openCount(w)).toBe(2)
  })

  it('再次切换全局开关时，逐组覆盖被清空（开关名副其实）', async () => {
    const w = await mountSidebar()
    await headings(w)[0].trigger('click')
    await nextTick()
    expect(openCount(w)).toBe(1)

    globalTheme.sidebarCollapseOpen = false
    await nextTick()
    globalTheme.sidebarCollapseOpen = true
    await nextTick()
    expect(openCount(w)).toBe(2)
  })

  it('fixed=true 时强制全展开，全局开关不生效', async () => {
    const w = await mountSidebar({ fixed: true })
    globalTheme.sidebarCollapseOpen = false
    await nextTick()
    expect(openCount(w)).toBe(2)
  })

  it('切换页面后，默认展开的分组跟随变化', async () => {
    const w = await mountSidebar()
    globalTheme.sidebarCollapseOpen = false
    await nextTick()
    expect(headings(w)[1].classes()).not.toContain('open')

    const { goto } = await import('./vitepress-mock')
    goto('/components/input')
    await nextTick()
    await nextTick()

    expect(headings(w)[1].classes()).toContain('open')
  })
})
