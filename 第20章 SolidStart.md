@ https://docs.solidjs.com/solid-start/

# 概述

SolidStart 是一个开源的元框架（meta-framework），旨在统一构建 Web 应用的组件。它基于 Solid 构建，并使用 Vinxi（一个中立的框架打包器（Framework Bundler），结合了 Vite 和 Nitro 的强大功能）。

SolidStart 避免过度规定开发方式，仅提供最少的启动组件。虽然提供了包含常用工具的模板，但 SolidStart 本身并不内置路由器或元数据库（Metadata library），你可以自由选择使用任何库。

SolidStart 允许根据不同的使用场景以多种方式渲染应用，包括：

- 客户端渲染（CSR）
- 服务端渲染（SSR）
- 静态站点生成（SSG）

SolidStart 的核心原则之一是代码应保持 **同构（isomorphic）**——确保代码只需编写一次，无论在客户端还是服务端都能正确执行。

## 特性

SolidStart 具备以下功能：

- 细粒度响应性（Fine-grained reactivity）

  由 Solid 提供支持，实现高性能、响应式的数据更新。

- 同构嵌套路由（Isomorphic, nested routing）

  无论页面在客户端还是服务端，相同的路由都会被渲染。嵌套路由提供父子关系，简化应用逻辑。

- 多种渲染模式（Multiple rendering modes）

  可用于创建 CSR、SSR（同步、异步和流式）以及 SSG 应用。

- 命令行工具（CLI）和模板（Templates）

  提供 CLI 和模板，帮助快速启动项目。

- 部署预设（Deployment presets）

  提供多平台部署预设，包括 Netlify、Vercel、AWS 和 Cloudflare。

### 前置条件

在开始使用 SolidStart 之前，你应具备基本的 Web 开发知识，包括 HTML、CSS 和 JavaScript。

由于 SolidStart 是基于 Solid 的元框架（meta-framework），我们建议在阅读文档之前先学习 Solid，至少完成 Solid 的官方教程。

# 快速上手

开始使用 Solid 的最简单方式是使用 SolidStart Starter。该 Starter 提供了一系列模板，可用于快速启动一个新的 Solid 应用。

1）安装 SolidStart

要开始一个新项目，可以使用以下命令初始化 SolidStart：

```shell
$ pnpm create solid@latest
┌  
 Create-Solid v0.6.11
│
◇  Project Name
│  solidstart-app
│
◇  What type of project would you like to create?
│  SolidStart
│
◇  Use Typescript?
│  Yes
│
◇  Which template would you like to use?
│  basic
│
◒  Creating project.
│
◇  Project created 🎉
│
◇  To get started, run: ─╮
│                        │
│  cd solidstart-app     │
│  pnpm install          │
│  pnpm dev              │
│                        │
├────────────────────────╯
```

该命令会根据你输入的名称为项目创建一个新的目录。

2）安装依赖

在选择好模板和配置选项后，进入你创建的项目目录，并运行以下命令来安装依赖：

```shell
$ pnpm i
```

命令执行完成后，你的新 SolidStart 应用就已准备就绪，可以开始开发了！

3）启动项目

要在本地运行你的应用，可以使用以下命令：

```shell
$ pnpm dev
```

现在你的应用应该已经在本地的 3000 端口运行。你可以通过访问 http://localhost:3000 来查看它。

> 注意：
>
> SolidStart 使用 Vinxi 来启动开发服务器（基于 Vite）以及构建并启动生产服务器（基于 Nitro）。
>
> 当你运行应用时，实际上是在后台执行 vinxi dev。
>
> 你可以在 [Vinxi 文档](https://vinxi.dev/) 中了解更多关于 Vinxi CLI 及其配置的内容。

## 项目文件

SolidStart 会为你的项目创建一个新目录，并生成必要的文件和文件夹来帮助你快速开始开发。这些文件和目录构成了 SolidStart 应用的基本结构，你可以根据需要进行修改。

默认的 SolidStart 项目结构如下：

```
public/
src/
├── routes/
│   ├── index.tsx
├── entry-client.tsx
├── entry-server.tsx
├── app.tsx
```

**注意**：根据你在创建项目时选择的配置选项，文件结构可能会略有不同。例如，如果你选择使用 JavaScript 而非 TypeScript，文件扩展名将是 .jsx 而不是 .tsx。

在这个结构中，每个目录和文件在 SolidStart 应用中都有特定用途：

- **public/** - 存放应用的公共资源，包括图片、字体以及其他希望公开访问的文件。
- **src/** - 存放你的 SolidStart 应用代码。在代码中可以通过别名 ~/ 进行导入。
- **src/routes/** - 存放页面文件或路由文件。关于 routes 文件夹的更多信息可以参考路由部分。
- **src/entry-client.tsx** - 负责在客户端（浏览器）加载和水合（hydrate）应用的 JavaScript。在大多数情况下，你无需修改此文件。
- **src/entry-server.tsx** - 处理服务器端的请求。与 entry-client.tsx 类似，大多数情况下无需修改。
- **app.tsx** - 应用的 HTML 根文件，适用于客户端和服务器渲染。可以将其视为应用渲染的外壳（shell）。

# 构建应用

## 路由

路由是 Web 应用的重要组成部分。在 SolidStart 中，路由主要有两种类型：

- **UI 路由（UI routes）** — 定义应用中的用户界面。
- **API 路由（API routes）** — 定义应用中的无服务器函数（serverless functions）。

### 创建新路由

SolidStart 使用 **基于文件的路由（file-based routing）**，即通过在项目中创建文件和文件夹来定义路由，包括页面和 API 路由。

SolidStart 会遍历 routes 目录，收集所有路由，并通过 \<FileRoutes /> 组件将其暴露出来。该组件仅包含 **UI 路由**，不包括 API 路由。

与其在 \<Router> 组件中手动定义每个 \<Route>，\<FileRoutes /> 会根据文件系统自动生成路由。

由于 \<FileRoutes /> 返回一个路由配置对象，你可以将它与任意路由器一起使用。例如，使用 solid-router：

```tsx
mport { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";

export default function App() {
  return (
    <Router root={(props) => <Suspense>{props.children}</Suspense>}>
      <FileRoutes />
    </Router>
  );
}
```

\<Router /> 组件需要一个 root 属性，作为整个应用的根布局。你需要确保 props.children 被 \<Suspense /> 包裹，因为每个组件会被自动懒加载。否则，可能会出现意外的水合（hydration）错误。

\<FileRoutes /> 会为 routes 目录及其子目录中的每个文件生成一个路由。要将某个路由渲染为页面，该文件必须默认导出一个组件。这个组件表示用户访问该页面时要渲染的内容。

```tsx
export default function Index() {
  return <div>Welcome to my site!</div>;
}
```

这意味着，你只需在 routes 文件夹中创建一个文件，SolidStart 会自动处理使该路由在应用中可访问的所有细节！

### 基于文件的路由

routes 目录中的每个文件都被视为一个路由。要在应用中创建新路由或页面，只需在 routes 目录中创建新文件即可。文件名将对应路由的 URL 路径，例如：

- example.com/blog ➜ /routes/blog.tsx
- example.com/contact ➜ /routes/contact.tsx
- example.com/directions ➜ /routes/directions.tsx

#### 嵌套路由

如果需要嵌套路由，可以创建一个以前置路由段命名的目录，并在该目录中创建新文件：

- example.com/blog/article-1 ➜ /routes/blog/article-1.tsx
- example.com/work/job-1 ➜ /routes/work/job-1.tsx

当文件名为 index 时，如果请求的 URL 没有额外的路由段，它将被渲染：

- example.com ➜ /routes/index.tsx
- example.com/socials ➜ /routes/socials/index.tsx

#### 嵌套布局

如果你想创建嵌套布局，可以在路由文件夹中创建一个与文件夹同名的文件。

```tsx
|-- routes/
    |-- blog.tsx                   // layout file
    |-- blog/
        |-- article-1.tsx         // example.com/blog/article-1
        |-- article-2.tsx        // example.com/blog/article-2
```

在这种情况下，blog.tsx 文件将作为 blog 文件夹中文章的布局。在布局中可以通过 props.children 引用子路由的内容。

```tsx
// routes/blog.tsx
import { RouteSectionProps } from "@solidjs/router";

export default function BlogLayout(props: RouteSectionProps) {
  return <div>{props.children}</div>;
}
```

> **注意**：创建 blog/index.tsx 或 blog/(blogIndex).tsx 与布局不同，它们仅用于渲染索引路由（index route）。

### 重命名 Index

默认情况下，每个文件夹中的 index.tsx 的默认导出组件会被渲染为该路由的页面。然而，当项目中存在多个 index.tsx 文件时，查找正确的文件可能会变得困难。

为避免这种情况，你可以将 index.tsx 重命名为文件夹的名称，并用括号包裹。

这样，它将被视为该路由的默认导出组件，例如：

```tsx
|-- routes/                       // example.com
    |-- blog/
        |-- article-1.tsx         // example.com/blog/article-1
        |-- article-2.tsx
    |-- work/
        |-- job-1.tsx             // example.com/work/job-1
        |-- job-2.tsx
    |-- socials/
        |-- (socials).tsx         // example.com/socials
```

#### 逃离嵌套路由

当你有一个嵌套路径，但希望它使用不同的布局时，可以通过在文件名中使用括号 ( ) 来“逃离”嵌套路由。

这样可以创建一个新的路由，而不隶属于前一个路由的嵌套结构。

```tsx
|-- routes/                       // example.com
    |-- users/
        |-- index.tsx            // example.com/users
        |-- projects.tsx         // example.com/users/projects
    |-- users(details)/
        |-- [id].tsx            // example.com/users/1
```

此外，你还可以为该路由自身创建嵌套布局：

```tsx
|-- routes/
    |-- users.tsx
    |-- users(details).tsx
    |-- users/
        |-- index.tsx
        |-- projects.tsx
    |-- users(details)/
        |-- [id].tsx
```

#### 动态路由

动态路由允许某个路由段匹配任意值。当 URL 路径包含动态段时，可以使用方括号 [] 来定义：

- example.com/users/:id ➜ /routes/users/[id].tsx
- example.com/users/:id/:name ➜ /routes/users/[id]/[name].tsx
- example.com/*missing ➜ /routes/[...missing].tsx

这使你能够创建单一路由来匹配该路径段的任意值。例如，/users/1 和 /users/2 都是有效路由，而无需为每个用户定义独立路由，可以使用动态路由匹配 id 段的任意值。

```tsx
|-- routes/
    |-- users/
        |-- [id].tsx
```

例如，在使用 solid-router 时，可以使用 useParams 原语来获取动态路由段的值：

```tsx
import { useParams } from "@solidjs/router";

export default function UserPage() {
  const params = useParams();
  return <div>User {params.id}</div>;
}
```

**可选参数（Optional Parameter）**

如果路由中有可选参数，可以使用双方括号 [[id]] 来定义动态段。这将匹配包含或不包含该参数的路由。

```
|-- routes/
    |-- users/
        |-- [[id]].tsx
```

在这种情况下，一些可能匹配的页面示例包括：

- `/users`
- `/users/1`
- `/users/abc`



**全匹配路由（Catch-all Routes）**

全匹配路由是一种特殊的动态路由，可以匹配任意数量的路径段。

定义方法是在方括号中使用 ... 前缀，例如：[...post]。

```
|-- routes/
    |-- blog/
        |-- index.tsx
        |-- [...post].tsx
```

全匹配路由会有一个参数，该参数是从最后一个有效段开始的所有 URL 段组成的以斜杠分隔的字符串。例如：

- 对于路由 [...post] 和 URL /post/foo，useParams 返回的对象中 post 属性值为 post/foo。
- 对于 URL /post/foo/baz，post 属性值为 post/foo/baz。

```tsx
import { useParams } from "@solidjs/router";

export default function BlogPage() {
  const params = useParams();
  return <div>Blog {params.post}</div>;
}
```

### 路由分组（Route Groups）

使用路由分组，可以在不影响 URL 结构的情况下组织路由。由于基于文件的路由依赖文件系统，直接组织文件夹可能不利于项目结构的清晰性。

在 SolidStart 中，路由分组通过在文件夹名称外使用括号()来定义：

```
|-- routes/
    |-- (static)
        |-- about-us                // example.com/about-us
            |-- index.tsx
        |-- contact-us              // example.com/contact-us
            |-- index.tsx
```

### 额外的路由配置

SolidStart 提供了一种在文件系统之外添加路由配置的方法。由于 SolidStart 支持使用其他路由器，你可以使用 \<FileRoutes /> 提供的路由导出（route export）来为你选择的路由器定义额外的路由配置。

```tsx
import type { RouteSectionProps, RouteDefinition } from "@solidjs/router";

export const route = {
  preload() {
    // define preload function
  }
} satisfies RouteDefinition

export default function UsersLayout(props: RouteSectionProps) {
  return (
    <div>
      <h1>Users</h1>
      {props.children}
    </div>
  );
}
```

## API 路由（API Routes）

虽然服务器函数（Server Functions）适合为 UI 提供所需的数据编写服务端代码，但有时你需要公开 API 路由。需要 API 路由的场景包括：

- 有额外的客户端需要共享同一逻辑。
- 公开 GraphQL 或 tRPC 接口。
- 提供面向公众的 REST API。
- 编写 Webhook 或 OAuth 的回调处理程序。
- 提供非 HTML 类型的文档，如 PDF 或图片。

为此，SolidStart 提供了一种易于理解和维护的方式来编写 API 路由。API 路由与 UI 路由类似，并遵循相同的文件命名约定。

**区别**：

- UI 路由默认导出一个 Solid 组件。
- API 路由不导出组件，而是导出以处理的 HTTP 方法命名的函数，例如 GET、POST 等。

> **注意**：API 路由优先于同路径的 UI 路由。如果希望两者在相同路径上共存，请记得使用 Accept 头。对于 GET 路由，如果没有返回响应，将回退到 UI 路由处理。

### 编写API 路由

要编写 API 路由，可以在项目中创建一个文件夹来存放路由文件。虽然文件夹可以命名为任意名称，但通常会命名为 api，以表明该目录下的路由用于处理 API 请求。

```tsx
export function GET() {
  // ...
}

export function POST() {
  // ...
}

export function PATCH() {
  // ...
}

export function DELETE() {
  // ...
}
```

API 路由会接收一个 APIEvent 对象作为第一个参数。该对象包含以下内容：

- **request**：表示客户端发送请求的 Request 对象。
- **params**：包含动态路由参数。例如，对于路由 /api/users/:id，当请求 /api/users/123 时，params 为 { id: 123 }。
- **fetch**：内部 fetch 函数，可用于向其他 API 路由发送请求，无需关心 URL 的 origin。

API 路由应返回 JSON 或 Response 对象。为了处理多种 HTTP 方法，可以定义一个 handler 函数，并将其绑定到多个方法：

```tsx
async function handler() {
  // 处理逻辑
}

export const GET = handler;
export const POST = handler;
// ...
```

下面是一个示例 API 路由，它根据指定的类别和品牌返回产品列表：

```tsx
import type { APIEvent } from "@solidjs/start/server";
import store from "./store";

export async function GET({ params }: APIEvent) {
  console.log(`Category: ${params.category}, Brand: ${params.brand}`);
  const products = await store.getProducts(params.category, params.brand);
  return products;
}
```

### 会话管理

由于 HTTP 是无状态协议，你需要在服务器端管理会话状态。例如，如果想识别用户身份，最安全的方式是使用 **HTTP-only cookies**。Cookie 可以在用户浏览器中存储数据，并在多个请求之间保持持久性。

用户请求通过 Request 对象传入。你可以解析请求头中的 Cookie 来访问 cookies，同时可以使用 vinxi/http 提供的辅助函数来简化操作。

```tsx
import type { APIEvent } from "@solidjs/start/server";
import { getCookie } from "vinxi/http";
import store from "./store";

export async function GET(event: APIEvent) {
  const userId = getCookie("userId");
  if (!userId) {
    return new Response("Not logged in", { status: 401 });
  }
  const user = await store.getUser(event.params.userId);
  if (user.id !== userId) {
    return new Response("Not authorized", { status: 403 });
  }
  return user;
}
```

在这个示例中，可以看到 userId 是从 cookie 中读取的，然后用于在 store 中查找对应的用户。有关如何使用 cookie 进行安全会话管理的更多信息，请参考会话管理文档。

### 暴露 GraphQL API

SolidStart 使实现 GraphQL API 变得简单。GraphQL 是一种用于 API 的查询语言，同时提供运行时，用于根据你定义的数据类型系统执行查询。

要实现 GraphQL API，你需要定义 **schema** 和 **resolvers**。graphql 函数接受一个 GraphQL schema，并返回一个可用作 API 路由处理器的函数。

**实现步骤：**

1. 安装 graphql 库。
2. 在文件中实现你的 schema 和 resolvers。
3. 导出一个 handler 函数，该函数将作为 API 路由使用。

```tsx
import { buildSchema, graphql } from "graphql";
import type { APIEvent } from "@solidjs/start/server";

// Define GraphQL Schema
const schema = buildSchema(`
  type Message {
      message: String
  }

  type Query {
    hello(input: String): Message
    goodbye: String
  }
`);

// Define GraphQL Resolvers
const rootValue = {
  hello: () => {
    return {
      message: "Hello World"
    };
  },
  goodbye: () => {
    return "Goodbye";
  }
};

// request handler
const handler = async (event: APIEvent) => {
  // get request body
  const body = await new Response(event.request.body).json();

  // pass query and save results
  const result = await graphql({ rootValue, schema, source: body.query });

  // send query result
  return result;
};

export const GET = handler;

export const POST = handler;

```

### 暴露 tRPC 服务器路由

tRPC 是一个现代的、以 TypeScript 为优先的 API 框架，设计上易于使用和理解。

要暴露 tRPC 服务器路由，需要先编写你的 **router**。编写完成后，可以将其放在单独的文件中，以便为客户端导出类型：

```tsx
import { initTRPC } from "@trpc/server";
import { wrap } from "@decs/typeschema";
import { string } from "valibot";

const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure.input(wrap(string())).query(({ input }) => {
    return `hello ${input ?? "world"}`;
  })
});

export type AppRouter = typeof appRouter;
```

下面是一个简单的客户端示例，可用于从你的 tRPC 服务器获取数据：

```tsx
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "./router";

export const client = createTRPCProxyClient<AppRouter>({
  links: [loggerLink(), httpBatchLink({ url: "http://localhost:3000/api/trpc" })]
});
```

最后，你可以使用 **fetch 适配器（fetch adapter）** 来编写一个 API 路由，使其充当 tRPC 服务器。

```tsx
import { type APIEvent } from "@solidjs/start/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "~/lib/router";

const handler = (event: APIEvent) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: event.request,
    router: appRouter,
    createContext: () => ({})
  });

export const GET = handler;

export const POST = handler;
```

## CSS 与样式

SolidStart 是一个基于标准的框架，它不会修改 \<style> 标签的行为，而是致力于在其基础上进行扩展和构建。

### 组件样式

Vite 为复杂的 Web 应用提供了一种简便的 CSS 管理方式。它允许用户在组件树的任意位置通过 ESM 语法导入 CSS。例如，你可以在与组件文件配套的 CSS 文件中编写样式：

```
src/
├── components/
│   ├── Card.tsx
│   ├── Card.css
```

要在组件中使用 CSS，可以在 Card.css 文件中定义样式，然后在 Card.tsx 文件中导入：

```css
.card {
  background-color: #446b9e;
}

h1 {
  font-size: 1.5em;
  font-weight: bold;
}

p {
  font-size: 1em;
  font-weight: normal;
}
```

```tsx
import "./Card.css";

const Card = (props) => {
  return (
    <div class="card">
      <h1>{props.title}</h1>
      <p>{props.text}</p>
    </div>
  );
};
```

#### CSS Modules

SolidStart 也支持 Vite 的 **CSS Modules**。通过 CSS Modules，可以将某些样式限定在组件范围内，同时允许在多个组件中使用相同的 CSS 类来实现不同的样式。

使用方法：

- CSS 文件必须以 .module.css 结尾。
- 同样的约定适用于 Sass 文件：.module.scss 或 .module.sass。

```css
.card {
  background-color: #446b9e;
}

div.card > h1 {
  font-size: 1.5em;
  font-weight: bold;
}

div.card > p {
  font-size: 1em;
  font-weight: normal;
}
```

在首次使用 CSS Modules 时，如果直接在组件中使用 class 属性，可能会遇到错误。这是因为 CSS Modules 背后的机制会将定义的类名重命名为一串随机字符。如果硬编码使用 class="card"，Solid 无法识别并将其重命名。

了解决这个问题，可以将 CSS Module 中使用的类导入组件。导入对象可以理解为 humanClass: generatedClass 的映射，在组件中，通过键名（即元素上的类名）获取生成的唯一类名。例如：

```tsx
import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div class={styles.card}>
      <h1>{props.title}</h1>
      <p>{props.text}</p>
    </div>
  );
};
```

## 数据加载

SolidStart 旨在简化从数据源加载数据的过程，以便保持 UI 与数据同步。对于大多数数据需求，通常通过路由来决定加载哪些数据。

SolidStart 支持嵌套路由，这有助于以层级化的方式组织应用的 UI，同时可以共享布局，提高代码复用性。

### 客户端数据加载

Solid 提供了 createResource 原语，用于从数据源加载数据。它接收一个异步函数并返回一个 signal。

createResource 可以与 Suspense 和 ErrorBoundary 集成，用于管理数据加载的生命周期和错误状态，例如：

```tsx
// src/routes/users.tsx
import { For, createResource } from "solid-js";

type User = { name: string; house: string };

export default function Page() {
  const [users] = createResource(async () => {
    const response = await fetch("https://example.com/users");
    return (await response.json()) as User[];
  });

  return <For each={users()}>{(user) => <li>{user.name}</li>}</For>;
}
```

在组件内部进行数据获取时，尤其是在懒加载的嵌套部分下，可能会遇到不必要的瀑布加载问题。为了解决这个问题，建议将数据获取提升到组件树的顶部，或者在 SolidStart 中使用服务器以非阻塞方式获取数据。下面的示例中，我们将使用 solid-router 中的 API 数据。

利用 solid-router 的一些特性，我们可以为数据创建缓存：

```tsx
// /routes/users.tsx
import { For } from "solid-js";
import { createAsync, query } from "@solidjs/router";

type User = { name: string; email: string };

const getUsers = query(async () => {
  const response = await fetch("https://example.com/users");
  return (await response.json()) as User[];
}, "users");

export const route = {
  preload: () => getUsers(),
};

export default function Page() {
  const users = createAsync(() => getUsers());

  return <For each={users()}>{(user) => <li>{user.name}</li>}</For>;
}
```

使用这种方法时，需要注意以下几点：

- **预加载函数调用时机**：preload 函数每条路由只会调用一次，即用户第一次访问该路由时。之后，保持活跃的细粒度资源会随着状态或 URL 的变化同步，以在需要时重新获取数据。如果数据需要刷新，可以使用 createResource 返回的 refetch 函数。
- **上下文限制**：在路由渲染之前会调用 preload 函数，它与路由的上下文不共享。暴露给 preload 的上下文树是 Page 组件之上的部分。
- **服务器与客户端**：preload 函数在服务器端和客户端都会被调用。如果资源在服务器渲染时序列化了数据，可以避免重复获取。服务器端渲染仅在资源信号位于 Suspense 边界下被访问时才会等待资源获取并序列化数据。

### 数据始终在服务器端加载

作为全栈 JavaScript 框架的一个优势是，可以轻松编写在服务器和客户端都能运行的数据加载代码。

SolidStart 提供了一种方法：通过 "**use server**" 注释，你可以告诉打包工具创建一个 RPC，而不将代码包含在客户端包中。这允许你编写仅在服务器端运行的代码，而无需为其创建 API 路由。例如，它可以用于数据库访问、内部 API，或者在函数内部需要使用服务器资源时。

```tsx
// /routes/users.tsx
import { For } from "solid-js";
import { createAsync, query } from "@solidjs/router";

type User = { name: string; email: string };

const getUsers = query(async () => {
  "use server";
  return store.users.list();
}, "users");

export const route = {
  preload: () => getUsers(),
};

export default function Page() {
  const users = createAsync(() => getUsers());

  return <For each={users()}>{(user) => <li>{user.name}</li>}</For>;
}
```

## Head 与元数据

SolidStart 本身不自带元数据库。如果你希望自定义文档 \<head> 中的内容，可以使用 @solidjs/meta 库。

```shell
$ pnpm add @solidjs/meta
```

在 \<head> 中常用的元素包括：

- title：指定页面标题，用于浏览器标签和搜索结果标题。
- meta：指定页面的各种元数据，例如 favicon、字符集，或用于 SEO 的 OG 标签。
- link：添加样式表或脚本等资源，以供浏览器加载。
- style：向页面添加内联样式。

### 在 Route 组件内部

当需要为特定路由设置元数据时，可以使用 \<Title />：

```tsx
mport { Title } from "@solidjs/meta";

export default function About() {
  return (
    <>
      <Title>About</Title>
      <h1>About</h1>
    </>
  );
}
```

这些标签只会应用于该特定路由，当用户离开页面时会从 document.head 中移除。routeData 也可以在这里使用，用于根据路由的动态部分生成特定的标题和 SEO 元数据。

### 在 Title 中添加网站后缀

可以创建自定义组件来包装 \<Title />，为所有标题添加网站特定的前缀或后缀：

```tsx
export default function MySiteTitle(props) {
  return <Title>{props.children} | My Site</Title>;
}
```

```tsx
import MySiteTitle from "~/components/MySiteTitle";

export default function About() {
  return (
    <>
      <MySiteTitle>About</MySiteTitle>
      <h1>About</h1>
    </>
  );
}
```

### 在 Title 中使用异步数据

可以使用资源（resources）根据路由的动态部分生成特定的标题：

```tsx
import { Title } from "@solidjs/meta";
import { RouteSectionProps } from "@solidjs/router";
import { createResource, Show } from "solid-js";

export default function User(props: RouteSectionProps) {
  const [user] = createResource(() => fetchUser(props.params.id));

  return (
    <Show when={user()}>
      <Title>{user()?.name}</Title>
      <h1>{user()?.name}</h1>
    </Show>
  );
}

```

在此示例中，可以使用 routeData 从 /users/:id 路由中的 id 获取用户姓名，并将其用于 \<Title /> 组件。同样，其他信息也可以用于生成 SEO 所需的其他标签。

### 添加 SEO 标签

可以使用 \<Meta /> 组件添加 SEO 标签，例如 og:title、og:description、og:image。

由于这些标签可能需要在多个路由中使用，可以将它们添加到 root.tsx 文件的 \<Head> 内。

```tsx
export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Meta
          property="og:image"
          content="https://example.com/image.jpg"
        />
        <Meta
          property="og:image:alt"
          content="Welcome to my site"
        />
        <Meta property="og:image:width" content="1200" />
        <Meta property="og:image:height" content="600" />
        <Meta property="og:site_name" content="GitHub" />
      </Head>
    </Html>
  );
}
```

如果需要在特定路由中添加路由专属信息，可以像使用 \<Title /> 一样，在该路由内部使用 \<Meta /> 组件。这会覆盖 \<Head /> 组件中使用的 Meta 标签。

```tsx
import MySiteTitle from "~/components/MySiteTitle";

export default function About() {
  return (
    <>
      <MySiteTitle>About</MySiteTitle>
      <Meta name="description" content="This is my content tag." />
      <Meta
        property="og:title"
        content="Welcome to my site!"
      />
      <Meta
        property="og:description"
        content="A website"
      />
      <h1>About</h1>
    </>
  );
}
```

## 路由预渲染

路由预渲染支持静态站点生成（SSG），通过在构建过程中生成静态 HTML 页面，实现更快的加载速度和更好的 SEO。这对于内容丰富的网站（如文档、博客和营销页面）尤其有用。静态文件在运行时无需服务器处理即可直接提供。

可以通过 routes 选项为特定路由配置预渲染。

```tsx
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    prerender: {
      routes: ["/", "/about"]
    }
  }
});
```

或者，要对所有路由进行预渲染，可以将 crawlLinks 选项设置为 true。

```tsx
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    prerender: {
      crawlLinks: true
    }
  }
});
```

## 静态资源

在 SolidStart 中，有两种方式将静态资源导入到项目中：

1. 使用 public 目录
2. 使用模块导入（imports）

### 公共目录

丰富的 Web 应用会使用各种资源来构建视觉效果。在 SolidStart 中，可以使用 /public 目录存放静态资源。这些资源会以相对于 public 目录的原始路径进行访问：

```
|-- public
|   favicon.ico                   ->  /favicon.ico
|   |-- images
|   |   |-- logo.png              ->  /images/logo.png
|   |   |-- background.png        ->  /images/background.png
|   |-- models
|   |   |-- player.gltf           ->  /models/player.gltf
|   |-- documents
|   |   |-- report.pdf            ->  /documents/report.pdf
```

如果想引用 public 目录中的资源，可以使用该资源的绝对路径：

```tsx
export default function About() {
  return (
    <>
      <h1>About</h1>
      <img src="/images/logo.png" alt="Solid logo" />
    </>
  );
}
```

这种方式非常适合希望对静态资源使用可读且稳定的引用场景。常见用途包括：

- 文档（documents）
- Service Worker
- 图片、音频和视频（images, audio, video）
- Manifest 文件
- 元数据文件（如 robots.txt、sitemaps）
- 网站图标（favicon）

### 导入资源

Vite 提供了一种方式，可以将资源直接导入到 Solid 组件中：

```tsx
import logo from "./solid.png";

export default function About() {
  return (
    <>
      <h1>About</h1>
      <img src={logo} alt="Solid logo" />
      // Renders
      <img src="/assets/solid.2d8efhg.png" alt="Solid logo" />
    </>
  );
}
```

使用模块导入时，Vite 会生成带哈希的文件名。例如，solid.png 会变为 solid.2d8efhg.png。

### 公共目录 vs 模块导入

public 目录和模块导入都是在项目中包含静态资源的有效方式。选择哪种方式取决于具体的使用场景：

- 公共目录：适合需要动态更新资源的场景。可以完全控制资源的 URL 路径，即使资源更新，链接也保持不变。
- 模块导入：文件名会被哈希，因此不可预测。这对于缓存更新（cache busting）有利，但如果需要将资源链接分享给他人，则可能不方便。

# 高级

## 中间件

中间件用于拦截 HTTP 请求和响应，以执行身份验证、重定向、日志记录等操作。它还可以通过 event.locals 对象在应用中共享请求范围的数据。

### 常见用例

中间件的一些常见用例包括：

- 请求和响应头管理：可以修改头部以控制缓存（如 Cache-Control）、提高安全性（如 Content-Security-Policy），或根据请求特性实现自定义行为。
- 全局数据共享：event.locals 对象允许在中间件和任何服务器端上下文（如 API 路由、仅服务器的查询/动作）之间存储和共享请求范围的数据，例如用户认证状态、功能标记或其他请求相关信息。
- 服务器端重定向：中间件可以根据请求属性（如语言环境、认证状态或自定义查询参数）重定向用户。
- 请求预处理：可以执行轻量级的预处理任务，例如验证令牌或规范化路径。

### 限制

尽管中间件功能强大，但某些任务更适合在应用的其他部分处理，以保证性能、可维护性和安全性：

- 授权：中间件并非在每次请求时都执行，尤其是在客户端导航时。因此，依赖中间件进行授权可能造成严重安全漏洞。授权检查应尽量靠近数据源执行，例如在 API 路由、仅服务器的查询/动作或其他服务器端工具中。
- 重计算或长时间运行的任务：中间件应保持轻量且快速执行，以避免影响性能。CPU 密集型任务、长时间运行的进程或阻塞操作（如复杂计算、外部 API 调用）最好由专用路由处理器、服务器端工具或后台任务处理。
- 数据库操作：在中间件中直接进行数据库查询可能导致性能瓶颈，并增加应用的维护难度。数据库交互应由服务器端工具或路由处理器负责，以便更好地管理数据库连接并处理潜在错误。

### 基本用法

中间件通过在专用文件（例如 src/middleware/index.ts）中导出配置对象来配置。

该对象通过 createMiddleware 函数创建，用于定义中间件函数在请求生命周期中的执行时机。

```tsx
import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
  onRequest: (event) => {
    console.log("Request received:", event.request.url);

    event.locals.startTime = Date.now();
  },
  onBeforeResponse: (event) => {
    const endTime = Date.now();
    const duration = endTime - event.locals.startTime;
    console.log(`Request took ${duration}ms`);
  },
});
```

为了让 SolidStart 识别该配置对象，需要在 app.config.ts 中声明文件路径：

```tsx
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  middleware: "src/middleware/index.ts",
});

```

### 生命周期事件

中间件函数在请求生命周期的特定时刻执行，主要使用两个关键事件：onRequest 和 onBeforeResponse。

#### onRequest

onRequest 事件在请求生命周期的开始触发，在路由处理器处理请求之前执行。适合在此阶段进行：

- 在 event.locals 中存储请求范围的数据，以便后续中间件或路由处理器使用。
- 设置或修改请求头。
- 提前执行重定向。

#### onBeforeResponse

onBeforeResponse 事件在路由处理器处理请求后、响应发送到客户端之前触发。适合在此阶段进行：

- 设置或修改响应头。
- 记录响应指标或执行其他后处理任务。
- 修改响应体。

### Locals

在 Web 应用中，经常需要在服务器端的不同部分共享请求特定的数据。这些数据可能包括用户认证状态、用于调试的追踪 ID，或客户端元数据（如用户代理、地理位置）。

event.locals 是一个普通的 JavaScript 对象，可存储任意 JavaScript 值。它提供了一个临时的、请求范围的存储层：

- 数据仅在单个 HTTP 请求处理期间可用。
- 请求处理结束后会自动清除。

```tsx
import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
  onRequest: (event) => {
    event.locals.user = {
      name: "John Wick",
    };
    event.locals.sayHello = () => {
      return "Hello, " + event.locals.user.name;
    };
  },
});
```

在中间件中，可以直接访问和修改 event.locals。

在其他服务器端上下文中，则必须使用 getRequestEvent 函数来访问 event.locals 对象。

```tsx
import { getRequestEvent } from "solid-js/web";
import { query, createAsync } from "@solidjs/router";

const getUser = query(async () => {
  "use server";
  const event = getRequestEvent();
  return {
    name: event?.locals?.user?.name,
    greeting: event?.locals?.sayHello(),
  };
}, "user");

export default function Page() {
  const user = createAsync(() => getUser());

  return (
    <div>
      <p>Name: {user()?.name}</p>
      <button onClick={() => alert(user()?.greeting)}>Say Hello</button>
    </div>
  );
}
```

### Headers

请求和响应头可以通过 event.request.headers 和 event.response.headers 访问和修改。

它们遵循标准的 Web API Headers 接口，提供内置方法用于读取和更新头部信息。

```tsx
import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
  onRequest: (event) => {
    // Reading client metadata for later use
    const userAgent = event.request.headers.get("user-agent");
    // Adding custom headers to request/response
    event.request.headers.set("x-custom-request-header", "hello");
    event.response.headers.set("x-custom-response-header1", "hello");
  },
  onBeforeResponse: (event) => {
    // Finalizing response headers before sending to client
    event.response.headers.set("x-custom-response-header2", "hello");
  },
});
```

在 onRequest 中设置的头部会在路由处理器处理请求之前生效，这允许后续的中间件或路由处理器覆盖它们。

在 onBeforeResponse 中设置的头部会在路由处理器处理请求之后生效，并最终发送给客户端。

### Cookies

HTTP Cookie 可通过请求头 Cookie 和响应头 Set-Cookie 访问。

虽然可以直接操作这些头部，但 SolidStart 所依赖的服务器工具 Vinxi 提供了辅助方法来简化 Cookie 管理。

更多信息请参阅 Vinxi 的 Cookies 文档。

```tsx
import { createMiddleware } from "@solidjs/start/middleware";
import { getCookie, setCookie } from "vinxi/http";

export default createMiddleware({
  onRequest: (event) => {
    // Reading a cookie
    const theme = getCookie(event.nativeEvent, "theme");

    // Setting a secure session cookie with expiration
    setCookie(event.nativeEvent, "session", "abc123", {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24, // 1 day
    });
  },
});
```

### 自定义响应

从中间件函数返回一个值会立即终止请求处理流程，并将该返回值作为响应发送给客户端。这意味着后续的中间件函数或路由处理器将不会再被执行。

```tsx
import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
  onRequest: () => {
    return new Response("Unauthorized", { status: 401 });
  },
});
```

中间件函数只能返回 Response 对象。返回任何其他类型的值都会导致错误。

#### 重定向

Solid Router 提供了 redirect 辅助函数，用于简化创建重定向响应的操作。

```tsx
import { createMiddleware } from "@solidjs/start/middleware";
import { redirect } from "@solidjs/router";

const REDIRECT_MAP: Record<string, string> = {
  "/signup": "/auth/signup",
  "/login": "/auth/login",
};

export default createMiddleware({
  onRequest: (event) => {
    const { pathname } = new URL(event.request.url);

    // Redirecting legacy routes permanently to new paths
    if (pathname in REDIRECT_MAP) {
      return redirect(REDIRECT_MAP[pathname], 301);
    }
  },
});
```

在这个示例中，会检查请求的路径，如果匹配预定义路径，则返回重定向响应。301 状态码表示永久重定向。根据需要，也可以使用其他重定向状态码，例如 302 或 307。

#### JSON 响应

Solid Router 提供了 json 辅助函数，用于简化发送自定义 JSON 响应的操作。

```tsx
import { createMiddleware } from "@solidjs/start/middleware";
import { json } from "@solidjs/router";

export default createMiddleware({
  onRequest: (event) => {
    // Rejecting unauthorized API requests with a JSON error
    const authHeader = event.request.headers.get("Authorization");
    if (!authHeader) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }
  },
});
```

### 链式中间件

在 createMiddleware 中，onRequest 和 onBeforeResponse 可以接受单个函数或中间件函数数组。

当提供数组时，这些函数会在同一生命周期事件中按顺序执行。

这使得可以组合多个小型、专注的中间件函数，而不是将所有逻辑放在一个庞大的中间件函数中处理。

```tsx
import { createMiddleware } from "@solidjs/start/middleware";
import { type FetchEvent } from "@solidjs/start/server";

function middleware1(event: FetchEvent) {
  event.request.headers.set("x-custom-header1", "hello-from-middleware1");
}

function middleware2(event: FetchEvent) {
  event.request.headers.set("x-custom-header2", "hello-from-middleware2");
}

export default createMiddleware({
  onRequest: [middleware1, middleware2],
});

```

数组中中间件函数的顺序决定了它们的执行顺序。

有依赖关系的中间件应放在其依赖的中间件之后。例如，身份验证中间件通常应在日志记录中间件之前运行。

## 会话

会话使 Web 应用能够在用户请求之间保持状态。

由于 HTTP 是无状态的，每个请求都是独立处理的。会话通过让服务器识别来自同一用户的多个请求来解决这一问题，这对于跟踪身份验证状态和用户偏好非常有用。

### 会话的工作原理

一个会话通常包括以下几个步骤：

1. 会话创建：当需要跟踪用户（例如登录或首次访问时），服务器会创建一个会话。此过程包括生成唯一的会话 ID，并将会话数据加密签名后存储在 Cookie 中。
2. 会话 Cookie 传输：服务器通过 Set-Cookie HTTP 头发送会话 Cookie，指示浏览器存储该 Cookie。
3. 后续请求：浏览器在后续向服务器发送的请求中，会自动在 Cookie HTTP 头中携带该会话 Cookie。
4. 会话检索与数据访问：每次请求时，服务器检查会话 Cookie，如果存在则检索会话数据，并解密、验证签名，以便应用访问和使用这些数据。
5. 会话过期与销毁：会话通常会在一定时间后过期或用户登出时销毁，会通过设置 Cookie 的 Max-Age 属性或发送带有过期日期的 Set-Cookie 头来完成。

> 以上大多数步骤通常由会话辅助工具（session helpers）自动管理。

### 数据库存储会话

对于大型应用或需要更高级会话管理的场景，可以将会话数据存储在数据库中。其工作方式与基于 Cookie 的方法类似，但有几个关键区别：

1. 会话数据存储：会话数据存储在数据库中，并与会话 ID 关联。
2. Cookie 内容：Cookie 中只存储会话 ID，而不存储完整的会话数据。
3. 数据检索：服务器通过会话 ID 从数据库中检索会话数据，而不是直接从 Cookie 获取。
4. 会话过期：当会话过期时，不仅删除 Cookie，同时还需要删除数据库中对应的会话记录。

> 注意：SolidStart 不会自动处理数据库交互，你需要自行实现数据库存储和读取逻辑。

### 会话助手

Vinxi（SolidStart 的底层服务工具包）提供了一些会话助手函数，用于简化会话管理。主要包括：

- useSession：初始化一个会话或获取现有会话，返回会话对象。
- getSession：获取当前会话或初始化一个新会话。
- updateSession：更新当前会话中的数据。
- clearSession：清除当前会话。

> 这些助手仅在服务器端上下文中可用，例如在服务器函数或 API 路由中。这是因为会话管理需要访问服务器资源，以及设置和获取 HTTP 头的能力。

### 创建会话

**useSession** 是创建和管理会话的主要方法。它提供了一个完整的接口来执行所有会话操作，包括初始化、读取、更新和清除会话数据。

```tsx
import { useSession } from "vinxi/http";

type SessionData = {
  theme: "light" | "dark";
};

export async function useThemeSession() {
  "use server";
  const session = await useSession<SessionData>({
    password: process.env.SESSION_SECRET as string,
    name: "theme",
  });

  if (!session.data.theme) {
    await session.update({
      theme: "light",
    });
  }

  return session;
}
```

在这个示例中，useThemeSession 服务器函数会创建一个会话，用于存储用户的主题偏好设置。

useSession 需要一个强密码来加密并签署会话 Cookie。该密码长度必须至少为 32 个字符，并且应保持高度安全。强烈建议将此密码存储在私有环境变量中（如上例所示），而不是硬编码在源代码中。

可以使用以下命令生成密码：

```shell
openssl rand -base64 32
```

useSession 会向当前的服务器响应添加一个 Set-Cookie HTTP 头。默认情况下，Cookie 名称为 h3，但可以通过 name 选项自定义，如上例所示。

### 获取会话数据

useSession 辅助函数通过 data 属性提供对当前请求会话数据的访问。

```tsx
export async function getThemeSession() {
  "use server";
  const session = await useThemeSession();

  return session.data.theme;
}
```

### 更新会话数据

useSession 辅助函数提供 update 方法，用于更新当前请求的会话数据。

```tsx
export async function updateThemeSession(data: SessionData) {
  "use server";
  const session = await useThemeSession();
  await session.update(data);
}
```

### 清除会话数据

useSession 辅助函数提供 clear 方法，用于清除当前请求的会话数据。

```tsx
export async function clearThemeSession() {
  "use server";
  const session = await useThemeSession();
  await session.clear();
}
```

## 请求事件

在 SolidStart 中，请求事件可以通过 getRequestEvent（来自 @solidjs/web）获取。这些请求事件可以在服务器端的任意位置发生。

### Locals

SolidStart 使用 event.locals 来传递局部上下文，以便在需要时共享数据。

在向 event.locals 添加字段时，可以为这些字段指定类型：

```tsx
/// <reference types="@solidjs/start/env" />
declare module App {
  interface RequestEventLocals {
    /**
     * Declare your getRequestEvent().locals here
     */
  }
}

```

### nativeEvent

有时仍然需要访问底层的 Vinxi 事件。这可以通过 .nativeEvent 属性获取，它指向底层使用的 H3Event，并可以传递给生态系统中可用的辅助函数。需要注意的是，Vinxi 的 HTTP 辅助函数不会进行 tree-shaking，因此只能在不包含客户端或同构代码的文件中导入它们。

另外，许多这些事件支持异步本地存储（Async Local Storage），因此在某些情况下可能不需要直接访问 nativeEvent。

## 返回响应

在 SolidStart 中，可以从服务器函数返回一个 Response 对象。solid-router 能够通过其 query 和 action API 处理特定类型的响应。

对于 TypeScript，当使用 solid-router 的 redirect、reload 或 json 辅助函数返回响应时，这些操作不会影响服务器函数的返回值类型。

虽然建议根据函数类型对错误进行不同处理，但你始终可以选择返回或抛出一个 Response 对象。

### 示例

在下面的例子中，hello 函数将返回一个类型为 Promise<{ hello: string }> 的值：

```tsx
import { json } from "@solidjs/router";
import { GET } from "@solidjs/start";

const hello = GET(async (name: string) => {
  "use server";
  return json(
    { hello: new Promise<string>((r) => setTimeout(() => r(name), 1000)) },
    { headers: { "cache-control": "max-age=60" } }
  );
});
```

然而，在这个例子中，由于 redirect 和 reload 的返回类型为 never，getUser 函数只能返回类型为 Promise\<User> 的值：

```tsx
export async function getUser() {
  "use server";

  const session = await getSession();
  const userId = session.data.userId;
  if (userId === undefined) return redirect("/login");

  try {
    const user: User = await db.user.findUnique({ where: { id: userId } });
    // throwing can be awkward.
    if (!user) return redirect("/login");
    return user;
  } catch {
    // do stuff
    throw redirect("/login");
  }
}
```

## 认证

服务器函数可以用于保护敏感资源，例如用户数据。

```tsx
"use server"

async function getPrivatePosts() {
  const user = await getUser()
  if(!user) {
    return null  // or throw an error
  }

  return db.getPosts({ userId: user.id, private: true })
}
```

getUser 函数可以通过会话（sessions）来实现。

### 受保护的路由

可以通过在获取数据时检查用户或会话对象来保护路由。下面的示例使用了 Solid Router。

```tsx
const getPrivatePosts = query(async function() {
  "use server"
  const user = await getUser()
  if(!user) {
    throw redirect("/login");
  }

  return db.getPosts({ userId: user.id, private: true })
})

export default function Page() {
  const posts = createAsync(() => getPrivatePosts());
}

```

一旦用户访问此路由，路由器将尝试获取 getPrivatePosts 数据。如果用户尚未登录，getPrivatePosts 会抛出异常，路由器随后会重定向到登录页面。

## WebSocket 端点

WebSocket 端点可以通过在 Start 配置中指定的 ws 处理器文件来包含。请注意，这个功能在 Nitro 服务器上仍属实验性，其配置可能会在 SolidStart 的未来版本中发生变化，请谨慎使用。

```tsx
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    experimental: {
      websocket: true,
    },
  },
}).addRouter({
  name: "ws",
  type: "http",
  handler: "./src/ws.ts",
  target: "server",
  base: "/ws",
});
```

在 ws 文件中，你可以导出一个 eventHandler 函数来管理 WebSocket 连接和事件：

```tsx
import { eventHandler } from "vinxi/http";

export default eventHandler({
  handler() {},
  websocket: {
    async open(peer) {
      console.log("open", peer.id, peer.url);
    },
    async message(peer, msg) {
      const message = msg.text();
      console.log("msg", peer.id, peer.url, message);
    },
    async close(peer, details) {
      console.log("close", peer.id, peer.url);
    },
    async error(peer, error) {
      console.log("error", peer.id, peer.url, error);
    },
  },
});
```

# 指南

## 安全性

### XSS（跨站脚本攻击）

Solid 会自动对传入 JSX 表达式的值进行转义，以降低 XSS 攻击的风险。然而，这种保护不会应用于 innerHTML。

为了保护应用免受 XSS 攻击，应注意以下几点：

- 尽量避免使用 innerHTML。如果必须使用，请确保使用像 DOMPurify 这样的库对用户提供的数据进行清理。
- 验证和清理用户输入，尤其是在服务端和客户端的表单输入。
- 设置内容安全策略（CSP, Content Security Policy）。
- 对 \<noscript> 元素内的用户提供数据相关属性进行清理，包括 \<noscript> 本身的属性及其子元素。
- 强烈建议阅读《跨站脚本攻击防护备忘单》（Cross Site Scripting Prevention Cheat Sheet）以获取更多指导。

### 内容安全策略（CSP）

要配置 Content-Security-Policy HTTP 头，可以使用中间件实现。

#### 使用 nonce（推荐）

如果希望使用带 nonce 的严格 CSP，可按以下步骤操作：

1. **创建中间件**

   - 在中间件中配置 CSP 头。
   - 使用 onRequest 事件注册该中间件。

2. **生成 nonce**

   - 使用加密随机值生成器（例如 Node.js 的 crypto 模块中的 randomBytes 函数）生成 nonce。

3. **存储 nonce**

   - 将生成的 nonce 存储在 locals 对象中，以便在请求生命周期中访问。

4. **在服务器入口中使用 nonce**

   - 配置 SolidStart，在 entry-server.tsx 文件中将 nonce 应用于需要的标签（如 \<script> 或 \<style>）。

> `Middleware`


```tsx
import { createMiddleware } from "@solidjs/start/middleware";
import { randomBytes } from "crypto";

export default createMiddleware({
  onRequest: (event) => {
    const nonce = randomBytes(16).toString("base64");

    event.locals.nonce = nonce;

    const csp = `
      default-src 'self';
      script-src 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval';
      object-src 'none';
      base-uri 'none';
      frame-ancestors 'none';
      form-action 'self';
    `.replace(/\s+/g, " ");

    event.response.headers.set("Content-Security-Policy", csp);
  },
});
```

> `entry-server.tsx`

```tsx
import { createMiddleware } from "@solidjs/start/middleware";
import { randomBytes } from "crypto";

export default createMiddleware({
  onRequest: (event) => {
    const nonce = randomBytes(16).toString("base64");

    event.locals.nonce = nonce;

    const csp = `
      default-src 'self';
      script-src 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval';
      object-src 'none';
      base-uri 'none';
      frame-ancestors 'none';
      form-action 'self';
    `.replace(/\s+/g, " ");

    event.response.headers.set("Content-Security-Policy", csp);
  },
});
```

#### 不使用 nonce 的 CSP

要在不使用 nonce 的情况下配置 CSP，需要一个设置 CSP 头的中间件，并且应在 onBeforeResponse 事件中注册运行。

```tsx
import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
  onBeforeResponse: (event) => {
    const csp = `
      default-src 'self';
      font-src 'self'  ;
      object-src 'none';
      base-uri 'none';
      frame-ancestors 'none';
      form-action 'self';
    `.replace(/\s+/g, " ");

    event.response.headers.set("Content-Security-Policy", csp);
  },
});

```

### 跨域资源共享 (CORS)

当其他应用需要访问 API 接口时，需要一个配置 CORS 头的中间件。

```tsx
import { createMiddleware } from "@solidjs/start/middleware";
import { json } from "@solidjs/router";

const TRUSTED_ORIGINS = ["https://my-app.com", "https://another-app.com"];

export default createMiddleware({
  onBeforeResponse: (event) => {
    const { request, response } = event;

    response.headers.append("Vary", "Origin, Access-Control-Request-Method");

    const origin = request.headers.get("Origin");
    const requestUrl = new URL(request.url);
    const isApiRequest = requestUrl && requestUrl.pathname.startsWith("/api");

    if (isApiRequest && origin && TRUSTED_ORIGINS.includes(origin)) {
      // Handle preflight requests.
      if (
        request.method === "OPTIONS" &&
        request.headers.get("Access-Control-Request-Method")
      ) {
        // Preflight requests are standalone, so we immediately send a response.
        return json(null, {
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "OPTIONS, POST, PUT, PATCH, DELETE",
            "Access-Control-Allow-Headers": "Authorization, Content-Type",
          },
        });
      }

      // Handle normal requests.
      response.headers.set("Access-Control-Allow-Origin", origin);
    }
  },
});
```

#### 跨站请求伪造 (CSRF)

为了防止 CSRF 攻击，可以使用中间件来阻止不可信的请求。

```tsx
import { createMiddleware } from "@solidjs/start/middleware";
import { json } from "@solidjs/router";

const SAFE_METHODS = ["GET", "HEAD", "OPTIONS", "TRACE"];
const TRUSTED_ORIGINS = ["https://another-app.com"];

export default createMiddleware({
  onRequest: (event) => {
    const { request } = event;

    if (!SAFE_METHODS.includes(request.method)) {
      const requestUrl = new URL(request.url);
      const origin = request.headers.get("Origin");

      // If we have an Origin header, check it against our allowlist.
      if (origin) {
        const parsedOrigin = new URL(origin);

        if (
          parsedOrigin.origin !== requestUrl.origin &&
          !TRUSTED_ORIGINS.includes(parsedOrigin.host)
        ) {
          return json({ error: "origin invalid" }, { status: 403 });
        }
      }

      // If we are serving via TLS and have no Origin header, prevent against
      // CSRF via HTTP man-in-the-middle attacks by enforcing strict Referer
      // origin checks.
      if (!origin && requestUrl.protocol === "https:") {
        const referer = request.headers.get("Referer");

        if (!referer) {
          return json({ error: "referer not supplied" }, { status: 403 });
        }

        const parsedReferer = new URL(referer);

        if (parsedReferer.protocol !== "https:") {
          return json({ error: "referer invalid" }, { status: 403 });
        }

        if (
          parsedReferer.host !== requestUrl.host &&
          !TRUSTED_ORIGINS.includes(parsedReferer.host)
        ) {
          return json({ error: "referer invalid" }, { status: 403 });
        }
      }
    }
  },
});
```

这个示例展示了一个基本的 CSRF 防护机制，它会验证请求的 Origin 和 Referer 头，从不可信的来源阻止请求。此外，还应考虑实现更健全的 CSRF 防护方法，例如“双重提交 Cookie（Double-Submit Cookie）”模式。

## 数据获取

SolidStart 构建在 Solid 之上，并默认使用 Solid Router。这意味着你可以在 SolidStart 中使用它们各自的数据获取原语。由于 SolidStart 本身提供的数据获取 API 非常有限，大多数功能来自 Solid 和 Solid Router。

> 提示：本指南提供了使用这些原语进行常见数据获取任务的实用示例。

下面是一个简单的示例：

```tsx
// src/routes/index.tsx
import { For } from "solid-js";
import { query, createAsync } from "@solidjs/router";

const getPosts = query(async () => {
  const posts = await fetch("https://my-api.com/posts");
  return await posts.json();
}, "posts");

export default function Page() {
  const posts = createAsync(() => getPosts());
  return (
    <ul>
      <For each={posts()}>{(post) => <li>{post.title}</li>}</For>
    </ul>
  );
}
```

在这个示例中，创建了一个查询。为了在组件中访问其数据，使用了 createAsync 原语。

### 显示加载界面

要在数据获取期间展示加载 UI：

- 从 solid-js 导入 Suspense。
- 使用 \<Suspense> 包裹数据渲染部分，并通过 fallback 属性在数据获取时显示一个组件。

```tsx
// src/routes/index.tsx
import { Suspense, For } from "solid-js";
import { query, createAsync } from "@solidjs/router";

const getPosts = query(async () => {
  const posts = await fetch("https://my-api.com/posts");
  return await posts.json();
}, "posts");

export default function Page() {
  const posts = createAsync(() => getPosts());
  return (
    <ul>
      <Suspense fallback={<div>Loading...</div>}>
        <For each={posts()}>{(post) => <li>{post.title}</li>}</For>
      </Suspense>
    </ul>
  );
}
```

### 处理错误

要在数据获取失败时展示备用 UI：

- 从 solid-js 导入 ErrorBoundary。
- 使用 \<ErrorBoundary> 包裹数据渲染部分，并通过 fallback 属性在发生错误时显示一个组件。

```tsx
// src/routes/index.tsx
import { ErrorBoundary, Suspense, For } from "solid-js";
import { query, createAsync } from "@solidjs/router";

const getPosts = query(async () => {
  const posts = await fetch("https://my-api.com/posts");
  return await posts.json();
}, "posts");

export default function Page() {
  const posts = createAsync(() => getPosts());
  return (
    <ul>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <For each={posts()}>{(post) => <li>{post.title}</li>}</For>
        </Suspense>
      </ErrorBoundary>
    </ul>
  );
}
```

### 预加载数据

在用户导航时，可以通过 **预加载数据** 来优化数据获取：

- 导出一个带有 preload 函数的路由对象。
- 在 preload 函数中运行你的查询。
- 在组件中像往常一样使用该查询。

```tsx
// src/routes/index.tsx
import { ErrorBoundary } from "solid-js";
import { query, createAsync, type RouteDefinition } from "@solidjs/router";

const getPosts = query(async () => {
  const posts = await fetch("https://my-api.com/posts");
  return await posts.json();
}, "posts");

export const route = {
  preload: () => getPosts(),
} satisfies RouteDefinition;

export default function Page() {
  const post = createAsync(() => getPosts());
  return (
    <div>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <h1>{post().title}</h1>
      </ErrorBoundary>
    </div>
  );
}
```

### 向查询传递参数

当创建一个需要参数的查询时，可以把查询函数定义为接收任意数量的参数：

```tsx
// src/routes/posts/[id]/index.tsx
import { ErrorBoundary } from "solid-js";
import { query, createAsync, type RouteDefinition } from "@solidjs/router";

const getPost = query(async (id: string) => {
  const post = await fetch(`https://my-api.com/posts/${id}`);
  return await post.json();
}, "post");

export const route = {
  preload: ({ params }) => getPost(params.id),
} satisfies RouteDefinition;

export default function Page() {
  const postId = 1;
  const post = createAsync(() => getPost(postId));
  return (
    <div>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <h1>{post().title}</h1>
      </ErrorBoundary>
    </div>
  );
}
```

### 使用数据库或 ORM

为了在查询中安全地与数据库或 ORM 交互，需要确保它仅在服务器端运行。

方法是在查询的第一行加上 "use server"：

```tsx
// src/routes/index.tsx
import { For, ErrorBoundary } from "solid-js";
import { query, createAsync, type RouteDefinition } from "@solidjs/router";
import { db } from "~/lib/db";

const getPosts = query(async () => {
  "use server";
  return await db.from("posts").select();
}, "posts");

export const route = {
  preload: () => getPosts(),
} satisfies RouteDefinition;

export default function Page() {
  const posts = createAsync(() => getPosts());
  return (
    <ul>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <For each={posts()}>{(post) => <li>{post.title}</li>}</For>
      </ErrorBoundary>
    </ul>
  );
}
```

### 在客户端获取数据

如果只想在客户端获取数据，可以使用 **createResource** 原语：

```tsx
// src/routes/index.tsx
import { createResource, ErrorBoundary, Suspense, For } from "solid-js";

export default function Page() {
  const [posts] = createResource(async () => {
    const posts = await fetch("https://my-api.com/posts");
    return await posts.json();
  });
  return (
    <ul>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <For each={posts()}>{(post) => <li>{post.title}</li>}</For>
        </Suspense>
      </ErrorBoundary>
    </ul>
  );
}
```

## 数据变更

本指南提供了在 **SolidStart** 中使用 **actions** 进行数据变更的实用示例。

### 处理表单提交

要用 action 处理 \<form> 的提交：

1. 确保 action 有唯一的名称。

2. 将 action 通过 action 属性传递给 \<form> 元素。

3. 确保 \<form> 元素使用 post 方法提交。

4. 在 action 中使用 **FormData** 对象，通过其原生方法提取表单字段数据。

```tsx
// src/routes/index.tsx
import { action } from "@solidjs/router";

const addPost = action(async (formData: FormData) => {
  const title = formData.get("title") as string;
  await fetch("https://my-api.com/posts", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}, "addPost");

export default function Page() {
  return (
    <form action={addPost} method="post">
      <input name="title" />
      <button>Add Post</button>
    </form>
  );
}
```

### 传递额外参数

要给你的 **action** 传递额外的参数，可以使用 **with** 方法：

```tsx
// src/routes/index.tsx
import { action } from "@solidjs/router";

const addPost = action(async (userId: number, formData: FormData) => {
  const title = formData.get("title") as string;
  await fetch("https://my-api.com/posts", {
    method: "POST",
    body: JSON.stringify({ userId, title }),
  });
}, "addPost");

export default function Page() {
  const userId = 1;
  return (
    <form action={addPost.with(userId)} method="post">
      <input name="title" />
      <button>Add Post</button>
    </form>
  );
}
```

### 显示 Pending UI

要在 **action** 执行过程中展示一个 *pending* 状态的 UI：

- 从 **@solidjs/router** 导入 useSubmission。
- 使用你的 **action** 调用 useSubmission，并利用返回的 pending 属性来显示 *pending UI*。

```tsx
// src/routes/index.tsx
import { action, useSubmission } from "@solidjs/router";

const addPost = action(async (formData: FormData) => {
  const title = formData.get("title") as string;
  await fetch("https://my-api.com/posts", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}, "addPost");

export default function Page() {
  const submission = useSubmission(addPost);
  return (
    <form action={addPost} method="post">
      <input name="title" />
      <button disabled={submission.pending}>
        {submission.pending ? "Adding..." : "Add Post"}
      </button>
    </form>
  );
}
```

### 处理错误

要处理 **action** 中发生的错误：

- 从 **@solidjs/router** 导入 useSubmission。
- 使用你的 **action** 调用 useSubmission，并利用返回的 error 属性来处理错误。

```tsx
// src/routes/index.tsx
import { Show } from "solid-js";
import { action, useSubmission } from "@solidjs/router";

const addPost = action(async (formData: FormData) => {
  const title = formData.get("title") as string;
  await fetch("https://my-api.com/posts", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}, "addPost");

export default function Page() {
  const submission = useSubmission(addPost);
  return (
    <form action={addPost} method="post">
      <Show when={submission.error}>
        <p>{submission.error.message}</p>
      </Show>
      <input name="title" />
      <button>Add Post</button>
    </form>
  );
}
```

### 验证表单字段

要在 **action** 中验证表单字段：

- 在你的 **action** 中添加验证逻辑，如果数据无效则返回验证错误。
- 从 **@solidjs/router** 导入 useSubmission。
- 使用你的 **action** 调用 useSubmission，并利用返回的 result 属性来处理错误。

```tsx
// src/routes/index.tsx
import { Show } from "solid-js";
import { action, useSubmission } from "@solidjs/router";

const addPost = action(async (formData: FormData) => {
  const title = formData.get("title") as string;
  if (!title || title.length < 2) {
    return {
      error: "Title must be at least 2 characters",
    };
  }
  await fetch("https://my-api.com/posts", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}, "addPost");

export default function Page() {
  const submission = useSubmission(addPost);
  return (
    <form action={addPost} method="post">
      <input name="title" />
      <Show when={submission.result?.error}>
        <p>{submission.result?.error}</p>
      </Show>
      <button>Add Post</button>
    </form>
  );
}
```

### 显示乐观 UI

在服务器响应前更新界面的方法：

- 从 **@solidjs/router** 导入 useSubmission。
- 使用你的 **action** 调用 useSubmission，并利用返回的 pending 和 input 属性来显示乐观 UI。

```tsx
// src/routes/index.tsx
import { For, Show } from "solid-js";
import { action, useSubmission, query, createAsync } from "@solidjs/router";

const getPosts = query(async () => {
  const posts = await fetch("https://my-api.com/blog");
  return await posts.json();
}, "posts");

const addPost = action(async (formData: FormData) => {
  const title = formData.get("title");
  await fetch("https://my-api.com/posts", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}, "addPost");

export default function Page() {
  const posts = createAsync(() => getPosts());
  const submission = useSubmission(addPost);
  return (
    <main>
      <form action={addPost} method="post">
        <input name="title" />
        <button>Add Post</button>
      </form>
      <ul>
        <For each={posts()}>{(post) => <li>{post.title}</li>}</For>
        <Show when={submission.pending}>
          {submission.input?.[0]?.get("title")?.toString()}
        </Show>
      </ul>
    </main>
  );
}
```

> 📚 **多个提交**
>
> 如果你希望为多个并发提交显示乐观 UI，可以使用 useSubmissions 这个原语（primitive）。

### 重定向

在 action 内重定向用户到另一个路由：

1. 从 @solidjs/router 导入 redirect。
2. 使用你希望导航到的路由调用 redirect，并抛出其返回的响应。

```tsx
// src/routes/index.tsx
import { action, redirect } from "@solidjs/router";

const addPost = action(async (formData: FormData) => {
  const title = formData.get("title") as string;
  const response = await fetch("https://my-api.com/posts", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
  const post = await response.json();
  throw redirect(`/posts/${post.id}`);
}, "addPost");

export default function Page() {
  return (
    <form action={addPost} method="post">
      <input name="title" />
      <button>Add Post</button>
    </form>
  );
}
```

### 使用数据库或 ORM

要在 action 中安全地与数据库或 ORM 交互，确保代码仅在服务器上运行，可以在 action 的第一行添加 "use server"：

```tsx
// src/routes/index.tsx
import { action } from "@solidjs/router";
import { db } from "~/lib/db";

const addPost = action(async (formData: FormData) => {
  "use server";
  const title = formData.get("title") as string;
  await db.insert("posts").values({ title });
}, "addPost");

export default function Page() {
  return (
    <form action={addPost} method="post">
      <input name="title" />
      <button>Add Post</button>
    </form>
  );
}
```

### 以编程方式调用 action

要以编程方式调用 action：

1. 从 @solidjs/router 导入 useAction。
2. 使用 useAction 调用你的 action，并使用返回的函数来执行该 action。

```tsx
// src/routes/index.tsx
import { createSignal } from "solid-js";
import { action, useAction } from "@solidjs/router";

const addPost = action(async (title: string) => {
  await fetch("https://my-api.com/posts", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}, "addPost");

export default function Page() {
  const [title, setTitle] = createSignal("");
  const addPostAction = useAction(addPost);
  return (
    <div>
      <input value={title()} onInput={(e) => setTitle(e.target.value)} />
      <button onClick={() => addPostAction(title())}>Add Post</button>
    </div>
  );
}
```

## Service Workers

要注册一个 service worker：

1. 将你的 service-worker 文件放在 public 目录下（例如 public/sw.js），使其可以通过根 URL 访问（/sw.js）。
2. 在 entry-client.tsx 文件中添加注册逻辑。

```tsx
// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";

mount(() => <StartClient />, document.getElementById("app")!);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
```

