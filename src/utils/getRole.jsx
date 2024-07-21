import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const getRole = () => {
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      return decode.role;
    }
    return;
  });
};
