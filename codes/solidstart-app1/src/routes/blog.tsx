import { RouteSectionProps } from "@solidjs/router";

export default function BlogLayout(props: RouteSectionProps) {
  return (
    <main>
      <h1>Blog Layout</h1>
      <hr />
      {props.children}
    </main>
  );
}
