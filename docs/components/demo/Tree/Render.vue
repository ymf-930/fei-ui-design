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
