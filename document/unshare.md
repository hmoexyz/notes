# Linux 的 unshare 命令详解

## 基本概念

[`unshare`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.unshare.md) 是 Linux 系统中的一个命令行工具，用于运行程序时解除某些命名空间的共享关系。它允许进程与父进程或其他进程在指定的命名空间上"解除共享"，从而创建新的命名空间实例。

## 主要功能

[`unshare`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.unshare.md) 命令的主要功能包括：
- 创建新的命名空间（如 PID、网络、挂载等）
- 在指定的命名空间中运行程序
- 控制进程与父进程的命名空间共享关系

## 常用选项

[`unshare`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.unshare.md) 命令支持以下常用选项：

```
--mount[=file]      解除挂载命名空间的共享
--uts[=file]        解除 UTS 命名空间的共享
--ipc[=file]        解除 IPC 命名空间的共享
--network[=file]    解除网络命名空间的共享
--pid[=file]        解除 PID 命名空间的共享
--user[=file]       解除用户命名空间的共享
--cgroup[=file]     解除 cgroup 命名空间的共享
--time[=file]       解除时间命名空间的共享
--fork              配合 --pid 使用时 fork 子进程
--mount-proc        在解除 PID 命名空间共享后重新挂载 /proc
--map-root-user     映射当前用户为命名空间中的 root
--propagation slave|shared|private|unchanged
                    控制挂载点的传播类型
```

## 使用示例

### 1. 创建新的网络命名空间

```bash
unshare --network /bin/bash
```
这个命令会创建一个新的网络命名空间并启动 bash shell。在新的命名空间中，网络配置是独立的，可以配置自己的网络接口、路由等。

### 2. 创建新的 PID 命名空间

```bash
unshare --pid --fork --mount-proc /bin/bash
```
这个命令会：
- 创建新的 PID 命名空间
- 使用 `--fork` 选项确保新进程成为命名空间中的 PID 1
- 使用 `--mount-proc` 重新挂载 /proc 文件系统
- 启动 bash shell

### 3. 创建完全隔离的环境

```bash
unshare --mount --uts --ipc --network --pid --fork --mount-proc --map-root-user /bin/bash
```
这个命令创建了一个几乎完全隔离的环境，包括：
- 独立的挂载点
- 独立的主机名和域名
- 独立的 IPC
- 独立的网络栈
- 独立的 PID 空间
- 当前用户映射为 root

## 应用场景

1. **容器技术**：Docker 等容器技术底层使用 [`unshare`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.unshare.md) 来创建隔离的命名空间
2. **安全沙箱**：运行不受信任的代码时提供隔离环境
3. **网络测试**：创建独立的网络环境进行网络配置测试
4. **进程调试**：隔离进程以便调试而不影响主机系统
5. **文件系统实验**：创建独立的挂载点进行文件系统测试

## 注意事项

1. 使用 [`unshare`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.unshare.md) 需要 root 权限或相应的 capabilities
2. 某些命名空间选项需要内核支持
3. 过度隔离可能导致程序无法正常工作
4. 退出命名空间后，其中的所有进程都会被终止
5. 使用 [`--map-root-user`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.map.md) 时要注意安全风险

## 相关命令

- [`nsenter`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.nsenter.md)：进入已存在的命名空间
- `ip netns`：网络命名空间管理
- `clone()` 系统调用：底层实现命名空间创建的机制
