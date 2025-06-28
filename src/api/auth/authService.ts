import apiClient from "@/lib/apiClient";
import { signInCredentials } from "./authTypes";
export const signIn = async (credentials: signInCredentials) => {
  try {
    const response = await apiClient.post("/auth/signin", credentials);

    if (response.data.status && response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
    }

    return response.data;
  } catch (err: any) {
    if (err.response) {
      return err.response.data;
    } else {
      return { status: false, message: "Something went wrong" };
    }
  }
};

//TODO: implement this if needed
export const checkAuth = async () => {
  try {
    const response = await apiClient.get("/auth/verify", {
      withCredentials: true, // Send cookie
    });
    return response.data; // { status: true }
  } catch (err) {
    return { status: false, message: "Not authenticated" };
  }
};
