# cross-origin-resouce-share 跨域资源共享

**浏览器一旦发现 AJAX 请求有跨域的要求就会附加头信息,有时还会多出一次附加的请求,所以重要的是服务器,只要实现CORS接口就可以与浏览器进行跨域通信**

## 跨域请求的分类

1. 简单请求
- HEAD,POST,GET三种方法之一
- 请求只有简单的字段
- content-type类型

get请求，表单上传被命中

2. 非简单请求

- 不满足以上要求者


## 浏览器的处理

1. 简单请求
- 附加origin字段  && 服务器 access-control-allow-origin

- 如果要发送cookie,access-control-allow-origin就不能设置为*

2. 非简单请求
- 发送两次询问


