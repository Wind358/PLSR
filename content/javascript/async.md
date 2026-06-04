---
languageId: javascript
languageName: JavaScript
group: Web
accent: #f5c542
description: 浏览器与 Node.js 生态的主力脚本语言。
topicId: async
topicTitle: 异步编程
summary: Promise、async/await 与错误处理。
order: 20
---

# JavaScript 异步编程

JavaScript 的异步模型基于事件循环。日常代码中最常见的是 `Promise` 和 `async/await`。

## Promise

```javascript
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

delay(300).then(() => {
  console.log("done");
});
```

## async/await

`async` 函数总是返回 `Promise`。`await` 会等待 Promise 完成。

```javascript
async function loadUser(id) {
  const response = await fetch(`/api/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load user");
  }

  return response.json();
}
```

## 错误处理

```javascript
async function run() {
  try {
    const user = await loadUser(1);
    console.log(user.name);
  } catch (error) {
    console.error("Request failed", error);
  }
}
```

## 并发请求

```javascript
const [profile, settings] = await Promise.all([
  fetch("/api/profile").then((res) => res.json()),
  fetch("/api/settings").then((res) => res.json()),
]);
```

## 规范建议

- 不要忽略异步错误。
- 可以并发的请求不要串行等待。
- 给异步函数起清晰的动词名称，例如 `loadUser`、`saveDraft`。
- 取消请求时优先使用 `AbortController`。
