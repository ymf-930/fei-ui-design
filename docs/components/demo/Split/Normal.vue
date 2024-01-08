<template>
  <div style="width: 100%; height: 300px; border: 1px solid #ddd">
    <f-split :default-wrap-style="['20%', '80%']">
      <template #left>
        <div class="left-container">左侧容器</div>
      </template>
      <template #right>
        <f-split split="horizontal" :default="100" :default-wrap-style="['50%', '50%']">
          <template #left>
            <div class="left-container">上边容器</div>
          </template>
          <template #right>
            <div class="right-container">下面容器</div>
          </template>
        </f-split>
      </template>
    </f-split>
  </div>
</template>
