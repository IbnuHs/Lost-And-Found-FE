import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: " https://ade1-103-85-117-17.ngrok-free.app",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    header: "Access-Control-Allow-Origin",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": true,
    "ngrok-skip-browser-warning": true,
    // "Content-Type": "jsonp",
  },
  // withCredentials: true,
});
