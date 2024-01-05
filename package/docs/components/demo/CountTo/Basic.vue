<template>
  <div>
    <f-button type="primary" @click="restart">restart</f-button>
    <div class="mt-15" flex="cross:center">
      <f-tag type="primary" dot font-size="14px">
        <f-count-to ref="countToRef" :start-val="startVal" :end-val="endVal"></f-count-to>
      </f-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const startVal = ref(0)
const endVal = ref(2023)
const countToRef = ref(null)

function restart() {
  countToRef.value?.restart()
}
</script>
