//添加静态函数
const PENDING = Symbol("PENDING");
const FULFILLED = Symbol("FULFILLED");
const REJECTED = Symbol("REJECTED");
class Promise {
  constructor(fn) {
    this.state = PENDING;
    this.callbacks = [];
    //传入函数立即执行
    fn(this._resolve.bind(this), this._reject.bind(this));
  }
  //处理成功时的函数,将失败的原因作为参数传递给回调函数队列并依此触发
  _resolve(value) {
    //如果传进来的还是一个promise就把当前promise的状态切换全交给他
    if (value && (typeof value === "object" || typeof value === "function")) {
      var then = value.then;
      if (typeof then === "function") {
        then.call(value, this._resolve.bind(this), this._reject.bind(this));
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
  //处理失败时的函数,将失败的原因作为参数传递给回调函数队列并依此触发
  _reject(error) {
    this.state = REJECTED;
    this.value = error;
    process.nextTick(() => {
      this.callbacks.forEach((connectionBlock) => {
        this._control(connectionBlock);
      });
    });
  }
  //then方法暴露给外界注册回调
  then(onfulfilled, onrejected) {
    //新的promise负责依赖当前promsie的状态改变自己的状态
    return new Promise((resolve, reject) => {
      this._control({
        onfulfilled: onfulfilled || null,
        onrejected: onrejected || null,
        resolve: resolve,
        reject: reject,
      });
    });
  }
  //新增catch方法,等价于then(null,onrejected)
  catch(onError) {
    return this.then(null, onError);
  }
  //接受一个关联块
  _control(connectionBlock) {
    // 如果当前状态没改变 推入队列
    if (this.state === PENDING) {
      this.callbacks.push(connectionBlock);
      return;
    }
    //获得响应状态的回调函数
    let cb =
      this.state === FULFILLED
        ? connectionBlock.onfulfilled
        : connectionBlock.onrejected;
    //如果没有注册回调,直接把当前promise的值作为参数
    if (!cb) {
      cb =
        this.state === FULFILLED
          ? connectionBlock.resolve
          : connectionBlock.reject;
      //改变新promise的状态
      cb(this.value);
      return;
    }
    //如果有传入回调 调用回调再改变新promise的状态
    let ret;
    try {
      ret = cb(this.value);
      cb =
        this.state === FULFILLED
          ? connectionBlock.resolve
          : connectionBlock.reject;
    } catch (error) {
      ret = error;
      cb = connectionBlock.reject;
    } finally {
      cb(ret);
    }
  }
  static resolve(value) {
    if (value && value instanceof Promise) return value;
    if (
      value &&
      typeof value === "object" &&
      typeof value.then === "function"
    ) {
      let then = value.then;
      return new Promise((resolve) => {
        then(resolve);
      });
    }
    if (value) return new Promise((resolve) => resolve(value));
    else return new Promise((resolve) => resolve());
  }
  static reject(value) {
    if (
      value &&
      typeof value === "object" &&
      typeof value.then === "function"
    ) {
      let then = value.then;
      return new Promise((resolve, reject) => {
        then(reject);
      });
    } else {
      return new Promise((resolve, reject) => reject(value));
    }
  }
  static all(promises) {
    let count = 0;
    let ret = Array.from({ length: promises.length });
    return new Promise((resolve, reject) => {
      promises.forEach((p, index) => {
        Promise.resolve(p).then(
          (value) => {
            count++;
            ret[index] = value;
            if (count === promises.length) resolve(ret);
          },
          (error) => reject(error)
        );
      });
    });
  }
  static race(promises) {
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(
          function (value) {
            return resolve(value);
          },
          function (reason) {
            return reject(reason);
          }
        );
      }
    });
  }
}
