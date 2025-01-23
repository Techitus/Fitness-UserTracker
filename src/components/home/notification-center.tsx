import { ScrollArea } from "@/components/ui/scroll-area"

const notifications = [
  { id: 1, message: "New user John Doe has been added." },
  { id: 2, message: "Sarah Smith is present today." },
  { id: 3, message: "Mike Johnson completed his workout plan." },
  { id: 4, message: "New class 'Yoga Basics' has been added to the schedule." },
  { id: 5, message: "Equipment maintenance scheduled for tomorrow." },
]

export default function NotificationCenter() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

