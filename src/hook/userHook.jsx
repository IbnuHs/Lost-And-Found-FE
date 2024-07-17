import { useEffect } from "react";
import { api } from "../lib/API";

export default async function userHook(id) {
  const res = await api.get(`/user/info/${id}`);
  return res;
  // useEffect(async ()=> {
  // })
}
