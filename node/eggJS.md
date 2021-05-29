### MVC 和 MVVM

1. MVC ---- 数据模型 model、视图 View、控制器 controller,一种数据流动的思想

因为逻辑处理在系统庞大之后会变得臃肿, 就从中抽离出 Servce, 业务层

View 层: 收集用户信息, 呈现数据, 负责交互

Controller: 数据预处理, 将多个业务逻辑形成流程的封装

Service: 某个具体业务逻辑

Model: 保存业务要用到的数据及历史版本, 采用持久化数据结构, 与数据库交互的封装

Router: 辅助层, 任务是将请求与 controller 中的 handle 进行匹配, 也属于 controller 层剥离出来的一部分

2. MVVM ---- 一种同步的关系,将页面变化同时反映到数据里,同时将数据的变化在页面上反映出来

Model, View 层被定死

### 1. Node 常用模板引擎

1. jade/ejs/art-template

jade: 简洁, 缩进表示层级, 具有破坏性, 移植或者组合其他 html 代码需要重写, 可以写一个将 html 转换成 jade 的语法分析器

ejs: 类似 html, 用<% %>标签嵌入数据

art-template: 前端渲染模板

### Egg.js

**只提供 web 开发的核心功能, 和插件机制**

1. 与其他框架的对比

- express: 本身缺少约定, 对 MVC 标准实现会有千奇百怪的写法
- sails: 有过多的集成, 不够灵活和简便, 使用插件机制就可以自定制功能

2. 特点

- 服务于企业级应用, 为上层框架提供基础
- 插件机制, 既能够做到简单, 也能够完成任务
- 基于 KOA 框架, 性能优越, 内置多进程管理

3. koa 与 express

- koa 和 express 都采用中间件的模型, koa 采用的是洋葱模型的中间件, express 采用的是线性中间件
- koa 的 context, 作为贯穿整个处理流程的挂载体, express 则只有 application, request, response, router 四个大对象, 语义不明确
- 采用 async/await 的异步格式书写代码, 方便错误捕捉, express 采用古老的回调函数形式

### 目录规范

1. 整体配置
2. 核心文件 app

- controller
- router
- service
- model
- middleware
- extend
- view

3. config 项目配置文件
4. 测试文件

### 内置对象

1. koa 继承对象

- application(框架层全局对象)

_在其上会触发响应事件_

每个被框架 loader 加载的模块都可以导出一个函数, 这个函数会被 loader 调用, 并传入 app 作为参数

- context(请求层全局对象)
- request(请求级别对象)
- response(请求级别对象)

2. 框架拓展对象

- controller(controller 的基类, 这个基类上已经挂载了上述的全局属性)
- service(同上)
- helper(工具模块)
- config(全局配置对象)
- logger(内置的日志功能对象, 开箱即用)
- Subscription(订阅者对象)

### 多进程与进程间通信

1. egg 将 messager 对象挂载在 app/agent 实力上,能够用它的一些 api 在生产环境里进行观察者模式的事件监听

### 番外: 进程间通信的 7 种方式

1. 管道/命名管道:半双工的数据流动,只能是有血缘关系的父子进程间流动,内核缓冲区,先进先出的队列

2. 消息队列:内核维护一个链表,链表的每一项都是一条消息,进程可以向该链表中增加消息,每条消息有自己的 type,各进程根据自己的情况读取消息

3. 信号量:用于管理进程间通信和进程间同步的锁的机制,用信号量的方式模拟物理资源的数量

4. 套接字:socket,可用于不同主机间的进程间通信

5. 共享内存:映射一段能被其他进程访问的内存,常常需要设置锁
