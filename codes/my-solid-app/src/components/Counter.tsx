import { createEffect, createSignal } from "solid-js";

export default function Counter() {
  // -- signals
  const [count, setCount] = createSignal(0);
  // -- observers
  createEffect(() => {
    console.log("count changed:", count());
  });
  // -- events
  const increment = () => setCount((prev) => prev + 1);
  // -- render
  return (
    <div class="flex items-center gap-4">
      <div class="w-32 h-12 bg-blue-500 text-white flex justify-center items-center rounded-lg cursor-pointer select-none " onClick={increment}>
        <span class="text-base">+1</span>
      </div>

      <div>count = {count()}</div>
    </div>
  );
}
