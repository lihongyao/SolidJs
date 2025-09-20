@See https://docs.solidjs.com/solid-meta/

# 概述

**Solid Meta** 为 Solid 应用提供异步、SSR 就绪的 Document Head 管理，灵感来源于 React Head。

使用 Solid Meta，你可以在组件层级的任意位置定义 document.head 标签。这让你能够方便地管理标签，尤其是在特定标签的上下文信息深藏于组件层级内部时。

该库没有依赖项，并设计为可以无缝集成异步渲染。

# 安装与配置

## 安装

```shell
$ pnpm i @solidjs/meta
```

## 配置

1. 使用 \<MetaProvider /> 包裹你的应用。
2. 在应用中渲染以下组件来添加 head 标签：
   - \<Title />：设置页面标题。
   - \<Meta />：添加额外的元数据。
   - \<Style />：添加样式元素。
   - \<Link />：指定页面与外部资源的关系。
   - \<Base />：指定文档中所有相对 URL 的基准 URL。

> 这些组件可以在应用中多次使用。

3. 如果在服务器端使用 Solid 的 JSX，无需额外配置。

示例代码设置如下（可根据实际情况调整）：

```tsx
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";

const App = () => (
  <MetaProvider>
    <div class="Home">
      <Title>Title of page</Title>
      <Link rel="canonical" href="http://solidjs.com/" />
      <Meta name="example" content="whatever" />
    </div>
  </MetaProvider>
);
```

# 客户端设置

你可以在需要时通过渲染任意 head 标签组件将标签注入到 \<head /> 中。客户端不需要任何特殊配置。

```tsx
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";

const App = () => (
  <MetaProvider>
    <div class="Home">
      <Title>Title of page</Title>
      <Link rel="canonical" href="http://solidjs.com/" />
      <Meta name="example" content="whatever" />
      // ...
    </div>
  </MetaProvider>
);
```

# 服务器端设置

在服务器端，将应用用 \<MetaProvider /> 包裹。该组件使用 tags[] 数组，将 head 标签作为服务器渲染负载的一部分传递下去。服务器渲染完成后，组件会更新该数组以包含所有标签。

```tsx
import { renderToString, getAssets } from "solid-js/web";
import { MetaProvider } from "@solidjs/meta";
import App from "./App";

// ... within the context of a request ...
const app = renderToString(() => (
  <MetaProvider>
    <App />
  </MetaProvider>
));

res.send(`
  <!doctype html>
  <html>
    <head>
      ${getAssets()}
    </head>
    <body>
      <div id="root">${app}</div>
    </body>
  </html>
`);

```

