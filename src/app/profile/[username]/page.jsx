import Tab from "@/components/tab/Tab"
import UserProfile from "@/components/userProfile/UserProfile"
import { userInfo } from "@/utils/data"

export default async function Page({ params }) {
    const { username } = params
    const user = await userInfo(username)
    return (
        <>
            <UserProfile username={user.username} pfp={user.pfp} createdAt={user.createdAt.toISOString()} posts={user.posts} bio={user.bio} contact={user.contact} />
        </>
    )
}