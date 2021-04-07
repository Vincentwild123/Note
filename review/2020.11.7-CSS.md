# display

### 1. 用于设置盒子的渲染形式

---

### 2. 继承性:不被继承

---

### 3. 属性一览

- 常用属性
  - none:在 renderTree 上剔除
  - block:以块级盒子渲染
  - inline-block:以行内块级盒子渲染
  - inline:以行内盒子渲染
  - flex:flex 布局
  - grid:网格布局
- 不常用属性
  - table 一系列
  - inherit 继承父级 display 属性
  - list-item 列表项,类似 li

---

### 4. flex

---

##### 1. 启动 Flexbox 格式化上下文(FFC)

```css
display: flex || inline-flex;
```

- 设置后该元素变成 flex-box,子元素自动变成 flex-item,在 flex-box 内有自己的渲染规则.

---

##### 2. flex-box 属性

1. flex-direction:row||column||row-reverse||column-reverse 设置 items 的排列方向和顺序

- **默认值:row**

2. flex-wrap:wrap||nowrap||wrap-reverse 设置 item 在容器内是否换行,wrap-reverse 设置换行并且行的顺序反方向排列

- **默认值:nowrap**

3. flex-flow:flex-direction 和 flex-wrap 的速记写法

4. justity-content:flex-start||flex-end||center||space-between||space-around 设置 item 在主轴方向上的对齐方式

- **默认值:flex-start**

5. align-items:flex-start||flex-end||center||stretch||baseline 设置 items 在副轴方向上的对齐方式

- **默认值:stretch**

* stretch:让所有 item 高度和 flex 容器一样高
* flex-start:顶部对齐
* flex-end:底部对齐
* center:居中
* baseline:基线对齐

6. align-content:flex-start||flex-end||center||stretch 用于多行 item 在副轴上的排列方式

- **默认值:stretch**

---

##### 3.flex 项目属性

1. order:此时按照 html 中的顺序排列,设置为正数,越大排越后,相同按照 html 中的顺序

- **默认值:0**

2. flex-grow/flex-shrink:控制 flex 项目在容器有多余空间时如何放大和缩小,0 就是关闭,大于 0 是开启

- **默认值:flex-grow:0 / flex-shrink:1**

3. flex-basis:设置容器初始大小,单位不能省略

- **默认值:auto**

4. flex 速记写法---->flex:flex-grow flex-shrink flex-basis

- 没 flex-basis,或者 flex-basis 为 0 是绝对的,只基于 flex-grow 比例布局
- 有 flex-basis 是相对的,基于内容大小.
- flex:none 相当于 flex:0 0 auto
- flex:auto 相当于 flex:1 1 auto
- flex:positive number x 相当于 flex:x 1 0,按照比例算

flex:auto 1 1 auto
flex:none 0 0 auto
flex:positive num :x 1 0


flex-basic:auto,px...等是相对flex，基于内容计算宽度
flex-basic:0 是绝对flex，只根据flex计算


5. align-self:auto||flex-start||flex-end||center||baseline||stretch 设置单个 flex-item 在副轴上的对齐方式

##### 4.一些细节

1. 在 item 上设置 margin 值,justify-content 失效,margin 方向会占据剩余空间

2. 如果设置了 visibility: hidden; | visibility: collapse; | transform: scale;的 flex-item content 依然被算进主轴尺寸,CSS 解析器依然会以他们 flex-grow | flex-shrink 将可用空间或者负可用空间分配给他们

3. 设置了 display: none; CSS 解析器不会对该 item 的空间进行计算,也不会对其 grow 空间

4. flex-item 设置 absolute 对位置的影响

- 有 top,left 定位的,按 top,left 定位,没有的按照 justify-content,align-items 对齐

- 上一步后,margin 影响位置,padding 只影响大小

5. flex-item-size 的宽度计算:一个 item 宽度为 margin+border+padding+content

- height/width:auto,内容长度比 flex-basis 大,则 flex-item content 以内容长度来决定,且无法 shrink

- 元素没有默认固定宽高,flex-basis 的优先级比 width[height]: 非 auto 高

- 元素有默认固定宽高,比如 input,以固定宽高为下限,flex-basis 为上限

- 对于设置了 min/max-height[width]的元素,最大最小值,分别为上下限,flex-basis 在限度内,则为 flex-basis

6. 一些兼容 Bug

- 在 IE10~11 浏览器,min-height 不适合于 flex 容器的子元素 flex 项目.如果可能的话,使用 height 来替代 min-height.
- 在 Chrome,Opear 和 Safari 浏览器不识别 flex 项目内容的最小尺寸.可以设置 flex-shrink 的值为 0(而不是默认的 1),以避免不必要的收缩.
- 不使用无单位的 flex-basis 值,因为在 IE10~11 中,flex 简写被忽略.常使用 0%来替代 0px.

---

# 参考文章:

1. 深入理解 flex 布局以及计算

- https://www.cnblogs.com/ChenChunChang/p/6681744.html

2. 解决 Flexbox 跨浏览器兼容 Bug

- https://www.w3cplus.com/css3/normalizing-cross-browser-flexbox-bugs.html

3. 理解 Flexbox:你需要知道的一切

- https://www.w3cplus.com/css3/understanding-flexbox-everything-you-need-to-know.html

### 5.grid

##### 1. 只对直接子元素生效

##### 2. 设置网格布局后,浮动,display:inline-block,display:table-cell,vertical-align,column 无效

##### 3. 行列,行和列交叉区域叫做单元格,网格线

##### 4. 容器属性:

- display:grid
- grid-template-columns/grid-template-rows 列宽行高
  1.  repeat(重复次数,值或者模式)
  2.  auto-fill 自动填充
  3.  fr 倍数关系
  4.  minmax 宽度范围
  5.  auto 浏览器自己决定长度
  6.  网格线名字 c1 100px c2
- grid-row-gap/grid-column-gap/grid-gap 行列间距,缩写
- grid-template-areas 定义区域及名字
- grid-auto-flow 设置子元素排列顺序,默认先行后列
- justify-items/align-items/place-items 单元格内容内部的对齐方式(左中右,上中下)
- justify-content/align-content/place-content 整个 grid 容器内的对齐方式
- grid-auto-columns/grid-auto-rows 设置浏览器自动创建的多余网格的列宽和行高

##### 5. 项目属性

- grid-column-start/grid-column-end/grid-row-start/grid-row-end 指定元素对应边框在哪条网格线
- grid-column/grid-row 上述简写
- grid-area 指定所在区域或者作为上述属性的简写
- justify-self/align-self/place-self 网格内单个项目对齐方式

# 参考文献

1. CSS Grid 网格布局教程 - 阮一峰

- http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

### flex VS grid

1. flex 主要应用于一维布局(navbar),grid 主要应用于二维布局(aside+main+footer+header)(也可以应用于一维布局)
2. Flexbox 以内容为基础,而 Grid 以布局为基础
