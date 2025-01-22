import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCheck, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type User = {
  id: number
  name: string
  phone: string
  image: string
}

type UserCardProps = {
  user: User
  onAttend: (userId: number) => void
}

export function UserCard({ user, onAttend }: UserCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image src={user.image || "/placeholder.svg"} alt={user.name} fill style={{ objectFit: "cover" }} />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.phone}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full" onClick={() => onAttend(user.id)}>
          <UserCheck className="mr-2 h-4 w-4" />
          Attend User
        </Button>
        <Button variant="outline" className="w-full flex" >
          <Link className="flex" href={`/users/${user.id}`}>
            <ArrowRight className="mr-2 h-4 w-4 mt-1" />
            View More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

