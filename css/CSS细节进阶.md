# 关于盒子

1. css 重点就是盒子的摆放,既定位,定位机制分为:普通流,浮动(float),position
1. 普通流:普通元素的定位方式,块级盒子独占一行,行内盒子不换行
1. float:元素朝 z 轴浮动,脱离文档流,浮动元素默认不换行,只会对文档流中其后的元素照成影响.
   使用 display:inline-block 的缺点:盒子之间会出现间隙,无法控制；盒子在一行内位置无法调整,如:让盒子自右向左排列
1. position 脱离文档流,在 z 轴上,potisiton 覆盖 float,注意:浮动或者定位的盒子,margin:0 auto,绝对定位、固定定位和浮动一样都会将定位或者浮动元素转换为行内块元素,行内块元素不指定宽度会随内容宽度显示.此外,插入图片可以撑开盒子,而背景图片不会影响盒子大小.
1. z-index:只用于定位元素,对浮动元素和标准流无影响
   position(absolutet,fixed)>float>display,前两者会把 box 隐形转换为 inline-box,设置 margin:auto 无效,inline-box 会触发 BFC

---

# 关于行内元素

1. 行内元素分为替换元素和非替换元素,替换元素可以设置宽高,如 img/input
2. 内容区:非替换元素中是 em 框描述的,替换元素中是元素固有高度加上外边距和边框等
3. em 框:字符框,顶线和底线的中间区域
4. 行内框:内容区+行间距,既 line-hight
5. 行框,该行内最高的顶线与最低的底线中间区域
6. 实际应用中的 line-height 就是行框的高度
7. vertical-align 设置行内元素与父元素基线对齐方式
8. 内联元素宽度等于包含的文字/图片的宽度+左右内边距,不可改变
