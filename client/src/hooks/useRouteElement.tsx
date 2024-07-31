import { Navigate, useRoutes, Outlet } from "react-router-dom";
import path from "@/constants/path";
import HomeLayout from "@/layouts/HomeLayout";
import AuthLayout from "@/layouts/AuthLayout";
import MainContent from "@/pages/MainContent";

import { AppContext } from "@/contexts/app.context";
import { useContext } from "react";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

import SystemLayout from "@/pages/System/layouts/SystemLayout";
import MainUser from "@/pages/System/User/MainUser";
import MainGroup from "@/pages/System/Group/MainGroup";
import MainPermission from "@/pages/System/Permission/MainPermission";
import UserLayout from "@/pages/System/User/layouts";
import GroupLayout from "@/pages/System/Group/Layouts";
import PermissionLayout from "@/pages/System/Permission/layouts";
import EconomyLayout from "@/pages/Economy/layouts/EconomyLayout";
import MainIndustryAndTrade from "@/pages/Economy/IndustryAndTrade/MainIndustryAndTrade";

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />; //chưa dăng nhập thì đá ra màn hình login, đã đăng nhập thì tiếp tục render route con
}

function RejectedRoute() {
  const isAuthenticated = useContext(AppContext);
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
              <SystemLayout />
            </HomeLayout>
          ),
          children: [
            {
              path: path.NGUOI_DUNG,
              element: <UserLayout />,
              children: [
                {
                  path: "",
                  element: <MainUser />
                }
              ]
            },
            {
              path: path.NHOM_NGUOI_DUNG,
              element: <GroupLayout />,
              children: [
                {
                  path: "",
                  element: <MainGroup />
                },
              ]
            },
            {
              path: path.QUYEN,
              element: <PermissionLayout />,
              children: [
                {
                  path: "",
                  element: <MainPermission />
                }
              ]
            }
          ]
        },
        {
          path: path.KINH_TE,
          element: (
            <HomeLayout>
              <EconomyLayout />
            </HomeLayout>
          ),
          children: [
            {
              path: path.LINH_VUC_CONG_THUONG,
              element: <MainIndustryAndTrade />
            }
          ]
        }
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
