const fs = require('fs');
const path = require('path');
const root = process.cwd();
const docsDir = path.join(root, 'docs');
const compsDir = path.join(docsDir, 'components');

const relOf = (f) => path.relative(root, f).split(path.sep).join('/');

// ---------- 1. demo 实际文件清单 ----------
function walk(dir, acc) {
  acc = acc || [];
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(relOf(p));
  }
  return acc;
}
const demosRoot = path.join(compsDir, 'demo');
const demoFiles = walk(demosRoot);
const legacyDemos = walk(path.join(docsDir, '.vitepress', 'components'));
const guideDemos = walk(path.join(docsDir, 'guide', 'demo'));

console.log('docs/components/demo 下 vue 文件:', demoFiles.filter((f) => f.endsWith('.vue')).length);
console.log('docs/.vitepress/components 下 vue 文件(疑似历史遗留):', legacyDemos.filter((f) => f.endsWith('.vue')).length);
console.log('docs/guide/demo 下文件:', guideDemos.length);

// demo 顶层目录
const demoDirs = fs.readdirSync(demosRoot, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort();
console.log('\ndemo 顶层目录(' + demoDirs.length + '):', demoDirs.join(', '));

// ---------- 2. 每个 md 的 import 是否可解析 ----------
const mdFiles = walk(compsDir).filter((f) => f.endsWith('.md')).map(relOf).sort();
console.log('\n=== 引用缺失的 demo 文件 ===');
let missing = 0;
for (const rel of mdFiles) {
  const abs = path.join(root, rel);
  const raw = fs.readFileSync(abs, 'utf8');
  const re = /import\s+(\w+)\s+from\s+['"](\.\/demo\/[^'"]+)['"]/g;
  let m;
  while ((m = re.exec(raw))) {
    const target = path.join(path.dirname(abs), m[2]);
    const cands = [target, target + '.vue', target + '.ts', target + '.tsx'];
    const ok = cands.some((c) => fs.existsSync(c));
    if (!ok) { console.log('  ' + rel + '  ->  ' + m[2] + '  (缺失)'); missing++; }
  }
}
console.log('缺失引用数:', missing);

// ---------- 3. md 中导入但未使用的 demo（死引用） ----------
console.log('\n=== md 中 import 了但正文未使用的 demo ===');
let unused = 0;
for (const rel of mdFiles) {
  const abs = path.join(root, rel);
  const raw = fs.readFileSync(abs, 'utf8');
  const re = /import\s+(\w+)\s+from\s+['"](\.\/demo\/[^'"]+)['"]/g;
  let m;
  const body = raw.replace(/<script setup>[\s\S]*?<\/script>/, '');
  while ((m = re.exec(raw))) {
    const name = m[1];
    const used = new RegExp('<' + name + '\\s*/>').test(body) || new RegExp('<' + name + '[\\s>]').test(body);
    if (!used) { console.log('  ' + rel + '  import ' + name + ' 未被使用'); unused++; }
  }
}
console.log('未被使用的 import 数:', unused);

// ---------- 4. demo 目录中未被任何 md 引用的孤儿文件 ----------
console.log('\n=== 孤儿 demo（存在于 demo 目录但无 md 引用）===');
const referenced = new Set();
for (const rel of mdFiles) {
  const abs = path.join(root, rel);
  const raw = fs.readFileSync(abs, 'utf8');
  const re = /from\s+['"](\.\/demo\/[^'"]+)['"]/g;
  let m;
  while ((m = re.exec(raw))) {
    const t = relOf(path.resolve(path.dirname(abs), m[1]));
    referenced.add(t);
    referenced.add(t + '.vue');
  }
}
const orphans = demoFiles.filter((f) => f.endsWith('.vue') && !referenced.has(f));
console.log('孤儿 demo 数:', orphans.length);
for (const f of orphans.slice(0, 60)) console.log('  ' + f);

// ---------- 5. 未被 demo 引用的组件目录名 vs 组件文档 ----------
console.log('\n=== 组件目录 vs 文档 vs demo 目录 三者对照 ===');
const srcDirs = fs.readdirSync(path.join(root, 'src'), { withFileTypes: true })
  .filter((e) => e.isDirectory() && !e.name.startsWith('_')).map((e) => e.name).sort();
const docNames = mdFiles.map((f) => path.basename(f, '.md'));
const internalDir = path.join(root, 'src', '_internal');
const internalComps = fs.existsSync(internalDir)
  ? fs.readdirSync(internalDir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)
  : [];
console.log('src 组件目录数:', srcDirs.length, '| _internal:', internalComps.join(','));
console.log('文档数:', docNames.length);
const undocumented = srcDirs.filter((d) => !docNames.includes(d));
console.log('有源码但无文档:', undocumented.length ? undocumented.join(', ') : '无');
const docNoSrc = docNames.filter((d) => !srcDirs.includes(d) && !internalComps.includes(d));
console.log('有文档但源码目录不在 src 顶层:', docNoSrc.length ? docNoSrc.join(', ') : '无');
// demo 目录名是 PascalCase（DatePicker），文档名是 kebab-case（date-picker），
// 二者是同一组件的两种写法（见 docs/.internal/docs-style-guide.md §1）。
// 归一化时去掉分隔符并统一小写，避免把同一个组件误报成「有 demo 但无文档」。
const normName = (s) => s.toLowerCase().replace(/[-_]/g, '');
// index 是组件总览页（docs/components/index.md），本身没有 demo 目录，属正常；
// icon 的示例是页内内联写法（配合 .vitepress/utils/iconfont.json），也不需要 demo 目录。
const NO_DEMO_OK = new Set(['index', 'icon']);
const demoDirSet = new Set(demoDirs.map(normName));
const docNoDemo = docNames.filter((d) => !demoDirSet.has(normName(d)) && !NO_DEMO_OK.has(d));
console.log('有文档但无 demo 目录:', docNoDemo.length ? docNoDemo.join(', ') : '无');
const docNameSet = new Set(docNames.map(normName));
const demoNoDoc = demoDirs.filter((d) => !docNameSet.has(normName(d)));
console.log('有 demo 目录但无文档:', demoNoDoc.length ? demoNoDoc.join(', ') : '无');

/**
 * demo 目录名与文档名的大小写风格不同（`DatePicker/` vs `date-picker.md`），
 * 因此「有文档但无 demo」/「有 demo 但无文档」这两项会长期存在，
 * 它们只是提示文档文件名与 demo 目录名不一致，**不构成缺陷**，
 * 不参与 exitCode 判定。真正需要阻断的是：
 *   - md 里的 `import ... from './demo/...'` 指向不存在的文件（missing）
 *   - 存在完全没有任何 md 引用的孤儿 demo（orphans）
 */
process.exitCode = (missing > 0 || orphans.length > 0) ? 1 : 0;
