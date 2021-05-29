## Git
### 普通文档项目管理的困难
1. 只能复制修改，保存版本
2. 项目修改信息没有
3. 修改人的信息和修改日期也没有
4. 无法同时操作一份文档，两人的操作都可能会被对方覆写
### Git特点
1. 分布式，一开始的出现是为了管理linux内核
2. 文档的任何时间点的信息被保存起来，所以可以显示编辑前后的差异
3. 覆写发生时会出现冲突，需要手动修改冲突

### 关于仓库
1. 仓库保存着所有版本的文档信息和差异信息
2. 系统会根据修改的内容计算出独特的40位英文及数字来命名某个版本，指定这个命名就可以找到对应版本
3. 不同类别的修改最好分为多次提交，以便找到对应的修改版本
4. 工作树>索引>数据库


### 实际操作
1. Git的环境有windows，MAC和命令行，同时拥有开源客户端TortoiseGit
2. 配置账号密码
3. 


### 分支合并

#### 1. merge 合并

- fast-forward 合并:master 分支在 dev 分支分叉出来以后没有进行过修改,合并后 master 分支指向 dev 分支最新提交

  ![合并前](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_1.png)

  ![合并后](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_2.png)

- non-fast-forward 合并:master 分支在 dev 分支分叉出来后有新的修改,此时就会合并出一个新的提交

  ![](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_3.png)

  ![](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_4.png)

#### 2. rebase

合并后会出现详细的提交记录,master 在前,dev 在后

![](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_8.png)

此时的 HEDA 是不动的,需要再移动 HEAD 到 bugfix 处

![移动后](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_9.png)
