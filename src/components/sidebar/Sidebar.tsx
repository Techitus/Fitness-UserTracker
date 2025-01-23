"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Calendar, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, name: "Home", path: "/" },
  { icon: Users, name: "Users", path: "/users" },
  { icon: Calendar, name: "Attendance", path: "/attendance" },
  { icon: Settings, name: "Setting", path: "/setting" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="mt-0 h-screen bg-trasnparent text-foreground flex flex-col w-full transition-all duration-300 overflow-hidden group">
      <nav className="flex-1 pt-0">
        <ul className="space-y-2 py-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={cn(
                  "flex items-center px-4 py-2 hover:bg-accent hover:text-accent-foreground relative",
                  pathname === item.path && "bg-accent text-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5 min-w-[1.25rem]" />
                <span className="ml-4 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-4 border-t mt-auto">
          <div className="flex items-center">
            <User className="h-5 w-5 min-w-[1.25rem]" />
            <span className="ml-4 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
              John Doe
            </span>
          </div>
          <div className="mt-2 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
            <p className="text-xs text-muted-foreground">123 Main St, City</p>
            <p className="text-xs text-muted-foreground">contact@example.com</p>
          </div>
        </div>
      </nav>
    </aside>
  )
}

