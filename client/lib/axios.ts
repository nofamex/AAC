import axios from "axios";
import https from "https";
const api = axios.create({
  baseURL: "http://18.141.81.252/api/v1",
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});
export default api;
