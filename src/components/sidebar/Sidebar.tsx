'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Calendar, Phone, User } from 'lucide-react'
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, name: 'Home', path: '/' },
  { icon: Users, name: 'Users', path: '/users' },
  { icon: Calendar, name: 'Attendance', path: '/attendance' },
  { icon: Phone, name: 'Contact', path: '/contact' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-screen bg-background text-foreground flex flex-col w-16 group hover:w-64 transition-all duration-300 mt-20 overflow-hidden">
      <nav className="flex-1 pt-0">
        
        <ul className="space-y-2 py-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.path}
                className={cn(
                  "flex items-center px-4 py-2 hover:bg-accent hover:text-accent-foreground relative",
                  pathname === item.path && "bg-accent text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="ml-4 absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-4 border-t">
        <div className="flex items-center mt-10">
          <User className="h-5 w-5" />
          <span className="ml-4 absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-10">
            John Doe
          </span>
        </div>
        <div className="absolute left-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-4">
          <p className="text-xs text-muted-foreground">123 Main St, City</p>
          <p className="text-xs text-muted-foreground">contact@example.com</p>
        </div>
      </div>
      </nav>8

      
    </aside>
  )
}

