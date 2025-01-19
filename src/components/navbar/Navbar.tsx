'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Search } from 'lucide-react'

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`w-full px-4 py-3 flex flex-wrap items-center justify-between gap-4 ${isDarkMode ? 'dark' : ''}`}>
      {/* Logo Section */}
      <div className="flex items-center">
        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="ml-2 text-xl font-bold text-primary">Logo</span>
      </div>

      {/* Search Bar */}
      <div className="flex-grow max-w-md hidden md:block mx-4">
        <div className="relative">
          <Input type="text" placeholder="Search..." className="w-full pl-10 pr-4" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Dark Mode Toggle and Login Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button size='login' >Login</Button>
      </div>
    </div>
  )
}

