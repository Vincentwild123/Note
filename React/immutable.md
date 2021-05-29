# ImmutableJS

### 前言

​ 内部实现是使用改写的新的数据结构,这种数据结构只要改变就会返回新的引用,同时改变前后对象共享结构,用于解决数据复制和缓存的需求,配合单向数据流,方便追终错误,常用于搭配 Flux,React

### 使用

```javascript
const { Map } = require("immutable");
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set("b", 50);
map1.get("b") + " vs. " + map2.get("b"); // 2 vs. 50
```

​ 使用很简单就不详细说了,主要说怎么用在实战中

#### 搭配 React

`Component` --> `React.PureComponent(函数组件的React.memo)`---> `React.PureComponent+ImmutableJS`

##### 普通 Component

​ 在不编写 SCU 之前,一旦父组件更新,子组件是一定会更新的,无论传入的 props 如何,甚至是本来就没有传 props,这就会导致严重的性能浪费.

##### React.PureComponent(React.memo)

​ 对于上述的性能浪费,可以通过 React.PureCompoent 组件来使用内置实现的 SCU,该内置 SCU 采用浅对比

```javascript
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }
  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState((state) => ({ count: state.count + 1 }))}
      >
        Count: {this.state.count}
      </button>
    );
  }
}
```

​ 当然,但一旦深层的属性被更改,组件是感知不到的,自然不会更新,从而就会出错(也可以手写 SCU,会更智能化一点,但写针对性 SCU 会消耗人力)

##### React.PureComponent+ImmutableJS

​ 停下来想想,我们遇到了什么困难,先明确我们的最终目标是要让组件精准更新,但目前的问题是\*\*\*\*

这样的话,我们的组件就会精确更新,同时更新数据极快,因为顶层引用是新的,不用深对比,但又不会更新未修改的组件,真的有这么 match 的东西吗?

有的,他就是大名鼎鼎的 ImmutableJS,它不仅满足上述优点还附赠你高效缓存功能,简单实现时间旅行,在这之前想要实现时间旅行就要对数据进行深拷贝.

请记住,上述所说的是在单向数据流的大概念下才有效,比如 Vue 的双向绑定就直接 proxy 代理或者递归的 defineProperty 完事了,照样精确更新(但 Proxy 效率不咋滴)

##### 4.搭配 Redux

​ 说到状态管理怎么能没有我们的 Redux,其中 reducer 要保持纯净,每次都要返回新的引用,要写成下面这样

```javascript
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter,
      });
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false,
          },
        ],
      });
    default:
      return state;
  }
}
```

​ 每次都要写这样的语法,我忍不了,使用 Immutable 的话,直接更改就行了,因为只要改变就会返回新的顶层引用,美滋滋~

#### 正文

​ 前面说的就是 Immutable 在我脑海中的使用,但使用并不是本文的目的,本文的主要目的是这种神奇的数据结构到底是怎么实现的,作为一个源码 reader,绝对忍不了黑魔法(当然也为了面试有水可吹)

#### 前缀树

![前缀树](https://pic.imgdb.cn/item/609ca1bcd1a9ae528fc28b9e.png)

![提交记录](https://pic.imgdb.cn/item/609ca1bcd1a9ae528fc28b86.png)

​ 有的朋友这时可能已经满脸问号了,Immutable 说着说着你怎么还给整道 leetcode 过来,[强迫症点这里去刷了它](https://leetcode-cn.com/problems/implement-trie-prefix-tree/),别急,会的可以直接跳过,没了解过的可以先看看,这和 Immutable 数据结构的实现可是有很密切的关系的.

> [Trie](http://en.wikipedia.org/wiki/Trie) is an efficient information re**\*Trie\***val data structure. Using Trie, search complexities can be brought to optimal limit (key length). If we store keys in binary search tree, a well balanced BST will need time proportional to **M \* log N**, where M is maximum string length and N is number of keys in tree. Using Trie, we can search the key in O(M) time. However the penalty is on Trie storage requirements

![前缀树](https://pic.imgdb.cn/item/609ca1e2d1a9ae528fc3c136.gif)

​ 简单来说,前缀树是一种多叉树,从`根`到`某一个节点`的路径构成一个单词,**注意!!!不一定是到叶子节点,虽然例图上都是,但具体到哪个节点结束要看该节点是否有 isEnd 标志,这是自定义的**,对于前缀树,主要的操作有 insert 和 search,insert 就是将一个单词插入树中,具体操作就是一个一个字母插入,search 是查找树中是否存在某一单词,[了解更多猛烈点击我](https://leetcode-cn.com/problems/implement-trie-prefix-tree/solution/shi-xian-trie-qian-zhui-shu-by-leetcode-ti500/),优点就是查询快.

### List 和 Map

`List`的实现就是使用 `索引前缀树`,索引的生成使用的是 Bitmap 也就是 Bit 位映射,特殊的是,Vector Trie 用`叶子节点`存放信息,其他节点存放索引

![list](https://pic.imgdb.cn/item/609ca1e2d1a9ae528fc3c109.png)

```javascript
// Constants describing the size of trie nodes.
export const SHIFT = 5; // Resulted in best performance after ______?
export const SIZE = 1 << SHIFT;
export const MASK = SIZE - 1;
```

此处定义了三个前缀树相关的常量

`SHIFT`常量定义每 SHIFT 位映射一个索引,此处规定为 5 位,即索引为 `[0,31]`

`SIZE`常量定义每个树节点索引数组的长度为 SIZE,此处为 `2^5 = 32`,与 SHIFT 位映射索引相匹配

`MASK`常量定义掩码,用于移位后的&运算,此处为 `11111`

具体是怎么映射呢?

先看伪代码

```java
public class BitTrie {
  public static final int BITS = 5,
                          WIDTH = 1 << BITS, // 2^5 = 32
                          MASK = WIDTH - 1; // 31, or 0x1f

  // Array of objects. Can itself contain an array of objects.
  Object[] root;
  // BITS times (the depth of this trie minus one).
  int shift;
  public Object lookup(int key) {
    Object[] node = this.root;
    // perform branching on internal nodes here
    for (int level = this.shift; level > 0; level -= BITS) {
      node = (Object[]) node[(key >>> level) & MASK];
      // If node may not exist, check if it is null here
    }
    // Last element is the value we want to lookup, return it.
    return node[key & MASK];
  }
}
```

这里找的是 java 版的,因为 java 代码比较好读

```java
public Object lookup(int key) {
    Object[] node = this.root;
    // perform branching on internal nodes here
    for (int level = this.shift; level > 0; level -= BITS) {
      node = (Object[]) node[(key >>> level) & MASK];
      // If node may not exist, check if it is null here
    }
    // Last element is the value we want to lookup, return it.
    return node[key & MASK];
 }
```

​ 注意其中的 lookup 方法,通过不断的移位,截取高位换成索引,进入下一层,而 Immutable 源码是通过递归做的,[`详细Bit Partitioning戳我了解`](https://hypirion.com/musings/understanding-persistent-vector-pt-2)

```javascript
//源码有删减
function updateVNode(node, ownerID, level, index, value, didAlter) {
  const idx = (index >>> level) & MASK;
  const nodeHas = node && idx < node.array.length;
  if (!nodeHas && value === undefined) {
    return node;
  }
  let newNode;
  if (level > 0) {
    const lowerNode = node && node.array[idx];

    //递归
    const newLowerNode = updateVNode(
      lowerNode,
      ownerID,
      level - SHIFT, //更新level,因为index是不变的,所以要更新level来截取不同位数
      index,
      value,
      didAlter
    );
    if (newLowerNode === lowerNode) {
      return node;
    }
    newNode = editableVNode(node, ownerID);
    newNode.array[idx] = newLowerNode;
    return newNode;
  }
}
```

举个栗子

##### get 操作

以 List.get(141)为例,为了简便,此处 SHIFT 定义为 2

![list2](https://pic.imgdb.cn/item/609ca1e2d1a9ae528fc3c0ec.png)

1. 141 转换为二进制 `10001101`
2. 从根节点开始,每 SHIFT=2 位作为一层的索引
3. 第一个索引为二进制`10` = 2 ,找到当前节点索引数组 index = 2 位置,取得下一层索引节点引用
4. 第二个索引为二进制`00` = 0, 找到当前节点索引数组 index = 0 位置,取得下一层索引节点引用
5. 第二个索引为二进制`11` = 3, 找到当前节点索引数组 index = 3 位置,取得下一层索引节点引用
6. 第二个索引为二进制`01` = 1, 找到当前节点索引数组 index = 1 位置,取得结果,返回结果

##### set 操作

set 操作与 get 操作类似,不过为了保持数据的持久化,需要返回新的顶层引用,所以在从根节点向下索引的过程中要 copy 沿路的节点,最后找到最终节点再替换数据

![set](https://pic.imgdb.cn/item/609ca23bd1a9ae528fc6a069.png)

如上图所示,List.set(4,"beef")

1. 与 get 类似,二进制化 4,取 SHIFT 位作为索引
2. 复制沿路节点
3. 找到存放数据的叶子节点,复制一份再修改数据
4. 返回新的·

---

`Map`

Map 采用的是 Hash Trie

![map](https://pic.imgdb.cn/item/609ca1e2d1a9ae528fc3c0d4.png)

大体与 Vector Trie 相同,不过需要将 key 通过 hash 映射得到整数 index

```typescript
function hash(key: any): Number {
  //hash key
}
```

hash 源码如下

```javascript
export function hash(o) {
  switch (typeof o) {
    case "boolean":
      // The hash values for built-in constants are a 1 value for each 5-byte
      // shift region expect for the first, which encodes the value. This
      // reduces the odds of a hash collision for these common values.
      return o ? 0x42108421 : 0x42108420;
    case "number":
      return hashNumber(o);
    case "string":
      return o.length > STRING_HASH_CACHE_MIN_STRLEN
        ? cachedHashString(o)
        : hashString(o);
    case "object":
    case "function":
      if (o === null) {
        return 0x42108422;
      }
      if (typeof o.hashCode === "function") {
        // Drop any high bits from accidentally long hash codes.
        return smi(o.hashCode(o));
      }
      if (o.valueOf !== defaultValueOf && typeof o.valueOf === "function") {
        o = o.valueOf(o);
      }
      return hashJSObj(o);
    case "undefined":
      return 0x42108423;
    default:
      if (typeof o.toString === "function") {
        return hashString(o.toString());
      }
      throw new Error("Value type " + typeof o + " cannot be hashed.");
  }
}
```

举个栗子

map.get("R")

![map2](https://pic.imgdb.cn/item/609ca1e2d1a9ae528fc3c0bb.png)

1. 将 key 进行 hash 获得二进制 `01010010`
2. 从后往前依此取 2 位作为索引,获取下一层节点
3. 重复 2 直到找到该 key 存储位置

有的朋友就会问了,为什么要从后往前,不能从前往后取,因为我压根就不知道 hash 出来是几位,只能从后往前索引

---

### 尾声

​ 持久化数据的核心理念其实在一篇论文中首先出现的,在譬如 GO 语言中也有类似实现,Immutable 作者也自嘲是 copycat,但配合 React 的如虎添翼也是有目共睹的,本人水平有限,所以本文也没有过于深入研究,诸如 Sep,Record 等数据结构也没有分析,出错难免,请各位指正.

### 参考

[immutable-js](https://github.com/immutable-js)

[Functional Go: Vector Trie 的实现](https://io-meter.com/2016/09/15/functional-go-implement-vector-trie/)

[wiki hash_array_mapped_trie](https://en.wikipedia.org/wiki/Hash_array_mapped_trie)

[Understanding Clojure's Persistent Vectors, pt. 2](https://hypirion.com/musings/understanding-persistent-vector-pt-2)

[使用 immutable 优化 React](https://juejin.cn/post/6844903758439120903)

[React 的性能优化(一)当 PureComponent 遇上 ImmutableJS](https://juejin.cn/post/6844903501290536967)

[Reconciliation in React detailed explanation](https://stackoverflow.com/questions/34990190/reconciliation-in-react-detailed-explanation)

[React.js Conf 2015 - Immutable Data and React](https://www.youtube.com/watch?v=I7IdS-PbEgI&list=PLb0IAmt7-GS1cbw4qonlQztYV1TAW0sCr&index=15)

[trie 树这个数据结构的优点是什么,中文名称是什么? 提高点难度:他的缺点是什么,效率用 big O 表示是多高?](https://www.zhihu.com/question/22069841)
