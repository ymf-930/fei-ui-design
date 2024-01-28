<template>
  <div class="demo-button" flex="cross:center">
    <f-button-group>
      <f-button type="primary" icon="left">上一页</f-button>
      <f-button type="primary">
        下一页
        <i class="f-iconfont f-icon-right"></i>
      </f-button>
    </f-button-group>
    <f-button-group>
      <f-button>上一页</f-button>
      <f-button>下一页</f-button>
    </f-button-group>
    <f-button-group>
      <f-button type="success" icon="star"></f-button>
      <f-button type="info" icon="heatmap"></f-button>
      <f-button type="danger" icon="edit"></f-button>
    </f-button-group>
    <f-button-group vertical>
      <f-button type="primary">Primary</f-button>
      <f-button type="success">Success</f-button>
      <f-button type="danger">Danger</f-button>
    </f-button-group>
  </div>
</template>
<script setup lang="ts">
</script>
