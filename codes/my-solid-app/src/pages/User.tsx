import { useParams } from "@solidjs/router";
export default function User() {
  const params = useParams<{ id: string }>();
  return <div>User ID：{params.id}</div>;
}
