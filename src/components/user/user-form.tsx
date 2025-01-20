import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type User = {
  id: number
  username: string
  address: string
  phone: string
  lastPaymentDate: string
  image: string
}

type UserFormProps = {
  user?: User | null
  onSubmit: (user: Omit<User, 'id'>) => void
  onCancel: () => void
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    username: '',
    address: '',
    phone: '',
    lastPaymentDate: '',
    image: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        address: user.address,
        phone: user.phone,
        lastPaymentDate: user.lastPaymentDate,
        image: user.image
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-foreground">
      <div>
        <Label htmlFor="username" className="text-foreground">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="address" className="text-foreground">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone" className="text-foreground">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="lastPaymentDate" className="text-foreground">Last Payment Date</Label>
        <Input
          id="lastPaymentDate"
          name="lastPaymentDate"
          type="date"
          value={formData.lastPaymentDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="image" className="text-foreground">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {user ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}

