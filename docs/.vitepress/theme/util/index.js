export const hashRE = /#.*$/
export const extRE = /\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^(https?:|mailto:|tel:)/

export function normalize (path) {
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '')
}

export function getHash (path) {
  const match = path.match(hashRE)
  if (match) {
    return match[0]
  }
}

export function isExternal (path) {
  return outboundRE.test(path)
}

export function isMailto (path) {
  return /^mailto:/.test(path)
}

export function isTel (path) {
  return /^tel:/.test(path)
}

export function isGuide (path) {
  return /^guide/.test(path)
}

export function isComponents (path) {
  return /^components/.test(path)
}


export function ensureExt (path) {
  if (isExternal(path)) {
    return path
  }
  const hashMatch = path?.match(hashRE)
  const hash = hashMatch ? hashMatch[0] : ''
  const normalized = normalize(path)

  if (endingSlashRE.test(normalized)) {
    return path
  }
  return normalized + '.html' + hash
}

/**
 * 生成可直接放进 `href` 的站内地址：base 前缀 + `.html` 扩展名。
 *
 * 为什么需要它：
 * - 本项目 `cleanUrls: false`（VitePress 默认），页面真实产物是 `<route>.html`，
 *   目录页（`index.md`）则是 `<dir>/`。所以站内页面链接必须带 `.html`。
 * - 本主题用原生 `<a href>` 渲染导航与侧边栏，VitePress 不会替它拼接 base，
 *   而 `withBase()` 又**不幂等**（对已带 base 的路径会重复拼接），
 *   因此把「拼 base」和「补扩展名」收敛到这一个函数里，避免各处自行拼错。
 *
 * @param {string} raw 站内路径。站点根相对即可（如 '/guide/introduction'）：
 *                     本函数会先判断是否已带 base 再决定拼不拼，所以
 *                     「已带 base」和「裸路径」都能得到正确结果 ——
 *                     这一点是必须的，因为 `withBase()` **不幂等**，
 *                     对已带 base 的路径再调会得到 `/base/base/xxx`。
 *                     注意它**不是**用来补 base 的，base 由 config.js 的 SITE_BASE
 *                     单点声明、渲染层单点拼接。
 * @param {string} base 站点 base，取自 `useData().site.value.base`
 */
export function siteHref (raw, base = '/') {
  if (!raw) return raw
  if (isExternal(raw)) return raw
  const prefix = String(base || '/').replace(/\/$/, '')
  const path = prefix && !raw.startsWith(prefix) ? prefix + raw : raw
  return ensureExt(path)
}

export function isActive (route, path) {
  const routeHash = route.hash
  const linkHash = getHash(path)
  if (linkHash && routeHash !== linkHash) {
    return false
  }
  const routePath = normalize(route.path)
  const pagePath = normalize(path)
  return routePath === pagePath
}

export function resolvePage (pages, rawPath, base) {
  if (base) {
    rawPath = resolvePath(rawPath, base)
  }
  const path = normalize(rawPath)
  for (let i = 0; i < pages.length; i++) {
    if (normalize(pages[i].regularPath) === path) {
      return Object.assign({}, pages[i], {
        type: 'page',
        path: ensureExt(pages[i].path)
      })
    }
  }
  console.error(`[vuepress] No matching page found for sidebar item "${rawPath}"`)
  return {}
}

function resolvePath (relative, base, append) {
  const firstChar = relative.charAt(0)
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  const stack = base.split('/')

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop()
  }

  // resolve relative path
  const segments = relative.replace(/^\//, '').split('/')
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (segment === '..') {
      stack.pop()
    } else if (segment !== '.') {
      stack.push(segment)
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('')
  }

  return stack.join('/')
}

/**
 * @param { Page } page
 * @param { string } regularPath
 * @param { SiteData } site
 * @param { string } localePath
 * @returns { SidebarGroup }
 */
export function resolveSidebarItems (page, regularPath, site, localePath) {
  const { pages, themeConfig } = site
  const localeConfig = localePath && themeConfig.locales
    ? themeConfig.locales[localePath] || themeConfig
    : themeConfig
  const pageSidebarConfig = page.frontmatter.sidebar || localeConfig.sidebar || themeConfig.sidebar
  if (pageSidebarConfig === 'auto') {
    return resolveHeaders(page)
  }
  const sidebarConfig = localeConfig.sidebar || themeConfig.sidebar
  if (!sidebarConfig) {
    return []
  } else {
    const { base, config } = resolveMatchingConfig(regularPath, sidebarConfig)
    return config
      ? config.map(item => resolveItem(item, pages, base))
      : []
  }
}

/**
 * @param { Page } page
 * @returns { SidebarGroup }
 */
function resolveHeaders (page) {
  const headers = groupHeaders(page.headers || [])
  return [{
    type: 'group',
    collapsable: false,
    title: page.text,
    path: null,
    children: headers.map(h => ({
      type: 'auto',
      title: h.title,
      basePath: page.link,
      path: page.link + '#' + h.slug,
      children: h.children || []
    }))
  }]
}

export function groupHeaders (headers) {
  // group h3s under h2
  headers = headers.map(h => Object.assign({}, h))
  let lastH2
  headers.forEach(h => {
    if (h.level === 2) {
      lastH2 = h
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h)
    }
  })
  return headers.filter(h => h.level === 2)
}

export function resolveNavLinkItem (linkItem) {
  return Object.assign(linkItem, {
    type: linkItem.items && linkItem.items.length > 0 ? 'links' : 'link'
  })
}

/**
 * @param { Route } route
 * @param { Array<string|string[]> | Array<SidebarGroup> | [link: string]: SidebarConfig } config
 * @returns { base: string, config: SidebarConfig }
 */
export function resolveMatchingConfig (regularPath, config) {
  if (Array.isArray(config)) {
    return {
      base: '/',
      config: config
    }
  }
  for (const base in config) {
    // 本站只配置了单一 base，命中第一个即可（多 base 场景需恢复前缀匹配）
    return {
      base,
      config: config[base]
    }
  }
  return {}
}

function resolveItem (item, pages, base, groupDepth = 1) {
  if (typeof item === 'string') {
    return resolvePage(pages, item, base)
  } else if (Array.isArray(item)) {
    return Object.assign(resolvePage(pages, item[0], base), {
      title: item[1]
    })
  } else {
    if (groupDepth > 3) {
      console.error(
        '[vuepress] detected a too deep nested sidebar group.'
      )
    }
    const children = item.children || []
 /*   if (children.length === 0 && item.link) {
      return Object.assign(resolvePage(pages, item.link, base), {
        title: item.title
      })
    }*/
    return {
      type: 'group',
      path: item.link,
      title: item.title,
      navType: item.navType,
      sidebarDepth: item.sidebarDepth,
      // children: children.map(child => resolveItem(child, pages, base, groupDepth + 1)),
      children: item.children,
      collapsable: item.collapsable !== false
    }
  }
}
