<template>
  <f-carousel height="200px" direction="vertical" :autoplay="false">
    <f-carousel-item>
      <div class="demo-carousel-panel">1</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">2</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">3</div>
    </f-carousel-item>
    <f-carousel-item>
      <div class="demo-carousel-panel">4</div>
    </f-carousel-item>
  </f-carousel>
</template>

<script setup lang="ts"></script>

<style scoped>
.demo-carousel-panel {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #99a9bf;
}
</style>
