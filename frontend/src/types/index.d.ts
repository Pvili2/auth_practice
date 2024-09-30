import React from "react";
import { LucideIcon } from "lucide-react";
import { AxiosError } from "axios";
export interface SignupInfo {
  email: string;
  password: string;
  name: string;
}
export interface FloatingShapeProps {
  color: string;
  size: string;
  top: string;
  left: string;
  delay: number;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: LucideIcon;
}

export type CustomInputEvent = React.ChangeEvent<HTMLInputElement>;

export type PasswordCheckProps = { password: string };
export type PasswordLengthStrength =
  | "Very Weak"
  | "Weak"
  | "Fair"
  | "Good"
  | "Strong";

export type PasswordStrengthColor =
  | "bg-red-500"
  | "bg-red-400"
  | "bg-yellow-500"
  | "bg-yellow-400"
  | "bg-green-500";
export type FormFooterProps = {
  question: string;
  path: string;
  linkContent: string;
};

export type CustomAxiosError = AxiosError<{ message: string }>;
export type VerifyEmailCall = {
  isLoading: boolean;
  verifyEmail: (code: string) => Promise<void>;
  error: string | null;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  signup: (data: SignupInfo) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
};

export type SignupCall = {
  isLoading: boolean;
  signup: ({ email, password, name }: SignupInfo) => Promise<void>;
  error: string | null;
};
export type User = {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};
