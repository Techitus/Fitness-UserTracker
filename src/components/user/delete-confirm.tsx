/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type DeleteConfirmationProps = {
  username: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmation({ username, onConfirm, onCancel }: DeleteConfirmationProps) {
  const [confirmText, setConfirmText] = useState('')

  const isConfirmDisabled = confirmText !== username

  return (
    <div className="space-y-4 text-foreground">
      <h2 className="text-lg font-semibold text-foreground">Confirm Deletion</h2>
      <p>Please type "{username}" to confirm deletion:</p>
      <Input
        type="text"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
        placeholder="Type username here"
      />
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          disabled={isConfirmDisabled}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

