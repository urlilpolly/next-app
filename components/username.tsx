import { authClient } from "@/lib/authClient"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { signOut } from "@/server/auth-action"
import { Button } from "./ui/button"






export function UserName() {
  const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">
                {session?.user.name}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                    <Link href="/profile">
                        Профиль
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <form action={signOut}>
                        <Button type="submit">Выйти</Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}