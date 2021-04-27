# JS,CSS

## javascript 和 ECMAScript

### 总而言之,通常来说,javascript 和 ECMASCript 指的是同一种脚本语言,准确点就是 ECMAScript 是浏览器脚本语言的共同规范,共同标准,javascript 是某些浏览器的具体实现

### JS 的历史

##### 1993 年 -- Mosaic(第一个图形接口网页浏览器)

- 研发版权:伊利诺伊大学厄巴纳-尚佩恩分校的国家超级电脑应用中心(NCSA)

##### 1994 年 -- Netscape Navigator(导航者,对内称呼为 Mozilla,意为 Mosaic 杀手,同时也是火狐母公司的名字)

##### 1995 年 -- Netscape Navigator 2.0

- 网景公司研发的浏览器需要一种脚本语言来协助浏览器进行一些简单的动态操作,在当时,因为网景公司和 Sun 公司达成联盟,借助 Sun 公司的 java 名号,将脚本名字命名为 javascript

##### 1996 年 -- 网景公司达到顶峰,浏览器占有率高达 70%,而同时期的 IE 浏览器才 15%

- 同年 8 月,微软 IE3 发布,搭载了 javascript 的克隆版,叫做 JScript

- 此时不同浏览器有不同的脚本语言的实现,导致程序开发者要为不同的浏览器编写不同的程序代码,导致开发效率底下,脚本语言的统一呼之欲出

- 同年 11 月,网景公司向 ECMA(欧洲计算机制造协会)提交语言标准

##### 1997 -- 标准产生

- javaScript 被提交给 ECMA 作为初始草案,第 39 号技术委员会(TC39)被委派来"标准化一个通用,跨平台,中立于厂商的脚本语言的语法和语义"

- 来自 Netscape,Sun,微软,Borland 等一众技术人员组成 TC39,经过一番讨论,锤炼出了 ECMA-262,该标准定义名为 ECMAScript 的全新脚本语言规范,称为 ECMAScript 是为了体现中立性,从此 ECMAScript 就开始迭代之路.

##### 从提案到入选的过程

- stage 0:strawman -- 最初的想法提交
- stage 1:proposal(提案) -- 有 TC39 至少一名成员倡导的正式提案文件,该文件包括 API 事例
- stage 2:draft(草案) -- 功能规范的初始版本,该版本包含功能规范的两个实验实现
- stage 3:candidate(候选) --提案规范通过审查并从厂商那里收集反馈
- stage 4:finished(完成) -- 提案准备加入 ECMAScript.

- **每年六月公布新的规范**

### 从 ES2015 以来各 ECMAScript 版本特性

1.  ES2015(2009-2015)

- 类
- 模块化
- 箭头函数
- 函数参数默认值
- 模板字符串
- 解构赋值
- 延展操作符
- 对象属性简写
- Promise
- let,const 关键字

2. ES7(2016)

- 数组 includes 方法
- 指数运算符\*\*

3. ES8(2017)

- async/await
- Object.values()
- Object.entries()
- String padding:padStart(),padEnd(),字符串填充
- 函数参数列表结尾允许逗号
- Object.getOwnPropertyDescriptors(),自身所有属性的描述符
- shareArrayBuffer,Atomics 对象

4. ES9(2018)

- 异步迭代
- Promise.finally
- Rest 参数和扩展运算符
- 正则表达式相关
- 非转义序列的模板字符串

5. ES10(2019)

- Array.flat(),Array.flapMap()以一定深度使数组平坦
- import()
- globalThis
- Function.prototype.toString(),返回精确的字符
- Symbol.prototype.description
- BigInt
---
## HTML 文件引入 JS 的方式

```html
<!-- 外联 -->
<script src="./test.js" type="text/javascript"></script>

<!-- 内联-->
<script type="text/javascript">
  script;
</script>

<!-- 内嵌 -->
<button onclick="javascript:alert('hello')"></button>
```
---
## javascript数据类型
- 基本类型
  + boolean
  + string
  + number
  + null
  + undefined
  + symbol
  + BigInt
- 引用类型
  + Function
  + Object






## CSS RGBA和opacity
- RGBA:红 绿 蓝 alpha (alpha为1表示完全不透明,为0表示完全透明)
- opacity:为1完全不透明,为0完全透明

- RGBA只会作用于自身背景色,opacity会作用域自身及子代