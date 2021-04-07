# BFC

1. 定义

- **是一块独立的,具有一定布局规则的块级区域**

2. 触发

- 根元素 html
- 浮动元素(float 不为 none)
- 绝对定位元素(position 为 absolute 和 fixed)
- 行内块(display:inline-block)
- 表格单元格(display:table-cell)
- 表格标题(display:table-caption)
- 匿名表格单元格元素(display:table/table-row/table-row-group/table-header-group/table-footer-group,inline-table)
- overflow 不为 visible
- display 为 flow-root
- 弹性元素:display:flex,display:inline-flex
- 网格元素:display:grid,display:inline-grid
- 多列容器(column-count 或者 column-width 不为 auto)

3. 特性

- 内部子元素盒子从顶部开始依此垂直排列
- 属于同一个 BFC,相邻的块级盒子会发生 margin 重叠
  - 全部都为正值,取最大者(10px,20px--->20px)
  - 不全是正值,则都取绝对值,然后用正值减去负值绝对值(-10px,20px--->10px)
  - 没有正值,则都取绝对值,然后用 0 减去最大值(-10px,-20px--->-20px)
- **相邻的盒子可能并非是由父子关系或同胞关系的元素生成**
- 子块元素的左边缘会和包含块元素的右边缘接触(子块 margin 外边缘接触包含块 content 内边缘)
- BFC 里面的元素不会影响到外面的元素
- 计算 BFC 高度时,浮动元素也要参与计算
- 浮动区域不叠加到 BFC 上

4. 用处

1. 解决 margin 穿透(兄弟穿透,父子穿透)

```html
<!-- 在下例中,由于wrap没有对子元素margin进行拦截,导致margin穿透出来,与box的margin:0重叠 -->
<style>
  .box {
    width: 100px;
    height: 100px;
    background: #ccc;
    margin-bottom: 20px;
  }
  .wrap {
    background: yellow;
  }
  .wrap h1 {
    background: pink;
    margin: 40px;
  }
</style>
<body>
  <div class="box">box</div>
  <div class="wrap">
    <h1>h1</h1>
  </div>
</body>
```

- **解决办法:wrap 盒子设置 border 或者 padding 拦截 margin 穿透,或者将 wrap 设置为 BFC 封印内部穿透**

2. 被浮动元素覆盖

```html
<!-- 下列中,由于box盒子浮动导致wrap盒子填充到它的位置被覆盖 -->
<head>
  <style>
    .box {
      width: 400px;
      height: 400px;
      background: #ccc;
      float: left;
    }
    .wrap {
      width: 600px;
      height: 600px;
      background: yellow;
    }
  </style>
</head>
<body>
  <div class="box">box</div>
  <div class="wrap">wrap</div>
</body>
```

- **解决办法:wrap 触发 BFC**

3. 子元素浮动导致父元素高度坍缩

```html
<!-- 下例中,由于子元素被设置为浮动,块级父盒子看不见子元素导致高度坍缩,无法包裹住子元素 -->
<style>
  .box {
    width: 100%;
    background: #ccc;
  }
  .wrap {
    width: 600px;
    height: 600px;
    float: left;
    background: yellow;
  }
</style>
<body>
  <div class="box">
    <div class="wrap">wrap</div>
  </div>
</body>
```

- **解决办法:父盒子触发 BFC,因为 BFC 能包裹浮动元素**
