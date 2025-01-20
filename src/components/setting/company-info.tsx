import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { StaffMember } from "./staff-member"

export function CompanyInfo() {
  return (
    <Card className="dark:bg-black">
      <CardHeader>
        <CardTitle className="text-2xl dark:text-white">Company Information</CardTitle>
        <div className="text-gray-500">
            <h1>Xyz Company</h1>
            <p>Address:Lorem ipsum dolor adipisicing.,Butwal</p>
            <p>Phone: +1 123-456-7890</p>
            <p>Email: john@example.com</p>

        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        

        <div className="space-y-4">
          <Label className="text-lg font-semibold dark:text-white">Staff</Label>
          <div className="space-y-4 items-center justify-center flex">
          <StaffMember name="John Doe" role="Owner" imageUrl="/placeholder.svg?height=80&width=80" />
        </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-gray-100 dark:bg-black p-4 rounded-lg">
            <StaffMember name="Jane Smith" role="Manager" imageUrl="/placeholder.svg?height=80&width=80" />
            <StaffMember name="Bob Johnson" role="Developer" imageUrl="/placeholder.svg?height=80&width=80" />
            <StaffMember name="Alice Brown" role="Designer" imageUrl="/placeholder.svg?height=80&width=80" />
            <StaffMember name="Charlie Davis" role="Marketing" imageUrl="/placeholder.svg?height=80&width=80" />
            <StaffMember name="Eva Wilson" role="Sales" imageUrl="/placeholder.svg?height=80&width=80" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

