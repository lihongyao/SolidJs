import { useNavigate } from "@solidjs/router";

export default function App() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/profile", { replace: true })}>Jump</button>
    </div>
  );
}
