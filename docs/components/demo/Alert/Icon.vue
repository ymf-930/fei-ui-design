<template>
  <div>
    <f-alert show-icon>info alert</f-alert>
    <f-alert type="success" show-icon>success alert</f-alert>
    <f-alert type="warning" show-icon>warning alert</f-alert>
    <f-alert type="error" show-icon>
      error alert
      <template #desc>Custom error description copywriting.</template>
    </f-alert>
    <f-alert show-icon>
      自定义icon
      <template #icon>
        <f-icon name="smile"></f-icon>
      </template>
      <template #desc>自定义icon描述</template>
    </f-alert>
  </div>
</template>
