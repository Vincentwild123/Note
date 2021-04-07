### 分支合并

#### 1. merge合并

+ fast-forward合并：master分支在dev分支分叉出来以后没有进行过修改，合并后master分支指向dev分支最新提交

  ![合并前](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_1.png)

  ![合并后](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_2.png)

+ non-fast-forward合并：master分支在dev分支分叉出来后有新的修改，此时就会合并出一个新的提交

  ![](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_3.png)

  ![](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_4.png)

#### 2. rebase

合并后会出现详细的提交记录，master在前，dev在后

![](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_8.png)

此时的HEDA是不动的，需要再移动HEAD到bugfix处，

![移动后](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_9.png)