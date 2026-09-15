/**
 * 校验文档中出现的 `<f-xxx>` 标签能否解析到真实组件。
 *
 * 为什么要单独立这道护栏：文档里的标签有**两条互不相同的解析路径**，
 * 而它们读的不是同一个名字，任何一边写错都不会有构建期报错——
 * 页面照常构建成功，只是组件静默不渲染：
 *
 *   1) 全局注册（`app.use(FeiUI)`）
 *      注册名取自组件内部的 `defineOptions({ name })`（见 src/create.ts 的 install，
 *      它解构的是 `component.name`，不是导出名）。
 *   2) 按需自动引入（unplugin-vue-components，见 docs/guide/import-on-demand.md）
 *      文档推荐的配方是 `componentName => ({ name: componentName, from: 'fei-ui-design' })`，
 *      解析器把标签转成 PascalCase 后**按导出名导入**。
 *
 * 于是当「导出名 ≠ 组件 name」时，两条路径会分裂：全局能用、按需引入拿到 undefined。
 * 历史实例：timeline 曾导出 FTimeLine 而组件 name 是 FTimeline，
 * 导致 `<f-timeline>` 在自动引入方案下无法解析。
 *
 * 因此本脚本对每个标签同时要求：
 *   - 能按导出名解析（按需引入路径，也是文档推荐路径）
 *   - 能按组件 name 解析（全局注册路径）
 * 两条都不满足 → 标签根本不存在（历史实例：docs/components/config-provider.md
 * 里的 `<f-pagination>`，分页组件的真实标签是 `<f-page>`）。
 *
 * 注意：**不跳过代码块**。文档里的代码示例正是使用者照抄的来源，
 * 示例中出现不存在的标签属于真实缺陷（`<f-pagination>` 当时就在 ```vue 围栏里）。
 * 若确有需要保留的例外，请连同理由写入 ALLOWLIST。
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');
const DOCS = path.join(ROOT, 'docs');

/**
 * 例外清单：键为标签名，值为「为什么可以不是组件」的理由。
 * 正常情况下应为空——加之前先想清楚是不是在掩盖真问题。
 */
const ALLOWLIST = new Map([]);

// ---------------------------------------------------------------- 工具
const read = (f) => fs.readFileSync(f, 'utf8');

function walk(dir, test, acc = [], skipDot = true) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skipDot && e.name.startsWith('.')) continue;
    if (e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, test, acc, skipDot);
    else if (test(e.name)) acc.push(p);
  }
  return acc;
}

/** 解析一个模块文件里「本地名字 -> 源文件」的映射（默认导入与具名导入皆可） */
function localImports(file) {
  const t = read(file);
  const map = new Map();
  // import X from './y'  |  import { A, B as C } from './y'
  for (const m of t.matchAll(/import\s+(?:(\w+)\s*,?\s*)?(?:\{([^}]*)\})?\s*from\s*['"](\.[^'"]+)['"]/g)) {
    const [, def, named, spec] = m;
    const resolved = resolveSpec(file, spec);
    if (!resolved) continue;
    if (def) map.set(def, resolved);
    if (named) {
      for (const part of named.split(',')) {
        const seg = part.trim();
        if (!seg) continue;
        const [orig, alias] = seg.split(/\s+as\s+/).map((s) => s.trim());
        map.set(alias || orig, resolved);
      }
    }
  }
  return map;
}

function resolveSpec(fromFile, spec) {
  const base = path.resolve(path.dirname(fromFile), spec);
  for (const cand of [base, base + '.ts', base + '.tsx', base + '.vue', path.join(base, 'index.ts')]) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) return cand;
  }
  return null;
}

/**
 * 收集入口模块对外暴露的组件导出。
 * 返回 [{ exportName, file }]，file 为该导出指向的组件源文件（可为 null）。
 */
function collectEntryExports(entryFile) {
  const t = read(entryFile);
  const locals = localImports(entryFile);
  const out = [];
  // export { default as X } from './y'
  for (const m of t.matchAll(/export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*['"]([^'"]+)['"]/g)) {
    out.push({ exportName: m[1], file: resolveSpec(entryFile, m[2]) });
  }
  // export { A } / export { A as B }  —— 源在本文件已导入的本地名字上
  for (const m of t.matchAll(/(?<!from\s*)export\s*\{([^}]*)\}\s*(?!from)/g)) {
    for (const part of m[1].split(',')) {
      const seg = part.trim();
      if (!seg || seg.includes('default')) continue;
      const [orig, alias] = seg.split(/\s+as\s+/).map((s) => s.trim());
      const exportName = alias || orig;
      if (/^[A-Z]/.test(exportName)) out.push({ exportName, file: locals.get(orig) || null });
    }
  }
  // export { A as B } from './y'
  for (const m of t.matchAll(/export\s*\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g)) {
    if (m[1].includes('default')) continue;
    const file = resolveSpec(entryFile, m[2]);
    for (const part of m[1].split(',')) {
      const seg = part.trim();
      if (!seg) continue;
      const [orig, alias] = seg.split(/\s+as\s+/).map((s) => s.trim());
      out.push({ exportName: alias || orig, file });
    }
  }
  return out;
}

/** 取组件源文件里声明的组件名（全局注册名的来源） */
function componentNameOf(file) {
  if (!file || !fs.existsSync(file) || !/\.(vue|tsx?)$/.test(file)) return null;
  const t = read(file);
  // defineOptions({ name: 'FTimeline' })
  const opt = t.match(/defineOptions\s*\(\s*\{[\s\S]*?name\s*:\s*['"]([\w-]+)['"]/);
  if (opt) return opt[1];
  // defineComponent({ name: 'FButton' })
  const dc = t.match(/defineComponent\s*\(\s*\{[\s\S]*?name\s*:\s*['"]([\w-]+)['"]/);
  if (dc) return dc[1];
  // export default { name: 'FButton' }
  const obj = t.match(/export\s+default\s*\{[\s\S]*?name\s*:\s*['"]([\w-]+)['"]/);
  if (obj) return obj[1];
  return null;
}

// ---------------------------------------------------------------- 1. 建立两组可用名
/**
 * 从入口递归展开 `export * from`。
 * 必须展开：`src/index.ts` 只有一行 `export * from './components'`，
 * 真正的组件清单在 `src/components.ts`（其中还包含 5 个 `_internal/*` 组件）。
 * 不展开会把 <f-empty> / <f-popper> / <f-scrollbar> 等误报为「不存在」。
 */
function collectPublicExports(file, seen = new Set()) {
  const key = path.resolve(file);
  if (seen.has(key) || !fs.existsSync(key)) return [];
  seen.add(key);
  const out = collectEntryExports(key);
  for (const m of read(key).matchAll(/export\s*\*\s*from\s*['"](\.[^'"]+)['"]/g)) {
    const next = resolveSpec(key, m[1]);
    if (next) out.push(...collectPublicExports(next, seen));
  }
  return out;
}

/** 按需引入路径：能 `import { X } from 'fei-ui-design'` 到的名字 */
const byExportName = new Set();
/** 全局注册路径：会被 app.component(name) 注册的名字 */
const byComponentName = new Set();

for (const { exportName, file } of collectPublicExports(path.join(SRC, 'index.ts'))) {
  if (!/^F[A-Z]/.test(exportName)) continue;
  byExportName.add(exportName);
  const compName = componentNameOf(file);
  if (compName) byComponentName.add(compName);
}

/**
 * 「导出名与组件 name 分裂」= 某个组件 name 没有任何同名导出。
 * 刻意不拿 exportName 去比：`export { FTimeline as FTimeLine }` 这类
 * @deprecated 别名会与组件 name 不同名，但那是刻意保留的兼容写法，不是缺陷。
 */
const split = new Set([...byComponentName].filter((n) => !byExportName.has(n)));

// ---------------------------------------------------------------- 2. 收集文档标签
const docFiles = [
  ...walk(DOCS, (n) => /\.(md|vue|ts|tsx)$/.test(n)),
];

const tags = new Map(); // tag -> Set(出现文件)
const toPascal = (s) => s.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('');

for (const f of docFiles) {
  const t = read(f);
  for (const m of t.matchAll(/<f-([a-z][a-z0-9-]*)/g)) {
    const tag = 'f-' + m[1];
    if (!tags.has(tag)) tags.set(tag, new Set());
    tags.get(tag).add(path.relative(ROOT, f).split(path.sep).join('/'));
  }
}

// ---------------------------------------------------------------- 3. 比对
const missing = []; // 两条路径都解析不到
const nameOnly = []; // 只能按组件 name 解析（按需引入会失败）
const exportOnly = []; // 只能按导出名解析（全局注册会失败）

for (const tag of [...tags.keys()].sort()) {
  if (ALLOWLIST.has(tag)) continue;
  const pascal = toPascal(tag);
  const hasExport = byExportName.has(pascal);
  const hasName = byComponentName.has(pascal);
  if (!hasExport && !hasName) missing.push(tag);
  else if (!hasExport && hasName) nameOnly.push(tag);
  else if (hasExport && !hasName) exportOnly.push(tag);
}

const fmt = (tag) => {
  const files = [...tags.get(tag)].sort();
  const shown = files.slice(0, 3).join(', ');
  return `  <${tag}>  ${shown}${files.length > 3 ? ` 等 ${files.length} 个文件` : ''}`;
};

console.log(`文档中出现的 <f-*> 标签: ${tags.size}`);
console.log(`按导出名可解析（按需引入）: ${byExportName.size}`);
console.log(`按组件 name 可解析（全局注册）: ${byComponentName.size}`);

if (missing.length) {
  console.log(`\n[错误] 标签无法解析到任何组件（${missing.length}）:`);
  for (const tag of missing) console.log(fmt(tag));
}
if (nameOnly.length) {
  console.log(`\n[错误] 标签只能按组件 name 解析，按需自动引入会拿到 undefined（${nameOnly.length}）:`);
  for (const tag of nameOnly) {
    const pascal = toPascal(tag);
    console.log(`${fmt(tag)}\n      组件 name 是 ${pascal}，但导出名不是——请让 index.ts 导出 ${pascal}`);
  }
}
if (exportOnly.length) {
  console.log(`\n[错误] 标签只能按导出名解析，未全局注册（${exportOnly.length}）:`);
  for (const tag of exportOnly) console.log(fmt(tag));
}
if (split.size) {
  console.log(`\n[错误] 组件 name 没有同名导出（按需自动引入会拿到 undefined，${split.size} 个）:`);
  for (const name of [...split].sort()) {
    console.log(`  组件 name ${name} —— 请让对应 index.ts 导出 ${name}（而不是 FTimeLine 这类旧写法）`);
  }
}

const failed = missing.length + nameOnly.length + exportOnly.length + split.size;
if (!failed) {
  console.log(
    `\n全部 ${tags.size} 个标签均可解析，且全局注册 / 按需引入两条路径指向同一名字。`
  );
}
process.exitCode = failed ? 1 : 0;
