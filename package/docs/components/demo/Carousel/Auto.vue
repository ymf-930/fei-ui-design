<template>
  <f-carousel autoplay :interval="2000" :initial-index="value" loop>
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

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(1)
</script>

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
