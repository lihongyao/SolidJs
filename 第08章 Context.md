# 概述

Context 提供了一种在组件树中传递数据的方式，无需在每一层都手动向下传递属性。

# 何时使用上下文

当您拥有一个需要共享状态的大型组件树时，可以使用上下文。可以利用上下文来避免 **属性透传** 现象，即通过中间元素传递属性但不直接使用它们的做法。

如果您希望避免将某些属性通过多层传递，那么在可行的情况下，调整组件层次结构可能是一个更简单的解决办法。信号通常是最简单的解决方案，因为它们可以直接导入到需要它们的组件中。

然而，Context 的设计目的是用于共享应用程序的全局数据，或者用于存储应用程序组件树中多个组件经常访问的信息。这提供了一种在应用程序中跨组件访问状态的方法，无需通过中间层传递属性或直接将它们导入到组件中。

> **提示**：
>
> - 类似于 React 中的 Context。
> - 类似于 Vue 中的 Provide & Inject。

# 创建上下文

上下文是通过使用 createContext 函数来创建的。该函数具有 `Provider` 属性，用于包裹您想要为其提供上下文的组件树。

> **`@/context/create.ts`**

```ts
import { createContext } from "solid-js";

type AppContextProps = {
  version: string;
};

export const AppContext = createContext<AppContextProps | null>(null);
```

> **提示**：当传递多个值（以数组或对象的形式）时，建议使用存储（store）机制。

# 使用上下文

上下文创建之后，我们就可以基于上下文进行数据传递啦，请看示例：

> **`@/App.tsx`**

```tsx
import { AppContext } from "@/context";
import { useContext } from "solid-js";

const Child = () => {
  // -- 通过上下文获取数据
  const value = useContext(AppContext);
  return <div>{value?.version}</div>;
};
export default function App() {
  return (
    // -- 通过上下文注入传递数据
    <AppContext.Provider value={{ version: "1.0.0" }}>
      <Child />
    </AppContext.Provider>
  );
}

```

# 自定义上下文工具

当一个应用程序包含多个上下文对象时，可能会难以记住当前正在使用的具体是哪个上下文对象。为了解决这个问题，您可以创建一个自定义工具，以提供一种更易于理解的方式来访问上下文值。

例如，在构建组件树时，您可能希望创建一个自定义的 **提供者** 组件，以便能够用于包裹整个组件树。此外，这还为您提供了在应用程序的其他部分重复使用该 提供者 组件的选项（如果需要的话）。

> **`@/context/counter.ts`**

```ts
import { createContext } from "solid-js";
export const CounterContext = createContext<number>(0);
```

> **`@/provider/counter.tsx`**

```tsx
import { JSX } from "solid-js/jsx-runtime";
import { CounterContext } from "@/context/counter";

export default function CounterProvider(props: { children: JSX.Element; count: number }) {
  return <CounterContext.Provider value={props.count}>{props.children} </CounterContext.Provider>;
}
```

现在，如果要在应用程序的不同区域访问该提供者，您只需导入 CounterProvider  组件，并将其应用于整个组件树即可：

> **`@/App.tsx`**

```tsx
export default function App() {
  return (
    <CounterProvider count={1}>
      <h1>Welcome to Counter</h1>
      <NestedComponents />
    </CounterProvider>
  );
}

```

同样，您可以创建一个自定义工具来获取上下文值。无需在使用该功能的每个组件中导入 useContext 并传入上下文对象，而是创建一个定制的工具，这样就能更方便地获取您所需的数据：

```tsx
export function useCounter() {
  return useContext(CounterContext);
}
```

在本示例中，`useCounter()` 这个辅助函数现在可以被导入到任何需要访问上下文值的组件中：

```tsx
import { useCounter } from "./counter";

export function CounterProvider(props) {
  const count = useCounter();
  return (
    <>
      <div>{count()}</div>
    </>
  );
}
```

**实战：切换主题**

> **`@/context/ThemContext`**

```tsx
import { createContext, JSX, useContext } from "solid-js";

// -- 定义主题类型
type Theme = "light" | "dark";

// -- 定义上下文类型
type ThemeContextType = {
  theme: Theme;
};
// -- 定义主题上下文
export const ThemeContext = createContext<ThemeContextType | null>(null);

// -- 定义主题提供者
export function ThemeProvider(props: { children: JSX.Element; value: ThemeContextType }) {
  return <ThemeContext.Provider value={props.value}>{props.children}</ThemeContext.Provider>;
}

// -- 定义主题消费者
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

> **`@/App.tsx`**

```tsx
import { ThemeProvider, useTheme } from "./context/ThemContext";

const NestedComponents = () => {
  const value = useTheme();
  return <div>{value.theme}</div>;
};

export default function App() {
  return (
    <ThemeProvider value={{ theme: "dark" }}>
      <NestedComponents />
    </ThemeProvider>
  );
}
```

# 更新上下文值

信号提供了一种通过上下文来同步和管理跨组件共享数据的方法。您可以直接将信号传递给 Provider 组件的值属性，而对信号所做的任何更改都会反映在使用该上下文的所有组件中。

> **`@/context/Counter.tsx`**

```tsx
import { Accessor, createContext, createSignal, JSX, useContext } from "solid-js";

type CounterContextType = {
  count: Accessor<number>;
  increment: () => void;
  decrement: () => void;
};
export const CounterContext = createContext<CounterContextType | null>(null);

// -- 定义主题提供者
export function CounterProvider(props: { children: JSX.Element; initialCount: number }) {
  const [count, setCount] = createSignal(props.initialCount);
  const counter = {
    count,
    increment: () => setCount((prev) => prev + 1),
    decrement: () => setCount((prev) => prev - 1),
  };
  return <CounterContext.Provider value={counter}>{props.children}</CounterContext.Provider>;
}

export function useCounter() {
  const context = useContext(CounterContext);
  if (context === null) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
}

```

> **`@/App.tsx`**

```tsx
import { CounterProvider, useCounter } from "./context/Counter";

const NestedComponents = () => {
  const { count, increment, decrement } = useCounter();
  return (
    <>
      <div>{count()}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
};

export default function App() {
  return (
    <CounterProvider initialCount={1}>
      <NestedComponents />
    </CounterProvider>
  );
}

```

这提供了一种在组件之间管理状态的方法，无需通过中间元素来传递属性。



