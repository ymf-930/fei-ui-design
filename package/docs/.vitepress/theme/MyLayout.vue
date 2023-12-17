<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'
import Home from "./components/Home.vue"

const {Layout} = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      layout-top
    </template>
    <template #home-hero-before>
      <Home/>
    </template>
    <template #home-hero-info>
      home-hero-info
    </template>
    <template #home-hero-image>
      home-hero-image
    </template>
    <template #home-hero-after>
      home-hero-after
    </template>
    <template #home-features-before>
      home-features-before
    </template>
    <template #home-features>
      home-features
    </template>
    <template #home-features-afterr>
      home-features-after
    </template>
    <template #layout-bottom>
      layout-bottom
    </template>
    <template #aside-outline-before>
      My custom sidebar top content
    </template>
  </Layout>
</template>