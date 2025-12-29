# Python 排序算法

## 基本排序算法

### 冒泡排序 (Bubble Sort)
冒泡排序是最简单的排序算法之一，它重复地遍历要排序的列表，比较相邻的元素并交换它们的位置。

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # 每次遍历后，最大的元素会"冒泡"到最后
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
```

时间复杂度：O(n²) 最坏和平均情况，O(n) 最好情况（当列表已经有序时）

### 选择排序 (Selection Sort)
选择排序每次找到最小元素，并将其放在已排序部分的末尾。

```python
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
```

时间复杂度：O(n²) 所有情况

### 插入排序 (Insertion Sort)
插入排序构建最终排序列表，每次将一个元素插入到已排序列表中的适当位置。

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j >= 0 and key < arr[j]:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key
    return arr
```

时间复杂度：O(n²) 最坏和平均情况，O(n) 最好情况

## 高级排序算法

### 快速排序 (Quick Sort)
快速排序使用分治法策略，选择一个"基准"元素，将列表分为两部分，然后递归排序。

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
```

时间复杂度：O(n log n) 平均情况，O(n²) 最坏情况（当列表已经有序或逆序时）

### 归并排序 (Merge Sort)
归并排序也是一种分治算法，将列表分成两半，分别排序，然后合并结果。

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

时间复杂度：O(n log n) 所有情况

### 堆排序 (Heap Sort)
堆排序利用堆数据结构进行排序，首先构建最大堆，然后逐个提取最大元素。

```python
def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    
    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    
    # 构建最大堆
    for i in range(n//2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # 逐个提取元素
    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    
    return arr
```

时间复杂度：O(n log n) 所有情况

## Python 内置排序

Python 提供了内置的 [`sorted()`](https://xplanc.org/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.sorted.md) 函数和列表的 `sort()` 方法：

```python
# 使用 sorted() 函数
numbers = [5, 2, 9, 1, 5, 6]
sorted_numbers = sorted(numbers)  # 返回新列表

# 使用 list.sort() 方法
numbers.sort()  # 原地排序
```

Python 的 Timsort 算法（归并排序和插入排序的混合）：
- 时间复杂度：O(n log n) 最坏情况
- 空间复杂度：O(n)
- 稳定排序（相等元素的相对位置不变）

## 算法选择建议

1. **小数据集**：插入排序通常表现良好
2. **大数据集**：快速排序、归并排序或堆排序
3. **需要稳定排序**：归并排序或 Timsort
4. **内存受限**：堆排序（原地排序）
5. **几乎有序的数据**：插入排序或冒泡排序

## 性能比较示例

```python
import timeit
import random

# 生成随机列表
test_list = random.sample(range(10000), 1000)

# 测试各种排序算法
print("冒泡排序:", timeit.timeit(lambda: bubble_sort(test_list.copy()), number=1))
print("选择排序:", timeit.timeit(lambda: selection_sort(test_list.copy()), number=1))
print("插入排序:", timeit.timeit(lambda: insertion_sort(test_list.copy()), number=1))
print("快速排序:", timeit.timeit(lambda: quick_sort(test_list.copy()), number=1))
print("归并排序:", timeit.timeit(lambda: merge_sort(test_list.copy()), number=1))
print("堆排序:", timeit.timeit(lambda: heap_sort(test_list.copy()), number=1))
print("内置排序:", timeit.timeit(lambda: sorted(test_list.copy()), number=1))
```

典型结果（1000个元素）：
- 冒泡排序：约 0.2 秒
- 选择排序：约 0.1 秒
- 插入排序：约 0.05 秒
- 快速排序：约 0.002 秒
- 归并排序：约 0.003 秒
- 堆排序：约 0.004 秒
- 内置排序：约 0.0002 秒
