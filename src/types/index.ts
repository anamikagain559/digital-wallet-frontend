import type{ ComponentType } from "react";

export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "AGENT";
  isDeleted: boolean;
  isActive: "ACTIVE" | "BLOCKED" | "SUSPENDED";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};
export type TRole = "ADMIN" | "AGENT" | "USER";