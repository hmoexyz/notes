# Linux的md5sum命令

Bash 中的 [`md5sum`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.md5sum.md) 命令是一个用于计算和校验文件 MD5 哈希值的实用工具。MD5（Message-Digest Algorithm 5）是一种广泛使用的密码散列函数，可以生成 128位（16字节）的哈希值，通常表示为32个字符的十六进制数。

### 基本用法
```bash
md5sum [选项]... [文件]...
```

### 常见用途
1. **文件完整性校验**
   ```bash
   md5sum important_file.iso
   ```
   会输出类似的结果：
   ```
   d41d8cd98f00b204e9800998ecf8427e  important_file.iso
   ```

2. **批量校验多个文件**
   ```bash
   md5sum *.txt
   ```

3. **校验下载的文件**
   ```bash
   md5sum downloaded_file.zip
   ```
   然后与官方提供的 MD5 值进行比对

### 常用选项
- `-b` 或 `--binary`：以二进制模式读取文件（默认）
- `-t` 或 `--text`：以文本模式读取文件
- `-c` 或 `--check`：从文件中读取 MD5 值并进行校验
- `--quiet`：只显示校验失败的文件
- `--status`：不输出任何信息，使用退出状态码表示结果

### 校验示例
1. 首先生成校验文件：
   ```bash
   md5sum file1.txt file2.txt > checksums.md5
   ```

2. 然后进行校验：
   ```bash
   md5sum -c checksums.md5
   ```

### 注意事项
1. MD5 算法存在已知的碰撞漏洞，不适合用于安全性要求高的场合
2. 在 Linux 和 macOS 上命令名称相同，但在某些 Unix 系统上可能是 `md5`
3. 对于大文件计算可能需要较长时间
4. 可以结合管道使用，例如：
   ```bash
   echo "test" | md5sum
   ```

### 替代方案
对于需要更高安全性的场景，可以考虑使用：
- [`sha1sum`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.sha1sum.md)
- [`sha256sum`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.sha256sum.md)
- [`sha512sum`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.sha512sum.md)

这些命令的用法与 [`md5sum`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.md5sum.md) 类似，但使用不同的哈希算法。
