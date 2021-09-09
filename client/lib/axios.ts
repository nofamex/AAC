import axios from "axios";
import https from "https";
import { getAccessToken } from "./auth";

const token = getAccessToken();

const api = axios.create({
  baseURL: "https://fdfe-140-213-190-187.ngrok.io/api/v1",
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    Authorization: `Bearer ${typeof token === "undefined" ? "" : token}`,
  },
});

export default api;
