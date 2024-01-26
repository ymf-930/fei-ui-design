<template>
  <div>
    <f-space :size="size" spacer="|">
      <div v-for="i in 3" :key="i">
        <f-button>button {{ i }}</f-button>
      </div>
    </f-space>
    <br />
    <br />
    <f-space :size="size" :spacer="spacer">
      <div v-for="i in 3" :key="i">
        <f-button>button {{ i }}</f-button>
      </div>
    </f-space>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

const size = ref(10)
const spacer = h('span', { style: { color: '#999' } }, '>-<')
</script>
