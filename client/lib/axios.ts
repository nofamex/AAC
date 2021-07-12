import axios from "axios";
import https from "https";
import { getAccessToken } from "./auth";
const token = getAccessToken();
console.log(token);
const api = axios.create({
  baseURL: "https://18.141.81.252/api/v1",
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    Authorization: `Bearer ${typeof token === "undefined" ? "" : token}`,
  },
});
export default api;
