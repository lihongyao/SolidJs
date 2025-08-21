import { RouteSectionProps } from "@solidjs/router";

export default function Learn(props: RouteSectionProps) {
  return (
    <div>
      <div>This is the learn page</div>
      <div>{props.children}</div>
    </div>
  );
}
