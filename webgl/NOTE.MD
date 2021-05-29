#### 1. 数字化

电脑能显示的图片是数字图片 digital image
digital image 的获取可以通过 软件绘图,数码相机拍摄,扫描仪等

_数码相机与传统相机的区别_

传统相机使用银盐感光材料即胶卷所谓载体,要冲洗胶卷才能得到照片

数码相机拍摄将光信号转换为数字信号,保存在储存单元中

#### 2. 像素(pixel,picture element)

数字图片的最小表示单元,在计算机内存中表现为几个字节的内存,根据每个像素所含字节数的不同,即包含的颜色数量不同,可以分成彩色照片,黑白照片,灰度照片等等.

![像素](https://pic.imgdb.cn/item/609e611bd1a9ae528fa4720f.jpg)

#### 3. 色彩空间

​ **色彩空间**(英语:Color space)是对[色彩](https://zh.wikipedia.org/wiki/色彩)的组织方式.借助色彩空间和针对物理设备的测试,可以得到色彩的固定[模拟](https://zh.wikipedia.org/wiki/模擬信號)和[数字](https://zh.wikipedia.org/wiki/数字信号)表示.色彩空间可以只通过任意挑选一些颜色来定义,比如像[彩通](https://zh.wikipedia.org/wiki/彩通)系统就只是把一组特定的颜色作为[样本](<https://zh.wikipedia.org/wiki/調色盤_(電腦圖形學)>),然后给每个颜色定义名字和代码；也可以是基于严谨的数学定义,比如 [Adobe RGB](https://zh.wikipedia.org/wiki/Adobe_RGB色彩空间)、[sRGB](https://zh.wikipedia.org/wiki/SRGB色彩空间).

​ 常见的色彩空间:灰度(黑白)、RGB(红色,绿色,蓝色) 、CMYK(青色,品红色,黄色,黑色) 、HSV(色相,饱和度,明度)

#### 4. 显示器(Monitors )

​ **[CRT 显示器](https://baike.baidu.com/item/CRT显示器/331814) **它主要由五部分组成:电子枪、偏转线圈、荫罩、荧光粉层及玻璃外壳.CRT[纯平显示器](https://baike.baidu.com/item/纯平显示器/3331822)虽然具有可视角度大、无坏点、色彩还原度高、色度均匀、可凋节的多分辨率模式、响应时间极短等 LCD 显示器难以超越的优点,使用三束电子来激发一组彩色磷光体中正确强度的红色,绿色和蓝色混合,以在每个像素处呈现所需的颜色

​ **液晶显示器**(LCD)内部有很多液晶粒子,它们有规律地排列成一定的形状,并且它们每一面的颜色都不同,分为红色、绿色和蓝色.这三原色能还原成任意的其他颜色.当显示器收到显示数据时,会控制每个液晶粒子转动到不同颜色的面,从而组合成不同的颜色和图像.也因为这样,LCD 显示器的缺点有色彩不够艳和可视角度不大等

​ **LED 显示器** ,由含镓(Ga)、砷(As)、磷(P)、氮(N)等的[化合物](https://baike.baidu.com/item/化合物/1142931)制成,砷化镓二极管发红光,磷化镓二极管发绿光,碳化硅二极管发黄光,氮化镓二极管发蓝光

#### 5. 位图(Bitmap)

​ 将图片转换为一片的内存二进制序列称为位图,属于硬件与软件相接层面,例如黑白图片的位图每位只有 0,1 两种情况,而彩色图需要更大的位图进行存储.

#### 6. 图片分类

**5.1 ** **像素图片(BitMap image)**:JPG,JPEG,PNG,GIF 等,图像已经以像素形式存放,不用再光栅化,适用于绘制静态复杂图像

**5.2** **矢量图(Vector image)**: SVG,EPS,PDF 等 矢量图由绘制线条,曲线和形状指令组成,而不是像素.矢量图形的每个部分都是可编辑的,并且可以很容易地调整其大小. 矢量图形非常适合制作图表或图形.它们通常不能用于存储照片图像

![矢量图与像素图](https://pic.imgdb.cn/item/609e611bd1a9ae528fa47196.png)

#### 7. 图片压缩算法

**无损压缩**(Lossless compression)

- 动态规划压缩

- 通道游长编码

- LZ77

- 哈夫曼编码(Huffman)

**有损压缩**(Lossy compression)

- JPEG --- 离散余弦变换+量子化+RLE+Huffman

![有损压缩](https://pic.imgdb.cn/item/609e611bd1a9ae528fa47072.jpg)

#### 8. 显卡、GPU

**显卡功能**:将电脑的数字信号转换成模拟信号让显示器显示出来,同时还有图像处理功能,可以协助 CPU 工作,提高整体速度

**硬件加速**:把特定类型的庞大的计算量交给专门的硬件来处理,以减轻中央处理器的工作量的技术,比如图像处理交给 GPU

CPU 主要负责多任务调度,散乱计算,指挥各硬件工作,GPU 主要用于大量重复计算(挖矿),显卡归 CPU 管

![cpugpu架构](https://pic.imgdb.cn/item/609e61b3d1a9ae528fa95cf8.png)

可以看到,GPU 整体呈现工整结构,拥有大量小型计算单元,可以并行执行大量特定运算

#### 9. 电脑显示图像过程

​ 一般由 CPU 计算好显示内容提交到 GPU,当然也存在 CPU 直接下发命令让 GPU 处理计算显示内容(硬件加速),显卡随即将数字模拟信号(显示内容)转换成图像数据信号,又由信号线连接显示器!显示器接到相关信号后,由视放电路通过显象管电子枪射到显象管屏幕上

具体点就是:

1. CPU 将数据运送进 GPU
2. GPU 进行必要的光栅化
3. GPU 将光栅化后的数据运送到显存
4. 显卡将显存的数据进行数模转换并通知显示器显示
5. 显示器根据它特定现象原理,如阴极射线管显示器将三束电子射到同一点显示颜色

#### 10. 光栅化

​ 光栅化是将矢量图形的几何数据经过一系列变换后最终转换为像素,从而呈现在显示设备上的过程.

![光栅化](https://pic.imgdb.cn/item/609e61d9d1a9ae528faa9ef7.gif)

​ 数字 3D 模型的常见表示形式是多边形.在栅格化之前,各个多边形被分解为三角形,因此在 3D 栅格化中要解决的典型问题是三角形的栅格化.三角形栅格化算法通常需要的属性是栅格化两个相邻的三角形(即那些共享边的三角形)

#### 11. OpenGL

![opengl](https://pic.imgdb.cn/item/609e6195d1a9ae528fa85b8f.png)

​ OpenGL 是一套接口规范,具有跨平台,跨编程语言的特点,直接规范硬件驱动接口,定义了操作图片和图形的软件层 API,具体实现需要 GPU 厂家自己开发满足这套规范的驱动,如果所用 GPU 厂家实现了驱动并本机安装,就可以通过 Opengl 接口调用对应显卡驱动.

​ 该接口由近 350 个不同的函数调用组成,用来绘制从简单的图形比特到复杂的三维景象,而另一种程序接口系统是仅用于[Microsoft Windows](https://baike.baidu.com/item/Microsoft Windows)上的[Direct3D](https://baike.baidu.com/item/Direct3D).OpenGL 常用于[CAD](https://baike.baidu.com/item/CAD)、[虚拟现实](https://baike.baidu.com/item/虚拟现实)、科学可视化程序和电子游戏开发.

#### 12. OpenGL ES

![opengl es](https://pic.imgdb.cn/item/609e61b3d1a9ae528fa95d1e.png)

​ OpenGL ES (OpenGL for Embedded Systems) 是 OpenGL 三维图形 [API](https://baike.baidu.com/item/API/10154) 的子集,针对[手机](https://baike.baidu.com/item/手机/6342)、[PDA](https://baike.baidu.com/item/PDA/111022)和游戏主机等[嵌入式设备](https://baike.baidu.com/item/嵌入式设备/10055189)而设计

​ OpenGL ES 是从 OpenGL 裁剪的定制而来的,去除了 glBegin/glEnd,四边形(GL_QUADS)、[多边形](https://baike.baidu.com/item/多边形)(GL_POLYGONS)等复杂图元等许多非绝对必要的特性.经过多年发展,现在主要有两个版本,OpenGL ES 1.x 针对固定管线硬件的,OpenGL ES 2.x 针对可编程管线硬件.OpenGL ES 1.0 是以 OpenGL 1.3 规范为基础的,OpenGL ES 1.1 是以 OpenGL 1.5 规范为基础的,它们分别又支持 [common](https://baike.baidu.com/item/common) 和 common lite 两种 profile.lite profile 只支持定点实数,而 common profile 既支持定点数又支持浮点数. OpenGL ES 2.0 则是参照 OpenGL 2.0 规范定义的,common profile 发布于 2005-8,引入了对可编程管线的支持.

#### 13. WebGL

![webgl](https://pic.imgdb.cn/item/609e6195d1a9ae528fa85b33.png)

​ WebGL 是基于 OpenGL ES 的低级 3D 图形 API 的跨平台,免版税的 Web 标准,并通过 HTML5 Canvas 元素公开给 ECMAScript

​ WebGL 1.0 公开了 OpenGL ES 2.0 功能集； WebGL 2.0 公开了 OpenGL ES 3.0 API

#### 14.GLSL(OpenGL Shading Language)

​ OpenGL 着色语言(OpenGL Shading Language)是用来在[OpenGL](https://baike.baidu.com/item/OpenGL/238984)中着色编程的语言,也即开发人员写的短小的自定义程序,他们是在[图形卡](https://baike.baidu.com/item/图形卡/5358331)的 GPU (Graphic Processor Unit 图形处理单元)上执行的,代替了固定的[渲染管线](https://baike.baidu.com/item/渲染管线/2297474)的一部分,使渲染管线中不同层次具有可编程性.比如:视图转换、投影转换等.GLSL(GL Shading Language)的[着色器](https://baike.baidu.com/item/着色器/411001)代码分成 2 个部分:Vertex Shader(顶点着色器)和 Fragment(片断着色器),有时还会有 Geometry Shader(几何着色器).负责运行顶点着色的是[顶点着色器](https://baike.baidu.com/item/顶点着色器/4104625).它可以得到当前 OpenGL 中的状态,GLSL 内置变量进行传递.GLSL 其使用 C 语言作为基础高阶着色语言,避免了使用[汇编语言](https://baike.baidu.com/item/汇编语言/61826)或硬件规格语言的复杂性
