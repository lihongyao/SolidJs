import { useParams } from "@solidjs/router";

export default function Details() {
  const params = useParams();
  return <div>Course ID: {params.id}</div>;
  {
    /* Course: User ID: 123 */
  }
}
