<template>
  <div>
    <f-popover trigger="hover" title="Title" content="这是一段内容这是一段内容这是一段内容">
      <f-button>Hover</f-button>
    </f-popover>
    <f-popover
      trigger="click"
      title="Title"
      content="这是一段内容这是一段内容这是一段内容"
      :z-index="1000"
    >
      <f-button>Click</f-button>
    </f-popover>
    <f-popover trigger="focus" title="Title" content="这是一段内容这是一段内容这是一段内容">
      <f-button>Focus</f-button>
    </f-popover>
  </div>
</template>
