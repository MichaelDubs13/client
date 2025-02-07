import axios from "axios";
import { BACKEND_URL } from "../lib/config";

console.log("check", BACKEND_URL)

export default axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-type": "application/json"
  }
});
