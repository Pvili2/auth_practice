import { create } from "zustand";
import axios from "axios";
import { SignupInfo } from "../types";

const API_URL = "http://localhost:5000/api/auth";
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  //functions
  signup: async ({ email, password, name }: SignupInfo) => {
    console.log(email);
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
}));
