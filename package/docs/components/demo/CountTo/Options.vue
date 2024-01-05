<template>
  <div>
    <f-button type="primary" @click="restart">restart</f-button>
    <div class="mt-15" flex="cross:center">
      <div style="font-size: 18px; color: #1089ff; width: 120px; margin-right: 16px">
        <f-count-to
          ref="countTo1"
          :start-val="startVal"
          :end-val="endVal"
          :duration="3000"
        ></f-count-to>
      </div>
      <div style="font-size: 18px; color: #1089ff; width: 120px; margin-right: 16px">
        <f-count-to
          ref="countTo2"
          :start-val="startVal"
          :end-val="endVal"
          :duration="3000"
          :decimals="2"
        ></f-count-to>
      </div>
      <div style="font-size: 18px; color: #1089ff; width: 120px; margin-right: 16px">
        <f-count-to
          ref="countTo3"
          :start-val="startVal"
          :end-val="endVal"
          :duration="3000"
          separator=""
        ></f-count-to>
      </div>
      <div style="font-size: 18px; color: #1089ff; width: 120px; margin-right: 16px">
        <f-count-to
          ref="countTo4"
          :start-val="startVal"
          :end-val="endVal"
          :duration="3000"
          prefix="$"
          suffix="美金"
        ></f-count-to>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const startVal = ref(0)
const endVal = ref(2023)
const countTo1 = ref(null)
const countTo2 = ref(null)
const countTo3 = ref(null)
const countTo4 = ref(null)

function restart() {
  countTo1.value?.restart()
  countTo2.value?.restart()
  countTo3.value?.restart()
  countTo4.value?.restart()
}
</script>
