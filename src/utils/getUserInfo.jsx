import { api } from "../lib/API";

export const userInfo = async (id) => {
  try {
    if (id) {
      const res = await api.get(`/user/info/${id}`);
      return res.data;
    }
  } catch (error) {
    return error;
  }
};
