// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";

mount(() => {
  console.log("🚀 Client started：", performance.now());
  return <StartClient />;
}, document.getElementById("app")!);
