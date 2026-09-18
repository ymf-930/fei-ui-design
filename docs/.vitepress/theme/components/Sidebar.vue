<template>
  <aside
    class="sidebar"
  >
    <svg class="effect1" xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <path id="Trazado_200" data-name="Trazado 200" d="M0-10,150,0l10,150S137.643,80.734,100.143,43.234,0-10,0-10Z"
            transform="translate(0 10)"/>
    </svg>
    <div class="content-sidebar">
      <slot name="top"/>
      <SidebarLinks :fixed="fixed" :depth="0" :items="items"/>
      <slot name="bottom"/>
    </div>
  </aside>
</template>
<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'Sidebar'
})
</script>
<script setup>
import SidebarLinks from './SidebarLinks.vue'
// import NavLinks2 from '@theme/components/NavLinks2.vue'

const props = defineProps({
  items:{
    type: Array,
    default: () => []
  },
  fixed:{
    type: Boolean,
    default: false
  }
})
</script>

<style lang="stylus">
getVar(var)
  unquote("var(--fei-" + var + ")")

.effect1
  transform rotate(-90deg)
  position absolute
  max-width 40px
  max-height 40px
  z-index 200
  right -37px
  top -2px
  // stroke #000
  pointer-events none
  fill getVar(theme-layout)

.sidebar
  padding-right 5px
  z-index 1800 !important
  transition all .25s ease
  overflow inherit !important

  .content-sidebar
    overflow auto
    max-height 100%

    &::-webkit-scrollbar
      width 0px
      height 0px

  &::-webkit-scrollbar
    width 0px
    height 0px

  .sidebar-sub-headers
    display none

  .sidebar-links
    transition all .15s ease

  ul
    padding 0
    margin 0
    list-style-type none

  a
    display inline-block

  & .content-sidebar > .sidebar-links
    padding 1.5rem 0

    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold

    & > li:not(:first-child)
      margin-top .75rem

@media (max-width: 1000px)
  .sidebar
    .nav-links
      display block !important

      .nav-item
        &:hover
          .dropdown-wrapper .nav-dropdown
            display block !important
            transform translate(0px) !important
            box-shadow none !important

            h4
              padding-left 0px !important

      .dropdown-wrapper .nav-dropdown
        position relative
        display none !important

      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)

    & .content-sidebar > .sidebar-links
      padding 1rem 0

@media (max-width: 400px)
  .back-link
    display none
</style>
