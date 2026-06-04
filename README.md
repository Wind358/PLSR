# PLSR(Programming Language Syntax Reader)

一个基于 **Tauri + React + TypeScript + Vite** 开发的 Windows 桌面语法手册应用，用于集中展示常用编程语言的语法规范、代码示例和 Markdown 文档内容。

项目内容完全基于本地 Markdown 文件维护，适合用来制作个人编程手册、团队规范文档、课程讲义、代码片段库或离线技术文档工具。

## 功能特性

- **Windows 桌面应用**：基于 Tauri 打包，体积比传统 Electron 应用更轻。
- **Markdown 展示**：使用 Markdown 编写语法说明、规范和示例。
- **自动扫描文档**：自动加载 `content/**/*.md` 下的所有 Markdown 文件。
- **语言与主题分栏**：左侧语言列表，中间主题目录，右侧正文阅读区。
- **全文搜索**：可搜索语言名称、主题标题、摘要和正文内容。
- **代码块复制**：每个代码块右上角提供复制按钮。
- **浅色/深色模式**：内置主题切换。
- **侧边栏折叠**：语言栏和主题栏均支持收起/展开。
- **本地离线使用**：文档随应用打包，无需联网访问。

## 技术栈

| 类型 | 技术 |
| --- | --- |
| 桌面框架 | Tauri 2 |
| 前端框架 | React 18 |
| 开发语言 | TypeScript |
| 构建工具 | Vite |
| Markdown 渲染 | react-markdown |
| Markdown 扩展 | remark-gfm |
| 图标库 | lucide-react |
| 桌面后端 | Rust |

## 项目结构

```text
syntax-md-desktop/
├─ content/                 # Markdown 文档内容库
│  ├─ javascript/
│  ├─ python/
│  ├─ java/
│  ├─ csharp/
│  ├─ cpp/
│  ├─ go/
│  ├─ rust/
│  └─ sql/
├─ src/                     # React 前端源码
│  ├─ content/              # Markdown 加载与类型定义
│  ├─ App.tsx               # 主界面
│  ├─ main.tsx              # React 入口
│  └─ styles.css            # 全局样式
├─ src-tauri/               # Tauri / Rust 桌面端
│  ├─ src/
│  ├─ icons/
│  ├─ capabilities/
│  ├─ Cargo.toml
│  └─ tauri.conf.json
├─ 内容维护指南.md           # 添加或修改 Markdown 文档的详细说明
├─ package.json
├─ vite.config.ts
└─ README.md
```

## 环境要求

运行前需要安装：

- [Node.js](https://nodejs.org/)：建议使用 Node.js 18 或更高版本。
- [Rust](https://www.rust-lang.org/tools/install)：Tauri 桌面端需要 Rust/Cargo。
- [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)：Windows 下编译 Tauri 需要 C++ 构建工具。
- Microsoft Edge WebView2 Runtime：Windows 10/11 通常已内置。

安装 Visual Studio Build Tools 时建议勾选：

```text
Desktop development with C++
```

中文界面中通常叫：

```text
使用 C++ 的桌面开发
```

## 安装依赖

进入项目目录：

```cmd
cd syntax-md-desktop
```

安装前端依赖：

```cmd
npm install
```

如果你在 Windows PowerShell 中遇到 `npm.ps1` 执行策略问题，可以使用：

```cmd
npm.cmd install
```

## 开发运行

仅运行前端页面：

```cmd
npm run dev
```

Windows 下也可以使用：

```cmd
npm.cmd run dev
```

浏览器打开：

```text
http://localhost:1420
```

运行 Tauri 桌面开发模式：

```cmd
npm run tauri dev
```

或：

```cmd
npm.cmd run tauri dev
```

注意：开发模式会保留命令行窗口，这是正常现象。

## 构建应用

构建前端：

```cmd
npm run build
```

构建 Windows 桌面应用：

```cmd
npm run tauri build
```

Windows 下也可以使用：

```cmd
npm.cmd run tauri build
```

构建完成后，通常会生成：

```text
src-tauri/target/release/syntax-md-desktop.exe
```

安装包通常位于：

```text
src-tauri/target/release/bundle/nsis/
```

正式打包后的 release 版本双击运行不会弹出 CMD 窗口。

## 如何添加自己的 Markdown 文档

应用会自动扫描：

```text
content/**/*.md
```

每篇 Markdown 文件顶部需要添加一段元信息，用来告诉应用它属于哪门语言、哪个主题、如何显示和排序。

示例：添加 TypeScript 基础语法文档。

新建文件：

```text
content/typescript/basics.md
```

写入内容：

````markdown
---
languageId: typescript
languageName: TypeScript
group: Web
accent: #3178c6
description: 为 JavaScript 添加静态类型系统的语言。
topicId: basics
topicTitle: 基础语法
summary: 类型标注、接口、泛型与联合类型。
order: 10
---

# TypeScript 基础语法

## 类型标注

```typescript
const name: string = "Ada";
const age: number = 36;
```

## 接口

```typescript
interface User {
  id: number;
  name: string;
}
```
````

保存后重新运行开发服务或重新打包，左侧语言列表中就会出现 TypeScript。

更多内容维护说明见：

```text
内容维护指南.md
```

## Markdown 元信息字段

| 字段 | 说明 |
| --- | --- |
| `languageId` | 语言唯一标识，建议使用小写英文，例如 `python`、`typescript` |
| `languageName` | 左侧语言列表显示的名称 |
| `group` | 语言分组，例如 `Web`、`Backend`、`Systems` |
| `accent` | 语言颜色条，使用十六进制颜色 |
| `description` | 语言简介，显示在主题栏顶部 |
| `topicId` | 主题唯一标识，同一语言下不要重复 |
| `topicTitle` | 主题标题 |
| `summary` | 主题摘要 |
| `order` | 排序数字，越小越靠前 |

## 修改内容后如何更新 exe

如果只是开发预览：

```cmd
npm.cmd run dev
```

如果要生成新的 exe：

```cmd
npm.cmd run tauri build
```

已经打包好的旧 exe 不会自动读取你后续修改的 Markdown 文件。修改内容后，需要重新执行打包命令生成新的 exe。

## 常见问题

### 1. 为什么运行 `npm` 报 `npm.ps1` 被禁止？

这是 Windows PowerShell 执行策略导致的。可以改用：

```cmd
npm.cmd run dev
```

或：

```cmd
npm.cmd run tauri build
```

### 2. 为什么开发模式会弹出命令行窗口？

`npm run tauri dev` 是开发模式，需要命令行显示编译日志和运行状态，所以会保留窗口。

正式打包后使用：

```cmd
npm.cmd run tauri build
```

然后双击 release 目录下的 exe 即可。

### 3. 为什么双击旧 exe 还是会弹 CMD？

请确认使用的是重新打包后的 release exe：

```text
src-tauri/target/release/syntax-md-desktop.exe
```

如果你修改过 Rust/Tauri 配置但没有重新构建，旧 exe 不会变化。

### 4. 添加了 Markdown 后为什么没有显示？

请检查：

- 文件是否放在 `content` 目录下。
- 文件扩展名是否为 `.md`。
- 顶部是否包含 `---` 元信息。
- 同一语言下 `topicId` 是否重复。
- 修改后是否重新运行开发服务或重新打包。

### 5. 可以只用浏览器预览吗？

可以。运行：

```cmd
npm.cmd run dev
```

然后访问：

```text
http://localhost:1420
```

## 后续可扩展方向

- 文档收藏与最近阅读。
- 文档导入/导出。
- 代码高亮主题切换。
- 文档标签系统。
- 多窗口阅读。
- 自动生成目录锚点。
- 支持从外部目录加载 Markdown。
- GitHub Actions 自动打包 release。

## 许可证

当前项目尚未指定许可证。上传 GitHub 前建议根据你的发布意图添加 `LICENSE` 文件。

常见选择：

- `MIT`：宽松开源，适合个人项目和工具类项目。
- `Apache-2.0`：宽松开源，同时包含专利授权条款。
- `GPL-3.0`：要求衍生项目也保持开源。
