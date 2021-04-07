// 本质上是观察者模式
// then 方法注册回调
// resolve reject方法控制状态
class Promise2 {
  constructor(fn) {
    this.callbacks = [];
    //传入函数立即执行
    fn(this._resolve.bind(this));
  }
  //处理成功时的函数,将失败的原因作为参数传递给回调函数队列并依此触发
  _resolve(value) {
    this.callbacks.forEach((cb) => {
      cb(value);
    });
  }
  //then方法暴露给外界注册回调
  then(onfulfilled) {
    this.callbacks.push(onfulfilled);
  }
}
