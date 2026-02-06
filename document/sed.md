# sed命令详解

## 基本概念

[`sed（Stream EDitor）`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.sed.md) 是一个强大的流编辑器，用于对输入流（文件或管道）进行基本的文本转换。它逐行处理文本，执行用户指定的编辑命令，然后将结果输出到标准输出。

## 基本语法

```bash
sed [选项] '命令' 输入文件
```

## 常用选项

- `-n`：禁止默认输出，只打印经过处理的行
- `-e`：允许多个编辑命令
- `-f`：从指定文件中读取编辑命令
- [`-i`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.i.md)：直接修改文件内容（慎用）
- `-r`：使用扩展正则表达式（某些版本使用 `-E`）

## 基本命令

1. **替换命令 (s)**
   ```bash
   sed 's/原字符串/新字符串/' 文件
   ```
   示例：将文件中所有"apple"替换为"orange"
   ```bash
   sed 's/apple/orange/g' fruits.txt
   ```
   - `g` 表示全局替换（每行所有匹配）
   - 可以指定替换第N个匹配：[`sed 's/apple/orange/2'`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.sed.md) 只替换每行第二个匹配

2. **删除命令 (d)**
   ```bash
   sed 'Nd' 文件  # 删除第N行
   sed '/pattern/d' 文件  # 删除匹配pattern的行
   ```

3. **打印命令 (p)**
   ```bash
   sed -n 'Np' 文件  # 打印第N行
   sed -n '/pattern/p' 文件  # 打印匹配pattern的行
   ```

4. **插入/追加命令 (i/a)**
   ```bash
   sed 'Ni\插入内容' 文件  # 在第N行前插入
   sed 'Na\追加内容' 文件  # 在第N行后追加
   ```

## 高级用法

1. **多命令执行**
   ```bash
   sed -e 's/apple/orange/' -e 's/banana/grape/' fruits.txt
   ```
   或者：
   ```bash
   sed 's/apple/orange/; s/banana/grape/' fruits.txt
   ```

2. **地址范围**
   ```bash
   sed '10,20d' file  # 删除10-20行
   sed '/start/,/end/d' file  # 删除从匹配"start"到匹配"end"之间的行
   ```

3. **保持空间操作**
   - `h`：将模式空间内容复制到保持空间
   - `H`：将模式空间内容追加到保持空间
   - `g`：将保持空间内容复制到模式空间
   - `G`：将保持空间内容追加到模式空间
   - `x`：交换模式空间和保持空间内容

4. **分支命令 (b)**
   ```bash
   sed ':label; command; b label'  # 创建循环
   ```

## 实际应用示例

1. **删除空白行**
   ```bash
   sed '/^$/d' file.txt
   ```

2. **在文件开头插入内容**
   ```bash
   sed '1i\插入的内容' file.txt
   ```

3. **批量重命名文件**
   ```bash
   ls *.txt | sed 's/\(.*\)\.txt/mv & \1.doc/' | sh
   ```

4. **提取日志中的特定时间段记录**
   ```bash
   sed -n '/2023-05-01 10:00:00/,/2023-05-01 11:00:00/p' app.log
   ```

## 注意事项

1. 使用 [`-i`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.i.md) 选项会直接修改原文件，建议先不加 [`-i`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.i.md) 测试命令效果
2. 在MacOS上，sed的语法可能与Linux略有不同
3. 复杂的文本处理可能需要结合awk等其他工具

[`sed`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.sed.md) 是Unix/Linux系统中非常强大的文本处理工具，熟练掌握它可以大大提高文本处理的效率。
