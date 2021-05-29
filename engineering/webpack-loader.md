### 本质上是导出为函数的 js 模块

### 同步 loader 调用 this.callback，异步 loader 调用 this.async,后者返回 this.callback 回调函数，并且随后 loader 必须返回 undefined 并且调用该回调函数

### 参数说明：

**context**,**map**,**meta**

1. 同步执行 --- 直接返回结果 content
2. 使用 this.callback --- 传递参数

```js
this.callback(null, someSyncOperation(content), map, meta);
```

3. 异步 loader
   先使用 this.async 获得 callback 函数，再在异步回调中调用 callback 函数

```js
module.exports = function (content, map, meta) {
  const callback = this.async();
  dosomeAsyncOperstion(content, (err, data) => {
    if (err) callback(err);
    callback(null, data, map, meta);
  });
};
```

4. patch 方法和真正执行
   实际上会从左到右调用 loader 上的 pitch 方法，最后再真正执行 loader

```js
module.exports.pitch = function (remaininRequest, precedingRequest, data) {
  data.calue = 42;
};
```

5. loader上下文变量

