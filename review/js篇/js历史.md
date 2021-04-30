1. 早期脚本语言的作用主要是协助浏览器完成一些动效交互

2. 因为浏览器市场的分割,所指定的脚本语言规范不一致,导致现在不同浏览器的脚本语言需要很多的补丁进行兼容

3. 脚本语言由浏览器的渲染引擎解析,导致上述2的问题是不同浏览器使用不同的渲染引擎,目前市场上的浏览器及其主要的渲染引擎分别是:

IE:Trident三叉戟
Safari:Webkit
Firefox:Gecko壁虎
chrome:webkit - blink
edge:webkit
国内浏览器:兼容模式三叉戟,高速模式webkit和blink

ps:webkit是渲染引擎,chromium是以webkit开发的浏览器,blink是webkit的强化版

4. IE版本很多,目前如果要支持windows xp,则需要兼容IE7+,如果要支持windows 7,需要兼容IE9

5. ECMAScript统一脚本语言标准
