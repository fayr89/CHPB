import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import AdminPage from "../admin/AdminPage";
import Privacy from "../pages/Privacy";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
