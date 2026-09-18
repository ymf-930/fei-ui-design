<template>
  <div class="code">
    <div :class="{ copied: check }" class="noti-code">
      <i class="bx bx-check"></i>
      代码已复制
    </div>
    <header class="header-codex">
      <ul>
        <li title="在 CodePen 中打开" v-if="codepen" @click="openCodepen" class="con-link">
          <i class="bx bxl-codepen"></i>
        </li>

        <li title="在 CodeSandbox 中打开" v-if="codesandbox" @click="openCodesandbox">
          <svg
            t="1514359261842"
            class="icon"
            style=""
            viewBox="0 0 1024 1024"
            version="1.1"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9197"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="15px"
            height="15px"
          >
            <path
              d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"
              p-id="9198"
            ></path>
          </svg>
        </li>

        <li title="复制代码" :class="{ copied: check }" @click="copy">
          <i v-if="!check" class="bx bx-copy"></i>
          <i v-else class="bx bx-check"></i>
        </li>
        <li
          :title="active ? '收起代码' : '查看代码'"
          :class="{ active: active }"
          class="not-a con-link"
          @click="toggleCode"
        >
          <i v-if="!active" class="bx bx-code-alt"></i>

          <i v-else class="bx bx-hide"></i>
        </li>
      </ul>
    </header>
    <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
      <div ref="codexRef" v-show="active" class="con-code">
        <ul ref="ulRef" class="ul-codes">
          <li v-if="slots.template" :class="{ active: activeSlot === 0 }" @click="activeSlot = 0">
            模板
          </li>
          <li v-if="slots.script" :class="{ active: activeSlot === 1 }" @click="activeSlot = 1">
            脚本
          </li>
          <li v-if="slots.style" :class="{ active: activeSlot === 2 }" @click="activeSlot = 2">
            样式
          </li>
          <li
            v-if="Object.keys(slots).length > 0"
            :class="{ active: activeSlot === 3 }"
            @click="activeSlot = 3"
          >
            全部
          </li>
        </ul>
        <div class="con-codes">
          <transition
            v-on:before-enter="beforeEntercodes"
            v-on:enter="entercodes"
            v-on:leave="leavecodes"
          >
            <div ref="slot0Ref" key="0" v-if="activeSlot === 0" class="slot-template slots">
              <slot name="template" />

              <footer
                @click="toggleCode"
                :title="active ? '收起代码' : '查看代码'"
                class="footer-code"
              >
                <i class="bx bx-hide"></i>
              </footer>
            </div>
          </transition>
          <transition
            v-on:before-enter="beforeEntercodes"
            v-on:enter="entercodes"
            v-on:leave="leavecodes"
          >
            <div ref="slot1Ref" key="1" v-if="activeSlot === 1" class="slot-script slots">
              <slot name="script" />

              <footer
                @click="toggleCode"
                :title="active ? '收起代码' : '查看代码'"
                class="footer-code"
              >
                <i class="bx bx-hide"></i>
              </footer>
            </div>
          </transition>

          <transition
            v-on:before-enter="beforeEntercodes"
            v-on:enter="entercodes"
            v-on:leave="leavecodes"
          >
            <div ref="slot2Ref" key="2" v-if="activeSlot === 2" class="slot-style slots">
              <slot name="style" />

              <footer
                @click="toggleCode"
                :title="active ? '收起代码' : '查看代码'"
                class="footer-code"
              >
                <i class="bx bx-hide"></i>
              </footer>
            </div>
          </transition>

          <transition
            v-on:before-enter="beforeEntercodes"
            v-on:enter="entercodes"
            v-on:leave="leavecodes"
          >
            <div ref="slot3Ref" key="3" v-if="activeSlot === 3" class="slot-all slots">
              <slot name="template" />
              <slot name="script" />
              <slot name="style" />

              <footer
                @click="toggleCode"
                :title="active ? '收起代码' : '查看代码'"
                class="footer-code"
              >
                <i class="bx bx-hide"></i>
              </footer>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { computed, getCurrentInstance, nextTick, onMounted, ref, useSlots, watch } from 'vue'
import { useRoute, useRouter } from 'vitepress'
const router = useRouter()
const route = useRoute()
const slots = useSlots()
const active = ref(false)
const check = ref(false)
const activeSlot = ref(0)
const feiThemeVal = ref(null)
const ulRef = ref(null)
const codexRef = ref(null)
const slot0Ref = ref(null)
const slot1Ref = ref(null)
const slot2Ref = ref(null)
const slot3Ref = ref(null)

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
const { feiTheme } = getCurrentInstance().appContext.config.globalProperties
// ⚠️ 共享同一个 reactive 对象，**不要**写成 `{ ...feiTheme }`：
// 本文件用 watch 监听 openCode（配置面板「打开/关闭所有代码」），副本收不到写入
feiThemeVal.value = feiTheme
watch(
  () => feiThemeVal.value.openCode,
  val => {
    active.value = val
    localStorage.openCode = val
  },
)
watch(
  () => activeSlot.value,
  async val => {
    await nextTick()
    const slotRefs = [slot0Ref, slot1Ref, slot2Ref, slot3Ref]
    let h = slotRefs[val].value.scrollHeight
    let ul = ulRef.value.scrollHeight
    codexRef.value.style.height = h + ul - 1 + 'px'
  },
)
// Vue.observable(this.$site.themeConfig)
onMounted(() => {
  feiThemeVal.value.openCode = localStorage.openCode === 'true'
})

function toggleCode() {
  active.value = !active.value
  // router.replace(!active.value ? `${this.$route.hash.replace('-view', '')}-hide` : `${this.$route.hash.replace('-hide', '')}-view`)
}

function openCodepen(url) {
  window.open(props.codepen)
}

function openCodesandbox(url) {
  document.body.style.overflow = 'hidden'
  // this.$codesandbox.url = props.codesandbox
}

function clipboard(text) {
  var aux = document.createElement('textarea')
  aux.value = text
  aux.className = 'fei-clipboard'
  document.body.appendChild(aux)
  aux.focus()
  aux.select()
  document.execCommand('copy')
  document.body.removeChild(aux)
}

function copy() {
  const slotRefs = { 0: slot0Ref, 1: slot1Ref, 2: slot2Ref, 3: slot3Ref }
  let text = slotRefs[activeSlot.value].value.innerText

  // clipboard(text.replace('html', ''))
  clipboard(text)

  check.value = true
  setTimeout(() => {
    check.value = false
  }, 1000)
}

// animation
function beforeEnter(el) {
  el.style.height = 0
}

function enter(el, done) {
  let h = el.scrollHeight
  el.style.height = h - 1 + 'px'
  done()
}

function leave(el, done) {
  el.style.height = '0px'
}

function beforeEntercodes(el) {
  el.style.height = 0
  el.style.opacity = 0
  el.style.position = 'absolute'
}

function entercodes(el, done) {
  let h = el.scrollHeight
  el.style.height = h - 1 + 'px'
  el.style.opacity = 1
  el.style.position = 'relative'
  done()
}

function leavecodes(el, done) {
  el.style.height = '0px'
  el.style.opacity = 0
  el.style.position = 'absolute'
}
</script>
<style lang="stylus" scoped>
getVar(var)
  unquote("var(--fei-" + var + ")")

.noti-code
  position fixed
  bottom 0px
  width 100%
  max-width 500px
  background getVar(theme-color)
  left 50%
  transform translate(-50%, 100%)
  padding 10px 20px
  text-align center
  color getVar(theme-layout)
  border-radius 20px 20px 0px 0px
  opacity 0
  visibility hidden
  transition all .25s ease
  z-index 1000

  i
    position absolute
    left 0px
    top 0px
    font-size 20px
    width 45px
    height 45px
    background rgba(0, 0, 0, .1)
    border-radius 20px 0px 0px 0px
    display flex
    align-items center
    justify-content center

  &.copied
    opacity 1
    visibility visible
    transform translate(-50%, 0%)

.footer-code
  display flex
  align-items center
  justify-content center
  padding 6px
  color #fff
  cursor pointer
  transition all .25s ease

  &:hover
    opacity .4

// 面板内的代码块由 doc-typography.styl 贴平（`.vp-doc .con-code …`）。
// 历史上这里写过 `.slot-all > div:last-child div[class*="language-"] { border-radius: … }`
// 与 `.slots div pre { width: 100% }`，但插槽内容不带本组件的 scope id，两条都不生效，已删。
.con-codes
  position relative
  width 100%

.slots
  transition all .25s ease
  width 100%
  overflow hidden
  top 0px
  left 0px

.ul-codes
  position relative
  display flex
  align-items center
  justify-content center
  padding 0px var(--fd-sp-5)
  margin 0px

  li
    list-style none
    padding var(--fd-sp-3) var(--fd-sp-3)
    font-size var(--fd-fs-xs)
    opacity .4
    transition all .25s ease
    cursor pointer
    position relative
    color #fff
    user-select none

    &:after
      content ''
      position absolute
      bottom 0px
      left 50%
      transform translate(-50%)
      height 2px
      width 0%
      background #fff
      transition all .25s ease

    &:hover
      opacity 1

    &.active
      opacity 1

      &:after
        width 100%

/*
 * ⚠️ 本组件的 `<style scoped>` **管不到插槽内容**。
 * 模板里 `<slot name="template|script|style">` 的 DOM 由使用方（Markdown 页面）
 * 编译，带的是使用方的 scope id，因此 `.con-code div[class*="language-"]`、
 * `.slots div`、`.slots div pre` 这类写到插槽元素上的规则**永远不匹配**（历史遗留死代码，已删）。
 * 深色代码面板内部（贴平、去圆角、内边距、字号行高）统一由
 * styles/doc-typography.styl 的 `.vp-doc .con-code …` 负责。
 */
.code
  background getVar(theme-layout)
  z-index 300
  position relative
  transition all .25s ease

.input-transparent
  position absolute
  z-index 0
  opacity 0
  bottom 0px
  right 0px

// 深色代码面板：通栏贴齐内容边，四角由 .card 的 overflow 裁剪
.con-code
  display: block
  transition: all .25s ease
  background getVar(theme-code2)
  border-radius 0
  width 100%
  margin 0px

.header-codex
  width 100%
  display flex
  align-items center
  justify-content center

  ul
    display flex
    align-items center
    margin 0px
    padding 0px
    justify-content center
    width 100%
    padding-left 4px
    padding-right 4px
    align-items: stretch
    // 工具条上下留白：代码面板展开时它同时充当「工具条 ↔ 深色面板」的分隔
    padding-top var(--fd-sp-3)
    padding-bottom var(--fd-sp-3)

    li
      list-style none
      color getVar(theme-color)
      opacity .6
      padding 3px 10px
      transition all .25s ease
      display flex
      align-items center
      cursor pointer
      border-radius 12px
      background transparent
      outline none !important
      &.copied
        transform scale(1.3)
        opacity 1 !important
        i
          color rgb(70, 201, 58) !important
      &:nth-last-child(3)
        position relative
        padding-right 15px
        margin-right 5px
        &:after
          content ''
          position absolute
          right 0px
          height 60%
          top 20%
          width 1px
          background getVar(theme-layout)
          display block
      &.active
        color $accentColor !important
        opacity 1
        border-radius 12px 12px 0px 0px
        background getVar(theme-code2)
        i
          color #fff !important
      svg, i
        max-width 18px
        fill getVar(theme-color) !important
      &:hover
        opacity 1
      &:not(.not-a)
        svg
          transition all .25s ease
          fill alpha(#fff, .6)
          pointer-events none

@media (max-width: 500px)
  .code
    .con-code
      width: 100%
      margin 0px
</style>
