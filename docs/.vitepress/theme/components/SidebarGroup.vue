<template>
  <section
    class="sidebar-group"
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0
      },
      `depth-${depth}`
    ]"
  >
    <a v-if="item.link"
       class="sidebar-heading clickable"
       :class="{
        open,
        'active': isActive(route, item.link)
      }"
       :href="item.link"
       @click.native="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <span
        class="arrow"
        v-if="collapsable"
        :class="open ? 'down' : 'right'">
      </span>
    </a>

    <p
      v-else
      class="sidebar-heading"
      :class="{ open }"
      @click="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <!-- <span
        class="arrow"
        v-if="collapsable"
        :class="open ? 'down' : 'right'">
      </span> -->
      <i class="bx bx-chevron-right"></i>
    </p>

    <DropdownTransition>
      <!--        v-if="open || !collapsable"-->
      <SidebarLinks
        class="sidebar-group-items"
        :items="item.children"
      />
      <!--        :sidebarDepth="item.sidebarDepth"-->
      <!--        :depth="depth + 1"-->
    </DropdownTransition>
  </section>
</template>
<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'SidebarGroup'
})
</script>
<script setup>
import {isActive} from '../util'
import DropdownTransition from './DropdownTransition.vue'
import SidebarLinks from "./SidebarLinks.vue"
import {useRoute} from "vitepress";
const route = useRoute()
const props = defineProps({
  item: {
    type: Object,
    default: () => {
    }
  },
  open: {
    type: Boolean,
    default: false
  },
  collapsable: {
    type: Boolean,
    default: false
  },
  depth: {
    type: Number,
    default: null
  },
  fixed: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="stylus">
getVar(var)
  unquote("var(--vs-" + var + ")")

.sidebar-group
  .sidebar-group
    padding-left 0.5em

  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      cursor auto
      color inherit

  // refine styles of nested sidebar groups

  &.is-sub-group
    padding-left 0

    & > .sidebar-heading
      font-size 0.95em
      line-height 1.4
      font-weight normal
      padding-left 2rem

      &:not(.clickable)
        opacity 0.5

    & > .sidebar-group-items
      padding-left 1rem

      & > li > .sidebar-link
        font-size: 0.95em;
        border-left none

  &.depth-2
    & > .sidebar-heading
      border-left none

.sidebar-heading
  color getVar(theme-color)
  transition color .15s ease
  cursor pointer
  font-size 1em
  font-weight bold
  // text-transform uppercase
  padding 0.35rem 1.5rem 0.35rem 1.25rem
  width 100%
  box-sizing border-box
  margin 0
  border-left 0.25rem solid transparent
  display flex
  align-items center
  justify-content flex-start

  box-icon
    max-width 20px
    margin-bottom -4px
    margin-left 4px

  &.open
    box-icon
      transform rotate(90deg)

  .arrow
    position relative
    top -0.12em
    left 0.5em

  &.clickable
    &.active
      font-weight 600
      color $accentColor
      border-left-color $accentColor

    &:hover
      color $accentColor

.sidebar-group-items
  transition height .1s ease-out
  font-size 0.95em
  overflow hidden
</style>
