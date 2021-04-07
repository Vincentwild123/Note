# 数据双向绑定原理(数据改变更新视图，视图改变监听事件）
  1. 数据劫持：Object.definedproperty遍历data对象的属性进行数据劫持  
  2. 发布订阅模式（来源于观察者模式）
     1. Observe 对源对象所有key进行数据劫持，对外释放存取接口
     2. Dep 主要负责为Observe收集订阅者，一旦数据变化，通知所有watcher更新视图。
     3. Watcher负责更新视图，接受Dep的广播
# 虚拟DOM(diff算法)
  1. 原因：DOM被js代码操纵进行同步更新，每一次改变都会从DOM树构建重新开始执行，浪费性能。
  2. 虚拟DOM：用js对象模拟DOM结点，将js对DOM的操作记录在js对象中，在改变累积到一定层度，再将这个虚拟DOM对象attch到DOM树上进行更新，避免大量无谓的计算量。 
    1. 虚拟DOM结点对象保存了节点名，节点属性，子节点，key属性，count孩子字节个数
    2. 渲染成真实DOM：用document对象的CreateElement , SetAttr，Appendchild函数创建真实的DOM树
    3. Diff算法（两个树完全比较O(n^3),Diff算法O(n)）
        1. 思路：平层比较
        2. 平层Diff只有四种类型：
            1. 结点类型改变(replace) div ——> p:将旧结点整个卸载，安装新节点
            2. 属性或属性值该改变(props) [‘a’] ——> [‘b’]:结点属性更新
            3. 文本变了(text) 直接修改文字内容
            4. 移动/增加/删除子节点(reorder),增加key找到位置操作
    4. 新旧虚拟DOM与实际渲染
            **用户操作修改记录在新虚拟DOM中，旧虚拟DOM更新为真实DOM文档**
# 数据绑定与虚拟DOM结合

