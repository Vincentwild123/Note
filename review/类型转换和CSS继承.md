# JS&CSS

### JS 类型转换:

1. ==和===:双等号:比较数据类型,不相等时隐式转换再比,===类型不同直接 false,无论什么比较有 NaN 就是不相等.
2. 显示转换/自行转换:
   1. Number(),parseInt(),parseFloat()
      - Number():true/flase->1/0,数值返回本身,null 为空对象返回 0,undefined 返回 NaN,字符串按模式匹配转换,空字符串转换为 0;失败的自动转换成 NaN,对象按照 vauleof 方法进行转换
      - parseInt(string,radix),转换规则同字符串解析,但如果第一个字符是数字,则继续解析直至字符串解析完毕或者遇到一个非数字符号为止
      - ParseFloat(string)解析规则同上,但只有第一个小数点有效
   2. toString(),String()
   - toString:返回字符串,对象返回:[object objectname]格式
   - String 同上,但 null 返回"null",undefined 返回"undefined"
   3. Boolean()
   - 将 false,"",0,NaN,null,undefined 转换为 false,其他转换为 true
3. 隐式转换,运算符进行运算时
   - isNaN:用 Number()转换
   - 自增自减,一元正负号:转换为数值再执行操作,解析规则同 Number()
   - 加法运算符二元:
     - 其中一个为 NaN 结果为 NaN,同号 infinity 相加为 infinity,异号相加为 NaN,
     - 如果其中一个为字符串,则转换为字符串,对象则调用 toString()
4. 乘除、减号运算符、取模运算符:用 Number()转换
5. 逻辑运算符:
   - !用 Boolean()转换成布尔值取反
   - &&如果有一个是 null/undefined/NaN 则为对应值
   - ||同上
6. 关系操作符:<,>数值字符串直接比,有数值转换成数值
7. 相等运算符
   - 有数值转换成数值再进行比较,布尔转换成数值,对象用 valueof,两个对象看是不是指向同一个对象.

---

### CSS 可继承属性
1. 字体系列属性
+ font:组合字体
+ font-family:规定元素的字体系列
+ font-weight:设置字体的粗细
+ font-size:设置字体的尺寸
+ font-style:定义字体的风格
+ font-variant:设置小型大写字母的字体显示文本,这意味着所有的小写字母均会被转换为大写,但是所有使y用小型大写字体的字母与其余文本相比,其字体尺寸更小.
+ font-stretch:对当前的 font-family 进行伸缩变形.所有主流浏览器都不支持.
+ font-size-adjust:为某个元素规定一个 aspect 值,这样就可以保持首选字体的 x-height.
2.  文本系列属性
- text-indent:文本缩进
- text-align:文本水平对齐
- line-height:行高
- word-spacing:增加或减少单词间的空白（即字间隔）
- letter-spacing:增加或减少字符间的空白（字符间距）
- text-transform:控制文本大小写
- direction:规定文本的书写方向
- color:文本颜色
3. 元素可见性:visibility
4. 表格布局属性:caption-side、border-collapse、border-spacing、empty-cells、table-layout
5. 列表布局属性:list-style-type、list-style-image、list-style-position、list-style
6. 生成内容属性:quotes
7. 光标属性:cursor
8. 页面样式属性:page、page-break-inside、windows、orphans
9. 声音样式属性:speak、speak-punctuation、speak-numeral、speak-header、speech-rate、volume、voice-family、pitch、pitch-range、stress、richness、、azimuth、elevation

### 所有元素可以继承的属性
1. 元素可见性:visibility
2. 光标属性:cursor

### 内联元素可以继承的属性
1. 字体系列属性
2. 除 text-indent、text-align 之外的文本系列属性

### 块级元素可以继承的属性/
1. text-indent、text-align
