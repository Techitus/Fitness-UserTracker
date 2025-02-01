"use client"

import AuthForm from "@/components/form/Form"
import Background from "@/components/ui/background"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { forgetPassword, login, verifyOtp, resetPassword } from "@/store/authSlice"
import { STATUS } from "@/types/status"
import type { UserDataType, VerifyOtpData, ResetPassword } from "@/types/user.auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Loader from "@/components/ui/loader"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { AppDispatch } from "@/store/store" // Make sure this path is correct

const Page = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showOTPDialog, setShowOTPDialog] = useState(false)
  const [showPasswordChangeDialog, setShowPasswordChangeDialog] = useState(false)
  const [isPasswordReset, setIsPasswordReset] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const dispatch: AppDispatch = useAppDispatch()
  const router = useRouter()
  const { status } = useAppSelector((state) => state.auth)

  const LoginSubmit = async (user: UserDataType) => {
    try {
      setLoading(true)
      setIsPasswordReset(false)
      const result = await dispatch(login(user))
      return { success: true, data: result }
    } catch (error) {
      return { success: false, message: (error as Error).message }
    } finally {
      setLoading(false)
    }
  }

  const forgetPasswordSubmit = async (user: UserDataType) => {
    try {
      setLoading(true)
      setIsPasswordReset(true)
      await dispatch(forgetPassword({ email: user.email }))
      setShowOTPDialog(true)
      return { success: true }
    } catch (error) {
      return { success: false, message: (error as Error).message }
    } finally {
      setLoading(false)
    }
  }

  const verifyOtpSubmit = async (data: VerifyOtpData) => {
    try {
      setLoading(true)
      setIsVerifyingOtp(true)
      const result = await dispatch(verifyOtp(data))
      
      toast({
        description: "OTP verified successfully",
        duration: 3000,
      })
      setShowOTPDialog(false)
      setShowPasswordChangeDialog(true)
      return { success: true, data: result }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: (error as Error).message || "Invalid OTP",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return { success: false, message: (error as Error).message }
    } finally {
      setLoading(false)
      setIsVerifyingOtp(false)
    }
  }

  const handlePasswordChange = async (data: ResetPassword) => {
    try {
      setLoading(true)
      const result = await dispatch(resetPassword(data))
      
      toast({
        description: "Password changed successfully",
        duration: 3000,
      })
      setShowPasswordChangeDialog(false)
      router.push("/auth/signin")
      return { success: true, data: result }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Password Change Failed",
        description: (error as Error).message || "Unable to change password",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return { success: false, message: (error as Error).message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loading) {
      if (status === STATUS.SUCCESS && !isPasswordReset && !isVerifyingOtp) {
        toast({
          description: "User Logged in successfully...",
          duration: 3000,
        })
        setLoading(false)
        setTimeout(() => {
          router.push("/")
        }, 1000)
      } else if (status === STATUS.SUCCESS && isPasswordReset && !isVerifyingOtp) {
        toast({
          description: "OTP sent successfully to your email",
          duration: 3000,
        })
        setLoading(false)
      } else if (status === STATUS.ERROR) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please confirm your credentials",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        setLoading(false)
        return
      }
    }
  }, [status, loading, router, isPasswordReset, isVerifyingOtp, toast])

  return (
    <div className="relative w-screen h-screen">
      <Background />
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-transparent p-4 rounded-lg flex flex-col items-center space-y-2">
            <Loader />
          </div>
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center -mt-40">
        <AuthForm
          mode="signin"
          handleSubmit={LoginSubmit}
          handleForgotPassword={forgetPasswordSubmit}
          verifyOtp={verifyOtpSubmit}
          showOTPDialog={showOTPDialog}
          setShowOTPDialog={setShowOTPDialog}
          showPasswordChangeDialog={showPasswordChangeDialog}
          setShowPasswordChangeDialog={setShowPasswordChangeDialog}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    </div>
  )
}

export default Page