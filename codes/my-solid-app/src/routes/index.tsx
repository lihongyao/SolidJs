import { lazy, type Component } from "solid-js";
import { Navigate, type RouteDefinition } from "@solidjs/router";

// -- 导入页面组件
import Layout from "@/Layout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Users from "@/pages/Users";
import NotFound from "@/pages/NotFound";

export interface AppRouteDefinition extends RouteDefinition {
  path?: string;
  component?: Component;
  children?: AppRouteDefinition[];
  meta?: {
    title?: string;
    requiresAuth?: boolean;
  };
}

const redirect = (to: string) => () => <Navigate href={to} />;
const routes: AppRouteDefinition[] = [
  // 根路径重定向
  { path: "/", component: redirect("/login") },
  { path: "/login", component: Login },

  // 动态路由，? 表示可选
  { path: "/details/:id/:q?", component: lazy(() => import("@/pages/Details")) },

  // 共享布局的路由组
  {
    component: Layout,
    children: [
      { path: "/home", component: Home },
      { path: "/users", component: Users },
      { path: "/profile", component: lazy(() => import("@/pages/Profile")) },
    ],
  },

  // 嵌套路由
  {
    path: "/learn",
    children: [
      { path: "/", component: lazy(() => import("@/pages/Learn")) },
      { path: "/details", component: lazy(() => import("@/pages/LearnDetails")) },
    ],
  },

  // 通配符
  { path: "*paramName", component: NotFound },
];

export default routes;
