<template>
  <a :href="href" title=""
     :class="['sidebar-link', {'active': item.link === route.path.slice(0,-5)}]">
    <f-icon v-if="item.icon" :name="item.icon"></f-icon>
    {{ item.title }}
    <span v-if="item.alias">({{ item.alias }})</span>
  </a>
</template>

<script setup>
import {computed} from 'vue'
import {isActive, hashRE, groupHeaders, siteHref} from '../util'
import {useData, useRoute} from "vitepress";
const route = useRoute()
const {site} = useData()
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  sidebarDepth: {
    type: Number,
    default: 0
  },
})

// 侧边栏链接同样走统一出口：补 base + 补 `.html`
// （config.js 的 link() 只补了 base，裸输出会缺少 `.html` 而在静态托管上 404）
const href = computed(() => siteHref(props.item.link, site.value.base))

function renderLink(h, to, text, active, NEW = false, UPDATE = false) {
  var title = ''
  if (NEW) title = 'New'
  if (UPDATE) title = 'Update'
  return h('router-link', {
    attrs: {
      title
    },
    props: {
      to,
      activeClass: '',
      exactActiveClass: ''
    },
    class: {
      active,
      'sidebar-link': true,
      'sidebar-new': NEW,
      'sidebar-update': UPDATE
    }
  }, text)
}

function renderChildren(h, children, path, route, maxDepth, depth = 1, NEWS, UPDATE) {
  if (!children || depth > maxDepth) return null
  return h('ul', {class: 'sidebar-sub-headers'}, children.map(c => {
    const active = isActive(route, path + '#' + c.slug)
    return h('li', {class: 'sidebar-sub-header'}, [
      renderLink(h, path + '#' + c.slug, c.title, active, NEWS.includes(c.slug), UPDATE.includes(c.slug)),
      renderChildren(h, c.children, path, route, maxDepth, depth + 1, NEWS, UPDATE)
    ])
  }))
}
</script>

<style lang="stylus">
getVar(var)
  unquote("var(--vs-" + var + ")")

getColor(var, alpha = 1)
  unquote("rgba(var(--vs-" + var + "), " +alpha + ")")

.sidebar-new
  position relative
  color #42b983 !important
  opacity 1 !important

  &:after
    background #42b983 !important

.sidebar-update
  position relative
  color rgb(255, 186, 0) !important
  opacity 1 !important

  &:after
    background rgb(255, 186, 0) !important

.sidebar .sidebar-sub-headers
  padding-left 1rem
  font-size 0.95em

a.sidebar-link
  font-size .95rem
  display inline-block
  // color $textColor
  color getVar(theme-color)
  padding 0.3rem 1rem 0.3rem 1.25rem
  width: 100%
  box-sizing: border-box
  transition all .25s ease
  opacity 0.8
  font-weight normal
  position relative
  margin-left 0px

  span {
    // 原为 .8rem = 12.8px，低于中文小字的常规下限 13px，且是全站最小的正文级文字。
    // 改用排版层的「小号」token（14px）后与正文 15px 只差 1px，层次成立。
    // 侧边栏固定 260px，最长条目为 9 个字符（实测），不会因此换行。
    font-size var(--fd-fs-sm)
  }

  &:after
    content: ''
    position absolute
    top 50%
    transform translate(0, -50%)
    left 0px
    width 5px
    background getVar(theme-color)
    height 0px
    transition all .25s ease
    border-radius 0px 5px 5px 0px

  &.active, &:hover
    opacity 1
    background-color: rgba(0, 0, 0, 0.06);
    border-radius 0.45rem;

  &.active
    &:after
      height 30px

  .sidebar-group &
    padding-left 2rem

  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-left none

    &.active
      font-weight 500
</style>
