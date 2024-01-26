---
title: 标签页 Tabs
---

<script setup>
import Basic from './demo/Tabs/Basic.vue'
import Card from './demo/Tabs/Card.vue'
import Add from './demo/Tabs/Add.vue'
import ContextMenu from './demo/Tabs/ContextMenu.vue'
import TagType from './demo/Tabs/TagType.vue'
</script>


##### 显示标签,由于标签内容定制化比较多，这里就预留给后续内容判定，这里只做标签的切换功能。内容可根据实际需求自行实现。

<card>

## 基础用法

基础的简洁的标签页

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-tabs v-model="activeTab" :data="tabs"></f-tabs>
    <div style="overflow: hidden; position: relative">
      <f-move-transition>
        <p v-if="activeTab === 'tab0'">首页</p>
        <p v-else-if="activeTab === 'tab1'">用户管理</p>
        <p v-else-if="activeTab === 'tab2'">组织管理</p>
        <p v-else-if="activeTab === 'tab3'">系统管理</p>
      </f-move-transition>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const tabs = ref([
  { key: 'tab0', title: '首页', noClose: true },
  { key: 'tab1', title: '用户管理' },
  { key: 'tab2', title: '组织管理' },
  { key: 'tab3', title: '系统管理' }
])
const activeTab = ref('tab2')
</script>

```

</template>

</card>

<card>

## 卡片模式

可以设置基本的卡片模式

<template #example>

  <Card/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-tabs v-model="activeTab" :data="tabs" type="card"></f-tabs>
    <div style="overflow: hidden; position: relative">
      <f-move-transition>
        <p v-if="activeTab === 'tab0'">首页</p>
        <p v-else-if="activeTab === 'tab1'">用户管理</p>
        <p v-else-if="activeTab === 'tab2'">组织管理</p>
        <p v-else-if="activeTab === 'tab3'">系统管理</p>
      </f-move-transition>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const tabs = ref([
  { key: 'tab0', title: '首页', noClose: true },
  { key: 'tab1', title: '用户管理' },
  { key: 'tab2', title: '组织管理' },
  { key: 'tab3', title: '系统管理' }
])
const activeTab = ref('tab2')
</script>
```

</template>

</card>

<card>

## 增加和移除

可以关闭，同时可以通过自定义事件来增加标签页，关闭按钮只能在card和tag模式下使用,默认超出宽度，可以滚动移动

`tabs`中的项设置noClose可以排除关闭按钮，主要是为了部分可固定标签设置使用

<template #example>

  <Add/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div class="mb-15">
      <f-button type="primary" plain size="small" @click="handleAdd">add tab</f-button>
    </div>
    <f-tabs
      v-model="activeTab"
      :data="tabs"
      type="card"
      closable
      @tab-close="handleTabClose"
    ></f-tabs>
    <div style="overflow: hidden; position: relative">
      <f-move-transition>
        <p v-if="activeTab === 'tab0'">首页</p>
        <p v-else-if="activeTab === 'tab1'">用户管理</p>
        <p v-else-if="activeTab === 'tab2'">组织管理</p>
        <p v-else-if="activeTab === 'tab3'">系统管理</p>
        <p v-else>{{ activeTab }}</p>
      </f-move-transition>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const tabs = ref([
  { key: 'tab0', title: '首页', noClose: true },
  { key: 'tab1', title: '用户管理' },
  { key: 'tab2', title: '组织管理' },
  { key: 'tab3', title: '系统管理' }
])
const activeTab = ref('tab2')

const handleAdd = () => {
  // 这里需要保证key值唯一否则会影响渲染显示
  const newTab = { key: `tab${+new Date()}`, title: 'New Tab' }
  tabs.value.push(newTab)
  // 增加完毕后通常默认选中这个新的tab，当然，你也可以不设置选中新的tab
  activeTab.value = newTab.key
}
const handleTabClose = tab => {
  tabs.value.splice(
    tabs.value.findIndex(t => t.key === tab.key),
    1
  )
}
</script>
```

</template>

</card>

<card>

## 右键菜单

配合 `ContextMenu` 可以关闭，可以开启右键菜单实现更多的配置信息，开启右键菜单需要手动插入右键菜单的按钮列表标签为`<li>`,并需要配合`tab-select`事件

<template #example>

  <ContextMenu/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div class="mb-15">
      <f-button type="primary" plain size="small" @click="handleAdd">add tab</f-button>
    </div>
    <f-tabs
      ref="tabsRef"
      v-model="activeTab"
      :data="tabs"
      type="card"
      closable
      context-menu
      @tab-close="handleTabClose"
      @tab-select="handleSelect"
    >
      <template #menu>
        <li @click="refreshSelected">刷新</li>
        <li @click="closeSelected">关闭</li>
        <li @click="closeOthers">关闭其他</li>
        <li @click="closeAll">关闭所有</li>
      </template>
    </f-tabs>
    <div style="overflow: hidden; position: relative">
      <f-move-transition>
        <p v-if="activeTab === 'tab0'">首页</p>
        <p v-else-if="activeTab === 'tab1'">用户管理</p>
        <p v-else-if="activeTab === 'tab2'">组织管理</p>
        <p v-else-if="activeTab === 'tab3'">系统管理</p>
        <p v-else>{{ activeTab }}</p>
      </f-move-transition>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from 'fei-ui-design'

const tabs = ref([
  { key: 'tab0', title: '首页', noClose: true },
  { key: 'tab1', title: '用户管理' },
  { key: 'tab2', title: '组织管理' },
  { key: 'tab3', title: '系统管理' }
])
const activeTab = ref('tab2')
const selectTab = ref(null)
const tabsRef = ref(null)

const handleAdd = () => {
  // 这里需要保证key值唯一否则会影响渲染显示
  const newTab = { key: `tab${+new Date()}`, title: 'New Tab' }
  tabs.value.push(newTab)
  // 增加完毕后通常默认选中这个新的tab，当然，你也可以不设置选中新的tab
  activeTab.value = newTab.key
}
const handleTabClose = tab => {
  tabs.value.splice(
    tabs.value.findIndex(t => t.key === tab.key),
    1
  )
}

function handleSelect(tab) {
  selectTab.value = { ...tab }
}

function refreshSelected() {
  Message('刷新当前view:' + selectTab.value?.title)
}

function closeSelected() {
  // 这里需要调用组件的关闭选择的tag
  tabsRef.value && tabsRef.value.closeSelectedTab(selectTab.value)
}
// 关闭其他tags
function closeOthers() {
  tabs.value = [selectTab.value]
  activeTab.value = selectTab.value.key
  tabsRef.value && tabsRef.value.moveToCurrentTab()
}
// 关闭所有
function closeAll() {
  tabs.value = []
  activeTab.value = ''
  tabsRef.value && tabsRef.value.moveToCurrentTab()
}
</script>
```

</template>

</card>

<card>

## 标签模式

除了卡片模式也可以设置成tag标签模式，这种模式更独立也更像标签导航。根据需求选择使用

<template #example>

  <TagType/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div class="mb-15">
      <f-button type="primary" plain size="small" @click="handleAdd">add tab</f-button>
    </div>
    <f-tabs
      ref="tabsRef"
      v-model="activeTab"
      :data="tabs"
      type="tag"
      closable
      context-menu
      @tab-close="handleTabClose"
      @taf-select="handleSelect"
    >
      <template #menu>
        <li @click="refreshSelected">刷新</li>
        <li @click="closeSelected">关闭</li>
        <li @click="closeOthers">关闭其他</li>
        <li @click="closeAll">关闭所有</li>
      </template>
    </f-tabs>
    <div style="overflow: hidden; position: relative">
      <f-move-transition>
        <p v-if="activeTab === 'tab0'">首页</p>
        <p v-else-if="activeTab === 'tab1'">用户管理</p>
        <p v-else-if="activeTab === 'tab2'">组织管理</p>
        <p v-else-if="activeTab === 'tab3'">系统管理</p>
        <p v-else>{{ activeTab }}</p>
      </f-move-transition>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from 'fei-ui-design'

const tabs = ref([
  { key: 'tab0', title: '首页', noClose: true },
  { key: 'tab1', title: '用户管理' },
  { key: 'tab2', title: '组织管理' },
  { key: 'tab3', title: '系统管理' }
])
const activeTab = ref('tab2')
const selectTab = ref(null)
const tabsRef = ref(null)

const handleAdd = () => {
  // 这里需要保证key值唯一否则会影响渲染显示
  const newTab = { key: `tab${+new Date()}`, title: 'New Tab' }
  tabs.value.push(newTab)
  // 增加完毕后通常默认选中这个新的tab，当然，你也可以不设置选中新的tab
  activeTab.value = newTab.key
}
const handleTabClose = tab => {
  tabs.value.splice(
    tabs.value.findIndex(t => t.key === tab.key),
    1
  )
}

function handleSelect(tab) {
  selectTab.value = { ...tab }
}

function refreshSelected() {
  Message('刷新当前view:' + selectTab.value?.title)
}

function closeSelected() {
  // 这里需要调用组件的关闭选择的tag
  tabsRef.value && tabsRef.value.closeSelectedTab(selectTab.value)
}
// 关闭其他tags
function closeOthers() {
  tabs.value = [selectTab.value]
  activeTab.value = selectTab.value.key
  tabsRef.value && tabsRef.value.moveToCurrentTab()
}
// 关闭所有
function closeAll() {
  tabs.value = []
  activeTab.value = ''
  tabsRef.value && tabsRef.value.moveToCurrentTab()
}
</script>
```

</template>

</card>

## Props

| 参数     | 说明                                                                                                        | 类型    | 可选值                 | 默认值  |
| -------- | ----------------------------------------------------------------------------------------------------------- | ------- | ---------------------- | ------- |
| data     | tabs数组结构,必传，切结构遵循{key:'',title:''} key为唯一标识，title为标签生成名称，切可以设置icon来扩展图标 | Array   | —                      | []      |
| closable | 是否可关闭                                                                                                  | boolean | —                      | false   |
| type     | tab类型                                                                                                     | string  | 'default','card','tag' | default |

## Events

| 事件名     | 说明                                            | 返回值        |
| ---------- | ----------------------------------------------- | ------------- |
| change     | 绑定事件改变事件                                | 当前选中的tab |
| tab-close  | 关闭一个tab事件                                 | 当前关闭的tab |
| tab-select | 右键选中事件回调，用于配合右键系统缓存点击的tag | 右键选中的tab |
