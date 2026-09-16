<template>
  <ul
    class="sidebar-links"
    v-if="items.length"
  >
    <li
      v-for="(item, i) in items"
      :key="i"
      :class="{'active': item.link === route.path.slice(0,-5)}"
    >
      <SidebarGroup
        v-if="item.type === 'group'"
        :item="item"
        :open="isGroupOpen(i)"
        :collapsable="true"
        :depth="depth"
        @toggle="toggleGroup(i)"
      />
      <SidebarLink
        v-else
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
import {useRoute} from "vitepress"
import {isActive} from '../util'
import {getCurrentInstance, ref, watch} from "vue"

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

// 当前页面所在的分组下标（-1 = 未匹配到）
const openGroupIndex = ref(-1)
// 用户手动点过的分组：显式记录其展开状态，优先级高于全局开关。
// 没有它就无法在「全局展开」时单独收起某一组（旧实现的 :open 用 `||` 连全局开关，
// 全局为 true 时表达式恒真 → 分组标题点开也收不起）。
const groupOverride = ref({})
const vsThemeVal = ref(false)
const { vsTheme } = getCurrentInstance().appContext.config.globalProperties
// ⚠️ 共享同一个 reactive 对象，**不要**写成 `{ ...vsTheme }`（副本会导致配置里的写入读不到）
vsThemeVal.value = vsTheme

// 分组是否展开，按优先级：
//   1) fixed —— 强制全展开
//   2) 用户点过的分组 —— 以 groupOverride 为准
//   3) 否则跟随全局开关；全局收起时，当前页面所在分组保持展开，便于继续浏览
function isGroupOpen(index) {
  if (props.fixed) return true
  const override = groupOverride.value[index]
  if (override !== undefined) return override
  return vsThemeVal.value.sidebarCollapseOpen || index === openGroupIndex.value
}

function toggleGroup(index) {
  groupOverride.value = {...groupOverride.value, [index]: !isGroupOpen(index)}
}

// 切换全局开关时清掉逐组覆盖，让「展开/收起所有子栏目」名副其实
watch(() => vsThemeVal.value.sidebarCollapseOpen, () => {
  groupOverride.value = {}
})

// 跟随路由：把当前页面所在分组标记为默认展开。
// ⚠️ 必须监听 route.path 这类原始值 —— 旧写法 `watch(() => route, ...)` 监听的是同一个
// 对象引用，永不触发，导致 refreshIndex 实际从未执行、openGroupIndex 恒为初始值。
watch(() => route.path, () => refreshIndex(), {immediate: true})

function refreshIndex() {
  const index = resolveOpenGroupIndex(route, props.items)
  if (index > -1) {
    openGroupIndex.value = index
    groupOverride.value = {}
  }
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
<style lang="stylus" scoped>

</style>
