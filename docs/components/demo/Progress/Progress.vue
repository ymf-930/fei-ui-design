<template>
  <div style="width: 350px">
    <f-progress :stroke-width="20" :percent="percent" active color="#ff86d8"></f-progress>

    <div class="mt-16">
      <f-button-group>
        <f-button icon="minus" size="mini" @click="minus"></f-button>
        <f-button icon="plus" size="mini" @click="add"></f-button>
      </f-button-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const percent = ref(10)

function add() {
  percent.value += 10
  if (percent.value >= 100) percent.value = 100
}

function minus() {
  percent.value -= 10
  if (percent.value < 0) percent.value = 0
}
</script>
