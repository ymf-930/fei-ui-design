<template>
  <div
    id="app"
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <!--    <HeaderNotification/>-->
    <ClientOnly>
      <Navbar
        v-if="shouldShowNavbar"
        v-show="!frontmatter.navbar"
        @toggle-sidebar="toggleSidebar"
        :class="{'transparent': frontmatter.branding, isSidebarOpen: isSidebarOpen}"
      />
    </ClientOnly>
    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    ></div>
    <Home v-if="frontmatter.home"/>

    <Docs-home :sidebar-items="sidebarItems" v-else-if="frontmatter.docsHome"/>

    <Page
      v-else
      :sidebar-items="sidebarItems"
    >
      <slot
        name="page-top"
        slot="top"
      />
      <slot
        name="page-bottom"
        slot="bottom"
      />
    </Page>
    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <slot
        name="sidebar-top"
        slot="top"
      />
      <slot
        name="sidebar-bottom"
        slot="bottom"
      />
    </Sidebar>
    <ClientOnly>
      <Config v-if="!frontmatter.navbar"/>
    </ClientOnly>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import {useData, useRouter} from 'vitepress'
import {isComponents, isGuide, resolveSidebarItems} from '../util'

import Home from '../components/Home.vue'
import Navbar from '../components/Navbar.vue'
import Page from '../components/Page.vue'
import Sidebar from '../components/Sidebar.vue'
import DocsHome from '../components/DocsHome.vue'
import Config from '../components/Config.vue'
// import HeaderNotification from '../components/HeaderNotification.vue'

const {site, page, frontmatter, title} = useData()
const router = useRouter()
const isSidebarOpen = ref(false)
const localePath = ref('/')

const shouldShowNavbar = computed(() => {
  const { themeConfig } = site.value
  const { frontmatter } = page.value
  if (
      frontmatter.navbar === false
      || themeConfig.navbar === false) {
    return false
  }
  return (
      frontmatter.title
      || themeConfig.logo
      || themeConfig.repo
      || themeConfig.nav
      // || frontmatter.value.themeLocaleConfig.nav
  )
  return true
})
const shouldShowSidebar = computed(() => {
  return (
    !frontmatter.value.home
    && frontmatter.value.sidebar !== false
    // && sidebarItems.value.length
  )
})
const sidebarItems = computed(() => {
  // return page.value
  const {filePath} = page.value
  const sidebarList = resolveSidebarItems(
    page.value,
    page.value.regularPath || '/',
    site.value,
    localePath.value || '/'
  )
  if (isGuide(filePath)){
    return sidebarList.filter(item=>item.navType === 'guide') || []
  }
  if (isComponents(filePath)){
    return sidebarList.filter(item=>item.navType === 'components') || []
  }
})
const pageClasses = computed(() => {
  const userPageClass = frontmatter.value.pageClass
  return [
    {
      'no-navbar': !shouldShowNavbar.value,
      'sidebar-open': isSidebarOpen.value,
      'no-sidebar': !shouldShowSidebar.value || frontmatter.value.passLayout
    },
    userPageClass
  ]
})

onMounted(() => {
  isSidebarOpen.value = false
  loadDarkModeFavicon()
})

function loadDarkModeFavicon() {
  (function (mod) {
    function collectLinks() {
      return Array.prototype.slice.apply(
        document.head.querySelectorAll('link[rel*="icon"]')
      )
    }

    function applyLink(source, target) {
      target.setAttribute('type', source.getAttribute('type'))
      target.setAttribute('href', source.getAttribute('href'))
    }

    // eslint-disable-next-line no-unused-vars
    function initSwitcher(delay) {
      // Exit if media queries aren't supported
      if (typeof window.matchMedia !== 'function') {
        return function noop() {
        }
      }

      var links = collectLinks()
      var current = document.createElement('link')
      var prevMatch

      current.setAttribute('rel', 'shortcut icon')
      document.head.appendChild(current)

      function faviconApplyLoop() {
        var matched

        links.forEach(function (link) {
          if (window.matchMedia(link.media).matches) {
            matched = link
          }
        })

        if (!matched) {
          return
        }

        if (matched.media !== prevMatch) {
          prevMatch = matched.media
          applyLink(matched, current)
        }
      }

      var intervalId = setInterval(faviconApplyLoop, delay || 300)

      function unsubscribe() {
        clearInterval(intervalId)
        links.forEach(function (link) {
          document.head.appendChild(link)
        })
      }

      faviconApplyLoop()
      links.forEach(function (link) {
        document.head.removeChild(link)
      })

      return unsubscribe
    }

    initSwitcher()
  })()
}


function toggleSidebar(to) {
  isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value
}

// side swipe
function onTouchStart(e) {
  this.touchStart = {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY
  }
}

function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - this.touchStart.x
  const dy = e.changedTouches[0].clientY - this.touchStart.y
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx > 0 && this.touchStart.x <= 80) {
      toggleSidebar(true)
    } else {
      toggleSidebar(false)
    }
  }
}

</script>

<style lang="stylus" scoped>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* 进入dark模式和退出dark模式时，两个图像的位置顺序正好相反 */
.darken::view-transition-old(root) {
  z-index: 1;
}
.darken::view-transition-new(root) {
  z-index: 9999999;
}

::view-transition-old(root) {
  z-index: 9999999;
}
::view-transition-new(root) {
  z-index: 1;
}
.fade-code-enter-active, .fade-code-leave-active
  transition: opacity .5s;

.fade-code-enter, .fade-code-leave-to
  opacity: 0
</style>

<!-- <style src="../styles/theme.styl" lang="stylus"></style> -->
