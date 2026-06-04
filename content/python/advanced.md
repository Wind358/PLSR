---
languageId: python
languageName: Python
group: General
accent: #4b8bbe
description: 强调可读性、脚本效率和生态广度的通用语言
topicId: advanced
topicTitle: Python进阶语法
summary: 适用版本：Python 3.8+ | 用途：编程时快速查询核心语法 | 特点：极简、实用、无冗余
order: 20
---

# Python语法速查手册

---

## 八、推导式（Python 语法糖，高频使用）

### 8.1 列表推导式

- 替代简单的 for 循环 + append，更简洁高效

```python
# 基本语法：[表达式 for 变量 in 可迭代对象]
# 普通写法
squares = []
for i in range(1, 6):
    squares.append(i ** 2)

# 列表推导式写法
squares = [i ** 2 for i in range(1, 6)]  # [1, 4, 9, 16, 25]

# 带条件过滤
even_squares = [i ** 2 for i in range(1, 6) if i % 2 == 0]  # [4, 16]

# 嵌套循环
matrix = [[1, 2], [3, 4], [5, 6]]
flatten = [num for row in matrix for num in row]  # [1, 2, 3, 4, 5, 6]
```

### 8.2 字典推导式

```python
# 基本语法：{键表达式: 值表达式 for 变量 in 可迭代对象}
# 普通写法
square_dict = {}
for i in range(1, 6):
    square_dict[i] = i ** 2

# 字典推导式写法
square_dict = {i: i ** 2 for i in range(1, 6)}  # {1:1, 2:4, 3:9, 4:16, 5:25}

# 带条件过滤
even_square_dict = {i: i ** 2 for i in range(1, 6) if i % 2 == 0}  # {2:4, 4:16}

# 字典键值反转
original = {"a": 1, "b": 2, "c": 3}
reversed_dict = {v: k for k, v in original.items()}  # {1:"a", 2:"b", 3:"c"}
```

### 8.3 集合推导式

```python
# 基本语法：{表达式 for 变量 in 可迭代对象}
nums = [1, 2, 2, 3, 3, 3]
unique_squares = {i ** 2 for i in nums}  # {1, 4, 9}
```

------

## 九、上下文管理器（with 语句）

- 自动管理资源，确保资源在使用后正确释放（如文件、数据库连接）
- 替代手动`try-finally`关闭资源的写法，更安全简洁

### 9.1 基本语法

```python
with 资源对象 as 变量名:
    # 使用资源的代码
# 离开with块时，资源自动关闭
```

### 9.2 最常用场景：文件操作

```python
# 普通写法（容易忘记关闭文件）
f = open("test.txt", "r", encoding="utf-8")
try:
    content = f.read()
finally:
    f.close()

# with语句写法（自动关闭文件）
with open("test.txt", "r", encoding="utf-8") as f:
    content = f.read()
```

### 9.3 同时管理多个资源

```python
with open("source.txt", "r") as f_in, open("target.txt", "w") as f_out:
    f_out.write(f_in.read())
```

### 9.4 自定义上下文管理器（简单示例）

```python
# 方式1：使用类实现__enter__和__exit__方法
class MyContext:
    def __enter__(self):
        print("进入上下文")
        return self  # 返回值会赋值给as后的变量
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("退出上下文")
        # 返回True表示异常已处理，不会向上抛出
        return False

# 方式2：使用contextlib装饰器（更简洁）
from contextlib import contextmanager

@contextmanager
def my_context():
    print("进入上下文")
    yield  # yield之前是__enter__，之后是__exit__
    print("退出上下文")
```

------

## 十、面向对象基础语法

### 10.1 类与对象定义

```python
# 类定义
class Student:
    # 类属性（所有对象共享）
    school = "清华大学"
    
    # 构造方法（创建对象时自动调用）
    def __init__(self, name, age):
        # 实例属性（每个对象独有）
        self.name = name
        self.age = age
    
    # 实例方法（第一个参数必须是self，指代当前对象）
    def study(self):
        print(f"{self.name}在学习")

# 创建对象
stu1 = Student("Alice", 20)
stu2 = Student("Bob", 21)

# 访问属性和方法
print(stu1.name)  # Alice
stu1.study()  # Alice在学习
print(Student.school)  # 清华大学
```

### 10.2 类方法与静态方法

```python
class Student:
    school = "清华大学"
    
    # 类方法：第一个参数是cls，指代类本身
    @classmethod
    def change_school(cls, new_school):
        cls.school = new_school
    
    # 静态方法：不需要self或cls参数，与类无关的工具方法
    @staticmethod
    def is_adult(age):
        return age >= 18

# 调用类方法
Student.change_school("北京大学")
print(Student.school)  # 北京大学

# 调用静态方法
print(Student.is_adult(20))  # True
```

### 10.3 继承

- Python 支持多继承

```python
# 父类
class Person:
    def __init__(self, name):
        self.name = name
    
    def eat(self):
        print(f"{self.name}在吃饭")

# 子类继承父类
class Student(Person):
    def __init__(self, name, student_id):
        # 调用父类构造方法
        super().__init__(name)
        self.student_id = student_id
    
    # 子类自己的方法
    def study(self):
        print(f"{self.name}在学习")

# 使用
stu = Student("Alice", "2024001")
stu.eat()  # Alice在吃饭（继承父类方法）
stu.study()  # Alice在学习（子类自己的方法）
```

### 10.4 方法重写

- 子类可以重写父类的方法

```python
class Dog(Person):
    def eat(self):
        print(f"{self.name}在吃骨头")  # 重写父类eat方法
```

### 10.5 访问控制（命名约定）

- Python 没有严格的私有属性 / 方法，通过命名约定实现

  - `_xxx`：受保护的，建议只在类内部和子类中访问
  - `__xxx`：私有，Python 会进行名称改写（`_类名__xxx`），外部无法直接访问

  

```python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.__age = age  # 私有属性
    
    def get_age(self):
        return self.__age  # 类内部可以访问

stu = Student("Alice", 20)
print(stu.name)  # Alice
# print(stu.__age)  # 报错，外部无法直接访问
print(stu.get_age())  # 20
```