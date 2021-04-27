# JS&html

## ES6 模块化

### 历史

1. 婴儿期

**在这个阶段的 js 只是用来写简单的交互,整个网站也区区几百行代码,根本没有命名冲突变量污染的问题,也没有专业的前端工程师,都是后端工程师顺手写的**

#### _大事件_

- 1996 年 javascript 被交给 ECMA 标准化
- 1998 年网景公司被 IE 击败,宣布破产
- 1998 年 AJAX 被 IE 内嵌

![网景浏览器](https://user-images.githubusercontent.com/8794029/55323932-19308480-54b3-11e9-9a6f-c1d1d28e81b8.jpg)

2. 学童期

**曾经的婴儿 javascript,在 1996 年被网景公司提交给 ECMA 标准化之后逐渐长大,在 1998 年,网景公司被微软捆绑的 IE 击败后,销声匿迹,宣布破产,但 javascript 还是在 ECMA 怀抱下成长了起来,于 1998 年,AJAX 诞生,javascript 被寄予厚望,不再只是做简单的交互,还被用来写数据逻辑层,代码量疯狂增长,曾经被忽视的问题也慢慢出现,变量命名冲突,依赖混乱像恶魔一样出现在前端领域,曾经顺手就可以写的前端,慢慢的也越来越棘手,改革之路势在必行**

#### _大事件_

- IE 称霸市场,几乎不再更新
- ES4 流产,javascript10 年未更新
- 2008 年,ES5 发布,但只解决了 API 层面的问题

![IE](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606481088443&di=07a4dbadf838650c5b9e212cdf1c2857&imgtype=0&src=http%3A%2F%2Fsrc.onlinedown.net%2Fd%2Ffile%2Fp%2F2018-04-24%2F57855a89355811fdefb932f6c42c98ce.jpg)

3. 翩翩少年

**据老人们回忆说,2008 年还是孩童的 javascript 似乎是一夜长大的,翻看当年的史册才发现,在 2008 年谷歌发布 V8 引擎,将 js 执行速度提升到了前所未有的高度,这样翩翩少年自然引来了很多仰慕的少女,这也是前端妹子比后端多的原因,一年后,也就是 2009 年,Ryan 把 V8 搬到了后端,nodejs 横空出世,进驻后端的同时,javascript 依赖混乱,变量冲突的问题被放大,CommonJS 随后诞生,前端模块化道路正式开始!**

> CommonJS 这个项目最开始是由 Mozilla 的工程师 Kevin Dangoor 在 2009 年 1 月创建的，当时的名字是 ServerJS。
> 我在这里描述的并不是一个技术问题，而是一件重大的事情，让大家走到一起来做决定，迈出第一步，来建立一个更大更酷的东西。 —— Kevin Dangoor's What Server Side JavaScript needs

#### _大事件_

- 2008 年，V8 发布
- IE 的市场逐步被 firefox(网景投胎转世) 和 chrome(V8 贵族) 蚕食，现已无力回天
- 2009 年，nodejs 发布，并附带 commonjs 模块化标准

![node爸爸](http://s1.abv24.com/i/1/140_ryan_dahl.jpg)

4. 成年

**随着 CommonJS 成为 nodeJS 模块化的规范,有人就想在浏览器也进行模块化,但 CommonJS 的同步机制对浏览器加载速度很不利,于是乎 AMD 规范出炉,相继的，CMD 规范出炉，它对 AMD 规范进行了改进,等到 2015 年,ES6 出世,javascript 正式成熟,拥有了编写大型应用的能力,接着模块化的春风,各种框架(vue,react,angular),包管理器(npm,yum),各种终端运行实现(weex,react native,Electron,鸿蒙生态)如雨后春笋一样,百花齐放,前端迎来拥有前所未有的光明前景**

#### _大事件_

- 2015 年,ES6 发布

![前端](https://pic2.zhimg.com/05546ef00d17f95581cf446f2249d36a_1200x500.jpg)

---

### 具体实现演变

1. 认知革命 --- IIFE 代表人物 JQuery 出生年月 2006 年 1 月

```js
var global = typeof window !== "undefined" ? window : this;
var factory; //line 40 第二个参数
(function (global, factory) {
  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get jQuery.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var jQuery = require("jquery")(window);
    // See ticket #14549 for more info.
    module.exports = global.document
      ? factory(global, true)
      : function (w) {
          if (!w.document) {
            throw new Error("jQuery requires a window with a document");
          }
          return factory(w);
        };
  } else {
    factory(global);
  }
  // Pass this if window is not defined yet
})(global, factory);
```

---

2. 农业革命 --- CommonJS 代表人物 nodeJS 出生年月 2009 年 1 月

```js
// path/ModuleA.js
var ModuleA = function () {
  //code
};
module.exports = ModuleA;
//-------------------------
// path/ModuleB.js
var ModuleB = function () {
  //code
};
module.exports = ModuleB;
//------------------------
// path/index.js
var ModuleA = require("./path/ModuleA");
var ModuleB = require("./path/ModuleB");
ModuleA();
ModuleB();
```

_特点_

- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序。
- 单独文件作为模块,单独作用域
- 每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。
- require 读取文件并执行,返回 module.exprots 对象
- 为了方便，Node 为每个模块提供一个 exports 变量，指向 module.exports。

_module 对象_

- module.id 模块的识别符，通常是带有绝对路径的模块文件名。
- module.filename 模块的文件名，带有绝对路径。
- module.loaded 返回一个布尔值，表示模块是否已经完成加载。
- module.parent 返回一个对象，表示调用该模块的模块。
- module.children 返回一个数组，表示该模块要用到的其他模块。
- module.exports 表示模块对外输出的值。

---

3. 工业革命 --- AMD(Asynchronous Module Definition) 代表人物 require.js

```js
requirejs(["helper/util"], function (util) {
  //This function is called when scripts/helper/util.js is loaded.
  //If util.js calls define(), then this function is not fired until
  //util's dependencies have loaded, and the util argument will hold
  //the module value for "helper/util".
});

// 定义模块
define(["path/util/Animation"], function (Animation) {
  // Slider code
  return Slider;
});

// 加载执行模块
require(["path/Slider"], function (Slider) {
  Slider();
});
```

_语法_
**define(id?: String, dependencies?: String[], factory: Function|Object);**

- id 是模块的名字，它是可选的参数。
- dependencies 指定了所要依赖的模块列表，它是一个数组，也是可选的参数，每个依赖的模块的输出将作为参数一次传入 factory 中。如果没有指定 dependencies，那么它的默认值是 ["require", "exports", "module"]。
- factory 是最后一个参数，它包裹了模块的具体实现，它是一个函数或者对象。如果是函数，那么它的返回值就是模块的输出接口或值

---

4. 科学革命 ES6 module 代表人物 谷歌浏览器(业界楷模)

```js
// path/ModuleA.js
var ModuleA = function(){
    //code
}
exports default ModuleA;
//-------------------------
// path/ModuleB.js
var ModuleB = function(){
   //code
}
exports default ModuleB;
//------------------------
// path/index.js
import ModuleA from './path/ModuleA';
import ModuleB from './path/ModuleB';
ModuleA();
ModuleB();
```

_语法_

- export 命令用于规定模块的对外接口

```js
// profile.js
export var firstName = "Michael";
export var lastName = "Jackson";
export var year = 1958;
```

- import 命令用于输入其他模块提供的功能。

```js
import { firstName, lastName, year } from "profile.js";
```

- 使用 as 关键字重命名

```js
import { lastName as surname } from './profile';

function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
};
```

- export default 输出一个叫做 default 的变量或方法，然后系统允许你为它取任意名字

```js
// export-default.js
export default function () {
  console.log("foo");
}
```

_特点_

- 遇到 import 指令时,只生成一个只读引用,等到取值时才会去模块里取值

---

##### **浏览器里的 import**

```html
<script type="module" src="1.mjs"></script>
```

1. import 的地址前面不能是光秃秃的

```js
// 目前不支持，以后可能支持
import { foo } from "bar.mjs";
import { foo } from "utils/bar.mjs";
```

2.  默认 Defer 行为,内联 script 同样 defer 特性

3.  模块只会执行一次

4.  总是 CORS 跨域

```js
<script type="module" src="//apps.bdimg.com/.../jquery.min.js"></script>
//跨域出错
```

5. 天然严格模式

---

## cookie 和 session 和 token

### cookie

1. 作用

**标识用户,存储与安全性无关数据,作为登录通过凭证**

**纯文本**

2. 服务器可以主动要求设置

**设置请求头**

```js
Set-Cookie:value [;expires=data][Max-Age][;domain=domain][;path=path][httpOnly][;secure]
```

3. 参数说明

- value 键值对,可多个
- expires 有效日期,格式为 Wdy,DD-Mon--YYYY HH:MM:SS GMT 的值
- Max-Age 存活时间,为正数,负数时不创建磁盘文件,只会保存在内存中,时效性同 Session,为 0 标识立即删除.
- domain 为携带 cookie 的域,用于拓展发送域
- path 与 domain 共同工作,匹配发送域,匹配 URL 中除域名外的文件路径部分,属于兼容匹配
- httpOnly 设置浏览器能否通过 js 访问 cookie
- secure 当其仅当协议为 https 或者 SSL 等安全协议才发送

4. 覆盖和新增

**需要覆盖 cookie 需要发送 domain,path,name 参数一样的 cookie,否则将会新建**

5. 限制

**每次 cookie 发送携带量最多为 4k**

**同一个域名最大的 cookie 储存数量为 20-50 不等**

### session

1. 作用

**将用户重要信息保存在服务端**

2. 方式

**用用户第一次访问提交的信息,生成 sesstionID,反过来建立 sesstionID 和用户重要信息的 HashMap**

3. 将 sesstionID 设置为 cookie,发送到服务端,每次请求就携带 sesstion

4. 分布式下的 sesstion 不同步问题解决办法

- nginx 设置 ip_hash,让同一 ip 客户机访问同一个后台服务器

- 集群间通信

- 将 session 放入缓存中间件统一管理

### token

1. 形式:json 跨语言 包含所有元信息

2. 作为令牌,不浪费空间,方便传输,方便跨域,分布式方便,因为共享密钥

3. 可以放进 URL 中

---

## 展现标签字符串

**&lt,&gt 左右括号转义**
