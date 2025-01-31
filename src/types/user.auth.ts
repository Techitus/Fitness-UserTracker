import { STATUS } from "./status";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthState {
  user : AuthUserType,
  status : STATUS,
  isAuthenticated: boolean;

}


export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthUserType {
  id: number | string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  token: string;
  forgotPasswordToken: string | null;
  forgotPasswordTokenExpiry: string | null;
}

export interface AuthFormProps {
  mode: "signin" | "signup"; 
  handleSubmit: (user: UserDataType) => void; 
  handleForgotPassword?: (user: UserDataType) => void; 
  showOTPDialog?: boolean; 
  setShowOTPDialog?: (value: boolean) => void; 
  verifyOtp?: (data: VerifyOtpData) => void; 
  showPasswordChangeDialog?: boolean; 
  setShowPasswordChangeDialog?: (value: boolean) => void; 
  setShowPasswordChangeDialogProp?: any; 
  handlePasswordChange?: (data: { email: string; newPassword: string }) => void; 
  handleOtpSend?: (user: UserDataType) => void; 

}
export interface ResetFormProps {
  resetChange: (user: ResetPassword) => void; 
}

export interface VerifyOtpData {
  email: string; 
  forgotPasswordToken: string; 
  status? : string
}

export interface UserDataType {
  username: string;
  email: string;
  password: string;
}

export interface LoginDataType {
  email: string;
  password: string;
}
export  interface ResetPassword {
  email: string;
  newPassword: string;
  confirmPassword?:string
}