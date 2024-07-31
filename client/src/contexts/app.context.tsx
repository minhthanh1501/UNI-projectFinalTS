import { createContext, useState } from "react";
import {
  getAccessTokenFromLocalStorage,
  getGroupOfUserFromLocalStorage,
  getMenuOfUserFromLocalStorage,
  getUserInfoFromLocalStorage,
} from "../utils/auth";
import { User } from "@/pages/System/User/@types/user.type";
import { Group } from "@/pages/System/Group/@types/group.type";
import { Menu } from "@/pages/System/Group/@types/menu.type";


interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
  groupOfUser: Group | null;
  setGroupOfUser: React.Dispatch<React.SetStateAction<Group | null>>;
  menuOfUser: Menu | null;
  setMenuOfUser: React.Dispatch<React.SetStateAction<Menu | null>>;
  clearData: () => void;
}

export const getInitContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage),
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
  const [userInfo, setUserInfo] = useState<User | null>(defaultContext.userInfo);
  const [groupOfUser, setGroupOfUser] = useState<Group | null>(defaultContext.groupOfUser);
  const [menuOfUser, setMenuOfUser] = useState<Menu | null>(defaultContext.menuOfUser);
  const clearData = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
    setGroupOfUser(null)
    setMenuOfUser(null)
    console.log("AppProvider useEffect none is called");
  };

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
