# JS & CSS

### DOM

**文档对象模型(DOM)是 HTML 和 XML 文档的编程接口,它提供了对文档的结构化表述,并定义了一种方式可以从程序中对该结构进行访问,从而改变文档结构,样式和内容.简单来说 DOM 就是对文档的一种树形数据集合的描述,且向对外提供 API**

##### window 对象,document 对象

1. **window 对象表示一个窗口或者 frame,主要提供整个窗口相关的 API,其中包含 document,导航栏,历史记录等**
2. **document 表示文档本身,主要提供文档相关的 API,比如元素查找,修改,样式修改等**

##### Node 和 Element

> All of the components of an XML document are subclasses of Node.

1. **Node 表示 dom 树中的节点,是基本类型,泛化后可以成为 Document, Element,Text 和 Comment 等,Element 只是其中的一种子类型,表示标签元素**

2. **Node 的类型及 nodeType 值**
<table>
<tr><th> Node 类型</th><th>nodeType 值</th><th>解释</th></tr>
<tr><th> ELEMENT_NODE</th><th>1</th><th>标签元素</th></tr>
<tr><th>ATTRIBUTE_NODE</th><th>2</th><th>属性</th></tr>
<tr><th>TEXT_NODE </th><th>3</th><th>普通文本</th></tr>
<tr><th>DATA_SECTION_NODE</th><th>4</th><th>数据部分节点</th></tr>
<tr><th>ENTITY_REFERENCE_NODE</th><th>5</th><th>实体引用节点</th></tr>
<tr><th>ENTITY_NODE</th><th>6</th><th>实体节点</th></tr>
<tr><th>PROCESSING_INSTERUCTION_NODE</th><th>7</th><th>处理指令节点</th></tr>
<tr><th>COMMENT_NODE</th><th>8</th><th>注释</th></tr>
</table>
3. **NodeList 和 HtmlCollection**

> A Node is an interface from which a number of DOM types inherit, and allows these various types to be treated (or tested) similarly.

> The following interfaces all inherit from Node its methods and properties: Document, Element, CharacterData (which Text, Comment, and CDATASection inherit), ProcessingInstruction, DocumentFragment, DocumentType, Notation, Entity, EntityReference.

**NodeList 是 Node 的集合,ElementCollection 是 Element 的集合,两个都不是真正的数组,而是对象**

```js
typeof document.childNodes; //'Object'
typeof document.getElementsByTagName("body"); //'object'
```

4.  Node 常用属性及方法 --- 最抽象的父类属性和方法，被所有其他类型的结点继承

- nodeType 属性,获取节点类型

- parentNode 获取父节点

- previousSibling/nextSibling 上一个/下一个兄弟节点
- childNodes/firstChild/lastChild 子代寻找

- appendChild/removeChild/replaceChild 子代增删查改

5. document 类型节点属性及方法 --- 紧接 Node 的根结点是文档树的根节点

- documentElement 获取文档唯一根元素
- createElement 创建并返回一个 element 元素
- createTextNode/createComment/createAttribute 创建不同类型的结点

### CSS

```html
<body>
  <!-- display:none  直接将元素在render树上删除-->
  <div style="display: none"></div>
  <!-- visiable:hidden  将元素设置为不可见,render树上不删除,事件不可触发-->
  <div style="visibility: hidden"></div>
  <!-- opacity:0  元素透明,其他也正常元素无异-->
  <div style="opacity: 0"></div>
  <!-- filter(opacity:0) -->
  <div style="filter: opacity(0)"></div>
</body>
<script>
  (function () {
    let divs = document.getElementsByTagName("div");
    Array.prototype.forEach.call(divs, (div) => {
      div.onclick = function () {
        console.log("has clicked");
      };
    });
    divs = null;
  })();
</script>

<!--不存在 无反应 hasclicked  hasclicked-->
```
