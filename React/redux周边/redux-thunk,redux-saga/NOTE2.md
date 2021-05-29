### redux-saga 简介

​ redux-saga,一个响亮的名字,虽然上一篇已经介绍过了,但读了它的源码后,我忍不住再郑重的再介绍一遍.这是一个管理程序"副作用"的框架,虽然说大多数情况下都是作为 redux 中间件使用,但根本使用上,它不依赖任何的其他库,可以单独使用.使用它来管理程序副作用有以下的优点:

1. 更好的测试
2. 更清晰的代码逻辑
3. 轻松管理副作用的启动和取消

PS:这库的代码写的真的太好了,充满了计算机专业名词,让我感到亲近熟悉,fork、channel、task、io 概念、semaphore、buffer,就单凭概念这层,saga 赢太多

### 一些概念

**Effect**

官网强调了无数遍了,Effect 就是 saga 中间件的执行单元,通过内部的 API 生成,是一些简单对象,包含一些信息,比如 type 属性,saga 中间件可以根据这些信息选择向下执行、堵塞、dispatch action 等等操作(take、fork、put)

**saga**

对于什么是 saga,个人理解就是一些 Effect 的集合,可以分成 work saga 和 root saga,root saga 负责分发 action,work saga 负责对指定 action 进行反应,两者之间的组合嵌套可以根据 Generator 函数语法进行操作

```javascript
function * worksaga(getstate){
    try{
    	yield call(some async op);
    	yield put({type:'SOME ACTION WHEN SUCCESS'});
    }catch(err){
        yield put({type:'SOME ACTION WHEN FAIL'})
    }
}
```

```javascript
function* rootsaga() {
  yield* takeEvery("SOME ACTION", worksaga);
}
```

**task**

​ 副作用任务单元,前面说过 Effect 相当于是给 saga 中间件执行的指令,那 task 就是要执行的具体操作,task 有很多类型,Main Task 是主要跟踪整个 Main Flow,Fork Task 就是 fork 创建出来的 task,Parent Task 是管理 Main Task 和若干 Fork Tasks 的

**proc**

主要执行逻辑集中在 proc,它定义了 saga 中间件执行 Effect 的逻辑,通过拿到 Generator 函数的迭代器(iterator),从而获得函数控制权,通过辅助函数之间的相互迭代来不断的调用 iterator.next

**channel**

保存 task 回调和触发 task 回调的地方,channel.take 进行回调注册,channel.put 匹配监听当前 action 的回调,进行触发

(源码有删减)

```javascript
put(input) {
      const takers = (currentTakers = nextTakers)
      for (let i = 0, len = takers.length; i < len; i++) {
        const taker = takers[i]
        if (taker[MATCH](input)) {
          taker.cancel()
          taker(input)
        }
      }
    },
```

```javascript
   take(cb, matcher = matchers.wildcard) {
      cb[MATCH] = matcher
      nextTakers.push(cb)
      cb.cancel = once(() => {
        remove(nextTakers, cb)
      })
    },
```

上述的列出一些概念是为了更好的理解接下来的源码解读,源码比较复杂,加之本人水平有限,不可能讲太细,也不需要讲太细.

### 源码

​ 一般按照惯例,说源码之前都是要复习下使用的,但上篇已经说过了,不熟悉可以去看下再看下去,这里就不说了,直接从入口开始分析

**入口**

```javascript
function sagaMiddleware({ getState, dispatch }) {
    boundRunSaga = runSaga.bind(null, {
      ...options,
      context,
      channel,
      dispatch,
      getState,
      sagaMonitor,
    })

    return next => action => {
      if (sagaMonitor && sagaMonitor.actionDispatched) {
        sagaMonitor.actionDispatched(action)
      }
      const result = next(action) // hit reducers
      channel.put(action)
      return result
    }
```

​ saga 的入口还是接收 redux 传给中间件的两个 API,其实外面还有一层 Factory 函数的,用于与环境解耦,这里就略了,入口绑定了一个`boundRunSaga`函数也就是`sagaMiddleware.run`调用的函数,然后返回的高阶函数主要逻辑就是当 action 被 dispatch,照常调用别的中间件封装过的 dispatch 函数,也就是 next 函数,但返回结果之前,使用`channel.put(action)`唤醒 saga 中间件本身的逻辑,也就相当于独立于 redux 流,自己开一条处理副作用的流.

​ 前面说过,`channel.put(action)`是触发监听了 action 的回调,那这些回调是什么时候注册的呢?

**runSaga 与 proc**

​ runSaga 即 sagaMiddleware.run 调用的函数

在 runSaga 中,首先取得传入 root saga 的迭代器

```javascript
const iterator = saga(...args);
```

然后生成环境,可以看成是 task 进程运行的系统环境

```javascript
const env = {
  channel,
  dispatch: wrapSagaDispatch(dispatch),
  getState,
  sagaMonitor,
  onError,
  finalizeRunEffect,
};
```

然后马上执行一个函数,该函数用于创建管理该 root saga 的 parent task,监视总的 flow,其上有一些控制函数,比如 cancel,然后执行这个 saga 函数的迭代器,根据迭代器返回的 Effect 类型再进一步执行

```javascript
immediately(() => {
  const task = proc(
    env,
    iterator,
    context,
    effectId,
    getMetaInfo(saga),
    /* isRoot */ true,
    undefined
  );
  if (sagaMonitor) {
    sagaMonitor.effectResolved(effectId, task);
  }
  return task;
});
```

(源码有删减)

```javascript
export default function proc(
  env,
  iterator,
  parentContext,
  parentEffectId,
  meta,
  isRoot,
  cont
) {
  next.cancel = noop;

  /** Creates a main task to track the main flow */
  const mainTask = { meta, cancel: cancelMain, status: RUNNING };
  /**
   Creates a new task descriptor for this generator.
   A task is the aggregation of it's mainTask and all it's forked tasks.
   **/
  const task = newTask(
    env,
    mainTask,
    parentContext,
    parentEffectId,
    meta,
    isRoot,
    cont
  );

  const executingContext = {
    task,
    digestEffect,
  };
  /**
    cancellation of the main task. We'll simply resume the Generator with a TASK_CANCEL
  **/
  function cancelMain() {
    if (mainTask.status === RUNNING) {
      mainTask.status = CANCELLED;
      next(TASK_CANCEL);
    }
  }
  /**
    attaches cancellation logic to this task's continuation
    this will permit cancellation to propagate down the call chain
  **/
  if (cont) {
    cont.cancel = task.cancel;
  }

  // kicks up the generator
  next();

  // then return the task descriptor to the caller
  return task;
}
```

**next 和 EffectRunner**

​ next 就是 saga middleware 中执行 Effect 指令的地方,他会根据 Effect.type 的类型找到对应的 EffectRunner,执行这个 runner 函数

```javascript
function runEffect(effect, effectId, currCb) {
  if (is.promise(effect)) {
    resolvePromise(effect, currCb);
  } else if (is.iterator(effect)) {
    // resolve iterator
    proc(env, effect, task.context, effectId, meta, /* isRoot */ false, currCb);
  } else if (effect && effect[IO]) {
    const effectRunner = effectRunnerMap[effect.type];
    effectRunner(env, effect.payload, currCb, executingContext);
  } else {
    // anything else returned as is
    currCb(effect);
  }
}
```

其中`effectRunnerMap[effect.type]`就是找到该 runner,然后执行,看下`effectRunnerMap`

```javascript
const effectRunnerMap = {
  [effectTypes.TAKE]: runTakeEffect,
  [effectTypes.PUT]: runPutEffect,
  [effectTypes.ALL]: runAllEffect,
  [effectTypes.RACE]: runRaceEffect,
  [effectTypes.CALL]: runCallEffect,
  [effectTypes.CPS]: runCPSEffect,
  [effectTypes.FORK]: runForkEffect,
  [effectTypes.JOIN]: runJoinEffect,
  [effectTypes.CANCEL]: runCancelEffect,
  [effectTypes.SELECT]: runSelectEffect,
  [effectTypes.ACTION_CHANNEL]: runChannelEffect,
  [effectTypes.CANCELLED]: runCancelledEffect,
  [effectTypes.FLUSH]: runFlushEffect,
  [effectTypes.GET_CONTEXT]: runGetContextEffect,
  [effectTypes.SET_CONTEXT]: runSetContextEffect,
};
```

就是一些我们熟悉的 effectType 对应的 runner,看几个常见的 runner

1. put

```javascript
function runPutEffect(env, { channel, action, resolve }, cb) {
  /**
   Schedule the put in case another saga is holding a lock.
   The put will be executed atomically. ie nested puts will execute after
   this put has terminated.
   **/
  asap(() => {
    let result;
    try {
      result = (channel ? channel.put : env.dispatch)(action);
    } catch (error) {
      cb(error, true);
      return;
    }

    if (resolve && is.promise(result)) {
      resolvePromise(result, cb);
    } else {
      cb(result);
    }
  });
  // Put effects are non cancellables
}
```

显然是直接 dispatch(action),跟普通直接 dispatch 的区别就是 put(action)返回的是 Effect,方便测试

2. call

```javascript
function runCallEffect(env, { context, fn, args }, cb, { task }) {
  // catch synchronous failures; see #152
  try {
    const result = fn.apply(context, args);
    if (is.promise(result)) {
      resolvePromise(result, cb);
      return;
    }
    if (is.iterator(result)) {
      // resolve iterator
      proc(
        env,
        result,
        task.context,
        currentEffectId,
        getMetaInfo(fn),
        /* isRoot */ false,
        cb
      );
      return;
    }
    cb(result);
  } catch (error) {
    cb(error, true);
  }
}
```

​ call 的逻辑可以猜到,就是把迭代器的控制权包装成 cb,在 promise resolve 的时候再执行,就等于阻塞了.

3. take

```javascript
function runTakeEffect(env, { channel = env.channel, pattern, maybe }, cb) {
  const takeCb = (input) => {
    if (input instanceof Error) {
      cb(input, true);
      return;
    }
    if (isEnd(input) && !maybe) {
      cb(TERMINATE);
      return;
    }
    cb(input);
  };
  try {
    channel.take(takeCb, is.notUndef(pattern) ? matcher(pattern) : null);
  } catch (err) {
    cb(err, true);
    return;
  }
  cb.cancel = takeCb.cancel;
}
```

​ take 是等待 action 的到来,说是控制反转,其实就是把 take 的回调注册到 channel 中,等待 action 到来时 channel 的唤醒

4. fork

   fork 是先返回结果,而不是阻塞迭代器的执行,显然需要一个新的 task 去负责 fork 的进程,但并不等该 task 完成,而是直接返回

```javascript
function runForkEffect(
  env,
  { context, fn, args, detached },
  cb,
  { task: parent }
) {
  const taskIterator = createTaskIterator({ context, fn, args });
  const meta = getIteratorMetaInfo(taskIterator, fn);

  immediately(() => {
    const child = proc(
      env,
      taskIterator,
      parent.context,
      currentEffectId,
      meta,
      detached,
      undefined
    );

    if (detached) {
      cb(child);
    } else {
      if (child.isRunning()) {
        parent.queue.addTask(child);
        cb(child);
      } else if (child.isAborted()) {
        parent.queue.abort(child.error());
      } else {
        cb(child);
      }
    }
  });
  // Fork effects are non cancellables
}
```

5. takeEvery

takeEvery 是高级 API,底层实现是 take+fork,源码逻辑不太好看出来,官网的例子比较清晰

```javascript
export function takeEvery(pattern, saga) {
  function* takeEveryHelper() {
    while (true) {
      yield take(pattern);
      yield fork(saga);
    }
  }
  return fork(takeEveryHelper);
}
```

​ 等待 aciton 被发起,fork 一个 task 去执行,不等返回,继续监听 action 的发起

### 总结

1. redux-saga 通过自己建立的一套处理副作用系统独立的进行工作
2. 每个 saga 函数表示一些个需要进行的副作用,saga 函数在内部表示为 task,task 负责监听函数运行,其上挂载了随时执行取消的方法,task 的执行逻辑由 proc 负责
3. proc 是处理每个 task 的地方,首先取得 task 的迭代器,在内置的 next 函数中,根据每条 yield 语句返回的 Effect 选择对应的 EffectRunner 执行,完成阻塞逻辑
4. Effect 是运行最小单元,可以理解为传给 saga middleware 的指令
5. take Effect 会注册到 channel,等待 action 的到来再执行迭代器
6. fork Effect 会生成新的 task 管理,并马上返回,不阻塞迭代器
7. takeEvery 是构建在 fork 和 take 之上的,它等待 action 的到来,并 fork 一个 task 执行,因为 fork 不会阻塞迭代器,所以可以响应每次 action

另外,迭代器的取消是 saga 比较复杂的部分,此处并没有涉及,日后看是否有机会再单独出一期.
