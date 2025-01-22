"use client"
import PersonalInfo from "@/components/userDetails/PersonalInfo"
import PersonalCalendar from "@/components/userDetails/PersonalCalender"

export default function DashboardPage() {
 

  return (
    <div className="container mx-auto p-4 min-h-screen bg-background text-foreground">
     
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/5">
          <PersonalInfo />
        </div>
        <div className="w-full lg:w-2/5">
          <PersonalCalendar />
        </div>
      </div>
    </div>
  )
}

