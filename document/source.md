# linux的source命令

[`source`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.source.md)是Linux/Unix系统中的一个内置shell命令，用于在当前shell环境中执行指定的脚本文件，而不是在子shell中执行。这个命令对于修改当前shell环境变量特别有用。

## 基本语法

```bash
source filename [arguments]
```

或者使用简写形式：
```bash
. filename [arguments]
```

## 主要功能

1. **在当前shell环境中执行脚本**：与直接运行脚本([`./script.sh`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.script.md))不同，[`source`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.source.md)不会创建新的子shell进程

2. **加载环境变量**：常用于加载配置文件，如`.bashrc`、`.profile`等

3. **执行函数定义**：可以加载包含函数定义的脚本文件

## 常见应用场景

### 1. 重新加载配置文件

修改`.bashrc`或`.bash_profile`后，不需要重新登录就能使更改生效：
```bash
source ~/.bashrc
```

### 2. 设置环境变量

假设有一个[`env.sh`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.env.md)文件包含：
```bash
export PATH=$PATH:/custom/path
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk
```

使用[`source`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.source.md)加载：
```bash
source env.sh
```
这样环境变量会立即在当前shell中生效

### 3. 加载函数库

如果有一个函数库文件`functions.sh`：
```bash
function greet() {
    echo "Hello, $1!"
}
```

加载后可以直接使用：
```bash
source functions.sh
greet "World"  # 输出: Hello, World!
```

## 与直接执行脚本的区别

| 特性          | [`source`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.source.md)命令       | 直接执行脚本([`./script.sh`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.script.md)) |
|---------------|-------------------|---------------------------|
| 执行环境      | 当前shell         | 新的子shell               |
| 环境变量      | 会保留            | 不会影响当前shell         |
| 进程ID        | 与当前shell相同   | 创建新的进程              |
| 脚本中的exit  | 会退出当前shell   | 只退出子shell             |

## 注意事项

1. 使用[`source`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.source.md)时要确保脚本来源可信，因为它会在当前环境中执行所有命令

2. 脚本中的`exit`命令会直接退出当前shell会话

3. 如果脚本中有修改当前目录的命令([`cd`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.cd.md))，会影响当前shell的工作目录

4. 某些shell(如zsh)可能对[`source`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.source.md)命令有细微的行为差异

## 实际例子

假设有一个`project_env.sh`文件：
```bash
#!/bin/bash
export PROJECT_HOME=/home/user/project
export PATH=$PATH:$PROJECT_HOME/bin
alias proj="cd $PROJECT_HOME && ls"
```

加载这个环境配置：
```bash
source project_env.sh
```
之后就可以直接使用`$PROJECT_HOME`变量和`proj`别名了
