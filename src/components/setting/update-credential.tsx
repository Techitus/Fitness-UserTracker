"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ResetFormProps } from "@/types/user.auth"
import { Eye, EyeOff } from "lucide-react"

export function UpdateCredentials({resetChange}:ResetFormProps) {
  const [showPassword, setShowPassword] = useState(false);
const [user,setUser] = useState({
  email: "",
   newPassword : "",
   confirmPassword : ""
})

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name,value} = e.target
  setUser({
   ...user,
   [name]: value
  })
}

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
     resetChange(user)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="dark:bg-black">
        <CardHeader>
          <CardTitle className="text-2xl dark:text-white">Update Email and Password</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Change your email address or update your password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium dark:text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              name = "email"
              type="email"
              value={user.email}
              onChange={handleInputChange}
              className="dark:bg-black dark:text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-sm font-medium dark:text-gray-300">
              New Password
            </Label>
            <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name='newPassword'
                    required
                    value={user.newPassword}
                    onChange={handleInputChange}

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
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm font-medium dark:text-gray-300">
              Confirm New Password
            </Label>
            <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name='confirmPassword'
                    required
                    value={user.confirmPassword}
                    onChange={handleInputChange}

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
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" >
            Update
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

