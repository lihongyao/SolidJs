import { lazy } from "solid-js";
import { Router, Route, Navigate } from "@solidjs/router";

// -- 导入页面组件
import Layout from "@/Layout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Users from "@/pages/Users";
import NotFound from "@/pages/NotFound";

// -- 路由懒加载
const Profile = lazy(() => import("@/pages/Profile"));
const Details = lazy(() => import("@/pages/Details"));
const Learn = lazy(() => import("@/pages/Learn"));
const LearnDetails = lazy(() => import("@/pages/LearnDetails"));

export default function AppRouter() {
  return (
    <Router>
      {/* 根路径重定向 */}
      <Route path="/" component={() => <Navigate href="/login" />} />
      <Route path="/login" component={Login} />

      {/* 动态路由，? 表示可选 */}
      <Route path="/details/:id/:q?" component={Details} />

      {/* 共享布局的路由组 */}
      <Route component={Layout}>
        <Route path="/home" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/profile" component={Profile} />
      </Route>

      {/* 嵌套路由 */}
      <Route path="/learn">
        <Route path="/" component={Learn} />
        <Route path="/details" component={LearnDetails} />
      </Route>

      {/* 通配符 */}
      <Route path="*paramName" component={NotFound} />
    </Router>
  );
}
