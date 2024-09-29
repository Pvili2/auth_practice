import React from "react";
import { LucideIcon } from "lucide-react";

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
