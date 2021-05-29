## 动机

**试图让 state 的变换变得可预测**

## 核心概念

1. state --- 描述应用状态信息的普通对象

```js
const state = {
  counter: 0,
  todos: [
    {
      text: "写作业",
      isFinish: false,
    },
    {
      text: "发作业",
      isFinish: true,
    },
  ],
};
```

2. action --- 改变 state 的通用格式,简单对象

```js
const actions = [
  {
    type: "ADD",
    text: "写作业",
  },
  {
    type: "MININ",
    text: "变成minin",
  },
];
```

3. reducer --- 将 action 和 state 串联起来,记录 action 是怎么改变 state 的,真正改变 state 的地方

```js
const todos = (state, action) => {
  switch (action.type) {
    case "ADD":
      return add(state.count);
    case "MININ":
      return minin(state.count);
    default:
      return state;
  }
};
```

## 三大原则

1. 单一数据源 --- 整个应用只能有一颗状态树

2. state 只读 --- 让 action 变成其能唯一改变它的地方
   _通过 dispatch 分发 actions_
3. 使用纯函数进行修改 --- 接收之前的 state,和订阅的 action 对现在的 state 进行修改

## Action --- 改变数据的入口及负荷

1. action 创建函数,简单的返回一个 action 对象,方便移植和测试
2. 异步 action

## Reducer --- 实际上修改 state 的函数

```js
(preState, action) => newState;
```

以下操作禁止

1. 修改传入参数
2. 执行有副作用的操作,如 API 请求和路由跳转
3. 调用非纯函数

**!!!返回的 state 要是新的引用,方便追终状态改变**
combineReducers api

```js
const todoApp = (state, action) => {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action),
  };
};

// 等价于

const todoApp = combineReducers({
  visibilityFilter,
  todos,
});

// 结合ES6
import { combineReducers } from "redux";
import * as reducers from "./reducers";
const todoApp = combineReducers(reducers);
```

## store --- 整合仓库

职责

1. 维持 state
2. 提供 getState(),获取 state
3. dispatch(action) 方法更新 state
4. subscribe(listener) 注册监听函数/返回的函数注销监听器

```js
//将reducers 传入
import { createStore } from "redux";
const store = createStore(todoApp);
```

## 数据变动的声明函数

1. 变动分发
2. store 传入 reducer 函数
3. 根 reducer 合并 state,返回替换,更新状态
4. store 保存新状态

## react-redux

1. 容器组件和展示组件
   |---|---|---|
   | |展示组件|容器组件|
   |作用|描述 UI|描述逻辑|
   |直接使用 redux|否|是|
   |数据来源|props|监听 redux state|
   |数据修改|props 暴露的回调|向 redux 派发 actions|
   |调用方式|手动|redux 生成|

2. 使用 React Redux 的 connect 方法生成容器组件

3. connect 方法:
   从技术上来讲:容器组件就是从 state 树中读取部分数据,并通过 props 来把这些数据供给渲染组件的组件

4. 定义两个函数

- mapStateToProps:指定如何把当前的 state 映射到组件 props

```js
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_COMPLETED":
      return todos.filter((t) => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter((t) => !t.completed);
    case "SHOW_ALL":
    default:
      return todos;
  }
};
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  };
};
```

- mapDispatchToProps:接收 dispatch 方法,返回期望注入到展示组件的 props 中的回调方法

```js
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
  };
};
```

5. 用 connect 创建容器组件

```js
import { connect } from "react-redux";
const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(todoList);
```

## 异步 Action

1. dispatch 只能提交同步的 action,凡是可能改变状态的都要提交 action
2. redux-thunk 中间件 --- 让 action 创建函数除了返回 action 对象外还可以返回函数,这个函数会被 thunk 执行

```js
// 来看一下我们写的第一个 thunk action 创建函数!
// 虽然内部操作不同,你可以像其它 action 创建函数 一样使用它:
// store.dispatch(fetchPosts('reactjs'))

export function fetchPosts(subreddit) {
  // Thunk middleware 知道如何处理函数.
  // 这里把 dispatch 方法通过参数的形式传给函数,
  // 以此来让它自己也能 dispatch action.
  //规定好的,thunk会把dispatch传递给返回函数
  return function (dispatch) {
    // 首次 dispatch:更新应用的 state 来通知
    // API 请求发起了.

    dispatch(requestPosts(subreddit));

    // thunk middleware 调用的函数可以有返回值,
    // 它会被当作 dispatch 方法的返回值传递.

    // 这个案例中,我们返回一个等待处理的 promise.
    // 这并不是 redux middleware 所必须的,但这对于我们而言很方便.

    return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
      .then(
        (response) => response.json(),
        // 不要使用 catch,因为会捕获
        // 在 dispatch 和渲染中出现的任何错误,
        // 导致 'Unexpected batch number' 错误.
        // https://github.com/facebook/react/issues/6895
        (error) => console.log("An error occurred.", error)
      )
      .then((json) =>
        // 可以多次 dispatch!
        // 这里,使用 API 请求结果来更新应用的 state.

        dispatch(receivePosts(subreddit, json))
      );
  };
}
```

3. applyMiddleware --- 在 createStore 的时候引入

```js
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore,applyMiddleware } from 'redux'
import { selectSubreddit,fetchPosts } from './actions'
import root Reducer from './reducers'
const loggerMiddleware = creatLogger()
const store  = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)
```

## 中间件 --- 提供 action 被发起之后,到达 reducer 之前的拓展点

### 记录日志

1. 手动记录

```js
console.log("dispatching", action);
store.dispatch(action);
console.log("next state", store.getState());
```

2. 封装成一个函数

```js
function dispatchAndLog(store, action) {
  console.log("dispatching", action);
  store.dispatch(action);
  console.log("next state", store.getState());
}
```

3. 替换 store.dispatch 全局函数

```js
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};
```

4. 对 dispatch 增加多个中间功能

```js
function patchStoreToAddLogging(store) {
  let next = store.dispatch;
  store.dispatch = function dispatchAndLog(action) {
    console.log("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
  };
}
function patchStoreToAddCrashReporting(store) {
  let next = store.dispatch;
  store.dispatch = function dispatchAndReportErrors(action) {
    try {
      return next(action);
    } catch (err) {
      console.error("捕获一个异常!", err);
      Raven.captureException(err, {
        extra: {
          action,
          state: store.getState(),
        },
      });
      throw err;
    }
  };
}

//使用:
patchStoreToAddLogging(store);
patchStoreToAddCrashReporting(store);
```

5. 箭头函数柯里化
   **Middleware 接收一个 next 的 dispatch 函数,返回一个 dispatch 函数,返回的函数作为下一个 middleware 的 next**

```js
const logger = (store) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

const crashReporter = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    console.error("Caught an exception!", err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState(),
      },
    });
    throw err;
  }
};
```
