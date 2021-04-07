# JS & CSS

![AJAX](https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3859836143,3711842812&fm=26&gp=0.jpg)

### JS AJAX

**AJAX 全称 Asynchronous JavaScript and XML,表示异步 JS 请求,是一种技术,在不刷新的情况下更新 html 内容**

##### 实现 --- 利用 XMLHttpRequest 对象(低版本 IE 上是 ActiveXObject)

![caniuseXml](https://github.com/Vincentwild123/Notes/blob/master/%E5%A4%8D%E4%B9%A0/xml.png?raw=true)

```js
function success(text) {
  var textarea = document.getElementById("test-response-text");
  textarea.value = text;
}
function fail(code) {
  var textarea = document.getElementById("test-response-text");
  textarea.value = "Error code: " + code;
}
// 1.创建实例
let xhr;
if (window.XMLHttpRequest) {
  request = new XMLHttpRequest();
} else {
  request = new ActiveXObject("Microsoft.XMLHTTP");
}
// 2.设置监听函数,监听即将发生的变化
xhr.onreadystatechange = function () {
  if (request.readyState === 4) {
    // 成功完成
    // 判断响应结果:
    if (request.status === 200) {
      // 成功,通过responseText拿到响应的文本:
      return success(request.responseText);
    } else {
      // 失败,根据响应码判断失败原因:
      return fail(request.status);
    }
  } else {
    // HTTP请求还在继续...
  }
};
//3. 开始请求
xhr.open(methods, URL);
xhr.send();
```

##### XMLHttpRequest 历史

1. version1:

- 只支持文本数据发送,无法读取和上传二进制文件
- 传送和接收数据时没有进度显示
- 收到同源策略影响,只能相同一域名下发送请求

2. version2:

- 可获取服务端二进制数据/上传文件
- FromData 对象管理表单数据
- 可以设置请求时限/显示进度 - 跨域请求

---

##### XMLHtppRequest 属性、方法、事件

1. 属性

**关于状态**

- XMLHttpRequest.readyState:请求状态码 0-5

```js
if(XMLHttpRequest.readyState===0) //还未初始化
if(XMLHttpRequest.readyState===1) //请求准备发送
if(XMLHttpRequest.readyState===2) //请求已经发送
if(XMLHttpRequest.readyState===3) //正在接收响应体
if(XMLHttpRequest.readyState===4) //完全接收响应体
```

- XMLHttpRequest.status:响应状态,Htpp 状态码,当且仅当 readystate 为 3,4 时可读

**关于响应**

- XMLHttpRequest.response:响应体,整个响应实体
- XMLHttpRequest.responseType:响应类型,枚举值
- XMLHttpRequest.responseText:DOMString 包含请求的响应
- XMLHttpRequest.responseURL:响应 URL
- XMLHttpRequest.responseXML:响应 xml/html
- XMLHttpRequest.statusText:DOMString 完整的响应文本

**关于请求过程**

- XMLHttpRequest.timeout:超时
- XMLHttpRequest.withCredentials:指定是否带 cookie

- XMLHttpRequest.upload:上传进度

---

2. 方法

**常用**

- XMLHttpRequest.setRequestHeader():设置 HTTP 请求头的值.必须在 open() 之后、send() 之前调用 setRequestHeader() 方法.
- XMLHttpRequest.open():初始化一个请求.该方法只能在 JavaScript 代码中使用,若要在 native code 中初始化请求,请使用 openRequest().
- XMLHttpRequest.send():发送请求.如果请求是异步的(默认),那么该方法将在请求发送后立即返回.

**不常用**

- XMLHttpRequest.abort():如果请求已被发出,则立刻中止请求.
- XMLHttpRequest.getAllResponseHeaders():以字符串的形式返回所有用 CRLF 分隔的响应头,如果没有收到响应,则返回 null.
- XMLHttpRequest.getResponseHeader():返回包含指定响应头的字符串,如果响应尚未收到或响应中不存在该报头,则返回 null.
- XMLHttpRequest.overrideMimeType():覆写由服务器返回的 MIME 类型.

---

3. 事件

**正常流程事件**

- Onreadystatechange:状态变化
- Onloadstart:获取开始

- Onerror:获取失败
- Onload:获取成功
- Onloadend:获取完成(不论成功与否)

**异常事件**

- Onprogress:数据传输进行中
- Onabort:请求终止
- Ontimeout:获取操作在用户规定的时间内未完成

```html
<body>
  <button id="btn">点击</button>
</body>
<script>
  let btn = document.getElementById("btn");
  btn.onclick = function () {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      console.log("finish!");
      console.dir(this);
      let resAllHeader = this.getAllResponseHeaders();
      console.dir(resAllHeader);
    };
    xhr.onerror = () => {
      console.log("error!");
    };
    xhr.ontimeout = () => {
      console.log("tiemout!");
    };
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("success!");
          console.log("response:" + xhr.response);
          console.log("responseURL:" + xhr.responseURL);
          console.log("responseText:" + xhr.responseText);
          console.log("responseType:" + xhr.responseType);
          console.log("responenXML:" + xhr.responseXML);
        }
      }
    };
    xhr.open("GET", "http://127.0.0.1:3000/");
    xhr.setRequestHeader("content-type", "text/html");
    xhr.timeout = 3000;
    xhr.send();
  };
</script>
```

![运行](https://github.com/Vincentwild123/Notes/blob/master/%E5%A4%8D%E4%B9%A0/htm.png?raw=true)

![属性方法](https://github.com/Vincentwild123/Notes/blob/master/%E5%A4%8D%E4%B9%A0/%E5%B1%9E%E6%80%A7.png?raw=true)

##### MIME 和 Content-Type 和 enctype

**MIME(Multipurpose Internet Mail Extensions)媒体类型,是一种标准,用来表示文档、文件或字节流的性质和格式。**

**Content-Type 是服务器告诉浏览器返回什么类型的内容,通常是 MIME 中的一种**

**enctypee 属性规定在发送到服务器之前应该如何对表单数据进行编码**

1. 组成

**MIME 由类型与子类型两个字符串中间用'/'分隔而组成。不允许空格存在。type 表示可以被分多个子类的独立类别。subtype 表示细分后的每个类型**

<table>
<tr><th>类型</th><th>描述</th><th>例子</th></tr>
<tr><td>text</td><td>表明文件是普通文本,理论上是人类可读</td><td>text/plain, text/html, text/css, text/javascript</td></tr>
<tr><td>image</td><td>表明是某种图像。不包括视频,但是动态图(比如动态 gif)也使用 image 类型</td><td>image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon image/svg+xml</td></tr>
<tr><td>audio</td><td>表明是某种音频文件</td><td>audio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wav</td></tr>
<tr><td>video</td><td>表明是某种视频文件</td><td>video/webm, video/ogg</td></tr>
<tr><td>application</td><td>表明是某种二进制数据</td><td>application/x-www-form-urlencoded , application/json ,multipart/form-data,application/octet-stream, application/pkcs12, application/vnd.mspowerpoint, application/xhtml+xml, application/xml, application/pdf</td></tr>
</table>

**Enctype**

<table>
<tr><th>值</th><th>描述</th></tr>
<tr><td>application/x-www-form-urlencoded</td><td>在发送前编码所有字符(默认)</td></tr>
<tr><td>multipart/form-data</td><td>不对字符编码。</td></tr>
<tr><td>text/plain</td><td>空格转换为 "+" 加号,但不对特殊字符编码。</td></tr>
</table>
### JS fetch

**和 XMLHttpRequest 对象一样,fetch 同样是原生 js 不是谁的封装,唯一的区别就是 fetch 是基于 ES6promise 的异步方式,而 XMLHttpRequest 是基于回调函数的异步**

##### 差异 --- Jquery.ajax 和 fetch

1. 视为错误的情景不同,fetch 不会将 404 或者 500\*视为错误,而是返回状态为 fulfilled 的 promise 只不过把 ok 属性设置为 false，当网络故障或者请求被停止时才会返回 rejected 状态的 promise
2. fetch 不会默认携带 cookie

##### 使用

```html
<body>
  <button id="btn">点击</button>
</body>
<script>
  let btn = document.getElementById("btn");
  btn.onclick = function () {
    //请求的网址
    var url = "http://127.0.0.1:3000/users";
    //添加配置
    var config = {
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "user-agent": "Mozilla/4.0 MDN Example",
        "content-type": "application/json",
      },
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // *client, no-referrer
    };
    //发起get请求
    var promise = fetch(url, config).then(function (response) {
      //response.status表示响应的http状态码
      if (response.status === 200) {
        //json是返回的response提供的一个方法,会把返回的json字符串反序列化成对象,也被包装成一个Promise了
        return response.text();
      } else {
        return {};
      }
    });

    promise = promise
      .then(function (data) {
        //响应的内容
        console.log(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
</script>
```

![caniusefetch](https://github.com/Vincentwild123/Notes/blob/master/%E5%A4%8D%E4%B9%A0/fetch.png?raw=true)

### TCP/IP 五层协议系统

1. 物理层:

- 功能:基于电器特性发送高下电压(电信号),高电压对应数字 1,低电压对应数字 0.
- 数据单位:比特流 byte
- 协议:IEEE802.2,Ethernet v.2

2. 数据链路层:

- 功能:单纯的电信号 0 和 1 没有任何意义,必需规定电信号多少位一组,每组什么意思.统一标准:以太网协议,
- 数据单位:帧 frame
- 帧:分成 header 和 data 两部分
- header(固定 18 个字节):发送者／源地址+接管者／目标地址+数据类型
- data(最短 46 字节,最长 1500 字节):数据包的详细内容
- header 长度＋ data 长度＝最短 64 字节,最长 1518 字节,跨越最大限制就分片发
  - 源地址和目的地址表示:MAC 地址,网卡地址,由电脑厂家设置,可伪装
  - 长度为 48 位 2 进制,通常由 12 位 16 进制数表现(前六位是厂商编号,后六位是流水线号).统一由 IEEE 管理分配
  - 协议:ARP/RARP MAC 地址解析协议/逆向解析

3. 网络层:

- 功能:引入一套新的地址用来区分分歧的广播域／子网,这套地址即网络地址. IPV4/IPV6,子网掩码:确认两个 ip 地址是否在同一个网络
- 数据单位:数据包 packet
- 包: header 和 data 组成,放进下一层的 data 中,
- head:长度为 20 到 60 字节
- data:最长为 65,515 字节
- 协议:IPV4/IPV6

4. 传输层:

- 功能:建立端口到端口的通信.弥补:端口范围 0~65535,0~1023 为系统占用端口.
- 数据单位:片 segment
- 协议:TCP /UDP
- TCP:长度没有限制,大小一般不超过 ip 数据包 data 大小
- UDP:"报头"部分一共只有 8 个字节,总长度不超过 65,535 字节,正好放进一个 IP 数据包

5. 应用层:

- 功能:规定应用程序的数据格式
- 数据单位:报文
- 协议:DNS、FTP、Telnet、SMTP、HTTP、RIP、NFS
