import type { Component } from "solid-js";
import Counter from "./components/Counter";

const App: Component = () => {
  return (
    <div class="m-8">
      <h1 class="font-bold mb-4">第 1 章 响应性原理</h1>
      <Counter />
    </div>
  );
};

export default App;
