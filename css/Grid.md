# CSS 网格布局

1. 只对直接子元素生效
2. 设置网格布局后,浮动,display:inline-block,display:table-cell,vertical-align,column 无效
3. 行列,行和列交叉区域叫做单元格,网格线
4. 容器属性:
5. display:grid
6. grid-template-columns/grid-template-rows 列宽行高
   1. repeat(重复次数,值或者模式)
   2. auto-fill 自动填充
   3. fr 倍数关系
   4. minmax 宽度范围
   5. auto 浏览器自己决定长度
   6. 网格线名字 c1 100px c2
7. grid-row-gap/grid-column-gap/grid-gap 行列间距,缩写
