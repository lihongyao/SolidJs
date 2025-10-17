# 概述

Effect 是在其依赖的 signal 发生变化时触发的函数。它们在管理副作用中起着关键作用，副作用指的是发生在应用范围之外的操作，例如 DOM 操作、数据获取和订阅等。

# 使用 Effects

Effect 是通过 createEffect 函数创建的。该函数接收一个回调作为参数，当 effect 被触发时，该回调会执行。

```tsx
import { createEffect } from "solid-js";

const [count, setCount] = createSignal(0);

createEffect(() => {
  console.log(count());
});
```

在这个例子中，创建了一个 effect，用于将当前的 count 值打印到控制台。当 count 的值发生变化时，effect 会被触发，从而再次运行并打印新的 count 值。

# 管理依赖项

Effect 可以设置为观察任意数量的依赖。依赖项使 effect 能够跟踪变化并做出相应的响应，这些依赖可以是 signal、变量、props、context 或其他响应式值。当其中任何一个发生变化时，effect 会收到通知并再次运行以更新状态。

在初始化时，effect 会运行一次，无论是否有依赖项。这对于设置 effect、初始化变量或订阅 signal 非常有用。在这次运行之后，effect 只有在其依赖项发生变化时才会被触发。

```tsx
createEffect(() => {
  console.log("hello"); // will run only once
});

createEffect(() => {
  console.log(count()); // will run every time count changes
});
```

Solid 会自动跟踪 effect 的依赖项，因此你无需手动指定。这不仅提升了依赖跟踪的准确性，也降低了遗漏或错误识别依赖项的可能性。

# 订阅信号

当一个 effect 被设置为观察某个 signal 时，它会对该 signal 创建一个订阅。这个订阅使 effect 能够跟踪 signal 值的变化，从而监测可能发生的任何变化，并相应地执行其回调函数。

```tsx
import { createSignal, createEffect } from "solid-js";

const [count, setCount] = createSignal(0);

createEffect(() => {
  console.log(count()); // Logs current value of count whenever it changes
});
```

## 管理多个信号

Effect 可以同时观察多个 signal。单个 effect 可以订阅多个 signal，同样，多个 effect 也可以跟踪同一个 signal。当需要基于多个 signal 更新 UI 时，这非常有用。

当单个 effect 中观察了多个 signal 时，只要任意一个 signal 发生变化，effect 就会执行其回调。即使只有其中一个 signal 变化，effect 也会运行，而不必等待所有 signal 都变化。这意味着 effect 会使用其观察的所有 signal 的最新值来运行。

```tsx
mport { createSignal, createEffect } from "solid-js";

const [count, setCount] = createSignal(0);
const [message, setMessage] = createSignal("Hello");

createEffect(() => {
  console.log(count(), message());
});

setCount(1); // Output: 1, "Hello"
setMessage("World"); // Output: 1, "World"
```

> **注意**：当一个 signal 更新时，它会按顺序通知所有订阅者，但顺序可能会有所不同。虽然当 signal 更新时，effect 一定会被触发，但执行可能不是即时的。这意味着 effect 的执行顺序不保证固定，因此不应依赖其顺序。

## 嵌套 Effects

在使用 effect 时，可以将它们嵌套在彼此内部。这使得每个 effect 都能独立跟踪自己的依赖，而不会影响其所嵌套的外部 effect。

```tsx
reateEffect(() => {
  console.log("Outer effect starts");
  createEffect(() => console.log("Inner effect"));
  console.log("Outer effect ends");
});
```

需要注意执行顺序。内部的 effect 不会影响外部的 effect。在内部 effect 中访问的 signal，不会被注册为外部 effect 的依赖。当内部 effect 中的 signal 发生变化时，只会触发内部 effect 重新运行，而不会影响外部 effect。

```tsx
import { createSignal, createEffect } from "solid-js";

const [count, setCount] = createSignal(0);

createEffect(() => {
  console.log("Outer effect starts");
  createEffect(() => console.log(count())); // when count changes, only this effect will run
  console.log("Outer effect ends");
});
```

这使得每个 effect 相互独立，有助于避免意外行为。此外，它还允许你创建仅在满足特定条件时才会触发的 effect。

# 生命周期函数 ??

Effect 具有生命周期，可通过某些函数对其进行管理。这些函数使您能够控制 Effect 的初始化和清理过程，从而实现您所需的行为类型。这可能包括仅运行一次副作用，或者在不再需要时清理任务。

## `onMount`

在您只想执行一次副作用的情况中，可以使用 onMount 函数。这个生命周期函数类似于 Effect，但它不会跟踪任何依赖项。相反，一旦组件已初始化完成，onMount 回调函数就会被执行，并且不会再再次运行。

```tsx
mport { onMount } from "solid-js";

function Component() {
  const [data, setData] = createSignal(null);

  createEffect(() => {
    data(); // will run every time data changes
  });

  onMount(async () => {
    // will run only once, when the component is mounted
    const fetchedData = await fetch("https://example.com/data");
    setData(fetchedData);
  });

  return <div>...</div>;
}
```

onMount 确保回调函数只会执行一次。如果在这种情况下使用 Effect，则无法保证它只会执行一次，这可能会导致意外的行为。因此，onMount 非常适合用于 API 调用和其他仅在每个组件实例中执行一次的副作用操作。

## `onCleanup`

onMount 可用于一次性执行一个副作用操作，而 onCleanup 则有助于在不再需要某个任务时对其进行清理。当组件卸载时，onCleanup 会自动运行，从而移除该效果所建立的所有订阅关系。

```tsx
mport { onCleanup } from "solid-js";

function App() {
  const [count, setCount] = createSignal(0);

  const timer = setInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return <div>Count: {count()}</div>;
}
```

在该示例中，onCleanup 函数用于清除在 Effect 中设置的定时器。为防止定时器无限期地运行，当组件卸载时，会使用 onCleanup 函数来清除该间隔。

onCleanup 可用于避免内存泄漏。内存泄漏通常发生在组件被卸载时，但对该组件的引用仍然存在，从而可能导致其仍在后台运行。通过使用 onCleanup 来移除对该组件的任何订阅或引用，可以有助于避免这种情况的发生。
