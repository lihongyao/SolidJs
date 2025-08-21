# 概述

与 Signals 类似，Stores 也是一种状态管理的基本元素。不过，虽然 Signals 仅管理单个状态，而 Stores 则创建了一个集中式的存储位置，以减少代码冗余。在 Solid 中，这些存储可以生成一系列响应式 Signals，每个 Signals 都对应于特定的属性，这在处理复杂状态时非常有用。

> **提示**：你可以理解成 Singnals 类似于 Vue 中的 `ref()`，而 Stores 类似于 Vue 中的 `reactive()`，但是它们还是有所区别。

# 创建 Store

Stores 支持多种数据类型：对象、数组、字符串和数字。

借助 JavaScript 的 Proxy 机制，Stores 实现了深度响应式功能。这意味着不仅能处理顶级数据，还能自动追踪嵌套属性和数组元素的变化，让整个数据结构都具备响应性。

```tsx
import { createStore } from "solid-js/store"

// Initialize store
const [store, setStore] = createStore({
  userCount: 3,
  users: [
    { id: 0, username: "Leo", location: "England", logged: false },
    { id: 1, username: "Lisa", location: "Canada", logged: true },
    { id: 2, username: "Lucy", location: "India", logged: true },
  ],
});
```

# 访问 Store

可以通过点符号或方括号语法，直接从 Store 代理对象访问嵌套属性：

```tsx
// 直接访问嵌套属性
store.userCount
store.users[0].username
```

Store 数据访问遵循 Signal 模式，但使用更简单：

```tsx
// Signal 需要调用函数获取值
const [signal] = createSignal("value");
console.log(signal()); // 需要调用

// Store 可以直接访问
const [store] = createStore({ user: "Leo" });
console.log(store.user); // 直接访问
```

响应式依赖是延迟建立的：

- 只有在跟踪范围内（如组件渲染、Effect、计算属性）访问才会创建依赖
- 普通函数中访问不会建立响应

```tsx
// 错误：不会建立响应
console.log(store.user); 

// 正确：在 Effect 中访问会建立响应
createEffect(() => {
  console.log(store.user); 
});
```

# 更新 Store

在 store 中更新值的最佳方式是通过由 createStore 初始化提供的设置器来实现。该设置器允许对特定的键及其关联的值进行修改，其格式为：

```tsx
setStore(key, newValue)
```

```tsx
const [store, setStore] = createStore({
  userCount: 3,
  users: [ ... ],
})

setStore("users", (currentUsers) => [
  ...currentUsers,
  {
    id: 3,
    username: "michael584",
    location: "Nigeria",
    logged: false,
  },
])
```

> 提示：将 Store 的读写能力分离能带来显著的调试有事，这种分离设计可以：
>
> 1. 精准追踪哪些组件在读取数据
> 2. 严格控制哪些组件能修改数据
> 3. 更容易定位数据流问题
>
> （注：通过区分 getter 和 setter，开发者可以更清晰地管理数据流动，提升应用的可维护性）

**进阶技巧：嵌套 Store 的使用**

Store 有一个隐藏特性：可以创建嵌套 Store 来更方便地操作深层属性。

示例代码：

```js
const [store, setStore] = createStore({
  userCount: 3,
  users: [ ... ], // 初始用户数据
})

// 为 users 数组创建独立的嵌套 Store
const [users, setUsers] = createStore(store.users)

// 通过 setUsers 更新嵌套数据
setUsers(currentUsers => [
  ...currentUsers,
  {
    id: 3,
    username: "michael584",
    location: "Nigeria",
    logged: false,
  }
])
```

特性说明：

1. 通过 `setUsers`的修改会自动同步更新到原 Store 的 `store.users`属性
2. 从派生 Store 读取的 `users`数据会与原 Store 保持实时同步

注意事项：

1. 此功能依赖于原 Store 中已存在的 `store.users`属性
2. 嵌套 Store 主要适用于数组或对象类型的属性

# 路径语法灵活性

这种修改 Store 的方式被称为 **路径语法**。其核心特点是：

1. **参数结构**：前几个参数指定要修改的目标路径，最后一个参数提供新值
2. **精确访问**：通过字符串键名可以直接定位到具体值

路径语法提供了三种访问方式：

```js
// 1. 字符串键名（直接访问）
setStore('user', 'name', '李雷')

// 2. 键名数组（批量访问嵌套属性）
setStore(['user', 'address', 'city'], '北京')

// 3. 过滤函数（动态条件访问）
setStore(
  (user) => user.age > 18, 
  'isAdult', 
  true
)
```

优势说明：

1. 支持任意深度的嵌套结构访问
2. 适应动态访问场景的需求
3. 保持代码简洁性的同时处理复杂数据结构

（注：这种语法设计使得无论 Store 结构多么复杂，都能高效地进行数据导航和修改）

# 数组操作指南

## 添加元素

```js
// 方式1：展开运算符（适合批量添加）
setStore("users", (prev) => [
  ...prev,
  {id: 3, username: "michael584", location: "Nigeria"}
])

// 方式2：直接索引（适合单个添加）
setStore("users", store.users.length, {
  id: 3,
  username: "michael584",
  location: "Nigeria"
})
```

## 批量修改

```js
// 修改多个指定索引
setStore("users", [2,7,10], "logged", false)

// 修改对象属性
setStore("users", ["me","you"], "logged", false)

// 修改索引范围（包含起止）
setStore("users", {from:1, to:5}, "logged", false)

// 带步长的修改
setStore("users", {from:0, to:10, by:2}, "logged", false)
```

## 动态修改

```js
// 使用函数计算新值
setStore("users", 3, "logged", old => !old)

// 条件筛选修改
setStore("users", 
  user => user.username.startsWith("t"), 
  "logged", 
  false
)

// 多条件筛选
const ids = [1,2,3]
setStore("users", 
  user => ids.includes(user.id),
  "logged",
  true
)
```

## 优势说明

1. 所有修改操作都会自动批量执行
2. 支持任意复杂度的条件筛选
3. 保持响应式更新特性
4. 语法简洁但功能强大

注：这些方法都遵循路径语法规则，能高效处理各种数组操作场景

# 对象修改指南

## 基本特性

当修改 Store 中的对象时，新对象会与旧对象进行浅合并（shallow merge）：

- 新对象的属性会覆盖旧对象的同名属性
- 不存在的属性会保留原值
- 只进行一层合并（嵌套对象不会被深度合并）

## 修改方式对比

```js
// 方式1：直接修改（自动合并）
setStore("users", 0, {
  id: 109  // 只修改id属性，其他属性保持不变
})

// 方式2：手动展开（等效写法）
setStore("users", 0, (user) => ({
  ...user,  // 保留原有属性
  id: 109   // 覆盖id属性
}))
```

## 实际应用示例

```js
// 原数据
/*
{
  users: [
    {
      id: 0,
      name: "张三",
      profile: {
        age: 20,
        gender: "male"
      }
    }
  ]
}
*/

// 修改后结果（自动合并）
setStore("users", 0, {
  id: 1,
  profile: {
    age: 21
  }
})

/*
{
  users: [
    {
      id: 1,          // 被更新
      name: "张三",   // 保持不变
      profile: {      // 注意！整个profile被替换
        age: 21       // gender丢失
      }
    }
  ]
}
*/
```

## 重要注意事项

1. **浅合并特性**：嵌套对象会被整个替换，不会深度合并
2. **保留未修改属性**：未指定的属性会保持原值
3. **性能优势**：比手动展开语法更简洁高效

## 深度合并解决方案

如需深度合并嵌套对象，推荐使用扩展运算符：

```js
setStore("users", 0, (user) => ({
  ...user,
  profile: {
    ...user.profile,  // 保留嵌套属性
    age: 21           // 只修改age
  }
}))
```

# 工具函数

#### `produce` - 可变式更新

```js
import { produce } from "solid-js/store"

// without produce
setStore("users", 0, "username", "newUsername")
setStore("users", 0, "location", "newLocation")

// with produce
setStore(
  "users",
  0,
  produce((user) => {
    user.username = "newUsername"
    user.location = "newLocation"
  })
)
```

特点：

1. 像操作普通JS对象一样修改数据
2. 自动处理不可变更新
3. 仅支持数组和对象类型

## `reconcile` - 智能合并

```js
import { createStore, reconcile } from "solid-js/store"

const [data, setData] = createStore({
  animals: ['cat', 'dog', 'bird', 'gorilla']
})

const newData = getNewData() // eg. contains ['cat', 'dog', 'bird', 'gorilla', 'koala']
setData('animals', reconcile(newData))
```

优势：

1. 自动检测新旧数据差异
2. 避免不必要的重复渲染
3. 特别适合大数据集更新

## `unwrap` - 数据提取

```js
import { createStore, unwrap } from "solid-js/store"

const [data, setData] = createStore({
  animals: ["cat", "dog", "bird", "gorilla"],
})

const rawData = unwrap(data)
```

使用场景：

1. 需要非响应式数据快照时
2. 与第三方库交互时
3. 性能敏感操作

## 工具函数对比

| 工具        | 最佳场景     | 数据类型限制 | 性能影响 |
| :---------- | :----------- | :----------- | :------- |
| `produce`   | 复杂对象修改 | 仅对象/数组  | 中等     |
| `reconcile` | 大数据集更新 | 无限制       | 高效     |
| `unwrap`    | 数据导出     | 无限制       | 最优     |

选择建议：

- 简单更新 → 直接使用 `setStore`
- 复杂对象修改 → `produce`
- 列表数据更新 → `reconcile`
- 数据导出/交互 → `unwrap`







