"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import "./globals.css"
import Sidebar from "@/components/sidebar/Sidebar"
import StoreProvider from "@/store/StoreProvider"
import { Toaster } from "@/components/ui/toaster"
import TopBar from "@/components/topbar/TopBar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768
      setIsMobile(isMobileView)
      setIsSidebarOpen(!isMobileView)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen((prev) => !prev)
    }
  }

  return (
    <StoreProvider>
    <html lang="en" className="dark" suppressHydrationWarning >
      <body className="bg-background text-foreground">
        <div className="flex h-screen overflow-hidden">
          <div
            className={cn(
              "fixed mt-20 inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out transform",
              isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
              isMobile ? "w-64" : "w-16 hover:w-64",
            )}
          >
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <main
              className={cn(
                "flex-1 overflow-x-hidden overflow-y-visible xl:overflow-y-hidden p-4",
                isMobile ? (isSidebarOpen ? "ml-64" : "ml-0") : "md:ml-16",
              )}
            >
              {children}
            </main>
          </div>
        </div>
        <Toaster />

      </body>
    </html>
    </StoreProvider>
  )
}

