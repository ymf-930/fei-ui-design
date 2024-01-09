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
      <SidebarLink
        v-else
        :collapsable="item.collapsable"
        :sidebarDepth="sidebarDepth"
        :item="item"
      />
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
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import {useData, useRoute} from "vitepress"
import {ref, watch} from "vue"

const route = useRoute()
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  depth: {
    type: Number,
    default: 0
  },
  sidebarDepth: {
    type: Number,
    default: 0
  },
  fixed: {
    type: Boolean,
    default: false
  }
})

const openGroupIndex = ref(0)
const allOpen = ref(false)
const {site, page, theme} = useData()
// console.log(props.items);
// refreshIndex()
// Vue.observable(this.$site.themeConfig)
// Vue.observable(this.$vsTheme)
watch(() => route, () => {
  refreshIndex()
})


function refreshIndex() {
  const index = resolveOpenGroupIndex(route, props.items)
  if (index > -1) {
    openGroupIndex.value = index
  }
}

function toggleGroup(index) {
  openGroupIndex.value = index === openGroupIndex.value ? -1 : index
}

function isActive(page) {
  return isActive(route, page.value?.regularPath)
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
