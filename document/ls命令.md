# ls命令笔记

[`ls`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.ls.md) 是 **Linux/Unix 系统中最常用的文件/目录查看命令**，用来 **列出目录内容、文件信息**，功能非常丰富。



## 一、命令格式

```bash
ls [选项] [文件或目录...]
```

* `[选项]`：用来控制显示方式、排序、颜色、详细信息等
* `[文件或目录...]`：要显示的目标，默认当前目录



## 二、常用选项分类

### 显示详细信息

| 选项   | 说明                         |
| - | -- |
| `-l` | 长列表格式，显示权限、拥有者、大小、修改时间等    |
| `-h` | 配合 `-l`，以易读方式显示大小（如 1K、2M） |
| `-a` | 显示所有文件，包括隐藏文件（`.` 开头）      |
| `-A` | 类似 `-a`，但不显示 `.` 和 `..`    |

示例：

```bash
ls -lha
```



### 排序和时间

| 选项   | 说明                              |
| - | - |
| `-t` | 按修改时间排序（最新的排前面）                 |
| `-S` | 按文件大小排序（大文件排前面）                 |
| `-r` | 反转排序顺序                          |
| `-X` | 按扩展名排序                          |
| `-v` | 按数字顺序排序（如 file1, file2, file10） |



### 目录递归显示

| 选项   | 说明        |
| - | -- |
| `-R` | 递归显示子目录内容 |



### 颜色显示

| 选项             | 说明                          |
| -- | -- |
| `--color=auto` | 根据文件类型显示不同颜色（常见 shell 默认开启） |

常用颜色约定：

* 蓝色：目录
* 绿色：可执行文件
* 红色：压缩文件
* 黄色：设备文件



### 简单列式显示

| 选项   | 说明                   |
| - | -- |
| `-1` | 每行一个文件（默认有时会按终端宽度排列） |
| `-C` | 多列显示（默认）             |
| `-m` | 用逗号分隔显示              |



## 三、常用示例

### 基本列出

```bash
ls
```

### 列出隐藏文件

```bash
ls -a
```

### 长列表显示文件权限和大小

```bash
ls -lh
```

示例输出：

```
-rw-r--r-- 1 user group 1.2K Jan  5 10:00 file.txt
drwxr-xr-x 2 user group 4.0K Jan  5 09:55 folder
```

* `-rw-r--r--`：权限
* `1`：硬链接数
* `user`：文件拥有者
* `group`：所属组
* `1.2K`：文件大小
* `Jan 5 10:00`：最后修改时间
* `file.txt`：文件名



### 递归显示目录

```bash
ls -R
```

### 按大小排序并显示人类可读

```bash
ls -lhS
```



## 四、组合常用命令

* [`ls -alh`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.ls.md)：列出所有文件，详细信息，可读大小
* [`ls -lt`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.ls.md)：按修改时间排序，最新的文件在前
* [`ls -lhSr`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.ls.md)：按大小升序显示



## 五、注意事项

1. **不同 shell 或系统默认行为可能不同**

   * GNU [`ls`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.ls.md) 支持 `--color`
   * BSD / macOS [`ls`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.ls.md) 可能略有差异

2. **文件名带空格**

   * [`ls`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.ls.md) 会原样显示，但在脚本中最好用 `-b` 或 `-Q`：

```bash
ls -b      # 转义空格
ls -Q      # 加引号
```

3. **结合管道**

```bash
ls -lh | less
ls -1 | grep "pattern"
```



## 六、一句话总结

> **[`ls`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.ls.md) = 查看目录内容和文件信息的命令，可以通过各种选项控制显示方式、排序、颜色和递归，最常用的组合是 [`ls -alh`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.ls.md)。**