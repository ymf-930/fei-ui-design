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
