## React

### 1. JSX

**深刻理解: 在 html 格式的字符串中混入 js 表达式和变量**

1. 大括号嵌入任何 js 表达式
2. JSX 也是 js 表达式
3. 使用引号指定字面量
4. JSX 事件使用小驼峰命名
5. JSX 被编译后会变成 createElement 函数,createElement 函数返回 react 元素.

### 2. 元素与组件

1. react 元素即是 vnode,组件即是带参数的生成 vnode 函数
2. 组件名必须以大写字母开头
3. 组件的 props 为传入的属性和内部子组件构成的对象
4. React 组件必须不能更改自己的入参,和纯函数一样

**受控组件与非受控组件:受控组件是 react 组件本身代理 dom 事件,dom 元素的 value 属性也是组件内部的属性,而非受控组件则是由 dom 元素原生处理事件,而使用 ref 获得 dom 元素的值**

### 3. state 与生命周期

3-1 setState 是异步调用,会将变化合并,可以传递一个函数,该函数用上一个 state 作为第一个参数,将此次更新被应用时的 props 作为第二个参数

3-2 生命周期

#### 挂载过程

constructor
componentwillmount
componentdidmount
componentwillunmount

3-2-1 constructor,完成组件初始化,需要传入 super

3-2-2 componentWillMount 已经初始化但还没有进行渲染

3-2-3 componentDidMount 第一次渲染完成,可以进行 ajax 请求

3-2-4 componentWillUnmount 组件卸载和数据销毁

#### 更新过程

1. componentWillReceiveProps,接收父组件的 props
2. shouldComponentUpdate,组要用于性能优化,当子组件不需要重新渲染时可以在该生命周期返回 false
3. componentWillUpdate
4. componentDidUpdate 组件更新完成

5. 事件处理与通信

6. 事件名用小驼峰,大括号+字符串函数名

7. 阻止默认行为需要显示调用 preventDefault

8. 在 render 函数中 return null 将不会渲染

### 表单

**使 React 的 state 作为我唯一的数据源,渲染表单的组件还控制着用户输入过程中表发生的操作**

### 状态提升:将兄弟组件间要用到的数据提升到他们共同的父组件中

4. 插槽

1. props.children 属性上包含所有传进来的东西
1. JSX,组件也可以直接传进来,当作具名插槽

1. 其他

5-1 懒加载
import().then()
React.lazy(()=>import())

5-2 数据传递

### 全局共享数据 context

```js
1. const context = React.createContext('defaultValue');

2. context.Provider

3. static contextType = ThemeContext

4. this.context
```

当需要该数据的组件在组件树中没有匹配到 provide 时才会使用默认值

### 组件组合的控制反转

1. 将深层需要用到数据的组件作为参数传递,

### Refs 转发---将 ref 自动的通过组件传递到子组件的技巧
