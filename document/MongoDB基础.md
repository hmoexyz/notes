# MongoDB 基础操作

MongoDB 是一个 NoSQL 数据库，以文档形式存储数据。以下是 MongoDB 的基础操作：

## 一、数据库操作

### 1. 选择/创建数据库
```javascript
use database_name
// 如果数据库不存在，MongoDB 会在第一次插入数据时创建
```

### 2. 查看所有数据库
```javascript
show dbs
```

### 3. 删除当前数据库
```javascript
db.dropDatabase()
```

## 二、集合（表）操作

### 1. 创建集合
```javascript
db.createCollection("collection_name")
// 或直接插入文档自动创建
```

### 2. 查看集合
```javascript
show collections
// 或
show tables
```

### 3. 删除集合
```javascript
db.collection_name.drop()
```

## 三、文档（记录）操作

### 1. 插入文档
```javascript
// 插入单个文档
db.users.insertOne({
    name: "张三",
    age: 25,
    email: "zhangsan@example.com"
})

// 插入多个文档
db.users.insertMany([
    { name: "李四", age: 30 },
    { name: "王五", age: 28 }
])
```

### 2. 查询文档
```javascript
// 查询所有文档
db.users.find()

// 格式化显示
db.users.find().pretty()

// 条件查询
db.users.find({ age: 25 })
db.users.find({ age: { $gt: 25 } })  // 年龄大于25

// 查询单个文档
db.users.findOne({ name: "张三" })

// 查询指定字段
db.users.find({}, { name: 1, age: 1 })  // 只返回name和age字段

// 比较操作符
db.users.find({ age: { $lt: 30 } })      // 小于
db.users.find({ age: { $lte: 30 } })     // 小于等于
db.users.find({ age: { $ne: 25 } })      // 不等于

// 逻辑操作符
db.users.find({ $or: [{ age: 25 }, { age: 30 }] })
db.users.find({ age: { $in: [25, 30] } })  // 在数组中

// 限制和跳过
db.users.find().limit(5)     // 限制5条
db.users.find().skip(10)     // 跳过前10条
```

### 3. 更新文档
```javascript
// 更新单个文档
db.users.updateOne(
    { name: "张三" },
    { $set: { age: 26 } }
)

// 更新多个文档
db.users.updateMany(
    { age: { $lt: 30 } },
    { $set: { status: "young" } }
)

// 替换文档
db.users.replaceOne(
    { name: "张三" },
    { name: "张三", age: 27, city: "北京" }
)

// 自增操作
db.users.updateOne(
    { name: "张三" },
    { $inc: { age: 1 } }  // 年龄加1
)

// 添加字段
db.users.updateOne(
    { name: "张三" },
    { $set: { city: "北京" } }
)
```

### 4. 删除文档
```javascript
// 删除单个文档
db.users.deleteOne({ name: "张三" })

// 删除多个文档
db.users.deleteMany({ age: { $lt: 25 } })
```

## 四、索引操作

### 1. 创建索引
```javascript
// 创建单字段索引
db.users.createIndex({ name: 1 })  // 1升序，-1降序

// 创建复合索引
db.users.createIndex({ name: 1, age: -1 })

// 创建唯一索引
db.users.createIndex({ email: 1 }, { unique: true })
```

### 2. 查看索引
```javascript
db.users.getIndexes()
```

### 3. 删除索引
```javascript
db.users.dropIndex("index_name")
```

## 五、聚合操作

```javascript
// 分组统计
db.users.aggregate([
    { $group: { _id: "$city", count: { $sum: 1 } } }
])

// 匹配和分组
db.users.aggregate([
    { $match: { age: { $gt: 25 } } },
    { $group: { _id: "$city", avgAge: { $avg: "$age" } } }
])
```

## 六、常用操作符

### 比较操作符
- `$eq`：等于
- `$ne`：不等于
- `$gt`：大于
- `$gte`：大于等于
- `$lt`：小于
- `$lte`：小于等于
- `$in`：在数组中
- `$nin`：不在数组中

### 逻辑操作符
- `$and`：与
- `$or`：或
- `$not`：非
- `$nor`：或非

### 字段更新操作符
- `$set`：设置字段值
- `$unset`：删除字段
- `$inc`：自增
- `$push`：向数组添加元素
- `$pull`：从数组删除元素

## 七、实用技巧

1. **统计文档数量**
```javascript
db.users.countDocuments()
db.users.countDocuments({ age: { $gt: 25 } })
```

2. **去重查询**
```javascript
db.users.distinct("city")
```

3. **排序**
```javascript
db.users.find().sort({ age: 1 })      // 升序
db.users.find().sort({ age: -1 })     // 降序
```

4. **游标操作**
```javascript
const cursor = db.users.find()
while (cursor.hasNext()) {
    printjson(cursor.next())
}
```

这些是 MongoDB 最基础的操作，掌握这些就可以开始使用 MongoDB 进行基本的数据管理了。