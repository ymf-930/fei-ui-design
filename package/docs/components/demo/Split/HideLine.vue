<template>
  <div style="width: 100%; height: 300px; border: 1px solid #ddd">
    <f-split :default="240" hide-line>
      <template #left>
        <div class="left-container">左侧容器</div>
      </template>
      <template #right>
        <div class="right-container">下面容器</div>
      </template>
    </f-split>
  </div>
</template>
