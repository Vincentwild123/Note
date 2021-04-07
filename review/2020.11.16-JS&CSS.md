# JS&CSS

### JS--函数

1. 函数:对一个过程或者行为的抽象封装,同时也可作为对象设置属性(一等公民)

2. 一等公民:

> **A programming language is said to have first-class functions if it treats functions as first-class citizens.**

- 一等公民函数

> passing functions as arguments to other functions. （函数能做参数传入）
> returning them as the values from other functions. （函数能作为返回值）
> assigning them to variables or storing them in data structures. （函数能够赋值给变量）

> First-class functions are a necessity for the functional programming style, in which the use of higher-order functions is a standard practice.

- **higher-order function:高阶函数(将函数作为参数或者返回值是函数的函数)**

3. 判断是不是函数

```js
typeof var === 'function' ?
```

##### typeof 返回值只有如下几种

- 'undefined'
- 'boolean'
- 'string'
- 'number'
- 'object'
- 'function'
- _typeof null 返回 'object'_

4. 创建函数

```js
//1.函数声明,默认属于全局对象属性
function name() {}

//2.函数表达式
const name = function () {};

//3.构造函数
const object = new Object();
```

5. 函数调用

```js
//1.直接调用--内部this绑定在全局对象上
name();

//2.作为对象方法调用--内部this绑定在这个对象上
object.name();

//3.new 调用--内部this先指向一块新开辟的内存,等构造函数执行完后,若无指定引用返回值,将这块内存地址赋值给变量
const object = new Name();

//4.bind,call,apply调用--this被显式绑定到指定对象上
name.call(object,arg1,arg2...);
name.apply(object,[...args]);
name.bind(object,arg1,arg2...)
```

6. 特殊函数

```js
// 1. 匿名函数:创建时没有起名字,一般作为函调函数参数或作为IIFE使用
function(){};

button.onclick = function(){};

// 2. IIFE:一般在匿名函数的基础上立即执行,常用于封装模块,闭包使用(JQuery就用的这个封装的)
(function($){})(jQuery);

//3. 箭头函数,ES2015,执行前就绑定内部this为声明时的外部this
let arrow = ()=>{};

```

7. 函数的参数---arguments

- **类数组,将传入参数包装成数组,除了 length 属性外没有其他数组属性方法,不过可以使用 Array.prototype.slice.call(arguments)类似调用**

### CSS--层叠上下文

- **由于网页具有 3 维性质,垂直屏幕指向外作为 z 轴,从而产生层叠效果**

- **形成条件**
- 文档根元素（html）；
- position 值为 absolute（绝对定位）或 relative（相对定位）且 z-index 值不为 auto 的元素；
- position 值为 fixed（固定定位）或 sticky（粘滞定位）的元素（沾滞定位适配所有移动设备上的浏览器，但老的桌面浏览器不支持）；
- flex (flexbox) 容器的子元素，且 z-index 值不为 auto；
- grid (grid) 容器的子元素，且 z-index 值不为 auto；
- opacity 属性值小于 1 的元素（参见 the specification for opacity）；
- mix-blend-mode 属性值不为 normal 的元素；

* 以下任意属性值不为 none 的元素：

- transform
- filter
- perspective
- clip-path
- mask / mask-image / mask-border
- isolation 属性值为 isolate 的元素；
- -webkit-overflow-scrolling 属性值为 touch 的元素；
- will-change 值设定了任一属性而该属性在 non-initial 值时会创建层叠上下文的元素（参考这篇文章）；
- contain 属性值为 layout、paint 或包含它们其中之一的合成值（比如 contain: strict、 contain: content）的元素。

- **层叠顺序**

1. 谁大谁上：当具有明显的层叠水平标示的时候，如识别的 z-indx 值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个。通俗讲就是官大的压死官小的。
2. 后来居上：当元素的层叠水平一致、层叠顺序相同的时候，在 DOM 流中处于后面的元素会覆盖前面的元素。

- **----张鑫旭《深入理解 CSS 中的层叠上下文和层叠顺序》上的原话 https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/**

- 层叠上下文特性
- 层叠上下文的层叠水平要比普通元素高
- 层叠上下文可以阻断元素的混合模式
- 层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的层叠上下文。
- 每个层叠上下文和兄弟元素独立，也就是当进行层叠变化或渲染的时候，只需要考虑后代元素。
- 每个层叠上下文是自成体系的，当元素发生层叠的时候，整个元素被认为是在父层叠上下文的层叠顺序中。

## **层叠的意义---渲染的优化**

### 1.RenderObject(绘制可见内容的实体)

- RenderObject 上实现了将对应 DOM 节点绘制进位图的方法,负责绘制 DOM 节点可见内容

---

## 因为有层的覆盖

### 2.RenderObject 生成 RenderLayer 的条件(定义层的单位)

- 每个 RenderLayer 的子 Layer 放在两个升序列表

  - negZOrderList 储存 z-index 为负的 renderLayer
  - posZOrderList 储存 z-index 为正的 renderLayer

- **生成条件**

- 根元素
- 明确的 CSS 定位属性(relative,absolute,transform)
- 是透明的(transparent)
- 有 overflow,alpha mask 遮罩,reflection
- CSS filter
- 有 3D 上下文或者加速 2D 上下文的画布(canvas)
- video 元素

---

## 因为动画需要快速绘制,单独提取

### 3.RenderLayer 生成 Graphics Layer(合成层)

- 3D 或透视变换(perspective,transform)
- 使用加速视频解码的元素
- 拥有 3D 上下文或者加速 2D 上下文
- 混合插件(flash)
- 对 opacity,transform,fliter,backdropfilter 应用了动画或者渐变
- will-change 设置为 opacity,transform,top,left,bottom,right
- 拥有加速 CSS 过滤器的元素
- 拥有低 z-index 且包含一个复合层的兄弟元素

1. 将不需要特殊处理能合成的直接合成一个 renderLayer
2. 将不能被直接合成的多个静态 renderLayer 特殊处理后合成为一个 Graphics Layer
3. 将静态的 Graphics Layer 和动态的 Graphics Layer 进行动静合成成最终的合成

---

- Graphics Layer 负责将自己的 Render Layer 及其子代所包含的 Render Object 绘制到位图里。然后将位图作为纹理交给 GPU。所以现在 GPU 收到了 HTML 元素的 Graphics Layer 的纹理,也可能还收到某些因为有 3d transform 之类属性而提升为 Graphics Layer 的元素的纹理.
- 现在 GPU 需要对多层纹理进行合成(composite),同时 GPU 在纹理合成时对于每一层纹理都可以指定不同的合成参数,从而实现对纹理进行 transform、mask、opacity 等等操作之后再合成,而且 GPU 对于这个过程是底层硬件加速的,性能很好。最终,纹理合成为一幅内容最终 draw 到屏幕上.

---

### 4. 具体实现

1. 相关进程

- 渲染进程:每个 tab 一个,负责执行 js 和页面渲染
  - 主线程(Main Thread)
  - 合成器线程(Compositor Thread)
  - 瓦片工人线程(Tile Worker)
- GPU 进程:整个浏览器一个,负责将 Render 进程绘制好的瓦片位图作为纹理上传到 GPU,并调用 GPU 相关方 draw 到屏幕上
  - GPU 线程(GPU Thread)

2. 相关线程工作

- 主线程
  **JS 执行,重新计算样式,更新层树,写进位图,合成层**

- 合成器线程
  **接受浏览器发出的垂直同步信号,也接受 OS 传来的用户交互(滚动,输入,点击)**

* 如果可能,合成器线程会自己处理这些内容,转换为对 layer 的位移和处理,并将新的帧 commit 到 GPU 线程,直接输出页面
* 如果你在滚轮事件注册了回调,这时合成器线程就会唤醒主线程,让后者执行 JS,完成 DOM 的计算重排,产出新的纹理,再 commit 到 GPU Thread

- 瓦片线程
  **由 Compositor 线程创建,专门将瓦片光栅化**

3. 整体流程

1. 接收到 Vsync 信号,新的一帧开始

1. 合成器线程将之前接收到的用户 UI 交互传给主线程处理
   **限定每帧一次**
1. requestAnimationFrame

1. parse HTML dom 变动解析 dom

1. Recalc Styles 重新计算样式

1. Layout 重排,

1. update layer tree
   **处理层变动**

1. Paint
   **记录哪些绘画调用,放进一个列表**

1. 主线程计算各种混合参数并把数据交给合成器线程,接着处理 input 回调

1. Raster Scheduled and Rasterize
   **光栅化**

1. commit
   **所有瓦片被光栅化后,合成器线程就会 commit 到 GPU 线程,GPU 线程把位图作为纹理上到到 GPU 里,并调用平台对应 3DAPI 把所有纹理绘制到一个位图里,从而完成纹理的合并**

### 5.具体细节

1. 重排,强制重排
   **大小位置改变会触发重排,如果在标记为 dirty 的情况下访问了 offsetTop 等属性就会强制重排**

2. 重绘
   **以合成层为单位**
