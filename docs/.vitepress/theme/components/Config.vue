<template>
  <div class="config">
    <!-- 齿轮入口（含展开的 options 菜单）只在有侧边栏的文档页出现。
         首页没有侧边栏、也没有代码块，菜单里「收起/展开侧边栏」「展开侧边栏子栏目」
         「打开/关闭所有代码」三项全是空操作，留着只会迷惑人。
         明暗开关是**另一个按钮**（.switch-dark），首页保留。 -->
    <button
      v-if="!isHome"
      class="config-btn"
    >
      <i class="bx bx-cog"></i>
      <svg
        class="effect1config"
        xmlns="http://www.w3.org/2000/svg"
        width="160"
        height="160"
        viewBox="0 0 160 160"
      >
        <path
          id="Trazado_200"
          data-name="Trazado 200"
          d="M0-10,150,0l10,150S137.643,80.734,100.143,43.234,0-10,0-10Z"
          transform="translate(0 10)"
        />
      </svg>

      <ul class="options">
        <svg
          class="effect1config"
          xmlns="http://www.w3.org/2000/svg"
          width="160"
          height="160"
          viewBox="0 0 160 160"
        >
          <path
            id="Trazado_200"
            data-name="Trazado 200"
            d="M0-10,150,0l10,150S137.643,80.734,100.143,43.234,0-10,0-10Z"
            transform="translate(0 10)"
          />
        </svg>
        <li @click="reloadConfig">
          <!-- <box-icon name='rotate-left'></box-icon> -->
          <i title="重新加载配置" class="bx bx-rotate-left"></i>
        </li>
        <li @click="ChangeSidebar">
          <i v-if="sideBarOpen" title="收起侧边栏" class="bx bx-left-indent"></i>
          <i v-else title="展开侧边栏" class="bx bx-right-indent"></i>
        </li>
        <li
          :title="`${!vsThemeVal.sidebarCollapseOpen ? '打开' : '关闭'}侧边栏子栏目`"
          @click="ChangeMenu"
          :class="{ active: !vsThemeVal.sidebarCollapseOpen }"
        >
          <i v-if="vsThemeVal.sidebarCollapseOpen" class="bx bx-list-minus"></i>
          <i v-else class="bx bx-list-plus"></i>
        </li>
        <!-- <li title="View examples mobile style" @click="ChangeMobile" :class="{'active': vsThemeVal.mobileActive}">
          <i class="bx bx-mobile-alt"></i>
        </li> -->
        <li
          :title="`${!vsThemeVal.openCode ? '打开' : '关闭'}所有代码`"
          @click="ChangeOpenCode"
          :class="{ active: vsThemeVal.openCode }"
        >
          <i class="bx bx-code-block"></i>
        </li>
        <li class="theme-color-layout" title="主题色彩布局">
          <i class="bx bx-paint-roll"></i>
          <input @change="changeColorLayout($event.target.value)" type="color" value="#2564ff" />
        </li>
        <li
          :title="`${!vsThemeVal.themeDarken ? '黑色' : '白色'}主题`"
          class="li-darken"
          @click="ChangeTheme"
          :class="{ active: vsThemeVal.themeDarken }"
        >
          <i v-if="!vsThemeVal.themeDarken" class="bx bx-brightness-half"></i>
          <i v-else class="bx bx-brightness"></i>
        </li>
        <!-- <li class="theme-color-primary" title="Theme Primary Color">
          <i class="bx bxs-color-fill"></i>
          <input @change="ChangeColor" type="color" value="#2564ff">
        </li> -->

        <svg
          class="effect1config invert"
          xmlns="http://www.w3.org/2000/svg"
          width="160"
          height="160"
          viewBox="0 0 160 160"
        >
          <path
            id="Trazado_200"
            data-name="Trazado 200"
            d="M0-10,150,0l10,150S137.643,80.734,100.143,43.234,0-10,0-10Z"
            transform="translate(0 10)"
          />
        </svg>
      </ul>
    </button>

    <button
      @click="ChangeTheme"
      :class="{ active: vsThemeVal.themeDarken }"
      :title="`切换到${!vsThemeVal.themeDarken ? '暗色' : '浅色'}主题`"
      class="li-darken switch-dark"
    >
      <div class="switch-con">
        <span class="circle">
          <i v-if="vsThemeVal.themeDarken" class="bx bxs-sun"></i>
          <i v-else class="bx bxs-moon"></i>
        </span>
      </div>
    </button>
  </div>
</template>
<script setup>
import { onMounted, ref, computed, getCurrentInstance, nextTick } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
// 首页（docs/index.md 的 `home: true`）。只认真正的主页，不含 docsHome 类页面。
const isHome = computed(() => !!frontmatter.value.home)

const vsThemeVal = ref(null)

const sideBarOpen = ref(true)

function reloadConfig() {
  const sidebar = document.querySelector('.theme-container > .sidebar')
  const navbar = document.querySelector('.theme-container > .navbar')
  const config = document.querySelector('.theme-container > .config')
  const effect1 = document.querySelector('.header-page > .effect1')

  sidebar.style.removeProperty(`--vs-theme-layout`)
  navbar.style.removeProperty(`--vs-theme-layout`)
  navbar.style.removeProperty(`--vs-theme-bg2`)
  config.style.removeProperty(`--vs-theme-layout`)
  sidebar.style.removeProperty(`--vs-theme-color`)
  navbar.style.removeProperty(`--vs-theme-color`)
  config.style.removeProperty(`--vs-theme-color`)
  document.body.classList.remove('hidden-sidebar')
  document.body.style.setProperty(`--vs-primary`, '26, 92, 255')
  vsThemeVal.value.mobileActive = false
  localStorage.mobile = false

  vsThemeVal.value.sidebarCollapseOpen = true
  localStorage.sidebarCollapseOpen = true

  vsThemeVal.value.openCode = false

  // 主题重置交给 setTheme()：它内部已负责 vs-theme 属性、.darken、themeDarken
  // 与 localStorage，不需要在这里再重复一遍。
  //
  // 注：此处原本还有一行 `localStorage.theme = 'dark'` —— 该 key 全站没有任何
  // 读取点（真正被读的是 localStorage.vsTheme），所以「重置为暗色」的意图
  // 实际从未生效。是否要真的重置成暗色属于产品语义，未擅自改动，先记录在此。
  setTheme()
}

function ChangeSidebar() {
  sideBarOpen.value = !sideBarOpen.value
  if (document.body.classList.contains('hidden-sidebar')) {
    document.body.classList.remove('hidden-sidebar')
  } else {
    document.body.classList.add('hidden-sidebar')
  }
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function contrastColor(element) {
  let c = element
  if (/[#]/g.test(element)) {
    let rgb = hexToRgb(element)
    c = `rgb(${rgb.r},${rgb.g},${rgb.b})`
  }
  var rgb = c
    .replace(/^(rgb|rgba)\(/, '')
    .replace(/\)$/, '')
    .replace(/\s/g, '')
    .split(',')
  var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  if (yiq >= 128) {
    return true
  } else {
    return false
  }
}

function changeColorLayout(colorBase) {
  document.body.classList.add('all-transition')

  const sidebar = document.querySelector('.theme-container > .sidebar')
  const navbar = document.querySelector('.theme-container > .navbar')
  const config = document.querySelector('.theme-container > .config')
  const effect1 = document.querySelector('.header-page > .effect1')

  sidebar.style.setProperty(`--vs-theme-layout`, colorBase)
  navbar.style.setProperty(`--vs-theme-layout`, colorBase)
  navbar.style.setProperty(`--vs-theme-bg2`, colorBase)
  config.style.setProperty(`--vs-theme-layout`, colorBase)

  if (contrastColor(colorBase)) {
    sidebar.style.setProperty(`--vs-theme-color`, '#2c3e50')
    navbar.style.setProperty(`--vs-theme-color`, '#2c3e50')
    config.style.setProperty(`--vs-theme-color`, '#2c3e50')
  } else {
    sidebar.style.setProperty(`--vs-theme-color`, '#fff')
    navbar.style.setProperty(`--vs-theme-color`, '#fff')
    config.style.setProperty(`--vs-theme-color`, '#fff')
  }

  setTimeout(() => {
    document.body.classList.remove('all-transition')
  }, 100)
}

function ChangeColor(evt) {
  evt.target.closest('button').focus()
  const rgb = hexToRgb(evt.target.value)
  const color = `${rgb.r},${rgb.g},${rgb.b}`
  document.body.style.setProperty(`--vs-primary`, color)
}

function ChangeMenu() {
  vsThemeVal.value.sidebarCollapseOpen = !vsThemeVal.value.sidebarCollapseOpen
  localStorage.sidebarCollapseOpen = vsThemeVal.value.sidebarCollapseOpen
}

function ChangeMobile() {
  vsThemeVal.value.mobileActive = !vsThemeVal.value.mobileActive
  localStorage.mobile = !vsThemeVal.value.mobileActive
}

function ChangeOpenCode() {
  vsThemeVal.value.openCode = !vsThemeVal.value.openCode
  // codex.vue 的 watch 也会写一次，但它只在「当前页面存在示例面板」时才挂载；
  // 这里补写一次，保证在无示例的页面上切换也能被记住
  localStorage.openCode = vsThemeVal.value.openCode
}

// ── 明暗主题 ────────────────────────────────────────────────────────────────
// 圆形擦除的时长/缓动只在这里声明一次：下面「何时放开元素级 transition」直接
// 等视图过渡结束（transition.finished），不再靠定时器去猜这个值。
const THEME_WIPE_DURATION = 500
// 全站交互动效统一是 ease / ease-out，旧实现这里是唯一一处 ease-in。
// 揭示式动画「越接近结束越快」观感突兀，故对齐为对称的 ease-in-out。
const THEME_WIPE_EASING = 'ease-in-out'
// 需要「旧图层压在新图层之上」的那一程要加这个类 —— 目前是**去暗色**：那里收缩的是
// 浅色快照（old），必须让 old 在上层才看得见。类名与 theme/styles/view-transition.styl
// 里的 `html.vs-wipe-old-top::view-transition-*(root)` 一一对应，改名要两边一起改。
// 名字按**机制**（old 在上）而不是按明暗方向取：明暗方向是可调的产品决策，机制不是 ——
// 按方向取名的话，下次调整方向就会得到一个名不副实的常量。
// 注意必须挂在 documentElement 上：伪元素树挂在 <html> 下、与 <body> 是兄弟，挂 body 匹配不到。
const THEME_WIPE_OLD_TOP_CLASS = 'vs-wipe-old-top'
// 连续快速点开关时，前一次过渡的 finished 会晚于后一次的启动 ——
// 用序号让「旧过渡」的收尾动作作废，避免它把新过渡的方向类/transition 开关提前撤掉。
let wipeSeq = 0

// 当前是否暗色：本地偏好优先，其次跟随系统
function currentThemeIsDark() {
  if (localStorage.vsTheme) {
    return localStorage.vsTheme === 'dark'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

// 把明暗状态写到 DOM 上。所有影响外观的写入都集中在这里，
// 保证视图过渡的「新」快照拿到的是一份完整的目标状态。
function applyTheme(isDark) {
  if (isDark) {
    document.body.setAttribute('vs-theme', 'dark')
    document.body.classList.add('darken')
  } else {
    document.body.removeAttribute('vs-theme')
    document.body.classList.remove('darken')
  }
  // ⚠️ 属性必须**同时**写到 <html> 上：
  //   1) 根元素的背景会成为**画布色**（内容不足一屏、overscroll 时露出来的那块），
  //      而 `html` 的 `--vs-theme-layout` 不会因为 body 有属性就改变 ——
  //      自定义属性只向下继承、**不向上传播**。不写这一句，暗色下 body 之外
  //      仍是白的。
  //   2) `color-scheme` 需要按 `html[vs-theme="dark"]` 命中（见 custom.styl），
  //      否则滚动条、原生表单控件、自动填充仍是浅色。
  //   同理，明暗切换的 view-transition 方向类也必须挂 documentElement
  //   （伪元素树挂在 <html> 下，与 <body> 是兄弟）。
  document.documentElement.setAttribute('vs-theme', isDark ? 'dark' : 'light')
  if (vsThemeVal.value) {
    vsThemeVal.value.themeDarken = isDark
  }
}

// 读取并应用主题。传 forceTheme 可强制指定（当前无调用点），不传则跟随偏好/系统。
const setTheme = forceTheme => {
  document.body.classList.add('vs-remove-transition')
  const isThemeDark =
    forceTheme === 'dark' ? true : forceTheme === 'light' ? false : currentThemeIsDark()

  applyTheme(isThemeDark)
  localStorage.vsTheme = isThemeDark ? 'dark' : 'light'

  setTimeout(() => {
    document.body.classList.remove('vs-remove-transition')
  }, 100)

  return isThemeDark ? 'dark' : 'light'
}

// 圆形擦除的圆心 = **开关自身的几何中心**，不是鼠标落点。
// 用鼠标落点（event.clientX/Y）有两个坑：
//   1. 点在开关边缘或图标一角时，圆从那个角发散，看着不像从开关里长出来；
//   2. 键盘 Enter / 辅助技术触发的 click 不带坐标（恒为 0,0），圆心会飞到画面左上角。
// 取中心还有一处好处：圆无论扩还是缩，都严格以开关为定点，两侧观感对称。
// ⚠️ event.currentTarget 只在处理函数**同步执行**期间有值，之后为 null，
//    所以矩形必须在这里就取出来 —— 不能留到 transition.ready 的回调里再算。
function wipeOrigin(event) {
  const fallback = { x: Math.round(innerWidth / 2), y: Math.round(innerHeight / 2) }
  // 圆形开关优先取内层轨道 .switch-con（按钮自身 padding 不对称时也不会偏中心）
  const anchor = event?.currentTarget?.querySelector?.('.switch-con') || event?.currentTarget
  const rect = anchor?.getBoundingClientRect?.()
  if (!rect || !rect.width || !rect.height) return fallback
  return { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) }
}

function ChangeTheme(event) {
  const nextIsDark = !currentThemeIsDark()
  const nextTheme = nextIsDark ? 'dark' : 'light'

  // 视图过渡的「新」快照在属性写入后立刻拍摄：此时若还有 250ms 的颜色过渡在跑，
  // 快照会拍到过渡的起始值（旧色）。所以要先禁掉元素级 transition。
  document.body.classList.add('vs-remove-transition')
  const releaseTransition = () => document.body.classList.remove('vs-remove-transition')

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // 不支持 View Transitions 或用户要求减弱动效：直接切换，不做圆形擦除。
  // 旧实现无条件调用 document.startViewTransition，在不支持的浏览器里会抛错，
  // 表现为「点了开关但主题没变」。
  if (typeof document.startViewTransition !== 'function' || prefersReduced) {
    applyTheme(nextIsDark)
    localStorage.vsTheme = nextTheme
    setTimeout(releaseTransition, 100)
    return
  }

  const { x, y } = wipeOrigin(event)
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  // 两个方向共用一个「以开关中心为圆心、半径 0↔endRadius」的圆，但作用层与层级相反，
  // 于是观感是一次往复：
  //   去暗色：旧（浅）层在上，同一个圆由大到小收回  —— 右上 → 左下
  //   回浅色：新（浅）层在上，圆由小到大铺满        —— 左下 → 右上
  // 层级必须在过渡开始前就位（见 styles/view-transition.styl），
  // 否则第一帧的上下关系是错的。
  const root = document.documentElement
  if (nextIsDark) root.classList.add(THEME_WIPE_OLD_TOP_CLASS)
  const seq = ++wipeSeq

  const transition = document.startViewTransition(() => {
    applyTheme(nextIsDark)
    localStorage.vsTheme = nextTheme
  })

  transition.ready
    .then(() => {
      const circle = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
      document.documentElement.animate(
        // 去暗色是「铺满 → 收回」（裁掉上层的浅色快照），回浅色是「0 → 铺满」
        { clipPath: nextIsDark ? [...circle].reverse() : circle },
        {
          duration: THEME_WIPE_DURATION,
          easing: THEME_WIPE_EASING,
          // 收缩谁，谁就必须在上层；层级由 THEME_WIPE_OLD_TOP_CLASS 在过渡开始前定好
          pseudoElement: nextIsDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
    .catch(() => {})

  // 等视图过渡真正结束再放开：一是避免固定 500ms 与动画时长对不齐，
  // 二是方向类必须活到过渡结束，否则回程中途层级会被还原
  transition.finished.finally(() => {
    if (seq !== wipeSeq) return // 已被更新的一次切换接管，收尾交给它
    root.classList.remove(THEME_WIPE_OLD_TOP_CLASS)
    releaseTransition()
  })
}

// Vue.prototype.$mobile = { active: (localStorage.mobile != 'true') || false }
// Vue.prototype.$menu = { active: (localStorage.menu != 'true') || false }
// Vue.observable(this.$site.sidebarCollapseOpen)
// Vue.observable(vsThemeVal.value)
// Vue.observable(this.$mobile)
// Vue.observable(this.$site.themeConfig)

const { vsTheme } = getCurrentInstance().appContext.config.globalProperties
// ⚠️ 直接共享该 reactive 对象，**不要**写成 `{ ...vsTheme }`：
// 展开运算符产出的是副本，本文件里的写入 SidebarLinks.vue 读不到，
// 「展开/收起侧边栏子栏目」会表现为「点击无反应」。回归证明见 .workbuddy/tmp/proof-vstheme-fix.mjs
vsThemeVal.value = vsTheme

onMounted(() => {
  // 恢复「子栏目展开/收起」偏好：此前只写不读，刷新后开关状态与实际界面不一致
  const savedCollapseOpen = localStorage.getItem('sidebarCollapseOpen')
  if (savedCollapseOpen !== null) {
    vsThemeVal.value.sidebarCollapseOpen = savedCollapseOpen === 'true'
  }

  // setTheme() 内部已经写好 vs-theme 属性、.darken、themeDarken，无需再重复
  setTheme()
})
</script>
<style lang="stylus">
getColor(vsColor, alpha = 1)
  unquote("rgba(var(--vs-" + vsColor + "), " +alpha + ")")

getVar(var)
  unquote("var(--vs-" + var + ")")

// ⚠️ 选择器必须同时列 `:root[vs-theme="dark"]`，不能只写 `[vs-theme="dark"]`。
//   浅色兜底写在 custom.styl / styles/theme.styl 的 `:root` 里（`--vs-theme-layout: #fff`），
//   而 `:root` 与 `[vs-theme="dark"]` 的**特异性完全相同（0,1,0）**，两者都命中
//   `<html>` 时只能靠源码顺序定胜负 —— 实测 `:root` 那份排在后面，于是
//   `htmlAttr` 已经是 `dark`、但 `getComputedStyle(html).getPropertyValue('--vs-theme-layout')`
//   仍是 `#fff`：`<html>` 的背景被画成白色，成为**画布色**，overscroll 与短页面
//   底部直接露白条（`body` 因为有属性选择器 + `html body` 高特异性规则，反而是对的，
//   更不容易被发现）。`:root[vs-theme="dark"]` 是 (0,2,0)，稳压 `:root`，与顺序无关。
:root[vs-theme="dark"],
[vs-theme="dark"]
  --vs-theme-bg: #18191c
  --vs-theme-color: #fff
  --vs-theme-layout: #1e2023
  --vs-theme-bg2: #141417
  --vs-theme-code: #141417
  --vs-theme-code2: #161619

.switch-dark
  position relative
  width auto !important

  &:hover
    .switch-con
      background getVar('theme-bg2')

    .circle
      i
        opacity 1

  &:active
    .circle
      width 28px
      border-radius 15px

      i
        transform translate(24px)
        font-size .85rem !important

  &.active
    .switch-con
      background getVar('theme-bg2') !important

    &:active
      .circle
        width 28px
        border-radius 15px
        transform translate(21px)
        box-shadow 0px 5px 15px 0px rgba(0, 0, 0, 1)

        i
          transform translate(-24px)

    .circle
      transform translate(27px)

      i
        transform translate(-27px)

  .switch-con
    width 60px
    height 32px
    background getVar('theme-bg')
    border-radius 20px
    box-shadow inset 0px 0px 4px 0px rgba(0, 0, 0, .05)

  .circle
    width 23px
    height 23px
    background getVar('theme-layout')
    position relative
    display flex
    align-items center
    justify-content center
    border-radius 50%
    margin 5px
    box-shadow 0px 5px 15px 0px rgba(0, 0, 0, .15)
    transition transform .25s ease, width .25s ease !important
    transform translate(0px)

    i
      transform translate(27px)
      transition transform .25s ease, font-size .25s ease, opacity .25s ease !important
      font-size 1rem !important
      z-index -1

.theme-color-layout
  position relative

  input
    position absolute
    top 0px
    left 0px
    width 100%
    height 100%
    opacity 0

.theme-color-primary
  position relative

  input
    position absolute
    top 0px
    left 0px
    width 100%
    height 100%
    opacity 0

  i.bx
    color getColor(primary)

.config
  position fixed
  bottom 0px
  left 260px
  z-index 1200
  border 0px
  border-radius 0px 20px 0px 0px
  transition all .25s ease
  outline none
  display flex
  align-items center
  justify-content center

  button
    width 32px
    height 45px
    padding 1px 6px
    border-radius 0px
    display flex
    align-items center
    justify-content center
    border 0px
    background getVar(theme-layout)
    transition all .25s ease

    &.config-btn
      width 40px

    // &:hover
    //   transform translate(5px, -5px)
    //   border-radius 20px !important
    //   box-shadow 0px 8px 25px -5px rgba(0,0,0,.2)

    &:last-child
      border-radius 0px 20px 0px 0px

    li
      list-style none

  .config-btn
    &:focus, &:hover
      > i.bx
        transform rotate(60deg)

      ul.options
        opacity 1
        visibility visible
        transform translate(0px, calc(-100% - 25px))

  .effect1config
    width 40px
    height 40px
    top -36px
    left -3px
    position absolute
    transform rotate(179deg)
    fill getVar(theme-layout)
    stroke getVar(theme-layout)

    &.invert
      transform rotate(-90deg)
      bottom -36px
      top auto

  i.bx
    font-size 1.2rem
    transition all .25s ease
    color getVar(theme-color)

    &.bxs-moon
      color rgba(0, 0, 0, .5)

  ul.options
    position absolute
    top 0px
    left 0px
    transform translate(-15px, calc(-100% - 25px))
    background getVar(theme-layout)
    list-style none
    padding-left 0px
    margin 0px
    border-radius 0px 20px 20px 0px
    opacity 0
    visibility hidden
    transition all .25s ease
    box-shadow 20px 0px 40px 0px rgba(0, 0, 0, .03)

    li
      padding 8px
      display flex
      align-items center
      justify-content center
      border-radius 12px 12px 12px 12px
      margin 4px
      border 2px solid transparent
      position relative

      &.active
        background rgba(0, 0, 0, .05)
        border 2px solid getVar(theme-bg2)

      .visible-sidebar-hidden
        display none

@media (max-width: 1000px)
  .config
    left 0px

@media (max-width: 600px)
  .config
    // display none
    left 0px
    bottom 0px
    z-index 2000

    .config-btn
      .effect1config
        display none

      ul.options
        transform: translate(-100%, calc(-100% - 45px))

        li
          padding: 6px

      &:hover
        ul.options
          transform: translate(0px, calc(-100% - 45px))

      > .effect1config
        left 37px
</style>
