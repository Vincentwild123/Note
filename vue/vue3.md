### 1. 组合API

**setup组件选项，在创建组件之前执行，一旦props被解析，并充当合成API的入口点**


1. setup函数里面只能访问props
2. setup函数接收props和context作为参数，返回的东西会被mixin组件选项中
3. ref函数可以创建一个响应式变量在全局都可以使用
4. 声明钩子被导出