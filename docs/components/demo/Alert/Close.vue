<template>
  <div>
    <f-alert closable>An info prompt</f-alert>
    <f-alert type="success" show-icon closable>
      A success prompt
      <template #desc>
        Content of prompt. Content of prompt. Content of prompt. Content of prompt.
      </template>
    </f-alert>
    <f-alert type="warning" closable>
      Custom closing content
      <template #close>No longer prompt</template>
    </f-alert>
  </div>
</template>
