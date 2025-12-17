# Python 的 format 函数

[Python 内建函数列表](https://xplanc.org/primers/document/zh/02.Python/99.API%20%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/00.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0.md) \> [Python 的内置函数 format](https://xplanc.org/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.format.md)

Python 的内置函数 [`format()`](https://xplanc.org/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.format.md) 是一个功能强大的字符串格式化工具，它提供了灵活且可读性强的格式化方式。该函数主要通过两种形式使用：

1. **作为字符串对象的方法**：  
```python  
"格式化字符串".format(参数)  
```  
这是最常见的用法，在字符串内部使用 `{}` 作为占位符，然后通过 [`format()`](https://xplanc.org/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.format.md) 方法传入参数进行替换。
2. **作为独立的内置函数**：  
```python  
format(value, format_spec)  
```  
这种形式主要用于对单个值进行特定格式的转换，常用于数字格式化等场景。

[`format()`](https://xplanc.org/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.format.md) 提供了丰富的格式化功能，包括：

* **[位置参数](https://xplanc.org/shift/?lang=python&code=cHJpbnQoJTIyJTdCJTdEJTIwJTdCJTdEJTIyLmZvcm1hdCglMjJIZWxsbyUyMiUyQyUyMCUyMldvcmxkJTIyKSklMjAlMjAlMjMlMjAlRTglQkUlOTMlRTUlODclQkElRUYlQkMlOUElMjJIZWxsbyUyMFdvcmxkJTIy)**：  
```python  
"{} {}".format("Hello", "World")  # 输出："Hello World"  
```
* **[关键字参数](https://xplanc.org/shift/?lang=python&code=cHJpbnQoJTIyJTdCbmFtZSU3RCVFNCVCQiU4QSVFNSVCOSVCNCU3QmFnZSU3RCVFNSVCMiU4MSUyMi5mb3JtYXQobmFtZSUzRCUyMiVFNSVCMCU4RiVFNiU5OCU4RSUyMiUyQyUyMGFnZSUzRDEyKSk%3D)**：  
```python  
"{name}今年{age}岁".format(name="小明", age=12)  
```
* **[下标访问](https://xplanc.org/shift/?lang=python&code=cHJpbnQoJTIyJTdCMCU1QjAlNUQlN0QlMjAlN0IwJTVCMSU1RCU3RCUyMi5mb3JtYXQoJTVCJTIyUHl0aG9uJTIyJTJDJTIwJTIySmF2YSUyMiU1RCkp)**：  
```python  
"{0[0]} {0[1]}".format(["Python", "Java"])  # 输出："Python Java"  
```
* **数字格式化**：  
   * [保留小数位数](https://xplanc.org/shift/?lang=python&code=cHJpbnQoJTIyJTdCJTNBLjJmJTdEJTIyLmZvcm1hdCgzLjE0MTU5MjYpKQ%3D%3D)：  
   ```python  
   "{:.2f}".format(3.1415926)  # 输出："3.14"  
   ```  
   * [千位分隔](https://xplanc.org/shift/?lang=python&code=cHJpbnQoJTIyJTdCJTNBJTJDJTdEJTIyLmZvcm1hdCgxMDAwMDAwKSk%3D)：  
   ```python  
   "{:,}".format(1000000)  # 输出："1,000,000"  
   ```  
   * [百分比显示](https://xplanc.org/shift/?lang=python&code=cHJpbnQoJTIyJTdCJTNBLjIlMjUlN0QlMjIuZm9ybWF0KDAuMjUpKQ%3D%3D)：  
   ```python  
   "{:.2%}".format(0.25)  # 输出："25.00%"  
   ```
* **[对齐与填充](https://xplanc.org/shift/?lang=python&code=cHJpbnQoJTIyJTdCJTNBKiU1RTIwJTdEJTIyLmZvcm1hdCglMjJQeXRob24lMjIpKSUwQXByaW50KCUyMiU3QiUzQSUzQzIwJTdEJTIyLmZvcm1hdCglMjJQeXRob24lMjIpKQ%3D%3D)**：  
```python  
"{:*^20}".format("Python")  # 居中，用*填充："*******Python*******"  
"{:<20}".format("Python")   # 左对齐："Python              "  
```
* **[进制转换](https://xplanc.org/shift/?lang=python&code=cHJpbnQoJTIyJTdCJTNBYiU3RCUyMi5mb3JtYXQoMTApKSUwQXByaW50KCUyMiU3QiUzQXglN0QlMjIuZm9ybWF0KDI1NSkp)**：  
```python  
"{:b}".format(10)  # 二进制："1010"  
"{:x}".format(255) # 十六进制："ff"  
```
* **[对象属性访问](https://xplanc.org/shift/?lang=python&code=Y2xhc3MlMjBQZXJzb24lM0ElMEElMjAlMjAlMjAlMjBkZWYlMjBfX2luaXRfXyhzZWxmJTJDJTIwbmFtZSUyQyUyMGFnZSklM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBzZWxmLm5hbWUlMjAlM0QlMjBuYW1lJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwc2VsZi5hZ2UlMjAlM0QlMjBhZ2UlMEFwJTIwJTNEJTIwUGVyc29uKCUyMiVFNSVCQyVBMCVFNCVCOCU4OSUyMiUyQyUyMDMwKSUwQSUwQXByaW50KCUyMiU3QnAubmFtZSU3RCVFNCVCQiU4QSVFNSVCOSVCNCU3QnAuYWdlJTdEJUU1JUIyJTgxJTIyLmZvcm1hdChwJTNEcCkpJTIwJTIwJTIzJTIwJUU4JUJFJTkzJUU1JTg3JUJBJUVGJUJDJTlBJTIyJUU1JUJDJUEwJUU0JUI4JTg5JUU0JUJCJThBJUU1JUI5JUI0MzAlRTUlQjIlODElMjI%3D)**：  
```python  
class Person:  
    def __init__(self, name, age):  
        self.name = name  
        self.age = age  
p = Person("张三", 30)  
"{p.name}今年{p.age}岁".format(p=p)  # 输出："张三今年30岁"  
```

相比于旧的 `%` 格式化方式，[`format()`](https://xplanc.org/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.format.md) 方法具有以下优势：

1. 语法更直观，可读性更强
2. 支持更复杂的格式化需求
3. 可以灵活处理不同类型的数据
4. 支持自定义格式化方式（通过 `__format__` 方法）

在实际应用中，[`format()`](https://xplanc.org/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.format.md) 方法常用于：

* 生成报告时的数据格式化
* 日志信息的格式化输出
* 用户界面的文本显示
* 数据导出时的格式转换

Python 3.6 之后新增的 f-string（格式化字符串字面量）实际上是 [`str.format()`](https://xplanc.org/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.str.md) 方法的语法糖，但提供了更简洁直观的表达方式。它在字符串前缀加上 `f` 或 `F` 标志，允许直接在字符串中嵌入表达式，用大括号 `{}` 包裹。

与 [`format()`](https://xplanc.org/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.format.md) 方法相比，f-string 有以下特点：

1. 直接在字符串内写变量名或表达式，无需像 [`format()`](https://xplanc.org/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.format.md) 那样先定义再引用
2. 执行效率更高，因为 f-string 在编译时就被转换为字节码
3. 支持完整 Python 表达式，包括函数调用、算术运算等

[示例对比](https://xplanc.org/shift/index.html?lang=python&code=JTIzJTIwJUU0JUJEJUJGJUU3JTk0JUE4JTIwZm9ybWF0KCklMjAlRTYlOTYlQjklRTYlQjMlOTUlMEFuYW1lJTIwJTNEJTIwJTIyQWxpY2UlMjIlMEFhZ2UlMjAlM0QlMjAyNSUwQW1zZyUyMCUzRCUyMCUyMk15JTIwbmFtZSUyMGlzJTIwJTdCJTdEJTIwYW5kJTIwSSdtJTIwJTdCJTdEJTIweWVhcnMlMjBvbGQlMjIuZm9ybWF0KG5hbWUlMkMlMjBhZ2UpJTBBJTBBJTIzJTIwJUU0JUJEJUJGJUU3JTk0JUE4JTIwZi1zdHJpbmclMEFtc2clMjAlM0QlMjBmJTIyTXklMjBuYW1lJTIwaXMlMjAlN0JuYW1lJTdEJTIwYW5kJTIwSSdtJTIwJTdCYWdlJTdEJTIweWVhcnMlMjBvbGQlMjI%3D)：

```python
# 使用 format() 方法
name = "Alice"
age = 25
msg = "My name is {} and I'm {} years old".format(name, age)

# 使用 f-string
msg = f"My name is {name} and I'm {age} years old"

```

f-string 还支持[格式化规范](https://xplanc.org/shift/index.html?lang=python&code=cHJpY2UlMjAlM0QlMjAxOS45OSUwQXByaW50KGYlMjJQcmljZSUzQSUyMCU3QnByaWNlJTNBLjJmJTdEJTIyKSUyMCUyMCUyMyUyMCVFOCVCRSU5MyVFNSU4NyVCQSUzQSUyMFByaWNlJTNBJTIwMTkuOTklMEElMEFmcm9tJTIwZGF0ZXRpbWUlMjBpbXBvcnQlMjBkYXRldGltZSUwQXByaW50KGYlMjJDdXJyZW50JTIwdGltZSUzQSUyMCU3QmRhdGV0aW1lLm5vdygpJTNBJTI1WS0lMjVtLSUyNWQlMjAlMjVIJTNBJTI1TSU3RCUyMiklMjAlMjAlMjMlMjAlRTglQkUlOTMlRTUlODclQkElRTUlQkQlOTMlRTUlODklOEQlRTYlOTclQjYlRTklOTclQjQ%3D)，如：

```python
price = 19.99
print(f"Price: {price:.2f}")  # 输出: Price: 19.99

from datetime import datetime
print(f"Current time: {datetime.now():%Y-%m-%d %H:%M}")  # 输出当前时间

```

常见应用场景包括：

* 构建动态 SQL 查询语句
* 生成日志信息
* 创建报告模板
* 调试时快速查看变量值

需要特别注意的是，Python 中的 f-string 是在运行时进行动态求值的表达式。这意味着字符串中的表达式会在程序执行时才会被计算和解析，而不是在编译阶段。这一特性带来了重要的安全考量：

1. 安全风险具体表现：  
   * 如果直接将未经处理的用户输入放入 f-string 表达式，恶意用户可能会注入可执行的Python代码  
   * 例如：`f"Result: {user_input}"`，如果user\_input是"**import**(‘os’).system(‘rm -rf /’)"，将导致严重后果
2. 典型应用场景中的风险：  
   * 用户输入作为变量名：`f"{user_defined_var}"`  
   * 数据库查询参数：`f"SELECT * FROM {table_name}"`  
   * 文件路径拼接：`f"/path/{filename}"`
3. 防御措施：  
   * 对用户输入进行严格验证和过滤  
   * 使用参数化查询代替字符串拼接  
   * 需要处理动态内容时，考虑使用str.format()或%格式化  
   * 限制f-string只处理可信的、程序内部生成的变量
4. 安全使用示例：  
```python  
# 不安全的方式  
user_input = input("Enter value: ")  
print(f"User entered: {user_input}")  # 潜在危险  
# 相对安全的方式  
safe_input = html.escape(user_input)  # 先进行转义处理  
print(f"User entered: {safe_input}")  
```

这种运行时求值的特性虽然提供了强大的表达能力，但也要求开发者必须格外注意安全防护措施。

---

> 《[Python 的内置函数 format](https://xplanc.online/6c81ea14b9b805572dabef69290bf7a6fb013dc40be0a2f52999d04db7e56d85)》 是转载文章，[点击查看原文](https://blog.csdn.net/IMPYLH/article/details/148728273)。