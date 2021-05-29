1.  是渐进式框架,由底而上,常用于制作单页面应用

2.  一个框架是否成功的标准
3.  性能
4.  社区/拓展
5.  学习成本

6.  Vue 整体概况

3.1 模板系统

1.  文本插值{{}}解析成字符串输出 html,想要输出动态 html 要用 v-html 标签
2.  v-bind/:绑定属性,

v-bind:id='varname', 先解析变量名再求值,动态参数,(v-bind:[attributeName]='varname'), 键名会被转换成小写
修饰符

注意驼峰:
class 增强
对象,直接绑定,以 boolean 真假值返回字符串
数组,返回数组项的值
style 增强
对象,值为变量,动态求值
数组,返回数组的值

3.  v-if/v-else/v-show

v-for 和 v-if 一起使用时,v-for 比 v-if 有更高的优先级

4.  v-for(item in items)
5.  v-on/@事件监听,事件处理,@click ='function name'

传入原始 DOM 事件,可以传$event
设置native修饰符表示监听原生事件
$listeners 属性

6.  v-model 表单绑定

对于不同的表单绑定不同的属性和监听不同的事件
text/textarea 文字型输入表单,绑定 value 属性和 input 事件
checkbox/radio 选择型表单,绑定 checked 属性和 change 事件
select 下拉选择型表单,绑定 value 作为 prop 和 change 事件

v-model 是语法糖,它等价于
v-bind:value = 'varname'
v-on:input= 'varname = $event.target.value'

7.  插槽

7-0 编译原则:父级模板的东西在父级作用域编译,子模版的所有内容在子作用域中编译
7-1 基本使用:在组件模板上定义一个 slot 标签,接收父组件传进来的东西
7-2 后备内容,当子作用域设置了插槽内容而父组件没有传入插槽内容时,该插槽就会拿子组件设置的值进行渲染
7-3 具名插槽
子组件设置插槽的 name 属性,没有设置名字的插槽就会被当作匿名插槽,只能有一个
父组件利用 template+v-slot 指令对应插入插槽
7-4 作用域插槽:让父组件可以访问子组件的作用域
子组件插槽绑定自身属性上去
父组件利用 v-slot:name= 'props'拿到属性
7-5 动态插槽名:v-slot:[name]

3.2 逻辑系统

1.  计算属性和 watch:计算属性适用于复杂依赖同步计算,侦听器适用于异步,开销较大的操作

2.  组件系统

父传子,props 传值:1. v-bind 传父组件动态属性 2. title='string' 直接传值
子传父:自身触发$emit('eventname', params),父组件监听, v-on, params参数会当成$event 或者函数的第一个参数传递给父组件
驼峰命名法 ---- 短横线命名法
props 验证

3.  动态组件

<component>组件绑定其 is 属性, 可以做到动态切换

4.  基础组件的全自动化全局注册

const requireComponent = require.context(

    './component',
    false,
    /Base[A-Z]\w+\.(vue|js)$/

)

5.  keep-alive
6.  异步组件,注册组件时使用()=> import('component')来返回组件

### 其他

1.  依赖注入 provide/inject
2.  混入 mixin,相同逻辑的抽离,全局混入
3.  自定义指令
4.  render 函数和 JSX,标签名+属性+子节点
5.  函数式组件

## 源码

1.  源码逻辑层层嵌套,相继往原型对象,构造函数,实例上混入 API

2.  构建过程

2.1 输入 opyions 和 constructoroptions 混合
2.2 beforeCreate 之前:初始化事件相关,生命周期,渲染相关
2.3 created 之前,进行数据双向绑定,用 object.defineproperty 进行数据劫持,依赖收集,动态更新

2.4 beforeMount 之前,模板编译成 render 函数,直接用 render 函数形式写的跳过编译过程,得到 render 函数并被包装成 watcher

2.5 mounted 之前,调用 render 函数形成 vdom,通过 patch 函数形成真实的 DOM

2.6 beforeUpdate 异步的视图更新就会触发 beforeupdate 函数,因为渲染 watcher 自带 before 属性

2.7 updated,更新完成,出现异步组件的时候,父组件会先跳过子组件的生命周期,自己执行剩下的生命周期,等到子组件加载完毕后会强制更新父组件,也就是说带有异步组件的组件更新会出现两次的 uodate 操作

3.  keep-alive 原理

将包裹的 vnode 存进 cache 对象里,当 include,exclude 规则没有发生变化的时候,直接返回 vnode 而不是编译新的 vnode

## 路由

0. 基本使用:1.创建匹配规则 2. 生成路由器 3.挂载当根组件上
1. $router和$route 对象,前者是路由器,后者是当前路由
2. 匹配规则

2-1 动态路由匹配
动态路径参数, 放在$route.params上
path:/user/:id ----> user/foo user/bar
通配符匹配到的参数放在$route.params.pathMatch 上

3.  编程式导航

router-link :to === router.push
router-link :to replace === router.replace
router.go(n)

4.  命名路由,给特定路由添加 name 属性、
5.  命名视图,设置不同的路由出口,给予名字,匹配的组件同时也要设置成多个

6.  重定向和别名

7.  路由传参
8.  hash 模式和 history 模式

9.  路由守卫

10. 全局守卫,全局前置,全局后置,beforeEach,afterEach
11. 路由专属,beforeEnter

12. 组件守卫,

beforeRouteEnter: 组件未实例化
beforeRouterUpdate: 组件复用时
beforeRouteLeave: 组件销毁时

10. 元字段,被匹配中的路由被放进$route.matched 数组中,遍历该数组,获取原字段

11. 滚动:在路由器上传入 scrollBehavior 函数,返回 x,y 坐标,并设置平滑移动

if(to.hash){

    return {
        selector:to.hash;
        behavior:'smooth'
    }

}

element.scrollIntoView({behavior:'smooth'})

## Vuex

1. 数据流: commit -> actions/mutation -> state
   state -> getter

2. getter 是 store 的计算属性
