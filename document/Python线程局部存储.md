# Python线程局部存储

> 一句话总结：  
> `threading.local()` 是 Python 标准库提供的「线程局部存储（Thread Local Storage, TLS）」方案，让**同一段代码在不同线程里拥有各自独立的变量空间**，从而避免加锁，也避免了层层传参的狼狈。

---

## 1\. 为什么需要线程局部存储？

在多线程环境下，如果多个线程共享同一个全局变量，就必须：

1. 加锁 → 代码变复杂、性能下降；
2. 或者层层传参 → 代码臃肿、可维护性差。

有些场景**只想让线程各自持有一份副本**，互不干扰：

* Web 服务：每个请求线程绑定自己的 `user_id`、`db_conn`；
* 日志：打印线程名 + 请求 ID，方便链路追踪；
* 数据库连接池：线程复用连接，但连接本身不跨线程传递。

这时 TLS 就是最优解。

---

## 2\. threading.local() 是什么？

`threading.local()` 返回一个「魔法对象」：  
**对它的属性赋值，只会在当前线程可见**；其它线程看不到、改不到。

```python
import threading

tls = threading.local()   # 1. 创建 TLS 对象

def worker(idx):
    tls.value = idx       # 2. 各线程写自己的值
    print(f'Thread {idx} sees {tls.value}')

for i in range(5):
    threading.Thread(target=worker, args=(i,)).start()

```

输出（顺序可能不同）：

```txt
Thread 0 sees 0
Thread 4 sees 4
Thread 1 sees 1
Thread 2 sees 2
Thread 3 sees 3

```

没有锁，也没有传参，却做到了线程间隔离。

---

## 3\. 内部原理：绿盒子里的字典

CPython 实现里，每个线程对象（`threading.Thread` 的底层 `PyThreadState`）都维护一个**私有字典**。  
`tls.xxx = value` 的本质是：

```python
# 伪代码
current_thread_dict[id(tls)]['xxx'] = value

```

[`id(tls)`](https://xplanc.org/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.id.md) 作为 key 保证不同 `local()` 实例之间互不干扰；  
当前线程字典保证线程之间互不干扰。

---

## 4\. 实战 1：Flask/Django 风格的请求上下文

```python
import threading
import time

_ctx = threading.local()

def api_handler(request_id):
    _ctx.request_id = request_id
    business_logic()

def business_logic():
    # 任意深处都能拿到 request_id，而不用层层传参
    print(f'Handling {threading.current_thread().name}  req={_ctx.request_id}')
    time.sleep(0.1)

for rid in range(3):
    threading.Thread(target=api_handler, args=(rid,), name=f'T{rid}').start()

```

---

## 5\. 实战 2：线程安全的数据库连接

```python
import sqlite3, threading

db_local = threading.local()

def get_conn():
    """每个线程首次调用时创建连接，后续复用"""
    if not hasattr(db_local, 'conn'):
        db_local.conn = sqlite3.connect(':memory:')
    return db_local.conn

def worker():
    conn = get_conn()
    conn.execute('create table if not exists t(x)')
    conn.execute('insert into t values (1)')
    conn.commit()
    print(f'{threading.current_thread().name}  inserted')

threads = [threading.Thread(target=worker) for _ in range(5)]
for t in threads: t.start()
for t in threads: t.join()

```

---

## 6\. 常见坑 & 注意事项

| 坑点       | 说明                                                                              |
| -------- | ------------------------------------------------------------------------------- |
| 线程池/协程混用 | threading.local 只在**原生线程**隔离，协程或线程池复用线程时会出现「数据串台」。Python 3.7+ 请优先用 contextvars。 |
| 不能跨线程传递  | 子线程无法访问父线程设置的值；需要显式传参或队列。                                                       |
| 内存泄漏     | 线程结束但 TLS 里的对象若循环引用，可能延迟释放。建议在线程收尾手动 del tls.xxx。                               |
| 继承失效     | 自定义 Thread 子类时，别忘了调用 super().\_\_init\_\_()，否则 TLS 初始化会异常。                      |

---

## 7\. 与 contextvars 的对比（Python 3.7+）

| 特性         | threading.local | contextvars                |
| ---------- | --------------- | -------------------------- |
| 隔离粒度       | 线程              | 协程/线程（Task level）          |
| 是否支持 async | ❌               | ✅                          |
| 是否支持默认值    | ❌               | ✅（ContextVar(default=...)） |
| 性能         | 原生 C 实现，快       | 稍慢，但可接受                    |
| 兼容性        | 2.x 就有          | 3.7+                       |

结论：

* 只用**原生线程** → `threading.local` 足够；
* 用 `asyncio`、线程池、`concurrent.futures` → 请迁移到 `contextvars`。

---

## 8\. 小结速记

1. `tls = threading.local(); tls.x = 1` 只在当前线程生效。
2. 底层是线程私有的 dict，绿色安全。
3. 适合请求上下文、数据库连接、日志追踪等「线程级」场景。
4. 协程 / 线程池环境请换 `contextvars`，避免踩坑。

---

## 9\. 一键运行 demo

把下面代码保存为 `tls_demo.py`，`python tls_demo.py` 即可验证：

```python
import threading, random, time

local = threading.local()

def job():
    local.val = random.randint(1, 100)
    time.sleep(0.1)
    assert local.val == threading.local().val, "Should never fail!"
    print(f'{threading.current_thread().name}  val={local.val}')

for _ in range(10):
    threading.Thread(target=job).start()

```

---

如果本文帮你理清了「线程局部存储」的概念，记得点个赞哦～  
更多 Python 并发技巧，欢迎关注专栏！

---

> 《[Python 线程局部存储：threading.local() 完全指南](https://www.xyzblog.publicvm.com/cf5c20085f4874f2cb4f8b83c2bf9d6161f9c96d143f405132dda158469f2af0)》 是转载文章，[点击查看原文](https://juejin.cn/post/7597664149170241578)。