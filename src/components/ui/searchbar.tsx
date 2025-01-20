"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

type User = {
  id: number
  name: string
  phone: string
}

type SearchBarProps = {
  onSearch: (searchTerm: string) => void
  users: User[]
}

export function SearchBar({ onSearch, users }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)

    if (value.length > 0) {
      const newSuggestions = users
        .filter((user) => user.name.toLowerCase().includes(value.toLowerCase()) || user.phone.includes(value))
        .map((user) => user.name)
        .slice(0, 5)
      setSuggestions(newSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    onSearch(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full max-w-sm">
      <div className="flex">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleInputChange}
          className="rounded-r-none"
        />
        <Button type="submit" className="rounded-lg-none">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-background border border-input rounded-md shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

