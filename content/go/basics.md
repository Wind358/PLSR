---
languageId: go
languageName: Go
group: Backend
accent: #00add8
description: 简洁、并发友好、适合云原生服务的语言。
topicId: basics
topicTitle: 基础语法
summary: 包、函数、结构体、接口与 goroutine。
order: 10
---

# Go 基础语法

Go 语言强调简单、清晰、快速编译，常用于后端服务和云原生工具。

## 包与入口

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go")
}
```

## 变量

```go
name := "Ada"
count := 1
enabled := true
```

## 函数

```go
func add(a int, b int) int {
    return a + b
}
```

## 结构体

```go
type User struct {
    ID   int
    Name string
}

func (u User) Label() string {
    return fmt.Sprintf("%d:%s", u.ID, u.Name)
}
```

## 接口

```go
type Repository interface {
    FindByID(id int) (User, error)
    Save(user User) error
}
```

## goroutine

```go
go func() {
    fmt.Println("running in background")
}()
```

## 规范建议

- 错误作为返回值显式处理。
- 包名短小且语义清晰。
- 接口保持小而聚焦。
- 使用 `gofmt` 保持统一格式。
