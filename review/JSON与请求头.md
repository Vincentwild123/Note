# JS&CSS

### JSON

**轻量级数据交换格式,是 ECMAScript 标准的一个子集**

![JSON](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606404017699&di=250ddad8cbd96959d4179f0b52e3fae5&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F30%2F78%2F50573b238a0df9a.jpg)

##### 特性

1. 易于人类读写,易于机器生成

2. 独立于编程语言

3. 键值对组合

##### 语法

1. JSON 是一个对象或者数组

- 对象由左右大括号和若干个键值对和键值对之间的逗号组成
- 数组由左右中括号和若干个值和值之间的逗号组成
  ![对象](https://www.json.org/img/object.png)
  ![数组](https://www.json.org/img/array.png)

2. 键(key)必须是字符串,且被双引号包裹

3. 值(value)可以是 string,number,boolean,null,对象和数组,或者这些结构之间的嵌套

4. 键值对之间用英文逗号(,)分隔,键与值之间用英文冒号(:)分隔

![value](https://www.json.org/img/value.png)

5. string 是双引号括起来的任意 unicode 字符集合,采用\转义
   ![string](https://www.json.org/img/string.png)

##### JSON 与 XML

**XML 优点**

1. XML 可以在标签中添加元数据,而使用 JSON 会产生歧义

2. 大多数浏览器对 XML 更友好,提供更好的结构展示和解读性

3. 前缀和树形结构能更好的处理命名空间问题

**JSON 优点**

1. JSON 比较简洁,解析快,传输快,压缩小

2. JSON 表示与变成语言的数据结构契合,序列化和反序列化容易

---

### http 请求头/响应头

1. General Headers

- Request URL:请求地址
- Request Method:请求方法
- Status Code:状态码
- Remote Address:远程服务器地址
- Referrer Policy 来源政策,请求 referer 字段怎么发送
  1. No Referrer:任何情况下都不发送 Referrer 信息
  2. 默认策略:No Referrer When Downgrade:仅当协议降级(如 HTTPS 页面引入 HTTP 资源)时不发送 Referrer 信息.是大部分浏览器默认策略
  3. Origin Only:发送只包含 host 部分的 referrer
  4. Origin When Cross-origin:仅在发生跨域访问时发送只包含 host 的 Referer,同域下还是完整的.与 Origin Only 的区别是多判断了是否 Cross-origin.协议、域名和端口都一致,浏览器才认为是同域
  5. Unsafe URL:全部都发送 Referrer 信息.最宽松最不安全的策略
  6. same-origin:同源地址才发送

---

2. Request headers

- Accept:可以接受的文件格式
- Accept-Encoding:浏览器可以支持的压缩编码类型
- Accept-Language:浏览器支持语言
- Cache-Control:缓存策略
- connection:keep-alive 保持 Tcp 连接
- cookie:4k
- origin:来源,发送请求的主机
- Content-Length : 请求头的长度
- host:请求的服务器域名和端口
- referer:来源,用户在哪个 url 下发送的请求
- user-agent:用户代理

---

3. Response Headers

- Access-Control-Allow-Origin:标识允许哪个域的请求,设置为\*,服务器不会发送验证头和接受 cookie,浏览器也不会发送 cookie
- Access-Control-Allow-Credentials:是否允许后续请求携带 cookie
- Access-Control-Max-Age: 预检结果缓存时间,也就是上面说到的缓存
- Access-Control-Allow-Methods:允许的请求类型
- Access-Control-Allow-Headers:允许的请求头字段
- Cache-Control:是否进行缓存(public,private,no-cache)与浏览器协商
- Pragma:同上
- Expires :失效时间,无效的日期表示已经过期,max-age 设置该字段无效
- Connection:keep-alive,保持 tcp 连接
- Content-type:返回数据是什么类型
- Content-encoding:内容编码
- date:服务器发出该响应的时间
- set-cookie:设置 cookie
- Last-Modified:最后被修改的时间
- Etag:资源标识
- Server:服务器软件名
- Location:用来重定向接收方到非请求 URL 的位置来完成请求或标识新的资源
- refresh:应用于重定向或一个新的资源被创造,在 5 秒之后重定向(由网景提出,被大部分浏览器支持)

---

### 语义化与 SEO

**语义化就是根据内容使用合适的标签**

##### 语义化的意义

- 允许应用程序,企业和团体对数据进行分享和重用.
- 便于开发者开发和维护:可以帮助程序员分析标签之中的数据的真实含义.
- 较好的代码结构:使代码在没有 css 的情况下,仍然可以显示很好的代码结构,有较好的用户体验.
- 便于 SEO(搜索引擎优化):爬虫依赖标签来确定关键字的权重,因此可以和搜索引擎建立良好的沟通,帮助爬虫爬取更多的有效信息.

##### SEO

**利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名**

1. 网站结构布局优化:尽量简单、开门见山,提倡扁平化结构

- 控制首页链接数量
- 扁平化的目录层次
- 导航优化
- 网站的结构布局
- 把重要内容 HTML 代码放在最前
- 控制页面的大小,减少 http 请求,提高网站的加载速度

2. 网页代码优化

- 突出重要内容,合理的设计 title、description 和 keywords
- 语义化书写 HTML 代码,符合 W3C 标准
- a 标签,页内链接,要加 title 属性加以说明
- 正文标题要用 h1 标签,h1 标签自带权重
- img 应使用 alt 属性加以说明
- 表格应该使用 caption 表格标题标签
- 尽量少使用 iframe 框架

### CSS ,scrollHeight, clientHeight, offsetHeight, scrollTop

- **clientHeight:元素客户区的大小,指的是元素内容及其边框所占据的空间大小(经过实践取出来的大多是视口大小)**
- **scrollHeight: 滚动大小,指的是包含滚动内容的元素大小(元素内容的总高度)**
- **offsetHeight: 偏移量,包含元素在屏幕上所用的所有可见空间(包括所有的内边距滚动条和边框大小,不包括外边距)**

![scrollHeight](https://upload-images.jianshu.io/upload_images/5711289-02840e7ef9c58c09?imageMogr2/auto-orient/strip|imageView2/2/w/266/format/webp)

![clientHeight](https://upload-images.jianshu.io/upload_images/5711289-9344184fa370bf8a.png)

![all](https://upload-images.jianshu.io/upload_images/5711289-90334d2179e36898.png?imageMogr2/auto-orient/strip|imageView2/2/w/521/format/webp)

![all](https://pic002.cnblogs.com/images/2010/108170/2010120215445612.gif)

## 三个值会因为获取的是 body 还是 documentElement 的属性和浏览器发生重大差异
