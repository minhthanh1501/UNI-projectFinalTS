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

export const getUserInfoFromLocalStorage = () => {
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
