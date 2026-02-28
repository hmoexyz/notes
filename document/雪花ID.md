# 雪花ID (Snowflake ID)

## 概述
雪花ID是一种分布式系统唯一ID生成算法，由Twitter公司开发并开源。它能够在分布式环境下生成全局唯一的64位长整型ID，适用于高并发场景下的ID生成需求。生成的ID具有以下特点：

- **64位整数**：兼容各种数据库和系统
- **时间有序**：按时间递增排序
- **分布式唯一**：支持多节点同时生成不重复ID

## 结构组成
雪花ID的64位结构被划分为以下部分：
- **1位符号位**：始终为0，保证ID为正数
- **41位时间戳**：记录ID生成时间（毫秒级），可使用约69年
- **10位工作机器ID**：
  - 5位数据中心ID (datacenterId)
  - 5位机器ID (workerId)
- **12位序列号**：同一毫秒内的计数器，支持每毫秒生成4096个ID

## 特点
1. **全局唯一性**：通过时间戳+机器ID+序列号的组合保证
2. **有序递增**：时间戳在前，ID随时间递增
3. **高性能**：本地生成，无需网络请求
4. **可反解**：可以从ID中提取生成时间、机器信息等

## 实现示例
```python
import time

class Snowflake:
    def __init__(self, worker_id, epoch=1609459200):  # 2021-01-01作为基准时间
        self.worker_id = worker_id
        self.sequence = 0
        self.last_timestamp = -1
        self.epoch = epoch

    def generate(self):
        timestamp = int(time.time() * 1000) - self.epoch
        
        if timestamp == self.last_timestamp:
            self.sequence = (self.sequence + 1) & 4095
            if self.sequence == 0:
                timestamp = self._wait_next_millis()
        else:
            self.sequence = 0
            
        self.last_timestamp = timestamp
        
        return (timestamp << 22) | (self.worker_id << 12) | self.sequence
    
    def _wait_next_millis(self):
        timestamp = int(time.time() * 1000) - self.epoch
        while timestamp <= self.last_timestamp:
            timestamp = int(time.time() * 1000) - self.epoch
        return timestamp

```

## 应用场景
1. 分布式系统主键生成
2. 订单编号、交易流水号
3. 消息队列消息ID
4. 分布式锁唯一标识

## 注意事项
1. **时钟回拨问题**：服务器时间回拨会导致ID重复，需实现异常处理
2. **机器ID分配**：需要确保不同机器的workerId不重复
3. **41位时间戳限制**：算法约69年后会溢出，需提前规划
