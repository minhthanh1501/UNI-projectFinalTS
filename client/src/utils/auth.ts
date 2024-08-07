import { UserInfo } from "@/@types/user.type";
import { AppContext } from "@/contexts/app.context";
import { apiGetCurrentUser } from "@/pages/auth/apis";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";

export const setAccessTokenToLocalStorage = (accessToken: string | "") => {
  localStorage.setItem("accessToken", accessToken);
};

export const setUserInfoToLocalStorage = (user: string) => {
  localStorage.setItem("userInfo", user);
};

export const setGroupOfUserToLocalStorage = (groupOfUser: string) => {
  localStorage.setItem("groupOfUser", groupOfUser);
};

export const setMenuOfUserToLocalStorage = (menuOfUser: string) => {
  localStorage.setItem("menuOfUser", menuOfUser);
};

export const setRefreshTokenToLocalStorage = (refreshToken: string) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const getAccessTokenFromLocalStorage = () =>
  localStorage.getItem("accessToken");

export const getUserInfoFromLocalStorage = (): UserInfo | null => {
  const userInfo = localStorage.getItem("userInfo");

  if (userInfo) return JSON.parse(userInfo);

  return null;
};

export const getGroupOfUserFromLocalStorage = () => {
  const groupOfUser = localStorage.getItem("groupOfUser");

  if (groupOfUser) return JSON.parse(groupOfUser);

  return null;
};

export const getMenuOfUserFromLocalStorage = () => {
  const menuOfUser = localStorage.getItem("menuOfUser");

  if (menuOfUser) return JSON.parse(menuOfUser);

  return null;
};

export const getRefreshTokenToLocalStorage = () =>
  localStorage.getItem("refreshToken");

export const clearLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getCurrentUser = () => {
  const { setUserInfo, userInfo } = useContext(AppContext);
  const accessToken = getAccessTokenFromLocalStorage();

  const getCurrentUseQuery = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => apiGetCurrentUser(),
    enabled: Boolean(accessToken),
  });

  useEffect(() => {
    if (getCurrentUseQuery.data) {
      setUserInfo(getCurrentUseQuery.data.data.userData);
      console.log(userInfo);
    }
  }, [getCurrentUseQuery.data]);
};
