1. 采用 http 协议的增强,SPDY 协议

2. 1.1 的缺点

2-1 一个 TCP 多个请求,但客户端发起多次请求时会采用建立多个连接来减少延时

3. http2.0
1. 流 ---> 消息 ----> 帧
1. 在 http 和 tcp 之间增加二进制分帧层,将不同的部分分成不同的帧
1. 首部压缩,利用 HPACK 算法对 header 进行压缩,并且在两端维护索引表,传输键名
1. 多路复用,请求响应可以同时进行,避免了旧版对头阻塞问题
1. 服务器推送
