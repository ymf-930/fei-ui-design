<template>
  <div>
    <f-switch>
      <template #open><span>开</span></template>
      <template #close><span>关</span></template>
    </f-switch>
    &nbsp;
    <f-switch>
      <template #open>
        <f-icon name="check"></f-icon>
      </template>
      <template #close>
        <f-icon name="close"></f-icon>
      </template>
    </f-switch>
    <br />
    <br />
    <f-switch size="large">
      <template #open><span>开启</span></template>
      <template #close><span>关闭</span></template>
    </f-switch>
    &nbsp;
    <f-switch size="large">
      <template #open><span>ON</span></template>
      <template #close><span>OFF</span></template>
    </f-switch>
  </div>
</template>

<script setup lang="ts"></script>
