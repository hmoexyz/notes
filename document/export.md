# linux的export命令

[`export`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.export.md) 是 Linux/Unix shell 中的一个内置命令，主要用于将 shell 变量或函数导出为环境变量，使其在当前 shell 及其子进程中可用。

## 基本语法

```bash
export [-fn] [name[=value] ...]
export -p
```

## 主要参数

- `-f`：将函数作为环境变量导出
- `-n`：从导出的变量中移除指定名称
- `-p`：列出所有导出的变量（这是默认行为）

## 使用示例

### 1. 导出变量

```bash
export MY_VAR="Hello World"
```

这会将 `MY_VAR` 设置为环境变量，其值为 "Hello World"

### 2. 查看导出的变量

```bash
export -p
# 或直接输入
export
```

### 3. 导出现有变量

```bash
MY_VAR="Hello"
export MY_VAR
```

### 4. 导出函数

```bash
myfunc() { echo "This is a function"; }
export -f myfunc
```

### 5. 取消导出变量

```bash
export -n MY_VAR
```

## 实际应用场景

1. **PATH 环境变量设置**
   ```bash
   export PATH=$PATH:/usr/local/bin
   ```

2. **临时设置语言环境**
   ```bash
   export LANG=en_US.UTF-8
   ```

3. **脚本中设置环境变量**
   ```bash
   #!/bin/bash
   export DB_HOST="localhost"
   export DB_PORT="3306"
   ```

4. **设置开发环境变量**
   ```bash
   export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
   export PATH=$PATH:$JAVA_HOME/bin
   ```

## 注意事项

1. 导出的变量只在当前 shell 及其子进程中有效，不会影响父进程
2. 要使变量永久生效，需要将 [`export`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.export.md) 命令添加到 shell 的配置文件（如 `~/.bashrc` 或 `~/.bash_profile`）
3. 环境变量名称通常使用大写字母，这是约定俗成的做法
4. 变量值中包含空格时，需要用引号括起来

## 与普通变量的区别

| 特性        | 普通变量          | 环境变量 (export) |
|------------|------------------|------------------|
| 作用范围    | 当前 shell        | 当前 shell 及其子进程 |
| 子进程可见  | 不可见            | 可见             |
| 持久性      | shell 退出后消失  | shell 退出后消失 |

## 相关命令

- [`env`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.env.md)：查看或设置环境变量
- [`printenv`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.printenv.md)：打印环境变量
- `set`：显示所有变量（包括环境变量和普通变量）
- `unset`：删除变量
