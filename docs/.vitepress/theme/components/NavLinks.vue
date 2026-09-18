<template>
  <nav
    class="nav-links"
    v-if="userLinks.length || repoLink"
  >
    <!-- user links -->
    <div
      class="nav-item"
      v-for="item in userLinks"
      :key="item.link"
    >
      <DropdownLink
        v-if="item.type === 'links'"
        :item="item"
      />
      <NavLink
        v-else
        :item="item"
      />
    </div>
  </nav>
</template>

<script setup>
import DropdownLink from '../components/DropdownLink.vue'
import NavLink from '../components/NavLink.vue'
import {resolveNavLinkItem} from '../util'
import {useData} from "vitepress"
import {computed} from "vue"

const {site, theme} = useData()
const {themeConfig} = site.value
// 必须先经过 resolveNavLinkItem()：它会给「带 items 的项」打上 type: 'links'，
// 而 DropdownLink 是靠 `item.type === 'links'` 才会渲染的。
// 旧代码直接返回 themeConfig.nav，item.type 恒为 undefined，
// 于是「指南」的下拉容器从未出现，5 个子项（安装 / SFC / 按需引入 / 变更日志…）都点不到。
// 这里传 {...item} 是为了不改动 siteData 本身（原函数会就地 Object.assign）。
const userLinks = computed(() => {
  return (themeConfig.nav || []).map(item => resolveNavLinkItem({...item}))
})
const repoLink = computed(() => {
  const {repo} = site.value.themeConfig
  if (repo) {
    return /^https?:/.test(repo)
      ? repo
      : `https://github.com/${repo}`
  }
})
</script>

<style lang="stylus">
getVar(var)
  unquote("var(--fei-" + var + ")")

getColor(vsColor, alpha = 1)
  unquote("rgba(var(--fei-" + vsColor + "), " +alpha + ")")

.nav-links
  display flex
  align-items center
  justify-content center

  a
    line-height 1.4rem
    color inherit

    &:hover, &.router-link-active
      color getVar(theme-color)

  .nav-item
    position relative
    display inline-block
    transition all .25s ease

    a
      opacity 1
      transition all .25s ease
      display block
      padding 18px

      &:after
        content: ''
        position absolute
        left 50%
        transform translate(-50%)
        bottom -3px
        width 0px
        height 3px
        background getVar(theme-color)
        border-radius 2px
        transition all .25s ease

      &:hover, &.router-link-active
        color getVar(theme-color) !important

      &.router-link-active
        &:after
          width 18px

    &:first-child
      margin-left 0

  .repo-link
    margin-left 1.5rem

</style>
