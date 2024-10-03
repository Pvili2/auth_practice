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

  signup: async ({ email, password, name }: SignupInfo) => {
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
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      set({
        isLoading: false,
        user: response.data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      const axiosError = error as CustomAxiosError;

      set({
        isLoading: false,
        error: axiosError.response?.data.message || "Unknown Error",
      });
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`, {
        withCredentials: true,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    }
  },
  logout: async () => {
    set({ isLoading: false });
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      set({ isLoading: false, isAuthenticated: false, user: null });
    } catch (error) {
      const errorMessage = error as CustomAxiosError;
      set({ error: errorMessage.response?.data.message, isLoading: false });
    }
  },
  forgotPassword: async (email: string) => {
    set({ isLoading: false, error: null });
    try {
      await axios.post(
        `${API_URL}/forgot-password`,
        { email },
        { withCredentials: true }
      );

      set({ isLoading: false });
    } catch (error) {
      const axiosError = error as CustomAxiosError;
      set({ error: axiosError.response?.data.message, isLoading: false });
    }
  },
  resetPassword: async (password: string, token: string | undefined) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(
        `${API_URL}/reset-password/${token}`,
        { password },
        { withCredentials: true }
      );

      set({ isLoading: false });
    } catch (error) {
      const axiosError = error as CustomAxiosError;
      set({ error: axiosError.response?.data.message, isLoading: false });
    }
  },
}));
