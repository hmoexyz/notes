# Python 基础语法

## 1. 基本输出
```python
print("Hello, World!")  # 输出文本
print(42)               # 输出数字
print(3.14)             # 输出浮点数
```

## 2. 变量与数据类型
```python
# 变量定义（无需声明类型）
name = "Alice"          # 字符串
age = 25                # 整数
height = 1.68           # 浮点数
is_student = True       # 布尔值

# 查看数据类型
print(type(name))       # <class 'str'>
print(type(age))        # <class 'int'>
```

## 3. 基本数据类型
```python
# 字符串
text = "Python"
multiline = """多行
字符串"""

# 数字
integer = 10
float_num = 10.5
complex_num = 3 + 4j

# 布尔
is_true = True
is_false = False

# 空值
empty_value = None
```

## 4. 运算符
```python
# 算术运算符
a = 10 + 5    # 加
b = 10 - 5    # 减
c = 10 * 5    # 乘
d = 10 / 3    # 除（返回浮点）
e = 10 // 3   # 整除
f = 10 % 3    # 取余
g = 2 ** 3    # 幂运算

# 比较运算符
x == y        # 等于
x != y        # 不等于
x > y         # 大于
x < y         # 小于
x >= y        # 大于等于
x <= y        # 小于等于

# 逻辑运算符
a and b       # 与
a or b        # 或
not a         # 非
```

## 5. 数据结构
### 列表（List）
```python
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")      # 添加元素
fruits[0] = "pear"           # 修改元素
print(fruits[1])             # 访问元素
print(len(fruits))           # 获取长度
```

### 元组（Tuple）
```python
colors = ("red", "green", "blue")
print(colors[0])             # 访问元素（不可修改）
```

### 字典（Dictionary）
```python
person = {
    "name": "Alice",
    "age": 25,
    "city": "Beijing"
}
print(person["name"])        # 访问值
person["age"] = 26           # 修改值
person["job"] = "Engineer"   # 添加键值对
```

### 集合（Set）
```python
unique_numbers = {1, 2, 3, 3, 4}  # {1, 2, 3, 4}
unique_numbers.add(5)        # 添加元素
unique_numbers.remove(2)     # 删除元素
```

## 6. 控制流
### 条件语句
```python
age = 18

if age < 13:
    print("儿童")
elif age < 18:
    print("青少年")
else:
    print("成人")
```

### 循环语句
```python
# for 循环
for i in range(5):          # 0,1,2,3,4
    print(i)

fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# while 循环
count = 0
while count < 5:
    print(count)
    count += 1
```

## 7. 函数定义
```python
# 定义函数
def greet(name):
    """这是一个问候函数"""
    return f"Hello, {name}!"

# 调用函数
message = greet("Alice")
print(message)

# 带默认参数的函数
def add_numbers(a, b=10):
    return a + b

result = add_numbers(5)      # 15
```

## 8. 输入输出
```python
# 输入
name = input("请输入你的名字: ")
age = int(input("请输入你的年龄: "))  # 转换为整数

# 格式化输出
name = "Alice"
age = 25
print(f"{name} is {age} years old.")          # f-string（推荐）
print("{} is {} years old.".format(name, age)) # format方法
```

## 9. 异常处理
```python
try:
    num = int(input("请输入一个数字: "))
    result = 10 / num
except ValueError:
    print("输入的不是有效数字!")
except ZeroDivisionError:
    print("不能除以零!")
else:
    print(f"结果是: {result}")
finally:
    print("程序执行完毕")
```

## 10. 文件操作
```python
# 写入文件
with open("example.txt", "w") as file:
    file.write("Hello, Python!\n")
    file.write("第二行内容")

# 读取文件
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# 逐行读取
with open("example.txt", "r") as file:
    for line in file:
        print(line.strip())
```

## 11. 模块导入
```python
# 导入整个模块
import math
print(math.sqrt(16))

# 导入特定函数
from datetime import datetime
current_time = datetime.now()

# 给模块起别名
import numpy as np
```

## 12. 列表推导式
```python
# 生成平方列表
squares = [x**2 for x in range(10)]

# 带条件的推导式
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# 字典推导式
square_dict = {x: x**2 for x in range(5)}
```

> 参考 [Python 教程 - Primers 编程伙伴](https://xplanc.org/primers/document/zh/02.Python)