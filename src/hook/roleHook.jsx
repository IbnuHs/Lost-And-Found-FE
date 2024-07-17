import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";

export default function roleHook() {
  const [role, setRole] = React.useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decode = jwtDecode(token);
        setRole(decode.token);
        console.log(decode.role);
      } catch (error) {
        return error;
      }
    }
  }, []);
  //   console.lo
  return role;
}
