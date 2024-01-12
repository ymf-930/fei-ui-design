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
import {useData} from "vitepress"
import {computed} from "vue"

const {site, theme} = useData()
const {themeConfig} = site.value
const userLinks = computed(() => {
  return themeConfig.nav || []
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
  unquote("var(--vs-" + var + ")")

getColor(vsColor, alpha = 1)
  unquote("rgba(var(--vs-" + vsColor + "), " +alpha + ")")

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

@media (max-width: $MQMobile)
  .nav-links
    .nav-item, .repo-link
      margin-left 0

@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color getVar(theme-color)
</style>
