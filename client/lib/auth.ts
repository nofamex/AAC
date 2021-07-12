import Cookies from "js-cookie";

export const isAuthenticated = () => {
  return !(typeof Cookies.get("access_token") === "undefined");
};

export const getAccessToken = () => {
  return Cookies.get("access_token");
};

export const getUser = () => {
  return Cookies.get("user");
};

export const logOut = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  Cookies.remove("user");
};

export const setLogin = (data: any) => {
  Cookies.set("access_token", data.access_token);
  Cookies.set("refresh_token", data.refresh_token);
  Cookies.set("user", JSON.stringify(data.user));
};
