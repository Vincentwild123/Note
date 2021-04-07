# CSS

### 1. CSS 里面的单位有哪些及定位原则

**关于像素**

* 物理层
  + 物理像素(physical pixel): 设备能控制显示的最小单位. 分辨率
  + DP 设备无关像素, 为 1/160 英寸
* 抽象应用层
  + 设备独立像素(DIP, device-independent pixel, density-independent pixel): 独立于设备的用于逻辑上衡量像素的单位(因为要在宽度相同, 分辨率相差较大的设备上展示同样的视觉效果而产生, 即 CSS 中的 px 单位)
  + DPR(Device Pixel Ratio)默认缩放为 100%的情况下, 设备像素和 CSS 像素的比值

**关于单位**

* 绝对单位

  + px: 设备独立像素单位, 是应用抽象层最底层最精确单位

* 相对单位
  + em: 相对单位, 父节点字体的大小, font-size 计算(默认 16px)
  + rem: 相对单位, 根节点字体大小, font-size 计算
  + rpx:(responsive pixel), 微信小程序, 规定屏幕宽为 750rpx
* 百分比单位
  + 视口百分比
    - vh 相对于视口的高度
    - vw 相对于视口的宽度
  + 元素宽度百分比(包括 html 元素)
* 不常用单位
  + in: 英寸(约等于 2.54cm)
  + cm: 厘米
  + mm: 毫米
  + pt:point, 大约 1/72 英寸(约 0.0353cm)
  + pc:pica, 大约 6pt, 1/6 英寸(约 0.423cm)
  + ex: 取当前作用效果的字体的 x 的高度, 在无法确定 x 高度的情况下以 0.5em 计算(IE11 及以下均不支持, firefox/chrome/safari/opera/ios safari/android browser4.4+等均需属性加前缀)
  + ch: 以节点所使用字体中的"0"字符 g 高度为基准, 找不到时为 0.5em(ie10+, chrome31+, safair7.1+, opera26+, ios safari 7.1+, android browser4.4+支持)

绝对单位：px
相对单位：em，rem，rpx（规定手机屏幕宽为750rpx），vh, vw
物理单位：cm，mm，in

视口：
布局视口：让网页能够在移动端上面清晰展示的视口，一般是980px，documentElement.clientWidth
视觉视口：浏览器可视区域的大小 window.innerWidth
理想视口：设备物理尺寸 window.screen.width

meta标签可以设置viewpoint

``` html
<meta name='viewport' content='width=device-width;缩放，最大最小缩放'>
直接设置初始缩放为1也能让视口变为理想视口，因为缩放相对的是设备大小缩放
两者冲突选择最大值
```

meta标签:
页面描述：视口，作者，版权
http头部：普通响应头
页面控制：全屏，浏览器内核选择

**%的定位原则**

* 确定包含元素
  + 如果是静态定位和相对定位, 包含块一般就是其父元素
  + 如果是绝对定位的元素, 包含块应该是离它最近的 position 为非 static 属性的祖先元素
  + 如果是固定定位的元素, 它的包含块是视口(viewport)
* 长的百分比还是宽的百分比
  + width/height 以直接包裹元素宽高为比例
  + top/left/bottom/right 以相对于直接非 static 定位(默认定位)的父元素为比例
  + padding/margin 无论哪个方向都是以父元素的宽为比例
  + border-radius/translate/background-size 以自身宽高

### 2. 响应式 web 设计使用的单位

1. em,rem

   **在 body 重写 em 覆盖控制字体大小, js 动态计算并设置 rem(根元素 font-size)将页面划分为栅格布局(或相对于理想视口的百分比)**

2. vh,vw

   **相对于理想视口的百分比高宽**

3. 百分比为单位

   **百分比自带放缩, 但上面说了, 不同的 css 属性相对于包含块的宽还是高不一样, 很难计算**

4. px 和理想视口

**由于px已经被抽象化, 可以使不同分辨率的设备产生相同的视觉效果, 但各端难以统一样式, 只能为每个端设置不同的样式**
