# JS&CSS

### JS 对象相关

1. 创建
   - new Object()
   - 字面量 { }
2. 属性获取
   - 点运算符
   - []运算符

- **区别**

1. []运算符可以使用字符串变量作为 key
2. []运算符可以使用纯数字作为 key
3. []运算符可以用 js 关键字和保留字作为属性名,点运算符不能

4. 属性修改删除

- 修改 key = value
- 删除 delete

4. 拷贝引用型变量都是拷贝引用,共享实际指向的内存单元

5. 对象相关
   - 判断对象中是否含有某个属性:hasOwnProperty(key),in(原型链上的属性也会被搜索到)
   - 查看对象中存在的所有属性:reflect.ownKeys()

---

- **遍历**
  - for...in 遍历对象自身的和继承的和可枚举的
  - object.keys 对象自身可枚举
  - object.assign 拷贝自身可枚举
  - object.getOwnPropertyNames 自身可枚举+不可枚举
  - object.getOwnpropertySymbols 返回 Symbol 属性键名
  - reflect.ownKeys 所有键名
    遍历顺序:
  - 首先遍历所有数值键,按照数值升序排列.
  - 其次遍历所有字符串键,按照加入时间升序排列.
  - 最后遍历所有 Symbol 键,按照加入时间升序排列.

### CSS 垂直水平居中

```css
/* flex */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* transfrom + absolute */
.container {
  position: relative;
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* margin auto  已知高度宽度*/
.container {
  position: relative;
}
.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
/* margin-left + margin-top 已知宽度高度 */
.container {
  position: relative;
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -content.width/2;
  margin-top: -content.height/2;
}

/* 行内元素 table-cell */
.container {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
/* 行内元素 text-align + line-height */
.container {
  text-align: center;
}
.content {
  line-height: container.width;
}

/* grid */
.container {
  display: grid;
  justify-items: center;
  align-items: center;
}
```
