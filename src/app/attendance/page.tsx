import { UserManagement } from "@/components/attendance/user-management";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Make Attandance</h1>
        
      </div>
      <UserManagement />
    </main>
  )
}

