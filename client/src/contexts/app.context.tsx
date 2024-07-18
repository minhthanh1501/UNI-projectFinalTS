import { createContext, useState } from "react";
import {
  getAccessTokenFromLocalStorage,
  getUserInfoToLocalStorage,
} from "../utils/auth";
import { User } from "../pages/User/@types/user.type"

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
  clearData: () => void;
}

export const getInitContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage),
  setIsAuthenticated: () => null,
  userInfo: getUserInfoToLocalStorage(),
  setUserInfo: () => null,
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
  const clearData = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
    console.log("AppProvider useEffect none is called");
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userInfo,
        setUserInfo,
        clearData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
