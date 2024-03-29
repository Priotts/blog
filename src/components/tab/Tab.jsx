"use client"

import { useState } from "react"
import { Button } from "../ui/button"

export default function Tab({ user }) {
    const [tab, setTab] = useState("bio")
    const handleClick = (id) => {
        setTab(id)
    }

    return (
        <>
            <div className="flex">
                <Button className="mx-2" onClick={() => handleClick("bio")}>Bio</Button>
                <Button className="mx-2" onClick={() => handleClick("password")}>Posts</Button>
                <Button className="mx-2" onClick={() => handleClick("contact")}>Contact</Button>
            </div>
            <div className="flex flex-col w-full mt-10 p-4 border rounded ">
                {tab === 'bio' && <p className="italic">{user.bio}</p>}
                {tab === 'password' && <p>{user.posts.length > 0 ? user.posts : `${user.username} published 0 posts`}</p>}
                {tab === 'contact' && <p>{user.contact}</p>}
            </div>
        </>
    )
}