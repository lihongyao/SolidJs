import { createSignal, createResource, Switch, Match, Suspense } from "solid-js";

const fetchUser = async (id) => {
  const response = await fetch(`https://swapi.dev/api/people/${id}/`);
  return response.json();
};

export default function App() {
  const [userId, setUserId] = createSignal();
  const [user] = createResource(userId, fetchUser);

  console.log(import.meta.env.VITE_PUBLIC_ENDPOINT);

  return (
    <div>
      <input type="number" min="1" placeholder="Enter Numeric Id" onInput={(e) => setUserId(e.currentTarget.value)} />
      <br />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Match when={user.error}>
            <span>Error: {user.error.message}</span>
          </Match>
          <Match when={user()}>
            <div>{JSON.stringify(user())}</div>
          </Match>
        </Switch>
      </Suspense>
    </div>
  );
}
