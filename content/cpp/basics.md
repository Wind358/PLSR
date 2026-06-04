---
languageId: cpp
languageName: C++
group: Systems
accent: #4d77a8
description: 高性能系统、图形、游戏和底层基础设施常用语言。
topicId: basics
topicTitle: 基础语法
summary: 类型、函数、类、RAII 与标准库容器。
order: 10
---

# C++ 基础语法

C++ 常用于性能敏感场景，强调资源管理、类型系统和零成本抽象。

## 基本结构

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, C++" << std::endl;
    return 0;
}
```

## 变量与类型

```cpp
int count = 10;
double price = 19.9;
bool enabled = true;
std::string name = "Ada";
```

## 函数

```cpp
int add(int a, int b) {
    return a + b;
}
```

## 类

```cpp
class User {
public:
    explicit User(std::string name) : name_(std::move(name)) {}

    const std::string& name() const {
        return name_;
    }

private:
    std::string name_;
};
```

## RAII

资源应由对象生命周期管理，避免手动成对释放。

```cpp
std::vector<int> numbers = {1, 2, 3};
std::unique_ptr<User> user = std::make_unique<User>("Ada");
```

## 规范建议

- 优先使用标准库容器和智能指针。
- 避免裸 `new` 和 `delete`。
- 对不会修改状态的成员函数加 `const`。
- 传递大对象时优先使用引用或移动语义。
