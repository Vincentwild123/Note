## React-Redux源码分析

### 以前的用法

#### 1. Provider

```javascript
//1. useMemo 计算属性
const contextValue = useMemo(()=>{
    //订阅store的更新
    const subscription = new Subscription(store);
    //在订阅者上定义stateChange函数
    subscription.onStateChange = subscription.notifyNestedSubs
    //返回store和订阅者
    return {
        store,
        subscription,
    }
},[store])//设置依赖列表为store
//2. 获取最新的store
const previousState = useMemo(()=>store.getState(),[store])

//3. 最后利用context包裹一层，向下传递context

const Context = context || ReactReduxContext

return <Context.Provider value={contextValue}>{children}</Context.Provide>
```

**总结：订阅store的更新，利用Context.Provider向下传递store**

---



#### 2. connect

```javascript
//1. createConnect 
export function createConncet({
    connectHOC = connectAdvanced,
    mapStateToPropsFactories = defaultMapStateToPropsFactories,
    mapDispatchToPropsFactories =defaultMapDispatchToPropsFactories,
    mergePropsFactories = defaultMergePropsFactories,
    selectorFactory = defaultSelectorFactory
})

//2. return connect function 
return function connect(mapStateToProps,mapDispatchToProps,mergeProps,options={})


//3. connect function 调用返回一个高阶组件

return connectHOC()  =====>  return warpWithConnect(WrappedComponent)


//4. 组件内部接收Provider传递的context并渲染 包裹的组件
const ContextToUse = useMemo(() => {
  // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
  // Memoize the check that determines which context instance we should use.
  return propsContext &&
    propsContext.Consumer &&
    isContextConsumer( < propsContext.Consumer / > ) ?
    propsContext :
    Context
}, [propsContext, Context])

// Retrieve the store and ancestor subscription via context, if available
const contextValue = useContext(ContextToUse)

const renderedWrappedComponent = useMemo(
  () => ( <WrappedComponent {
      ...actualChildProps
    }
    ref = {
      reactReduxForwardedRef
    }/>
  ),
  [reactReduxForwardedRef, WrappedComponent, actualChildProps]
)

// If React sees the exact same element reference as last time, it bails out of re-rendering
// that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.
const renderedChild = useMemo(() => {
  if (shouldHandleStateChanges) {
    // If this component is subscribed to store updates, we need to pass its own
    // subscription instance down to our descendants. That means rendering the same
    // Context instance, and putting a different value into the context.
    return ( <ContextToUse.Provider value = {
        overriddenContextValue
      } > {renderedWrappedComponent
      } </ContextToUse.Provider>
    )
  }

  return renderedWrappedComponent
}, [ContextToUse, renderedWrappedComponent, overriddenContextValue])
```

**总结：接收Provider传递下来的context,包裹展示组件并监听context变化触发调用传进来的函数**

### hooks

1. useDispatch

   ```javascript
   //从context中获取store从而获取dispatch
   return function useDispatch(){
       const store = useStore()
       return store.dispatch
   }
   ```

2. useSelector

   ```javascript
   //1.获取context上下文
    const useReduxContext =
       context === ReactReduxContext
         ? useDefaultReduxContext
         : () => useContext(context)
    //2. 获取state和selector，传进useSelectorWithStoreAndSubscription中进行监听
     const selectedState = useSelectorWithStoreAndSubscription(
         selector,
         equalityFn,
         store,
         contextSub
       )
    //3. 返回依赖的state，并在更新和立即通知更新
   ```

   

