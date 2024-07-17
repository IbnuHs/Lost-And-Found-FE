import { jwtDecode } from "jwt-decode";

export const getRole = () => {
  const token = sessionStorage.getItem("token");
  const decode = jwtDecode(token);
  return decode.role;
};
