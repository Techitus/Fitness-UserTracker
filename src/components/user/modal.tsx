import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-background border border-border p-6 rounded-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        {children}
      </div>
    </div>
  )
}

