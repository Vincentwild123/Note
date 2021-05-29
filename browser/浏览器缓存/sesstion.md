# sesstion

1. 作用:将用户重要信息保存在服务端

2. 方式:用用户第一次访问提交的信息,生成 sesstionID,反过来建立 sesstionID 和用户重要信息的 HashMap

3. 将 sesstionID 设置为 cookie,发送到服务端,每次请求就携带 sesstion

# 分布式下的 sesstion 不同步问题解决办法

1. nginx 设置 ip_hash,让同一 ip 客户机访问同一个后台服务器

2. 集群间通信

3. 将 session 放入缓存中间件统一管理
