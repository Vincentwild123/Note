# JS & CSS

![promise](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=434281904,1375192006&fm=26&gp=0.jpg)

### Promise

##### Promise 之前

**Promise 出现之前 js 实现异步的方式只有回调函数和发布订阅模式**

1. 回调函数

```js
setTimeout(function () {
  console.log("回调函数");
}, 1000);
```

缺点:容易形成回调地狱(callback hell),发生错误不好追踪,因为回调函数通常是匿名的

```js
function load() {
    $.ajax({
        url: 'xxx.com',
        data: 'jsonp',
        success: function(res) {
            init(res, function(res) {
                render(res, function(res) {
                    // what the hell?!
                });
            });
        }
    }
}
load();
```

2. 发布订阅模式

**发布订阅模式是一种一对多的对象对应关系,多个观察者同时监听某一个对象,当该对象发生改变时,就会执行一个发布事件,这个发布事件会通知所有的事件订阅者,事件订阅者根据得到的数据进而改变自己的状态**

![发布订阅模式](https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4049622206,55300289&fm=26&gp=0.jpg)

- 创建一个发布者对象,并在其上添加一个列表属性,用于存放订阅者的回调函数
- 发布者发布消息,将消息依次传给每一个列表中的回调函数并触发它

```js
class Pushlisher(){
    constructor(){
        this.subs = [];
    }
    subscribe(sub){
        this.subs.push(sub)
    }
 	publish(info){
        let args = info;
        this.subs.forEach(sub=>{
            sub.apply(this,args)
        })
     }
}
let pushlisher = new Pushlisher();
pushlisher.subscribe((args)=>{
    console.log("Got it")
})
```

##### Promise 出现!主要解决程序员写回调函数嵌套的眼花问题

```js
// 使用前
doSomething(function (result) {
  doSomethingElse(
    result,
    function (newResult) {
      doThirdThing(
        newResult,
        function (finalResult) {
          console.log("Got the final result: " + finalResult);
        },
        failureCallback
      );
    },
    failureCallback
  );
}, failureCallback);

// 使用后
doSomething()
  .then(function (result) {
    return doSomethingElse(result);
  })
  .then(function (newResult) {
    return doThirdThing(newResult);
  })
  .then(function (finalResult) {
    console.log("Got the final result: " + finalResult);
  })
  .catch(failureCallback);
// promise+箭头函数
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);
// async+await  这样还眼花建议眼科
async function request() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log("Got the final result: " + finalResult);
  } catch (error) {
    failureCallback(error);
  }
}
```

##### 语法

1. 创建

```js
// 创建时传入一个函数,函数参数是两个用于改变状态的函数,这两个函数由内部部署
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

2. then 指定状态回调

```js
// then方法的参数是两个函数,分别是状态变为fulfilled的回调函数和状态变为rejected的回调函数
promise.then(function successCb(data){
    dosomething...
},function failCb(error){
    dosomething...
})
```

3. then 方法返回值还是一个 promise,不过是新的

```js
let promiseA = Promise.resolve();
console.log(
  promiseA.then(
    function (data) {},
    function (error) {}
  ) instanceof Promise
); //true
```

4. 如果 resolve 的参数是另一个 promise,则当前 promise 的状态就会取决于这个 promise 的状态

```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("fail")), 3000);
});
const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000);
});
p2.then((result) => console.log(result)).catch((error) => console.log(error));
// Error: fail
```

##### 特性

1. 一旦创建不可取消(一言既出驷马难追)

2. 状态只能由 pending 到 fulfilled 或者 rejected,一旦改变不可修改(专一)

3. 链式调用

4. 状态冒泡(后一个 promsie 的状态取决于前一个的状态,错误还会冒泡直到被捕获为止)

##### 原型方法

1. Promise.all --- 有一个出错就返回,不然要等全部完成

**参数为 primose 数组**

```js
const p = Promise.all([p1, p2, p3]);
//1.只有p1、p2、p3的状态都变成fulfilled,p的状态才会变成fulfilled,此时p1、p2、p3的返回值组成一个数组,传递给p的回调函数.
//2. 只要p1、p2、p3之中有一个被rejected,p的状态就变成rejected,此时第一个被reject的实例的返回值,会传递给p的回调函数.
```

2. Promise.race --- 跟随最先改变状态的改变状态

```js
const p = Promise.race([p1, p2, p3]);
// 只要p1、p2、p3之中有一个实例率先改变状态,p的状态就跟着改变.那个率先改变的 Promise 实例的返回值,就传递给p的回调函数.
```

3. Promise.allSettled --- 不管状态,全部完成就返回

```js
const p = Promise.allSettled([p1, p2, p3]);
```

4. Promise.any --- 有一个成功就返回,全部出错才变成出错

```js
const p = Promise.any([p1, p2, p3]);
```

5. Promise.resolve --- 将参数转换为 promsie 对象

- promise 实例直接返回
- thenable 对象,先将该对象转换为 promise 对象再执行 then 方法
- 根本不是对象,返回状态为 resolve 的对象并将参数传递给回调含上诉
- 不带有任何参数直接返回 resolve 的 promise

6. Promise.reject --- 返回一个状态为 rejected 的 promise

### CSS3 新增伪元素

<table>
<tr><th>属性</th><th>描述</th></tr>
<tr><td>E::first-letter</td><td>E元素的第一个字</td></tr>
<tr><td>E::first-line</td><td>E元素第一行字</td></tr>
<tr><td>E::cue</td><td>用于在VTT轨道的媒体中使用字幕和其他线索</td></tr>
</table>

```html
<style>
    p::first-letter{
    font-size: 4em;
    }
    p::first-line{
        color:red;
    }
    P::cue{
        bakground-color:black;
    }
</style>
</head>
<body>
    <p>abcdefghijklmnopqrstuvwxz</p>
</body>
```
