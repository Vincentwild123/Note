# Vue APIs
### 1. vue.config包含vue全局配置的对象，启动应用之前修改
  1. silent  布尔 取消所有日志和警告
  2. devtools 布尔 配置是否允许vue-devtools检查代码
  3. keycodes 对象 定义别名键位 
  4. performance 在浏览器开发者工具中启动对组件生命周期的性能追踪
---
### 2. 全局API Vue.xxx
 1. Vue.extend(options) 使用基础Vue构造器创建一个子类构造器(构造函数)data对象必须是函数,与vue.component的区别：前者是编程式写法后者是html标签写法
 2. Vue.nextTick(callback,options) 在dom更新结束后执行回调，可用于获取更新后的dom
 3. Vue.set 给响应式对象上增加新值
 4. Vue.directive(id,definition) 指令注册
 5. Vue.filter过滤器注册
 6. Vue.component组件注册
 7. Vue.use 插件安装
 8. Vue.compile 将模板字符串编译成render函数
 9. Vue.observable 将一个对象变成响应式的
 10. Vue.version 返回Vue的版本号
---
### 3. 选项/数据
 1. props/propsData前者用于组件，后者用于new产生的实例中
 2. 计算属性：普通getter/setter中this指向Vue实例，使用箭头函数不会指向实例，但会将实例作为第一个参数传入
 3. 使用ES5函数写法来写methods，如果用箭头函数，this将会是undefined
 4. watch /deep 深度监听
---
### 4.选项dom
 1. render渲染函数 参数是 createElement函数
   createElement函数有三个参数
     1.String/Object/Function 必填
     2.模板的属性class/style/attrs等，对象
     3.子级虚拟节点
 2. JSX 用babel插件将JSX语法html写法转换成vnode
---
#### 5.生命周期
 1. beforeCreate 数据观测，watcher/event事件配置还没开始
 2. created 数据观测完成，方法/watch完成，$el还不可用
 3. beforeMount 挂载之前调用，render函数触发
 4. mounted 不保证子组件也一起被挂载，可以使用nextTick函数设置回调
 5. beforeUpdate 数据更新之前触发，用于获取修改之前的dom
 6. updated 不保证子组件也一起被重绘，使用nextTick函数
 7. activated keep-alive组件包裹的组件激活之前被触发
 8. deactivated 被 keep-alive 缓存的组件停用时调用。
### 6.父子组件生命周期,父组件的mounted钩子会在子组件mounted触发后触发
---
### 7.选项组合
 1. $parent/$children 子组件被推入父组件$children数组中
 2. 混入mixins 
---
### 8.其他
 1. 组件name属性，在出错时有更好的提示
---
### 9.实例属性
 2. vm.$props
 1. vm.$data
 3. vm.$el
 4. vm.$options
 5. $parent/$root/$children
 6. vm.$slots:name/default
 7. vm.$refs 注册过$ref的组件
 8. vm.$attrs/listeners 父作用域的流浪属性和监听函数
---
### 10.实例方法
 1. vm.$watch （function(newvalue,oldvalue)）/deep/immediate
 2. vm.$set 同 set/vm.$delete 同delete
 3. vm.$on/vm.$emit 监听自身出发的事件
 4. vm.$once( event, callback )只触发一次
 5. vm.$off( [event, callback] ) 移除监听器
 6. vm.$mount如果没有el选项，要手动挂载
---
### 11.指令
   1. 文本相关 v-text/v-html 更新textcontent和innerhtml
   2. 渲染相关 v-show/v-if/v-else/v-else-if/v-for
   3. 事件数据相关 v-on/v-bind/v-model/v-slot缩写#
   4. 其他 v-pre/v-cloak/v-once/
---
### 12.特殊attrs
 1. key用于diff算法
 2. ref 组件注册引用
 3. is 用于动态组件
---
### 13.内置组件
  1. component 作为动态组件的容器
  2. transition 设置组件切换动画
  3. transition-group 多个组件的过渡效果
  4. keep-alive 将组件缓存，同一时间只能有一个组件被渲染
  5. slot插槽





