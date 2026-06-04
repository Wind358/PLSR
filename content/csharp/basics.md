---
languageId: csharp
languageName: C#
group: .NET
accent: #6f42c1
description: .NET 平台的现代类型安全语言。
topicId: basics
topicTitle: 基础语法
summary: 类型、属性、LINQ、异步与模式匹配。
order: 10
---

# C# 基础语法

C# 是 .NET 平台的主力语言，常用于桌面、后端、游戏和云服务。

## 顶级语句

```csharp
Console.WriteLine("Hello, C#");
```

## 类型与变量

```csharp
string name = "Ada";
int age = 36;
bool enabled = true;
var tags = new List<string> { "dotnet", "docs" };
```

## 属性

```csharp
public class User
{
    public int Id { get; init; }
    public string Name { get; set; } = "";
}
```

## LINQ

```csharp
var activeNames = users
    .Where(user => user.IsActive)
    .Select(user => user.Name)
    .ToList();
```

## async/await

```csharp
public async Task<User> LoadUserAsync(int id)
{
    var user = await repository.FindAsync(id);
    return user ?? throw new InvalidOperationException("User not found");
}
```

## 模式匹配

```csharp
string label = value switch
{
    < 0 => "negative",
    0 => "zero",
    _ => "positive"
};
```

## 规范建议

- 公共成员使用 `PascalCase`。
- 局部变量和参数使用 `camelCase`。
- 异步方法以 `Async` 结尾。
- 对可空引用类型保持严格标注。
