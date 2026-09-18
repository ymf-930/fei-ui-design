<template>
  <div class="card">
    <div class="text">
      <slot></slot>
    </div>
    <div v-if="slots.example" class="example" :class="{ mobile: vsThemeVal.mobileActive }">
      <div class="center">
        <slot name="example" />
      </div>
    </div>

    <div v-if="slots.template || slots.script || slots.style" class="slotcode">
      <codex :codesandbox="codesandbox" :codepen="codepen">
        <template #template v-if="slots.template">
          <slot name="template" />
        </template>
        <template #script v-if="slots.script">
          <slot name="script" />
        </template>
        <template #style v-if="slots.style">
          <slot name="style" />
        </template>
      </codex>
    </div>
  </div>
</template>
<script setup>
import { useSlots, ref, getCurrentInstance } from 'vue'
import codex from './codex.vue'
const slots = useSlots()

const props = defineProps({
  codepen: {
    type: Boolean,
    default: false,
  },
  codesandbox: {
    type: String,
    default: '',
  },
})

const vsThemeVal = ref(null)
const { vsTheme } = getCurrentInstance().appContext.config.globalProperties
// ⚠️ 共享同一个 reactive 对象，**不要**写成 `{ ...vsTheme }`（副本不接收外部写入）
vsThemeVal.value = vsTheme
</script>
<style lang="stylus">
// 卡片：组件文档的最小信息单元（小节标题 + 说明 + 示例 + 代码）
//
// 视觉规则（与 styles/doc-typography.styl 配套）
//   1. 卡片内容**不额外左右内缩** —— 与外层导语段落共用同一条内容边，
//      这是「标题 / 正文 / 列表 / 示例面板 / 代码面板左边缘对齐」的落点
//   2. 小节间距由卡片自身的 margin 提供，**不再**用「h2 padding-top: 100px +
//      卡片 margin-bottom: -50px」这种互相抵消的魔法数字；
//      标题也不再在 hover 时改 padding（会左右跳动）
//   3. 所有数值取自 doc-typography.styl 的 --fd-* token，本文件不写裸数字
//   4. **圆角与裁剪下沉到「需要裁的那两块面板」，卡片容器自己不再 overflow**
//      —— 旧写法 `.card { border-radius: 20px; overflow: hidden }` 会把卡片正文
//      首行第一个字裁掉：`.text` 里的段落没有左右内边距（刻意的，见下条注释），
//      于是首行正好压在左上 20px 圆角的裁切弧里，字形缺一角（用户报的「文字显示不全」）。
//      注意「只留底部圆角」也救不了：正文正好是卡片最后一个元素时，
//      末行的字同样会落进左下圆弧里。所以裁剪必须离开 `.text`。
getVar(var)
    unquote("var(--vs-"+var+")")

.card
  margin var(--fd-sp-7) 0
  width 100%

  &:first-child
    margin-top var(--fd-sp-6)

  &:last-of-type
    margin-bottom 0px

  // 示例面板：**只有它是卡片最后一个元素时**才需要底部圆角
  // （下面还接着代码面板时，四角都是内部边界，保持直角）。
  // 排除 `.mobile`：那是手机预览框，四角 25px 圆角是它自己的画框，不能被这里覆盖。
  > .example:last-child:not(.mobile)
    border-radius 0 0 var(--vs-radius, 20px) var(--vs-radius, 20px)

  // 代码面板容器：永远是卡片最后一个元素，负责卡片底部的两个圆角
  > .slotcode
    border-radius 0 0 var(--vs-radius, 20px) var(--vs-radius, 20px)
    overflow hidden

  .text
    // 导语图片（直属于 .text 的图）
    >img
      width 100%
      max-width 600px
      margin auto
      margin-top var(--fd-sp-3)
      display block
      border-radius var(--vs-radius, 20px)

    // 标题只做「块首不额外留白」，其余层级间距沿用 doc-typography.styl
    h2, h3, h4, h5, h6
      z-index 200
      position relative

    p
      z-index 200
      position relative

  .example
    position relative
    width 100%
    height auto
    margin auto
    margin-top var(--fd-sp-4)
    padding var(--fd-sp-5) var(--fd-sp-5)
    // 圆角交给 .card 的 overflow 裁剪，这里保持直角，避免两套圆角打架
    border-radius 0
    background getVar(theme-layout)
    overflow hidden
    transition all .25s ease

    .center
      justify-content flex-start
      >div
        width 100%

    // 手机预览框：仅在 .mobile 时显形
    &:after
      transition all .25s ease
      width 100%
      height 100%
      content ''
      position absolute
      border 8px solid getVar(theme-bg2)
      box-sizing border-box
      top 0px
      left 0px
      border-radius 25px
      pointer-events none
      opacity 0
      visibility hidden

    &:before
      opacity 0
      visibility hidden
      pointer-events none
      width 60px
      height 25px
      content ''
      position absolute
      background getVar(theme-bg2)
      box-sizing border-box
      top 0px
      left 50%
      transform translate(-50%)
      border-radius 0px 0px 8px 8px
      transition all .25s ease

    &.mobile
      width 260px
      height 520px
      margin auto
      margin-top var(--fd-sp-5)
      margin-bottom var(--fd-sp-5)
      border-radius 25px
      padding 30px 20px
      overflow auto

      &:after
        opacity 1
        visibility visible

      &:before
        opacity 1
        visibility visible

      ~ .slotcode
          .code
            border-radius 20px
            background transparent

@media (max-width: 560px)
  .card
    .example
      padding var(--fd-sp-4) var(--fd-sp-4)
</style>
