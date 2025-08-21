import { useSearchParams } from "@solidjs/router";

export default function LearnDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <p>Course ID: {searchParams.id}</p>
      <input
        onChange={(e) => {
          e.preventDefault();
          setSearchParams({ q: e.target.value });
        }}
      />
    </div>
  );
}
