export const setAccessTokenToLocalStorage = (accessToken: string | "") => {
  localStorage.setItem("accessToken", accessToken);
};

export const setUserInfoToLocalStorage = (user: string) => {
  localStorage.setItem("userInfo", user);
};

export const setRefreshTokenToLocalStorage = (refreshToken: string) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const getAccessTokenFromLocalStorage = () =>
  localStorage.getItem("accessToken");

export const getUserInfoToLocalStorage = () => {
  const userInfo = localStorage.getItem("userInfo");

  if (userInfo) return JSON.parse(userInfo);

  return null;
};

export const getRefreshTokenToLocalStorage = () =>
  localStorage.getItem("refreshToken");

export const clearLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
