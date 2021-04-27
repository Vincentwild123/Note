# JS

![DOM事件](https://images2015.cnblogs.com/blog/775838/201610/775838-20161012201653250-699465290.png)

### UI 事件

##### **出现的目的**

1. 第一个目标是设计一个事件系统,该系统允许事件监听器的注册,并通过树结构描述事件流.此外,规范将为用户界面控制和文档变更通知提供事件的标准模块,包括为每个事件模块定义的上下文信息.

2. 第二个目标是提供现有浏览器中使用的当前事件系统的公共子集.这是为了促进现有脚本和内容的互操作性.

##### DOM 级别与 DOM 事件

- **DOM 标准的目标是让"任何一种程序设计语言"能操控使用"任何一种标记语言"编写出的"任何一份文档"."操控"具体含义为能通过 DOM 提供的 API 对文档的内容、结构、样式进行访问和修改.DOM 拥有不同的级别和不同级别的事件**

1. DOM 级别(DOM Level)

- DOM Level 1:于 1998 年 10 月成为 W3C 的推荐标准.DOM 1 级由两个模块组成:DOM 核心(DOM Core)和 DOM HTML.

- DOM Level 2:对 DOM level 1 做了扩展

- DOM Level 3:对 DOM level 2 做了进一步的扩展

- DOM Level 0: 首先我们的确定的是在 DOM 标准中并没有 DOM 0 级的.所谓的 DOM 0 级是 DOM 历史坐标中的一个参照点而已,具体说呢,DOM 0 级指的是 IE4 和 Netscape 4.0 这些浏览器最初支持的 DHTML.

2. DOM 事件

![DOM事件](https://images2015.cnblogs.com/blog/775838/201610/775838-20161006202354035-607305606.png)

- DOM 0 级事件 --- 获得 element 对象再添加事件处理函数

```html
<button id="btn" type="button"></button>
<script>
  var btn = document.getElementById("btn");
  btn.onclick = function () {
    alert("Hello World");
  };
  // btn.onclick = null; 解绑事件
</script>
```

缺点在于一个处理程序无法同时绑定多个处理函数

- DOM 2 级事件 --- ddEventListener/removeEventListener

```html
<button id="btn" type="button"></button>

<script>
    var btn = document.getElementById('btn');
    function showFn() {
        alert('Hello World');
    }
    btn.addEventListener('click', showFn, false);
    // btn.removeEventListener('click', showFn, false); 解绑事件
```

- DOM 3 级事件 --- 拓展了事件类型和允许自定义事件

* UI 事件,当用户与页面上的元素交互时触发,如:load、scroll
* 焦点事件,当元素获得或失去焦点时触发,如:blur、focus
* 鼠标事件,当用户通过鼠标在页面执行操作时触发如:dbclick、mouseup
* 滚轮事件,当使用鼠标滚轮或类似设备时触发,如:mousewheel
* 文本事件,当在文档中输入文本时触发,如:textInput
* 键盘事件,当用户通过键盘在页面上执行操作时触发,如:keydown、keypress
* 合成事件,当为 IME(输入法编辑器)输入字符时触发,如:compositionstart
* 变动事件,当底层 DOM 结构发生变化时触发,如:DOMsubtreeModified

##### **事件分派和事件流**

- **一旦发生事件,事件对象(含有事件相关信息的对象)就会经过三个阶段的派发**

![事件流](https://www.w3.org/TR/DOM-Level-3-Events/images/eventflow.svg)

- 捕获阶段 --- 从 document 到目标父级

  > The capture phase: The event object propagates through the target’s ancestors from the Window to the target’s parent. This phase is also known as the capturing phase.

```html
<script>
  function clickHandler(e) {
    console.log("捕获");
  }
  btn.addEventListener(click, clickHander, true); //设置为true表示在捕获阶段触发事件
</script>
```

- 目标阶段 --- 事件对象到达事件对象的事件目标

> The target phase: The event object arrives at the event object’s event target. This phase is also known as the at-target phase. If the event type indicates that the event doesn’t bubble, then the event object will halt after completion of this phase.

- **!!!在事件目标本身设置的无论是捕获事件处理函数还是冒泡事件处理函数都没有办法确定触发顺序,要按照定义时的顺序触发**

- 冒泡阶段 --- 从目标的父级到 document
  > The bubble phase: The event object propagates through the target’s ancestors in reverse order, starting with the target’s parent and ending with the Window. This phase is also known as the bubbling phase.

```html
<script>
  function clickHandler(e) {
    console.log("冒泡");
  }
  btn.addEventListener(click, clickHander, false); //设置为false表示在冒泡阶段触发事件
</script>
```

##### **取消冒泡 --- stopPropagation**

**在捕获阶段取消冒泡,冒泡阶段也会消失**

```html
<body>
  <div><a href="#">点击我</a></div>
</body>
<script>
  let a = document.getElementsByTagName("a")[0];
  let div = document.getElementsByTagName("div")[0];
  div.addEventListener("click", handler, true);
  div.addEventListener("click", handler, false);
  a.addEventListener("click", handler, true);
  a.addEventListener("click", handler, false);
  function handler(e) {
    e.stopPropagation();
    console.log("事件触发");
  }
  //函数触发一次
</script>
```

##### **默认操作和可取消事件 --- preventDefault**

**有些事件可用于控制实现接下来可能采取的行为(或撤消实现已经采取的操作).此类别中的事件称为可取消事件,它们取消的行为称为默认操作.可取消的事件对象可以与一个或多个"缺省操作"相关联.若要取消事件,请调用 preventDefault 方法.**

**默认操作通常在事件分派完成之后执行,但在特殊情况下,它们也可以在事件分派之前立即执行.**

```js
function goFn(event) {
  event = event || window.event;
  if (event.preventDefault) {
    event.preventDefault(); //阻止默认事件
  } else {
    event.returnValue = false; //兼容IE9之前
  }
}
```

##### **鼠标事件接口**

```js
[Constructor(DOMString type, optional MouseEventInit eventInitDict)]
interface MouseEvent : UIEvent {
  readonly attribute long screenX;
  readonly attribute long screenY;
  readonly attribute long clientX;
  readonly attribute long clientY;

  readonly attribute boolean ctrlKey;
  readonly attribute boolean shiftKey;
  readonly attribute boolean altKey;
  readonly attribute boolean metaKey;

  readonly attribute short button;
  readonly attribute unsigned short buttons;

  readonly attribute EventTarget? relatedTarget;

  boolean getModifierState(DOMString keyArg);
};
```
