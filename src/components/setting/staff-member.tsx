import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StaffMemberProps {
  name: string
  role: string
  imageUrl: string
}

export function StaffMember({ name, role, imageUrl }: StaffMemberProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-20 h-20">
              <AvatarImage src={imageUrl} alt={name} />
              <AvatarFallback className="text-lg dark:bg-gray-600 dark:text-white">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-medium text-sm dark:text-white">{name}</p>
              <p className="text-xs text-muted-foreground dark:text-gray-400">{role}</p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-bold dark:text-white">{name}</p>
          <p className="text-sm text-muted-foreground dark:text-gray-300">{role}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

