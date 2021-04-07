# 设计模式

## 1.单例模式 --- 构造只能实例化一次的类,和静态类不同,实例的初始化可以延时执行,在这之前可以用来收集信息.

```js
var Singleton = (function () {
  var instance;
  function init(args) {
    //挂载实例上的公共方法和属性
    var [name, methods] = args;
    return {
      publicProperty: name,
      publicFunction: () => {
        console.log(this.name);
      },
    };
  }
  //返回一个实例出口 调用该函数返回唯一实例
  return {
    getInstance: function (...args) {
      if (!instance) instance = init(args);
      return instance;
    },
  };
})();
let a = Singleton.getInstance("vincent", () => {});
console.log(a.publicProperty);
let a = Singleton.getInstance("vincent");
console.log(a.publicProperty);
let b = Singleton.getInstance();
console.log(b.publicProperty);
```

## 观察者模式 --- 一个对象维持一系列依赖于它的观察者,当对象发生改变时通知观察者

```js
//被观察的主体对象
function Subject() {
  this.observerList = [];
}
Subject.prototype.add = function (...observers) {
  this.observerList.push(...observers);
};
Subject.prototype.notify = function () {
  this.observerList.forEach((observer) => {
    observer.update();
  });
};
Subject.prototype.remove = function (observer) {
  this.observerList.splice(this.observerList.indexOf(observer), 1);
};

//观察者类

function Observer() {}
Observer.prototype.update = function () {
  console.log("updated");
};
```

**观察者模式与发布定于模式:观察者模式中,主体和观察者之间强耦合,观察者必须定义主体更新的处理事件,在发布订阅中,通常会有一个中介担当消息传递,订阅者不一定非要定定义处理事件**

## 享元模式 --- 对相似的对象进行抽象,将属性分成内部状态和外部状态,享元对象共享内部状态

```js
//要监控的书
const books = [
  { name: "计算机网络", category: "技术类" },
  { name: "算法导论", category: "技术类" },
  { name: "计算机组成原理", category: "技术类" },
  { name: "傲慢与偏见", category: "文学类" },
  { name: "红与黑", category: "文学类" },
  { name: "围城", category: "文学类" },
];
//享元对象
class FlyweightBook {
  constructor(category) {
    this.category = category;
  }
  getExternalState(state) {
    for (const p in state) {
      this[p] = state[p];
    }
  }
  print() {
    console.log(this.name, this.category);
  }
}
// 然后定义一个工厂，来为我们生产享元对象
// 注意，这段代码实际上用了单例模式,每个享元对象都为单例， 因为我们没必要创建多个相同的享元对象
const flyweightBookFactory = (function () {
  const flyweightBookStore = {};
  return function (category) {
    if (flyweightBookStore[category]) {
      return flyweightBookStore[category];
    }
    //根据不同的类别生成享元对象,并缓存下来,实际上就是单例模式
    const flyweightBook = new FlyweightBook(category);
    flyweightBookStore[category] = flyweightBook;
    return flyweightBook;
  };
})();
books.forEach((bookData) => {
  // 先生产出享元对象
  const flyweightBook = flyweightBookFactory(bookData.category);
  const div = document.createElement("div");
  div.innerText = bookData.name;
  div.addEventListener("click", () => {
    // 给享元对象设置外部状态
    flyweightBook.getExternalState({ name: bookData.name }); // 外部状态为书名
    flyweightBook.print();
  });
  document.body.appendChild(div);
});
```

## 工厂模式 --- 根据具体的输入返回需要的对象的构造函数

```js
// JS设计模式之工厂方法模式
function factory(role) {
  if (this instanceof factory) {
    var a = new this[role]();
    return a;
  } else {
    return new factory(role);
  }
}

factory.prototype = {
  superAdmin: function () {
    this.name = "超级管理员";
    this.viewPage = ["首页", "发现页", "通讯录", "应用数据", "权限管理"];
  },
  admin: function () {
    this.name = "管理员";
    this.viewPage = ["首页", "发现页", "通讯录", "应用数据"];
  },
  user: function () {
    this.name = "普通用户";
    this.viewPage = ["首页", "发现页", "通讯录"];
  },
};
```
