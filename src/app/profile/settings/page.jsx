import UserUpdate from "@/components/userUpdate/UserUpdate"
import { auth } from "@/utils/auth"

export default async function Settings() {
    const session = await auth()
    return (

        <UserUpdate session={session}></UserUpdate>
    )
}