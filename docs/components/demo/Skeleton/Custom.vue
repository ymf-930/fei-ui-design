<template>
  <f-skeleton style="width: 240px" animation>
    <template #template>
      <f-skeleton-item variant="image" style="width: 240px; height: 240px" />
      <div style="padding: 14px">
        <f-skeleton-item variant="p" style="width: 50%" />
        <div flex="main:justify cross:center">
          <f-skeleton-item variant="text" style="margin-right: 16px" />
          <f-skeleton-item variant="text" style="width: 30%" />
        </div>
      </div>
    </template>
  </f-skeleton>
</template>
