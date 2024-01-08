<template>
  <header class="navbar fixed">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

    <router-link
        to="/"
        class="home-link"
    >
      <div flex="cross:center">
        <img class="logo-img" src="../../../public/vuesax-only.png" alt="">
        <h1 class="logo-title pl-10">F-UI-DESIGN</h1>
      </div>
    </router-link>
    <div :class="{'remove-links': focused}"
         class="external-links-search">
      <div class="links"
           :style="linksWrapMaxWidth
           ? {'max-width': linksWrapMaxWidth + 'px'}
           : {}"
      >
        <NavLinks class="can-hide"/>
      </div>
      <span title="Previous Version" class="v-old">v3.x</span>
      <div class="con-links">
        <a title="Github" target="_blank" href="https://github.com/ymf930/fei-ui-design">
          <i class="bx bxl-github"></i>
        </a>
      </div>
      <SearchBox
          @focus="focused = true"
          @blur="focused = false"
          @showSuggestions="handleShowSuggestions"
          v-if="theme.search !== false && frontmatter.search !== false"/>
    </div>
  </header>
</template>

<script setup>
import {useData} from "vitepress"
import SidebarButton from '../components/SidebarButton.vue'
import NavLinks from './NavLinks.vue'
import SearchBox from './SearchBox.vue'
import {onMounted, ref} from "vue";

const {frontmatter, theme} = useData()
const linksWrapMaxWidth = ref(null)
const showSuggestions = ref(false)
const focused = ref(false)


onMounted(() => {
  const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
  const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
  const handleLinksWrapWidth = () => {
    if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
      this.linksWrapMaxWidth = null
    } else {
      this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
    }
  }
  handleLinksWrapWidth()
  window.addEventListener('resize', handleLinksWrapWidth, false)

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 0) {
      this.$el.classList.add('fixed')
    } else {
      this.$el.classList.remove('fixed')
    }
  })
})

function handleShowSuggestions(active) {
  this.showSuggestions = active
}

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem
getVar(var)
  unquote("var(--vs-" + var + ")")

.logo-img
  fill getVar(theme-color)
  height 28px

.logo-title
  font-size: 1.4rem;
  font-weight: bold;

.home-link
  position absolute
  left 0px
  font-weight bold
  padding-left 30px

.v-old
  padding 10px
  color inherit
  opacity .5
  transition all .25s ease

  &:hover
    opacity 1

.external-links-search
  display flex
  align-items center
  justify-content center
  position absolute
  right 0px

  &.remove-links
    // width calc(100% - 60px)

    .con-links, .v-old
      display none

  .con-links
    display flex
    align-items center
    justify-content center
    margin-right 10px

    a
      list-style none
      display flex
      align-items center
      justify-content center
      padding 4px
      box-sizing border-box

      i {
        font-size: 18px;
      }

      box-icon
        width 20px !important
        height 20px !important

.navbar
  // padding $navbar-vertical-padding $navbar-horizontal-padding
  padding 0px 20px
  height 60px
  // line-height $navbarHeight - 1.4rem
  display flex
  align-items center
  justify-content center
  border-radius 0px 0px 30px 0px
  transition all .25s ease

  &.transparent
    background transparent

  a, span, img
    display inline-block

  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top

  .site-name
    font-size 1.3rem
    font-weight 600
    color getVar(theme-color)
    position relative

  .links
    box-sizing border-box
    white-space nowrap
    font-size 0.9rem
    // right $navbar-horizontal-padding
    position relative
    display flex
    align-items center
    justify-content center
    // left 50%
    // transform translate(-50%)

    .search-box
      flex: 0 0 auto
      vertical-align top

@media (max-width: 1500px)
  .navbar
    justify-content flex-start

  .home-link
    position relative
    padding-left 0px
    padding-right 20px

@media (max-width: 1000px)
  .navbar
    padding 9px
    padding-top 8px
    padding-left 2.5rem
    display flex
    justify-content space-between

    .home-link
      position relative
      padding-left 0px
      margin-left 25px

    .external-links-search
      position relative
      padding-left 0px
      right 0px

    .can-hide
      display none

    .links
      padding-left 1.5rem
      display none

@media (max-width: 500px)
  .home-link
    width 24px !important
    overflow hidden
    padding 0px
    margin-top 3px

    .logo-img
      height 24px

@media (max-width: 390px)
  .external-links-search
    .con-links
      display none

</style>
