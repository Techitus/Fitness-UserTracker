/* eslint-disable @typescript-eslint/no-explicit-any */

// Type for authenticated user
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

// Props for the authentication form
export interface AuthFormProps {
  mode: "signin" | "signup"; // Determines if the form is for login or registration
  handleSubmit: (user: UserDataType) => void; // Callback for form submission
  handleForgotPassword?: (user: UserDataType) => void; // Optional callback for forgotten passwords
  showOTPDialog?: boolean; // Whether the OTP dialog is shown
  setShowOTPDialog?: (value: boolean) => void; // Setter for OTP dialog visibility
  verifyOtp?: (data: VerifyOtpData) => void; // Optional callback for OTP verification
  showPasswordChangeDialog?: boolean; // Whether the password change dialog is shown
  setShowPasswordChangeDialog?: (value: boolean) => void; // Setter for password change dialog visibility
  setShowPasswordChangeDialogProp?: any; // Additional prop for handling dialog visibility
  handlePasswordChange?: (data: { email: string; newPassword: string }) => void; // Callback for changing the password
}

// Data for OTP verification
export interface VerifyOtpData {
  email: string; // User's email address
  forgotPasswordToken: string; 
  status? : string
}

// Basic user data for authentication
export interface UserDataType {
  username: string;
  email: string;
  password: string;
}

// Data for login
export interface LoginDataType {
  email: string;
  password: string;
}
export  interface ResetPassword {
  email: string;
  newPassword: string;
  confirmPassword?:string
}