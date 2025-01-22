/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"

interface ExtendSubscriptionDialogProps {
  isOpen: boolean
  onClose: () => void
  currentRemainingDays: number
}

export default function ExtendSubscriptionDialog({
  isOpen,
  onClose,
  currentRemainingDays,
}: ExtendSubscriptionDialogProps) {
  const [extensionType, setExtensionType] = useState<"days" | "date">("days")
  const [extensionDays, setExtensionDays] = useState("")
  const [extensionDate, setExtensionDate] = useState<Date | undefined>(undefined)

  const handleExtend = () => {
    // Implement the logic to extend the subscription
    console.log("Extending subscription:", extensionType === "days" ? `${extensionDays} days` : extensionDate)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>Extend Subscription</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant={extensionType === "days" ? "default" : "outline"} onClick={() => setExtensionType("days")}>
              By Days
            </Button>
            <Button variant={extensionType === "date" ? "default" : "outline"} onClick={() => setExtensionType("date")}>
              By Date
            </Button>
          </div>
          {extensionType === "days" ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="days" className="text-right">
                Days
              </Label>
              <Input
                id="days"
                type="number"
                value={extensionDays}
                onChange={(e) => setExtensionDays(e.target.value)}
                className="col-span-3"
              />
            </div>
          ) : (
            <Calendar
              mode="single"
              selected={extensionDate}
              onSelect={setExtensionDate}
              disabled={(date) => date < new Date()}
              initialFocus
              className="rounded-md border dark:border-gray-700"
            />
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleExtend}>Extend Subscription</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

