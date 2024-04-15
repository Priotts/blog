import UserUpdate from "@/components/userUpdate/UserUpdate"
import { auth } from "@/utils/auth"
import { getUserById, userInfo } from "@/utils/data"

export default async function Settings() {
    const session = await auth()
    const user = await getUserById(session.user._id)
    const info = await userInfo(user)

    return (
        <UserUpdate sessionPfp={info.pfp}></UserUpdate>
    )
}