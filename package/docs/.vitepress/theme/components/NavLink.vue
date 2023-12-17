<template>
  <a class="nav-link"
      :href="link"
      v-if="!isExternal(link)"
  >
    {{ item.text }}
    <i class="bx bx-chevron-down"></i>
  </a>
<!--      :exact="exact || $route.path.indexOf('/guide/') !== -1 && item.text === 'Documentation' || item.text === 'Button'"-->
  <a
      v-else
      :href="link"
      class="nav-link external"
      :target="isMailto(link) || isTel(link) ? null : '_blank'"
      :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'"
  >
    {{ item.text }}
    <!-- <OutboundLink/> -->
  </a>
</template>

<script setup>
import {isExternal, isMailto, isTel, ensureExt} from '../util'
import {computed} from "vue";
import {useData} from "vitepress"
const {theme} = useData()
const props = defineProps({
  item: {
    required: true
  },
  arrow: {}
})

const link = computed(() => {
  return ensureExt(props.item.link)
})
const exact = computed(() => {
  if (theme.value.locales) {
    return Object.keys(theme.value.locales).some(rootLink => rootLink === props.link)
  }
  return this.link === '/'
})
</script>
<style lang="stylus">
.nav-item
  i.bx:not(.bx-dots-horizontal-rounded)
    display none

  i.bx.not-remove
    display block !important

  > div > .nav-link
    display flex !important
    align-items center
    justify-content center

    i.bx
      display block
      font-size 1rem
      transition all .2s ease
      transform-origin center
      width 16px
      height 16px
      position relative
</style>
