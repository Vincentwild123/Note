1. call/apply/bind

```js
Function.prototype.call = function (context, ...args) {
  context.fn = this;
  let ret = context.fn(...args);
  delete context.fn;
  return ret;
};
Function.prototype.apply = function (context, args) {
  context.fn = this;
  let ret = context.fn(...args);
  delete context.fn;
  return ret;
};
Function.prototype.bind = function (context) {
  let _this = this;
  return function (...args) {
    _this.call(context, ...args);
  };
};
```

2. instanceof

```js
function instanceof(L, R) {
  let RP = R.prototype;
  let L = L.__proto__;
  while (true) {
    if (L === null) return false;
    else if (L === RP) return true;
    L = L.__proto__;
  }
}
```

3. 数组扁平化

```js
let arr = [1, [2, 3], [2, [3], 4]];

function flat(arr) {
  let ret = [];
  for (const a of arr) {
    if (a instanceof Array) ret = ret.concat(flat(a));
    else ret.push(a);
  }
  return ret;
}

function flat(arr) {
  return arr.reduce(function (a, b) {
    return a.concat(b instanceof Array ? flat(b) : b);
  }, []);
}
```

4. 数组去重

```js
function unique(arr) {
  return [...new Set(arr)];
}

function unique(arr) {
  return arr.filter((item, index, arr) => {
    return arr.indexOf(item, 0) === index;
  });
}
```

5. 深拷贝

```js
function deepClone(o) {
    if (o instanceof RegExp) return o;
    if (typeof o === 'function') return o;
    if (o instanceof Date) return o;
    if (o === null) return null;
    let obj = o instanceof Array ? []; {};
    for (const key in o) {
        if (typeof key === 'object') obj[key] = deepClone(item);
        else obj[key] = item;
    }
}
```

6. 防抖节流

```js
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay)
    }
}

//节流是事件触发一次后禁止触发,由定时器重新打开
function throttle(fn, delay) {
    let on = true;
    return function(..args) {
        if (!on) return;
        else {
            on = false;
            setTimeout(() => {
                on = true;
                fn(...args)
            }, delay);
        }
    }
}
```

7. 并发控制

```js
// 为了演示方便,我们在此用fetchImage函数来模拟异步请求图片,返回成功提示
function fetchImage(url) {
  // 模拟请求的响应时间在0 - 1s之间随机
  const timeCost = Math.random() * 1000;
  return new Promise((resolve) => setTimeout(resolve, timeCost, "get: " + url));
}

// 待请求的图片
const imageUrls = [
  "pic_1.png",
  "pic_2.png",
  "pic_3.png",
  "pic_4.png",
  "pic_5.png",
  "pic_6.png",
];
/**
 * @description 带并发限制的图片并发请求
 * @param {Array} imageUrls 待请求的图片url列表
 * @param {Number} limit 最大并发个数限制
 * @return { Promise<Array> } resList
 */
function fetchImageWithLimit(imageUrls, limit) {
  // copy一份,作为剩余url的记录
  let urls = [...imageUrls];

  // 用来记录url - response 的映射
  // 保证输出列表与输入顺序一致
  let rs = new Map();

  // 递归的去取url进行请求
  function run() {
    if (urls.length > 0) {
      // 取一个,便少一个
      const url = urls.shift();
      console.log(url, " [start at] ", new Date().getTime() % 10000);
      return fetchImage(url).then((res) => {
        console.log(url, " [end at] ", new Date().getTime() % 10000);
        rs.set(url, res);
        return run();
      });
    }
  }
  // 当imageUrls.length < limit的时候,我们也没有必要去创建多余的Promise
  const promiseList = Array(Math.min(limit, imageUrls.length))
    // 这里用Array.protetype.fill做了简写,但不能进一步简写成.fill(run())
    .fill(Promise.resolve())
    .map((promise) => promise.then(run));

  return Promise.all(promiseList).then(() =>
    imageUrls.map((item) => rs.get(item))
  );
}
fetchImageWithLimit(imageUrls, 2)
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```
