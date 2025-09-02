@See https://docs.solidjs.com/concepts/understanding-jsx

# 概述

JSX 是 JavaScript 的一种语法扩展，允许在 JavaScript 文件中直接编写类似 HTML 的代码，从而将渲染逻辑与内容集中在同一位置，提供了一种简洁且可读性高的组件创建与描述方式

# 如何使用？

Solid 的设计与 HTML 标准高度契合。

```jsx
const element = <h1>I'm JSX!!</h1>
```

然而，它提供了一个显著的优势：可以直接从诸如 Stack Overflow 等资源中复制/粘贴解决方案；并且能够直接使用来自设计工具的模板。Solid 的独特之处在于，它在返回 DOM 元素时立即使用 JSX。这使你能够在 HTML 中使用动态表达式，即通过花括号 (`{ }`) 引用变量和函数。

```jsx
const Component = () => {
  const animal = { breed: "cat", name: "Midnight" }

  return (
    <p>
      I have a {animal.breed} named {animal.name}!
    </p>
  )
}
```

这意味着 JavaScript 内容可以根据应用的状态或逻辑渲染到网页上。

此外，Solid 的响应式系统通过 JSX 引入了细粒度的响应式机制。当底层状态发生变化时，它只会更新 DOM 中必要的部分。

# 在 Solid 中使用 JSX

## 返回单一根元素

在 HTML 中，你可以在顶层使用不相连的标签，而 JSX 要求组件必须返回一个单一的根元素。

> 📖 进阶
>
> 在使用 JSX 时，代码的部分内容会被转换为结构化的 HTML，并放置在文件的开头。静态元素的处理方式与动态元素不同，动态元素可能会根据数据或用户操作而变化。对于动态元素，会添加特殊的标记，以便在渲染过程中更好地处理。
>
> 拥有一个单一的根元素能够创建一致且易于管理的层级结构，从而优化渲染和更新。

JSX 保持了 HTML 中常见的嵌套树状结构。因此，元素之间的父子关系更容易理解和追踪。

## 闭合所有标签

在 JSX 中，自闭合标签是必须的。不同于 HTML 中的 \<input>、\<img> 或 \<br> 等元素可以不显式闭合，JSX 要求统一使用自闭合标签。这有助于避免潜在的渲染问题。

```jsx
<img src="./image-here.png" />
```

## Properties vs. attributes

HTML attributes 和 JSX Properties 看起来相似，但它们的用途和行为有所不同。两者都可以用来指定配置或传递信息。然而，HTML 用于标准的网页内容，而 JSX 则用于创建 Solid 的组件逻辑。

### HTML attributes

HTML attributes 是直接设置在 HTML 元素上的值，它们为元素提供附加信息，以指导其初始行为和状态。当浏览器解析 HTML 时，这些特性通常会被转换为 DOM 对象上的属性。

在 JSX 文件中，HTML attributes 的用法与普通 HTML 类似，但由于 HTML 与 JavaScript 的融合，有几个关键区别：

- 事件监听器（如 onClick）既可以使用驼峰命名（camelCase），也可以使用小写。（注意：当使用 ESLint 时，如果使用小写会收到警告。）
- 在可以动态指定值的情况下，可以用花括号（`{ }`）来代替引号。

```jsx
<button class="myClass" onClick={handleClick}>
  Click me!
</button>
```

> **注意**
>
> 如果你想在 JSX 中传递对象（例如内联样式），就必须使用双层花括号（`{{ }}`）。
>
> ```jsx
> <button
>   style={{
>     "color": "red",
>     "font-size": "2rem",
>   }}
> >
>   Click me!
> </button>
> ```

### JSX properties (props)

JSX 属性（通常称为 **props**）用于在应用中向组件传递数据和配置。它们将组件与所需的数据连接起来，从而实现流畅的数据流动和动态交互。

**核心概念**

- **静态 props**：在 Solid 的 JSX 中，静态 props 会直接整合进 HTML，通过克隆模板并将其作为特性（attributes）使用。
- **动态 props**：动态 props 依赖于状态，使内容或属性能够动态变化。一个例子是根据应用中的交互来改变元素的样式。这通常通过信号（例如 `value={value()}`）来实现。
- **数据传递**：props 还用于将来自资源的数据（例如 createResource 调用）传递给组件。这样组件就能对数据变化做出实时响应。

> 注意：无论是静态还是动态的表达式，都会按照它们在 JSX 中定义的顺序应用。这适用于大多数 DOM 元素，但对于某些需要特定属性顺序的元素则无效，例如 type="range" 的 \<input>。
>
> 当属性顺序会影响元素行为时，开发者必须按照元素预期的顺序来定义表达式。
