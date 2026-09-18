<template>
  <div
    class="search-box"
    :class="{ focused, 'show-suggestions': open }"
  >
    <div class="con-input">
      <input
        ref="inputRef"
        :value="query"
        :placeholder="placeholder"
        :aria-expanded="open ? 'true' : 'false'"
        aria-label="站内搜索"
        aria-controls="search-suggestions"
        role="combobox"
        autocomplete="off"
        spellcheck="false"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.enter.prevent="go(focusIndex)"
        @keydown.up.prevent="move(-1)"
        @keydown.down.prevent="move(1)"
        @keydown.esc.prevent="close"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"/>
      </svg>
    </div>

    <!--
      `@mousedown.prevent` 不是装饰：下拉项要能点。
      没有它时，鼠标按下的瞬间 input 先 blur → `open` 变 false → 整个下拉被卸载，
      随后的 click 落在一个已经消失的节点上，永远不触发。
      阻止 mousedown 默认行为即可保住焦点，同时 click 照常派发。
    -->
    <transition name="fade">
      <ul
        v-if="open"
        id="search-suggestions"
        class="suggestions"
        role="listbox"
        @mousedown.prevent
      >
        <li v-if="loading" class="suggestion suggestion--empty">正在加载搜索索引…</li>
        <li v-else-if="error" class="suggestion suggestion--empty">{{ error }}</li>
        <li v-else-if="!results.length" class="suggestion suggestion--empty">
          未找到与「{{ query.trim() }}」匹配的内容
        </li>
        <template v-else>
          <li
            v-for="(s, i) in results"
            :key="s.href"
            class="suggestion"
            :class="{ focused: i === focusIndex }"
            role="option"
            :aria-selected="i === focusIndex"
            @mouseenter="focusIndex = i"
          >
            <a :href="s.href">
              <span class="page-title">{{ s.title }}</span>
              <span v-if="s.header" class="header">
                <i class="bx bx-chevron-right"></i>{{ s.header }}
              </span>
              <span v-if="s.snippet.length" class="snippet">
                <template v-for="(part, j) in s.snippet" :key="j">
                  <mark v-if="part.hit">{{ part.text }}</mark>
                  <template v-else>{{ part.text }}</template>
                </template>
              </span>
            </a>
          </li>
        </template>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { siteHref } from '../util'

/**
 * 站内搜索。
 *
 * ## 这份实现替换了什么
 *
 * 旧版是从 VuePress 0.x 抄来的，在 VitePress 1.x 下**完全不可用**：
 * - `const { pages } = site.value` —— `SiteData` 里没有 `pages`，
 *   输入第一个字符就在 computed 里抛 `Cannot read properties of undefined (reading 'length')`；
 * - `router.push(...)` —— `router` 从未声明也从未导入，即使前面不抛也是 ReferenceError；
 * - `useData()` 被写在 `onMounted` 里 —— 生命周期钩子中 `inject()` 取不到 provider，
 *   解构 undefined 直接抛错，导致后面的 `keydown` 快捷键**一次都没注册上**；
 * - 只匹配页面标题、写死最多 5 条、`aria-label="Search"`。
 *
 * 现在：索引在**构建期**生成（见 `.vitepress/utils/search-index.js`），
 * 覆盖每个页面的标题 + 二级/三级小标题 + 正文，首次输入时懒加载，
 * 支持 ↑/↓/Enter/Esc、鼠标点击、空结果提示与中文无障碍标签。
 */
const { site, theme } = useData()
const emit = defineEmits(['focus', 'blur', 'showSuggestions'])

// 一次最多展示多少条；同一个小节不重复出现
const MAX_RESULTS = 20

const inputRef = ref(null)
const query = ref('')
const focused = ref(false)
const dismissed = ref(false)
const focusIndex = ref(0)
const loading = ref(false)
const error = ref('')
const placeholder = ref('搜索文档')

/** @type {import('vue').Ref<Array<{path:string,title:string,sections:Array<{title:string,id:string,text:string}>}>>} */
const index = ref([])
let indexPromise = null

const trimmed = computed(() => query.value.trim())
const open = computed(() => focused.value && !dismissed.value && trimmed.value.length > 0)
const results = computed(() => search(trimmed.value))

/**
 * 懒加载索引。只请求一次，并发调用共享同一个 Promise。
 * 开发环境没有构建产物 ⇒ 明确告诉用户，而不是留一个「搜不到」的假象。
 */
function loadIndex() {
  if (indexPromise) return indexPromise
  loading.value = true
  error.value = ''
  const url = `${site.value.base}search-index.json`.replace(/([^:])\/{2,}/g, '$1/')
  indexPromise = fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(String(res.status))
      return res.json()
    })
    .then(list => {
      index.value = Array.isArray(list) ? list : []
      return index.value
    })
    .catch(() => {
      error.value = import.meta.env.DEV
        ? '开发环境暂无搜索索引（需先执行 docs:build 生成）'
        : '搜索索引加载失败，请刷新重试'
      indexPromise = null
      return []
    })
    .finally(() => {
      loading.value = false
    })
  return indexPromise
}

/** 收录命中片段：返回 [{text, hit}] 便于模板逐段渲染（不用 v-html） */
function snippetOf(text, needle) {
  const at = text.toLowerCase().indexOf(needle)
  if (at < 0) return []
  const from = Math.max(0, at - 16)
  const cut = text.slice(from, from + 90)
  const hits = []
  let rest = cut
  const lower = needle
  for (;;) {
    const i = rest.toLowerCase().indexOf(lower)
    if (i < 0) {
      if (rest) hits.push({ text: rest, hit: false })
      break
    }
    if (i > 0) hits.push({ text: rest.slice(0, i), hit: false })
    hits.push({ text: rest.slice(i, i + needle.length), hit: true })
    rest = rest.slice(i + needle.length)
  }
  return hits.filter(p => p.text)
}

/**
 * 打分：标题 > 小标题 > 正文，前缀命中额外加权。
 * 同一页面最多出 3 条（避免一个长页面把所有结果位占满）。
 */
function search(raw) {
  if (!raw || !index.value.length) return []
  const needle = raw.toLowerCase()
  const scored = []
  const perDoc = new Map()

  for (const doc of index.value) {
    const pageTitle = (doc.title || '').toLowerCase()
    for (const sec of doc.sections || []) {
      const head = (sec.title || '').toLowerCase()
      const body = (sec.text || '').toLowerCase()
      let score = 0

      if (pageTitle === needle) score += 200
      else if (pageTitle.startsWith(needle)) score += 120
      else if (pageTitle.includes(needle)) score += 80

      if (head === needle) score += 160
      else if (head.startsWith(needle)) score += 100
      else if (head.includes(needle)) score += 60

      const at = body.indexOf(needle)
      if (at >= 0) {
        let count = 0
        let from = at
        while (count < 5) {
          count++
          from = body.indexOf(needle, from + needle.length)
          if (from < 0) break
        }
        score += 20 + count * 4
      }

      if (score <= 0) continue

      const used = perDoc.get(doc.path) || 0
      if (used >= 3) continue
      perDoc.set(doc.path, used + 1)

      const path = sec.id ? `${doc.path}#${sec.id}` : doc.path
      scored.push({
        score: score - used * 5,
        href: siteHref(path, site.value.base),
        title: doc.title || doc.path,
        header: sec.title || '',
        snippet: snippetOf(sec.text || '', needle),
      })
    }
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS)
}

function onInput(e) {
  query.value = e.target.value
  dismissed.value = false
  focusIndex.value = 0
  if (trimmed.value.length) loadIndex()
}

function onFocus() {
  focused.value = true
  dismissed.value = false
  emit('focus')
  if (trimmed.value.length) loadIndex()
}

function onBlur() {
  focused.value = false
  emit('blur')
}

function close() {
  dismissed.value = true
  focusIndex.value = 0
}

function move(step) {
  if (!open.value || !results.value.length) return
  const total = results.value.length
  focusIndex.value = (focusIndex.value + step + total) % total
}

function go(i) {
  const hit = results.value[i]
  if (!hit) return
  // 原生跳转（全站导航/侧边栏也是原生 <a>），与主题既有约定一致
  window.location.href = hit.href
}

function onHotkey(event) {
  // 在输入框 / 文本域 / 可编辑区里不抢键
  const el = event.target
  const tag = el && el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || (el && el.isContentEditable)) return
  const isK = event.key === 'k' || event.key === 'K'
  if ((event.metaKey || event.ctrlKey) && isK) {
    inputRef.value && inputRef.value.focus()
    event.preventDefault()
    return
  }
  if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
    inputRef.value && inputRef.value.focus()
    event.preventDefault()
  }
}

watch(open, val => emit('showSuggestions', val))

onMounted(() => {
  placeholder.value = theme.value.searchPlaceholder || '搜索文档'
  document.addEventListener('keydown', onHotkey)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onHotkey)
})
</script>

<style scoped lang="stylus">
getVar(var)
  unquote("var(--vs-" + var + ")")

.fade-enter-active, .fade-leave-active
  transition: all .2s ease

.fade-enter, .fade-leave-to
  opacity 0
  transform translate(0, -6px)

.search-box
  display inline-block
  margin-right 1rem
  position relative

  &.show-suggestions
    .con-input
      input
        background getVar(theme-bg2)

  .con-input
    display flex
    align-items center
    position relative

    svg
      position absolute
      right 10px
      width 20px
      pointer-events none
      transition all .2s ease
      fill getVar(theme-color)

  input
    cursor text
    display block
    width 15rem
    color getVar(theme-color)
    font-size 0.85rem
    padding 4px 20px
    outline none
    border 0px
    background rgba(0, 0, 0, .05)
    border-radius 14px 5px 14px 14px
    transition all .2s ease

    &::placeholder
      color getVar(theme-color)

    &:focus
      width 25rem
      cursor auto

      ~ svg
        transform scale(1.15)

  // 下拉：**右对齐**。搜索框贴在导航栏最右侧，若按左侧对齐，
  // 400px 宽的面板会直接顶出视口右边。
  .suggestions
    position absolute
    top calc(100% + 10px)
    right 0
    left auto
    z-index 1000
    width 26rem
    max-width calc(100vw - 32px)
    max-height 60vh
    overflow-y auto
    margin 0px
    padding 8px
    list-style none
    background getVar(theme-layout)
    border 1px solid rgba(0, 0, 0, .08)
    border-radius 14px
    box-shadow 0px 16px 40px -12px rgba(0, 0, 0, .28)

  .suggestion
    border-radius 10px
    transition background .15s ease
    cursor pointer

    &:hover,
    &.focused
      background getVar(theme-bg)

    a
      display block
      padding 8px 10px
      color getVar(theme-color)
      text-decoration none

    .page-title
      font-size var(--fd-fs-sm)
      font-weight 600

    .header
      display inline-flex
      align-items center
      margin-left 4px
      font-size var(--fd-fs-xs)
      opacity .8

    .snippet
      display block
      margin-top 2px
      font-size var(--fd-fs-xs)
      line-height 1.5
      opacity .7
      overflow hidden
      text-overflow ellipsis
      white-space nowrap

    mark
      background rgba(37, 100, 255, .18)
      border-radius 3px
      color inherit
      font-weight 700

    &--empty
      padding 10px
      font-size var(--fd-fs-sm)
      opacity .6
      cursor default

      &:hover
        background transparent

.darken
  .search-box
    input
      background rgba(0, 0, 0, .25)

    .suggestions
      border-color rgba(255, 255, 255, .1)

@media (max-width: 500px)
  .search-box
    width 100%
    margin-right 0

    input
      transition all 0s ease
      color transparent !important

      &:focus
        width 100%
        color inherit !important

      &::placeholder
        color transparent !important

    .suggestions
      width calc(100vw - 24px)
      right auto
      left 0px
</style>
