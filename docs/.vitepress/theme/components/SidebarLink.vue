<template>
  <a :href="item.link" title=""
     :class="['sidebar-link', {'active': item.link === route.path.slice(0,-5)}]">
    <f-icon v-if="item.icon" :name="item.icon"></f-icon>
    {{ item.title }}
    <span v-if="item.alias">({{ item.alias }})</span>
  </a>
</template>

<script setup>
import {isActive, hashRE, groupHeaders} from '../util'
import {useData, useRoute} from "vitepress";
const route = useRoute()
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
    font-size .8rem
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
