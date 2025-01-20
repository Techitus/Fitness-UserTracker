"use client"

import { useState } from "react"
import { UserCard } from "./user-card"
import { Button } from "@/components/ui/button"
import { SearchBar } from "../ui/searchbar"

type User = {
  id: number
  name: string
  phone: string
  image: string
  email: string
  role: string
}

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    phone: "123-456-7890",
    image: "/placeholder.svg?height=200&width=200",
    email: "john@example.com",
    role: "Developer",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "098-765-4321",
    image: "/placeholder.svg?height=200&width=200",
    email: "jane@example.com",
    role: "Designer",
  },
  {
    id: 3,
    name: "Alice Johnson",
    phone: "555-555-5555",
    image: "/placeholder.svg?height=200&width=200",
    email: "alice@example.com",
    role: "Manager",
  },
]

export function UserManagement() {
  const [users, ] = useState<User[]>(initialUsers)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const handleSearch = (searchTerm: string) => {
    const filtered = users.filter(
      (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.phone.includes(searchTerm),
    )
    setFilteredUsers(filtered)
  }

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"
    setSortOrder(newSortOrder)
    const sorted = [...filteredUsers].sort((a, b) => {
      return newSortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    })
    setFilteredUsers(sorted)
  }

  const handleAttendUser = (userId: number) => {
    console.log(`Attending user with ID: ${userId}`)
    // Implement your attend user logic here
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <SearchBar onSearch={handleSearch} users={users} />
        <Button onClick={handleSort}>Sort by {sortOrder === "asc" ? "Z-A" : "A-Z"}</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} onAttend={handleAttendUser} />
        ))}
      </div>
    </div>
  )
}

