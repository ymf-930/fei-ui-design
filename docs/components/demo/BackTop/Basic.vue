<template>
  <div style="position: relative; border: 1px solid #eee">
    <div class="scroll-box" style="padding: 20px; height: 500px; overflow: auto">
      <div v-for="item in 80" :key="item" ref="item">{{ item }}:这是用来撑开内容的行...</div>
    </div>
    <f-back-top target=".scroll-box" :visible-height="200">
      <f-button type="success">返回顶端</f-button>
    </f-back-top>
  </div>
</template>
