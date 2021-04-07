# sesstion
1. 作用:将用户重要信息保存在服务端

2. 方式:用用户第一次访问提交的信息,生成sesstionID,反过来建立sesstionID和用户重要信息的HashMap

3. 将sesstionID设置为cookie,发送到服务端,每次请求就携带sesstion

# 分布式下的sesstion不同步问题解决办法

1. nginx设置ip_hash,让同一ip客户机访问同一个后台服务器

2. 集群间通信

3. 将session放入缓存中间件统一管理