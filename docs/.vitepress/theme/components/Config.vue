<template>
  <div class="config">
    <button class="config-btn">
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
        <!--
                <li class="theme-translate" title="Theme translate">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>

                  <ul class="lang">
                    <li
                      v-for="(item, i) in lang[0].items"
                      :key="i"
                      v-show="item.link !== $page.path"
                      >
                      <router-link :to="item.link">
                        {{ item.text }}
                      </router-link>
                    </li>
                  </ul>
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

    <button class="btn-lang theme-translate" @click="changeLang">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
        />
      </svg>

      <!--      <ul class="lang">
        <li
            v-for="(item, i) in lang[0].items"
            :key="i"
            v-show="item.link !== page.path"
        >
          <router-link :to="item.link">
            {{ item.text }}
          </router-link>
        </li>
      </ul>-->
    </button>

    <button
      @click="ChangeTheme"
      :class="{ active: vsThemeVal.themeDarken }"
      :title="`Theme ${!vsThemeVal.themeDarken ? 'Dark' : 'Light'}`"
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
import { computed, onMounted, ref, getCurrentInstance, nextTick } from 'vue'
import { useData } from 'vitepress'
import { Message } from 'fei-ui-design'

const vsThemeVal = ref(null)

const sideBarOpen = ref(true)
const lang = computed(() => {
  const { site, page, theme } = useData()
  const { locales } = site.value
  if (locales.value && Object.keys(locales.value).length > 1) {
    const currentLink = page.value.path
    const themeLocales = theme.value.locales || {}
    const languageDropdown = {
      text: 'Languages',
      items: Object.keys(locales.value).map(path => {
        const locale = locales.value[path]
        const text = (themeLocales[path] && themeLocales[path].label) || locale.text
        let link
        // Stay on the current page
        if (locale.lang === lang.value) {
          link = currentLink
        }
        /*else {
          // Try to stay on the same page
          link = currentLink.replace(this.$localeConfig.path, path)
          // fallback to homepage
          if (!routes.some(route => route.path === link)) {
            link = path
          }
        }*/
        return { text, link }
      }),
    }
    return [languageDropdown]
  }
  return []
})

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

  localStorage.theme = 'dark'
  const returnTheme = setTheme()
  vsThemeVal.value.themeDarken = returnTheme === 'dark'
  if (returnTheme === 'dark') {
    document.body.classList.add('darken')
  } else {
    document.body.classList.remove('darken')
  }
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
  Message.info('暂未开发')
  vsThemeVal.value.sidebarCollapseOpen = !vsThemeVal.value.sidebarCollapseOpen
  localStorage.sidebarCollapseOpen = !vsThemeVal.value.sidebarCollapseOpen
}

function ChangeMobile() {
  vsThemeVal.value.mobileActive = !vsThemeVal.value.mobileActive
  localStorage.mobile = !vsThemeVal.value.mobileActive
}

function ChangeOpenCode() {
  Message.info('开发中')
  vsThemeVal.value.openCode = !vsThemeVal.value.openCode
}

const setTheme = forceTheme => {
  document.body.classList.add('vs-remove-transition')
  const media = window.matchMedia('(prefers-color-scheme: dark)')

  let isThemeDark = media.matches

  if (localStorage.vsTheme) {
    isThemeDark = localStorage.vsTheme === 'dark'
  }

  if (isThemeDark) {
    document.body.setAttribute('vs-theme', 'dark')
  } else {
    document.body.removeAttribute('vs-theme')
  }

  if (forceTheme === 'dark') {
    document.body.setAttribute('vs-theme', 'dark')
  } else if (forceTheme === 'light') {
    document.body.removeAttribute('vs-theme')
  }

  localStorage.vsTheme = isThemeDark ? 'dark' : 'light'

  setTimeout(() => {
    document.body.classList.remove('vs-remove-transition')
  }, 100)

  return isThemeDark ? 'dark' : 'light'
}

function ChangeTheme(event) {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  let isThemeDark = media.matches

  if (localStorage.vsTheme) {
    isThemeDark = localStorage.vsTheme === 'dark'
  }

  localStorage.vsTheme = !isThemeDark ? 'dark' : 'light'
  const returnTheme = !isThemeDark ? 'dark' : 'light'

  document.body.classList.add('vs-remove-transition')
  vsThemeVal.value.themeDarken = returnTheme === 'dark'

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  const transition = document.startViewTransition(async () => {
    if (returnTheme === 'dark') {
      document.body.setAttribute('vs-theme', 'dark')
      document.body.classList.add('darken')
    } else {
      document.body.removeAttribute('vs-theme')
      document.body.classList.remove('darken')
    }
  })

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
    document.documentElement.animate(
      {
        clipPath: !vsThemeVal.value.themeDarken ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: !vsThemeVal.value.themeDarken
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })

  setTimeout(() => {
    document.body.classList.remove('vs-remove-transition')
  }, 500)
}

function changeLang() {
  Message.info({ message: '暂未开发！', zIndex: 3000 })
}

// Vue.prototype.$mobile = { active: (localStorage.mobile != 'true') || false }
// Vue.prototype.$menu = { active: (localStorage.menu != 'true') || false }
// Vue.observable(this.$site.sidebarCollapseOpen)
// Vue.observable(vsThemeVal.value)
// Vue.observable(this.$mobile)
// Vue.observable(this.$site.themeConfig)

const { vsTheme } = getCurrentInstance().appContext.config.globalProperties
vsThemeVal.value = { ...vsTheme }

onMounted(() => {
  const returnTheme = setTheme()
  vsThemeVal.value.themeDarken = returnTheme == 'dark'
  if (returnTheme === 'dark') {
    document.body.classList.add('darken')
  } else {
    document.body.classList.remove('darken')
  }
})
</script>
<style lang="stylus">
getColor(vsColor, alpha = 1)
  unquote("rgba(var(--vs-" + vsColor + "), " +alpha + ")")

getVar(var)
  unquote("var(--vs-" + var + ")")

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

.darken
  .theme-translate
    .lang
      li
        a
          box-shadow 0px 8px 25px 0px rgba(0, 0, 0, .6)

.theme-translate
  position relative
  z-index 100

  &:hover
    .lang
      opacity 1
      visibility visible
      transform translate(0, -54px)

  svg
    width 18px
    fill getVar(theme-color)

  .lang
    transition all .25s ease
    position absolute
    top 0px
    left 0px
    transform translate(0, -90%)
    padding 0px
    opacity 0
    visibility hidden

    li
      text-align center
      font-weight bold
      padding 0px 0px !important
      display block

      a
        padding 7px 15px
        font-weight bold
        background getVar(theme-layout)
        border-radius 20px
        transition all .25s ease
        margin-bottom 10px
        font-size .75rem
        display block
        box-shadow 0px 8px 20px 0px rgba(0, 0, 0, .08)

        &:hover
          box-shadow 0px 0px 0px 0px rgba(0, 0, 0, .08) !important
          transform translate(0, 3px)

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
