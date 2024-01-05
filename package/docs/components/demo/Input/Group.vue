<template>
  <div>
    <p>Props：</p>
    <div>
      <f-input prefix="bulb-fill" clearable placeholder="Enter name" style="width: auto"></f-input>
      &nbsp;
      <f-input suffix="search" clearable placeholder="Enter text" style="width: auto"></f-input>
    </div>
    <p>Slots：</p>
    <div style="margin-top: 6px">
      <f-input placeholder="Enter name" style="width: auto">
        <template #prefix>
          <f-icon name="bulb-fill"></f-icon>
        </template>
      </f-input>
      &nbsp;
      <f-input placeholder="Enter text" clearable style="width: auto">
        <template #suffix>
          <f-icon name="search"></f-icon>
        </template>
      </f-input>
    </div>
    <p>prepend/append：</p>
    <div style="margin-top: 6px">
      <f-input placeholder="Enter text" style="width: auto" clearable>
        <template #prepend>
          <f-button>prepend</f-button>
        </template>
      </f-input>
      &nbsp;
      <f-input placeholder="Enter name" style="width: auto" clearable>
        <template #append>
          <f-button>append</f-button>
        </template>
      </f-input>
      &nbsp;
      <f-input placeholder="Enter name" style="width: auto" clearable>
        <template #prepend>
          <f-select v-model="type" clearable style="width: 100px">
            <b-option lable="email" value="email"></b-option>
            <b-option lable="phone" value="phone"></b-option>
          </f-select>
        </template>
        <template #append>
          <f-button>append</f-button>
        </template>
      </f-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const type = ref('')
</script>

<style scoped>
.input-item {
  width: 300px;
  margin-right: 20px;
}
</style>
