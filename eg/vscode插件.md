#### vscode 能做的事情

1. 改变 vscode 颜色和主题
2. 拓展工作台
3. 创建一个 webview 提调试你的前端程序
4. 支持新的语言,自定义语言
5. 支持调试特定的运行时

#### API 文档

1. 基本概念
2. API 详细说明
3. 使用实例
4. 如何增加对编程语言的支持
5. 测试和发布
6. 更深的功能

#### 开始

1. 注册 onCommand Acrivation Event
2. 映射命令到拓展命令
3. 编写拓展命令的响应函数

#### package.json

package 拥有基本的 node 包配置属性,但有几个属性是 vscode 特有的
比如说:
name/publisher:vscode 使用 publisher.name 作为拓展唯一 ID
activationEvents/contributes:
engines.vscode:约定的拓展所需要的 vscode 最低版本

### API

#### 1. Overview

1. 普通功能

- 注册命令,绑定快捷键,配置,上下文菜单项
- 存储工作区全局数据
- 显示通知信息
- 收集用户输入
- 让用户选择文件
- 对于长操作显示进度条

---

2. 主题相关

- 改变源码颜色
- 改变 UI
- 将现有的主题移植到 vscode
- 增加文件 icon

---

3. 关于程序语言的缩进等功能

---

4. 编程语言的支持

- 悬停窗口
- 诊断报告错误
- 注册新的格式
- 上下文智能感知
- 代码折叠,面包屑,轮廓支持

---

5. workbench UI

#### 2. common capabilities

1. 命令,使用 vscode.commands 注册命令,在 json 文件中绑定命令到命令 Palette
2. 配置,通过 contributes.configuration 配置,通过 workspace.getConfiguration 读取
3. 快捷键绑定
4. 上下文菜单,右键点击时出现,可以通过 contributes.menus 配置
5. 全局数据存储,使用 ExtensionContext
6. 显示消息:window.showXXXX
7. 进度条

#### 3. 使用命令

1. 编程式调用命令 executeCommand
2. 带有参数的执行命令:executeComand('command-name',params)
3. 使用 command URI 执行命令,
4. 自定义命令,registerCommand,package.json 设置命令
