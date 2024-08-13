import { createContext, useContext, useEffect, useState } from "react";
import {
  getAccessTokenFromLocalStorage,
  getUserInfoFromLocalStorage,
} from "../utils/auth";
import { UserInfo } from "@/@types/user.type";
import { apiGetCurrentUser } from "@/pages/auth/apis";
import { useQuery } from "@tanstack/react-query";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb"
import { FolderOpenTwoTone } from "@ant-design/icons";


interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  currentLocation: string[] | null;
  setCurrentLocation: React.Dispatch<React.SetStateAction<string[] | null>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  breadcrumbItem: ItemType[];
  setBreadcrumbItem: React.Dispatch<React.SetStateAction<ItemType[]>>;
  clearData: () => void;
}



export const getInitContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  userInfo: getUserInfoFromLocalStorage(),
  setUserInfo: () => null,
  currentLocation: null,
  setCurrentLocation: () => null,
  darkMode: false,
  setDarkMode: () => null,
  breadcrumbItem: [{
    type: 'separator',
    separator: <FolderOpenTwoTone twoToneColor={['#f1a905', '#f1a905']} />,
  }],
  setBreadcrumbItem: () => [],
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
  const [darkMode, setDarkMode] = useState<boolean>(defaultContext.darkMode);
  const [currentLocation, setCurrentLocation] = useState<string[] | null>(defaultContext.currentLocation);
  const [breadcrumbItem, setBreadcrumbItem] = useState<ItemType[]>(defaultContext.breadcrumbItem);
  const clearData = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
    setDarkMode(false);
    setCurrentLocation(null)
    setBreadcrumbItem([])
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
    }
  }, [userData]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userInfo,
        setUserInfo,
        currentLocation,
        setCurrentLocation,
        darkMode,
        setDarkMode,
        breadcrumbItem,
        setBreadcrumbItem,
        clearData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
