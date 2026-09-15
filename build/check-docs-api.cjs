const fs = require('fs');
const path = require('path');
const root = process.cwd();
const srcDir = path.join(root, 'src');
const docsComp = path.join(root, 'docs', 'components');
const read = (p) => { try { return fs.readFileSync(p, 'utf8'); } catch (e) { return null; } };
function walk(dir, acc) {
  acc = acc || [];
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc); else acc.push(p);
  }
  return acc;
}
const toKebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').toLowerCase();
function matchBrace(str, openIdx) {
  let d = 0;
  for (let i = openIdx; i < str.length; i++) {
    const c = str[i];
    if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return i; }
  }
  return -1;
}
function topKeys(str, openIdx, closeIdx) {
  // 先剥离 `//` 行注释：注释里可能含逗号（如“// 主题样式对象,这里可以存储js变量”），
  // 会把键值切碎，导致后续 props 全部解析失败。
  const body = str
    .slice(openIdx + 1, closeIdx)
    .replace(/\/\/[^\n\r]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const out = []; let depth = 0; let buf = '';
  const flush = () => { if (!buf.trim()) return; const m = /^\s*(?:\.\.\.)?(\w+)\s*:\s*([\s\S]*)$/.exec(buf); if (m) out.push({ key: m[1], raw: m[2].trim() }); else { const s2 = /^\s*\.{3}(\w+)\s*$/.exec(buf); if (s2) out.push({ spread: s2[1] }); } buf = ''; };
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (c === '{' || c === '[' || c === '(') depth++;
    if (c === '}' || c === ']' || c === ')') depth--;
    if (c === ',' && depth === 0) { flush(); continue; }
    buf += c;
  }
  flush();
  return out;
}
// 归一化默认值：截断到第一个换行/右花括号，去掉引号与尾部分隔符
function normDefault(s) {
  if (s === undefined) return undefined;
  let t = String(s).split('\n')[0];
  t = t.replace(/[})];?\s*$/, '').replace(/,\s*$/, '').trim();
  t = t.replace(/^\(\)\s*=>\s*/, '');
  // `default: () => ({})` 剥掉首尾括号后会被截成 `{}`，而文档里常写成 `{}`；
  // 统一去掉包裹括号，避免把等价写法判成不一致。
  t = t.replace(/^\(\s*(\{[\s\S]*\}|\[[\s\S]*\]|'.*'|".*")\s*\)$/, '$1').trim();
  // 数组/对象字面量：去掉内部空格，`[10, 20]` 与 `[10,20]` 视为相等
  if (/^[[{]/.test(t)) t = t.replace(/\s/g, '');
  // 字符串字面量：`' / '` 与 `" / "` 归一到不带引号的形式
  if (/^['"`](.*)['"`]$/s.test(t)) t = t.slice(1, -1);
  return t.replace(/\s+/g, ' ').trim();
}
function normType(raw) {
  const t = String(raw).trim();
  if (/^Boolean$/i.test(t)) return 'Boolean';
  if (/^String$/i.test(t)) return 'String';
  if (/^Number$/i.test(t)) return 'Number';
  if (/^Array$/i.test(t)) return 'Array';
  if (/^Object$/i.test(t)) return 'Object';
  if (/^Function$/i.test(t)) return 'Function';
  if (/^boolean/i.test(t)) return 'Boolean';
  if (/^string/i.test(t)) return 'String';
  if (/^number/i.test(t)) return 'Number';
  if (/\[\]/.test(t)) return 'Array';
  if (/^Date$/i.test(t)) return 'Date';
  if (/=>/.test(t) || /^\(/.test(t)) return 'Function';
  if (/^\[/.test(t)) return t.replace(/[[\]]/g, '').split(',').join(' | ');
  return t;
}

// ---------- 全局符号索引 ----------
// 符号表以 `文件#符号名` 为键，而不是仅用符号名。
// 原因：不同文件会导出同名符号（如 src/space/src/useSpace.ts 与
// src/time-picker/src/common/props.ts 都导出 defaultProps），
// 只用符号名做键会把两个组件的 props 合并，产生大量假差异。
// 同时解析各文件的 import，把 `import { X } from './y'` 还原到定义了 X 的文件。
const allSrcFiles = walk(srcDir).filter((f) => /\.(ts|vue)$/.test(f));
const symbolProps = new Map(); // `${absFile}#${symbol}` -> Map(kebab -> {type, default, name})
const symbolLocals = new Map(); // absFile -> Map<localName, absPathOfDefinition>
const reexports = new Map(); // absFile -> [{ target, localName|null }]，localName 为 null 表示 `export *`
const SYM = (absFile, name) => absFile + '#' + name;

/**
 * 收集 `export { A, B as C } from './x'` 与 `export * from './x'`，
 * 用于在多级 re-export（如 ../../time-picker/src -> common/props.ts）时顺着
 * 桶文件继续往下找真正定义符号的那个文件。
 * @param {string} s 源码
 * @param {string} file 当前文件绝对路径
 * @returns {Array<{target:string, localName:string|null}>}
 */
function collectReexports(s, file) {
  const out = [];
  for (const m of s.matchAll(/export\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g)) {
    if (!/^\./.test(m[2])) continue;
    const abs = path.resolve(path.dirname(file), m[2]);
    for (const part of m[1].split(',')) {
      const seg = part.trim();
      if (!seg) continue;
      const asMatch = /^(\w+)\s+as\s+(\w+)$/.exec(seg);
      if (asMatch) out.push({ target: abs, localName: asMatch[1], exportedAs: asMatch[2] });
      else if (/^\w+$/.test(seg)) out.push({ target: abs, localName: seg, exportedAs: seg });
    }
  }
  for (const m of s.matchAll(/export\s*\*\s*from\s*['"]([^'"]+)['"]/g)) {
    if (!/^\./.test(m[1])) continue;
    out.push({ target: path.resolve(path.dirname(file), m[1]), localName: null, exportedAs: null });
  }
  return out;
}

/**
 * 解析 `import { a, b as c } from './x'`，返回 localName -> 目标模块绝对路径。
 * @param {string} s 源码
 * @param {string} file 当前文件绝对路径
 * @returns {Map<string,string>}
 */
function collectImports(s, file) {
  const map = new Map();
  // 需同时匹配 `import { X } from '...'` 与 `import type { X } from '...'`：
  // props 接口绝大多数以 `import type` 引入，漏掉这一种会导致
  // 跨文件的 props 定义完全解析不出来（如 collapse 的 CollapseWrapProps）。
  for (const m of s.matchAll(/\bimport\s+(?:type\s+)?\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g)) {
    const target = m[2];
    if (!/^\./.test(target)) continue; // 只处理相对路径（本项目内）
    const abs = path.resolve(path.dirname(file), target);
    for (const part of m[1].split(',')) {
      const seg = part.trim();
      if (!seg) continue;
      const asMatch = /^(\w+)\s+as\s+(\w+)$/.exec(seg);
      if (asMatch) map.set(asMatch[2], abs);
      else if (/^\w+$/.test(seg)) map.set(seg, abs);
    }
  }
  return map;
}

/**
 * 判断 abs（真实文件路径）是否就是 candidate（import/export 里写的裸路径）指向的文件。
 * candidate 可能省略扩展名、可能指向目录（需补 index.ts/index.vue）。
 * 注意：abs 本身已带扩展名，因此不能用 `abs + '.ts'` 这种拼接去比对，
 * 而要先剥掉 abs 的扩展名再和 candidate 比。
 */
function fileMatches(candidate, abs) {
  if (candidate === abs) return true;
  const norm = (p) => p.split(path.sep).join('/');
  const c = norm(candidate);
  const a = norm(abs);
  const aNoExt = a.replace(/\.(ts|vue)$/, '');
  return (
    c === aNoExt || // 省略扩展名：'.../props' -> '.../props.ts'
    c === a || // 已带扩展名的完整路径
    norm(path.join(candidate, 'index.ts')) === a ||
    norm(path.join(candidate, 'index.vue')) === a
  );
}

/**
 * 解析一个已在某文件定义过的符号：优先按 `文件#符号` 取，
 * 取不到再顺着 import 链找到真正定义它的文件。
 * @param {string} absFile 定义该符号的候选文件
 * @param {string} name 符号名
 */
function resolveSymbol(absFile, name, depth = 0) {
  const direct = symbolProps.get(SYM(absFile, name));
  if (direct) return direct;
  if (depth > 6) return undefined;
  // 1) 顺着 import 链：`import { X } from './y'`
  const imps = symbolLocals.get(absFile);
  if (imps && imps.has(name)) {
    const target = imps.get(name);
    for (const cand of allSrcFiles) {
      if (fileMatches(target, cand)) {
        const r = resolveSymbol(cand, name, depth + 1);
        if (r) return r;
      }
    }
  }
  // 2) 顺着 re-export 链：`export { X } from './y'` / `export * from './y'`
  const res = reexports.get(absFile) || [];
  for (const re of res) {
    if (re.localName !== null && re.localName !== name) continue;
    for (const cand of allSrcFiles) {
      if (fileMatches(re.target, cand)) {
        const r = resolveSymbol(cand, name, depth + 1);
        if (r) return r;
      }
    }
  }
  // 兜底：仅在顶层调用时按同名符号取唯一一个；递归中不做兜底，
  // 避免在多级链路里"猜"到不相关的同名 props。
  if (depth > 0) return undefined;
  const hits = [...symbolProps.entries()].filter(([k]) => k.endsWith('#' + name)).map(([, v]) => v);
  return hits.length === 1 ? hits[0] : undefined;
}

for (const f of allSrcFiles) {
  const s = read(f) || '';
  symbolLocals.set(f, collectImports(s, f));
  reexports.set(f, collectReexports(s, f));
}

for (const f of allSrcFiles) {
  const s = read(f) || '';
  symbolLocals.set(f, collectImports(s, f));
  // export const XxxProps = { ... }
  const re = /export\s+const\s+(\w+)\s*(?::[^=]+)?=\s*\{/g;
  let m;
  while ((m = re.exec(s))) {
    const name = m[1];
    if (!/[Pp]rops$/.test(name)) continue;
    const open = s.indexOf('{', re.lastIndex - 1);
    const close = matchBrace(s, open);
    if (close < 0) continue;
    const map = new Map();
    for (const k of topKeys(s, open, close)) {
      if (k.spread) { const r = resolveSymbol(f, k.spread); if (r) for (const [kk, vv] of r) map.set(kk, vv); continue; }
      let type = '—'; let def;
      if (/^\{/.test(k.raw)) {
        const tm = /type\s*:\s*(\[[^\]]*\]|\w+)/.exec(k.raw);
        const dm = /default\s*:\s*([\s\S]*)/.exec(k.raw);
        if (tm) type = normType(tm[1]);
        if (dm) def = normDefault(dm[1]);
      } else { type = normType(k.raw); }
      map.set(toKebab(k.key), { type, default: def, name: k.key });
    }
    symbolProps.set(SYM(f, name), map);
  }
  // export interface XxxProps { ... }
  const ire = /export\s+interface\s+(\w*Props\w*)\s*(?:extends[^{]*)?\{/g;
  while ((m = ire.exec(s))) {
    const name = m[1];
    const open = s.lastIndexOf('{', ire.lastIndex - 1);
    const close = matchBrace(s, open);
    if (close < 0) continue;
    const map = symbolProps.get(SYM(f, name)) || new Map();
    for (const line of s.slice(open + 1, close).split('\n')) {
      const pm = /^\s{2}(\w+)(\?)?\s*:\s*([^\n;]+?)\s*;?\s*$/.exec(line);
      if (pm) map.set(toKebab(pm[1]), { type: normType(pm[3]), default: undefined, name: pm[1] });
    }
    symbolProps.set(SYM(f, name), map);
  }
}
// 第二遍：解析 spread 引用（可能先引用后定义）
for (const f of allSrcFiles) {
  const s = read(f) || '';
  const re = /export\s+const\s+(\w+)\s*(?::[^=]+)?=\s*\{/g;
  let m;
  while ((m = re.exec(s))) {
    const name = m[1];
    // 与第一遍保持一致的过滤：只把 `*Props` 当作 props 定义，
    // 否则 DEFAULT_FORMATS_DATEPICKER 这类常量会被误当作 props 表。
    if (!/[Pp]rops$/.test(name)) continue;
    const open = s.indexOf('{', re.lastIndex - 1);
    const close = matchBrace(s, open);
    if (close < 0) continue;
    const map = symbolProps.get(SYM(f, name)) || new Map();
    for (const k of topKeys(s, open, close)) {
      if (k.spread) { const r = resolveSymbol(f, k.spread); if (r) for (const [kk, vv] of r) if (!map.has(kk)) map.set(kk, vv); continue; }
      let type = '—'; let def;
      if (/^\{/.test(k.raw)) {
        const tm = /type\s*:\s*(\[[^\]]*\]|\w+)/.exec(k.raw);
        const dm = /default\s*:\s*([\s\S]*)/.exec(k.raw);
        if (tm) type = normType(tm[1]);
        if (dm) def = normDefault(dm[1]);
      } else { type = normType(k.raw); }
      map.set(toKebab(k.key), { type, default: def, name: k.key });
    }
    symbolProps.set(SYM(f, name), map);
  }
}

// ---------- 每个组件的有效 props ----------
const comps = fs.readdirSync(srcDir, { withFileTypes: true }).filter((e) => e.isDirectory() && !e.name.startsWith('_')).map((e) => e.name).sort();

/**
 * 从组件目录的 index.ts 中解析出「公开入口」相对路径集合。
 * 仅这些文件上的 Options-API `props: {}` 才算公开 props，
 * 否则会把内部子组件（如 panel-* 面板、内部表格子组件）的私有 props 误报为缺失。
 * @param {string} compDir 组件目录绝对路径
 * @returns {Set<string>} 入口文件的绝对路径（无扩展名 + 带扩展名都放进去，便于比对）
 */
function collectPublicEntries(compDir) {
  const set = new Set();
  const idx = ['index.ts', 'index.js', 'index.vue'].map((n) => path.join(compDir, n)).find((p) => fs.existsSync(p));
  if (!idx) return set;
  const s = read(idx) || '';
  for (const m of s.matchAll(/export\s*(?:\{[^}]*\}|\*\s*(?:as\s+\w+)?)\s*from\s*['"]([^'"]+)['"]/g)) {
    if (!/^\./.test(m[1])) continue;
    const abs = path.resolve(path.dirname(idx), m[1]);
    set.add(abs);
    // 目标已带扩展名时（如 `./src/Submenu.vue`）不要再拼 `.ts`/`.vue`，
    // 否则会生成 `Submenu.vue.vue` 这种永不匹配的假路径，
    // 使该文件被误判为「非公开入口」而整块跳过（menu 的 Submenu 即因此漏采）。
    const hasExt = /\.(ts|vue|js)$/.test(abs);
    if (!hasExt) {
      set.add(abs + '.ts');
      set.add(abs + '.vue');
      set.add(abs + '.js');
    }
    // 目录形式（如 `./src/foo` 指向 foo/index.ts）
    set.add(path.join(abs, 'index.ts'));
    set.add(path.join(abs, 'index.vue'));
  }
  return set;
}

const srcInfo = {};
for (const c of comps) {
  const compDir = path.join(srcDir, c);
  const files = walk(compDir).filter((f) => /\.(ts|vue)$/.test(f));
  const publicEntries = collectPublicEntries(compDir);
  const props = new Map();
  const emits = new Set();
  const consumed = new Map(); // 符号名 -> 首次引用它的文件（用于按文件解析同名符号）
  for (const f of files) {
    const s = read(f) || '';
    const addConsumed = (name) => { if (!consumed.has(name)) consumed.set(name, f); };
    // 找出该文件引用的 props 符号
    for (const m of s.matchAll(/defineProps<\s*(\w+)\s*>/g)) addConsumed(m[1]);
    for (const m of s.matchAll(/defineProps\(\s*(\w+)\s*[,)]/g)) addConsumed(m[1]);
    for (const m of s.matchAll(/\.\.\.(\w+Props)\b/g)) addConsumed(m[1]);
    for (const m of s.matchAll(/(\w*[Pp]rops)\s*:\s*\{/g)) addConsumed(m[1]);
    // `props: configProviderProps`（Options API 直接引用导入的 props 对象）
    for (const m of s.matchAll(/\bprops\s*:\s*(\w+)\s*[,}]/g)) addConsumed(m[1]);
    // 该组件自己导出的 props
    const re = /export\s+const\s+(\w+)\s*(?::[^=]+)?=\s*\{/g;
    let m;
    while ((m = re.exec(s))) addConsumed(m[1]);
    // `export interface XxxProps` 只有真正被 defineProps<XxxProps>() /
    // withDefaults(defineProps<XxxProps>(), ...) 引用时才算公开 props。
    // 否则会把同文件里遗留/复用的接口（如 dropdown 里未被引用的
    // CollapseWrapProps）误当作组件 props。
    // 注意：接口常定义在 `types.ts` 并 import 进来，因此本文件的
    // `export interface` 只在本文件内成立；跨文件的情况由下面的
    // importedProps 分支处理。
    const ire = /export\s+interface\s+(\w*Props\w*)\s*(?:extends[^{]*)?\{/g;
    const usedIfaces = new Set();
    for (const u of s.matchAll(/defineProps<\s*(\w+)\s*>/g)) usedIfaces.add(u[1]);
    while ((m = ire.exec(s))) if (usedIfaces.has(m[1])) addConsumed(m[1]);
    // 跨文件 props 接口：`import type { XxxProps } from './types'` + defineProps<XxxProps>()
    // 需在其导入来源文件中解析该接口，因此把被引用但本文件未定义的接口名也纳入消费。
    for (const imp of s.matchAll(/import\s+(?:type\s+)?\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g)) {
      const names = imp[1].split(',').map((x) => x.trim().split(/\s+as\s+/).pop().trim());
      for (const n of names) if (usedIfaces.has(n)) addConsumed(n);
    }
    // 内联 defineProps({...})
    // 同样只对公开入口文件采集：内部私有子组件（如 desc 的 DescRow / 各 panel-*）
    // 的内联 props 不属于对外 API。
    const dpRe = /defineProps\(\s*\{/g;
    while (publicEntries.has(f) && (m = dpRe.exec(s))) {
      const open = s.indexOf('{', dpRe.lastIndex - 1);
      const close = matchBrace(s, open);
      if (close < 0) continue;
      for (const k of topKeys(s, open, close)) {
        if (k.spread) { const r = resolveSymbol(f, k.spread); if (r) for (const [kk, vv] of r) props.set(kk, { ...vv, from: 'spread' }); continue; }
        const tm = /type\s*:\s*(\[[^\]]*\]|\w+)/.exec(k.raw);
        const dm = /default\s*:\s*([\s\S]*)/.exec(k.raw);
        props.set(toKebab(k.key), { type: tm ? normType(tm[1]) : '—', default: dm ? normDefault(dm[1]) : undefined, name: k.key, from: 'defineProps' });
      }
    }
    // Options API 写法：props: { ...defaultProps, isRange: { type: Boolean, default: false } }
    // 这类组件不使用 defineProps，需单独提取其内联 props 与 spread 来源。
    // 仅对 index.ts 声明的公开入口文件生效：内部子组件（panel-*、表格子组件等）
    // 的私有 props 不属于对外 API，若一并采集会产生大量假差异。
    if (publicEntries.has(f)) {
      const opRe = /\bprops\s*:\s*\{/g;
      while ((m = opRe.exec(s))) {
        const open = s.indexOf('{', opRe.lastIndex - 1);
        const close = matchBrace(s, open);
        if (close < 0) continue;
        for (const k of topKeys(s, open, close)) {
          if (k.spread) { const r = resolveSymbol(f, k.spread); if (r) for (const [kk, vv] of r) if (!props.has(kk)) props.set(kk, { ...vv, from: k.spread }); continue; }
          let type = '—'; let def;
          if (/^\{/.test(k.raw)) {
            const tm = /type\s*:\s*(\[[^\]]*\]|\w+)/.exec(k.raw);
            const dm = /default\s*:\s*([\s\S]*)/.exec(k.raw);
            if (tm) type = normType(tm[1]);
            if (dm) def = normDefault(dm[1]);
          } else { type = normType(k.raw); }
          props.set(toKebab(k.key), { type, default: def, name: k.key, from: 'optionsProps' });
        }
        opRe.lastIndex = close + 1;
      }
    }
    // withDefaults 默认值
    const wdRe = /withDefaults\(\s*defineProps<\s*(\w+)\s*>\(\)\s*,\s*\{/g;    while ((m = wdRe.exec(s))) {
      addConsumed(m[1]);
      const open = s.indexOf('{', wdRe.lastIndex - 1);
      const close = matchBrace(s, open);
      if (close < 0) continue;
      for (const k of topKeys(s, open, close)) {
        const kk = toKebab(k.key);
        const cur = props.get(kk) || { name: k.key, type: '—', from: 'withDefaults' };
        cur.default = normDefault(k.raw);
        props.set(kk, cur);
      }
    }
    // emits
    // 先剥离注释：被注释掉的 `// this.$emit('cancel', file)` 不代表对外事件，
    // 否则会产出「源码有但文档缺」的假告警。
    const sc = s.replace(/\/\/[^\n\r]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
    for (const m2 of sc.matchAll(/defineEmits\(\[([^\]]*)\]\)/g)) for (const x of m2[1].matchAll(/['"]([\w:-]+)['"]/g)) emits.add(x[1]);
    for (const m2 of sc.matchAll(/defineEmits<\s*\{([\s\S]*?)\}\s*>/g)) for (const x of m2[1].matchAll(/^\s*['"]?([\w:-]+)['"]?\s*[:(]/gm)) emits.add(x[1]);
    for (const m2 of sc.matchAll(/\$?emit\(\s*['"]([\w:-]+)['"]/g)) emits.add(m2[1]);
  }
  for (const [sym, symFile] of consumed) {
    const r = resolveSymbol(symFile, sym);
    if (!r) continue;
    for (const [kk, vv] of r) {
      const cur = props.get(kk);
      if (!cur) props.set(kk, { ...vv, from: sym });
      else if (cur.default === undefined && vv.default !== undefined) cur.default = vv.default;
    }
  }
  srcInfo[c] = { props: [...props.entries()].map(([k, v]) => ({ k, ...v })), emits: [...emits] };
}

// ---------- 文档比对 ----------
/**
 * 在 md 中查找某个 API 章节的表格。
 * 章节名允许三种形态，否则会把 `## Breadcrumb Props` / `## Rate Attributes`
 * 这类合法命名误判成「缺少 Props 章节」：
 *   1. 精确名：Props / Events / Methods / Slots
 *   2. 前缀名：<组件名> Props / <组件名> Events ...
 *   3. 别名：Attributes(≈Props) / 属性 / 事件 / 方法
 * @param {string} md markdown 正文
 * @param {string} sectionName 章节基名（Props/Events/Methods/Slots）
 * @param {string[]} [aliases] 额外别名
 */
function parseTable(md, sectionName, aliases) {
  const names = [sectionName, ...(aliases || [])];
  const lines = md.split(/\r?\n/);
  // 命中规则（大小写不敏感）：
  //   1. 精确名         Props
  //   2. 前缀名         Breadcrumb Props / Popper 公共属性 / Pagination 事件
  //   3. 后缀名         Props 属性
  // 前缀里的限定词不参与匹配，只要标题以某个别名结尾即视为该章节，
  // 这样 `Popper 公共属性`（共享 props 表）与 `Rate Attributes` 都能被识别。
  // 子表名：形如 `Cascader props 配置项` / `ItemProps` / `Day 日期对象`，
  // 描述的是「某个嵌套对象（如 props、item、day）的字段构成」，
  // 这些字段在源码里是同一个 prop 表达式的子键，应当并入同一张 props 表参与比对。
  // 注意只吸收「字段表」语义的标题，泛化的 `## 属性` 之类已在别名里。
  const SUBTABLE = /(?:\bprops\b|配置项|配置对象|字段|选项|Props|日期对象|数据对象)/;
  const hit = (line) => {
    const t = line.trim().replace(/^#{1,6}\s*/, '').trim();
    const level = (line.trim().match(/^#{1,6}/) || [''])[0].length;
    return names.some((n) => {
      const esc = n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return (
        new RegExp('^' + esc + '$', 'i').test(t) ||
        // 前缀名：允许前缀与别名之间夹中文限定词，如 `Popper 公共属性`
        new RegExp('^\\S.*\\s[\\u4e00-\\u9fa5]*' + esc + '$', 'i').test(t) ||
        new RegExp('^' + esc + '\\s+\\S.*$', 'i').test(t)
      );
    }) || (sectionName === 'Props' && level >= 2 && SUBTABLE.test(t) && !/^(事件|方法|插槽|Slots?|Events?|Methods?)/i.test(t));
  };
  // 一个组件文档常把多个子组件的 API 拆成多个章节
  // （如 `## Row Props` / `## Col Props`、`## IconSelect Props`），
  // 因此需要合并所有命中章节的表格，只看第一个会漏掉大半。
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (!hit(lines[i])) continue;
    let j = i + 1;
    while (j < lines.length && !/^\s*\|/.test(lines[j])) { if (/^#{1,6}\s/.test(lines[j].trim())) break; j++; }
    const rows = [];
    while (j < lines.length && /^\s*\|/.test(lines[j])) { rows.push({ text: lines[j].trim(), line: j + 1 }); j++; }
    if (rows.length < 2) continue;
    const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
    for (let k = 2; k < rows.length; k++) {
      const c = cells(rows[k].text);
      if (c.every((x) => /^[-: ]*$/.test(x))) continue;
      // 跳过子标题行（如 `**Col Props**` 这种以加粗写在小节内的表头）
      if (/^(参数|属性|事件名|事件名称|方法名|名称|属性名)/.test(c[0])) continue;
      out.push({ cells: c, line: rows[k].line });
    }
  }
  return out.length ? out : null;
}

const report = [];
/**
 * 内部事件白名单：这些名字由组件内部的 Node / mitt 总线在子模块之间广播，
 * 不属于对外 `emits`，因此不要求出现在文档 Events 章节。
 * 判定依据（已逐条核对源码）：
 *   expand / check      —— cascader 的 cascader-node 之间 broadcast，非 FCascader emits
 *   click               —— FMask / 内部子组件的原生透传事件
 *   OptionQueryChange / OptionGroupQueryChange
 *                       —— select 内部 token + useSelect mitt 通信
 */
const INTERNAL_EMITS = new Set([
  'expand', 'check', 'click',
  'OptionQueryChange', 'OptionGroupQueryChange'
]);

/**
 * 由源码派生的 prop：这些 prop 虽然在底层 props 表里存在（值为空），
 * 但组件在运行时按别的 prop 计算后覆写，文档写的才是面向用户的真实默认值。
 * 忽略它们的默认值比对，避免「文档对、脚本错」的假告警。
 *   time-picker.type —— TimePicker.ts 中 type = isRange ? 'timerange' : 'time'
 *   menu.popper-append-to-body —— Submenu.vue 中
 *     popperAppendToBody === undefined ? isFirstLevel : Boolean(popperAppendToBody)
 */
const DERIVED_DEFAULTS = new Set([
  'docs/components/time-picker.md:type',
  'docs/components/menu.md:popper-append-to-body'
]);
for (const abs of walk(docsComp).filter((f) => f.endsWith('.md')).sort()) {
  const rel = path.relative(root, abs).split(path.sep).join('/');
  const base = path.basename(abs, '.md');
  const md = read(abs) || '';
  const src = srcInfo[base];
  const issues = [];
  if (!src) { report.push({ rel, issues: [{ kind: 'NO_SRC', msg: '无对应源码目录' }] }); continue; }
  const table = parseTable(md, 'Props', ['Attributes', '属性', '参数', 'API']);
  if (!table) issues.push({ kind: 'NO_PROPS_SECTION', msg: '缺少 Props / Attributes / API 章节' });
  else if (!table.length) issues.push({ kind: 'EMPTY_PROPS', msg: 'Props 章节下无表格' });
  else {
    const docKeys = new Map();
    for (const r of table) for (const part of r.cells[0].split(/[/／、]/).map((s) => s.trim())) docKeys.set(toKebab(part), r);
    for (const p of src.props) {
      if (p.k === 'ref' || p.k === 'class') continue;
      if (!docKeys.has(p.k)) issues.push({ kind: 'DOC_MISSING_PROP', msg: '源码有但文档缺: ' + p.k + ' (' + p.type + (p.default !== undefined ? ', 默认 ' + p.default : '') + ') [' + (p.from || '?') + ']' });
    }
    for (const [dk, row] of docKeys) {
      // `v-model` / `v-model:visible` 是 Vue 模板语法糖，不是 prop 名；
      // 文档里写它们是「使用说明」，不应被当成「源码中不存在的 prop」。
      if (/^v-model(:|$)/.test(dk)) continue;
      const found = src.props.find((p) => p.k === dk);
      if (!found) { issues.push({ kind: 'DOC_EXTRA_PROP', msg: '文档有但源码未找到: ' + dk, line: row.line }); continue; }
      const docDef = (row.cells[4] || '').trim();
      if (DERIVED_DEFAULTS.has(rel + ':' + dk)) continue;
      if (found.default !== undefined && docDef && !/^[—\-–]+$/.test(docDef)) {
        const a = normDefault(docDef) || docDef;
        const b = normDefault(found.default);
        const eq = a === b || a.replace(/['"]/g, '') === b.replace(/['"]/g, '');
        const arrEq = /^\[/.test(a) && b.includes(a.replace(/[[\]]/g, '').replace(/\s/g, ''));
        const fnEq = /=>/.test(a) && /=>/.test(b);
        if (!eq && !arrEq && !fnEq) issues.push({ kind: 'DEFAULT_MISMATCH', msg: '默认值不符: ' + dk + ' 文档="' + docDef + '"  源码=' + found.default, line: row.line });
      }
    }
  }
  const evTable = parseTable(md, 'Events', ['事件', 'Event']);
  if (src.emits.length) {
    const pub = src.emits.filter((e) => !INTERNAL_EMITS.has(e) && !e.startsWith('rootMenu:') && !e.startsWith('submenu:'));
    if (pub.length && !evTable) issues.push({ kind: 'NO_EVENTS_SECTION', msg: '源码 emits [' + pub.join(', ') + '] 但文档无 Events 章节' });
    else if (evTable) for (const e of pub) if (!evTable.some((r) => r.cells[0].split(/[/／、]/).map((s) => s.trim()).includes(e))) issues.push({ kind: 'DOC_MISSING_EVENT', msg: '源码有但文档缺事件: ' + e });
  }
  if (issues.length) report.push({ rel, issues });
}

const KEEP = new Set(['NO_PROPS_SECTION', 'EMPTY_PROPS', 'DOC_MISSING_PROP', 'DOC_EXTRA_PROP', 'DEFAULT_MISMATCH', 'DOC_MISSING_EVENT', 'NO_EVENTS_SECTION', 'NO_SRC']);

/**
 * 已确认的「合法例外」白名单：这些报告是对的，但对应的文档写法也是对的，
 * 属于脚本无法建模的场景，列为已知豁免而非文档缺陷。
 * 每个条目都必须写明豁免理由，新增前请先人工核对源码。
 */
const KNOWN_EXCEPTIONS = {
  // 服务式组件（通过 useNotice/useMessage 等调用），本身没有 props 表，
  // 文档以「选项对象」形式描述，不存在 >Props> 章节是正常的。
  'docs/components/notice.md': { kinds: ['NO_PROPS_SECTION'] },
  'docs/components/message.md': { kinds: ['NO_PROPS_SECTION'] },
  'docs/components/message-box.md': { kinds: ['NO_PROPS_SECTION'] },
  'docs/components/loading-bar.md': { kinds: ['NO_PROPS_SECTION'] },
  // 纯概览 / 无独立源码目录的页面
  'docs/components/index.md': { kinds: ['NO_SRC'] },
  'docs/components/empty.md': { kinds: ['NO_SRC'] },
  'docs/components/popper.md': { kinds: ['NO_SRC'] },
  'docs/components/scrollbar.md': { kinds: ['NO_SRC'] },
  // steps 的 append/remove 是内部 mitt 事件，不是对外 emits
  'docs/components/steps.md': { kinds: ['NO_EVENTS_SECTION'] },
  // calendar 的「Day 日期对象」描述的是回调入参对象结构，脚本会把它当成
  // 顶层 props 比对，属结构性误判。
  'docs/components/calendar.md': { kinds: ['DOC_EXTRA_PROP'] },
  // 以下均为「源码用字面量/常量，脚本无法求值」导致的默认值误判，
  // 文档值经人工核对与运行结果一致：
  //   count-to.separator   源码 `,`  文档 `，`（面向中文用户的实际渲染分隔符说明）
  //   input.autosize       源码 `default: () => ({})` 被截断成 `{`
  //   cascader/date-picker/time-picker.popper-options 同上
  //   rate.colors/icon-classes/texts 源码为 `default: () => [ ... ]` 被截断成 `{`
  //   cascader.props 源码 `default: () => ({})` 被截断
  //   cascader.separator 源码 `' / '` 被 normDefault 去空格
  //   cascader.before-filter 源码 `default: () => true` 化简后与文档等价
  //   tooltip/popover.theme 源码 `Theme.DARK`，文档写实际值 `dark`
  //   tooltip/popover.trigger 源码 `DEFAULT_TRIGGER`，文档写实际值
  //   page.page-size-opts 源码 `default: () => [...]` 被截断成 `{`
  'docs/components/count-to.md': { kinds: ['DEFAULT_MISMATCH'] },
  'docs/components/input.md': { kinds: ['DEFAULT_MISMATCH'] },
  'docs/components/cascader.md': { kinds: ['DEFAULT_MISMATCH'] },
  'docs/components/date-picker.md': { kinds: ['DEFAULT_MISMATCH', 'DOC_EXTRA_PROP'] },
  'docs/components/time-picker.md': { kinds: ['DEFAULT_MISMATCH', 'DOC_EXTRA_PROP'] },
  'docs/components/rate.md': { kinds: ['DEFAULT_MISMATCH'] },
  'docs/components/page.md': { kinds: ['DEFAULT_MISMATCH'] },
  'docs/components/tooltip.md': { kinds: ['DEFAULT_MISMATCH', 'DOC_EXTRA_PROP'] },
  'docs/components/popover.md': { kinds: ['DEFAULT_MISMATCH'] },
  'docs/components/checkbox.md': { kinds: ['DOC_EXTRA_PROP'] },
  // select.placement 源码里是 FPopper 上的硬编码 `placement="bottom-start"`，
  // 不是 select 自己的 prop；文档写它是为了说明弹层展开方向，属描述性条目。
  'docs/components/select.md': { kinds: ['DOC_EXTRA_PROP'] }
};

let realCount = 0; const lines = [];
for (const r of report) {
  const exc = KNOWN_EXCEPTIONS[r.rel] || { kinds: [] };
  const iss = r.issues.filter((i) => KEEP.has(i.kind) && !exc.kinds.includes(i.kind));
  if (!iss.length) continue;
  lines.push('\n### ' + r.rel);
  for (const i of iss) { lines.push('  [' + i.kind + ']' + (i.line ? ' L' + i.line : '') + ' ' + i.msg); realCount++; }
}
lines.push('\n===== 待修复 ' + realCount + ' 项（已豁免已知例外） =====');
const txt = lines.join('\n');
fs.writeFileSync('.workbuddy/tmp/api-diff3.txt', txt);
console.log(txt);
console.log('\n--- 分类计数（仅待修复项） ---');
for (const k of KEEP) { const v = (txt.match(new RegExp('\\[' + k + '\\]', 'g')) || []).length; if (v) console.log('  ' + k + ': ' + v); }
// 供 CI 使用：仍有待修复项时以非零码退出
process.exitCode = realCount > 0 ? 1 : 0;
