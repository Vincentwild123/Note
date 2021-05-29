## 路由配置

### 三个组件 Link Router Route

所有 Route 是全部写在最外层组件树上的待使用的组件

Router 是包裹在最外层的组件

```html
<Router>
    <Route/>
    <Route>
    <Route>
</Router>
```

Link 是跳转组件

```html
<Link to='route'></Link>
```

完整示例

```js
import React from "react";
import { Link, Route, Router } from "react-router";
const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/inbox">Inbox</Link>
          </li>
        </ul>
        // 这里作为组件的挂载点,react-router会帮我们把匹配的route插入到这里
        {this.props.children}
      </div>
    );
  },
});
//about组件
const About = React.createClass({
  render() {
    return <h3>About</h3>;
  },
});
//内部box组件嵌套路由
const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    );
  },
});
//最内部组件,其中params是路由跳转中传递的参数集合对象
const Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>;
  },
});
//最后整个App的渲染
React.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>,
  document.body
);
```

### 默认首页

在 react-router 中有一个 IndexRoute 组件,可以作为路径为'/'时匹配的路由

```js
import { IndexRoute } from "react-router";
const DashBoard = React.createClass({
  render() {
    return <div>HOME</div>;
  },
});
React.render(
  <Router>
    <Route path="/" component={App}>
      {/* 当 url 为/时渲染 Dashboard */}
      <IndexRoute component={Dashboard} />
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>,
  document.body
);
```

### 绝对路径

**直接使用绝对路径,只要内部的组件被匹配到,外层的父组件就会渲染,跳过匹配**

### 进入离开 Hook

- onEnter
- onLeave

触发顺序时组件包裹逻辑顺序

## 路径匹配原理

1. 嵌套关系:嵌套关系被抽象成路径树,深度优先遍历匹配的路由并渲染
2. 路径语法
3. 优先级

## 可回溯性

1. history 模式
2. hash 模式

## 懒加载

Route 里可以定义三个函数实现懒加载

1. getChildRoutes
2. getIndexRoute
3. getComponents

```js
const CourseRoute = {
  path: "course/:courseId",

  getChildRoutes(location, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require("./routes/Announcements"),
        require("./routes/Assignments"),
        require("./routes/Grades"),
      ]);
    });
  },

  getIndexRoute(location, callback) {
    require.ensure([], function (require) {
      callback(null, require("./components/Index"));
    });
  },

  getComponents(location, callback) {
    require.ensure([], function (require) {
      callback(null, require("./components/Course"));
    });
  },
};
```
