# grep 命令

_grep_ （_缩写_来自Globally search a Regular Expression and Print）是一种强大的文本搜索工具，它能使用特定模式匹配（包括正则表达式）搜索文本，并默认输出匹配行。

---

## 0\. 准备：创建示例日志文件

在终端执行：

```c
nano test.log

```

粘贴下面内容：

```ini
2026-01-27 10:01:12 INFO  App started
2026-01-27 10:01:15 INFO  User login success userId=123
2026-01-27 10:02:01 WARN  VIDEO_BLUR enabled for low bandwidth
2026-01-27 10:02:05 ERROR Network REJECT_TIMEOUT while calling API
2026-01-27 10:02:07 DEBUG psi-p packet received size=512
2026-01-27 10:02:10 INFO  Request finished traceId=abc
2026-01-27 10:03:00 ERROR Payment failed orderId=998
2026-01-27 10:03:10 INFO  App closed

```

保存退出：`Ctrl + O` → 回车 → `Ctrl + X`

查看文件：

```matlab
cat test.log

```

---

## 1\. 单关键词过滤（忽略大小写）

### 命令

```lua
grep -i error test.log

```

### 实际输出

```vbnet
2026-01-27 10:02:05 ERROR Network REJECT_TIMEOUT while calling API
2026-01-27 10:03:00 ERROR Payment failed orderId=998

```

### 解释

* [`grep`](https://xplanc.org/primers/document/zh/10.Bash/90.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/EX.grep.md)：搜索工具
* [`error`](https://xplanc.org/primers/document/zh/09.Lua/91.%E5%86%85%E7%BD%AE%E5%87%BD%E6%95%B0/EX.error.md)：关键词
* `-i`：忽略大小写（error / ERROR 都匹配）

---

## 2\. 多关键词 OR（error 或 timeout 或 fail）

### 命令

```c
grep -E -i "error|timeout|fail" test.log

```

### 实际输出

```vbnet
2026-01-27 10:02:05 ERROR Network REJECT_TIMEOUT while calling API
2026-01-27 10:03:00 ERROR Payment failed orderId=998

```

（第一行包含 timeout，第二行包含 fail）

### 解释

* `-E`：启用扩展正则，支持 `A|B|C`
* `|`：或（OR）
* `-i`：忽略大小写

---

## 3\. 指定你原始的 3 个关键词

### 命令

```c
grep -E -i "REJECT_TIMEOUT|VIDEO_BLUR|psi-p" test.log

```

### 实际输出

```yaml
2026-01-27 10:02:01 WARN  VIDEO_BLUR enabled for low bandwidth
2026-01-27 10:02:05 ERROR Network REJECT_TIMEOUT while calling API
2026-01-27 10:02:07 DEBUG psi-p packet received size=512

```

---

## 4\. 多条件 AND（同时包含 error 和 timeout）

### 命令

```css
grep -i error test.log | grep -i timeout

```

### 实际输出

```vbnet
2026-01-27 10:02:05 ERROR Network REJECT_TIMEOUT while calling API

```

### 解释

两次过滤：

1. 先找 error
2. 再从结果里找 timeout

---

## 5\. 显示行号

### 命令

```lua
grep -n -i error test.log

```

### 实际输出

```vbnet
4:2026-01-27 10:02:05 ERROR Network REJECT_TIMEOUT while calling API
7:2026-01-27 10:03:00 ERROR Payment failed orderId=998

```

---

## 6\. 查看上下文（前后各 2 行）

### 命令

```c
grep -n -C 2 -i "REJECT_TIMEOUT" test.log

```

### 实际输出

```ini
2-2026-01-27 10:01:15 INFO  User login success userId=123
3-2026-01-27 10:02:01 WARN  VIDEO_BLUR enabled for low bandwidth
4:2026-01-27 10:02:05 ERROR Network REJECT_TIMEOUT while calling API
5-2026-01-27 10:02:07 DEBUG psi-p packet received size=512
6-2026-01-27 10:02:10 INFO  Request finished traceId=abc

```

---

## 7\. 排除某类日志（去掉 DEBUG）

### 命令

```c
grep -v "DEBUG" test.log

```

### 实际输出

```yaml
2026-01-27 10:01:12 INFO  App started
2026-01-27 10:01:15 INFO  User login success userId=123
2026-01-27 10:02:01 WARN  VIDEO_BLUR enabled for low bandwidth
2026-01-27 10:02:05 ERROR Network REJECT_TIMEOUT while calling API
2026-01-27 10:02:10 INFO  Request finished traceId=abc
2026-01-27 10:03:00 ERROR Payment failed orderId=998
2026-01-27 10:03:10 INFO  App closed

```

---

## 8\. 只看最后 N 行再过滤

### 命令

```lua
tail -n 4 test.log | grep -i error

```

### 实际输出

```ini
2026-01-27 10:03:00 ERROR Payment failed orderId=998

```

---

## 9\. 实时监控日志

### 命令

```lua
tail -f test.log | grep -i error

```

### 模拟追加日志

另一个终端执行：

```bash
echo "2026-01-27 10:04:00 ERROR New crash happened" >> test.log

```

### 实时窗口看到

```vbnet
2026-01-27 10:04:00 ERROR New crash happened

```

---

## 10\. 你那条命令的完整含义

```c
grep -E -i "REJECT_TIMEOUT|VIDEO_BLUR|psi-p" tico_app2.log

```

等价于：

> 在 tico\_app2.log 中查找包含以下任意关键词的行：
> 
> * REJECT\_TIMEOUT
> * VIDEO\_BLUR
> * psi-p
> 
> 并忽略大小写。

---

## 11\. 必记 5 条黄金命令

```perl
# 单关键词
grep -i error app.log

# 多关键词 OR
grep -E -i "error|timeout|fail" app.log

# 多条件 AND
grep -i error app.log | grep -i timeout

# 行号 + 上下文
grep -n -C 3 -i error app.log

# 实时监控
tail -f app.log | grep -i error

```

---

## 12\. 更快的替代：ripgrep（rg）

```c
brew install ripgrep
rg -i "error|timeout|fail" app.log

```

速度通常比 grep 快 3\~10 倍。

---

---

> 《[grep一下](https://www.xyzblog.publicvm.com/39dfb6ba3092ea68544e2e52f53b977829290c3052448af433b03aa5048c1bd7)》 是转载文章，[点击查看原文](https://juejin.cn/post/7599826983888109611)。