### 预渲然

Vue预渲然：Prerender-spa-plugin

主要解决SEO问题和首屏问题，预渲然页面是静态的，适用于网站首页或者个人博客之类的页面，不适用于电商页面

适用于与用户无关页面，长时间不变的页面

#### Usage

1. 安装插件prerender-spa-plugin

2. 在webpack.config.js中配置插件

   ```javascript
   plugins:[
       new PrerenderSpaPlugin(
       	//生成的页面路径
           path.join(__dirname,'../dist'),
           //要进行预渲然的路由
           ['/'.'about','/contact']
       )
   ]
   ```

3. 最后关于服务器，配置nginx访问指定路由时返回静态页面即可

### 骨架屏

​	作为SPA路由切换的loading，结合组件生命周期和AJAX请求数据使用，首屏渲染的优化

​	作为SPA路由切换：react-content-loader和vue-content-loader

​	作为首屏渲染优化：page-skeleton-webpack-plugin，使用SSR将生成的骨架屏插入到html，或者将设计师设计好的骨架屏直接插入到页面中

具体操作：

利用puppeteer在服务端操作headless chorme浏览器打开需要生成骨架屏的页面，等待页面渲染完成后，对页面进行层叠样式的覆盖，这样在达到不改变页面布局的前提下隐藏图片和文字

### SSR

