/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type DeleteConfirmationProps = {
  username: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmation({ username, onConfirm, onCancel }: DeleteConfirmationProps) {
  const [confirmText, setConfirmText] = useState("")

  const isConfirmDisabled = confirmText !== username

  return (
    <div className="space-y-4 text-foreground">
      <h2 className="text-lg font-semibold text-foreground">Confirm Deletion</h2>
      <p className="text-sm">Please type "{username}" to confirm deletion:</p>
      <Input
        type="text"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
        placeholder="Type username here"
        className="w-full"
      />
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm} disabled={isConfirmDisabled} className="w-full sm:w-auto">
          Delete
        </Button>
      </div>
    </div>
  )
}

