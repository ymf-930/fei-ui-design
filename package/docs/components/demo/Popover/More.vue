<template>
  <div>
    <f-popover placement="top" width="200px">
      <f-button>长文本</f-button>
      <template #content>
        <div>这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述</div>
      </template>
    </f-popover>
    <f-popover placement="right" width="300px">
      <f-button>更多内容</f-button>
      <template #content>
        <div>这是自定义内容~这是自定义内容~这是自定义内容~这是自定义内容~</div>
        <div>这是自定义内容~这是自定义内容~这是自定义内容~这是自定义内容~</div>
      </template>
    </f-popover>
  </div>
</template>
