---
title: 安装
---

<card>

注意，fei-ui-design 仅支持 Vue3。

## 最新版本

[![NPM version](https://img.shields.io/npm/v/fei-ui-design.svg)](https://www.npmjs.com/package/fei-ui-design)

## 安装依赖

推荐使用 pnpm 进行安装，它能更好地和打包工具配合使用。而且可以更好的和 typescript 配合使用。并且支持按需引入

```bash
pnpm add fei-ui-design
# or
npm i fei-ui-design
# or
yarn add fei-ui-design
```

> 包内声明了 `engines.node: ">=20.0.0"`。构建该库所需的工具链要求 Node.js 20 以上，
> 使用库本身则不受此限制（产物同时提供 ESM 与 CJS）。若你的项目开启了 `engine-strict`，
> 请在 Node.js 低于 20 的环境下注意这一约束。

## 在 SFC 中使用

推荐在 SFC 单文件组件风格(SFC - Single File Component)环境中进行使用，可以选择直接引入或全局安装在 Vue App 中。

参考[在 SFC 中使用](/guide/usage-sfc)

</card>
