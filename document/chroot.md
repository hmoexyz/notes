# Linux 的 chroot 命令

## 基本概念

[`chroot`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.chroot.md)（Change Root）是一个 Unix/Linux 系统命令，用于在指定的目录中运行命令或交互式 shell，将这个目录作为进程的新根目录（/）。这个命令名称来源于 "change root directory" 的缩写。

## 命令语法

```bash
chroot [OPTION] NEWROOT [COMMAND [ARG]...]
```

## 主要用途

1. **系统修复**：当系统无法正常启动时，可以通过 Live CD/USB 启动后，使用 chroot 进入损坏的系统进行修复
2. **软件测试**：在隔离的环境中测试软件，不影响主系统
3. **安全隔离**：为某些服务创建受限的运行环境
4. **系统构建**：在构建新系统（如 LFS - Linux From Scratch）时使用

## 使用示例

### 基本用法

```bash
# 将 /mnt/newroot 作为新根目录，并启动 bash shell
sudo chroot /mnt/newroot /bin/bash
```

### 系统修复示例

```bash
# 挂载分区
sudo mount /dev/sda1 /mnt
sudo mount --bind /dev /mnt/dev
sudo mount --bind /proc /mnt/proc
sudo mount --bind /sys /mnt/sys

# 进入 chroot 环境
sudo chroot /mnt
```

### 创建受限环境

```bash
# 创建一个简单的 chroot 环境
mkdir -p /var/chroot/centos
for dir in bin lib lib64 usr etc; do
    mkdir -p /var/chroot/centos/$dir
done

# 复制必要的二进制文件和库
cp /bin/bash /var/chroot/centos/bin/
cp /bin/ls /var/chroot/centos/bin/
ldd /bin/bash | grep -o '/lib.*\.[0-9]' | xargs -I {} cp {} /var/chroot/centos/lib/
ldd /bin/ls | grep -o '/lib.*\.[0-9]' | xargs -I {} cp {} /var/chroot/centos/lib/

# 进入 chroot 环境
sudo chroot /var/chroot/centos /bin/bash
```

## 注意事项

1. **依赖问题**：chroot 环境需要包含命令所需的所有二进制文件和库
2. **特殊文件系统**：通常需要挂载 /proc, /dev, /sys 等特殊文件系统
3. **权限要求**：执行 chroot 通常需要 root 权限
4. **网络访问**：chroot 环境默认共享主机的网络配置
5. **进程隔离**：chroot 不是完全的安全隔离，现代容器技术（如 Docker）提供了更强的隔离

## 相关命令

- [`unshare`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.unshare.md)：更现代的 namespace 隔离工具
- `schroot`：更安全的 chroot 实现
- `systemd-nspawn`：systemd 提供的容器工具

## 扩展阅读

对于更高级的隔离需求，可以考虑使用 Linux 容器技术（LXC/Docker）或虚拟机，它们提供了比 chroot 更完整的隔离环境。