import { createResource, type JSX } from "solid-js";

interface ProfileProps {
  username: string;
  phone: string;
  children?: JSX.Element;
}

export default function Profile(props: ProfileProps) {
  createResource;
  return (
    <div>
      <div>{props.username}</div>
      <div>{props.phone}</div>
      <div>{props.children}</div>
    </div>
  );
}
