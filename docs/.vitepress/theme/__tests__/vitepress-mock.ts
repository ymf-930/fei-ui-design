/**
 * vitepress 瘦身替身（仅测试用）。
 *
 * 为什么需要它：`SidebarLinks.vue` / `SidebarLink.vue` 会 `useData()` / `useRoute()`，
 * 而真实的 vitepress 运行时要求完整的 app 上下文，在单元测试里挂载不起来。
 * 这里只提供这两个 hook 需要的最小形状。
 *
 * 单独成文件是为了配合 `vi.mock('vitepress', async () => await import('./vitepress-mock'))`：
 * `vi.mock` 的工厂会被提升到 import 之前，直接用在外层声明的变量会触发
 * 「Cannot access before initialization」，用动态 import 可以规避。
 */
import { reactive, ref } from 'vue'

export const route = reactive({
  path: '/components/button',
  hash: '',
  query: {},
})

export const page = ref({
  regularPath: '/components/button',
  path: '/components/button.html',
  title: 'Button',
})

export const site = ref({
  base: '/',
  themeConfig: {},
  pages: [],
})

export const theme = ref({})
export const frontmatter = ref({})

export const data = { site, page, theme, frontmatter }

/** 模拟站内跳转：只改 path，保持同一个 route 对象引用（与真实 vue-router 一致） */
export function goto(path) {
  route.path = path
  page.value = { ...page.value, regularPath: path, path: `${path}.html` }
}
