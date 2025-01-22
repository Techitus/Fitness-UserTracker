"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ExtendSubscriptionDialog from "./ExtendSubscriptionDialog"

export default function PersonalInfo() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Mock data - replace with actual data fetching logic
  const user = {
    name: "John Doe",
    image: "/placeholder.svg?height=200&width=200",
    joinedDate: "2023-01-01",
    address: "123 Main St, Anytown, USA",
    lastPaymentDate: "2023-06-01",
    subscriptionRemainingDays: 30,
  }

  return (
    <Card className="p-6 lg:p-8">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
          <Image
            src={user.image || "/placeholder.svg"}
            alt={user.name}
            width={200}
            height={200}
            className="rounded-full"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold mb-4">{user.name}</h2>
            <div className="space-y-2">
              <p>
                <strong>Joined Date:</strong> {user.joinedDate}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
              <p>
                <strong>Last Payment Date:</strong> {user.lastPaymentDate}
              </p>
              <p>
                <strong>Subscription Remaining:</strong>{" "}
                <Button variant="link" className="p-0 h-auto font-normal" onClick={() => setIsDialogOpen(true)}>
                  {user.subscriptionRemainingDays} days
                </Button>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <ExtendSubscriptionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        currentRemainingDays={user.subscriptionRemainingDays}
      />
    </Card>
  )
}

