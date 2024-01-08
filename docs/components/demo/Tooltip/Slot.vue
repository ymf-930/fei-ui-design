<template>
  <f-tooltip placement="top">
    <f-button>多行</f-button>
    <template #content>
      <div>这是多行文字</div>
      <div>这是多行文字</div>
    </template>
  </f-tooltip>
  <f-tooltip
    placement="top"
    content="我是一段长文本，我是一段长文本，我是一段长文本，我是一段长文本，我是一段长文本，我是一段长文本"
  >
    <f-button>长文本</f-button>
  </f-tooltip>
</template>
