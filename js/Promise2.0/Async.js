// 很明显目前的promise利用then方法注册的回调需要在resolve之前,否则一旦resolve,再也不会触发回调
// 加入异步触发机制
// 这里为了更加的符合规范(promise是微任务),所以采用node里的原生微任务,process.nextTick,
// 浏览器使用 mutationObserver
class Promise2 {
  constructor(fn) {
    this.callbacks = [];
    //传入函数立即执行
    fn(this._resolve.bind(this));
  }
  //处理成功时的函数,将失败的原因作为参数传递给回调函数队列并依此触发
  _resolve(value) {
    //将回调的触发设置成微任务
    process.nextTick(() => {
      this.callbacks.forEach((cb) => {
        cb(value);
      });
    });
  }
  //then方法暴露给外界注册回调
  then(onfulfilled) {
    this.callbacks.push(onfulfilled);
  }
}