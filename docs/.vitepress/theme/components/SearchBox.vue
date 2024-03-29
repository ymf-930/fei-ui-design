<template>
  <div
    class="search-box"
    :class="{focused, showSuggestions}"
  >
    <div class="con-input">
      <input
        @input="searchVal = $event.target.value"
        aria-label="Search"
        :value="searchVal"
        :class="{ 'focused': focused }"
        :placeholder="placeholder"
        autocomplete="off"
        spellcheck="false"
        @focus="focused = true, emit('focus')"
        @blur="focused = false, emit('blur')"
        @keyup.enter="go(focusIndex)"
        @keyup.up="onUp"
        @keyup.down="onDown"
        ref="input"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"/>
      </svg>
    </div>
    <transition name="fade">
      <ul
        v-if="showSuggestions"
        class="suggestions"
        :class="{ 'align-right': alignRight }"
        @mouseleave="unfocus"
      >
        <li
          class="suggestion"
          v-for="(s, i) in suggestions"
          :key="i"
          :class="{ focused: i === focusIndex }"
        >
          <!--          @mousedown="go(i)"-->
          <!--          @mouseenter="focus(i)"-->
          <a :href="s.path" @click.prevent>
            <span class="page-title">{{ s.title || s.path }}</span>
            <span v-if="s.header" class="header">
              <i class='bx bx-chevron-right'></i>
              {{ s.header.title }}
            </span>
          </a>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
/* global SEARCH_MAX_SUGGESTIONS, SEARCH_PATHS, SEARCH_HOTKEYS */
import {useData} from "vitepress";
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";

const {site} = useData()
const emit = defineEmits(['focus','blur','showSuggestions'])
const SEARCH_MAX_SUGGESTIONS = 5
const SEARCH_PATHS = null
const SEARCH_HOTKEYS = ['s', '/']

const input = ref(null)
const searchVal = ref('')
const focused = ref(false)
const focusIndex = ref(0)
const placeholder = ref(undefined)

const showSuggestions = computed(() => {
  const active = (
    focused.value
    && suggestions.value
    && suggestions.value.length
  )
  return active
})
const suggestions = computed(() => {
  const query = searchVal.value.trim().toLowerCase()
  if (!query) {
    return
  }

  const {pages} = site.value
  const max = site.value.themeConfig.searchMaxSuggestions || SEARCH_MAX_SUGGESTIONS
  // const localePath = this.$localePath
  const localePath = '/'
  const matches = item => (
    item
    && item.title
    && item.title.toLowerCase().indexOf(query) > -1
  )
  const res = []
  for (let i = 0; i < pages.length; i++) {
    if (res.length >= max) break
    const p = pages[i]
    // filter out results that do not match current locale
    if (getPageLocalePath(p) !== localePath) {
      continue
    }

    // filter out results that do not match searchable paths
    if (!isSearchable(p)) {
      continue
    }

    if (matches(p)) {
      res.push(p)
    } else if (p.headers) {
      for (let j = 0; j < p.headers.length; j++) {
        if (res.length >= max) break
        const h = p.headers[j]
        if (matches(h)) {
          res.push(Object.assign({}, p, {
            path: p.path + '#' + h.slug,
            header: h
          }))
        }
      }
    }
  }
  return res
})
// make suggestions align right when there are not enough items
const alignRight = computed(() => {
  const navCount = (site.value.themeConfig.nav || []).length
  const repo = site.value.repo ? 1 : 0
  return navCount + repo <= 2
})
onMounted(() => {
  const {theme} = useData()
  console.log(theme);
  placeholder.value = theme.value.searchPlaceholder || 'search'
  document.addEventListener('keydown', onHotkey)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onHotkey)
})
watch(() => suggestions.value, () => {
  const active = (
    focused.value
    && suggestions.value
    && suggestions.value.length
  )
  emit('showSuggestions', active)
})
watch(() => focused.value, () => {
  const active = (
    focused.value
    && suggestions.value
    && suggestions.value.length
  )
  emit('showSuggestions', active)
})

function getPageLocalePath(page) {
  for (const localePath in site.value.locales || {}) {
    if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
      return localePath
    }
  }
  return '/'
}

function isSearchable(page) {
  let searchPaths = SEARCH_PATHS

  // all paths searchables
  if (searchPaths === null) {
    return true
  }

  searchPaths = Array.isArray(searchPaths) ? searchPaths : new Array(searchPaths)

  return searchPaths.filter(path => {
    return page.path.match(path)
  }).length > 0
}

function onHotkey(event) {
  if (event.srcElement === document.body && SEARCH_HOTKEYS.includes(event.key)) {
    input.value && input.value.focus()
    event.preventDefault()
  }
}

function onUp() {
  if (showSuggestions.value) {
    if (focusIndex.value > 0) {
      focusIndex.value--
    } else {
      focusIndex.value = suggestions.value.length - 1
    }
  }
}

function onDown() {
  if (showSuggestions.value) {
    if (focusIndex.value < suggestions.value.length - 1) {
      focusIndex.value++
    } else {
      focusIndex.value = 0
    }
  }
}

function go(i) {
  if (!showSuggestions.value) {
    return
  }
  router.push(suggestions.value[i].path)
  searchVal.value = ''
  focusIndex.value = 0
}


function focus(i) {
  focusIndex.value = i
}

function unfocus() {
  focusIndex.value = -1
}


</script>

<style scoped lang="stylus">
$borderColor = rgba(0, 0, 0, .1)
getVar(var)
  unquote("var(--vs-" + var + ")")

.fade-enter-active, .fade-leave-active
  transition: all .25s ease

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity 0
  transform translate(0, calc(100% + 10px)) !important

.darken
  .search-box
    input
      background rgba(0, 0, 0, .25)

.search-box
  display inline-block
  margin-right 1rem
  position relative

  &.showSuggestions
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
    width 15rem
    color getVar(theme-color)
    display inline-block
    border 1px solid darken($borderColor, 10%)
    border-radius 2rem
    font-size 0.85rem
    line-height 2rem
    padding 0 0.5rem 0 2rem
    outline none
    transition all .2s ease
    // background #f4f7f8
    background rgba(0, 0, 0, .05)
    background-size 1rem
    display block
    border-radius 0px
    border 0px
    padding 4px
    padding-left 20px
    opacity 1
    border-radius 14px 5px 14px 14px

    &::placeholder
      color getVar(theme-color)

    &:focus
      width 25rem
      cursor auto

      ~ svg
        transform scale(1.15)

  .suggestions
    background getVar(theme-layout)
    width 100%
    position absolute
    bottom 0px
    top auto !important
    padding 10px
    list-style-type none
    box-shadow 0px 5px 20px -5px rgba(0, 0, 0, .1)
    transform translate(0, calc(100% + 20px))
    min-width 25rem
    margin 0px !important
    border-radius 14px
    z-index 1000

    &.align-right
      right 0

  .suggestion
    display flex
    align-items center
    justify-content flex-start
    padding 0.5rem 0.6rem
    border-radius 12px
    cursor pointer
    transition all .25s ease

    &:hover
      background getVar(theme-bg) !important

    a
      display flex
      align-items center
      justify-content flex-start
      white-space normal
      color getVar(theme-color)

      box-icon
        width 17px
        height 17px
        fill getVar(theme-color)
        margin-right 5px

      .page-title
        font-weight 600

      .header
        font-size 0.9em
        margin-left 0.25em
        opacity .85
        font-weight normal
        display flex
        align-items center
        justify-content center

    &.focused
      // background-color #f3f4f5

      a
        color getVar(theme-color)

@media (max-width: $MQNarrow)
  .search-box
    input
      cursor pointer
      width 40px
      border-color transparent
      position relative

      &::placeholder
        color transparent

      &:focus
        cursor text
        left 0
        width 10rem

        &::placeholder
          color inherit

// Match IE11
@media all and (-ms-high-contrast: none)
  .search-box input
    height 2rem

@media (max-width: $MQNarrow) and (min-width: $MQMobile)
  .search-box
    .suggestions
      left 0

@media (max-width: $MQMobile)
  .search-box
    margin-right 0

    .suggestions
      right 0


@media (max-width: 500px)
  .search-box
    width 100%

  .suggestions
    width calc(100vw - 20px) !important
    min-width auto !important
    right auto
    left 0px

  &.focused
    width 100%

  input
    transition all 0s ease
    color transparent !important

    &:focus
      width 100%
      color inherit !important

    &::placeholder
      color transparent !important
</style>
