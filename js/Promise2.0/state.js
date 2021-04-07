// 当前promise已经能够异步触发了,但是触发完成之后的回调就不会执行
// 所以要给promise设置状态,回调按照状态异步执行(状态未改变)或者直接执行
// 另外要保存值用于传给后注册上来的回调函数
const PENDING = Symbol("PENDING");
const FULFILLED = Symbol("FULFILLED");
class Promise2 {
  constructor(fn) {
    this.state = PENDING;
    this.callbacks = [];
    //传入函数立即执行
    fn(this._resolve.bind(this));
  }
  //处理成功时的函数,将失败的原因作为参数传递给回调函数队列并依此触发
  _resolve(value) {
    // 改变状态
    this.state = FULFILLED;
    //保存值
    this.value = value;
    //将回调的触发设置成微任务
    process.nextTick(() => {
      this.callbacks.forEach((cb) => {
        cb(value);
      });
    });
  }
  //then方法暴露给外界注册回调
  then(onfulfilled) {
    //修改then方法,如果状态已经改变,直接触发回调
    if (this.state === FULFILLED) onfulfilled(value);
    //否则推到队列
    else this.callbacks.push(onfulfilled);
  }
}

