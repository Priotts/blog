
import { getUser } from "@/utils/data"
import Card from "../card/Card"

export default async function Users() {
    const users = await getUser()
    // console.log(users)
    return (
        <div className="">
            <Card users = {users}></Card>
        </div>
    )
}