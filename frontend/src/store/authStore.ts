import { create } from "zustand";
import axios from "axios";
import { CustomAxiosError, SignupInfo, AuthState, LoginData } from "../types";

// API endpoint változó
const API_URL = "http://localhost:5000/api/auth";

// Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  // Aszinkron signup függvény
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
      const axiosError = error as CustomAxiosError;
      set({
        error: axiosError.response?.data?.message || "Unknown error",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code: string) => {
    set({ isLoading: true });
    try {
      await axios.post(`${API_URL}/verify-email`, { code });
      set({ isLoading: false });
    } catch (error) {
      const axiosError = error as CustomAxiosError;
      set({
        error: axiosError.response?.data?.message || "Unknown error",
        isLoading: false,
      });
    }
  },

  login: async ({ email, password }: LoginData) => {
    set({ isLoading: true });
    try {
      await axios.post(`${API_URL}/login`, { email, password });
      set({ isLoading: false });
    } catch (error) {
      const axiosError = error as CustomAxiosError;

      set({
        isLoading: false,
        error: axiosError.response?.data.message || "Unknown Error",
      });
    }
  },
}));
