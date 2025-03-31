import axios from "axios";

export const loginUser = async (uid: string, password: string) => {
  const response = await axios.post("/api/login", { uid, password });
  return response.data;
};
