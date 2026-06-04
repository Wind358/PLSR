---
languageId: python
languageName: Python
group: General
accent: #4b8bbe
description: 强调可读性、脚本效率和生态广度的通用语言
topicId: basics
topicTitle: Python基础语法
summary: 适用版本：Python 3.8+ | 用途：编程时快速查询核心语法 | 特点：极简、实用、无冗余
order: 10
---

# Python语法速查手册

---

## 一、基础语法规则

### 1.1 代码结构与缩进

- Python **强制使用缩进**（推荐 4 个空格）划分代码块，替代其他语言的`{}`
- 同一代码块缩进必须完全一致
- 行尾冒号`:`表示下一行开始缩进块

```python
if True:
    print("正确缩进")  # 4个空格
    for i in range(3):
        print(i)  # 再缩进4个空格
```

### 1.2 注释

```python
# 单行注释

"""
多行注释（文档字符串）
用于函数、类、模块的说明
"""
```

### 1.3 标识符与关键字

- 命名规则：字母、数字、下划线组成，不能以数字开头，区分大小写
- 不能使用 Python 关键字（`if、for、class、def、return`等）
- 推荐命名风格：
  - 变量 / 函数：`snake_case`（小写 + 下划线）
  - 类名：`PascalCase`（大驼峰）
  - 常量：`UPPER_SNAKE_CASE`

### 1.4 变量与赋值

- 动态类型：无需声明类型，直接赋值
- 多变量赋值：

```python
a = 10
name = "Python"
x, y, z = 1, 2, 3  # 同时赋值
a = b = 0  # 链式赋值
```

## 二、核心数据结构

### 2.1 基本数据类型

|    类型    |        说明        |              示例              |
| :--------: | :----------------: | :----------------------------: |
|   `int`    | 整数（无大小限制） |    `100, -5, 0b1010, 0xFF`     |
|  `float`   |       浮点数       |     `3.14, 1.5e3, -0.001`      |
|   `bool`   |       布尔值       |         `True, False`          |
|   `str`    |       字符串       | `"hello", 'world', """多行"""` |
| `NoneType` |        空值        |             `None`             |

### 2.2 字符串（str）

- 常用操作：

```python
s = "Hello Python"
len(s)  # 长度：12
s[0]  # 索引：'H'
s[-1]  # 反向索引：'n'
s[0:5]  # 切片：'Hello'（左闭右开）
s.upper()  # 转大写
s.lower()  # 转小写
s.replace("Python", "World")  # 替换
s.split(" ")  # 分割：['Hello', 'Python']
" ".join(["a", "b", "c"])  # 拼接：'a b c'
f"Name: {name}, Age: {age}"  # f-string格式化（推荐）
```

### 2.3 列表（list）

- 有序、可变、可重复的序列

```python
# 定义
lst = [1, 2, "abc", True, [3, 4]]

# 常用操作
len(lst)  # 长度
lst[0]  # 索引
lst[1:3]  # 切片
lst.append(5)  # 末尾添加元素
lst.insert(1, 100)  # 指定位置插入
lst.pop()  # 删除并返回末尾元素
lst.remove(2)  # 删除第一个匹配元素
lst.sort()  # 排序（原地修改）
lst.reverse()  # 反转（原地修改）
1 in lst  # 判断元素是否存在
```

### 2.4 元组（tuple）

- 有序、不可变、可重复的序列（一旦创建不能修改）

```python
t = (1, 2, 3)
t = (1,)  # 单个元素的元组必须加逗号
t[0]  # 索引
t[1:3]  # 切片
# 不支持 append、insert、remove 等修改操作
```

### 2.5 字典（dict）

- 无序（Python 3.7 + 有序）、键值对、键唯一且不可变

```python
# 定义
d = {"name": "Alice", "age": 20, "gender": "female"}

# 常用操作
d["name"]  # 取值
d.get("age")  # 安全取值（不存在返回None）
d["height"] = 165  # 添加/修改键值对
del d["gender"]  # 删除键值对
d.keys()  # 获取所有键
d.values()  # 获取所有值
d.items()  # 获取所有键值对
"name" in d  # 判断键是否存在
```

### 2.6 集合（set）

- 无序、不可重复、元素不可变

```python
# 定义
s = {1, 2, 3, 3}  # 自动去重：{1, 2, 3}
s = set()  # 空集合（不能用{}，{}是空字典）

# 常用操作
s.add(4)  # 添加元素
s.remove(2)  # 删除元素（不存在报错）
s.discard(5)  # 删除元素（不存在不报错）
s1 & s2  # 交集
s1 | s2  # 并集
s1 - s2  # 差集
```

## 三、流程控制（逻辑结构）

### 3.1 条件判断

```python
# 基本结构
if 条件1:
    语句块1
elif 条件2:
    语句块2
else:
    语句块3

# 多条件
if age >= 18 and score > 60:
    print("通过")

# 三元表达式
result = "及格" if score >= 60 else "不及格"
```

### 3.2 循环

#### for 循环（遍历可迭代对象）

```python
# 遍历列表
for item in [1, 2, 3]:
    print(item)

# 遍历数字范围
for i in range(5):  # 0-4
    print(i)
for i in range(1, 6):  # 1-5
    print(i)
for i in range(0, 10, 2):  # 0,2,4,6,8
    print(i)

# 遍历字典
for key, value in d.items():
    print(key, value)

# 带索引遍历
for index, item in enumerate(lst):
    print(index, item)
```

#### while 循环

```python
i = 0
while i < 5:
    print(i)
    i += 1
```

### 3.3 循环控制

- `break`：立即终止整个循环
- `continue`：跳过当前循环，进入下一次迭代
- `else`：循环正常结束（未被 break 中断）时执行

```python
for i in range(5):
    if i == 3:
        break
    print(i)
else:
    print("循环正常结束")  # 这里不会执行
```

## 四、函数

### 4.1 函数定义与调用

```python
# 基本定义
def 函数名(参数1, 参数2):
    """函数文档字符串"""
    函数体
    return 返回值

# 调用
result = 函数名(值1, 值2)
```

### 4.2 参数类型

```python
# 1. 位置参数（必须按顺序传递）
def add(a, b):
    return a + b

# 2. 关键字参数（按名称传递，顺序无关）
add(b=3, a=2)

# 3. 默认参数（必须放在最后）
def power(x, n=2):
    return x ** n

# 4. 可变位置参数（接收多个参数，打包成元组）
def sum(*args):
    total = 0
    for num in args:
        total += num
    return total

# 5. 可变关键字参数（接收多个关键字参数，打包成字典）
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")
```

### 4.3 匿名函数（lambda）

```python
# 语法：lambda 参数: 表达式
add = lambda a, b: a + b
print(add(1, 2))  # 3

# 常用场景：作为排序、过滤的参数
lst = [(1, 3), (4, 1), (2, 2)]
lst.sort(key=lambda x: x[1])  # 按第二个元素排序
```

## 五、模块与包

```python
# 导入整个模块
import math
print(math.pi)

# 导入模块中的指定函数/变量
from math import sqrt, pi
print(sqrt(4))

# 导入并别名
import numpy as np
from pandas import DataFrame as DF

# 导入模块中所有内容（不推荐）
from math import *
```

## 六、异常处理

```python
try:
    # 可能出错的代码
    result = 10 / 0
except ZeroDivisionError:
    # 捕获特定异常
    print("除数不能为零")
except Exception as e:
    # 捕获所有异常
    print(f"发生错误: {e}")
else:
    # 没有异常时执行
    print("执行成功")
finally:
    # 无论是否有异常都执行
    print("执行完毕")

# 主动抛出异常
raise ValueError("参数错误")
```

## 七、常用内置函数

|            函数            |        说明        |
| :------------------------: | :----------------: |
|          `len(x)`          |      返回长度      |
|         `type(x)`          |      返回类型      |
|          `int(x)`          |     转换为整数     |
|          `str(x)`          |    转换为字符串    |
|         `list(x)`          |     转换为列表     |
|         `dict(x)`          |     转换为字典     |
|          `max(x)`          |     返回最大值     |
|          `min(x)`          |     返回最小值     |
|          `sum(x)`          |      返回总和      |
|        `sorted(x)`         | 返回排序后的新列表 |
| `range(start, stop, step)` |    生成数字序列    |
|       `enumerate(x)`       |  生成带索引的序列  |
|        `zip(x, y)`         |    打包多个序列    |
|       `map(func, x)`       | 对每个元素应用函数 |
|     `filter(func, x)`      |      过滤元素      |