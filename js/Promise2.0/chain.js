// 到目前为止,还没有实现标准里面的链式调用
// 思路是返回一个 新的promise,并将这个新的promise的控制权交给当前promise

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
    //如果传进来的还是一个promise就把当前promise的状态切换全交给他
    if (value && (typeof value === "object" || typeof value === "function")) {
      var then = value.then;
      if (typeof then === "function") {
        then.call(value, this._resolve.bind(this));
        return;
      }
    }
    this.state = FULFILLED;
    //保存值
    this.value = value;
    //将回调的触发设置成微任务
    process.nextTick(() => {
      this.callbacks.forEach((connectionBlock) => {
        this._control(connectionBlock);
      });
    });
  }
  //then方法暴露给外界注册回调
  then(onfulfilled) {
    //新的promise负责依赖当前promsie的状态改变自己的状态
    return new Promise2((resolve) => {
      this._control({
        onfulfilled: onfulfilled || null,
        resolve: resolve,
      });
    });
  }
  //接受一个关联块
  _control(connectionBlock) {
    if (this.state === PENDING) {
      this.callbacks.push(connectionBlock);
      return;
    }
    //状态已经该改变,获得回调的结果传递给新的promsie
    if (!connectionBlock.onfulfilled) {
      //如果没有注册回调,直接把当前promise的值传给下一个promise
      connectionBlock.resolve(this.value);
      return;
    } else {
      let thenRet = connectionBlock.onfulfilled(this.value);
      connectionBlock.resolve(thenRet);
      return;
    }
  }
}
