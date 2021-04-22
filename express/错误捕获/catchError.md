#### 一、基本使用与逻辑

1. 使用

```javascript
try{
    //code....
}catch(err){
    //error handling
}finally{
    //no matter what happens in the try/catch (error or no error), this code in the finally statement should run. 
}
```

2. 逻辑

![try catch 逻辑](https://www.javascripttutorial.net/wp-content/uploads/2019/12/javascript-try-catch-finally.png)



#### 二、特性

1. try...catch 仅适用于运行时错误，解释阶段错误无法正常工作

```javascript
try{
    {{{{{{{
}catch(err){
    console.error(err)
}
//引擎在‘parse-time’出错，导致无法理解代码，因此无法捕捉
```

2. try...catch 只能同步工作

```javascript
try{
    setTimeout(function(){
        undefinedVariable;
    },1000)
}catch(err){
    console.error(err)
}
//setTimeout的回调函数执行时，引擎已经离开try...catch结构
```

3. finally 能让try块中的return语句失效

```javascript
function test(){
  try {
    return 1;
  } catch(error) {
    return 2;
  } finally {
    return 3;
  }
}
console.log(test());
//3
```



#### 三、错误对象

​	当程序发生error，js内部会生成一个包含error细节的对象，该对象会被作为参数传进catch

对于所有内置错误，错误对象具有两个主要属性

1. name 错误类型
2. message 文本类型的错误信息
3. stack （非标准属性）发生错误时的调用栈信息，主要用于调试

```javascript
try {
  lalala; // error, variable is not defined!
} catch (err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)

  // Can also show an error as a whole
  // The error is converted to string as "name: message"
  alert(err); // ReferenceError: lalala is not defined
}
```

**理论上，我们可以throw任何东西作为错误对象，但最好的习惯是throw一个具有name，message的对象，以便和内置错误对象保持兼容**

*番外：内置的错误对象*

| 对象           | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| ReferenceError | 引用未定义变量时触发                                         |
| SyntaxError    | 使用不合法的语法结构时触发                                   |
| TypeError      | 值得类型非预期时触发                                         |
| `URIError`     | 错误使用全局URI函数如`encodeURI()`、`decodeURI()`等时触发    |
| `RangeError`   | 对`Array`构造函数使用错误的长度值，对`Number.toExponential()`、`Number.toFixed()`或`Number.toPrecision()`使用无效数字等 |
| `EvalError`    | 全局函数`eval()`中发生的错误                                 |



#### 四、较好的catch和throw策略

​	catch错误不单单是为了防止程序挂掉，更重要的目的是方便调试，找bug，所以对错误的处理策略，稍微可以体现出码者的优雅性

​	俗话说的好，码者，人恒雅也，尽量遵循一个原则，catch只处理自己知道的错误

举个梨子

```javascript
let json = '{ "age": 30 }'; 
try{
  let user = JSON.parse(json);  
  alert( user.name );
} catch (err) {
  console.error('JSON Error:'+err);
}
```

上述例子的catch策略能保证程序正常，因为catch块能catch内部所有的错误，无论是JSON.parse出错还是user.name不存在报错，都能被catch到，但两种错误都用同一种打印是不利于调试的，写成下面这样会好一点

```javascript
let json = '{"age":30}'
try{
  let user =  JSON.parse(json);
  alert(user.name)
}catch(err){
   if(err instanceof SyntaxError){
       console.error('JSON Error:'+err);
   }
   else throw err;
}
```

每个catch块处理自己知道得，可能会出现得错误，就是说，编程人员在编程的时候，catch那些预料到的错误，而将可能自己没料到的错误抛到外面。

#### 五、Promise的错误处理

​	众所周知，Promise是会吞掉error的，因为promise的实现就在内部对所有error进行了捕获，且捕获到的error不是向外抛出（外指promise之外），而是沿着链找到最近的onreject回调传入，所以promise的错误处理只有两种办法

1. 设置onreject回调
2. 全局捕获

举个栗子

```javascript
try{
    new Promise((resolve,reject)=>{
        throw new Error('promise error')
    }).catch(()=>{
        //错误在最近的onreject回调被捕获
        console.error(err);
    })
}catch(err){
    //永远不会执行，promise吞掉error
    console.error(err);
}
```

另外需要注意，无论是执行者函数（executor）和还是 promise 的处理程序（handler），内部发生的错误统统吞掉，相当于被隐式catch，error会自动找到最近的onreject回调传进去

```javascript
try{
    new Promise((resolve,reject)=>{
        resolve();
    }).then(()=>{
        throw new Error('promise then error');
    }).catch((err){
        console.error(err);
    })
}catch(err){
    //地球毁灭之前都不会执行
    console.error(err)
}
```

同理，在错误找到onreject传进去之前，经过的then注册的onfulfilled回调统统失效，直到找到onreject回调，处理之后，onreject回调之后的onfulfilled回调才正常

```javascript
try {
    new Promise((resolve, reject) => {
        throw new Error('promise error')
    }).then((ret) => {
        //错误没有处理，失效
        console.log('then1:' + ret)
    }).catch((err) => {
        //错误处理了，后序正常
        console.error(err);
        return 'handled'
    }).then((ret) => {
        //正常执行
        console.log('then2' + ret);
    })
} catch (err) {
    //同样的，人类毁灭之前都不会执行
    console.error(err)
}

// Error:promise error
//then2handled
```

那整条链一个catch都没设置会怎么样呢？

那这个error就会击穿地心，一直穿透到全局，根据宿主环境的不同触发不同的全局事件，比如说浏览器中会触发 **”unhandledrejection“**事件，node环境中也会触发**”unhandledRejection“**事件，一般会对这事件进行监听，再显示信息给编程人员或者用户



*番外：[chromium](https://chromium.googlesource.com/?format=HTML) / [v8](https://chromium.googlesource.com/v8/) / [v8](https://chromium.googlesource.com/v8/v8/) / [3.29.45](https://chromium.googlesource.com/v8/v8/+/3.29.45) 的promise内部错误捕捉*

![executor](https://img.imgdb.cn/item/607ecfcc8322e6675cd79762.png)

![handler](https://img.imgdb.cn/item/607ecfcc8322e6675cd79766.png)



#### 六、性能损耗

​		After V8 version 6 (shipped with Node 8.3 and latest Chrome), the performance of code inside `try-catch` is the same as that of normal code.           															------     爆栈网   

(稍微测了一下，相差无几)

[详细讨论请猛烈的点击我](https://stackoverflow.com/questions/19727905/in-javascript-is-it-expensive-to-use-try-catch-blocks-even-if-an-exception-is-n)

**参考**

1. [Error handling, "try...catch"](https://javascript.info/try-catch)
2. [Try/Catch in JavaScript – How to Handle Errors in JS](https://www.freecodecamp.org/news/try-catch-in-javascript/)
3. [JavaScript try…catch Statement](https://www.javascripttutorial.net/javascript-try-catch/)
4. [使用 promise 进行错误处理](https://zh.javascript.info/promise-error-handling)