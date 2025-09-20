# 概述

Signal 是在 Solid 应用中管理状态的主要手段。它提供了一种存储和更新值的方式，同时也是 Solid 响应式系统的基础。

Signal 可以表示应用中的任何类型的状态，例如当前用户、当前页面或当前主题。它可以是任意值，包括基本类型（如字符串和数字）或复杂类型（如对象和数组）。

# 创建信号

可以通过调用从 solid-js 导入的 createSignal 函数来创建 Signal。该函数接收一个初始值作为参数，并返回一对函数：一个获取值的函数（getter）和一个设置值的函数（setter）。

```tsx
import { createSignal } from "solid-js";
const [count, setCount] = createSignal(0);
- getter：count
- setter：setCount
```

> 提示：
>
> 使用 [ ] 的语法称为数组解构（array destructuring）。
>
> 它可以从数组中提取值。在 createSignal 的上下文中，第一个值是获取函数（getter），第二个值是设置函数（setter）。

# 访问值

createSignal 返回的获取函数（getter）用于访问 Signal 的值。调用该函数时无需传入参数，就可以获取当前的 Signal 值：

```tsx
console.log(count()); // output: 0
```

# 更新值

createSignal 返回的设置函数（setter）用于更新 Signal 的值。该函数接收一个参数，表示 Signal 的新值：

```tsx
setCount(count() + 1);

console.log(count()); // output: 1
```

设置函数（setter）也可以接收一个函数作为参数，该函数会接收之前的值作为输入。

```tsx
setCount((prevCount) => prevCount + 1);

console.log(count()); // output: 1
```

# 响应性

Signal 是响应式的，这意味着当它的值发生变化时，会自动更新。当 Signal 在跟踪作用域（tracking scope）中被调用时，它会将依赖添加到订阅者列表中。一旦 Signal 的值发生变化，它会通知所有依赖的订阅者，使它们重新计算值并相应更新。

```tsx
function Counter() {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount((prev) => prev + 1);

  return (
    <div>
      <span>Count: {count()}</span> {/* Updates when `count` changes */}
      <button type="button" onClick={increment}>
        Increment
      </button>
    </div>
  );
}
```

> 提示：
>
> 跟踪作用域可以通过 createEffect 或 createMemo 创建，它们是 Solid 的其他基础功能。
>
> 这两个函数会订阅在其内部访问的 Signal，从而建立依赖关系。一旦依赖关系建立，当 Signal 发生变化时，函数就会收到通知。
