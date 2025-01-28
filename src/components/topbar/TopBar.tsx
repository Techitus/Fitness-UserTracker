"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Search, Menu, X } from "lucide-react"
import Link from "next/link"

interface TopBarProps {
  onMenuClick: () => void
  isSidebarOpen: boolean
}

export default function TopBar({ onMenuClick, isSidebarOpen }: TopBarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setIsDarkMode(isDark)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="w-full px-4 py-3 flex flex-wrap items-center justify-between gap-4 bg-background border-b">
      <div className="flex items-center">
        {isMobile && (
          <Button variant="ghost" size="sm" className="mr-2 z-50" onClick={onMenuClick}>
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}
        <div className="flex items-center">
          <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="ml-10 text-xl font-bold text-primary">Logo</span>
        </div>
      </div>

      <div className="flex-grow max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Input type="text" placeholder="Search..." className="w-full pl-10 pr-4" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Link href="/auth/signin">
          <Button size="login">Login</Button>
        </Link>
      </div>
    </div>
  )
}

