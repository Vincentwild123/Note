# Vue APIs

### 1. vue.config 包含 vue 全局配置的对象,启动应用之前修改

1. silent 布尔 取消所有日志和警告
2. devtools 布尔 配置是否允许 vue-devtools 检查代码
3. keycodes 对象 定义别名键位
4. performance 在浏览器开发者工具中启动对组件生命周期的性能追踪

---

### 2. 全局 API Vue.xxx

1.  Vue.extend(options) 使用基础 Vue 构造器创建一个子类构造器(构造函数)data 对象必须是函数,与 vue.component 的区别:前者是编程式写法后者是 html 标签写法
2.  Vue.nextTick(callback,options) 在 dom 更新结束后执行回调,可用于获取更新后的 dom
3.  Vue.set 给响应式对象上增加新值
4.  Vue.directive(id,definition) 指令注册
5.  Vue.filter 过滤器注册
6.  Vue.component 组件注册
7.  Vue.use 插件安装
8.  Vue.compile 将模板字符串编译成 render 函数
9.  Vue.observable 将一个对象变成响应式的
10. Vue.version 返回 Vue 的版本号

---

### 3. 选项/数据

1.  props/propsData 前者用于组件,后者用于 new 产生的实例中
2.  计算属性:普通 getter/setter 中 this 指向 Vue 实例,使用箭头函数不会指向实例,但会将实例作为第一个参数传入
3.  使用 ES5 函数写法来写 methods,如果用箭头函数,this 将会是 undefined
4.  watch /deep 深度监听

---

### 4.选项 dom

1.  render 渲染函数 参数是 createElement 函数
    createElement 函数有三个参数
    1.String/Object/Function 必填 2.模板的属性 class/style/attrs 等,对象 3.子级虚拟节点
2.  JSX 用 babel 插件将 JSX 语法 html 写法转换成 vnode

---

#### 5.生命周期

1.  beforeCreate 数据观测,watcher/event 事件配置还没开始
2.  created 数据观测完成,方法/watch 完成,$el 还不可用
3.  beforeMount 挂载之前调用,render 函数触发
4.  mounted 不保证子组件也一起被挂载,可以使用 nextTick 函数设置回调
5.  beforeUpdate 数据更新之前触发,用于获取修改之前的 dom
6.  updated 不保证子组件也一起被重绘,使用 nextTick 函数
7.  activated keep-alive 组件包裹的组件激活之前被触发
8.  deactivated 被 keep-alive 缓存的组件停用时调用.

### 6.父子组件生命周期,父组件的 mounted 钩子会在子组件 mounted 触发后触发

---

### 7.选项组合

1.  $parent/$children 子组件被推入父组件$children 数组中
2.  混入 mixins

---

### 8.其他

1.  组件 name 属性,在出错时有更好的提示

---

### 9.实例属性

2.  vm.$props
1.  vm.$data
1.  vm.$el
1.  vm.$options
1.  $parent/$root/$children
1.  vm.$slots:name/default
1.  vm.$refs 注册过$ref 的组件
1.  vm.$attrs/listeners 父作用域的流浪属性和监听函数

---

### 10.实例方法

1.  vm.$watch (function(newvalue,oldvalue))/deep/immediate
2.  vm.$set 同 set/vm.$delete 同 delete
3.  vm.$on/vm.$emit 监听自身出发的事件
4.  vm.$once( event, callback )只触发一次
5.  vm.$off( [event, callback] ) 移除监听器
6.  vm.$mount 如果没有 el 选项,要手动挂载

---

### 11.指令

1.  文本相关 v-text/v-html 更新 textcontent 和 innerhtml
2.  渲染相关 v-show/v-if/v-else/v-else-if/v-for
3.  事件数据相关 v-on/v-bind/v-model/v-slot 缩写#
4.  其他 v-pre/v-cloak/v-once/

---

### 12.特殊 attrs

1.  key 用于 diff 算法
2.  ref 组件注册引用
3.  is 用于动态组件

---

### 13.内置组件

1. component 作为动态组件的容器
2. transition 设置组件切换动画
3. transition-group 多个组件的过渡效果
4. keep-alive 将组件缓存,同一时间只能有一个组件被渲染
5. slot 插槽
