1. 早期脚本语言的作用主要是协助浏览器完成一些动效交互

2. 因为浏览器市场的分割,所指定的脚本语言规范不一致,导致现在不同浏览器的脚本语言需要很多的补丁进行兼容

3. 脚本语言由浏览器的渲染引擎解析,导致上述 2 的问题是不同浏览器使用不同的渲染引擎,目前市场上的浏览器及其主要的渲染引擎分别是:

IE:Trident 三叉戟
Safari:Webkit
Firefox:Gecko 壁虎
chrome:webkit - blink
edge:webkit
国内浏览器:兼容模式三叉戟,高速模式 webkit 和 blink

ps:webkit 是渲染引擎,chromium 是以 webkit 开发的浏览器,blink 是 webkit 的强化版

4. IE 版本很多,目前如果要支持 windows xp,则需要兼容 IE7+,如果要支持 windows 7,需要兼容 IE9

5. ECMAScript 统一脚本语言标准
