<template>
  <div>
    <f-button @click="start">Start</f-button>
    <f-button @click="update(50)">Update 50</f-button>
    <f-button @click="done">Done</f-button>
    <f-button @click="error">Error</f-button>
    <f-button @click="config">Config</f-button>
    <f-button @click="reset">Reset Config</f-button>
  </div>
</template>

<script setup lang="ts">
import { LoadingBar } from 'f-ui-design'

function start() {
  LoadingBar.start()
}

function update(val: number) {
  LoadingBar.update(val)
}

function done() {
  LoadingBar.done()
}

function error() {
  LoadingBar.error()
}

function config() {
  LoadingBar.config({
    color: '#5cb85c',
    failedColor: '#f0ad4e',
    height: 5,
    icon: 'loading'
  })
}

function reset() {
  LoadingBar.resetConfig()
}
</script>
