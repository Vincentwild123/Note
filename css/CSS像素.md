# 像素单位解析

1.  px Device Pixeis 设备物理像素
2.  px CSS Pixels CSS 代码中使用的逻辑像素 ,相对值,相对设备物理像素变化,是抽象视觉单位
3.  DP 设备无关像素,为 1/160 英寸
4.  DPR Device Pixel Ratio CSS 逻辑像素对于设备物理像素倍数
5.  DIP 设备独立像素,等于 CSS 像素

---

# 视口

1. layout viewport 布局视口,document.documentElement.clientWidth
2. visual viewport 视觉视口,window.innerWidth
3. ideal viewport 理想视口

# meta 标签

1. 视口宽度 width:device-width
2. 初始缩放:initial-scale 相对于 ideal viewport 缩放比例
