# cookie
1. 作用
##### 标识用户,存储与安全性无关数据,作为登录通过凭证
##### 纯文本
2. 服务器可以主动要求设置
##### 设置请求头
```js
Set-Cookie:value [;expires=data][Max-Age][;domain=domain][;path=path][httpOnly][;secure]
```
3. 参数说明 
--
1. value 键值对,可多个
2. expires 有效日期,格式为Wdy,DD-Mon--YYYY HH:MM:SS GMT的值
3. Max-Age 存活时间,为正数,负数时不创建磁盘文件,只会保存在内存中,时效性同Session,为0标识立即删除.
4. domain 为携带cookie的域,用于拓展发送域
5. path 与domain共同工作,匹配发送域,匹配URL中除域名外的文件路径部分,属于兼容匹配
6. httpOnly 设置浏览器能否通过js访问cookie
7. secure 当其仅当协议为https或者SSL等安全协议才发送
--
4. 覆盖和新增
##### 需要覆盖cookie需要发送domain,path,name参数一样的cookie,否则将会新建

5. 限制
##### 每次cookie发送携带量最多为 4k
##### 同一个域名最大的cookie储存数量为20-50不等