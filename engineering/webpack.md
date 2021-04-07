# webpack

### 定义

## **webpack 是一个 js 应用程序静态模块打包器,递归构建依赖关系图(dependency graph),包含应用程序需要的每个模块,再将所有这些模块打包成 bundle**

### 核心概念简述

1.  入口(entry)
    **作为构建依赖图的开始,可以有多个入口**
    `entry:'main.js'`
2.  输出(output)
    **指定 bundle(一捆模块)输出到哪,默认为./dist**

```js
output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js'
}
```

3.  loaders
    **将所有文件转换为依赖图可以引用的模块,为不同文件配置相应的 loader(test,use)**

```js
modules: {
  rules: [{ test: /\.txt$/, use: "loader-name" }];
}
```

4.  插件(plugins)
    **插件接口,require()引入,实例化再添加到 plugins 数组,功能打包压缩优化**

```js
plugins: [new HtmlWebpackPlugin({ templace: "./src/index.html" })];
```

5.  模式(mode)
    **区分线上环境还是开发环境**

---

### 配置

1.  入口(entry)
    **设置方式:entry:[string/Array/Object],为不同的依赖图设置不同的入口文件,最后将依赖导向同一个 chunk**

- 对象写法可以将用户自己的代码和地方库入口分离
- 使用 CommonsChunkPlugin 插件可以将不同页面的共享代码部分创建共享 bundle,从而复用大量代码

2.  输出(output)
    **设置方式:object{filename,path}**

- 对于多入口文件,拥有一个 name 变量代表入口名,使用这个入口名来进行文件名命名就可以避免每个入口文件有不同的出口 bundle
- 对入口文件名进行 hash,或者动态设置公共路径的 hash 值

3.  模块(module)
    **最外层的对象**

- module.noParse 正则表达式 让 module 不去解析匹配的文件
- module.rule 数组 匹配请求的规则数组,这些规则能够修改模块的创建方式

  - 组成

    - 条件(condition)

      - resource 请求文件的绝对路径 '/path/to/style.css'
      - issuer 发出请求的模块文件的绝对路径 'path/to/app.js'
      - 匹配规则
        - test,include,exclude,resource 对 resource 进行匹配
        - issuer 对 issuer 进行匹配

    - 结果(result)
      **条件匹配通过后再使用**

      - 两种输入值
        - loader 应用在匹配文件上的 loader 数组
        - parse 用于为模块创建解析器的选项对象
      - 选项对输入值的影响
        - enforce,loader,options,use 会对 loader 产生影响
        - parser 会对 parse 产生影响

    - 嵌套规则(nested rule)
      **可以使用 rules,oneOf 指定嵌套规则**

  - 属性

  * enforce ["pre"|"post"] 所有的 loader 按照前置,行内,普通,后置排序,并按照此顺序进行使用
  * exclude
  * include
  * issuer(发布者) 需求者的路径
  * loader
  * loaders
  * oneOf
  * options
  * parser 解析器的配置,或开关

4. resolve
   **这些选项设置模块如何被解析**
   - resolve 配置模块如何被解析,resolve 选项能够对 webpack 解析 import 导入的文件的方式做修改
   - 属性
     - alias 创建 import 或 require 的别名,使得模块引入变得简单,例如 vue 中的@引入,在别名后面加\$表示精准解析
     - modules 指定模块搜索目录
5. 插件(plugins)
   **作用与所有模块的构建过程**

6. devServer 开发服务器

# 优化

1. 优化构建速度
   1. 缩小文件搜索范围
      1. resolve 字段
         - 配置 resolve.module 字段,告诉 webpack 模块搜索目录
         - 配置 resolve.mainFields 为 main,告诉 webpack 使用哪个字段导入模块
         - 对庞大的库配置,alias 别名,使 webpack 直接导入 min 文件,避免库内解析
         - 尽可能的写上文件后缀
      2. 配置 module.noParse 告诉 webpack 避免解析一些文件
      3. 配置 loader 时,通过 test,exclude,include 所缩小搜索范围
   2. 使用 DllPlugin 减少基础模块编译次数
   3. 使用 HappyPack 开启多进程进行 loader 的转化

```js
npm i -D happypack
// webpack.config.json
const path = require('path');
const HappyPack = require('happypack');

module.exports = {
    //...
    module:{
        rules:[{
                test:/\.js$/，
                use:['happypack/loader?id=babel']
                exclude:path.resolve(__dirname, 'node_modules')
            },{
                test:/\.css/,
                use:['happypack/loader?id=css']
            }],
        plugins:[
            new HappyPack({
                id:'babel',
                loaders:['babel-loader?cacheDirectory']
            }),
            new HappyPack({
                id:'css',
                loaders:['css-loader']
            })
        ]
    }
}
```

    4. 使用ParallelUglifyPlugin开启多进程压缩JS文件

```js
npm i -D webpack-parallel-uglify-plugin
// webpack.config.json
const ParallelUglifyPlugin = require('wbepack-parallel-uglify-plugin');
//...
plugins: [
    new ParallelUglifyPlugin({
        uglifyJS:{
            //...这里放uglifyJS的参数
        },
        //...其他ParallelUglifyPlugin的参数，设置cacheDir可以开启缓存，加快构建速度
    })
]
```

2. 优化开发体验

   1. 自动刷新: webpack 监听文件,devServer 进程刷新浏览器
   2. 开启模块热替换 HMR

3. 优化输出质量,压缩文件体积
   1. 根据不同的生产环境,依据环境变量来进行不必要的插件和代码的 if-else 选择
   2. 压缩代码
      - 压缩 JS:配置 UglifyJS,ParallelUglifyPlugin 插件

```js
const UglifyJSPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
//...
plugins: [
  new UglifyJSPlugin({
    compress: {
      warnings: false, //删除无用代码时不输出警告
      drop_console: true, //删除所有console语句，可以兼容IE
      collapse_vars: true, //内嵌已定义但只使用一次的变量
      reduce_vars: true, //提取使用多次但没定义的静态值到变量
    },
    output: {
      beautify: false, //最紧凑的输出，不保留空格和制表符
      comments: false, //删除所有注释
    },
  }),
];
```

- 压缩 ES6

```js
npm i -D uglify-webpack-plugin@beta //要使用最新版本的插件
//webpack.config.json
const UglifyESPlugin = require('uglify-webpack-plugin');
//...
plugins:[
    new UglifyESPlugin({
        uglifyOptions: {  //比UglifyJS多嵌套一层
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true
            },
            output: {
                beautify: false,
                comments: false
            }
        }
    })
]
```
+ 压缩CSS:css-loader?minimize,PurifyCSSPlugin

3. Tree Shaking
+ 启动
  1. 修改babelrc配置文件,module:"false",关闭Babel转换功能,保留ES6模块化语法
  2. 启动webpack时带上 --display-used-exports 可以在shell打印出关于代码剔除的提示
  3. 使用UglifyJSPlugin,或者启动时使用--optimize-minimize
  4. 在使用第三方库时，需要配置 resolve.mainFields: ['jsnext:main', 'main'] 以指明解析第三方库代码时，采用ES6模块化的代码入口

4. 加速网络请求
