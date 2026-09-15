const version = require('../package.json').version
const { name, homepage } = require('../package.json')
const { resolve } = require('path')
const fs = require('fs-extra')

// 组件库版本号（供 src/version.ts 引用）
fs.writeFileSync(resolve(__dirname, '..', 'src', 'version.ts'), `export default '${version}'\n`)

// 组件库基本信息，避免源码直接 import package.json 造成打包产物污染
// （原实现会额外产出 es/package.json.mjs 与 lib/package.json.js）
fs.writeFileSync(
  resolve(__dirname, '..', 'src', 'info.ts'),
  `export interface LibraryInfo {
  name: string
  version: string
  homepage: string
}

const info: LibraryInfo = {
  name: ${JSON.stringify(name)},
  version: ${JSON.stringify(version)},
  homepage: ${JSON.stringify(homepage)}
}

export default info
`
)
