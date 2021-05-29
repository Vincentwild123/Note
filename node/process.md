1. process 是个全局对象,无需显示 require
2. 是 EventEmitter 的实例
3. 进程事件
   1. beforeExit :没事可干时触发,参数为 process.exitCode,可以传入监听器,阻止程序退出
   2. exit: 显示调用 process.exit 方法,或者没事干的时候触发,一旦触发,监听器函数执行完马上退出
   3. message :IPC(进程间通信不一定在同一台计算机上)衍生的 Node 进程,当子进程收到父进程的 childprocess.send 发送的消息时触发
   4. disconnect:IPC 通道关闭时触发
   5. multipleResolves:promise 被多次改变状态触发
   6. rejectionHandled/uncaughtException/uncaughtExceptionMonitor
   7. process.cwd()/process.config/process.debugPort = 5858/process.env
   8. process.nextTick:使回调函数代码马上执行
