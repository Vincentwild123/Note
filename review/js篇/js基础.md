1.  数据类型

基础类型:number,string,boolean,bigint,null,undefined,symbol
引用类型:function,object,RegExp,array,date

ps:bigint 直接在数后加 n 即可

2.  类型判断

- 判断基础类型:typeof

```js
let str = "hello world";
typeof str = "string";
```

- 判断引用类型:instanceof

```js
let str = "hello world";
str instanceof String;
```

- 普遍方法:object.prototype.toString.call()

```js
let str = null;
Object.prototype.toString.call(str) === "[Object String]";
```

ps:instanceof 的实现

```js
//A istanceof B
//A的原型链上是否有B.prototype

function istanceof(L, R) {
  //L左操作数 R右操作数
  if (typeof R !== "function") return false;
  let RP = R.prototype;
  let L = L.__proto__;
  while (true) {
    if (L === null) return false;
    if (L === RP) return true;
    L = L.__proto__;
  }
}
```

3.  正则表达式

- 全局匹配 g,设置了全局匹配后,模式串可以进行多次匹配,如果匹配成功,下一次匹配将从下一个字符索引位置开始,不成功从头开始

- 数组方法:mach ,正则表达式方法:test,exec

exec 方法:返回一个数组,数组中的第一项是匹配到的内容,后面的是括号匹配的内容
mach 方法:在不使用全局匹配时,mach 方法返回值与 exec 方法类似,但在全局匹配下,mach 返回数组都由匹配到的内容组成,不包含子匹配项

4.  Set 和 Map

set 结构的方法

- add/delete/has/clear/size
- 遍历方法:键/值/键值对/foreach
- keys/values/entries,遍历顺序就是插入顺序

```js
//使用set实现并交差集
//1.并集
let setA = new Set([1, 2, 3, 4, 5]);
let setB = new Set([4, 5, 6, 7]);

let bing = new Set([...setA, ...setB]);
let jiao = new Set([...setA].filter((item) => setB.has(item)));
let cha = new Set([...setA].filter((item) => setB.!has(item)))
```

map 结构的方法

- set/get/has/delete/size/clear
- 遍历方法:keys/values/entries/foreach 遍历顺序就是插入顺序

ps:weakmap 和 weakset
保存的都只能是对象,引用是弱引用不会被计入垃圾收集机制,使用场景,dom 元素引用的存放

5.  proxy 和 reflect

proxy 和 reflect 成对使用,reflect 上放着操作对象的 api,反射的意义是让程序能获得自己的内部状态,比如判断一个属性是不是对象的属性,原型是不是对象的原型这些关于程序本身的信息获取,就叫做反射

反射的存在意义:

1.  语义明确,意为拿到程序本身的信息
2.  让操作对象的行为变成函数式编程

proxy vs object.defineProperty

1.  proxy 能够拦截后者拦截不到的操作比如说对象属性的增加删除,这在之前是要附加的 api 来实现的
2.  无法监听数组变化,数组原型方法无法监听
3.  object.defineproperty 设置的是对象的属性,当对象属性嵌套层级太深时,要层层递归遍历,浪费时间,而 proxy 可以直接劫持对象
4.  proxy 的缺点是兼容性较差

5.  class 继承

6.  只是比较规范化的语法糖,不再让构造函数可以想普通函数那样直接执行,而是规定只能使用 new 关键字执行
7.  类内部方法的 this 默认指向实例,但是可以单独使用,此时 this 按照规则指向,很可能会报错,解决方法是使用箭头函数或者绑定 this
8.  class 的继承本质上是先在父类生成 this 再添加子类自定义的属性和方法,而 es5 的继承则是先创建子类对象,然后再传递给父类构造函数,添加属性

```js
function myNew(P) {
    let child = {};
    child.__proto__ = P.prototype;
    let ret = P.apply(child);
    return typeof ret === = 'object' ? ret : child;
}

//原型链继承
function Me(name) {
    this.name = name;
}

function Father() {
    this.name = 'tom';
}
Me.prototype = new Father;

//构造函数继承
function Me(name) {
    Father.call(this);
}

function Father() {
    this.name = 'tom';
}
//组合继承
function Me(name) {
    Father.call(this);
}

function Father() {
    this.name = 'tom';
}
Mre.prototype = new Father();
```

7.  模块化
1.  模块老祖 commonJS

关键字:require/module.exports

- 导入:1. 解析路径 2. 读取缓存(require.cache)3. 加载模块,打包成一个函数 4.module 对象运行,执行代码,缓存并返回静态数据

2.  ES6

关键字:import/export

- 特点:得到的是 const 类型动态引用

8.  async/defer 和页面加载事件
1.  普通脚本:下载和解析均会阻塞解析

1.  defer 脚本:下载不会阻塞解析,并且等到解析完成之后才会顺序执行,执行完毕后才会触发 DOMContentLoaded 事件

应用场景:脚本依赖 dom 元素或者拥有必须先执行的前置脚本呢

3.  async 脚本:下载阻塞,执行阻塞解析,与 DOMContentLoaded 事件发生无关

应用场景:无依赖的情况下都应该添加这个关键字

页面加载事件:

1.  DOMContentLoaded 事件:dom 元素被解析完成后就会触发,

2.  load 事件:全部资源加载完成后才会触发

3.  异步

4.  promise 内部错误即使没有被捕获也不会影响外面运行的代码,不会使程序退出

5.  类方法
6.  all:全部 fulfilled 才会 fulfilled,有一个 rejected 返回这个 promise 的返回值

```js
function all(promises) {
  return new Promise((resolve, reject) => {
    let fulFilledCount = 0;
    let ret = new Array(promises.length);
    promises.forEach((promise, index) => {
      Promise.reslove(promise).then(
        (value) => {
          fulFilledCount++;
          ret[index] = value;
          if (fulFilledCount === promises.length) {
            resolve(ret);
          }
        },
        (err) => reject(err)
      );
    });
  });
}
```

2.  race:返回最快的那个

```js
function race(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(
        (value) => resolve(value),
        (err) => reject(err)
      );
    });
  });
}
```

3.  allsettle:全部解决就会 resolve,不会 reject
4.  any:和 all 相反

5.  Promise.reslove/reject:将不是 promise 的参数变成 promsie,同时如果能够使状态变成 reslove 就变成 reslove,不能的话直接返回

```js
function resolve(o) {
  if (o && o instanceof Promise) {
    return o;
  } else if (o && o.then && typeof o.then === "function") {
    let then = o.then;
    return new Promise((resolve) => then(resolve));
  } else if (o) {
    return new Promise((resolve) => resolve(o));
  } else return new Promise((resolve) => resolve);
}
```

10. 发布订阅和观察者模式

发布订阅:有三个角色,发布者不用知道订阅者是谁,通过消息中心转发,订阅者也不用知道发布者是谁,通过消息中心获取消息
观察者模式:只有两个角色,发布者和订阅者,松耦合,通过规范接口实现有三个角色,

```js
//发布订阅模式
class Event {
  constructor() {
    this.addEventListener.bind(this);
    this.dispatchEvent.bind(this);
    this.removeEventListener.bind(this);
  }
  // 首先定义一个事件容器,用来装事件数组(因为订阅者可以是多个)
  handlers = {};

  // 事件添加方法,参数有事件名和事件方法
  addEventListener(eventName, handler) {
    // 首先判断handlers内有没有type事件容器,没有则创建一个新数组容器
    if (!Object.keys(this.handlers).include(eventName)) {
      this.handlers[eventName] = [];
    }
    // 将事件存入
    this.handlers[eventName].push(handler);
  }

  // 触发事件两个参数(事件名,参数)
  dispatchEvent(eventName, ...params) {
    // 若没有注册该事件则抛出错误
    if (!Object.keys(this.handles).include(eventName)) {
      return new Error("未注册该事件");
    }
    // 便利触发
    this.handlers[eventName].forEach((handler) => {
      handler(...params);
    });
  }

  // 事件移除参数(事件名,删除的事件,若无第二个参数则删除该事件的订阅和发布)
  removeEventListener(eventName, handler) {
    // 无效事件抛出
    if (!Object.keys(this.handles).include(eventName)) {
      return new Error("无效事件");
    }
    if (!handler) {
      // 直接移除事件
      delete this.handlers[eventName];
    } else {
      const idx = this.handlers[eventName].findIndex(
        (item) => item === handler
      );
      // 抛出异常事件
      if (idx === -1) {
        return new Error("无该绑定事件");
      }
      // 移除事件
      this.handlers[eventName].splice(idx, 1);
      if (this.handlers[eventName].length === 0) {
        delete this.handlers[eventName];
      }
    }
  }
}
```

11. 前端安全
1.  xss 跨站脚本,利用服务器的内容上传点,写入 script 代码,等别的用户从服务器加载数据时,脚本执行进行攻击

防范:对上传到数据库的内容进行转码,禁止出现<等有效字符

2.  csrf,利用跨域的漏洞(服务器正常响应请求但是浏览器回对返回值进行拦截),和服务器对用户的标识,通常放在 cookie 里,诱导用户点击第三方页面,向服务器进行攻击

防范:重要的操作使用非简单请求进行(put,delete),在请求头或者请求体里添加 token,检查请求来源 referer

3.  点击挟持,攻击者将正常的网页用不可识别的 iframe 覆盖,欺骗用户点击

防范:鉴别网站的 window.top 和 window 字段是否一致(是否存在嵌套的 iframe),禁止嵌套 iframe

4.  SQL 注入:利用网站不过滤字符串的特点,通过拼接字符串构造万能 sql 查找语句,进而登录后台页面
5.  DDOS 攻击,攻击者短时间内发起大量请求,影响服务器资源分配

防范:高防服务器,黑名单,ip 清洗
