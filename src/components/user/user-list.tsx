'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserForm } from './user-form'
import { Modal } from './modal'
import { DeleteConfirmation } from './delete-confirm'

type User = {
  id: number
  username: string
  address: string
  phone: string
  lastPaymentDate: string
  image: string
}

const initialUsers: User[] = [
  { id: 1, username: 'john_doe', address: '123 Main St', phone: '555-1234', lastPaymentDate: '2023-01-15', image: '/placeholder.svg?height=100&width=100' },
  { id: 2, username: 'jane_smith', address: '456 Elm St', phone: '555-5678', lastPaymentDate: '2023-02-20', image: '/placeholder.svg?height=100&width=100' },
]

export function UserList() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const filteredUsers = users
    .filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    )
    .sort((a, b) => {
      const dateA = new Date(a.lastPaymentDate).getTime()
      const dateB = new Date(b.lastPaymentDate).getTime()
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    setUsers([...users, { ...newUser, id }])
    setIsFormOpen(false)
  }

  const handleEditUser = (updatedUser: User | Omit<User, "id">) => {
    if ('id' in updatedUser) {
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user))
    }
    setIsFormOpen(false)
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
    setIsDeleteConfirmOpen(false)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <div className="space-x-2">
          <Button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
            Sort by {sortOrder === 'asc' ? 'Latest' : 'Oldest'}
          </Button>
          <Button onClick={() => { setSelectedUser(null); setIsFormOpen(true); }}>
            Add User
          </Button>
         
        </div>
      </div>

      <Table className="border-collapse border-hidden">
        <TableHeader>
          <TableRow className="border-b border-border">
            <TableHead>SN</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Last Payment Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user, index) => (
            <TableRow key={user.id} className="border-b border-border">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.lastPaymentDate}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2" onClick={() => { setSelectedUser(user); setIsFormOpen(true); }}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => { setSelectedUser(user); setIsDeleteConfirmOpen(true); }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <UserForm
          user={selectedUser}
          onSubmit={selectedUser ? handleEditUser : handleAddUser}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <Modal isOpen={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)}>
        <DeleteConfirmation
          username={selectedUser?.username || ''}
          onConfirm={() => selectedUser && handleDeleteUser(selectedUser.id)}
          onCancel={() => setIsDeleteConfirmOpen(false)}
        />
      </Modal>
    </div>
  )
}

