"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function UpdateCredentials() {
  const [email, setEmail] = useState("john.doe@acmecorp.com")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the update to your backend
    console.log("Update submitted:", { email, currentPassword, newPassword, confirmPassword })
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="dark:bg-black dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-sm font-medium dark:text-gray-300">
              Current Password
            </Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="dark:bg-black dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-sm font-medium dark:text-gray-300">
              New Password
            </Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="dark:bg-black dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm font-medium dark:text-gray-300">
              Confirm New Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="dark:bg-black dark:text-white"
            />
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

