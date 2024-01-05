<template>
  <f-config-provider abstract :theme="config">
    <f-button type="primary" @click="setGlobal">
      点击应用（应用后主颜色会变更，会影响全局）
    </f-button>
  </f-config-provider>
</template>

<script setup>
import { ref } from 'vue'

const config = ref({})

function setGlobal() {
  config.value = { binColorPrimary: '#00c181' }
}
</script>
