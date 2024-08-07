import { createContext, useEffect, useState } from "react";
import {
  getAccessTokenFromLocalStorage,
  getCurrentUser,
  getGroupOfUserFromLocalStorage,
  getMenuOfUserFromLocalStorage,
  getUserInfoFromLocalStorage,
} from "../utils/auth";
import { Group } from "@/pages/System/Group/@types/group.type";
import { Menu } from "@/pages/System/Group/@types/menu.type";
import { UserInfo } from "@/@types/user.type";
import { apiGetCurrentUser } from "@/pages/auth/apis";
import { useQuery } from "@tanstack/react-query";


interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  groupOfUser: Group | null;
  setGroupOfUser: React.Dispatch<React.SetStateAction<Group | null>>;
  menuOfUser: Menu | null;
  setMenuOfUser: React.Dispatch<React.SetStateAction<Menu | null>>;
  clearData: () => void;
}



export const getInitContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  userInfo: getUserInfoFromLocalStorage(),
  setUserInfo: () => null,
  groupOfUser: getGroupOfUserFromLocalStorage(),
  setGroupOfUser: () => null,
  menuOfUser: getMenuOfUserFromLocalStorage(),
  setMenuOfUser: () => null,
  clearData: () => null
});

const initialContext: AppContextInterface = getInitContext();

export const AppContext = createContext<AppContextInterface>(initialContext);

export default function AppProvider({ children, defaultContext = initialContext }: {
  children: React.ReactNode;
  defaultContext?: AppContextInterface;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultContext.isAuthenticated);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(defaultContext.userInfo);
  const [groupOfUser, setGroupOfUser] = useState<Group | null>(defaultContext.groupOfUser);
  const [menuOfUser, setMenuOfUser] = useState<Menu | null>(defaultContext.menuOfUser);
  const clearData = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
    setGroupOfUser(null)
    setMenuOfUser(null)
    console.log("AppProvider useEffect none is called");
  };
  // reload page => getUserInfo
  const accessToken = getAccessTokenFromLocalStorage();

  const { data: userData } = useQuery({
    queryKey: ["userInfo"],
    queryFn: apiGetCurrentUser,
    enabled: Boolean(accessToken),
  });

  useEffect(() => {
    if (userData) {
      setUserInfo(userData.data.userData);
      console.log(userInfo);
    }
  }, [userData]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userInfo,
        setUserInfo,
        groupOfUser,
        setGroupOfUser,
        menuOfUser,
        setMenuOfUser,
        clearData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
