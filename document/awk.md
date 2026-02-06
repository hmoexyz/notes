# awk命令详解

## 基本概念

[`awk`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.awk.md) 是一种强大的文本处理工具，主要用于对文本文件进行模式扫描和处理。它得名于其三位创始人Alfred Aho、Peter Weinberger和Brian Kernighan的姓氏首字母。

## 基本语法

```bash
awk 'pattern {action}' file
```

其中：
- `pattern`是匹配模式，可以是正则表达式或条件表达式
- `action`是对匹配行执行的操作
- `file`是要处理的输入文件

## 工作原理

1. [`awk`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.awk.md) 逐行读取输入文件
2. 对于每一行，检查是否匹配指定的模式
3. 如果匹配，则执行相应的动作
4. 重复这个过程直到文件结束

## 常用功能

### 字段处理

[`awk`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.awk.md) 默认以空格或制表符分隔字段：
- `$0`表示整行
- `$1`表示第一个字段
- `$2`表示第二个字段，以此类推

示例：
```bash
awk '{print $1}' file.txt  # 打印每行的第一个字段
```

### 内置变量

- `NR`：当前记录号(行号)
- `NF`：当前记录的字段数
- `FS`：字段分隔符(默认为空格)
- `OFS`：输出字段分隔符(默认为空格)
- `RS`：记录分隔符(默认为换行符)
- `ORS`：输出记录分隔符(默认为换行符)

示例：
```bash
awk 'NR==5{print}' file.txt  # 打印第5行
```

### 模式匹配

支持正则表达式和条件判断：
```bash
awk '/error/{print}' log.txt  # 打印包含"error"的行
awk '$3 > 100 {print $1}' data.txt  # 第三个字段大于100时打印第一个字段
```

### 数学运算

awk支持基本的数学运算：
```bash
awk '{sum += $1} END {print sum}' numbers.txt  # 计算第一列的总和
```

### BEGIN和END模式

- `BEGIN`：在处理输入前执行
- `END`：在处理完所有输入后执行

示例：
```bash
awk 'BEGIN{FS=":"} {print $1}' /etc/passwd  # 以冒号为分隔符打印第一列
```

## 高级用法

### 条件语句

支持if-else结构：
```bash
awk '{if ($1 > 50) print "High"; else print "Low"}' data.txt
```

### 循环结构

支持for和while循环：
```bash
awk '{for(i=1;i<=NF;i++) print $i}' file.txt  # 打印每个字段
```

### 数组

awk支持关联数组：
```bash
awk '{count[$1]++} END {for (item in count) print item, count[item]}' data.txt
```

### 自定义函数

可以定义自己的函数：
```bash
awk 'function myfunc(x) {return x*2} {print myfunc($1)}' numbers.txt
```

## 实际应用示例

1. 统计日志文件中不同IP出现的次数：
```bash
awk '{ip[$1]++} END {for (i in ip) print i, ip[i]}' access.log
```

2. 计算CSV文件中某列的平均值：
```bash
awk -F, '{sum += $5; count++} END {print sum/count}' data.csv
```

3. 提取特定格式的日期：
```bash
awk '/202[0-9]-[0-1][0-9]-[0-3][0-9]/ {print}' logfile.txt
```

[`awk`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.awk.md)功能强大且灵活，可以处理各种文本处理任务，是Linux/Unix环境下不可或缺的工具。
