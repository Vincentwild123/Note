# JS&CSS

### JS 继承

- **能够访问父类的属性和方法,且能够依据不同的子类情况进行多态重写**

- **要继承父类原型对象拥有的属性和方法,和父类构造函数中的属性和方法(父类实例才拥有)**

1. 原型链继承,类式继承

- **修改子类的原型为父类的实例**

```js
//父类构造函数
function Father(name) {
  //父类实例拥有的属性和方法
  this.name = name || "Tom";
  this.eat = function () {
    console.log("eating");
  };
}
//父类原型
Father.prototype.run = function () {
  console.log("running");
};

//子类实例
function Son() {}
Son.prototype = new Father("vincent");
var son = new Son();
son.name; //父类构造函数的属性  vincent
son.eat(); //父类构造函数的方法  eating
son.run(); //父类原型对象上的方法 running
```

**缺点**

- 继承了单一的父类对象
- 无法实现多继承
- 要想为子类原型添加属性和方法,只能在设置 prototype 之后
- 父类对象引用属性被所有子类实例共享

---

2. 原型继承

- **先创建一个干净的中间类,利用这个类继承父类原型上的属性和方法,再返回它的一个实例**

```js
//父类构造函数
function Father(name) {
  //父类实例拥有的属性和方法
  this.name = name || "Tom";
  this.eat = function () {
    console.log("eating");
  };
}
//父类原型
Father.prototype.run = function () {
  console.log("running");
};

//子类实例
function Son() {}
function CreateObject(o) {
  function f() {}
  f.prototype = o;
  return new f();
}

Son.prototype = CreateObject(Father);
//ES6
Son.prototype = Object.create(Father);
var son = new Son();
son.name; // vincent 覆写了父类属性
son.eat(); // eating copy的父类方法
son.run(); // TypeError son.run is not a function 无法访问原型对象的属性
```

**问题**

- 同原型链实现继承一样,包含应用类型的值会被所有的实例共享

---

3. 构造函数继承

- **子类实例化时,先将子类放进父类的构造函数中进行复制**

```js
//父类构造函数
function Father(name) {
  //父类实例拥有的属性和方法
  this.name = name || "Tom";
  this.eat = function () {
    console.log("eating");
  };
}
//父类原型
Father.prototype.run = function () {
  console.log("running");
};

//子类实例
function Son(name) {
  Father.call(this);
  this.name = name || "vincent";
}

var son = new Son();
son.name; // vincent 覆写了父类属性
son.eat(); // eating copy的父类方法
son.run(); // TypeError son.run is not a function 无法访问原型对象的属性
```

**缺点**

- 只是复制了父类构造函数中的属性和方法,并没有真正意义上的继承父类
- 每个子类都有父类构造函数中的方法副本,占用内存影响性能

---

4. 组合继承

- **将原型继承和构造函数继承相结合,子类实例化时先将子类 this 放进父类构造函数中拷贝属性,然后再指定原型对象为父类的实例**

```js
//父类构造函数
function Father(name) {
  //父类实例拥有的属性和方法
  this.name = name || "Tom";
  this.eat = function () {
    console.log("eating");
  };
}
//父类原型
Father.prototype.run = function () {
  console.log("running");
};

//子类实例
function Son(name) {
  Father.call(this);
  this.name = name || "vincent";
}
Son.prototype = new Father();
var son = new Son();
son.name; // vincent 覆写了父类属性
son.eat(); // eating copy的父类方法
son.run(); // runing 可以访问父类原型的属性和方法
```

**缺点**

- 调用了两次父类构造函数,子类原型属性方法被覆盖

---

5. 寄生继承

- **创建一个仅用于封装继承过程的函数,该函数在内部以某种方式来增强对象,最后再像真的是它做了所有工作一样返回对象.**

```js
//父类构造函数
function Father(name) {
  //父类实例拥有的属性和方法
  this.name = name || "Tom";
  this.eat = function () {
    console.log("eating");
  };
}
//父类原型
Father.prototype.run = function () {
  console.log("running");
};

//子类实例
function Son(name) {
  var o = Object.create(Father);
  o.name = name || "vincent";
  return o;
}
var son = new Son();
son.name; // vincent 覆写了父类属性
son.eat(); // eating 继承的的父类方法
son.run(); // runing 可以访问父类原型的属性和方法
```

**问题**

- 子类添加的方法不能复用,浪费空间

---

6. 寄生组合继承

- **修复组合继承的重复调用两次父类构造函数的 bug,**

```js
// 寄生组合式继承的核心方法
function inherit(child, parent) {
  // 继承父类的原型
  const p = Object.create(parent.prototype);
  // 重写子类的原型
  child.prototype = p;
  // 重写被污染的子类的constructor
  p.constructor = child;
}
//父类构造函数
function Father(name) {
  //父类实例拥有的属性和方法
  this.name = name || "Tom";
  this.eat = function () {
    console.log("eating");
  };
}
//父类原型
Father.prototype.run = function () {
  console.log("running");
};

//子类实例
function Son(name) {
  Father.call(this);
  this.name = name || "vincent";
}
inherit(Son, Father);
var son = new Son();
son.name; // vincent 覆写了父类属性
son.eat(); // eating 继承的的父类方法
son.run(); // runing 可以访问父类原型的属性和方法
```

---

7. ES6:extends

- **实质是先将父类实例对象的属性和方法,加到 this 上面（所以必须先调用 super 方法）,然后再用子类的构造函数修改 this.**

```js
class Father {}

class Son extends Father {
  constructor(...args) {
    super(...args);
  }
}
```

### CSS 伪元素

- **伪类和伪元素的区别**

1. 伪类
   > The pseudo-class concept is introduced to permit selection based on information that lies outside of the document tree or that cannot be expressed using the other simple selectors.

> 翻译:伪类用于选择 DOM 树之外的信息,或是不能用简单选择器进行表示的信息.前者包含那些匹配指定状态的元素,比如:visited,:active;后者包含那些满足一定逻辑条件的 DOM 树中的元素,比如:first-child,:first-of-type,:target

2. 伪元素

> Pseudo-elements create abstractions about the document tree beyond those specified by the document language.

> 翻译:伪元素为 DOM 树没有定义的虚拟元素.不同于其他选择器,它不以元素为最小选择单元,它选择的是元素指定内容.比如::before 表示选择元素内容的之前内容,也就是"";::selection 表示选择元素被选中的内容.

- **实现气泡框**

```html
<style>
    #chatbox {
      font-weight: 600;
      padding: 5px;
      position: relative;
      background-color: #83f549;
      height: 4em;
      color: black;
      width: 14vw;
    }
    #chatbox::after {
      content: "";
      position: absolute;
      top: 40%;
      left: 100%;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-left: 20px solid #83f549;
      border-bottom: 10px solid transparent;
    }
  </style>
</head>
<body>
  <div id="chatbox"></div>
</body>
```
