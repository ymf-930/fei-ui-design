<template>
  <f-space>
    <div style="width: 240px; margin-bottom: 20px; padding: 8px; border: 1px solid #ccc">
      <f-space>
        string
        <f-button>button</f-button>
        <f-card>
          <template #header>header</template>
          body
        </f-card>
      </f-space>
    </div>
    <div style="width: 240px; margin-bottom: 20px; padding: 8px; border: 1px solid #ccc">
      <f-space alignment="flex-start">
        string
        <f-button>button</f-button>
        <f-card>
          <template #header>header</template>
          body
        </f-card>
      </f-space>
    </div>
    <div style="width: 240px; margin-bottom: 20px; padding: 8px; border: 1px solid #ccc">
      <f-space alignment="flex-end">
        string
        <f-button>button</f-button>
        <f-card>
          <template #header>header</template>
          body
        </f-card>
      </f-space>
    </div>
  </f-space>
</template>
