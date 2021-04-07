# Vue

### MVVM: 模型-视图-视图模型

1. 特点:视图与模型分隔，只能通过视图模型进行通信
2. 框架主要功能：数据绑定(dom 对象数据和模型数据之间绑定),让开发者可以不操作 dom 而直接操作 js 对象，让 VM 自己改变 dom

---

### Vue 特点

## **数据绑定,组件化,但不支持 IE8,一个 vue 实例相当于一部分 html 模板的 VM**

### Vue 实例构造函数参数

1. 模板 el：挂载点
   template：替换挂载点的模板，规定要有一个根节点，属性替换
2. 数据 data 传入对象进行浅拷贝，通过 vm.$data进行访问，声明前加入的变量才是响应式的，后期可以用$set
   组件类型通过 props 获取数据，且如果有 data 需用函数
3. 方法 methods：视图模型方法对象  
   events 在 2.0 改成$on ,$emit
4. 生命钩子： 1. create：数据，事件，未编译，未挂载，el 不可用，但数据方法均可用，常用于初始化 data,假如有某些数据必须获取才允许进入页面的话，并不适合在这个方法发请求，建议在组件路由钩子 beforeRouteEnter 中完成 2. mounte：将编译好的 html 渲染到 html 页面中 3. update：虚拟 dom 重新渲染和打补丁 4. destroy：清除事件监听器

---

### 数据绑定

1. 文本插值
2. 绑定表达式
3. 过滤器
4. 指令
5. 计算属性：computed：xxx:{set:function,get function},
6. 表单控制：v-model 值绑定
   1. 属性控制：v-bind/:
   2. Class 绑定：v-bind:class
   3. Style 绑定：v-bind:style
7. 模板渲染增强：
   1. v-if/v-else:dom 级别变化 v-show/v-else：样式变化
   2. v-for 列表渲染，工具模板 template 不渲染
      渲染数组：(item,index) in items \$index
      渲染对象： (key,index) in items
8. 事件绑定与监听：v-on /@ 获取原生 dom： click=“click”/click=“click(\$event)"  
   dom 事件修饰符:.stop :阻止冒泡 .prevent:阻止默认行为

---

### 指令

1. v-bind：绑定属性
2. v-model：绑定表单 修饰符：lazy 延时改变 number 转换为数字
3. v-for: (item,index) (value,key) 增加 v-bind:key 作为缓存索引
4. v-on ：监听事件 组件上加 .native
5. v-text: 作为 dom 元素文本值 避免闪现
6. v-html: 作为 dom 元素 innerhtml 值 避免闪现
7. v-el : 为 dom 结点元素建立映射 ，通过 vm.\$els 访问， html 命名规则：大写变成小写，-连接后一个字符变成大写
8. v-ref：为子组件建立映射，通过 vm.\$refs 访问子组件
9. v-pre：不编译这个组件
10. v-cloak: 隐藏未编译的 mustache
11. v-once：标记组件只渲染一次
12. 自定义指令： 1. 指令注册：
    全局注册：Vue.directive(id,definition)
    组件注册：directives：{ 'id':{} }  
     2. 参数对象：{三个函数：bind update unbind} 参数为：el,binding,vnode,oldvnode 3. 实例属性：el：绑定的元素
    vm：vue 实例
    expression：指令的表达式
    arg：指令的参数
    name：指令的名字
    modifiers：对象，包括指令的修饰符
    descriptor：对象，包含指令的解析结果 4. 高级选项
    1.params：数组，值为绑定元素的对应名的属性值
    动态绑定：绑定 vue 实例的 data 值，设置监听
    2.twoWay：boolean 值为 true 时，双向绑定 用 this.set 设置 vue 实例值
    3.acceptStatement：boolean 定义是否接受内联语句
    4.priority：指令优先级，默认 1000

---

### 过滤器：

    注册：Vue.fliter('id',function(){})  只能用于{{}}

### 组件

1. 注册：
   全局注册：Vue.component(‘id'，{})；
   局部注册：component：{'id',options}
2. props：传入的是引用
   1. 静态传入：使用时直接传入
   2. bind 动态绑定父组件的值
   3. 绑定类型 1.默认单向绑定:.once 2.双向绑定:.sync 4.验证略
3. 组件通信：
   1. 无敌 API $root $children \$parent 直接访问
   2. 自定义事件监听：\$on
   3. 触发事件： 1. $emit :在本身上触发
        2. $dispatch：父链冒泡，处理函数若返回 true 继续向上冒泡 3. \$broadcast：广播 4.兄弟通信：子传父，父传子，Vuex，eventbus
      父子通信：props, dispatch,broadcase 5.内容分发（混合父子组件模板）：slot 插槽，将父组件属性编译到插槽中，再插入到子组件的 slot 中
      子组件属性模板均在子组件作用域内编译，父组件插槽和属性均在父组件作用域内编译 1.默认 slot：允许在子组件中设置一个<slot>标签，给找不到位置的父组件插槽插入 2.同级的多个 slot，多次插入
      6.keep-alive 将组件放进缓存中，不会重新渲染

---

### vue-router:路由

1. 使用:new VueRouter({routes:[]}) routes 数组：元素为对象，path 和 component 的映射，然后挂载到 vue 实例上
2. 嵌套:在对象中加入 children 数组,子 path 不用加/
3. 跳转：<router-link>标签代替 a 标签,to 属性设置跳转路径,router.push ,router.replace ,router.go 模仿 window.history
   参数可以为：字符串,对象,命名路由,带查询参数
   参数: name+params path+query
4. 钩子函数(to,from,next)
   1. 全局路由切换钩子:beforeEach(function(to,from,next){ }) afterEach 切换前后调用 一定要调用 next 函数
   2. 单个路由钩子：路由初始配置时设置 beforeEnter
   3. 组件内：beforerouterenter：不可以访问组件的 this beforerouteupdate 组件复用时可以调用 beforerouterleave
5. 路由允许同级展示多个组件 name 属性注册
6. 动态匹配：
   1. path 中用:设置,传入参数可以在 this.$route.params对象中看到,还有$route.query (如果 URL 中有查询参数)、\$route.hash
   2. 可以在组件内用 watch 监控$route的变化：watch：{'$route':(to,from){ }}或者设置新增的 beforerouteupdate 守卫(to,from,next)
      path 中用\* 设置，\$route 对象就会拥有一个 pathmatch 对象存放 url
7. 匹配优先级：谁先定义优先级就高
8. 重定向
9. 路由进阶：
10. 路由守卫 next 函数参数： 1. 空：进行管道下一个钩子 2. false：中断导航，重置到 from 3. '/'或{path:'/'}:跳转路径 4. error：将错误传递到 router.onError 回调
    **验证身份重定向**

```js
router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else next();
});
```

2. 数据获取： 1.导航完成后获取数据 2.导航完成前获取数据
3. 滚动行为：初始化时加入下面函数

```js
scrollBehavior (to, from, savedPosition) {
         if (savedPosition) {
              return savedPosition
         }else {
              return { x: 0, y: 0 }
}
```

// return 期望滚动到哪个的位置 } 4. 懒加载：利用 promise 对象，用到在加载

```js
const Foo = () => import("./Foo.vue");
```

---

### vuex:集中式事件流通道

**store：仓库，用于储存整个应用信息，挂载 vue 实例上**

1. state 状态 this.\$store.state 获取值但不能设置值，mapstate 函数简写，
   ...mapstate({相对于}) 将自身内部的属性添加到计算属性上
2. mutations：参数：state
   以更改状态函数作为元素的对象，组件使用\$store.commit(type,data)触发。
3. actions：参数：context=\$store,commit 触发，dispatch 分发
   用于异步操作，事件函数集合，可 dispatch 分发触发其他 action
4. getter：参数：state
   this.\$store.gettre.getfunction 返回值 mapgetter 同 mapstate
5. mudules：设置组件和 store 之间的映射
6. 完整流程：在 mutation&&action 定义事件->组件触发->mutation 改 state->state 通过 getter 更新
