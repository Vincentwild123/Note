# TypeScript

## 数据类型

### 基础类型

1. boolean
2. number(十进制,十六进制,二进制,八进制字面量)
3. string(模板字符串)

### 数组

```js
let a: string[] = ["1", "2"];
```

1. 类型数组 string[] = ['a','b']
2. 泛型数组 Array<number> = [1,2,3]

### 元组 Tuple

```js
let a: [string, number] = ["1", 1];
```

**一种已知元素数量和类型的数组**

1. 访问越界会使用联合类型代替

### 枚举

```js
enum Color { Red,Green,Blue }
let c:Color = Color.Red
```

**默认从 0 开始编号,可以手动改变编号**

### Any VS Object

```js
let a: any = 4;
let a: object = 4;
```

**any 表示可能存在,跳过属性检测,object 则需要检测**

### void & undefined & null

```js
function nothingreturn(): void {
  console.log("nothing return ");
}
let a: void = undefined | null;
```

**void 类型只能被赋予 undefined 和 null,undefined,null 是所有类型的子类型**

### Never

**一定会出错或者永远为假**

### Object

```js
function creat(o:object|null):void
```

**除了基本类型之外的类型**

### 类型断言

**告诉编译器,我知道我在干什么,只在编译器阶段起作用**

1. 尖括号语法

```js
let someValue:any = 'this is a string'
let strLength:number =  (<string>someValue).length
```

2. as 语法

```js
let someValue:any = 'this is a string'
let strLengtg:number = (someValue as string).length;
```

## 接口

**用于与外界相接的区域规范化,只关注外形是否匹配并且只要属性存在且类型正确就行**

```js
interface label {
  name: string;
}
```

1. 可选属性,冒号前面加？

```js
interface o {
  a?: string;
  b?: number;
}
```

2. 只读属性,属性名前面加 readonly

```js
interface o{
    readonly a:string;
    readonly b:string
}
```

3. 描述函数

```js
interface functionname {
  (name: string): boolean;
}
let temp: functionname;
temp = function (name: string): boolean {};
```

**函数参数名字不需要和接口声明的一致,只需要对应位上的参数是兼容的**

4. 类类型
   **限制类的形状,描述的是类的公共部分**

```js
interface abstructClass{
  current:string;
}
class instanceClass inplements abstructClass{
  current:string;
}
```

5. 继承接口
   **接口之间可以互相继承,复制属性到另一个接口中,多继承**

```js
interface Shape {
  color: string;
}
interface Square extends Shape {
  sideLength: number;
}
let square =({} as Square);
square.color = 'blue';
square.sideLength = 10;
```

6. 混合类型接口
   **一个接口中,同时存在类和函数的声明**

## 类

1. **子类构造函数中必须调用 super**

2. public,private,protected
   **private,protected 声明的变量如果在子类中不存在就不会被认为两个类是兼容的**


## 函数
