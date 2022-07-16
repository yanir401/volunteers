import axios from "axios";

const URL =
  process.env.NODE_ENV === "production" ? "/" : "http://127.0.0.1:5000";

export default axios.create({
  baseURL: " URL",
});
