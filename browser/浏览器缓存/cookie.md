# cookie

1. 作用

##### 标识用户,存储与安全性无关数据,作为登录通过凭证

##### 纯文本

2. 服务器可以主动要求设置

##### 设置请求头

```js
Set-Cookie:value [;expires=data][Max-Age][;domain=domain][;path=path][httpOnly][;secure]
```

3. ## 参数说明
1. value 键值对,可多个
1. expires 有效日期,格式为 Wdy,DD-Mon--YYYY HH:MM:SS GMT 的值
1. Max-Age 存活时间,为正数,负数时不创建磁盘文件,只会保存在内存中,时效性同 Session,为 0 标识立即删除.
1. domain 为携带 cookie 的域,用于拓展发送域
1. path 与 domain 共同工作,匹配发送域,匹配 URL 中除域名外的文件路径部分,属于兼容匹配
1. httpOnly 设置浏览器能否通过 js 访问 cookie
1. ## secure 当其仅当协议为 https 或者 SSL 等安全协议才发送
1. 覆盖和新增

##### 需要覆盖 cookie 需要发送 domain,path,name 参数一样的 cookie,否则将会新建

5. 限制

##### 每次 cookie 发送携带量最多为 4k

##### 同一个域名最大的 cookie 储存数量为 20-50 不等
