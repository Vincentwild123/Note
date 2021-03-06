# Rollup.js

### 概述

javascript 打包器, rollup 使用 ES6 模块格式, ES6 模块可以让你使用你最喜爱的库中的某些函数, 而不必引入不必要的代码, 可以进行 tree-shaking

### 使用

1. 安装

2. 命令行 or API 进行配置

3. 生成的格式分别可以是 cjs and iife and UMD(立即执行函数)

   **番外 --- javascript 模块化形式**

   - CJS node 端的写法, 直接导入整个对象, 是模块文件对象的拷贝
   - AMD 浏览器端写法, 使用回调函数的写法异步导入模块
   - UMD 统一模块语法, 前后端通用, rollup/webpack 打包出来的东东
   - ESM JS 标准模块语法, 浏览器实现

4. 因为模拟实现 ES6 语法,所以可以进行 tree-shaking,当使用 CJS 语法时,需要引入插件

### 配置文件

**本质上, rollup 统一使用 ES6modue 语法, 所以配置文件就是一个模块, 他导出一个对象, 对象上的字段就是配置文件**

1. 命令行形式写法 ---- 详见配置文件列表

   [rollup 配置文件](https://www.rollupjs.com/guide/big-list-of-options)

2. js 写法

```javascript
   const rollup = require('rollup');
   // see below for details on the options
   const inputOptions = {
       ...
   };
   const outputOptions = {
       ...
   };
   async function build() {
       // create a bundle
       const bundle = await rollup.rollup(inputOptions);
       console.log(bundle.imports); // an array of external dependencies
       console.log(bundle.exports); // an array of names exported by the entry point
       console.log(bundle.modules); // an array of module objects
       // generate code and a sourcemap
       const {
           code,
           map
       } = await bundle.generate(outputOptions);
       // or write the bundle to disk
       await bundle.write(outputOptions);
   }
   build();
```
