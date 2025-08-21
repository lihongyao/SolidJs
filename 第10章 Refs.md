# 概述

Refs 是一种可附加于任何元素的特殊属性，用于引用 DOM 元素或组件实例。当您需要直接访问 DOM 节点或调用组件的方法时，引用功能尤为有用。

# 基础用法

```tsx
export default function App() {
  let inputRef!: HTMLInputElement; // 声明ref变量
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => inputRef.focus()}>聚焦</button>
    </div>
  );
}
```

这些操作会在元素添加到 DOM 之前在创建时完成。如果在将元素添加到 DOM 之前需要访问该元素，您可以使用 ref 的回调形式：

# 动态元素处理

```tsx
import { createSignal, Show } from "solid-js";

export default function App() {
  const [show, setShow] = createSignal(false);
  let elRef!: HTMLDivElement;
  return (
    <>
      <button onClick={() => setShow(!show())}>切换</button>
      <Show when={show()}>
        <div ref={elRef}>动态内容</div>
      </Show>
    </>
  );
}
```

# Ref 转发模式

```tsx
// 父组件
function Parent() {
  let childRef;
  return <Child ref={childRef} />;
}

// 子组件
function Child(props) {
  return <div ref={props.ref}>子元素</div>;
}
```

# 指令系统

```tsx
// 定义指令
function autoFocus(el, accessor) {
  createEffect(() => {
    if (accessor()) el.focus()
  })
}

// 使用指令
<input use:autoFocus={shouldFocus} />
```

# 最佳实践对比

| 方法           | 适用场景       | 优点           | 注意事项         |
| :------------- | :------------- | :------------- | :--------------- |
| **基础ref**    | 静态元素访问   | 简单直接       | 需处理TS类型断言 |
| **回调ref**    | 创建时操作元素 | 更精细控制     | 注意渲染时机     |
| **Signal ref** | 条件渲染元素   | 响应式安全     | 需要空值检查     |
| **Ref转发**    | 组件封装       | 保持组件独立性 | 需明确组件契约   |
| **指令**       | 复用DOM行为    | 组合性强       | 避免过度使用     |

# 生命周期

1. **创建阶段**：ref赋值发生在元素创建后
2. **挂载阶段**：元素尚未加入DOM（回调ref可访问）
3. **更新阶段**：动态ref随条件渲染更新
4. **卸载阶段**：ref自动置空（安全）

