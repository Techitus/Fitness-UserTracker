'use client'

import { useState, useEffect } from 'react'

import { cn } from "@/lib/utils"
import './globals.css'
import Sidebar from '@/components/sidebar/Sidebar'
import TopBar from '@/components/topbar/TopBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setIsSidebarOpen(window.innerWidth >= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground ">
        <div className="flex h-screen overflow-hidden">
          <div className={cn(
            "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out transform md:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x- "
          )}>
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className={cn(
              "flex-1 overflow-x-hidden overflow-y-hidden p-4",
              isMobile ? "ml-0 " : (isSidebarOpen ? "md:ml-16" : "md:ml-16")
            )}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

