# Less
### 变量(Variables)
**@name：value；声明变量，不能改变，不能重复声明**
  1. 变量插值 {} 用大括号，此时不用加@
  2. 懒加载 同一个作用域生命的变量，后面覆盖前面
  3. 拓展
---
### 混合(Minins)——不强调层级
**将一个选择器当作属性应用在另一个选择器内，则前一个选择器内的属性就会复制在后一个选择器内**
   1. 语法 .a()=.a
   2. 想用一个混合属性但不想其最终应用出来，可以在名字后面加（）
   3. 选择器也会被展开
   4. 条件混合 #namespace when (@mode=huge)
   5. !important关键字，将所有展开的所有属性标记为！important
   6. 给混合器传参/设置默认值
   7. 多个参数，用分号分隔，如果形参匿名传则按位置赋值，如果参数按变量名字传，则按变量名一一对应赋值
   8. @arguments,在mixins内引用代表传进来的所有参数
   9. @rest 接受可变数量的参数，可以用@rest接收
   10. 模式匹配：如果形参不是变量，传进去的时候如果不一样就不匹配，变量匹配所有实参
   11. 模拟函数
---
### 嵌套——强调层级
**子元素的样式可以直接写在父元素的样式内部，不需要选择器嵌套单独写**
---
### 嵌套指令会冒泡 @media @supported @document
**指定一个选择器在不同情况下的属性不同，可以把不同情况下的样式写在这个选择器下，编译后，选择器和对应的样式会设置在不同的指令下,@font-face @keyframes 指令会直接冒泡到外层，因为其不依赖属性**
---
### 操作符
**可以对单位使用+-*/计算，也可以将变量当作操作符对象，单位要注意**
---
### 转义
**~'anything'引号内的字符串不会有任何变化**
---
### 函数
---
### 命名空间
**想访问对象属性一样引入某一封装好的对象样式，用id选择器作为名字**
---
### 作用域
**内层变量覆盖外层变量**
---
### 注释，同js注释语法
---
### 导入
**@import "xxx"**
