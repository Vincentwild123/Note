1. 状态机

执行Generator函数返回遍历器对象
函数内部用yield定义状态, 调用next方法得到状态

* yield后面的表达式是运行的时候才会计算，采用惰性求值，相当于保留函数堆栈

* yield只能用在generator函数里，这里的内部指的是运行时的内部

* yield表达式如果在另一个表达式中，必须放在圆括号里里面

* yield表达式用作函数参数或放在赋值表达式右边，可以不加括号

* yield表达式，在一个函数内部执行另外一个函数

2. chunk函数 --- 用于临时保存传入函数的参数

将多参数函数转换成只接受回调的单参数函数

``` javascript
function toChunk(fn) {
    return function(...args) {
        return function(cb) {
            return fn.call(this, ...args, cb);
        }
    }
}
```
