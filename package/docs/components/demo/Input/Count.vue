<template>
  <div flex="box:mean">
    <div class="input-item">
      <f-input :maxlength="10" show-word-count></f-input>
    </div>
    <div class="input-item">
      <f-input type="textarea" :rows="2" no-resize show-word-count></f-input>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.input-item {
  width: 300px;
  margin-right: 20px;
}
</style>
