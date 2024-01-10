<template>
  <a :class="['nav-link',{'router-link-active': isActive}]"
     :href="link"
     v-if="!isExternal(link)"
  >
    {{ item.text }}
    <i class="bx bx-chevron-down"></i>
  </a>
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
import {computed} from "vue";
import {isExternal, isMailto, isTel, ensureExt} from '../util'
import {useData, useRoute} from "vitepress"

const route = useRoute()
const {theme, site} = useData()
const props = defineProps({
  item: {
    required: true
  },
  arrow: {}
})

const link = computed(() => {
  return ensureExt(props.item.link)
})
const isActive = computed(() => {
  return props.item.text !== '首页'
    && route.path.indexOf('/guide/') !== -1 && props.item.text === '文档'
    || route.path.indexOf('/components/') !== -1 && props.item.text === '组件'
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
