# js基础
1. Typeof返回值:1.undefined,number,string,boolean,function,object
---
2. Null和undefined 
---
**Null表示不应该有值,undefined表示应该有值但没给**
---
3. 数据类型:
    1. 基本数据类型:boolean,string,number,null,undefined,Symbol
    2. 引用数据类型:  object,function, Array
    3. 对象寻址:点运算符或者[''];如果key不是有效变量名就只能用[''],不加括号引用函数,返回字符串
---
4. valueof函数返回值:
    + Array:各元素按逗号分隔的字符串
    + Boolean:true/false
    + Data:1970年1月一日开始的时间戳UTC
    + Function:字符串,函数本身
    + Number:数字值
    + Object:对象本身
    + String:字符串
---
5. 类型转换:
    1. ==和===;双等号:比较数据类型,不相等时隐式转换再比,===类型不同直接false,无论什么比较有NaN就是不相等.
    2. 显示转换/自行转换:
        1. Number(),parseInt(),parsefloat()
            + Number():true/flase->1/0,数值返回本身,null为空对象返回0,undefined返回NaN,字符串按模式匹配转换,空字符串转换为0；失败的自动转换成NaN,对象按照vauleof方法进行转换
            + Parseint(string,radix),转换规则同字符串解析,但如果第一个字符是数字,则继续解析直至字符串解析完毕或者遇到一个非数字符号为止
            + Parsefloat(string)解析规则同上,但只有第一个小数点有效
        2. Tostring(),string()
            + Tostring:返回字符串,对象返回:[object objectname]格式
            + String同上,但null返回"null",undefined返回"undefined"
        3. Boolean()
            + 将false,"",0,NaN,null,undefined转换为false,其他转换为true
    3. 隐式转换,运算符进行运算时
        + isNaN:用Number转换
        + 自增自减,一元正负号:转换为数值再执行操作,解析规则同number()
        + 加法运算符二元:
            + 其中一个为NaN结果为NaN,同号infinity相加为infinity,异号相加为NaN,
            + 如果其中一个为字符串,则转换为字符串,对象则调用tostring()
    4. 乘除、减号运算符、取模运算符:用number转换
    5. 逻辑运算符:
        + !用boolean转换成布尔值取反
        + &&如果有一个是null/undefined/NaN则为对应值
        + ||同上
    6. 关系操作符:<>数值字符串直接比,有数值转换成数值,
    7. 相等运算符
        + 有数值转换成数值再进行比较,布尔转换成数值,对象用valueof,两个对象看是不是指向同一个对象.
---
6. 正则表达式:格式(/正则表达式/修饰符)
    1. 修饰符:i大小写不敏感   g查找所有匹配,一直找完整个字符串序列  m多匹配
    2. 常用方法:search()检索指定字符符串并返回指定位置  replace(reg,"string")将string替换reg匹配字符串序列
    3. 正则表达式对象:RegExp预定义了属性和方法的正则表达式对象
    4. 方法:test(),exec() 返回结果数组,无则返回null,每一个元素为匹配结果
---
7. 错误异常捕捉:try  catch  finally  throw
---
8. this执行上下文与new
    1. 执行上下文:分为1.创建阶段2.执行阶段
            创建阶段:确定this->创建词法环境组件->创建变量环境组件
            执行上下文分为:全局执行上下文,函数执行上下文
            全局执行上下文:window.onload
**找变量沿着作用域链找,找不到报错**
**! 在对象内找变量沿着作用域找,找不到,undefined**
**this指向优先级:显示>隐式>默认 ——>  new>隐式>默认**
    2. new
        1. 隐式过程:
            + 以构造器原型对象构建继承的子对象
            + 将该子对象引用赋值给this
            + 通过this赋值新属性和函数
            + 返回this
    3. 显式
```js
    // 1.以构造器的prototype属性为原型,创建新对象；
    let child = Object.create(Parent.prototype);
    // 2.将this和调用参数传给构造器执行
    let result = Parent.apply(child, rest);
    // 3.如果构造器没有手动返回对象,则返回第一步的对象
    return typeof result  === 'object' ? result : child;
```
---
9. 作用域与执行上下文:作用域链声明时就已经确定,执行上下文在运行代码时才临时确定.
---
10. 字符串常用方法:
    1.转换   tostring(),String(),+
    2.分割   split(express,length)
    3.长度   length
    4.子字符串查询  indexof从前往后找    lastindexof 从后往前找 
    5.替换   replace(target,new)默认只替换第一个,全局替换加g
    6.索引处字符   charat  charcodeat
    7.连接   concat  +
    8.切割   slice  substr  substring
    9.大小写转换  lowCaseStr   upCaseStr
    10.正则  math  search  
---
11. js实现继承:原型属性,方法不被继承,实例共享,构造函数方法属性在每个实例均不同
    1. 原型链继承:将构造函数原型设置成哪一个构造函数的实例对象
         问题:继承了单一的父对象
    2. 构造函数继承:Super.call(this) 可以call多个,多继承,可向父类构造函数传值,多态
         问题:只继承了父类构造函数的属性与方法,原型上的没有继承,没有共用属性抽象,浪费空间
    3. 组合继承:Super.call+son.prototype = new Super(),既获得了父类构造函数的属性,又可以使用父类的原型对象,
    4. 组合优化完美方案
```js
        Super.Call+son.prototype = object.create(super.prototype);
        Son.prototype.constructor= Son;
```
    5. ES6:extends
    6. Object.create()
---
12. &&与||,属于短路运算符
    + &&:前表达式为true,返回后面值,为false返回前面值
    + ||:相反

