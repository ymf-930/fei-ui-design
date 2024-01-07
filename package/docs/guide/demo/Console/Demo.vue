<template>
  <div class="demo-button">
    <f-button @click="Log.print('default print', '#df85ff')">custom</f-button>
    <f-button @click="Log.print('default print')">default</f-button>
    <f-button type="primary" @click="Log.print('primary print', 'primary')">primary</f-button>
    <f-button type="success" @click="Log.print('success print', 'success')">success</f-button>
    <f-button type="warning" @click="Log.print('warning print', 'warning')">warning</f-button>
    <f-button type="danger" @click="Log.print('danger print', 'danger')">danger</f-button>
  </div>
  <div class="demo-button">
    <f-button type="primary" @click="Log.print('primary print', 'primary', true)">
      primary-back
    </f-button>
    <f-button type="success" @click="Log.print('success print', 'success', true)">
      success-back
    </f-button>
    <f-button type="warning" @click="Log.print('warning print', 'warning', true)">
      warning-back
    </f-button>
    <f-button type="danger" @click="Log.print('danger print', 'danger', true)">
      danger-back
    </f-button>
  </div>
  <div class="demo-button">
    <f-button @click="Log.print({ name: 'fei-ui-design', author: 'ymf' })">object - log</f-button>
    <f-button @click="Log.pretty('title', 'pretty print', 'primary')">pretty - primary</f-button>
    <f-button @click="Log.pretty('title', 'pretty print', 'success')">pretty - success</f-button>
    <f-button @click="Log.pretty('title', 'pretty print', 'warning')">pretty - warning</f-button>
    <f-button @click="Log.pretty('title', 'pretty print', 'danger')">pretty - danger</f-button>
  </div>
  <div class="demo-button">
    <f-button
      @click="
        Log.printVersion('fei-ui-design', '1.0.0', 'https://ymf930.gitee.io/fei-ui-design/')
      "
    >
      打印版本号连接
    </f-button>
  </div>
</template>

<script setup lang="ts">
import { Utils } from 'fei-ui-design'

const Log = Utils.log
</script>

<style>
.demo-button {
  margin-bottom: 10px;
}
</style>
