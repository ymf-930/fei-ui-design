<template>
  <div>
<!--    <a
      :href="item.link"
      :title="title"
      :class="{
        active: active,
        'sidebar-link': true,
        'sidebar-new': NEW,
        'sidebar-update': UPDATE
      }">
      {{ item.title || item.link }}
    </a>-->
{{item}}
<!--    <ul v-if="item.type === 'auto'" class="sidebar-sub-headers">-->
<!--    <ul class="sidebar-sub-headers">
      <li v-for="child in item.children" class="sidebar-sub-header">
        {{ child }}
&lt;!&ndash;        <child-component
          :item="child"
          :sidebarDepth="sidebarDepth"
          :NEWS="NEWS"
          :UPDATE="UPDATE"
        ></child-component>&ndash;&gt;
      </li>
    </ul>-->

<!--    <ul v-else-if="active || displayAllHeaders && item.headers && !hashRE.test(item.link)" class="sidebar-sub-headers">-->
    <ul v-if="active || displayAllHeaders && item.headers && !hashRE.test(item.link)" class="sidebar-sub-headers">
      <li v-for="child in groupedHeaders" class="sidebar-sub-header">
        <a
          :href="item.link + '#' + child.slug"
          :title="title"
          :class="{
            active: isActive(route, item.link + '#' + child.slug),
            'sidebar-link': true,
            'sidebar-new': NEWS.includes(child.slug),
            'sidebar-update': UPDATE.includes(child.slug)
          }"
        >
          {{ child.title }}
        </a>
<!--        <child-component
          :item="child"
          :sidebarDepth="sidebarDepth"
          :NEWS="NEWS"
          :UPDATE="UPDATE"
        ></child-component>-->
      </li>
    </ul>
  </div>
</template>

<script setup>
import { isActive, hashRE, groupHeaders } from '../util'
import { useData, useRoute } from "vitepress";
import {computed, onMounted, ref} from "vue";
const props = defineProps({
  item: {
    type: Object,
    default: () => {
    }
  },
  sidebarDepth: {
    type: Number,
    default: 1
  },
})
const title = ref('')
const NEWS = ref([])
const UPDATE = ref([])

const {site, page, theme} = useData()
const route = useRoute()
const {frontmatter} = page.value

const displayAllHeaders = computed(()=>{
  return theme.value.displayAllHeaders
})
const selfActive = computed(()=>{
  return isActive(route, props.item.link)
})
const active = computed(()=>{
  if (props.item.type === 'auto') {
    return selfActive.value || props.item.children.some(c => isActive(this.route, props.item.basePath + '#' + c.slug))
  }
  return selfActive.value || displayAllHeaders.value && props.item.headers && !hashRE.test(props.item.link)
})

const groupedHeaders = computed(()=>{
  return groupHeaders(props.item.headers)
})

onMounted(()=>{
  title.value = NEWS.value ? 'New' : (UPDATE.value ? 'Update' : '');
})
</script>

<style lang="stylus">
getVar(var)
    unquote("var(--vs-"+var+")")
getColor(var, alpha = 1)
    unquote("rgba(var(--vs-"+var+"), "+alpha+")")

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
  font-weight 400
  display inline-block
  // color $textColor
  color getVar(theme-color)
  padding 0.3rem 1rem 0.3rem 1.25rem
  width: 100%
  box-sizing: border-box
  transition all .25s ease
  opacity .5
  font-weight normal
  position relative
  margin-left 0px
  &:after
    content: ''
    position absolute
    top 50%
    transform translate(0,-50%)
    left 0px
    width 5px
    background getVar(theme-color)
    height 0px
    transition all .25s ease
    border-radius 0px 5px 5px 0px
  &.active, &:hover
    opacity 1
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
