import Cookies from "js-cookie";

export const isAuthenticated = () => {
  return !(typeof Cookies.get("access_token") === "undefined");
};

export const setLogin = (data: any) => {
  Cookies.set("access_token", data.access_token);
  Cookies.set("refresh_token", data.refresh_token);
  Cookies.set("user", JSON.stringify(data.user));
};
