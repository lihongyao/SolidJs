import type { Component } from "solid-js";
import Profile from "./components/Counter";

const App: Component = () => {
  return (
    <div class="w-screen h-screen flex flex-col gap-4">
      <Profile username="leo" phone="123">
        <span>🚗</span>
      </Profile>
    </div>
  );
};

export default App;
