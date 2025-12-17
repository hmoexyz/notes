# Python 的异步 I/O

> 转载自 [Python 的异步 I/O](https://xplanc.org/primers/document/zh/02.Python/12.%E5%BC%82%E6%AD%A5/01.%E5%BC%82%E6%AD%A5%E5%9F%BA%E7%A1%80.md)

异步 I/O（Asynchronous Input/Output） 是一种 不阻塞程序执行 的 I/O 操作方式。发起 I/O 操作后，不必等待操作完成，程序可以继续做其他事情；当操作完成时，通过回调、事件循环或协程机制通知程序处理结果。

## 协程

Python 的异步 I/O 基于协程实现。使用`async`关键字来创建一个异步函数，对异步函数的调用不会执行该函数，而是生成一个协程对象。  

对每一个协程对象，都必须等待其结束（即使是没有启动的协程），否则会产生一个 `RuntimeWarning` 类型的异常。

示例 :  
```python shift
# 创建一个异步函数
async def say_hello():
    print("hello world")

# 创建协程
coro = say_hello()
print("协程对象", coro)
```

要启动一个协程，有三种方式：

* 通过 `asyncio.run` 运行一个协程对象
* 使用 `await` 关键字，这种方法只能在另一个 `async` 函数中才能使用
* 通过 `asyncio.create_task`


> * `await` 必须在 `async` 函数中才能使用，因此无法启动协程的顶层入口点（此时只能使用 `asyncio.run` 函数）
> * `await` 让出当前协程，将控制权交给调度器；当前协程进入 **等待** 状态，直到目标完成后恢复就绪
>   * 如果 `await` 的目标是一个协程，则创建该协程的 `Task`，将其加入调度器并立即执行
>   * 如果 `await` 的目标不是一个协程（例如 `asyncio.create_task` 创建 的 `Task`），则由事件循环（`EventLoop`）从就绪队列中选择一个协程运行

> * `asyncio.create_task` 创建目标协程的 `Task` 并将其加入调度器
>   * 当前协程不会让出，从而可以连续启动多个协程，实现并发执行
>   * 返回的 `Task` 对象也可以在适当的时候使用 `await` 等待其结束。

## `await` 示例

```python
import asyncio
import time

async def say_hello():
    print("hello", time.strftime('%X'))
    await asyncio.sleep(1)
    print("hello", time.strftime('%X'))

async def say_world():
    print("world", time.strftime('%X'))
    await asyncio.sleep(1)
    print("world", time.strftime('%X'))

# 顶层入口点
async def main():
    await say_hello() # 启动say_hello()返回的协程，并等待其结束
    await say_world() # 要等到前一个await结束后，才会启动

# 启动顶层入口点
asyncio.run(main())
```

运行结果 :  
```
hello 15:27:26
hello 15:27:27
world 15:27:27
world 15:27:28
```

## `asyncio.create_task` 示例
```python
import asyncio
import time

async def say_hello():
    print("hello", time.strftime('%X'))
    await asyncio.sleep(1)
    print("hello", time.strftime('%X'))

async def say_world():
    print("world", time.strftime('%X'))
    await asyncio.sleep(1)
    print("world", time.strftime('%X'))

# 顶层入口点
async def main():
    task_say_hello = asyncio.create_task(say_hello()) # 启动协程不等待
    task_say_world = asyncio.create_task(say_world()) 

    await task_say_hello
    await task_say_world

# 启动顶层入口点
asyncio.run(main())
```

运行结果 :  
```
hello 15:29:41
world 15:29:41
hello 15:29:42
world 15:29:42
```

## 对比

通过上面两个示例打印的顺序和时间可以看出 `await` 和 `asyncio.create_task` 的区别：

* `await` 创建一个协程的 `Task` 时，前协程让出并进入等待状态，需要目标协程运行完毕，当前协程才能恢复就绪，因此运行流程是串行的
* `asyncio.create_task` 创建一个协程的 `Task` 时，当前协程不会让出（而是后续 `await` 时让出），因此运行流程是并发的。