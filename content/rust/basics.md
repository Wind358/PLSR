---
languageId: rust
languageName: Rust
group: Systems
accent: #c45508
description: 以内存安全和零成本抽象为核心的系统语言。
topicId: basics
topicTitle: 基础语法
summary: 所有权、借用、match、Result 与结构体。
order: 10
---

# Rust 基础语法

Rust 通过所有权、借用和生命周期实现内存安全，同时保持接近系统语言的性能。

## 入口

```rust
fn main() {
    println!("Hello, Rust");
}
```

## 变量

变量默认不可变，需要修改时使用 `mut`。

```rust
let name = "Ada";
let mut count = 1;
count += 1;
```

## 所有权

```rust
let value = String::from("hello");
let moved = value;
// println!("{value}"); // value has been moved
println!("{moved}");
```

## 借用

```rust
fn length(text: &str) -> usize {
    text.len()
}

let name = String::from("Ada");
println!("{}", length(&name));
```

## match

```rust
let status = 200;

let label = match status {
    200 => "ok",
    404 => "not found",
    _ => "unknown",
};
```

## Result

```rust
fn parse_count(input: &str) -> Result<i32, std::num::ParseIntError> {
    input.parse::<i32>()
}
```

## 规范建议

- 明确区分所有权、共享借用和可变借用。
- 错误处理优先使用 `Result`。
- 使用 `cargo fmt` 和 `cargo clippy`。
- 公共 API 尽量表达生命周期和错误语义。
