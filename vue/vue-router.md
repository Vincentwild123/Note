### createElement 的参数

1. {String,Object,Function} 标签名或者组件名
2. {Object} attribute 属性对象
3. {String,Array} 递归子节点标签或者数组
4. 被特殊对待的顶层对象

### 导航守卫

##### 全局守卫

1. 全局前置守卫 beforeEach 包裹在最外层,在其他所有守卫 resolve 之前,一直处于等待中

2. 全局解析守卫 beforeResolve

3. 全局后置守卫

##### 路由守卫

1. beforeEnter

##### 组件内守卫

1. beforeRouterEnter --- 不能获取组件实例 this

2. beforeRouteUpdate

3. beforeRouteLeave

## 一个完整的导航过程

1. 导航被触发
2. 前组件触发 beforeRouteLeave
3. 全局前置钩子
4. 如果是重用组件,调用 beforeRouteUpdate
5. 调用路由配置 beforeEnter
6. 解析异步组件
7. 组件 beforeRouteEnter
8. beforeResolve
9. 导航被确认
10. afterEach
11. DOM 更新
12. 调用 beforeRouteEnter 守卫的 next 函数
