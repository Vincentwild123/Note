# 数据双向绑定原理(数据改变更新视图,视图改变监听事件)

1. 数据劫持:Object.definedproperty 遍历 data 对象的属性进行数据劫持
2. 发布订阅模式(来源于观察者模式)
   1. Observe 对源对象所有 key 进行数据劫持,对外释放存取接口
   2. Dep 主要负责为 Observe 收集订阅者,一旦数据变化,通知所有 watcher 更新视图.
   3. Watcher 负责更新视图,接受 Dep 的广播

# 虚拟 DOM(diff 算法)

1. 原因:DOM 被 js 代码操纵进行同步更新,每一次改变都会从 DOM 树构建重新开始执行,浪费性能.
2. 虚拟 DOM:用 js 对象模拟 DOM 结点,将 js 对 DOM 的操作记录在 js 对象中,在改变累积到一定层度,再将这个虚拟 DOM 对象 attch 到 DOM 树上进行更新,避免大量无谓的计算量.
3. 虚拟 DOM 结点对象保存了节点名,节点属性,子节点,key 属性,count 孩子字节个数
4. 渲染成真实 DOM:用 document 对象的 CreateElement , SetAttr,Appendchild 函数创建真实的 DOM 树
5. Diff 算法(两个树完全比较 O(n^3),Diff 算法 O(n))
   1. 思路:平层比较
   2. 平层 Diff 只有四种类型:
      1. 结点类型改变(replace) div ——> p:将旧结点整个卸载,安装新节点
      2. 属性或属性值该改变(props) [‘a’] ——> [‘b’]:结点属性更新
      3. 文本变了(text) 直接修改文字内容
      4. 移动/增加/删除子节点(reorder),增加 key 找到位置操作
6. 新旧虚拟 DOM 与实际渲染
   **用户操作修改记录在新虚拟 DOM 中,旧虚拟 DOM 更新为真实 DOM 文档**

# 数据绑定与虚拟 DOM 结合
