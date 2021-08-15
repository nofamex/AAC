import axios from "axios";
import https from "https";
import { getAccessToken } from "./auth";

const token = getAccessToken();

const api = axios.create({
  baseURL: "http://localhost/api/v1",
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    Authorization: `Bearer ${typeof token === "undefined" ? "" : token}`,
  },
});

export default api;
