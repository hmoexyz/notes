# Python二叉树详解

## 二叉树基本概念

二叉树是每个节点最多有两个子节点的树结构，通常称为左子节点和右子节点。二叉树在计算机科学中有广泛应用，如表达式树、二叉搜索树、堆等数据结构。

## Python实现二叉树

### 节点类定义

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val      # 节点存储的值
        self.left = left    # 左子节点
        self.right = right  # 右子节点
```

### 创建简单二叉树

```python
# 创建一个简单的二叉树
#       1
#      / \
#     2   3
#    / \
#   4   5

root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)
```

## 二叉树遍历方法

### 1. 深度优先遍历(DFS)

#### 前序遍历(根-左-右)
```python
def preorder_traversal(root):
    if root:
        print(root.val, end=" ")  # 访问根节点
        preorder_traversal(root.left)
        preorder_traversal(root.right)
```

#### 中序遍历(左-根-右)
```python
def inorder_traversal(root):
    if root:
        inorder_traversal(root.left)
        print(root.val, end=" ")  # 访问根节点
        inorder_traversal(root.right)
```

#### 后序遍历(左-右-根)
```python
def postorder_traversal(root):
    if root:
        postorder_traversal(root.left)
        postorder_traversal(root.right)
        print(root.val, end=" ")  # 访问根节点
```

### 2. 广度优先遍历(BFS)/层次遍历
```python
from collections import deque

def level_order_traversal(root):
    if not root:
        return
    
    queue = deque([root])
    while queue:
        node = queue.popleft()
        print(node.val, end=" ")
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
```

## 二叉树常见操作

### 计算树的高度
```python
def tree_height(root):
    if not root:
        return 0
    return 1 + max(tree_height(root.left), tree_height(root.right))
```

### 查找节点
```python
def find_node(root, target):
    if not root:
        return False
    if root.val == target:
        return True
    return find_node(root.left, target) or find_node(root.right, target)
```

### 统计节点数量
```python
def count_nodes(root):
    if not root:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)
```

## 特殊二叉树类型

### 1. 二叉搜索树(BST)
- 左子树所有节点值小于根节点值
- 右子树所有节点值大于根节点值
- 左右子树也都是二叉搜索树

```python
def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    if not root:
        return True
    if root.val <= min_val or root.val >= max_val:
        return False
    return (is_valid_bst(root.left, min_val, root.val) and 
            is_valid_bst(root.right, root.val, max_val))
```

### 2. 平衡二叉树(AVL树)
- 任意节点的左右子树高度差不超过1

```python
def is_balanced(root):
    def check_height(node):
        if not node:
            return 0
        left = check_height(node.left)
        right = check_height(node.right)
        if left == -1 or right == -1 or abs(left - right) > 1:
            return -1
        return 1 + max(left, right)
    
    return check_height(root) != -1
```

## 实际应用场景

1. **文件系统结构**：目录和子目录的关系
2. **数据库索引**：B树和B+树是二叉树的扩展
3. **压缩算法**：哈夫曼编码树
4. **游戏AI**：决策树的构建
5. **网络路由**：路由表的高效查找
