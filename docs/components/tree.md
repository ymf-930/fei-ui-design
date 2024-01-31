---
title: 树结构 Tree
---

<script setup>
import Basic from './demo/Tree/Basic.vue'
import Param from './demo/Tree/Param.vue'
import Other from './demo/Tree/Other.vue'
import Ctrl from './demo/Tree/Ctrl.vue'
import Load from './demo/Tree/Load.vue'
import Filter from './demo/Tree/Filter.vue'
import Drag from './demo/Tree/Drag.vue'
import Render from './demo/Tree/Render.vue'
import Select from './demo/Tree/Select.vue'
import Valid from './demo/Tree/Valid.vue'
import Big from './demo/Tree/Big.vue'
</script>

# 树结构 Tree

<card>

## 基础用法

`lockSelect` 设置可以锁定树的选中事件，这个可以用来控制树菜单在不同情况下的操作

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div flex>
    <div style="width: 300px">
      <f-tree
        :data="data"
        :lock-select="lockSelect"
        title-ellipsis
        @select-change="handleSelect"
      ></f-tree>
    </div>
    <div style="width: 80px">
      <f-switch v-model="lockSelect" size="large">
        <template #open>锁定</template>
        <template #close>解锁</template>
      </f-switch>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  {
    title: '一级 1',
    expand: true,
    children: [
      {
        title: '二级 1-1',
        expand: true,
        children: [
          { title: '三级 1-1-1 我是超长字段我是超长字段我是超长字段' },
          { title: '三级 1-1-2' }
        ]
      },
      {
        title: '二级 1-2',
        expand: true,
        children: [{ title: '三级 1-2-1' }, { title: '三级 1-2-2' }]
      }
    ]
  }
])

const lockSelect = ref(false)
function handleSelect(selected, node) {
  console.log(selected, node)
}
</script>
```

</template>

</card>

<card>

## 额外参数配置

可以配置额外参数设置，比如附加 id，code 等业务参数，也可以指定 title 显示的字段名称，默认为 `title`

<template #example>

  <Param/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-button @click="initData">初始化数据并默认选中前端组</f-button>
    <div flex class="mt-10">
      <div style="width: 300px">
        <f-tree ref="treeRef" :data="data" title-key="text" @select-change="handleSelect"></f-tree>
      </div>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref, nextTick } from 'vue'

const data = ref([])

const defaultId = ref('00102')
const treeRef = ref(null)

function initData() {
  data.value = [
    {
      id: '001',
      text: '研发部',
      deptCode: 'yfb',
      status: '1',
      desc: '研发中心',
      parentId: null,
      children: [
        {
          id: '00101',
          text: '后端组',
          deptCode: 'hd',
          status: '1',
          desc: '后端研发中心',
          parentId: '001'
        },
        {
          id: '00102',
          text: '前端组',
          deptCode: 'qd',
          status: '1',
          desc: '前端研发中心',
          parentId: '001'
        },
        {
          id: '00103',
          text: 'UI设计',
          deptCode: 'sj',
          status: '1',
          desc: '交互、ui设计中心',
          parentId: '001'
        },
        {
          id: '00104',
          text: '测试组',
          deptCode: 'cs',
          status: '1',
          desc: '测试组',
          parentId: '001'
        },
        {
          id: '00105',
          text: '运维组',
          deptCode: 'yw',
          status: '1',
          desc: '运维、服务、巡检',
          parentId: '001'
        }
      ]
    },
    {
      id: '002',
      text: '项目部',
      deptCode: 'xmb',
      status: '1',
      desc: '项目服务部',
      parentId: null,
      children: [
        {
          id: '00201',
          text: '开发组',
          deptCode: 'kf',
          status: '1',
          desc: '后端项目开发',
          parentId: '002'
        },
        {
          id: '00202',
          text: '交付服务组',
          deptCode: 'jf',
          status: '1',
          desc: '交付项目，技术服务支持',
          parentId: '002'
        }
      ]
    }
  ]
  nextTick(() => {
    if (!treeRef.value) return

    // 获取树结构的拍平数据，查找当前需要选中的节点值
    const flatState = treeRef.value.getFlatState()
    const current = flatState.find(node => node.node.id === defaultId.value)
    if (current && current) {
      treeRef.value.setSelected([current.nodeKey])
    }
  })
}

function handleSelect(selected, node) {
  console.log(selected, node)
}
</script>
```

</template>

</card>

<card>

## 其他属性

可以设置 show-checkbox 开启勾选，并可以设置数据格式中的默认选中

expand、selected、checked 和 disabled 可以设置展开，选中，勾选和禁用。multiple 开启多选

<template #example>

  <Other/>
  
</template>

<template #template>

```html
<template>
  <div flex>
    <div class="p10" style="width: 300px; border-right: 1px solid #eeeeee">
      <f-tag type="primary">多选</f-tag>
      <f-divider style="margin: 8px 0"></f-divider>
      <f-tree
        :data="data"
        show-checkbox
        multiple
        @select-change="handleSelect"
        @check-change="handleChecked"
      ></f-tree>
    </div>
    <div class="p10" style="width: 300px; border-right: 1px solid #eeeeee">
      <f-tag type="primary">附加图标</f-tag>
      <f-divider style="margin: 8px 0"></f-divider>
      <f-tree :data="data1"></f-tree>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  {
    title: '一级 1',
    expand: true,
    children: [
      {
        title: '二级 1-1',
        expand: true,
        children: [
          { title: '三级 1-1-1 我是超长字段我是超长字段我是超长字段' },
          { title: '三级 1-1-2' }
        ]
      },
      {
        title: '二级 1-2',
        expand: true,
        children: [{ title: '三级 1-2-1' }, { title: '三级 1-2-2' }]
      }
    ]
  }
])
const data1 = ref([
  {
    title: '导航',
    icon: 'apartment',
    expand: true,
    children: [
      { title: '导航菜单', icon: 'menu' },
      { title: '图钉', icon: 'pushpin' },
      { title: '锚点', icon: 'attachment' },
      { title: '面包屑', icon: 'right' },
      { title: '标签页', icon: 'project' }
    ]
  }
])

function handleSelect(selected, node) {
  console.log(selected, node)
}

function handleChecked(checked, node) {
  console.log(checked, node)
}
</script>
```

</template>

</card>

<card>

## 树节点的操作

树结构默认拍平了所有节点数组，并塞入了唯一的 nodeKey 值用于索引节点，这样可以方便快捷的获取和设置树的状态

<template #example>

  <Ctrl/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div class="mb-16">
      <f-button size="small" @click="expandAll">展开全部</f-button>
      <f-button size="small" @click="collapseAll">收起全部</f-button>
      <f-button size="small" @click="setExpand">展开三级</f-button>
      <f-button size="small" @click="checkAll">选择全部</f-button>
      <f-button size="small" @click="uncheckAll">取消全选</f-button>
      <f-button size="small" @click="setChecked">设置选中1-2及以下</f-button>
      <f-button size="small" @click="setSelected">单选 1-2-1</f-button>
      <f-button size="small" @click="clear">清空单选和多选</f-button>
    </div>
    <div style="width: 300px">
      <f-tree ref="treeRef" :data="data" show-checkbox></f-tree>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  {
    title: '一级 1',
    children: [
      {
        title: '二级 1-1',
        children: [{ title: '三级 1-1-1' }, { title: '三级 1-1-2' }]
      },
      {
        title: '二级 1-2',
        children: [{ title: '三级 1-2-1' }, { title: '三级 1-2-2' }]
      }
    ]
  },
  {
    title: '一级 2',
    children: [
      {
        title: '二级 2-1'
      },
      {
        title: '二级 2-2'
      }
    ]
  }
])
const treeRef = ref(null)

function expandAll() {
  treeRef.value.expandAll()
}
function collapseAll() {
  treeRef.value.collapseAll()
}
function checkAll() {
  treeRef.value.checkAll()
}
function uncheckAll() {
  treeRef.value.uncheckAll()
}
function setChecked() {
  // 默认是获取了nodeKey索引，如有特殊判断，如id，则可以自行根据flatState.find所有nodeKey值
  treeRef.value.setChecked([5, 6])
}
function setSelected() {
  treeRef.value.setSelected([5])
}
function clear() {
  treeRef.value.uncheckAll()
  treeRef.value.unselectAll()
}
function setExpand() {
  treeRef.value.setExpand([0, 4])
}
</script>
```

</template>

</card>

<card>

## 异步加载子节点

<template #example>

  <Load/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 300px">
    <f-tree :data="data" show-checkbox :load-data="loadData"></f-tree>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  {
    title: 'root',
    children: []
  },
  {
    title: 'leaf',
    isLeaf: true,
    children: []
  }
])

function loadData(item, callback) {
  console.log(item)
  setTimeout(() => {
    let data = [
      {
        title: 'have-child',
        loading: false,
        children: []
      },
      {
        title: 'no-child',
        loading: false,
        children: []
      }
    ]
    // 模拟请求数据有子项的时候
    if (item.title === 'have-child') {
      data = [
        {
          title: 'child1',
          loading: false,
          isLeaf: false,
          children: [],
          visible: true
        },
        {
          title: 'leaf node',
          isLeaf: true,
          children: []
        }
      ]
    } else if (item.title === 'no-child') {
      // 按需自行设置是否是叶子节点或者不设置
      item['isLeaf'] = true
      // 不设置会保留箭头可以再次点击
      // data = []
    }

    callback(data)
  }, 1000)
}
</script>
```

</template>

</card>

<card>

## 可以筛选

如果树结构层级较多，可配合过滤函数进行过滤筛选

<template #example>

  <Filter/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-input
      v-model="query"
      search
      placeholder="输入过滤条件后回车筛选"
      style="width: 230px"
      @search="handleFilter"
    ></f-input>
    <f-divider style="margin: 14px 0"></f-divider>
    <div style="width: 300px">
      <f-tree ref="treeRef" :data="data" :filter-node-method="filterNode" highlight-filter></f-tree>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  {
    id: '1',
    title: '江苏省',
    children: [
      {
        id: '1-1',
        title: '南京市',
        children: [
          { id: '1-1-1', title: '玄武区' },
          { id: '1-1-2', title: '鼓楼区' },
          { id: '1-1-3', title: '建邺区' },
          { id: '1-1-4', title: '秦淮区' }
        ]
      },
      {
        id: '1-2',
        title: '无锡市',
        children: [
          { id: '1-2-1', title: '锡山区' },
          { id: '1-2-2', title: '惠山区' },
          { id: '1-2-3', title: '滨湖区' },
          { id: '1-2-4', title: '梁溪区' }
        ]
      },
      {
        id: '1-3',
        title: '徐州市',
        children: [
          { id: '1-3-1', title: '鼓楼区' },
          { id: '1-3-2', title: '云龙区' },
          { id: '1-3-3', title: '泉山区' },
          { id: '1-3-4', title: '铜山区' },
          { id: '1-3-5', title: '贾汪区' },
          { id: '1-3-6', title: '沛县' },
          { id: '1-3-7', title: '丰县' },
          { id: '1-3-8', title: '睢宁县' },
          { id: '1-3-9', title: '新沂市' },
          { id: '1-3-10', title: '邳州市' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: '河北省',
    children: [
      {
        id: '2-1',
        title: '石家庄',
        children: [
          { id: '2-1-1', title: '长安区' },
          { id: '2-1-2', title: '新华区' },
          { id: '2-1-3', title: '鼓楼区' }
        ]
      }
    ]
  }
])

const query = ref('')
const treeRef = ref(null)

const handleFilter = value => {
  treeRef.value.filter(value)
}
const filterNode = (value, node) => {
  if (!value) return true
  // return node.title===value.trim()
  return node.title.indexOf(value) !== -1
}
</script>
```

</template>

</card>

<card>

## 拖拽排序

开启`draggable`可以开启树节点的拖拽功能，此时需要监听几个事件来进行数据处理

<template #example>

  <Drag/>
  
</template>

<template #template>

```html
<template>
  <div flex>
    <div class="p10" style="width: 300px; border-right: 1px solid #eeeeee">
      <f-tag type="primary">基础拖拽排序</f-tag>
      <f-divider style="margin: 8px 0"></f-divider>
      <f-tree
        ref="treeRef"
        :data="data"
        draggable
        default-expand
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
      ></f-tree>
    </div>
    <div class="p10" style="width: 300px; border-right: 1px solid #eeeeee">
      <f-tag type="primary">自定义函数配置</f-tag>
      <f-divider style="margin: 8px 0"></f-divider>
      <f-tree
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        :data="data1"
        :render="renderContent1"
        draggable
        lock-select
        default-expand
      ></f-tree>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref, h } from 'vue'
import { Message, FDropdown, FDropdownMenu, FDropdownItem } from 'fei-ui-design'

const data = ref([
  {
    title: '一级 1',
    children: [
      {
        title: '二级 1-1',
        children: [{ title: '三级 1-1-1' }, { title: '三级 1-1-2' }]
      },
      {
        title: '二级 1-2',
        children: [{ title: '三级 1-2-1' }, { title: '三级 1-2-2' }]
      }
    ]
  },
  {
    title: '一级 2',
    children: [
      {
        title: '二级 2-1',
        children: [{ title: '三级 2-1-1' }, { title: '三级 2-1-2' }]
      },
      {
        title: '二级 2-2',
        children: [{ title: '三级 2-2-1' }, { title: '三级 2-2-2' }]
      }
    ]
  }
])
const data1 = ref([
  {
    title: '数据维度',
    nodeType: 'root',
    children: [
      {
        title: '国家层级',
        nodeType: 'hierarchy',
        children: [
          {
            field: 'country',
            title: '国家',
            dataType: 'STRING',
            type: 'dimension',
            nodeType: 'attribute',
            tableId: '0001'
          },
          {
            field: 'province',
            title: '省',
            dataType: 'STRING',
            type: 'dimension',
            nodeType: 'attribute',
            tableId: '0001'
          },
          {
            field: 'city',
            title: '市',
            dataType: 'STRING',
            type: 'dimension',
            nodeType: 'attribute',
            tableId: '0001'
          }
        ]
      },
      {
        title: '部门',
        nodeType: 'folder',
        children: [
          {
            field: 'dept_code',
            title: '部门编号',
            dataType: 'STRING',
            type: 'dimension',
            nodeType: 'attribute',
            tableId: '0002'
          },
          {
            field: 'dept_name',
            title: '部门名称',
            dataType: 'STRING',
            type: 'dimension',
            nodeType: 'attribute',
            tableId: '0002'
          }
        ]
      }
    ]
  },
  {
    title: '数据度量',
    nodeType: 'root',
    children: [
      {
        title: '默认',
        nodeType: 'folder',
        children: [
          {
            field: 'count',
            title: '统计',
            dataType: 'NUMBER',
            type: 'measure',
            nodeType: 'attribute',
            tableId: '0001'
          }
        ]
      },
      {
        title: '部门',
        nodeType: 'folder',
        children: [
          {
            field: 'parent_dept',
            title: '上级部门',
            dataType: 'NUMBER',
            type: 'measure',
            nodeType: 'attribute',
            tableId: '0002'
          },
          {
            field: 'level',
            title: '层级',
            dataType: 'NUMBER',
            type: 'measure',
            nodeType: 'attribute',
            tableId: '0002'
          }
        ]
      }
    ]
  }
])

const treeRef = ref(null)

function allowDrop(draggingNode, dropNode, type) {
  if (dropNode.nodeType === 'attribute') {
    return type !== 'inner'
  } else {
    return dropNode.nodeType !== 'root'
  }
}

function allowDrag(draggingNode) {
  // 限制拖拽节点
  return draggingNode.nodeType === 'attribute'
}

function renderContent1({ root, node, data }) {
  const iconMap = {
    root: '',
    hierarchy: 'cluster',
    folder: 'folder',
    dimension: 'deploymentunit',
    measure: 'linechart'
  }
  const colorMap = {
    root: '#1a5cff',
    hierarchy: '#1a5cff',
    folder: '#1e1e1e',
    dimension: '#1a5cff',
    measure: '#46c93a'
  }
  const iconType = data.nodeType === 'attribute' ? data.type : data.nodeType
  const inline = [
    h(
      'span',
      {
        class: 't-ellipsis',
        style: { width: 'calc(100% - 24px)' },
        title: `${data.title}-(${data.field ?? ''})`
      },
      [
        h('i', {
          class: ['f-iconfont', `f-icon-${iconMap[iconType]}`],
          style: { fontSize: '16px', marginRight: '4px', color: colorMap[iconType] }
        }),
        data.title
      ]
    ),
    h(
      FDropdown,
      {
        trigger: 'click',
        appendToBody: true,
        placement: 'bottom-start',
        onCommand: name => {
          console.log(name, data)
          Message(`${name} node: [${data.title}]`)
        }
      },
      {
        default: () => h('i', { class: ['f-iconfont', 'f-icon-setting', 'setting-action'] }),
        dropdown: () =>
          h(FDropdownMenu, () => [
            h(FDropdownItem, { name: 'edit' }, () => [
              h('i', { class: 'f-iconfont f-icon-edit-square' }),
              '编辑'
            ]),
            h(FDropdownItem, { name: 'delete' }, () => [
              h('i', { class: 'f-iconfont f-icon-delete' }),
              '删除'
            ])
          ])
      }
    )
  ]
  return h('span', { style: { width: '100%', fontSize: '12px' }, flex: 'main:justify' }, inline)
}

function handleDragStart(node, ev) {
  console.log('drag start', node)
}
function handleDragEnter(draggingNode, dropNode, ev) {
  console.log('tree drag enter: ', dropNode.title)
}
function handleDragLeave(draggingNode, dropNode, ev) {
  console.log('tree drag leave: ', dropNode.title)
}
function handleDragEnd(draggingNode, dropNode, dropType, ev) {
  console.log('tree drag end: ', dropNode && dropNode.title, dropType)
}
function handleDrop(draggingNode, dropNode, dropType, ev) {
  console.log('tree drop: ', dropNode.title, dropType)
}
</script>
```

</template>

</card>

<card>

## render 函数

使用 render 函数可以设置更多自定义的效果

<template #example>

  <Render/>
  
</template>

<template #template>

```html
<template>
  <div flex>
    <div class="p10" style="width: 300px; border-right: 1px solid #eeeeee">
      <f-tag type="primary">新增移除</f-tag>
      <f-divider style="margin: 8px 0"></f-divider>
      <f-tree ref="tree" :data="data" :render="renderContent"></f-tree>
    </div>
    <div class="p10" style="width: 300px; border-right: 1px solid #eeeeee">
      <f-tag type="primary">下拉菜单</f-tag>
      <f-divider style="margin: 8px 0"></f-divider>
      <f-tree :data="data1" :render="renderContent1"></f-tree>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref, h } from 'vue'
import { Message, FDropdown, FDropdownMenu, FDropdownItem } from 'fei-ui-design'

const data = ref([
  {
    title: 'parent 1',
    expand: true,
    render: ({ root, node, data }) => {
      return h(
        'span',
        {
          style: {
            display: 'inline-flex',
            justifyContent: 'space-between',
            width: '100%'
          }
        },
        [
          h('span', data.title),
          h('i', {
            class: ['f-iconfont', 'f-icon-plus-square-fill'],
            style: { fontSize: '16px', color: '#1a5cff', marginRight: '4px' },
            onClick: () => {
              append(data)
            }
          })
        ]
      )
    },
    children: [{ title: 'child 1-1' }, { title: 'child 1-2' }]
  }
])
const data1 = ref([
  {
    title: '导航',
    icon: 'apartment',
    expand: true,
    children: [
      { title: '导航菜单', icon: 'menu' },
      { title: '图钉', icon: 'pushpin' },
      { title: '锚点', icon: 'attachment' },
      { title: '面包屑', icon: 'right' },
      { title: '标签页', icon: 'project' }
    ]
  }
])

function append(node) {
  const children = node.children || []
  node.expand = true
  children.push({ title: 'new node' })
  node.children = children
  data.value = [...data.value]
}
function remove(root, node, data) {
  console.log(root, node, data)
  const parentKey = root.find(el => el === node).parent
  const parent = root.find(el => el.nodeKey === parentKey).node
  const index = parent.children.indexOf(data)
  parent.children.splice(index, 1)
}

function renderContent({ root, node, data }) {
  return h(
    'span',
    {
      style: { display: 'inline-flex', justifyContent: 'space-between', width: '100%' }
    },
    [
      h('span', { class: 't-ellipsis', style: { width: 'calc(100% - 36px)' } }, data.title),
      h('span', { style: { width: '36px' } }, [
        h('i', {
          class: ['f-iconfont', 'f-icon-plus-square-fill'],
          style: { fontSize: '16px', color: '#5d6d7e' },
          onClick: e => {
            e.stopPropagation()
            append(data)
          }
        }),
        h('i', {
          class: ['f-iconfont', 'f-icon-minus-square-fill'],
          style: { fontSize: '16px', color: '#ff4757' },
          onClick: e => {
            e.stopPropagation()
            remove(root, node, data)
          }
        })
      ])
    ]
  )
}

function renderContent1({ root, node, data }) {
  const inline = [
    h(
      'span',
      {
        class: 't-ellipsis',
        style: { width: 'calc(100% - 24px)' },
        title: `${data.title}`
      },
      [
        h('i', {
          class: ['f-iconfont', `f-icon-${data.icon}`],
          style: { marginRight: '4px' }
        }),
        data.title
      ]
    ),
    h(
      FDropdown,
      {
        trigger: 'click',
        appendToBody: true,
        placement: 'bottom-start',
        onCommand: name => {
          console.log(name, data)
          Message(`${name} node: [${data.title}]`)
        }
      },
      {
        default: () => h('i', { class: ['f-iconfont', 'f-icon-setting', 'setting-action'] }),
        dropdown: () =>
          h(FDropdownMenu, () => [
            h(FDropdownItem, { name: 'edit' }, () => [
              h('i', { class: 'f-iconfont f-icon-edit-square' }),
              '编辑'
            ]),
            h(FDropdownItem, { name: 'delete' }, () => [
              h('i', { class: 'f-iconfont f-icon-delete' }),
              '删除'
            ])
          ])
      }
    )
  ]
  return h('span', { style: { width: '100%', fontSize: '12px' }, flex: 'main:justify' }, inline)
}
</script>
```

</template>

</card>

<card>

## 树选择

由于树选择场景较多，这里也额外封装了一个树形选择器以供表单进行节点选择

<template #example>

  <Select/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div flex>
      <div flex>
        <f-tree-select
          v-model="currentId"
          style="width: 300px"
          :data="data"
          title-key="text"
          @change="handleChange"
        ></f-tree-select>
        <f-button @click="defaultSelect">设置默认选中前端组</f-button>
      </div>
      <div flex class="ml-16">
        <f-tree-select
          v-model="currentId"
          v-model:checked="checked"
          style="width: 300px"
          :data="data"
          title-key="text"
          show-checkbox
          @change="handleChange"
        ></f-tree-select>
        <f-button @click="setChecked">设置默认勾选项目部</f-button>
      </div>
    </div>

    <div class="pt-8 pb-8">
      <f-button @click="clear">清空选择</f-button>
    </div>
    <div>currentId：{{ currentId }}</div>
    <div>currentNode：{{ currentNode }}</div>
    <div>checked：{{ checked }}</div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  {
    id: '001',
    text: '研发部',
    deptCode: 'yfb',
    status: '1',
    desc: '研发中心',
    parentId: null,
    children: [
      {
        id: '00101',
        text: '后端组',
        deptCode: 'hd',
        status: '1',
        desc: '后端研发中心',
        parentId: '001'
      },
      {
        id: '00102',
        text: '前端组',
        deptCode: 'qd',
        status: '1',
        desc: '前端研发中心',
        parentId: '001'
      },
      {
        id: '00103',
        text: 'UI设计',
        deptCode: 'sj',
        status: '1',
        desc: '交互、ui设计中心',
        parentId: '001'
      },
      {
        id: '00104',
        text: '测试组',
        deptCode: 'cs',
        status: '1',
        desc: '测试组',
        parentId: '001'
      },
      {
        id: '00105',
        text: '运维组',
        deptCode: 'yw',
        status: '1',
        desc: '运维、服务、巡检',
        parentId: '001'
      }
    ]
  },
  {
    id: '002',
    text: '项目部',
    deptCode: 'xmb',
    status: '1',
    desc: '项目服务部',
    parentId: null,
    children: [
      {
        id: '00201',
        text: '开发组',
        deptCode: 'kf',
        status: '1',
        desc: '后端项目开发',
        parentId: '002'
      },
      {
        id: '00202',
        text: '交付服务组',
        deptCode: 'jf',
        status: '1',
        desc: '交付项目，技术服务支持',
        parentId: '002'
      }
    ]
  }
])

const currentId = ref('00102')
const currentNode = ref({})
const checked = ref([])

function defaultSelect() {
  currentId.value = '00102'
}
function handleChange(val, node) {
  currentNode.value = node ? { id: node.id, text: node.text } : {}
}
function setChecked() {
  checked.value = ['002', '00201', '00202']
}
function clear() {
  currentId.value = ''
  currentNode.value = {}
  checked.value = []
}
</script>
```

</template>

</card>

<card>

## 树校验

可以结合form表单进行校验提示。

<template #example>

  <Valid/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div flex>
      <f-form ref="ruleFormRef" :model="obj" label-width="85px" :rules="ruleValidate">
        <f-form-item prop="currentId" label="树结构">
          <f-tree-select
            v-model="obj.currentId"
            style="width: 300px"
            :data="data"
            title-key="text"
            clearable
            @change="handleChange"
          ></f-tree-select>
        </f-form-item>
        <f-form-item>
          <f-button type="primary" @click="submitForm">提交</f-button>
          <f-button @click="resetForm">重置</f-button>
        </f-form-item>
      </f-form>
    </div>
    <div>currentId：{{ obj.currentId }}</div>
    <div>currentNode：{{ currentNode }}</div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  {
    id: '001',
    text: '研发部',
    deptCode: 'yfb',
    status: '1',
    desc: '研发中心',
    parentId: null,
    children: [
      {
        id: '00101',
        text: '后端组',
        deptCode: 'hd',
        status: '1',
        desc: '后端研发中心',
        parentId: '001'
      },
      {
        id: '00102',
        text: '前端组',
        deptCode: 'qd',
        status: '1',
        desc: '前端研发中心',
        parentId: '001'
      },
      {
        id: '00103',
        text: 'UI设计',
        deptCode: 'sj',
        status: '1',
        desc: '交互、ui设计中心',
        parentId: '001'
      },
      {
        id: '00104',
        text: '测试组',
        deptCode: 'cs',
        status: '1',
        desc: '测试组',
        parentId: '001'
      },
      {
        id: '00105',
        text: '运维组',
        deptCode: 'yw',
        status: '1',
        desc: '运维、服务、巡检',
        parentId: '001'
      }
    ]
  },
  {
    id: '002',
    text: '项目部',
    deptCode: 'xmb',
    status: '1',
    desc: '项目服务部',
    parentId: null,
    children: [
      {
        id: '00201',
        text: '开发组',
        deptCode: 'kf',
        status: '1',
        desc: '后端项目开发',
        parentId: '002'
      },
      {
        id: '00202',
        text: '交付服务组',
        deptCode: 'jf',
        status: '1',
        desc: '交付项目，技术服务支持',
        parentId: '002'
      }
    ]
  }
])

const obj = ref({
  currentId: '00102'
})
const ruleFormRef = ref(null)
const currentNode = ref({})
const ruleValidate = {
  currentId: [{ required: true, message: '树不能为空', trigger: 'change' }]
}

function handleChange(val, node) {
  // console.log(val, node)
  currentNode.value = node ? { id: node.id, text: node.text } : {}
}

function submitForm() {
  ruleFormRef.value.validate(valid => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
function resetForm() {
  ruleFormRef.value.resetFields()
}
</script>
```

</template>

</card>

<card>

## Big-Tree 超大数据

如果需要渲染超大数据量的属性结构，需要使用扩展组件`<f-big-tree>`,组件内部 api 基本复用树结构所有属性，对树形结构进行优化，利用可视区域位置来进行过滤筛选节点并进行操作，
但为了性能的提示必然要牺牲部分体验，因此大数据量的树结构不提供动画展开缩放效果

默认节点高度为`28px`，可通过`visible-count`指定树可是区域显示的节点个数，默认为 15 个 即`420px`因为是针对可视区域的滚动优化，因此必须指定容器高度

<template #example>

  <Big/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div style="margin-bottom: 8px">
      <f-space>
        数据条数：
        <f-input-number v-model="number" style="width: 120px"></f-input-number>
        <f-button @click="init">渲染</f-button>
        <f-input
          v-model="query"
          search
          placeholder="输入过滤条件后回车筛选"
          style="width: 230px"
          @search="handleFilter"
        ></f-input>
        <f-button-group>
          <f-button @click="expandAll">展开所有</f-button>
          <f-button @click="collapseAll">收起所有</f-button>
        </f-button-group>
      </f-space>
    </div>
    <f-divider style="margin: 14px 0"></f-divider>
    <f-big-tree
      ref="treeRef"
      :data="treedata"
      :visible-count="10"
      :filter-node-method="filterNode"
      @select-change="handleSelected"
    ></f-big-tree>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const treedata = ref([])

const number = ref(5000)
const query = ref('')
const treeRef = ref(null)

let maxNode = 10000 // 最大的节点数
const childNodesNumber = [2, 5] // 子节点数
const maxLevel = 3 // 最大嵌套层级
const childRate = 0.4 // 拥有子节点的概率
const label = '节点' // 节点label
let index = 0
const data = []

const randomInteger = function (min, max) {
  let result = min - 0.5 + Math.random() * (max - min + 1)
  result = Math.round(result)
  return result
}

const generateId = function () {
  ++index
  return Math.random().toString().slice(3) * 1
}

const generateNode = function () {
  const id = generateId()
  return {
    id: id,
    title: `${label}_${index}-id：${id}`
  }
}
const generateChild = function (tree, level = 1) {
  if (index > maxNode - 1) return
  tree.children = []
  const childNumber = randomInteger(childNodesNumber[0], childNodesNumber[1])
  for (let i = 0; i < childNumber; i++) {
    if (index > maxNode - 1) break
    const obj = generateNode()

    if (Math.random() < childRate && level < maxLevel) {
      generateChild(obj, ++level)
    }
    tree.children.push(obj)
  }
}

const generate = function (number) {
  // eslint-disable-next-line no-const-assign
  maxNode = number
  // eslint-disable-next-line no-unmodified-loop-condition
  while (index < maxNode) {
    let obj = generateNode()
    generateChild(obj)
    data.push(obj)
  }
  return data
}
function init() {
  treedata.value = generate(number.value)
}
function handleSelected(allSelected, node) {
  console.log(allSelected, node)
}
function expandAll() {
  treeRef.value.expandAll()
}
function collapseAll() {
  treeRef.value.collapseAll()
}
function handleFilter(value) {
  treeRef.value.filter(value)
}
function filterNode(value, node) {
  if (!value) return true
  // return node.title===value.trim()
  return node.title.indexOf(value) !== -1
}
</script>
```

</template>

</card>

## Props

| 参数               | 说明                                                                                                                                                                                | 类型                                   | 可选值 | 默认值   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------ | -------- |
| data               | 可嵌套的节点属性的数组，生成 tree 的数据                                                                                                                                            | Array                                  | —      | []       |
| multiple           | 是否支持多选                                                                                                                                                                        | Boolean                                | —      | false    |
| show-checkbox      | 是否显示多选框                                                                                                                                                                      | Boolean                                | —      | false    |
| empty-text         | 没有数据时的提示                                                                                                                                                                    | String                                 | —      | 暂无数据 |
| load-data          | 异步加载数据的方法，见示例                                                                                                                                                          | Function                               | —      | —        |
| title-key          | 定义 title 键,默认 title                                                                                                                                                            | String                                 | —      | title    |
| children-key       | 定义子节点键,默认 children 为子节点 key                                                                                                                                             | String                                 | —      | children |
| check-strictly     | 复选框的情况下，是否严格的遵循父子不互相关联的做法                                                                                                                                  | Boolean                                | —      | false    |
| check-directly     | 开启后，在 show-checkbox 模式下，select 的交互也将转为 check                                                                                                                        | Boolean                                | —      | false    |
| lock-select        | 锁定树选择，再部分业务中常用，比如开启弹窗后禁用树的选中操作                                                                                                                        | Boolean                                | —      | false    |
| title-ellipsis     | 是否开启标题超长省略                                                                                                                                                                | Boolean                                | —      | true     |
| draggable          | 是否开启拖拽节点功能                                                                                                                                                                | Boolean                                | —      | true     |
| allow-drag         | 判断节点能否被拖拽 如果返回 false ，节点不能被拖动                                                                                                                                  | Function(node)                         | —      | —        |
| allow-drop         | 拖拽时判定目标节点能否成为拖动目标位置。 返回false拖动节点不能被拖放到目标节点。type 参数有三种情况：'prev'、'inner'和 'next'，表示放置在目标节点前、插入目标节点和放置在目标节点后 | Function(draggingNode, dropNode, type) | —      | —        |
| filter-node-method | 筛选过滤树节点函数                                                                                                                                                                  | Function                               | —      | —        |
| highlight-filter   | 高亮搜索条件文字                                                                                                                                                                    | Boolean                                | —      | true     |
| timeout            | 刷新频率（`<f-big-tree>`扩展组件可用）                                                                                                                                              | Number                                 | —      | 17       |
| itemHeight         | 节点高度 （`<f-big-tree>`扩展组件可用）                                                                                                                                             | Number                                 | —      | 28       |
| visibleCount       | 显示区域个数（`<f-big-tree>`扩展组件可用）                                                                                                                                          | Number                                 | —      | 15       |

## Events

| 事件名          | 说明                   | 返回值                                                                       |
| --------------- | ---------------------- | ---------------------------------------------------------------------------- |
| select-change   | 点击树节点时触发       | 当前已选中的节点数组、当前项、flatState                                      |
| check-change    | 点击复选框时触发       | 当前已勾选节点的数组、当前项、包含半选的节点数组、flatState                  |
| toggle-expand   | 展开和收起子列表时触发 | 当前节点的数据                                                               |
| node-drag-start | 拖拽节点开始事件       | 被拖拽节点对应的 Node、event                                                 |
| node-drag-enter | 拖拽节点进入事件       | 被拖拽节点对应的 Node、当前进入节点对应的 Node、event                        |
| node-drag-leave | 拖拽节点移除事件       | 被拖拽节点对应的 Node、所离开节点对应的 Node、event                          |
| node-drag-over  | 拖拽节点 over 事件     | 被拖拽节点对应的 Node、当前进入节点对应的 Node、event                        |
| node-drag-end   | 拖拽节点结束事件       | 被拖拽节点对应的 Node、当前进入节点对应的 Node、放置节点类型 dropType、event |
| node-drag       | 拖拽节点结束事件       | 被拖拽节点对应的 Node、当前进入节点对应的 Node、放置节点类型 dropType、event |

## Methods

| 事件名                          | 说明                                                                                                             | 返回值 |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------ |
| getFlatState                    | 拍平的数组 buffer，包含层级关系及索引 无                                                                         |
| getCheckedNodes                 | 获取被勾选的节点                                                                                                 | 无     |
| getSelectedNodes                | 获取被选中的节点                                                                                                 | 无     |
| getCheckedAndIndeterminateNodes | 获取选中及半选节点                                                                                               | 无     |
| filter                          | 树节点过滤函数，必须设置 filter-node-method 过滤匹配函数                                                         | 无     |
| setChecked                      | 设置 node 勾选 ，参数为 keys：nodeKey 数组, flag：勾选状态，默认 true                                            | 无     |
| setSelected                     | 设置 node 单选 ，参数为 keys：nodeKey 数组, flag：勾选状态，默认 true，expandParent：是否展开祖先节点，默认 true | 无     |
| setExpand                       | 设置 node 展开 ，参数为 keys：nodeKey 数组, flag：勾选状态，默认 true                                            | 无     |
| expandAll                       | 展开所有                                                                                                         | 无     |
| collapseAll                     | 收起所有                                                                                                         | 无     |
| checkAll                        | 勾选所有                                                                                                         | 无     |
| unselectAll                     | 取消所有单选                                                                                                     | 无     |
| uncheckAll                      | 取消全部勾选                                                                                                     | 无     |

## Children

| 属性            | 说明                                                         | 类型    | 默认值 |
| --------------- | ------------------------------------------------------------ | ------- | ------ |
| icon            | 节点显示 icon                                                | String  | —      |
| title           | 节点显示标题                                                 | String  | —      |
| expand          | 是否展开直子节点                                             | Boolean | false  |
| disabled        | 禁用                                                         | Boolean | false  |
| disableCheckbox | 禁用单选框                                                   | Boolean | false  |
| selected        | 是否选中子节点                                               | Boolean | false  |
| checked         | 是否勾选(如果勾选，子节点也会全部勾选)                       | Boolean | false  |
| visible         | 是否显示节点(可通过操作节点 visible 属性隐藏节点)            | Boolean | false  |
| children        | 子节点属性数组，可以设置 tree 组件 children-key 属性来自定义 | Array   | —      |
| loading         | 可设置为异步加载节点，需配合 loadData 设置加载函数           | Boolean | —      |
| isLeaf          | 是否为叶子节点，可控制是否显示箭头，可配合异步加载实现       | Boolean | —      |
