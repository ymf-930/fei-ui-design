<template>
  <div class="center example-nav">
    <vs-navbar center-collapsed v-model="active">
      <template #left>
        <img src="/home/logo2.png" alt="">
      </template>
      <vs-navbar-item :active="active == 'guide'" id="guide">
        Guide
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'docs'" id="docs">
        Documents
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'components'" id="components">
        Components
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'license'" id="license">
        license
      </vs-navbar-item>
      <template #right>
        <vs-button flat >Login</vs-button>
        <vs-button>快速开始</vs-button>
      </template>
    </vs-navbar>
    <div class="square">
      <div class="child">
        child 1
      </div>
      <div class="child">
        child 2
      </div>
      <div class="child">
        child 3
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data:() => ({
    active: 'guide'
  })
}
</script>
<style lang="stylus">
  .square
    height 400px
    position relative
    overflow auto
    width 100%
    .child
      height 400px
      display flex
      align-items center
      justify-content center
      width 100%
  .example-nav
    background rgb(240,240,240) !important
    padding 0px !important
    position relative
    img
      max-height 25px
</style>
