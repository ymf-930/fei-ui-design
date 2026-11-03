/**
 * postcss-nested 7 起已改为纯 ESM：在本 .cjs 配置里 `require()` 拿到的是模块命名空间
 * （`{ default: fn }`）而不是插件函数本身，直接交给 postcss 会抛
 * 「[object Object] is not a PostCSS plugin」，因此这里解包一次。
 *
 * 其余插件（postcss-import / postcss-each / postcss-for / postcss-functions /
 * postcss-color-mix / postcss-each-variables / autoprefixer）目前仍是 CJS 导出，
 * require() 直接返回函数，无需处理。
 */
const postcssNested = require('postcss-nested')

module.exports = {
  plugins: [
    require('postcss-functions')({
      functions: {
        percentage: function (value, total) {
          return (parseFloat(value) / parseFloat(total)) * 100 + '%'
        }
      }
    }),
    require('postcss-import'),
    require('postcss-each-variables'),
    postcssNested.default || postcssNested,
    require('postcss-each')({
      plugins: {
        beforeEach: [require('postcss-for'), require('postcss-color-mix')]
      }
    }),
    require('autoprefixer')
  ]
}
