<template>
  <div style="height: 500px; overflow: auto; border: 1px solid #eee">
    <f-scrollbar style="height: 100%" wrap-class="scrollbar-box">
      <div style="padding: 20px">
        <div v-for="item in 80" :key="item" ref="item">{{ item }}:这是用来撑开内容的行...</div>
      </div>
      <f-back-top target=".scrollbar-box" :visible-height="200">
        <f-button type="info" size="large" icon="up"></f-button>
      </f-back-top>
    </f-scrollbar>
  </div>
</template>
