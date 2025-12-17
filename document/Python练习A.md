# Python 练习

## 求平均年龄

> 题目来源：https://www.dotcpp.com/oj/problem2794.html

### 题目描述

班上有学生若干名，给出每名学生的年龄（整数），求班上所有学生的平均年龄，保留到小数点后两位。

### 输入格式

第一行有一个整数n（1<= n <= 100），表示学生的人数。第二行共有n个整数，表示每个学生的年龄，取值为15到25，空格分开。

### 输出格式

输出一行，该行包含一个浮点数，为要求的平均年龄，保留到小数点后两位。

### 样例输入

```
2
18 17
```

### 样例输出

```
17.50
```

### 解答

#### 说明：

这道题的重点是 **保留两位小数**，可以通过 [格式化字符串](https://xplanc.org/primers/document/zh/02.Python/03.%E5%AE%B9%E5%99%A8%E7%B1%BB%E5%9E%8B/10.%E5%AD%97%E7%AC%A6%E4%B8%B2.md#edc5b0) 实现。

一些基本的格式：

| 格式 				| 说明					|
| :-				| :-					|
| `<5`				| 左对齐，宽度为 5		|
| `>5`				| 右对齐，宽度为 5		|
| `.02f`			| 保留两位小数，且补零	|

#### 代码：

```python
while True:
	try:
		n = int(input())
		ages = map(int,input().strip().split())
		average = sum(ages)/n
		print(f'{average:.02f}')
	except:
		break
```

## 财务管理

> 题目来源：https://www.dotcpp.com/oj/problem2795.html

### 题目描述
Larry今年毕业并找到了一份工作。他赚很多钱，但似乎总是不够。Larry认为他需要控制他的投资以解决自己的财务问题。Larry拿到了自己的银行账户详单，想看看自己有多少钱。请帮助Larry写一个程序，通过过去12个月中每月的月末结余，计算平均结余。

### 输入格式
输入包含12行，每行包含一个数，为某个月的结余。每个数都是不大于1,000,000的正数，保留两位小数，省略"$"符。

### 输出格式
输出一个数，为这12个月的平均月末结余，保留到小数点后第二位，并在最前面加一个"$"符。

### 样例输入

```
100.00
489.12
12454.12
1234.10
823.05
109.20
5.27
1542.25
839.18
83.99
1295.01
1.75
```

### 样例输出

```
$1581.42
```

### 解答

#### 说明：

和上一题意义，这道题的重点也是 **保留两位小数**，并且在数值前添加 `$`。同样可以通过 [格式化字符串](https://xplanc.org/primers/document/zh/02.Python/03.%E5%AE%B9%E5%99%A8%E7%B1%BB%E5%9E%8B/10.%E5%AD%97%E7%AC%A6%E4%B8%B2.md#edc5b0) 实现。

#### 代码：

```python
while True:
	try:
		funds = [float(input()) for _ in range(12)]
		print(f'${sum(funds)/12:.2f}')
	except:
		break
```

## 参考


- [Python 内建函数 format - Primers 编程伙伴](https://xplanc.org/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.format.md)