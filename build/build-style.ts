import { series, dest, src } from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import postcss from 'gulp-postcss'
import cleanCSS from 'gulp-clean-css'

import {
  output,
  pkgPath,
  compRoot,
  posix,
  componentStylesGlob,
  fullStylesGlob,
  commonStylesGlob,
  fontsGlob
} from './util-path'

// 复制字体包
const copyFonts = () => src(fontsGlob).pipe(dest(`${output}/fonts`))

/**
 * 全量样式打包（dist/styles/index.css 等）
 */
const buildFull = () =>
  src(fullStylesGlob).pipe(postcss()).pipe(cleanCSS()).pipe(autoprefixer()).pipe(dest(output))

/**
 * 通用类打包（dist/styles/common/*.css）
 */
const buildCommon = () =>
  src(commonStylesGlob)
    .pipe(postcss())
    .pipe(cleanCSS())
    .pipe(autoprefixer())
    .pipe(dest(`${output}/common`))

/**
 * 单个组件的按需样式打包。
 *
 * 以 `src` 为 base，保留 `<component>/styles/xxx.css` 的相对结构，
 * 产物与 JS 产物同层：`es/<component>/styles/index.css`。
 *
 * 注意：组件内的样式是在 `.vue` 里通过 `import '../styles/index.css'` 引用的，
 * 打包后该相对路径会原样保留（.css 被声明为 external），
 * 因此样式的落点必须与 JS 保持一致，否则按需引入时样式会 404。
 */
const buildComponents = () =>
  src(componentStylesGlob, { base: posix(compRoot) })
    .pipe(postcss())
    .pipe(cleanCSS())
    .pipe(autoprefixer())
    .pipe(dest(`${pkgPath}/es`))
    .pipe(dest(`${pkgPath}/lib`))

export default series(buildFull, buildCommon, buildComponents, copyFonts)
