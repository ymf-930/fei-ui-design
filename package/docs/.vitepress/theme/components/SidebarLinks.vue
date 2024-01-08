<template>
  <ul
    class="sidebar-links"
    v-if="items.length"
  >
    <li
      v-for="(item, i) in items"
      :key="i"
    >
      <!--      :class="{'active': item.path === $route.path}"-->
      <SidebarGroup
        v-if="item.type === 'group'"
        :item="item"
        :open="fixed || i === openGroupIndex"
        :collapsable="true"
        :depth="depth"
        @toggle="toggleGroup(i)"
      />
      <!-- :collapsable="item.collapsable || item.collapsible" -->
      <a  v-else :href="item.link" title="" class="sidebar-link">
        <f-icon :name="item.icon"></f-icon>
        {{item.title}}
        <span v-if="item.alias">({{item.alias}})</span>
      </a>
<!--            <SidebarLink
              v-else
              :sidebarDepth="sidebarDepth"
              :item="item"
            />-->
    </li>
  </ul>
</template>
<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'SidebarLinks'
})
</script>
<script setup>
// import Vue from 'vue'
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import {useData} from "vitepress";
import {ref} from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  depth: {
    type: Boolean,
    default: false
  },
  sidebarDepth: {
    type: Array,
    default: () => []
  },
  fixed: {
    type: Boolean,
    default: false
  }
})

const openGroupIndex = ref(0)
const allOpen = ref(false)
const {site, page, theme} = useData()

console.log(useData());
console.log(props.items);
// refreshIndex()
// Vue.observable(this.$site.themeConfig)
// Vue.observable(this.$vsTheme)

/*  watch: {
    '$route' () {
      this.refreshIndex()
    }
  },*/

/*function refreshIndex() {
  const index = resolveOpenGroupIndex(this.$route, props.items)
  if (index > -1) {
    openGroupIndex.value = index
  }
}*/

function toggleGroup(index) {
  openGroupIndex.value = index === openGroupIndex.value ? -1 : index
}

function isActive(page) {
  return isActive(this.$route, page.regularPath)
}


function resolveOpenGroupIndex(route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'group' && item.children.some(c => c.type === 'page' && isActive(route, c.path))) {
      return i
    }
  }
  return -1
}
</script>
