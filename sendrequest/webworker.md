## web worker和service worker
web worker 开辟一个新的线程上下文，受到资源访问权限控制，不能访问主线程中的某些资源，例如DOM，alert，commfit，api但能进行数据处理，ajax请求等，常用于复杂的图像计算，耗时计算等场景


service worker 常用于离线缓存


区别：
1. service worker用于离线缓存，web worker用于耗时脚本执行

2. web worker服务于特定的页面，页面关闭就推出，service worker不服务于特定页面，属于浏览器层，只能由浏览器本身关闭或者删除

3. 生命周期和可使用的api也不同

相同点：
1. 使用postmessage进行线程间通信
2. 开辟新的执行上下文


## web worker分析

1. 执行的脚本必须是同源脚本
2. 不能访问页面层的API例如document，window
3. 加载的文件资源必须来源于网络
4. 传输的数据是序列化出来的，互相独立


## service worker
1. 事件驱动，具有生命周期
2. 注册，安装，完。。。。