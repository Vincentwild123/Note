1. EventEmitter 类
2. 继承至 EventEmitter 类的实例拥有以下方法

   1. on/emit 注册事件,触发事件
   2. 监听器函数的 this 会被绑定到监听的 eventEmitter 实例

3. 注册的事件监听器会按照注册的顺序调用
4. once 注册一次的监听器
5. error 事件,如果没有注册事件监听器,node 进程会被强制退出
6. 监听器变化触发事件
   1. 添加 newListener
   2. 移除 removeListener
7. 同一个事件最多设置 10 个事件监听器, emitter.setMaxListeners(n),EventEmitter. defaultMaxListeners 可以改变这个顺序
8. emitter.eventNames 返回已经注册了监听器的事件名数组
9. emitter.listenerCount 返回某事件的监听器数量
10. emitter.prependListener(eventName, listener),添加到链表头
