import { authClient } from "@/lib/authClient"
import Link from "next/link"






export function UserName() {
  const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

  if (!session) {
    return <Link href="/login">Войти</Link>
  }
}