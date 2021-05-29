1.仅限于介绍 Node 的特定全局对象,对于原生 js 的全局对象也适用

1. whatwg: Web Hypertext Application Technology Working Group 浏览器产商和 W3C 博弈的产物,没有 IE
2. Buffer 类,用于处理二进制数据
3. setImmediate/setInterval/setTimeout 定时器三兄弟
4. clearImmediate/clearInterval/clearTimeout 回收定时器三兄弟
5. console,控制台对象,用于打印到标准输出
6. global,全局的命名空间对象,预设了一些属性
7. process,进程对象
8. queueMicrotask 放入微任务队列(由 V8 引擎管理)
9. process.nextTick 队列,每次事件循环轮询的时候,始终在微任务队列之前执行
10. TextDecoder/TextEncoder 类
11. URL/URLSearchParams 类
