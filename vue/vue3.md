### 1. 组合 API

**setup 组件选项,在创建组件之前执行,一旦 props 被解析,并充当合成 API 的入口点**

1. setup 函数里面只能访问 props
2. setup 函数接收 props 和 context 作为参数,返回的东西会被 mixin 组件选项中
3. ref 函数可以创建一个响应式变量在全局都可以使用
4. 声明钩子被导出
