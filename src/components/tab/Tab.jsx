"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { X, Github } from 'lucide-react';
import Link from "next/link";

export default function Tab({ bio, posts, github, twitter, username }) {
    const [tab, setTab] = useState("bio")
    const [visible, setVisible] = useState(2)
    const handleClick = (id) => {
        setTab(id)
    }
    console.log("posts length", posts.length)
    console.log("visible value", visible)
    return (
        <>
            <div className="flex">
                <Button className="mx-2" onClick={() => handleClick("bio")}>Bio</Button>
                <Button className="mx-2" onClick={() => handleClick("post")}>Posts</Button>
                <Button className="mx-2" onClick={() => handleClick("contact")}>Contact</Button>
            </div>
            <div className="flex flex-col w-full mt-10 p-4 border rounded ">
                {tab === 'bio' && <p className="italic">{bio}</p>}
                {tab === 'post' && <div>{posts.length > 0 ? (
                    <>
                        {posts.slice(0, visible).map((post, index) =>
                            <div className="border border-sky-400 rounded-tl-lg rounded-br-lg mb-4 p-4 " key={index}>{post}
                            </div>
                        )}
                        <Button onClick={() => setVisible(prevValue => prevValue + 3)} disabled={visible < posts.length ? false : true} >Load More</Button>
                    </>
                )
                    : `${username} published 0 posts`}</div>}
                {tab === 'contact' && <div className="flex flex-col">
                    {(github || twitter) ? (
                        <>{github &&
                            <Link href={`https://github.com/${github}`} target="_blank">
                                <Button className="bg-sky-500" size="sm" ><Github /></Button>
                            </Link>
                        }
                            {twitter &&
                                <Link href={`https://x.com/${twitter}`} target="_blank">
                                    <Button className="bg-sky-500 mt-4" size="sm" ><X /></Button>
                                </Link>
                            }</>) :
                        `${username} has not added any contacts`
                    }
                </div>}
            </div >
        </>
    )
}


