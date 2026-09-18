<template>
  <div class="theme-container">
    <div class="content">
      <h1>404</h1>
      <!--
        ⚠️ 这里原为 VuePress 1.x 的 router-link 标签。
        VitePress 用的是 Vue Router 4，没有名为 router-link 的全局组件：
        SSR 阶段它被渲染成一个空注释占位，客户端水合后才把它当未解析元素插回来，
        于是既触发 "Hydration completed but contains mismatches."，链接也点不动。
        改用原生 a 元素 + 站点 base（与 NavLink.vue 的 siteHref 思路一致）。
        ⚠️ 写本条注释时注意：HTML 注释内不能出现连续两个减号，否则注释会提前闭合，
        导致 Vue SFC 解析失败（构建直接中断）。
      -->
      <a :href="homeHref">返回首页</a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { site } = useData()
// base 形如 `/fei-ui-design/`；缺省兜到根
const homeHref = computed(() => site.value.base || '/')
</script>

<style src="../styles/theme.styl" lang="stylus"></style>
