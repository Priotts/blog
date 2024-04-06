import Tab from "@/components/tab/Tab"
import { Button } from "@/components/ui/button"
import UserProfile from "@/components/userProfile/UserProfile"
import { auth } from "@/utils/auth"
import { userInfo } from "@/utils/data"
import Link from "next/link"

export default async function Profile({params}) {
    const session = await auth()
    // const user = session.user
    // console.log("session", session.user.username)
    const user = await userInfo(session.user.username)
    // console.log("user", user)
    return (
        // <div className="grid grid-cols-12  ">
        //     <div className="col-start-4 mt-24 border rounded-tl-lg rounded-br-lg">
        //         <img src={session.user.pfp} alt="" width={200} className="rounded-2xl " />
        //     </div>
        //     <div className="col-start-5 col-span-2 mt-28 ml-10  ">
        //         <p className="mb-4 underline italic">{session.user.username}</p>
        //         <Button variant="secondary">
        //             <Link href="/profile/settings">Setting</Link>
        //         </Button>

        //         <p className="text-sm mt-4">Joined: {session.user.createdAt}</p>
        //     </div>
        //     <div className="col-span-6 col-start-4 mt-12" >
        //         <Tab user={user}></Tab>
        //     </div>
        // </div>
        <></>
    )
} 