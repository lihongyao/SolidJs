import { Router } from "@solidjs/router";
import { children, lazy } from "solid-js";
import Layout from "@/layouts";
import path from "path";
const routes = [
  {
    component: Layout,
    children: [
      { path: "/", component: lazy(() => import("@/pages/Home")) },
      { path: "/about", component: lazy(() => import("@/pages/About")) },
      { path: "/profile", component: lazy(() => import("@/pages/Profile")) },
      { path: "/user/:id", component: lazy(() => import("@/pages/User")) },
    ],
  },
];

export default function AppRouter() {
  return <Router>{routes}</Router>;
}
