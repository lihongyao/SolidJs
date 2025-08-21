import { A } from "@solidjs/router";
import { RouteSectionProps } from "@solidjs/router";

export default function Layout(props: RouteSectionProps) {
  return (
    <div>
      {/* 导航 */}
      <nav>
        <A href="/home">Home</A>
        <A href="/users">Users</A>
        <A href="/profile">Profile</A>
        <A href="/details/1">Details</A>
      </nav>
      {/* 接收子路由，类似于 React Router 中的 <outlet> */}
      {props.children}
    </div>
  );
}
