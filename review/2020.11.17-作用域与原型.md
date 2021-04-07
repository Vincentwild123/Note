# JS 作用域与原型

### 作用域(Scope)---链表

- **标识符能够作用(LHS 访问和 RHS 访问,找容器和找值)的范围**

##### **作用域分类**

1. 全局作用域---能够在任何地方被访问

- **最外层函数和最外层定义的变量拥有全局作用域**

```js
//最外层定义的函数
function name() {}
//最外层定义的变量
let variable = {};
```

- **所有末定义直接赋值的变量自动声明为拥有全局作用域**

```js
function name() {
  variable = {}; //自动变成全局作用域变量
}
```

- **运行环境的内置对象拥有全局作用域**

```js
//浏览器宿主环境
window.location

//nodeJS
fs.readFile(function(err,data)=>{})
```

2. 函数作用域

- **在函数内声明的变量和函数拥有函数作用域**

```js
function name() {
  var variable = {};
  const Func = function () {};
}
```

3. 块级作用域

- **let,const,代码块拥有块级作用域**

```js
for (let i = 0; i < len; i++) {}
```

- **ES6 module**

```js
const fs = require("fs");
```

##### 2.作用域链(静态作用域,词法作用域)--声明时作用域链就已经确定

- **寻找变量的方式,沿着作用域链找**

- **LHS 和 RHS**

1. LHS 赋值操作的左侧的值会进行 LHS,尝试寻找变量容器
2. RHS 赋值操作右侧的值会进行 RHS,尝试寻找变量本身的值

```js
function foo(a) {
  console.log(a);
}
foo(2);
//foo(2)里面函数调用是RHS
//对形参a的赋值a=2是LHS
//打印a console.log(a)是RHS
```

- **LHS,RHS 查询失败的异常,虽然两种方式都是沿着作用域链寻找,但一旦找不到,处理方法不一样**

1. 如果 RHS 找不到所需的变量,引擎就会抛出 ReferenceError 异常(引用异常)
2. 如果 LHS 找不到所需变量时,会在全局作用域创建这个变量,前提是程序运行在非严格模式下
3. 在严格模式下,无论哪种查询找不到变量都会抛出 FeferenceEroor 异常
4. 如果 LHS 找到变量但是尝试对这个变量进行不合理操作(如非函数进行函数调用),会抛出 TypeError 异常

- **作用域在词法分析阶段就已经确定,但也有黑科技可以动态修改**

1. eval

- **接受字符串作为参数,并将其中的代码看作好像写在程序中这个位置一样,在运行前引擎并不知道会是什么代码**

```js
//欺骗引擎
function foo(str, a) {
  eval(str);
  console.log(a + b); //本来b找不到报错的
}
foo("var b = 1;", 2); //3

//整形数组求和黑科技
let nums = [1, 2, 3, 4, 5, 6, 7];
eval(nums.join("+"));
```

- 严格模式下,eval 有自己的作用域
- eavl 性能损失严重

2. with

- **重复引用同一个对象的快捷方式,可以不需要重复引用对象本身**

```js
var obj = {
  a: 1,
  b: 2,
  c: 3,
};
//with将对象处理为完全隔离的词法作用域
with (obj) {
  a = 2;
  b = 3;
  c = 4;
}
```

### 3.执行上下文(Execution Context)---运行时确定---栈

- **JS 代码首次运行,都会先创建一个全局执行上下文并压入到执行栈中,之后每当有函数被调用,都会创建一个新的函数执行上下文并压入栈内；由于执行栈 LIFO 的特性,所以可以理解为,JS 代码执行完毕前在执行栈底部永远有个全局执行上下文.**

- **js 执行过程**

1. 解释阶段:

- 词法分析
- 语法分析
- 作用域规则确定

2. 执行阶段:

- 创建执行上下文
- 执行函数代码
- 垃圾回收

- **执行上下文的创建**

1. 创建阶段

- 确定 this(This Binding)

* 在全局执行上下文中,this 总是指向全局对象
* 在函数执行上下文中,this 的值取决于函数的调用方式,如果被一个对象调用,那么 this 指向这个对象.否则 this 一般指向全局对象 window 或者 undefined(严格模式)

- 创建词法环境组件(LexicalEnvironment)

* 环境记录:存储当前环境中的变量和函数声明的实际位置
* 对外部环境引入记录:保存自身环境可以访问的其它外部环境

```js
// 全局环境
GlobalExectionContext = {
    // 全局词法环境
    LexicalEnvironment: {
        // 环境记录
        EnvironmentRecord: {
            Type: "Object", //类型为对象环境记录
            // 标识符绑定在这里
        },
        outer: < null >
    }
};
// 函数环境
FunctionExectionContext = {
    // 函数词法环境
    LexicalEnvironment: {
        // 环境纪录
        EnvironmentRecord: {
            Type: "Declarative", //类型为声明性环境记录
            // 标识符绑定在这里
        },
        outer: < Global or outerfunction environment reference >
    }
};
```

- 创建变量环境组件(VariableEnvironment)

- 词法环境用于存储函数声明与 let const 声明的变量,而变量环境仅仅存储 var 声明的变量.

- **整个创建过程伪代码**

```js
let a = 20;
const b = 30;
var c;

function multiply(e, f) {
 var g = 20;
 return e * f * g;
}

c = multiply(20, 30);

//全局执行上下文
GlobalExectionContext = {
    // this绑定为全局对象
    ThisBinding: <Global Object>,
    // 词法环境
    LexicalEnvironment: {
        //环境记录
      EnvironmentRecord: {
        Type: "Object",  // 对象环境记录
        // 标识符绑定在这里 let const创建的变量a b在这
        a: < uninitialized >,
        b: < uninitialized >,
        multiply: < func >
      }
      // 全局环境外部环境引入为null
      outer: <null>
    },

    VariableEnvironment: {
      EnvironmentRecord: {
        Type: "Object",  // 对象环境记录
        // 标识符绑定在这里  var创建的c在这
        c: undefined,
      }
      // 全局环境外部环境引入为null
      outer: <null>
    }
  }

  // 函数执行上下文
  FunctionExectionContext = {
     //由于函数是默认调用 this绑定同样是全局对象
    ThisBinding: <Global Object>,
    // 词法环境
    LexicalEnvironment: {
      EnvironmentRecord: {
        Type: "Declarative",  // 声明性环境记录
        // 标识符绑定在这里  arguments对象在这
        Arguments: {0: 20, 1: 30, length: 2},
      },
      // 外部环境引入记录为</Global>
      outer: <GlobalEnvironment>
    },

    VariableEnvironment: {
      EnvironmentRecord: {
        Type: "Declarative",  // 声明性环境记录
        // 标识符绑定在这里  var创建的g在这
        g: undefined
      },
      // 外部环境引入记录为</Global>
      outer: <GlobalEnvironment>
    }
  }
```

- **关于作用域死区,var 声明的变量在创建阶段被赋值 undefined,const,let 声明的变量被设置为未初始化**

2. 执行阶段

- **根据运行时创建的执行上下文确定 this,根据静态作用域链确定变量访问范围**

### 原型

- **除了 Object.protoype,每一个对象都有一个原型对象,该对象被所有实例共享,可以理解为代理**

### 原型链---之前写过了,直接贴过来

### 原型链和作用域链

- **对象上的属性沿着原型链找,作用域里的属性沿着作用域链找**

### CSS---三栏布局

1. flex

```html
<style>
    * {
        margin: 0;
        padding: 0;
    }
    .container {
        height: 50vh;
        width: 100%;
        display: flex;
    }
    .left,
    .right {
        flex: 0 0 200px;
        background-color: gray;
    }
    main {
        flex: 1;
        background-color: red;
    }
    </style>
</head>
<body>
    <div class="container">
    <section class="left"></section>
    <main></main>
    <section class="right"></section>
    </div>
</body>
```

2. 圣杯

- **将中间容器宽度设置 100%自适应,左右两边容器依靠浮动和负 margin-left 移动到两边,父盒子设置 padding 将内容挤到中间防止被浮动覆盖**

- **注意：当父盒子宽度小于左右两边栏宽度，即放不下左右边栏时，页面发送变形**

```html
<style>
  .container {
    overflow: hidden;
    width: 100vw;
    background-color: black;
    box-sizing: border-box;
    padding: 0 200px;
  }
  .left {
    position: relative;
    left: -200px;
    background-color: rgb(88, 139, 12);
    width: 200px;
    margin-left: -100%;
  }
  .right {
    position: relative;
    right: -200px;
    margin-left: -200px;
    background-color: blue;
    width: 200px;
  }
</style>
<body>
  <div class="container">
    <section class="center">CENTER</section>
    <section class="left">LEFT</section>
    <section class="right">RIGHT</section>
  </div>
</body>
```

3. 双飞翼

- **原理与圣杯布局基本相同，只不过是给中间栏外包了一层，用外面的新层代替父盒子创建 padding，此时两边栏不用再左右移动自身宽度**

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .container {
    overflow: hidden;
    width: 100vw;
    background-color: black;
  }
  section {
    float: left;
    color: wheat;
    height: 25vh;
  }
  .center {
    background-color: red;
    width: 100vw;
    padding: 0 200px;
    box-sizing: border-box;
  }
  .left {
    margin-left: -100%;
    background-color: rgb(88, 139, 12);
    width: 200px;
  }
  .right {
    margin-left: -200px;
    background-color: blue;
    width: 200px;
  }
</style>
<body>
  <div class="container">
    <section class="center">
      <div class="content">CENTER</div>
    </section>
    <section class="left">LEFT</section>
    <section class="right">RIGHT</section>
  </div>
</body>
```

4. grid

- **简单设置列宽即可**

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .container {
    width: 100%;
    display: grid;
    grid-template-rows: 50vh;
    grid-template-columns: 300px auto 300px;
  }
  .left {
    background-color: gray;
  }
  .right {
    background-color: gray;
  }
  .center {
    background-color: red;
  }
</style>
<body>
  <div class="container">
    <section class="left">LEFT</section>
    <section class="center">CENTER</section>
    <section class="right">RIGHT</section>
  </div>
</body>
```

5. 定位

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  div {
    height: 50vh;
  }
  .left {
    position: absolute;
    left: 0;
    width: 300px;
    background-color: gray;
  }
  main {
    position: absolute;
    left: 300px;
    right: 300px;
    background-color: red;
  }
  .right {
    position: absolute;
    right: 0;
    width: 300px;
    background-color: gray;
  }
</style>
<body>
  <div class="container">
    <section class="left"></section>
    <main></main>
    <section class="right"></section>
  </div>
</body>
```
