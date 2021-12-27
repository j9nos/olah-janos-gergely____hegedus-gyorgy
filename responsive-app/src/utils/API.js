import Axios from "axios";
const API = Axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001",
});
export default API;
