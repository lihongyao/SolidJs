import { useParams } from "@solidjs/router";

export default function BlogDetails() {
  const params = useParams<{ id: string }>();
  return (
    <main>
      <p>Blog ID:{params.id}</p>
    </main>
  );
}
