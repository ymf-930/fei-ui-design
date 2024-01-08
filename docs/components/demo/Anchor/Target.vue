<template>
  <div>
    <f-button size="small" @click="scrollTo7">滚动到第七行</f-button>
    <div style="overflow: hidden; border: 1px solid #eee" flex>
      <div style="padding: 20px; width: 30%; background-color: #fff; border-right: 1px solid #eee">
        <f-anchor ref="anchorScrollRef" target="#scrollWrap" show-ink>
          <f-anchor-link href="#id1" title="标题1"></f-anchor-link>
          <f-anchor-link href="#id2" title="标题2"></f-anchor-link>
          <f-anchor-link href="#id3" title="标题3"></f-anchor-link>
          <f-anchor-link href="#id4" title="标题4"></f-anchor-link>
          <f-anchor-link href="#id5" title="标题5"></f-anchor-link>
          <f-anchor-link href="#id6" title="标题6"></f-anchor-link>
          <f-anchor-link href="#id7" title="标题7"></f-anchor-link>
          <f-anchor-link href="#id10" title="标题10"></f-anchor-link>
        </f-anchor>
      </div>
      <div
        id="scrollWrap"
        style="
          position: relative;
          padding: 20px;
          width: 70%;
          height: 400px;
          overflow: auto;
          background-color: #fff;
        "
      >
        <div v-for="i in 10" :key="i">
          <h4 :id="`id${i}`" style="font-weight: 500; padding: 5px; border-bottom: 1px solid #eee">
            标题{{ i }}
          </h4>
          <p v-for="k in 10" :key="k">{{ `我是第${k}行内容...` }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const anchorScrollRef = ref(null)

function scrollTo7() {
  console.log('滚动到第七行 ')
  anchorScrollRef.value?.chooseLink('#id7')
}
</script>
