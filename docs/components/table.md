---
title: 表格 Table
---

<script setup>
import Basic from './demo/Table/Basic.vue'
import Stripe from './demo/Table/Stripe.vue'
import Border from './demo/Table/Border.vue'
import Tooltip from './demo/Table/Tooltip.vue'
import FixedHeader from './demo/Table/FixedHeader.vue'
import FixedColumn from './demo/Table/FixedColumn.vue'
import AutoHeight from './demo/Table/AutoHeight.vue'
import Select from './demo/Table/Select.vue'
import MultiplySelect from './demo/Table/MultiplySelect.vue'
import Expand from './demo/Table/Expand.vue'
import GroupHeader from './demo/Table/GroupHeader.vue'
import Merge from './demo/Table/Merge.vue'
import Sort from './demo/Table/Sort.vue'
import Edit from './demo/Table/Edit.vue'
import Drag from './demo/Table/Drag.vue'
import Loading from './demo/Table/Loading.vue'
import Size from './demo/Table/Size.vue'
import NoData from './demo/Table/NoData.vue'
</script>

##### 基础的表格组件，用于显示列表数据

<card>

## 基础用法

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-table :columns="columns" :data="data">
    <template #age="{ row }">
      <f-tag>{{ row.age }}</f-tag>
    </template>
  </f-table>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', slot: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' }
]
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
</script>
```

</template>

</card>

<card>

## 斑马纹

通过设置`stripe`来设置斑马纹显示

<template #example>

  <Stripe/>
  
</template>

<template #template>

```html
<template>
  <f-table :columns="columns" :data="data" stripe>
    <template #age="{ row }">
      <f-tag>{{ row.age }}</f-tag>
    </template>
  </f-table>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', slot: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' }
]
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
</script>
```

</template>

</card>

<card>

## 边框

通过设置`border`来设置斑马纹显示

<template #example>

  <Border/>
  
</template>

<template #template>

```html
<template>
  <f-table :columns="columns" :data="data" border>
    <template #age="{ row }">
      <f-tag>{{ row.age }}</f-tag>
    </template>
  </f-table>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', slot: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' }
]
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
</script>
```

</template>

</card>

<card>

## 超出隐藏

可以通过给`columns`设置属性`tooltip`来设置超出隐藏并悬停显示, 如仅有一张表格则可以设置`tooltip`皮肤`tooltip-theme`来开启优化样式
（注意：因表格单元格存在超出隐藏样式所以必须将tooltip标签插入至body元素，会成多余标签，如有多个表格缓存则会插入过多标签造成性能问题，所以是否开启需要根据需求确定）

<template #example>

  <Tooltip/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-divider align="left">默认原生title</f-divider>
    <f-table :columns="columns" :data="data" border></f-table>
    <f-divider align="left">开启tooltip</f-divider>
    <f-table :columns="columns" :data="data" border tooltip-theme="dark"></f-table>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' },
  { title: '备注', key: 'remark', tooltip: true }
]
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居',
    remark:
      '这是一段描述文字，文本长度会超出列宽，设置tooltip属性可以设置不换行显示并开启鼠标悬停显示所有文字。'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗',
    remark:
      '这是一段描述文字，文本长度会超出列宽，设置tooltip属性可以设置不换行显示并开启鼠标悬停显示所有文字。'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道',
    remark:
      '这是一段描述文字，文本长度会超出列宽，设置tooltip属性可以设置不换行显示并开启鼠标悬停显示所有文字。'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道',
    remark:
      '这是一段描述文字，文本长度会超出列宽，设置tooltip属性可以设置不换行显示并开启鼠标悬停显示所有文字。'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道',
    remark:
      '这是一段描述文字，文本长度会超出列宽，设置tooltip属性可以设置不换行显示并开启鼠标悬停显示所有文字。'
  }
])
</script>
```

</template>

</card>

<card>

## 固定表头

height 和 maxHeight 可以设置固定表头

<template #example>

  <FixedHeader/>
  
</template>

<template #template>

```html
<template>
  <f-table :columns="columns" :data="data" height="200" border></f-table>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' }
]
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
</script>
```

</template>

</card>

<card>

## 固定表头和列

可以同时固定表头和列

<template #example>

  <FixedColumn/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 800px">
    <f-table :columns="columns" :data="data" height="200" border></f-table>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref, h } from 'vue'

const columns = [
  {
    title: '姓名',
    fixed: 'left',
    key: 'name',
    width: 150
  },
  {
    title: '年龄',
    key: 'age',
    width: 150
  },
  {
    title: '出生日期',
    key: 'birthday',
    width: 150
  },
  {
    title: '地址',
    key: 'address',
    width: 350
  },
  {
    title: '操作',
    fixed: 'right',
    width: 100,
    render: () => {
      return h('a', { style: { cursor: 'pointer' } }, '编辑')
    }
  }
]

const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
</script>
```

</template>

</card>

<card>

## 流体高度

<template #example>

  <AutoHeight/>
  
</template>

<template #template>

```html
<template>
  <div style="padding: 2px">
    <f-table :columns="columns" :data="data" max-height="200" border>
      <template #ctrl="{ index }">
        <f-button type="danger" size="mini" plain @click="removeRow(index)">删除</f-button>
      </template>
    </f-table>
    <br />
    <f-button @click="add">增加一条数据</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age', align: 'center' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address', width: 350 },
  { title: '操作', slot: 'ctrl', width: 100 }
]
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  }
])

function add() {
  data.value.push({
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  })
}
function removeRow(index) {
  data.value.splice(index, 1)
}
</script>
```

</template>

</card>

<card>

## 单选表格

<template #example>

  <Select/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-table
      ref="currentRowTable"
      :columns="columns"
      :data="data"
      highlight-row
      @current-change="currentRowChange"
    ></f-table>
    <br />
    <div>
      <f-button @click="clearSelect">清除单选</f-button>
      <f-button @click="clickRow(0)">选中第一行</f-button>
    </div>
    <br />
    <f-table
      ref="currentRowTable2"
      :columns="columns2"
      :data="data2"
      highlight-row
      @current-change="currentRowChange"
    >
      <template #ctrl="{ index }">
        <f-button type="text" text-color="danger" @click="removeRow(index)">删除</f-button>
      </template>
    </f-table>
    <br />
    <f-button @click="init">初始化表格2并默认选中第一行</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Message } from 'fei-ui-design'

const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' }
]
const columns2 = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' },
  { title: '操作', slot: 'ctrl' }
]
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
const data2 = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
const currentRowTable = ref(null)
const currentRowTable2 = ref(null)

function currentRowChange(currentRow, oldRow, index) {
  if (index >= 0) {
    Message(`选中了第${index + 1}行`)
  }
}

function clearSelect() {
  currentRowTable.value.clearCurrentRow()
}
// 选中某一行
function clickRow(index) {
  currentRowTable.value.clickCurrentRow(index)
}
function init() {
  data2.value = JSON.parse(JSON.stringify(data.value))
  nextTick(() => {
    currentRowTable2.value.clickCurrentRow(0)
  })
}
function removeRow(index) {
  data2.value.splice(index, 1)
}
</script>
```

</template>

</card>

<card>

## 多选表格

通过给 columns 数据设置一项，指定 type: 'selection'，即可自动开启多选功能。

给 data 项设置特殊 key \_checked: true 可以默认选中当前项。

给 data 项设置特殊 key \_disabled: true 可以禁止选择当前项。

@select，选中某一项触发，返回值为 selection 和 row，分别为已选项和刚选择的项。@select-all，点击全选时触发，返回值为 selection，已选项。
@selection-change，只要选中项发生变化时就会触发，返回值为 selection，已选项。

<template #example>

  <MultiplySelect/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-table ref="tableRef" :columns="columns" :data="data" highlight-row></f-table>
    <br />
    <f-button @click="$refs.tableRef.selectAll(true)">设置全选</f-button>
    <f-button @click="$refs.tableRef.selectAll(false)">取消全选</f-button>
    <f-button @click="getAllSelected">获取选中</f-button>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { type: 'selection', width: 60, align: 'center' },
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' }
]
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
const tableRef = ref(null)
function getAllSelected() {
  const selected = tableRef.value.getSelection()
  console.log(selected)
}
</script>
```

</template>

</card>

<card>

## 可展开

通过给`columns` 数据设置一项，指定 `type: 'expand'`，即可开启扩展功能。

<template #example>

  <Expand/>
  
</template>

<template #template>

```html
<template>
  <f-table :columns="columns" :data="data"></f-table>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref, h } from 'vue'
const columns = [
  {
    type: 'expand',
    width: 50,
    render: params => {
      return h('div', '详细地址：' + params.row.address)
    }
  },
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '详细地址', key: 'address' }
]

const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
</script>
```

</template>

</card>

<card>

## 表头分组

columns内容可以设置children来分组渲染表头,合并表头和行列时推荐使用border模式

<template #example>

  <GroupHeader/>
  
</template>

<template #template>

```html
<template>
  <f-table :columns="columns" height="300" :data="data" border></f-table>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { title: '姓名', key: 'name' },
  {
    title: '基本信息',
    align: 'center',
    children: [
      { title: '年龄', key: 'age' },
      { title: '出生日期', key: 'birthday' },
      { title: '详细地址', key: 'address' }
    ]
  },
  {
    title: '学历信息',
    align: 'center',
    children: [
      { title: '毕业院校', key: 'school' },
      { title: '毕业日期', key: 'eduDate' }
    ]
  }
]
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居',
    school: '南京河海大学',
    eduDate: '2012-04-22'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗',
    school: '北京大学',
    eduDate: '2012-04-22'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道',
    school: '上海复旦',
    eduDate: '2012-04-22'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道',
    school: '广东大学',
    eduDate: '2012-04-22'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道',
    school: '南京交通学院',
    eduDate: '2012-04-22'
  },
  {
    name: '李晓红',
    age: 23,
    birthday: '1999-12-12',
    address: '南京市龙眠大道',
    school: '南京交通学院',
    eduDate: '2012-04-22'
  },
  {
    name: '郭小宁',
    age: 23,
    birthday: '1999-12-12',
    address: '南京市龙眠大道',
    school: '南京交通学院',
    eduDate: '2012-04-22'
  }
])
</script>
```

</template>

</card>

<card>

## 行列合并

可以设置属性`mergeMethod`制定合并行或者列的算法，方法参数为四个对象`row`，`column`，`rowIndex`，`columnIndex`，
该方法返回一个包含两个元素的数组，第一个表示rowspan，第二个为colspan，用于合并单元格 合并表格最好是使用border模式

<template #example>

  <Merge/>
  
</template>

<template #template>

```html
<template>
  <f-table :columns="columns" :data="data" border :merge-method="handleSpan"></f-table>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' }
]
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])

function handleSpan({ row, column, rowIndex, columnIndex }) {
  // 获取相同姓名的行是，0，1
  if (rowIndex === 0 && columnIndex === 0) {
    return {
      rowspan: 2,
      colspan: 1
    }
  } else if (rowIndex === 1 && columnIndex === 0) {
    return {
      rowspan: 0,
      colspan: 1
    }
  }
  // 合并列，这里将第三行，周小伟的日期和地址合并
  if (rowIndex === 3 && columnIndex === 2) {
    return [1, 2]
  } else if (rowIndex === 3 && columnIndex === 3) {
    return [0, 0]
  }
}
</script>
```

</template>

</card>

<card>

## 排序表格

<template #example>

  <Sort/>
  
</template>

<template #template>

```html
<template>
  <f-table :columns="columns" :data="data"></f-table>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age', sortable: true },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' }
]
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
</script>
```

</template>

</card>

<card>

## 行内编辑

<preview path="./demo/Table/Edit.vue"></preview>

<template #example>

  <Edit/>
  
</template>

<template #template>

```html
<template>
  <f-table :columns="columns" :data="data">
    <template #name="{ index, row }">
      <f-input
        v-if="obj.editIndex === index"
        v-model="obj.editName"
        type="text"
        size="small"
        clearable
      ></f-input>
      <span v-else>{{ row.name }}</span>
    </template>
    <template #age="{ index, row }">
      <f-input-number
        v-if="obj.editIndex === index"
        v-model="obj.editAge"
        type="text"
        size="small"
      ></f-input-number>
      <span v-else>{{ row.age }}</span>
    </template>
    <template #birthday="{ index, row }">
      <f-date-picker
        v-if="obj.editIndex === index"
        v-model="obj.editBirthday"
        size="small"
        type="date"
        placeholder="选择日期"
      ></f-date-picker>
      <span v-else>{{ row.birthday }}</span>
    </template>
    <template #hobby="{ index, row }">
      <f-select v-if="obj.editIndex === index" v-model="obj.editHobby" clearable size="small">
        <f-option v-for="(val, key) in hobbyMap" :key="key" :value="key" :label="val">
          {{ val }}
        </f-option>
      </f-select>
      <span v-else>{{ hobbyMap[row.hobby] }}</span>
    </template>
    <template #address="{ index, row }">
      <f-input
        v-if="obj.editIndex === index"
        v-model="obj.editAddress"
        type="text"
        size="small"
      ></f-input>
      <span v-else>{{ row.address }}</span>
    </template>
    <template #action="{ index, row }">
      <div v-if="obj.editIndex === index">
        <f-button size="small" type="success" plain @click="handleSave(index)">保存</f-button>
        <f-button size="small" @click="obj.editIndex = -1">取消</f-button>
      </div>
      <div v-else>
        <f-button size="small" @click="handleEdit(row, index)">操作</f-button>
      </div>
    </template>
  </f-table>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'

const columns = [
  { title: '姓名', slot: 'name' },
  { title: '年龄', slot: 'age' },
  { title: '出生日期', slot: 'birthday' },
  { title: '爱好', slot: 'hobby' },
  { title: '地址', slot: 'address' },
  { title: '操作', slot: 'action' }
]
const hobbyMap = { '1': '吃饭', '2': '睡觉', '3': '打豆豆' }
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    hobby: '1',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    hobby: '1',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    hobby: '3',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    hobby: '1',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    hobby: '2',
    address: '南京市龙眠大道'
  }
])

const obj = reactive({
  editName: '',
  editAge: '',
  editBirthday: '',
  editHobby: '',
  editAddress: '',
  editIndex: -1
})

function handleEdit(row, index) {
  obj.editName = row.name
  obj.editAge = row.age
  obj.editHobby = row.hobby
  obj.editAddress = row.address
  obj.editBirthday = new Date(row.birthday)
  obj.editIndex = index
}
function handleSave(index) {
  data.value[index].name = obj.editName
  data.value[index].age = obj.editAge
  data.value[index].birthday = dayjs(obj.editBirthday).format('YYYY-MM-DD')
  data.value[index].hobby = obj.editHobby
  data.value[index].address = obj.editAddress
  obj.editIndex = -1
}
</script>
```

</template>

</card>

<card>

## 拖拽调整顺序

可以设置draggable开启拖拽排序

注意，设置拖拽排序后，且鼠标拖拽也覆盖了鼠标选中文字，此时可以额外设置也可以设置handle来指定拖拽某一个元素实现

如需要更新数据，则需使用v-model:data来更新,或配合@drag-drop函数来处理更新数据都可以

<template #example>

  <Drag/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div>
      <p>默认拖拽</p>
      <f-table v-model:data="data1" :columns="columns1" draggable></f-table>
      <p>实际数据：{{ data1.map(v => v.id + '-' + v.name) }}</p>
    </div>
    <f-divider></f-divider>
    <div>
      <p>如需和单选结合使用，推荐使用drag-drop函数来自定义控制，这样可以更好的实现自定义选中效果</p>
      <p>drag-handle</p>
      <f-table
        ref="currentRowTable"
        :columns="columns2"
        :data="data2"
        draggable
        drag-handle=".drag-handle"
        highlight-row
        @drag-drop="handleDragDrop"
        @current-change="currentRowChange"
      >
        <template #handle="{ row }">
          <span class="drag-handle" style="cursor: grab"><f-icon name="drag" size="20" /></span>
        </template>
        <template #ctrl="{ row, index }">
          <f-button type="text" @click.stop="handleEdit(row, index)">编辑</f-button>
          <f-button type="text" text-color="danger" @click.stop="removeRow(index)">删除</f-button>
        </template>
      </f-table>
      <p>实际数据：{{ data2.map(v => v.id + '-' + v.name) }}</p>
      <p>选中行：{{ currentRow }}</p>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref, nextTick } from 'vue'
const columns1 = [
  { title: 'ID', key: 'id', width: 70 },
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' }
]
const columns2 = [
  { slot: 'handle', width: 70 },
  { title: 'ID', key: 'id', width: 70 },
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' },
  { title: '操作', slot: 'ctrl', width: 120 }
]
const data1 = ref([
  {
    id: 1,
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    id: 2,
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    id: 3,
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    id: 4,
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    id: 5,
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
const data2 = ref([
  {
    id: 1,
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    id: 2,
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    id: 3,
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    id: 4,
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    id: 5,
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
const currentRow = ref({})
const currentRowTable = ref(null)

function currentRowChange(row, oldRow, index) {
  currentRow.value = row
}
function handleDragDrop(newList, newIndex, oldIndex) {
  data2.value = [...newList]
  nextTick(() => {
    currentRowTable.value.clickCurrentRow(newIndex)
  })
}
function handleEdit(row, index) {
  console.log(row, index)
}
function removeRow(index) {
  data2.value.splice(index, 1)
  nextTick(() => {
    currentRowTable.value.clearCurrentRow()
  })
}
</script>
```

</template>

</card>

<card>

## loading状态

<template #example>

  <Loading/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-table :columns="columns" :data="data" :loading="loading"></f-table>
    <br />
    <f-switch v-model="loading"></f-switch>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' }
]
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
const loading = ref(false)
</script>
```

</template>

</card>

<card>

## 大小状态

通过设置属性 `size` 为 `large` 或 `small` 可以调整表格尺寸为大或小，默认不填或填写 default 。

<template #example>

  <Size/>
  
</template>

<template #template>

```html
<template>
  <div>
    <div class="mb-16">
      <f-radio-group v-model="tableSize" type="button">
        <f-radio label="large">松散</f-radio>
        <f-radio label="default">默认</f-radio>
        <f-radio label="small">紧凑</f-radio>
      </f-radio-group>
    </div>
    <f-table :columns="columns" :data="data" :size="tableSize"></f-table>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' }
]
const data = ref([
  {
    name: '王小明',
    age: 18,
    birthday: '1990-04-22',
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    birthday: '1990-11-11',
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    birthday: '1985-02-05',
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    birthday: '1993-07-11',
    address: '深圳市南山区深南大道'
  },
  {
    name: '张小发',
    age: 33,
    birthday: '1999-12-12',
    address: '南京市龙眠大道'
  }
])
const tableSize = ref('default')
</script>
```

</template>

</card>

<card>

## 无数据

noDataText可以设置无数据状态

<template #example>

  <NoData/>
  
</template>

<template #template>

```html
<template>
  <f-table :columns="columns" :data="data" no-data-text="No Data"></f-table>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '出生日期', key: 'birthday' },
  { title: '地址', key: 'address' }
]
const data = ref([])
</script>
```

</template>

</card>

## Table props

| 参数           | 说明                                                                                                          | 类型          | 可选值        | 默认值   |
| -------------- | ------------------------------------------------------------------------------------------------------------- | ------------- | ------------- | -------- |
| data           | 显示的结构化数据，字段 cellClassName 用于设置任意单元格的样式名称，因此数据不能使用该字段，详见示例特定样式。 | Array         | —             | []       |
| columns        | 表格列的配置描述，具体项见后文                                                                                | Array         | —             | []       |
| stripe         | 间隔斑马纹                                                                                                    | Boolean       | false/true    | false    |
| border         | 纵向边框                                                                                                      | Boolean       | false/true    | false    |
| show-header    | 是否显示表头                                                                                                  | Boolean       | false/true    | false    |
| width          | 表格宽度，单位 px                                                                                             | Number/String | —             | auto     |
| height         | 表格高度，单位 px，设置后，如果表格内容大于此值，会固定表头                                                   | Number/String | —             | —        |
| max-height     | 最大表格高度                                                                                                  | Number/String | —             | —        |
| loading        | 表格加载状态                                                                                                  | Boolean       | —             | false    |
| disabled-hover | 禁用悬停高亮                                                                                                  | Boolean       | —             | false    |
| highlight-row  | 是否支持高亮选中的行，即单选                                                                                  | Boolean       | —             | false    |
| size           | 表格尺寸                                                                                                      | string        | large / small | default  |
| no-data-text   | 空数据内容                                                                                                    | string        | —             | 暂无数据 |
| loading-text   | 加载数据文字                                                                                                  | string        | —             | 正在加载 |
| draggable      | 开启拖拽调整行顺序，同步元数据需要使用v-model:data使用或需配合 @drag-drop 事件更新data都可以                  | Boolean       | —             | false    |
| drag-handle    | 拖拽的handle图标                                                                                              | String        | —             | —        |
| row-key        | 是否强制使用内置row-key刷新                                                                                   | Boolean       | —             | false    |
| merge-method   | 表格合并行列的方法函数                                                                                        | Function      | —             | false    |

## Table events

| 事件名            | 说明                                                        | 返回值                                                         |
| ----------------- | ----------------------------------------------------------- | -------------------------------------------------------------- |
| current-change    | 开启 highlight-row 后有效，当表格的当前行发生变化的时候会触 | currentRow, oldCurrentRow,index                                |
| select            | 在多选模式下有效，选中某一项时触发                          | 已选项, 刚选择                                                 |
| select-cancel     | 在多选模式下有效，取消选中某一项时触发                      | 已选项, 取消选择                                               |
| select-all        | 全选时触发                                                  | 已选项                                                         |
| select-all-cancel | 取消全选时触发                                              | 已选项                                                         |
| selection-change  | 选中项发生变化时就会触发                                    | 已选项                                                         |
| sort-change       | 排序时有效，当点击排序时触发                                | column：当前列数据 key：排序依据的指标 order(值为 asc 或 desc) |
| row-click         | 单击某一行时触发                                            | 当前行的数据,index                                             |
| row-dblclick      | 双击某一行时触发                                            | 当前行的数据,index                                             |
| expand            | 展开或收起某一行时触                                        | row：当前行的数据,status：当前的状态                           |
| drag-drop         | 拖拽排序松开时触发                                          | 置换的两行数据索引和更新后的数据 newData, newIndex, oldIndex   |

## Table slot

| 名称    | 说明               |
| ------- | ------------------ |
| header  | 表头               |
| footer  | 页脚               |
| loading | 警告提加载中示内容 |

## Table methods

| 方法名          | 说明                 | 参数  |
| --------------- | -------------------- | ----- |
| clickCurrentRow | 选中某一项           | index |
| clearCurrentRow | 清除高亮项，仅在开启 | 无    |
| handleResize    | 刷新表格的宽高       | 无    |
| getSelection    | 获取已经选中的行     | 无    |

## column

| 参数        | 说明                                                              | 类型              | 可选值                                | 默认值 |
| ----------- | ----------------------------------------------------------------- | ----------------- | ------------------------------------- | ------ |
| type        | 列类型                                                            | String            | index、selection、expand、html String | -      |
| title       | 列头显示文字                                                      | String            | -                                     | #      |
| key         | 对应列内容的字段名                                                | String            | -                                     | -      |
| width       | 列宽                                                              | Number            | -                                     | -      |
| minWidth    | 最小列宽                                                          | Number            | -                                     | -      |
| maxWidth    | 最大列宽                                                          | Number            | -                                     | -      |
| align       | 对齐方式                                                          | String            | right,center                          | left   |
| className   | 列的样式名称                                                      | String            | -                                     | -      |
| fixed       | 列是否固定在左侧或者右侧                                          | String            | left,right                            | -      |
| ellipsis    | 开启后，文本将不换行                                              | Boolean           | -                                     | false  |
| tooltip     | 开启后，文本将不换行,并用 Tooltip 组件显示完整内容                | Boolean           | -                                     | false  |
| render      | 自定义渲染列 ,第一个是 h，第二个为对象，包含 row、column 和 index | Function          | -                                     | -      |
| indexMethod | type 为 index 时可用，自定义序号 ,参数 row 为当前行内容           | Function          | -                                     | -      |
| sortable    | 对应列是否可以排序                                                | Boolean ,'custom' | -                                     | false  |
| sortMethod  | 自定义排序使用的方法,三个参数 a 、 b 和 type                      | Function          | -                                     | -      |
| sortType    | 设置初始化排序。值为 asc 和 desc                                  | String            | -                                     | -      |
