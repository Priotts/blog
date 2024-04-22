"use client"

import { useEffect, useState } from "react"
import { searchUser } from "@/utils/action"
import { Input } from "../ui/input"
import Link from "next/link";

export default function SearchUserComponent() {
    const [data, setData] = useState("")
    const [user, setUser] = useState("")

    const handleData = (e) => {
        setData(e.target.value)
    }

    useEffect(() => {
        const search = async () => {
            const fetchData = await searchUser(data)
            setUser(fetchData)
        }
        search()
    }, [data])

    return (
        <div className="">
            <Input type="search" name="username" placeholder="Search user..." className="mb-4" value={data} onChange={(e) => handleData(e)} />
            {user.success === true && <>
                <div className=" bg-background rounded-md mx-2">
                    <Link href={`/profile/${user.username}`} className="flex items-center h-16">
                        <img src={user.userPfp} width={35} className="mx-4 "></img>
                        <p>{user.username}</p>
                    </Link>
                </div>
            </>}
        </div>

    )
}