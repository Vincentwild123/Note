### 对外接口
1. CLI 命令行，早期原型制作和性能分析情况特别有用
2. Node 在CLI层之上，可以起到颗粒度更小的控制
3. Loaders 将源代码作为输入，转换之后的源代码作为输出的函数体
4. 插件plugins 在整个编译流程里，拥有每个编译阶段的全部权限访问权力
5. 模块 受支持的方法和变量

### CLI 与配置文件等价映射
1. 命令
2. Flags
3. 默认配置：寻找顺序 webpack.config.js > webpack/webpack.config.js > webpack/webpackfile
4. 命令行配置优先级高于配置文件

### Node接口
##### 1. 引入webpack模块
```javascript
const webpack = require('webpack');
webpack({
    //配置对象
},(err,stats)=>{

})
```
1. 如果不设置回调函数，就会返回一个compiler示例，存run方法和watch方法，其中run方法可以开启编译，watch也可以开启编译，但会监听变更
```javascript
const webpack = require('webpack');
const compiler = webpack({

})
compiler.run((err,stats)=>{

})
```
##### 2. stats对象 --- 包含错误警告信息，计时信息，module和chunk信息
- assets:代表输出一个输出文件
- chunk:相互依赖的模块组
- modules:基本模块单元

##### 3. loaders接口
1.  本质上是一个函数，接收源代码返回string或者buffeer作为原来的module的新的值，注意一个异步问题
2.  同步loader必须调用this.callback，异步loader必须调用this.async，其返回值就是this.callback

##### 4. compiler创造出compilation，继承自tapable
1. 具备监听机制，被设置于诸如webpack-dev-server工具底层
2. 钩子
```javascript
compiler.hooks.someHook.tap('MyPlugin',(params)=>{

})
```
##### 5.plugin 拥有compiler对象的所有访问权限
1. Tapable库，一个核心工具库，可以移植，提供类似的插件接口



