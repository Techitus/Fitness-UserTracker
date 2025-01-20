import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-background border border-border p-6 rounded-lg max-w-md w-full relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        {children}
      </div>
    </div>
  )
}

