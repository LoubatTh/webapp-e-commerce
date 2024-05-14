import Cookies from "js-cookie";

const getAccessToken = () => {
  return Cookies.get("authToken");
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};
