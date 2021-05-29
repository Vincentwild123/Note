### babel 可以将前沿语法提前应用于实际

### 可以翻译

1. ES2015+
2. JSX
3. Flow/Ts 类型注释

### 插件化机制

### 核心包

1. @babel/core
2. @babel/cli
3. @babel/env:对目标浏览器缺失功能进行转换
4. @babel/polyfill:模拟新的 js 语法
5. preset:plugin 的集合
6. plugin:小型转换函数

#### 配置

1. babel.config.json

```json
{
  "presets": []
}
```

2. .babelrc.json

```json
{
  "presets": [],
  "plugins": []
}
```

3. package.json

```json
{
  "babel": {
    "presets": [],
    "plugins": []
  }
}
```

4. 命令行
   --presets
   --plugins

5. API 式

```js
require("@babel/core").transformSync("code", {
  plugins: [],
});
```
