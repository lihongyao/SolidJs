# 概述

[Solid ↪](https://docs.solidjs.com/) 是一个新兴的高性能响应式前端框架，其核心设计融合了 React 的声明式开发模式与 Svelte 的编译时优化，同时通过独特的细粒度响应式机制实现了接近原生 JavaScript 的性能表现。

## 核心概念

**细粒度响应式（Fine-Grained Reactivity）**

SolidJS 使用 **Signal**（信号）作为状态管理的基础单元，通过 `createSignal`创建响应式数据。与 React 的虚拟 DOM 不同，**SolidJS 直接追踪数据依赖关系，仅更新受影响的 DOM 节点，避免了虚拟 DOM 的 diff 计算开销。**

```tsx
const [count, setCount] = createSignal(0); // 创建响应式状态
```

**无虚拟 DOM**

直接操作真实 DOM，通过编译时分析生成高效的 DOM 更新指令，减少运行时性能损耗。

**类 React 语法**

支持 JSX 和类似 React Hooks 的 API（如 `createEffect`、`onMount`），降低学习成本。

## 主要作用

**构建高性能动态 UI**

适用于数据可视化、实时仪表盘等对渲染性能要求高的场景。

**轻量级应用开发**

核心库仅 ~7KB（gzipped），适合移动端或资源受限的环境。

**渐进式迁移**

可逐步替换 React 项目中的组件，兼容现有生态

## 核心性能

**极致性能**

在 Js Framework Benchmark 中表现优异，依赖追踪和直接 DOM 操作使其性能接近原生 JavaScript。

**简洁心智模型**

**组件仅执行一次（无重渲染）**，状态更新通过 Signal 自动触发局部 DOM 更新，逻辑更直观。

**轻量运行时**

编译时优化减少了运行时代码量，加载更快。

**TypeScript 友好**

提供完整的类型支持，适合现代化开发流程。

## 对比其他框架

| 特性           | SolidJS       | React       | Svelte       |
| :------------- | :------------ | :---------- | :----------- |
| **响应式机制** | 细粒度 Signal | 虚拟 DOM    | 编译时响应式 |
| **运行时大小** | ~7KB          | ~40KB       | ~4KB         |
| **组件更新**   | 无重渲染      | 频繁重渲染  | 无重渲染     |
| **语法**       | JSX + Hooks   | JSX + Hooks | 模板语法     |

适用场景：

- **选 SolidJS**：追求性能、轻量级且喜欢 React 开发模式的场景。
- **不选 SolidJS**：需要成熟 SSR 方案（如 Next.js）或庞大第三方库生态的项目。

SolidJS 通过创新性的设计，为高性能前端开发提供了新的选择，尤其适合对性能敏感的应用。

> **提示**：你可以从在 [SolidJs Playground](https://playground.solidjs.com/) 在线体验 SolidJs 的魅力。

# 创建项目

要创建一个新的 Solid 应用程序，请前往您想要创建项目的目标目录，并运行以下命令：

```shell
$ pnpm create solid
```

此命令会安装并运行 `create-solid`，这是 Solid 的官方项目搭建工具。命令行界面将引导您完成一系列提示操作，让您能够选择诸如起始模板、TypeScript 支持以及是否包含 Solid 的全栈框架 SolidStart 等选项。

```
┌  
 Create-Solid v0.6.6
│
◆  Project Name
│  <solid-project>
│
◆  What type of project would you like to create?
│  ○ SolidStart
│  ● SolidJS + Vite
│  ○ Library
│
◆  Use Typescript?
│  ● Yes / ○ No
│
◆ Which template would you like to use?
│  ○ ts
│  ○ ts-vitest
│  ○ ts-uvu
│  ○ ts-unocss
│  ● ts-tailwindcss
│  ○ ts-sass
│  ○ ts-router
│  ○ ts-router-file-based
│  ○ ts-minimal
│  ○ ts-jest
│  ○ ts-bootstrap
│
◑  Creating project...
│
◆  Project created 🎉
│
◆  To get started, run: ─╮
│                        │
│  cd my-solid-app       │
│  pnpm install          │
│  pnpm dev              │
│                        │
├────────────────────────╯
```

一旦项目创建完成，按照说明安装依赖项并启动开发服务器：

```
│  cd solid-project
│  pnpm install
│  pnpm dev
```

# 笔者提示

本系列文字并不是完整的 **Solid** 教程，你可以理解成是笔记，如果你期望系统的了解、学习并掌握 **Solid** ，请参考 [官方文档  ↪](https://docs.solidjs.com/quick-start)
