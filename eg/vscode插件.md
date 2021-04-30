#### vscode能做的事情

1. 改变vscode颜色和主题
2. 拓展工作台
3. 创建一个webview提调试你的前端程序
4. 支持新的语言，自定义语言
5. 支持调试特定的运行时


#### API文档

1. 基本概念
2. API详细说明
3. 使用实例
4. 如何增加对编程语言的支持
5. 测试和发布
6. 更深的功能


#### 开始
1. 注册onCommand Acrivation Event
2. 映射命令到拓展命令
3. 编写拓展命令的响应函数

#### package.json
package拥有基本的node包配置属性，但有几个属性是vscode特有的
比如说：
name/publisher:vscode使用publisher.name作为拓展唯一ID
activationEvents/contributes:
engines.vscode:约定的拓展所需要的vscode最低版本


### API

#### 1. Overview
1. 普通功能
+ 注册命令，绑定快捷键，配置，上下文菜单项
+ 存储工作区全局数据
+ 显示通知信息
+ 收集用户输入
+ 让用户选择文件
+ 对于长操作显示进度条

---



2. 主题相关
+ 改变源码颜色
+ 改变UI
+ 将现有的主题移植到vscode
+ 增加文件icon

---



3. 关于程序语言的缩进等功能

---



4. 编程语言的支持

+ 悬停窗口
+ 诊断报告错误
+ 注册新的格式
+ 上下文智能感知
+ 代码折叠，面包屑，轮廓支持

---

5. workbench UI

#### 2. common capabilities

1. 命令，使用vscode.commands注册命令，在json文件中绑定命令到命令Palette
2. 配置，通过contributes.configuration配置，通过workspace.getConfiguration读取
3. 快捷键绑定
4. 上下文菜单，右键点击时出现，可以通过contributes.menus配置
5. 全局数据存储，使用ExtensionContext
6. 显示消息：window.showXXXX
7. 进度条

#### 3. 使用命令

1. 编程式调用命令  executeCommand
2. 带有参数的执行命令：executeComand('command-name',params)
3. 使用command URI执行命令，
4. 自定义命令，registerCommand，package.json设置命令