import { Navigate, useRoutes, Outlet } from "react-router-dom";
import path from "@/constants/path";
import HomeLayout from "@/layouts/HomeLayout";
import AuthLayout from "@/layouts/AuthLayout";
import MainContent from "@/pages/MainContent";

import { AppContext } from "@/contexts/app.context";
import { useContext } from "react";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import UserLayout from "@/pages/User/layouts";
import MainUser from "@/pages/User/MainUser";
import MainGroup from "@/pages/Group/MainGroup";

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />; //chưa dăng nhập thì đá ra màn hình login, đã đăng nhập thì tiếp tục render route con
}

function RejectedRoute() {
  const isAuthenticated = false;
  return !isAuthenticated ? <Outlet /> : <Navigate to={"/"} />; //đã dăng nhập thì đá ra màn hình chính, chưa đăng nhập thì tiếp tục render route con
}

export default function useRouteElement() {
  const elementRoute = useRoutes([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: path.HOME,
          element: (
            <HomeLayout>
              <MainContent />
            </HomeLayout>
          ),
        },
        {
          path: path.DANH_MUC,
          element: (
            <HomeLayout>
              <UserLayout />
            </HomeLayout>
          ),
          children: [
            {
              path: path.NGUOI_DUNG,
              element: <MainUser />,
            },
            {
              path: path.NHOM_NGUOI_DUNG,
              element: <MainGroup />
            }
          ]
        },
      ],
    },
    {
      path: "/",
      element: <RejectedRoute />,
      children: [
        {
          path: path.LOGIN,
          element: (
            <AuthLayout>
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: path.REGISTER,
          element: (
            <AuthLayout>
              <Register />
            </AuthLayout>
          ),
        },
      ],
    },
  ]);

  return elementRoute;
}
