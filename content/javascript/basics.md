---
languageId: javascript
languageName: JavaScript
group: Web
accent: #f5c542
description: 浏览器与 Node.js 生态的主力脚本语言。
topicId: basics
topicTitle: 基础语法
summary: 变量、类型、函数、控制流与模块。
order: 10
---

# JavaScript 基础语法

JavaScript 是动态类型语言，常用于浏览器、Node.js 服务端、脚本工具和桌面应用前端。

## 变量声明

优先使用 `const`，需要重新赋值时使用 `let`。避免在现代代码中使用 `var`。

```javascript
const name = "Ada";
let count = 1;

count += 1;
console.log(`${name}: ${count}`);
```

## 类型

常见基础类型包括 `string`、`number`、`boolean`、`undefined`、`null`、`bigint`、`symbol`。

```javascript
const enabled = true;
const price = 19.9;
const tags = ["web", "docs"];
const user = { id: 1, name: "Ada" };
```

## 函数

箭头函数适合短逻辑，普通函数适合需要函数提升或明确 `this` 语义的场景。

```javascript
function add(a, b) {
  return a + b;
}

const formatName = (first, last) => `${first} ${last}`;
```

## 控制流

```javascript
const score = 88;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C");
}
```

## 模块

```javascript
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

import { clamp } from "./math.js";
```

## 规范建议

| 场景 | 建议 |
| --- | --- |
| 可变状态 | 尽量缩小作用域 |
| 比较 | 使用 `===` 和 `!==` |
| 异常 | 捕获后给出上下文 |
| 对象访问 | 对可空值使用可选链 `?.` |
