"use client"

import { MouseEvent, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { StaffMember } from "./staff-member"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Loader, Loader2} from "lucide-react"
import { isAdminFormProps, VerifyOtpAdmin } from "@/types/user.auth"
import { useAppSelector } from "@/hooks/hooks"

export function CompanyInfo({ handleOtpSend, verifyOtpAdmin }: isAdminFormProps) {
  const { email } = useAppSelector((state) => state.auth?.user || "")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [otp, setOtp] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleVerifyClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!email) {
      setError("Email is missing. Please log in again.😒")
      return
    }
    setLoading(true)
    await handleOtpSend({ email, isAdminToken: "" })
    setLoading(false)
    setIsDialogOpen(true)
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setOtp(value)
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const verifyOtpData: VerifyOtpAdmin = { email, isAdminToken: otp }
      await verifyOtpAdmin(verifyOtpData)
      setIsVerified(true)
    } catch (error) {
      console.error("Error during verify otp:", error)
    }
    setLoading(false)
  }

  return (
    <Card className="dark:bg-black relative">
      <div className="absolute top-4 right-4">
        {isVerified ? (
          <span className="text-green-500 flex items-center">
            Verified user <CheckCircle2 className="ml-1" size={16} />
          </span>
        ) : (
          <button onClick={handleVerifyClick} className="text-blue-500 hover:underline" disabled={loading}>
            {loading ? <Loader className="animate-spin" size={16} /> : "Verify as an admin?"}
          </button>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-2xl dark:text-white">Company Information</CardTitle>
        <div className="text-gray-500">
          <h1>Xyz Company</h1>
          <p>Address: Lorem ipsum dolor sit amet., Butwal</p>
          <p>Phone: +1 123-456-7890</p>
          <p>Email: john@example.com</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Staff</Label>
          <div className="space-y-4 items-center justify-center flex">
            <StaffMember name="John Doe" role="Owner" imageUrl="/placeholder.svg?height=80&width=80" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-lg">
            <StaffMember name="Jane Smith" role="Manager" imageUrl="/placeholder.svg?height=80&width=80" />
            <StaffMember name="Bob Johnson" role="Developer" imageUrl="/placeholder.svg?height=80&width=80" />
            <StaffMember name="Alice Brown" role="Designer" imageUrl="/placeholder.svg?height=80&width=80" />
            <StaffMember name="Charlie Davis" role="Marketing" imageUrl="/placeholder.svg?height=80&width=80" />
            <StaffMember name="Eva Wilson" role="Sales" imageUrl="/placeholder.svg?height=80&width=80" />
          </div>
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Verification</DialogTitle>
            <DialogDescription>Please contact Admin to get the verification one-time password.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="otp" className="text-right">
                  OTP
                </Label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  className="col-span-3"
                  placeholder="Enter 4-digit OTP"
                  maxLength={6}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={otp.length !== 4 || loading}>
                {loading ? <Loader2 className="animate-spin" size={16} /> : "Verify"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
