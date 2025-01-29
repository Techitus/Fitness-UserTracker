"use client";

import { type FormEvent, useEffect, useState, MouseEvent } from "react";
import Image from "next/image";
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import logo from "@/app/images/logo-gym.png";
import type { AuthFormProps, VerifyOtpData, UserDataType, ResetPassword } from "@/types/user.auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function AuthForm({
  mode,
  handleSubmit,
  handleForgotPassword,
  verifyOtp,
  showOTPDialog,
  setShowOTPDialog,
  showPasswordChangeDialog,
  setShowPasswordChangeDialog,
  handlePasswordChange,
}: AuthFormProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserDataType>({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [forgotPasswordDisabled, setForgotPasswordDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [otp, setOtp] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState("");

  useEffect(() => {
    if (mode === "signin") {
      if (user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false);
        setForgotPasswordDisabled(false);
      } else {
        setButtonDisabled(true);
        setForgotPasswordDisabled(true);
      }
    } else {
      if (
        user.username.length > 0 &&
        user.email.length > 0 &&
        user.password.length > 0 &&
        !passwordError
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }
  }, [user, mode, passwordError]);

  const validatePassword = (password: string) => {
    const hasCharacter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLongEnough = password.length >= 8;

    if (!hasCharacter || !hasNumber || !isLongEnough) {
      setPasswordError(
        "Password must contain at least one character, one number, and be at least 8 characters long."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await handleSubmit(user);
      if (mode === "signin") {
        router.push("/");
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const handleForgetPassword = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (handleForgotPassword && mode === "signin") {
      try {
        await handleForgotPassword(user);
      } catch (error) {
        console.error("Error during forgot password:", error);
      }
    }
  };

  const handleOTPSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (verifyOtp && mode === "signin") {
      try {
        const verifyOtpData: VerifyOtpData = {
          email: user.email,
          forgotPasswordToken: otp,
        };
        await verifyOtp(verifyOtpData);
      } catch (error) {
        console.error("Error during verify otp:", error);
      }
    }
  };

  const handlePasswordChangeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordChangeError("Passwords do not match");
      return;
    }
    if (handlePasswordChange) {
      const resetPasswordData: ResetPassword = {
        email: user.email,
        newPassword,
        confirmPassword
      };
      await handlePasswordChange(resetPasswordData);
    }
    // Reset fields after submission
    setNewPassword("");
    setConfirmPassword("");
    setPasswordChangeError("");
  };

  return (
    <div className="flex items-center justify-center w-3/4 md:w-full h-full bg-transparent">
      <Card className="w-full max-w-md">
        <CardHeader className="flex justify-center items-center">
          <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src={logo || "/placeholder.svg"}
              alt="Logo"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </CardHeader>

        <CardContent>
          <form>
            <div className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your fullname"
                    required
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                </div>
              )}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={user.password}
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                      validatePassword(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleClick}
            className="w-full"
            type="submit"
            disabled={buttonDisabled}
          >
            {buttonDisabled
              ? "Please fill all sections"
              : mode === "signin"
              ? "Sign In"
              : "Sign Up"}
          </Button>
          {mode === "signin" && (
            <Button
              variant="link"
              onClick={handleForgetPassword}
              className="self-end p-0 h-auto"
              disabled={forgotPasswordDisabled}
            >
              Forgot Password?
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog
        open={showOTPDialog}
        onOpenChange={(open) => {
          setShowOTPDialog?.(open);
          if (!open) {
            setOtp("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogDescription>
              One-time password (OTP) is sent to your email
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleOTPSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="col-span-3"
                />
                <Button type="submit" disabled={otp.length !== 4}>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showPasswordChangeDialog}
        onOpenChange={(open) => {
          setShowPasswordChangeDialog?.(open);
          if (!open) {
            setNewPassword("");
            setConfirmPassword("");
            setPasswordChangeError("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>Enter your new password</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordChangeSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-foreground col-span-1 ">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  className="col-span-3 bg-background  dark:border-gray-600"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="new-password" className="text-foreground  ">
                  Password
                </label>
                <div className="relative col-span-3">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pr-10 bg-background text-foreground dark:border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 dark:text-foreground"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500 dark:text-white" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500 dark:text-white" />
                    )}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="confirm-password" className="text-foreground col-span-1 ">
                  Confirm Password
                </label>
                <div className="relative col-span-3">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10 bg-background  dark:border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 dark:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500 dark:text-white" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500 dark:text-white" />
                    )}
                  </button>
                </div>
              </div>
              {passwordChangeError && <p className="text-sm text-red-500 dark:text-red-500">{passwordChangeError}</p>}
              <Button 
                type="submit"
                disabled={!newPassword || !confirmPassword}
                className="w-3/4 items-center text-foreground font-bold  dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Change Password
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
