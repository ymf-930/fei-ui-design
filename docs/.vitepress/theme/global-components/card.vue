<template>
  <div class="card">
    <div class="text">
      <slot></slot>
    </div>
    <div v-if="slots.example" class="example" :class="{ mobile: vsThemeVal.mobileActive }">
      <div class="center">
        <slot name="example" />
      </div>
    </div>

    <div v-if="slots.template || slots.script || slots.style" class="slotcode">
      <codex :codesandbox="codesandbox" :codepen="codepen">
        <template #template v-if="slots.template">
          <slot name="template" />
        </template>
        <template #script v-if="slots.script">
          <slot name="script" />
        </template>
        <template #style v-if="slots.style">
          <slot name="style" />
        </template>
      </codex>
    </div>
  </div>
</template>
<script setup>
import { useSlots, ref, getCurrentInstance } from 'vue'
import codex from './codex.vue'
const slots = useSlots()

const props = defineProps({
  codepen: {
    type: Boolean,
    default: false,
  },
  codesandbox: {
    type: String,
    default: '',
  },
})

const vsThemeVal = ref(null)
const { vsTheme } = getCurrentInstance().appContext.config.globalProperties
vsThemeVal.value = { ...vsTheme }
</script>
<style lang="stylus">
getVar(var)
    unquote("var(--vs-"+var+")")

h5
  + .card
      .text
        h2
          padding-top 30px !important
.card
  // background rgb(255,255,255)
  border-radius 20px
  overflow hidden
  margin 20px 0px
  margin-top 20px
  margin-bottom -50px
  width 100%
  &:first-child
    .text
        h2
          padding-top 30px !important
  &:last-of-type
    margin-bottom 0px
  > .text
    ul
      margin-left 40px
      padding-left 0px
      li
        p
          padding-left 5px !important
  .text
    >img
      width 100%
      max-width 600px
      margin auto
      margin-top 10px
      display block
      border-radius 20px
  .example
    position relative
    padding 10px
    margin auto
    margin-top 10px
    border-radius 5px 20px 0px 0px
    // border 1px solid rgba(0,0,0,.03)
    // box-shadow 0px -15px 20px -25px rgba(0,0,0,.1)
    border-bottom 0px solid rgba(0,0,0,.03)
    background getVar(theme-layout)
    position relative
    overflow hidden
    transition all .25s ease
    width 100%
    height auto
    .center
      justify-content flex-start

    &:after
      transition all .25s ease
      width 100%
      height 100%
      content ''
      position absolute
      border 8px solid getVar(theme-bg2)
      box-sizing border-box
      top 0px
      left 0px
      border-radius 25px
      pointer-events none
      opacity 0
      visibility hidden
    &:before
      opacity 0
      visibility hidden
      pointer-events none
      width 60px
      height 25px
      content ''
      position absolute
      background getVar(theme-bg2)
      box-sizing border-box
      top 0px
      left 50%
      transform translate(-50%)
      border-radius 0px 0px 8px 8px
      transition all .25s ease
    &.mobile
      width 260px
      height 520px
      margin auto
      margin-top 20px
      margin-bottom 20px
      border-radius 25px
      padding 30px 20px
      overflow auto
      &:after
        opacity 1
        visibility visible
      &:before
        opacity 1
        visibility visible
      ~ .slotcode
          .code
            border-radius 20px
            background transparent
  .text
    h2, h3, h4, h5, h6
      padding 15px 20px
      margin 0px
      border-bottom 0px
      padding-bottom 10px
      transition all .25s ease
      z-index 200
      position relative
      &:hover
        padding-left 40px
    h2
      padding-top 100px

    p
      padding 5px 20px
      margin 0px
      font-size .85rem
      z-index 200
      position relative
    li
      font-size .85rem

@media (max-width: 500px)
  .card
    .text
      padding 10px
      h2
        font-size 1.3rem
        padding-top 80px
        padding-left 10px
        padding-bottom 0px
      p
        padding-left 10px
        padding-top 10px
</style>
