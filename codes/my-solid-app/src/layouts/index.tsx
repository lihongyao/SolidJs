import { A, useNavigate } from "@solidjs/router";
import type { JSX } from "solid-js";

export default function layouts(props: { children?: JSX.Element }) {
  const navigate = useNavigate();
  return (
    <div>
      <nav class="flex gap-2">
        <A href="/" end={true}>
          Home
        </A>
        <A href="/about">About</A>
        <A href="/profile">Profile</A>
      </nav>

      <button onClick={() => navigate("/profile", { replace: true })}>Jump</button>

      <div>{props.children}</div>
    </div>
  );
}
