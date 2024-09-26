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
