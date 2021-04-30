#### 命令行options

1. -c 指定配置文件
2. -t 测试配置文件的正确性.
3. -V 版本详细信息.

#### 命令行command

* nginx -s reload #重新加载Nginx配置文件,然后以优雅的方式重启Nginx.
* nginx -s stop #强制停止Nginx服务.
* nginx -s quit #优雅地停止Nginx服务(即处理完所有请求后再停止服务).
* killall nginx #杀死所有nginx进程.

#### 工作方式.

**一个主进程搭配n个工作进程**
可以用信息控制这些进程
|TERM,INT|快速关闭|
|QUIT|从容关闭|
|HUP|重载配置,用新的配置开始新的工作进程从容关闭旧的工作进程|
|USR1|重新打开日志文件|
|USR2|平滑升级可执行程序|
|WINCH|从容关闭工作进程|

#### 配置文件结构

``` conf
# 全局块
...  
# events 块
events {
    ...
}
# http块
http {
    # http全局块
    ...
    # server块
    server
    {
        # server全局块
        ...
        #location 块
        location [PATTERN] 
        {
            ...
        }
         #location 块
        location [PATTERN] 
        {
            ...
        }
    }
    # server块
    {
        ...
    }
    # http 全局块
}
```

全局&http > n[server>n[location]]&events

1. 全局块 --- 影响全局的指令
* nginx进程pid存放路径
* 日志存放路径
* 配置文件引入
* 允许生成的worker process数

2. events块 --- 影响nginx服务器或者与用户的网络连接
* 每个进程最大连接数
* 选择哪种事件驱动模型处理连接请求
* 是否允许同时接收多个网络连接
* 开启多个网络连接序列化

3. http块 --- 配置代理,缓存,日志定义
* mime-type定义
* 日志自定义
* 连接超时时间
* 单连接请求数

4. server块 --- 配置虚拟主机相关参数

5. location块 --- 配置请求的路由,以及各页面处理情况

#### 反向代理,负载均衡

1. 代理
* 404页面重定向

error_page 404 url; 
proxy_intercept_errors on; 

* 代理的方法

proxy_method get/post; 

* 支持的http协议版本

proxy_http_version 1.0; 

* 与代理服务器的连接配置

proxy_connect_timeout 1; #nginx服务器与被代理的服务器建立连接的超时时间,默认60秒
proxy_read_timeout 1; #nginx服务器想被代理服务器组发出read请求后,等待响应的超时间,默认为60秒.
proxy_send_timeout 1; #nginx服务器想被代理服务器组发出write请求后,等待响应的超时间,默认为60秒.
proxy_ignore_client_abort on; #客户端断网时,nginx服务器是否终端对被代理服务器的请求.默认为off.

* upstream

proxy_next_upstream timeout; #反向代理upstream中设置的服务器组,出现故障时,被代理服务器返回的状态值.

2. 负载均衡
* upstream设置上游服务器列表

upstream mysvr{

    server 192.168.10.121:3333;
    server 192.168.10.122:3333;

}
server {

    ...
    location ~*^.+${
        proxy_pass http://mysvr #请求转向的mysvr定义的服务器列表
    }

}

* 轮询方式
0. 热备:backup
1. 默认轮询,依此轮询
2. 加权轮询

weight=1；

3. ip_hash;

#### nginx使用情景

1. 在想要进行灰度测试时,设置白名单过滤

``` conf
server{
    location / {
        allow url;
        deny all;
    }
}
```

2. 图片防盗链,就是不让别人以url的形式进行引用

``` conf
location ~* \.(gif|jpg|jpeg|png|bmp|swf)${
    valid_referers none blocked 192.168.0.103;
    if($invalid_referer){
        return 403
    }
}
```

3. 跨域

``` conf
server{
    location / {
        proxy_pass url;
        add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
            add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
    }
}
```

4. 重定向pc页面和移动页面地址

``` conf
server{
    location / {
        set $type 'pc';
        if($http_user_agent ~* (mobile|nokia|iphone|ipad|android|samsung|htc|blackberry){
            set $type 'mobile'
        })
    }
}
```

5. gzip压缩

6. 合并请求第三方拓展模块----nginx-http-concat

``` conf
server {
    ......
    # 新增一个 location,static 为静态资源目录
    location /static/ {
        concat on; # 是否打开资源合并开关
        concat_types application/javascript; # 允许合并的资源类型
        concat_unique off; # 是否允许合并不同类型的资源
        concat_max_files 20; # 允许合并的最大资源数目
    }
}
```

7. 图片处理和修改网页内容


8. nginx服务器宕机时开启双机热备

#### location uri 匹配
= 精准匹配,用于不包含正则表达式的uri前,如果匹配成功,不在进行后序的查找

^~最佳匹配

~正则匹配,区分大小写

~*正则匹配不区分大小写

**如果有多个location匹配成功,使用正则表达式最长的那个**


#### 全局变量$开头