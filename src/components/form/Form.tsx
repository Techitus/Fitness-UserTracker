/* eslint-disable react/no-unescaped-entities */
"use client"

import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Input } from "../ui/input"
import logo from "@/app/images/logo-gym.png"
import { AuthFormProps } from "@/types/user.auth"



export default function AuthForm({ mode,handleSubmit }: AuthFormProps, ) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    if (mode === "signin") {
      if (user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false)
      } else {
        setButtonDisabled(true)
      }
    } else {
      if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0 && !passwordError) {
        setButtonDisabled(false)
      } else {
        setButtonDisabled(true)
      }
    }
  }, [user, mode, passwordError])

  const validatePassword = (password: string) => {
    const hasCharacter = /[a-zA-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const isLongEnough = password.length >= 8

    if (!hasCharacter || !hasNumber || !isLongEnough) {
      setPasswordError("Password must contain at least one character, one number, and be at least 8 characters long.")
    } else {
      setPasswordError("")
    }
  }
  const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    console.log('form submitted')
    // handleSubmit(user) // Pass the user data to the handleSubmit function
    console.log('success added')
  }
  const handleClick = async(e :FormEvent<HTMLButtonElement> )=>{
    e.preventDefault() 
   handleSubmit(user)

  }

  return (
    <div className="flex items-center justify-center w-3/4 md:w-full h-full bg-transparent">
      <Card className="w-full max-w-md">
        <CardHeader className="flex justify-center items-center">
          <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <Image src={logo || "/placeholder.svg"} alt="Logo" width={128} height={128} className="object-cover" />
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit}>
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
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
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
                      setUser({ ...user, password: e.target.value })
                      validatePassword(e.target.value)
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
                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button onClick={handleClick} className="w-full"  type="submit" disabled={buttonDisabled}>
            {buttonDisabled ? "Please fill all sections" : mode === "signin" ? "Sign In" : "Sign Up"}
          </Button>
          <p className="text-sm text-center">
            {mode === "signin" ? (
              <>
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

