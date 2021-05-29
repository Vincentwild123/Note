![redux](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091801.png)

### 前言

​ Redux 可以说是前端数据流控制的一大 Boss,根据 Redux 衍生的类库数不胜数,这就说明仅仅掌握 Redux 的使用是不够的,需要深入源码,了解细节为佳,本文将尝试阅读 Redux 的源码,源码本身也不长,更多的是体会这种流管理的思想.

​ Redux 源码是用 Ts 写的,不熟悉 Ts 的朋友可以先去[TypeScript 官网](https://www.tslang.cn/)熟悉下

### 使用

​ 老规矩,看源码之前先熟悉下 Redux 是怎么用的,这当然要去[Redux 官网](https://redux.js.org/introduction/getting-started)或者[Github 仓库]()去看文档了.(为了避免中文文档没有及时更新和翻译带来的难理解,建议去外文官网)

​ 首先映入眼帘的都是同一句话

> Redux is a predictable state container for JavaScript apps.

​ 肾么意思?什么叫可预测的?后文说明这一贯穿 Redux 设计全程的形容词

![数据流](https://img-blog.csdn.net/20181005205138574?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0hlbGxveW9uZ3dlaQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

总的来说,Redux 数据流很简洁,`一个state`、`一个action`、`一个reducers`,使用上就是编写上述三者,再通过一些内置 API 联系在一起,生成一个`store`,通过官网 🧅 说明

**1. action**

action 就是一个`对象`,描述一个可以`改变state的事件`,那怎么描述呢?约定是在该对象上定义一个`type`属性

```js
const THREEPM = {
  type: "DrinkTea",
  payload: "xxxxx",
};
```

就这么简单,至于写成函数返回对象还是异步 action,我不管,whatever

**2. state**

state 也只是一个`对象`,保存程序状态,无任何约束

```js
const state = {
    todo:[];
}
```

就这么简单,至于是写在 reducers 的参数列表了还是配套 immuableJS,我不管,whatever

**3. reducers**

这名字就起的诡异,还不如叫 actionToState,这家伙的主要作用就是描述 action 触发之后要干嘛,也就是根据 action 更新 state,约束就是`每次必须返回新的state,不能修改原来的state`

即 (state, action) => newState；

```js
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case "counter/incremented":
      return { value: state.value + 1 };
    case "counter/decremented":
      return { value: state.value - 1 };
    default:
      return state;
  }
}
```

**关联**

就这么简单,大道至简,那怎么关联他们呢?更简单,将 reducers 传入 createStore,生成 store 管理他们三个就行了

```js
import { createStore } from "redux";
const store = createStore(reducers);
```

生成的 store 就是老大,负责三个小弟的通信和管理

根据开头的那张图,具体流程必须是以下这样

store.dispatch(action) -> reducers handle -> update state

至于怎么监听更的 state,怎么进行异步操作,怎么分散 state 到几个 reducers,怎么合并几个 reducers 的 state 成总体 state,这里不再赘述.

### createStore

使用部分为我们打开了一个切入点,因为只用到了一个 API,`createStore`,所谓的黑魔法就发生在这里.

_源码 index.ts_

```typescript
export {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose,
  __DO_NOT_USE__ActionTypes,
};
```

我们先看下,整个库导出的接口型 API,什么叫接口型 API 呢,就是给开发人员用的,一共就 6 个,可以看到,混进了个奇怪的东西 🧞‍♀️,这个`__DO__NOT__USE__ActionTypes`是个什么东西呢?定义如下

_源码 utils/actionTypes_

```typescript
const randomString = () =>
  Math.random().toString(36).substring(7).split("").join(".");

const ActionTypes = {
  INIT: `@@redux/INIT${/* #__PURE__ */ randomString()}`,
  REPLACE: `@@redux/REPLACE${/* #__PURE__ */ randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`,
};

export default ActionTypes;
```

是一些奇奇怪怪的 action type,让我们别用,那不用就是了.

说回`createStore`

```typescript
export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
>(
  reducer: Reducer<S, A>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S> | StoreEnhancer<Ext, StateExt>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
```

`createStore`有三个重载,返回值都是泛型 Store 和 Ext 的交叉类型,但三个重载的参数并不相同,其中`reducer`都是必须的,可选的有`enhancer`和`preloadedState`

`enhancer`增强器,属于第三方插件性接口,比如说中间件增强等等

`preloadedState`初始化 state

**createStore 内部流程**

进入到函数内部,首先 javascript 特色,参数判断,根据不同的参数情况会执行不同的步骤

【有增强器】:

```typescript
return enhancer(createStore)(
  reducer,
  preloadedState as PreloadedState<S>
) as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
```

【无增强器】:

```typescript
//1. 内部属性初始化
let currentReducer = reducer
let currentState = preloadedState as S
let currentListeners: (() => void)[] | null = []
let nextListeners = currentListeners
let isDispatching = false
//2. 内部方法定义
//略
//3. dispatch 一个 action ,就是上面不让我们用的那个action type
dispatch({ type: ActionTypes.INIT } as A)
//4. 生成store
 const store = {
    dispatch: dispatch as Dispatch<A>,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  } as unknown as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
  return store
}
```

**dispatch、subscribe**

完完全全的观察者模式,subscribe 进行监听,dispatch 去 notify listener,只是在 dispatch 去 notify 之前,把 currentState 传进 reducer 获得最新的 state 而已

_dispatch 节选_

```typescript
try {
  isDispatching = true;
  currentState = currentReducer(currentState, action);
} finally {
  isDispatching = false;
}

const listeners = (currentListeners = nextListeners);
for (let i = 0; i < listeners.length; i++) {
  const listener = listeners[i];
  listener();
}
```

_subscribe 节选_

```typescript
nextListeners.push(listener);
```

真的没有黑魔法 🙉

当然,redux 的核心就是一开始提到的可预测,因为无论是 state 还是 reducer,都存在两个版本,一个 pre,一个 cur,并且每次的 reducer 改变 state,都是立刻改变,并通知更新,并不会累积一下再去统一做改变,这样性能上可能不是最佳的,但是一切都是实打实的预料之中的,设计思想很稳固.

---

### 增强器与中间件

**增强器**

​ 很多朋友知道 redux 有个叫中间件的东西,却不知道其实中间件只是增强器的一种,所谓增强器,就是可以增强 store 功能的高阶函数,在前面 createStore 的参数里作为可选项,下面来看下他的定义

```typescript
export type StoreEnhancer<Ext = {}, StateExt = never> = (
  next: StoreEnhancerStoreCreator<Ext, StateExt>
) => StoreEnhancerStoreCreator<Ext, StateExt>;
```

Ts 就有这种好处,看定义方便的多

可以看到,增强器是接收`storeEnhancerStoreCreator`类型返回值也是`storeEnhancerStoreCreator`类型

```typescript
export type StoreEnhancerStoreCreator<Ext = {}, StateExt = never> = <
  S = any,
  A extends Action = AnyAction
>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S>
) => Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
```

而`storeEnhancerStoreCreator`则是接收`reducer`和`preloadedState`作为参数返回`store`,因为如果调用`createStore`时有传入`enhancer`,执行`enhancer`并将`createStore`作为参数传入.

```typescript
return enhancer(createStore)(
  reducer,
  preloadedState as PreloadedState<S>
) as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
```

**中间件增强器**

光说不练假把式,Redux 就内置了一个我们熟悉的增强器`applyMiddleware`,先看其使用

```javascript
import { applyMiddleware } from "redux";
const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));
```

`applyMiddleware`有很多个类型重载,都是接收若干个中间件作为参数,返回一个`storeEnhancer`,这里只截取其中一个重载

```typescript
export default function applyMiddleware(
  ...middlewares: Middleware[]
): StoreEnhancer<any>;
```

因为他是先执行再作为增强器传入`createStore`,所以返回值就是个增强器咯

核心代码如下:

```typescript
const store = createStore(reducer, preloadedState);
let dispatch: Dispatch = () => {
  throw new Error(
    "Dispatching while constructing your middleware is not allowed. " +
      "Other middleware would not be applied to this dispatch."
  );
};
const middlewareAPI: MiddlewareAPI = {
  getState: store.getState,
  dispatch: (action, ...args) => dispatch(action, ...args),
};
const chain = middlewares.map((middleware) => middleware(middlewareAPI));
dispatch = compose<typeof dispatch>(...chain)(store.dispatch);

return {
  ...store,
  dispatch,
};
```

先是创建出 store,再把暴露给中间件的 API 写在 middlewareAPI 对象里,传给每个中间件,最后调用`compose`组合全部中间件

`compose`的作用是将`compose(f, g, h)`转换成`(...args) => f(g(h(...args)))`,[更多信息在官网中间件章节](https://www.redux.org.cn/docs/advanced/Middleware.html)

### 尾声

​ 以上就是 Redux 核心代码的解读,本人能力有限,难免出错,望请包涵!

​ 总的来说,Redux 内部实现足够简洁且拓展性很好,这也可能是为什么 base 在其上有这么多库的原因,能读懂才有 PR,接下来本人还会分析几个 Redux 相关库的源码,比如 redux-thunk,redux-saga 等

​ 感谢阅读 🌈
