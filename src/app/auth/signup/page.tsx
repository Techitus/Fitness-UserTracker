"use client"

import AuthForm from "@/components/form/Form"
import Background from "@/components/ui/background"
import {  register, } from "@/store/authSlice"
import { STATUS } from "@/types/status"
import type { UserDataType } from "@/types/user.auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Loader from "@/components/ui/loader"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"


const Page = () => {
  const { toast } = useToast()
  const { status } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const registerSubmit = async (user: UserDataType) => {
    setIsLoading(true)
    await dispatch(register(user))
  }

  
  useEffect(() => {
    if (isLoading) {
      if (status === STATUS.SUCCESS) {
        toast({
          description: "User created successfully...",
          duration: 3000,
        })
        setIsLoading(false)
        router.push("/auth/signin")
      } else if (status === STATUS.ERROR) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        setIsLoading(false)
      }
    }
  }, [status, isLoading, router, toast])

  return (
    <div className="relative w-screen h-screen">
      <Background />
      {status === STATUS.LOADING && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-transparent p-4 rounded-lg flex flex-col items-center space-y-2">
            <Loader />
          </div>
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center -mt-40">
        <AuthForm mode="signup" handleSubmit={registerSubmit}  />
      </div>
    </div>
  )
}

export default Page

