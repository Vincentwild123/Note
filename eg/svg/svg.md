## SVG (Scalable Vector Graphics) 可放缩矢量图

### 历史

2000 年，W3C 发布 SVG 候选推荐标准，2000 年年底 SVG 推荐标准制定完成

### 文档结构 --- 结构化

SVG 主体中的语法和格式定义遵循 XML 标准，通过各类元素标签和相应的元素属性对 SVG 对象进行描述
**文件主要包含**

1. 标准的图像绘制信息
2. 图形和描述对象的映射
3. 私有属性信息

### 绘图技术

1. 有文本代码被相应的 SVG 绘图器解析成矢量图
2. 具有阴影，形状，特殊效果等均可通过代码实现
3. 基本图形元素标签

- 矩形
- 圆形
- 椭圆
- 线
- 折现
- 多边形
- 路径 path

4. 坐标变化

- 平移
- 旋转
- 伸缩
- 歪斜
- 矩阵变换

### 优势

1. 标准普遍，质量很好
2. 图像不大，方便传输和修改
3. 和 js，dom 接壤，拓展性好

### 嵌入 html

1. embed 标签

```html
<embed src="circle1.svg" type="image/svg+xml" />
```

2. object 标签

```html
<object data="circle1.svg" type="image/svg+xml"></object>
```

3. iframe 标签

```html
<iframe src="circle1.svg"></iframe>
```
