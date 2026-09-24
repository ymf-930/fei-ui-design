---
title: 变更日志
---

本页收录组件库的发布记录：**当前版本列在最上方**，2023 年重构前的旧版本见文末「历史记录」。
权威记录仍是仓库根目录的 `CHANGELOG.md`，其格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循[语义化版本](https://semver.org/lang/zh-CN/)。

> 说明：文末 0.0.1 ~ 0.0.4 是重构前的旧版本号；重构后版本号重新从 `0.0.2` 起算
> （见根目录 `CHANGELOG.md` 与 `package.json`），两者不是同一条版本线，请勿混用。

<div class="change-log">
  <h2 id="v-unreleased" class="version">未发布</h2>
  <div class="date">2026-09-24 起</div>
  <div class="type">Feats</div>
  <p class="log-item"><i>🍀</i>文档站：补齐站内搜索，完善导航、侧边栏与明暗切换（含圆形揭开动效）</p>
  <p class="log-item"><i>🍀</i>文档站：标题 / 正文 / 列表 / 代码块 / 表格的排版统一到单一权威层</p>
  <p class="log-item"><i>🍀</i>首页演示区统一由组件库真实组件渲染，与组件文档页表现一致</p>
  <div class="type">Fix</div>
  <p class="log-item"><i>🛠️</i>修复页内链接与悬浮提示中的英文残留</p>
  <p class="log-item"><i>🛠️</i>清除被浏览器静默丢弃的样式（未定义的 Stylus 变量），并纳入产物护栏</p>
  <div class="type">Chore</div>
  <p class="log-item"><i>🧹</i>删除不可达的主题组件 / 样式文件与孤儿静态资源（合计约 10.3 MB）</p>
</div>
<div class="change-log">
  <h2 id="v0-0-2-now" class="version">0.0.2</h2>
  <div class="date">2026-09-13</div>
  <div class="type">Feats</div>
  <p class="log-item"><i>🍀</i>新增 button-group 组件文档与示例</p>
  <div class="type">Fix</div>
  <p class="log-item"><i>🛠️</i>修复按需样式产物在 Windows 下静默缺失（<code>es|lib/&lt;组件&gt;/styles/index.css</code>）</p>
  <p class="log-item"><i>🛠️</i>修复暗色主题缺失变量、表单 size 校验器失效，以及若干模块的导入错误</p>
  <p class="log-item"><i>🛠️</i>声明文件不再重复输出到三处，统一与 JS 同目录</p>
  <div class="type">Refactor</div>
  <p class="log-item"><i>♻️</i>组件 name 与导出一律采用 <code>F</code> 前缀 PascalCase</p>
  <p class="log-item"><i>♻️</i>vue 调整为 peerDependencies；补齐 exports / sideEffects / engines / files</p>
</div>

## 历史记录（重构前）

<div class="change-log">
  <h2 id="v0-0-4" class="version">0.0.4</h2>
  <div class="date">2023-10-08</div>
  <div class="type">Feats</div>
  <p class="log-item"><i>🍀</i>新增全局配置组件</p>
  <p class="log-item"><i>🍀</i>新增滚动组件</p>
  <p class="log-item"><i>🍀</i>新增布局layout组件</p>
  <p class="log-item"><i>🍀</i>新增卡片组件card</p>
  <p class="log-item"><i>🍀</i>新增单选组件radio</p>
  <p class="log-item"><i>🍀</i>新增分割面板组件split</p>
  <p class="log-item"><i>🍀</i>新增间距组件space</p>
  <p class="log-item"><i>🍀</i>新增栅格布局组件grid</p>
  <p class="log-item"><i>🍀</i>新增下拉菜单组件dropdown</p>
  <p class="log-item"><i>🍀</i>新增标签组件tag</p>
  <p class="log-item"><i>🍀</i>新增消息组件message</p>
  <div class="type">Fix</div>
  <p class="log-item"><i>🛠️</i>修改部分配置</p>
  <div class="type">Docs</div>
  <p class="log-item"><i>📖</i>文档库完成优化，修改整体文档样式</p>
  <p class="log-item"><i>📖</i>完成文档日志部分的样式优化</p>
  <p class="log-item"><i>📖</i>新增组件迁移进度统计文档</p>
</div>
<div class="change-log">
  <h2 id="v0-0-3" class="version">0.0.3</h2>
  <div class="date">2023-08-23</div>
  <div class="type">Feats</div>
  <p class="log-item"><i>📖</i>完成基础文档搭建</p>
  <p class="log-item"><i>🍀</i>完成组件文档编写，完成button、icon、tooltip、collapse组件以及文档</p>
</div>
<div class="change-log">
  <h2 id="v0-0-2" class="version">0.0.2</h2>
  <div class="date">2023-08-22</div>
  <div class="type">Feats</div>
  <p class="log-item"><i>📖</i>完成组件文档初始化</p>
  <p class="log-item"><i>🍀</i>完成编译环境</p>
  <p class="log-item"><i>🍀</i>新增按钮组件</p>
</div>
<div class="change-log">
  <h2 id="v0-0-1" class="version">0.0.1</h2>
  <div class="date">2023-08-21</div>
  <div class="type">Feats</div>
  <p class="log-item">初始化工程</p>
  <p class="log-item">初始化文档</p>
</div>

<style scoped>
  .vp-doc {
    .change-log {
      margin-top: 24px;
      border-bottom: 1px solid #eee;
    }
    .version {
      display: inline-block;
      vertical-align: middle;
      padding: 0 16px;
      font-size: 22px;
      font-weight: 500;
      border: 1px solid #1890ff;
      border-radius: 5px;
      border-top: none;
      border-bottom: none;
    }
    .date {
      display: inline-block;
      vertical-align: middle;
      margin: 0 15px;
      background: var(--fei-theme-bg2);
      padding: 0.1em 0.4em;
      border-radius: 3px;
      font-size: 0.9em;
      border: 1px solid #eee;
    }
    .type {
      margin-top: 16px;
      font-weight: 500;
      font-size: 18px;
    }
    .log-item {
      position: relative;
      padding-left: 30px;
      &::before {
        content: '';
        position: absolute;
        left: 14px;
        top: 8px;
        width: 0;
        height: 0;
        transform: rotateZ(90deg);
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 6px solid #5e6d82;
      }
      > i {
        margin-right: 6px;
      }
    }
  }
</style>
