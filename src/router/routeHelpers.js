import Login from "../authComponents/Login";
import Home from "../views/home/Home";
import Tnc from "../authComponents/Tnc";
import NotFoundPage from "../authComponents/NotFoundPage";
import UnauthorizedPage from "../authComponents/UnauthorizedPage";
import Dailer from "../views/dailer/Dailer";
import PublicRoute from "./PublicRoute";
import MemberExport from "../views/memberExport/MemberExport";
import PrivateRoute from "./PrivateRoute";
import { routerUrlPathConstants } from "../constants";
import Dashboard from "../views/dashboard/dashboard";

const Routes = [
  // {
  //   path: routerUrlPathConstants.tnc,
  //   element: <Tnc />,
  //   meta: {
  //     compId: "",
  //     layout: null,
  //     publicRoute: true,
  //     restricted: true,
  //   },
  // },
  {
    path: routerUrlPathConstants.login,
    element: <Login />,
    meta: {
      compId: "",
      layout: null,
      publicRoute: true,
      restricted: true,
    },
  },
  {
    path: routerUrlPathConstants.anyPath,
    element: <NotFoundPage />,
    meta: {
      compId: "",
      layout: null,
      publicRoute: true,
      restricted: true,
    },
  },
  {
    path: routerUrlPathConstants.unauthorized,
    element: <UnauthorizedPage />,
    meta: {
      compId: "",
      layout: null,
      publicRoute: true,
      restricted: true,
    },
  },
  // {
  //   path: routerUrlPathConstants.communication,
  //   element: <Dailer />,
  //   meta: {
  //     compId: "menu-callmember",
  //     layout: "app",
  //     publicRoute: false,
  //     restricted: true,
  //   },
  // },
  // {
  //   path: routerUrlPathConstants.memberExport,
  //   element: <MemberExport />,
  //   meta: {
  //     compId: "",
  //     layout: "app",
  //     publicRoute: false,
  //     restricted: true,
  //   },
  // },
  // {
  //   path: routerUrlPathConstants.home,
  //   element: <MemberExport />,
  //   meta: {
  //     compId: "menu-callexport",
  //     layout: "app",
  //     publicRoute: false,
  //     restricted: true,
  //   },
  // },
  {
    path: routerUrlPathConstants.dashboard,
    element: <Dashboard />,
    meta: {
      compId: "",
      layout: "app",
      publicRoute: false,
      restricted: true,
    },
  },
];

const getRoutes = () => {
  const AllRoutes = [];
  AllRoutes.push({
    children: Routes.map((route) => ({
      ...route,
      element: route?.meta?.publicRoute ? (
        <PublicRoute route={route}>{route.element}</PublicRoute>
      ) : (
        <PrivateRoute route={route}>{route.element}</PrivateRoute>
      ),
    })),
  });
  return AllRoutes;
};

export { Routes, getRoutes };
