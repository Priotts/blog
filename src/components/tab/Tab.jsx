"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { X, Github } from 'lucide-react';
import Link from "next/link";

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
                {tab === 'contact' && <div className="flex flex-col">
                    {(user.contact.github || user.contact.twitter) ? (
                        <>{user.contact.github &&
                            <Link href={`https://github.com/${user.contact.github}`} target="_blank">
                                <Button className="bg-sky-500" size="sm" ><Github /></Button>
                            </Link>
                        }
                            {user.contact.twitter &&
                                <Link href={`https://x.com/${user.contact.twitter}`} target="_blank">
                                    <Button className="bg-sky-500 mt-4" size="sm" ><X /></Button>
                                </Link>
                            }</>) :
                        `${user.username} has not added any contacts`
                    }
                </div>}
            </div>
        </>
    )
}