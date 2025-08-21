

# 概述

Effects 是指当它们所依赖的信号发生变化时而被触发的函数。它们在管理副作用方面起着至关重要的作用，副作用指的是发生在应用程序范围之外的操作，例如 DOM 操作、数据获取以及订阅等。

# 使用 Effects

通过使用 `createEffect` 函数可以创建一个 Effect。该函数接收一个回调函数作为参数，当 Effect 被触发时，该回调函数会运行。

```tsx
import { createEffect } from "solid-js";

const [count, setCount] = createSignal(0);

createEffect(() => {
  console.log(count());
});
```

在这个示例中，创建了一个 Effect，该 Effect 会将计数器的当前值记录到控制台。当计数器的值发生变化时，该效果就会被触发，从而再次运行并记录计数器的新值。

# 管理依赖项

可以设置  Effect 以观察任意数量的依赖项。依赖项使得 Effect 能够追踪变化并做出相应反应。这些可以包括信号、变量、属性、上下文或任何其他具有响应性的值。当这些中的任何一个发生变化时，效果会收到通知并会再次运行以更新其状态。

在初始化时，无论该 Effect 是否有依赖项，都会执行一次。这对于设置 Effect、初始化变量或订阅信号非常有用。此后，只有当其任何依赖项发生变化时，该效果才会被触发。

```tsx
createEffect(() => {
  console.log("hello"); // will run only once
});

createEffect(() => {
  console.log(count()); // will run every time count changes
});
```

Solid 会自动追踪 Effect 的依赖关系，因此您无需手动指定这些依赖关系。这能提高追踪的准确性，并最大程度地减少遗漏或错误识别依赖关系的可能性。

# 订阅信号

当一个 Effect 被设置为观察某个信号时，它会创建对该信号的订阅。这种订阅使得该效果能够跟踪信号值的变化，从而使其能够监测任何可能发生的变化，并相应地执行其回调操作。

```tsx
import { createSignal, createEffect } from "solid-js";

const [count, setCount] = createSignal(0);

createEffect(() => {
  console.log(count()); // Logs current value of count whenever it changes
});
```

## 管理多个信号

Effect 具有同时观察多个信号的能力。单个 Effect 可以订阅多个信号，而多个 Effect 也可以跟踪单个信号。当您需要根据多个信号更新用户界面时，这一点非常有用。

当在一个单一 Effect 中观察到多个信号时，每当其中任何一个信号发生变化，该 Effect 就会执行其回调操作。即使只有一个信号发生变化，该 Effect 也会运行，不一定需要所有信号都发生变化。这意味着该 Effect 会根据其正在观察的所有信号的最新值来运行。

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

> **注意**：当信号更新时，它会依次通知所有订阅者，但通知顺序可能会有所不同。虽然信号更新时 Effect 一定会执行，但执行过程可能不会是即时的。这意味着 Effect 的执行顺序无法保证，也不应依赖于此。

## 嵌套 Effects

在处理 Effects 时，可以将它们相互嵌套。这样，每个效果都能够独立追踪自身的依赖关系，而不会影响其所在的嵌套效果。

```tsx
reateEffect(() => {
  console.log("Outer effect starts");
  createEffect(() => console.log("Inner effect"));
  console.log("Outer effect ends");
});
```

执行顺序非常重要，需要加以注意。内部 Effect 不会影响外部 Effect。在内部 Effect 中访问的信号不会被视为外部 Effect 的依赖项。当位于内部 Effect 中的信号发生变化时，只会触发内部 Effect 重新运行，而不会触发外部 Effect。

```tsx
import { createSignal, createEffect } from "solid-js";

const [count, setCount] = createSignal(0);

createEffect(() => {
  console.log("Outer effect starts");
  createEffect(() => console.log(count())); // when count changes, only this effect will run
  console.log("Outer effect ends");
});
```

这使得每个 Effect 都能相互独立，从而有助于避免出现意外情况。此外，它还允许您创建只有在特定条件满足时才会触发的 Effect。

# 生命周期函数

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
