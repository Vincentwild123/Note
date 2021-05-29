### 前言

​ 上一篇是关于 Redux 源码的解读,分析了`增强器(enhancer)`机制和`中间件(middleware)`机制,其实中间件是增强器的一种,增强器大类拥有`createStore`的全部 API,而`中间件`对 API 的使用进行了限制,只允许使用`getState`和`dispatch`,从而限制为只能`从action发起到state改变这段时间`做操作,本文将继续探索 Redux 周边类库,先从同为中间件拓展的`redux-thunk`和`redux-saga`说起

---

### 一行代码 1358 颗 star 的 redux-thunk

![redux repo](https://pic.imgdb.cn/item/60a9013c6ae4f77d3510d4eb.png)

说到异步 action,很多朋友可能一下子就想起`redux-thunk`这个中间件,它提供了不同于`pure object action`的分发,可以使`function action`完成携带的副作用再进行分发,比如用在触发 action 后进行 AJAX 请求,或某些异步逻辑

**使用**

1. 添加 redux-thunk 进中间件

```javascript
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

// Note: this API requires redux@>=3.1.0
const store = createStore(rootReducer, applyMiddleware(thunk));
```

2. 现在就可以编写`function action`,并直接分发了!

```javascript
const INCREMENT_COUNTER = "INCREMENT_COUNTER";

function increment() {
  return {
    type: INCREMENT_COUNTER,
  };
}
function incrementAsync() {
  return (dispatch) => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}
```

使用就那么简单,如果有朋友看过上期 Redux 源码解读中的中间件机制,那么可能已经猜到 redux-thunk 的实现了

**源码**

​ 别看 redux-thunk github 有 16.3k 颗 star,但他的核心源码仅仅只有 12 行!

平均下来每行价值 1358 颗 star

```javascript
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      if (typeof action === "function") {
        return action(dispatch, getState, extraArgument);
      }
      return next(action);
    };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;
```

第一个函数参数`{dispatch,getState}`是中间件注册时注入的参数

第二个函数参数`(next)`是包裹过的`dispatch`

第三个函数参数`(action)`就是我们书写的函数 action 的返回值,如果是函数就先执行这个函数,把`dispatch`权限传给它,让它决定什么时候`dispatch`

---

### redux-saga

> `redux-saga` is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

​ 根据官网所言,redux-saga 是一个管理程序`side effects`的库,那么什么是`side effects`呢?这其实是相对的概念,与`side effects`相对应的是`pure`,就是纯净的,一切细节都清澈见底,不会有模糊的部分,而`side effects`函数指的是那种除返回值外还会可能额外的对外界产生影响的函数,比如进行数据获取,调用其他`side effects`函数等,无`side effects`的函数只是单纯的描述输入值和输出值之间的对应关系,只做输入值到输出值之间的映射.

​ redux-saga 的主要作用是

1. 管理`side effects`
2. 使程序易于`test`
3. 使程序更好的` handling failures`

**使用**

1. 导入相关辅助库

```javascript
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
```

2. 将需要处理的`side effects`封装成一个 ES6 Generator 函数

```javascript
function* fetchUser(action) {
  try {
    const user = yield call(Api.fetchUser, action.payload.userID);
    yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}
```

3. 创建一个 saga 函数,管理该类型的`side effects`action,所谓的 saga 函数也是一个 ES6 Generator 函数,但主要作用是管理某种类型的`side effects`action,同时与外界进行链接

```javascript
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}
export default mySaga;
```

4. 将 saga 函数与外界进行链接

```javascript
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import mySaga from "./sagas";
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
// then run the saga
sagaMiddleware.run(mySaga);
// render the application
```

上面说到的使用虽然说只有区区几步,但蕴含很多 redux-saga 的规则,比如说为什么要用 Generator 函数?call、put、takeEvery 是什么黑魔法?注册完中间件后又 sagaMiddleware.run 是什么鬼?最后最根本的疑问,这样做有什么好处?

别急,作为一个被广泛使用的 redux 周边库,很多东西还得慢慢说来

**ES6 Generator 语法与实现**

​ 通俗来说,Generator 函数只是将函数体分成几部分执行,通过返回遍历器来交出控制权,并通过一些特殊语法来联系每部分的计算结果(返回值),或者输入参数,例如返回每个阶段的使用`yield`,输入参数使用`next`

```java
function * gen(){
    yield 1;
    yield 2;
    return 3;
}
//获取控制权
const g = gen();
//控制分段执行
g.next();
//取得阶段返回值
const res = g.next().value;
//向某个阶段输入参数
g.next(params);
```

有的朋友会觉得哇,这好神奇,到底是怎么实现的呢,我也很好奇,就找到一个[ES6 转 ES5](<http://google.github.io/traceur-compiler/demo/repl.html#function%20*gen()%7B%0A%09yield%201%3B%0A%7D%0A%0A>)的网站,看了下 Generator 函数的转换结果

_转换前_

```javascript
function* gen() {
  let sum = 1 + 2;
  yield 1;
  return sum;
}
```

_转换后_

```javascript
var $__0 = $traceurRuntime.initGeneratorFunction(gen);
function gen() {
  var sum;
  return $traceurRuntime.createGeneratorInstance(
    function ($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            sum = 1 + 2;
            $ctx.state = 8;
            break;
          case 8:
            $ctx.state = 2;
            return 1;
          case 2:
            $ctx.maybeThrow();
            $ctx.state = 4;
            break;
          case 4:
            $ctx.returnValue = sum;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    },
    $__0,
    this
  );
}
```

​ 具体的细节不管,可以看到,大概就是用一个闭包保存函数的运行环境栈,通过 switch 语句将函数语句分散到不同的部分,在根据运行环境 state 的变换,每次执行不同的 switch 部分

更多 ES6 Generator 信息《[ECMAScript 6 入门](https://es6.ruanyifeng.com/)》.

**Effect**

​ Effect 是 redux-saga 的概念,是最小的执行单元,标识一个带有`side effect`的操作,具体怎么标识呢?saga 内部约定 Effect 是一个`pure object`,具有特定的 type 属性,每个 saga 函数都是 Generator 函数,通过 yield Effect 给 saga middleware 执行,这样做方便测试.

_Effect 是一个类似如下对象_

```javascript
{
  [IO]: true,
  // this property makes all/race distinguishable in generic manner from other effects
  // currently it's not used at runtime at all but it's here to satisfy type systems
  combinator: false,
  type,
  payload,
}
```

像之前的诸如`call`、`put`等方法,都是用于生成 Effect 的,更多生成 Effect 方法在`redux-saga/effects`包内.

**yield Effect 与测试**

​ saga 函数目的在于管理程序的`side effects`操作,这无可厚非,但其实要管理这些`side effects`操作写不写成 yield Effect 无所谓,最简单的做法就是直接 yield async operate 比如

```javascript
import { takeEvery } from "redux-saga";
import Api from "./path/to/api";
function* watchFetchProduts() {
  yield* takeEvery("PRODUCTS_REQUESTED", fetchProducts);
}
function* fetchProducts() {
  const products = yield Api.fetch("/products");
  console.log(products);
}
```

这样看上去也行(实际上也是行的),但不方便测试,因为如果我们想要测试 saga 函数的正确性,需要利用 Generator 函数的遍历性对每个执行阶段进行测试

```javascript
import { call } from "redux-saga/effects";
import Api from "...";
const iterator = fetchProducts();
assert.deepEqual(
  iterator.next().value,
  Api.fetch("/products"),
  "fetchProducts should yield an Effect call(Api.fetch, './products')"
);
```

这显然是错误的,因为表达式 Api.fetch('/products')的返回值是一个 promise,而 deepEqual 两个 promise 并没有什么用,并且还要实现事先 Api.fetch 函数

回想下,测试需要测试的到底是什么?

> - What is the actual output?
>
> - What is the expected output?
>
>   ​ —— [Eric Elliott’s article](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d#.4ttnnzpgc)

​ 让我们换成 yield Effect 看看,前面说过 Effect 是一个普通对象,普通对象间进行 deepEqual 可以保证此次调用的函数是否正确,函数参数又是否正确.

```javascript
import { call } from "redux-saga/effects";
import Api from "...";
const iterator = fetchProducts();
// expects a call instruction
assert.deepEqual(
  iterator.next().value,
  call(Api.fetch, "/products"),
  "fetchProducts should yield an Effect call(Api.fetch, './products')"
);
```

---

### redux-saga 源码

​ 本来打算把 redux-saga 的源码分析也放到这篇文章的,但越读越发现,这源码写的真牛,看这种代码真是一种享受,所谓慢工出细活,太粗略的看是对这种级别代码的侮辱,于是决定在咀嚼几天,敬请期待!

​ 感谢阅读㊗
