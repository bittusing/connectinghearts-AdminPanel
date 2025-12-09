import { useRoutes, Navigate } from "react-router-dom";
import { getRoutes } from "./routeHelpers";
import PublicRoute from "./PublicRoute";

const Router = () => {
  const allRoutes = getRoutes();

  const getHomeRoute = () => {
    const user = localStorage.getItem("userType");
    const landingPage = localStorage.getItem("landingPage");
    // if (user) {
    //   return landingPage;
    // } else {
    //   return "/login";
    // }
    return "/dashboard";
  };

  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={getHomeRoute} />,
    },
    ...allRoutes,
  ]);

  return routes;
};

export default Router;
